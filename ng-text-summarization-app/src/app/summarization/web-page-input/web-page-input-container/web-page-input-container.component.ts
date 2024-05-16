import { ChangeDetectionStrategy, Component, effect, HostAttributeToken, inject, input, output, signal, viewChild } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SummarizationService } from '~app/summarization/services/summarization.service';
import { WebpageInputBoxComponent } from '../webpage-input-box/webpage-input-box.component';

@Component({
  selector: 'app-web-page-input-container',
  standalone: true,
  imports: [WebpageInputBoxComponent],
  template: `
    <h2>{{ title }}</h2>
    <div class="summarization">
      <!-- <app-language-selector  [languages]="languages" [(code)]="code" /> -->
      <app-webpage-input-box [isLoading]="isLoading()" />
    </div>
  `,
  styles: `
    div.summarization {
      margin-top: 1rem;
      margin-bottom: 2rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebPageInputContainerComponent {
  code = signal('en');
  isLoading = input.required<boolean>();
  box = viewChild.required(WebpageInputBoxComponent);
  
  title = inject(new HostAttributeToken('title'), { optional: true }) || 'Ng Text Summarization Demo';
  summarizationService = inject(SummarizationService);
  // languages = this.summarizationService.getSupportedLanguages();

  submittedPage = output<{ url: string; code: string }>();

  constructor() {
    effect((cleanUp) => {
      const sub = outputToObservable(this.box().pageUrl)
        .pipe(map((url) => ({ url, code: this.code() })))
        .subscribe((result) => this.submittedPage.emit(result));

      cleanUp(() => sub.unsubscribe());
    });
  }
}
