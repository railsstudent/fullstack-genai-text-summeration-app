import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebpageInputBoxModel } from '../../interfaces/summarization.interface';

@Component({
  selector: 'app-webpage-input-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label for="url">
      <span>Url: </span>
      <input name="url" type="text" [(ngModel)]="text" />
    </label>
    <button (click)="pageUrl.emit(vm.text)" [disabled]="vm.isLoading">{{ vm.buttonText }}</button>
  `,
  styles: `
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
  text = signal('');
  isLoading = input(false);

  viewModel = computed<WebpageInputBoxModel>(() => {
    return {
      text: this.text(),
      isLoading: this.isLoading(),
      buttonText: this.isLoading() ? 'Summarizing...' : 'Summarize!',
    }
  });

  pageUrl = output<string>();

  get vm() {
    return this.viewModel();
  }
}
