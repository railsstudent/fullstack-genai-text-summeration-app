import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, scan, tap } from 'rxjs';
import { SummarizationResult } from '../interfaces/summarization-result.interface';
import { SummarizationModel } from '../interfaces/summarization.interface';
import { SummarizationService } from '../services/summarization.service';
import { SummarizeResultsComponent } from '../summarize-results/summarize-results.component';
import { WebpageInputBoxComponent } from '../webpage-input-box/webpage-input-box.component';

@Component({
  selector: 'app-summarize-page',
  standalone: true,
  imports: [WebpageInputBoxComponent, SummarizeResultsComponent],
  template: `
    <div class="container">
      <h2>Ng Text Summarization Demo</h2>
      <div class="summarization">
        <app-webpage-input-box #box [isLoading]="vm.isLoading" />
      </div>
      <app-summarize-results [results]="summary()" />
    </div>
  `,
  styles: `
    div.container {
      padding: 1rem;
    }

    div.summarization {
      margin-top: 1rem;
      margin-bottom: 2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizePageComponent {
  isLoading = signal(false);
  box = viewChild.required(WebpageInputBoxComponent);
  summarizationService = inject(SummarizationService);

  viewModel = computed<SummarizationModel>(() => {
    return {
      isLoading: this.isLoading(),
      summary: this.summary(),
      pageUrl: this.box().pageUrl,
    }
  });

  summary = toSignal(
    this.summarizationService.result$
      .pipe(
        scan((acc, translation) => ([...acc, translation]), [] as SummarizationResult[]),
        tap(() => this.isLoading.set(false)),
      ),
    { initialValue: [] as SummarizationResult[] }
  );

  get vm() {
    return this.viewModel();
  }

  constructor() {
    effect((cleanUp) => {
      const sub = outputToObservable(this.vm.pageUrl)
        .pipe(
          tap((pageUrl) => console.log(pageUrl)),
          filter((url) => !!url)
        )
        .subscribe((url) => {
          this.isLoading.set(true);
          this.summarizationService.summarizePage({
            url,
            code: 'en',
          });
        });

      cleanUp(() => sub.unsubscribe());
    })
  }
}
