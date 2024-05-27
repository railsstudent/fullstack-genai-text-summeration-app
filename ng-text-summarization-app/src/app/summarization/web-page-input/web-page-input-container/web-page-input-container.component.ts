import { ChangeDetectionStrategy, Component, HostAttributeToken, inject, input, output } from '@angular/core';
import { SubmittedPage } from '~app/summarization/interfaces/summarization.interface';
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
  title = inject(new HostAttributeToken('title'), { optional: true }) || 'Ng Text Summarization Demo';
  submittedPage = output<SubmittedPage>();
}
