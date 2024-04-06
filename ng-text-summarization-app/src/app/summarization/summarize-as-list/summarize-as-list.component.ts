import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-summarize-as-list',
  standalone: true,
  imports: [],
  template: `
    <p>
      summarize-as-list works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizeAsListComponent {

}
