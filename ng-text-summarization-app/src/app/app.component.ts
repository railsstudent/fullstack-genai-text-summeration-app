import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SummarizationShellComponent } from './summarization/summarization-shell/summarization-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SummarizationShellComponent],
  template: '<app-summarization-shell />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ng-text-summaration-app';
}
