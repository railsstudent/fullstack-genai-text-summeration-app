import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-summarize-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      summarize-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizePageComponent {

}
