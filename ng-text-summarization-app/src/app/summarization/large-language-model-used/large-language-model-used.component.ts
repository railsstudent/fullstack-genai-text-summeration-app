import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SummarizationService } from '../services/summarization.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LargeLanguageModelUsed } from '../interfaces/llm-used.interface';

@Component({
  selector: 'app-large-language-model-used',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h3>Large Language Model used</h3>
      <p>
        Vendor:  {{ modelUsed().vendor }}
      </p>
      <p>
        Model: {{ modelUsed().model }}
      </p>
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

  modelUsed = toSignal(this.summarizationService.getLargeLanguageModelUsed(), {
    initialValue: {
      vendor: '',
      model: ''
    } as LargeLanguageModelUsed
  });
}
