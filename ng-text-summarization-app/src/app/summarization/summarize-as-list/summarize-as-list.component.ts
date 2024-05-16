import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, scan, tap } from 'rxjs';
import { SummarizationResult } from '../interfaces/summarization-result.interface';
import { SummarizationService } from '../services/summarization.service';
import { SummarizeResultsComponent } from '../summarize-results/summarize-results.component';
import { WebPageInputContainerComponent } from '../web-page-input/web-page-input-container/web-page-input-container.component';

@Component({
  selector: 'app-summarize-as-list',
  standalone: true,
  imports: [SummarizeResultsComponent, WebPageInputContainerComponent],
  template: `
    <div class="container">
      <app-web-page-input-container title="Ng Bullet Point List Demo" [isLoading]="isLoading()"
      />
      <app-summarize-results [results]="summary()" />
    </div>
  `,
  styles: `
    div.container {
      padding: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizeAsListComponent {
  isLoading = signal(false);
  inputContainer = viewChild.required(WebPageInputContainerComponent);
  summarizationService = inject(SummarizationService);

  summary = toSignal(
    this.summarizationService.bulletPointList$
      .pipe(
        scan((acc, translation) => ([...acc, translation]), [] as SummarizationResult[]),
        tap(() => this.isLoading.set(false)),
      ),
    { initialValue: [] as SummarizationResult[] }
  );

  constructor() {
    effect((cleanUp) => {
      const sub = outputToObservable(this.inputContainer().submittedPage)
        .pipe(filter((parameter) => !!parameter.url && !!parameter.code))
        .subscribe(({ url }) => {
          this.isLoading.set(true);
          this.summarizationService.summarizeToBulletPoints({
            url,
          });
        });

      cleanUp(() => sub.unsubscribe());
    })
  }
}
