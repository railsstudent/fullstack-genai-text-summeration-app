import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-summarize-translated-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      summarize-translated-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizeTranslatedPageComponent {

}
