import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SummarizationService } from '../services/summarization.service';

@Component({
  selector: 'app-large-language-model-used',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>
      <h3>Large Language Model used</h3>
      @if (modelUsed$ | async; as modelUsed) {
        <p>Company:  {{ modelUsed.company }}</p>
        <p>Developer:  {{ modelUsed.developer }}</p>
        <p>Model: {{ modelUsed.model }}</p>
      }
    </div>
  `,
  styles: `
    div {
      padding: 0.5rem;
    }

    p, h3 {
      text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeLanguageModelUsedComponent {
  summarizationService = inject(SummarizationService);

  modelUsed$ = this.summarizationService.getLargeLanguageModelUsed();
}
