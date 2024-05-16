import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubmittedPage, WebpageInputBoxModel } from '../../interfaces/summarization.interface';

@Component({
  selector: 'app-webpage-input-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="topic">
        <label for="topic">
          <span>Topic: </span>
          <input id="topic" name="topic" type="text" [(ngModel)]="topic" />
        </label>
      </div>
      <div>
        <label for="url">
          <span>Url: </span>
          <input id="url" name="url" type="text" [(ngModel)]="text" />
        </label>
        <button (click)="pageUrl.emit({ url: vm.url, topic: vm.topic })" [disabled]="vm.isLoading">{{ vm.buttonText }}</button>
      </div>
    </div>
  `,
  styles: `
    div.container {
      display: flex;
      flex-direction: column;
    }

    div.topic {
      margin-bottom: 0.75rem;
    }

    input {
      width: 50%;
      margin-right: 0.25rem;
      padding: 0.5rem;
    }

    span {
      margin-right: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebpageInputBoxComponent {
  topic = signal('');
  text = signal('');
  isLoading = input(false);

  viewModel = computed<WebpageInputBoxModel>(() => {
    return {
      topic: this.topic(),
      url: this.text(),
      isLoading: this.isLoading(),
      buttonText: this.isLoading() ? 'Summarizing...' : 'Summarize!',
    }
  });

  pageUrl = output<SubmittedPage>();

  get vm() {
    return this.viewModel();
  }
}
