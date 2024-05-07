import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, scan, tap } from 'rxjs';
import { SummarizationResult } from '../interfaces/summarization-result.interface';
import { TranslatedSummarizationModel } from '../interfaces/summarization.interface';
import { LanguageSelectorComponent } from '../language-selectors/language-selector.component';
import { SummarizationService } from '../services/summarization.service';
import { WebpageInputBoxComponent } from '../webpage-input-box/webpage-input-box.component';
import { SummarizeResultsComponent } from '../summarize-results/summarize-results.component';

@Component({
  selector: 'app-summarize-translated-page',
  standalone: true,
  imports: [WebpageInputBoxComponent, LanguageSelectorComponent, SummarizeResultsComponent],
  template: `
    <div class="container">
      <h2>Ng Translated Text Summarization Demo</h2>
      <div class="summarization">
        <app-language-selector  [languages]="languages" [(language)]="language" />
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
export class SummarizeTranslatedPageComponent {
  isLoading = signal(false);
  language = signal('en');
  box = viewChild.required(WebpageInputBoxComponent);
  summarizationService = inject(SummarizationService);

  languages = this.summarizationService.getSupportedLanguages();
  viewModel = computed<TranslatedSummarizationModel>(() => {
    return {
      isLoading: this.isLoading(),
      pageUrl: this.box().pageUrl,
      language: this.language(),
      // translationList: this.translationList(),
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
          tap((url) => console.log(url, this.vm.language)),
          filter((url) => !!url && !!this.vm.language)
        )
        .subscribe((url) => {
          this.isLoading.set(true);
          this.summarizationService.summarizePage({
            url,
            language: this.vm.language,
          });
        });

      cleanUp(() => sub.unsubscribe());
    })
  }
}
