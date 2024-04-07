import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SummarizationShellComponent } from './summarization/summarization-shell/summarization-shell.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SummarizationShellComponent],
  template: '<app-summarization-shell />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Generative Ai - Text Summarization Demo');
  }
}
