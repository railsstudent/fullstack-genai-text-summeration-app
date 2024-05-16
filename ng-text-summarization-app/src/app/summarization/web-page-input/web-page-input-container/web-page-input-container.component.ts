import { ChangeDetectionStrategy, Component, HostAttributeToken, inject, input, output, viewChild } from '@angular/core';
import { SubmittedPage } from '~app/summarization/interfaces/summarization.interface';
import { SummarizationService } from '~app/summarization/services/summarization.service';
import { WebpageInputBoxComponent } from '../webpage-input-box/webpage-input-box.component';

@Component({
  selector: 'app-web-page-input-container',
  standalone: true,
  imports: [WebpageInputBoxComponent],
  template: `
    <h2>{{ title }}</h2>
    <div class="summarization">
      <app-webpage-input-box [isLoading]="isLoading()" (pageUrl)="submittedPage.emit($event)" />
    </div>
  `,
  styles: `
    div.summarization {
      margin-top: 1rem;
      margin-bottom: 2rem;

      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebPageInputContainerComponent {
  isLoading = input.required<boolean>();
  box = viewChild.required(WebpageInputBoxComponent);
  
  title = inject(new HostAttributeToken('title'), { optional: true }) || 'Ng Text Summarization Demo';
  summarizationService = inject(SummarizationService);

  submittedPage = output<SubmittedPage>();
}
