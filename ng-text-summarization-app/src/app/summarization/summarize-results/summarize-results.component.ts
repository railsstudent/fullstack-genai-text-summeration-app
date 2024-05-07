import { SummarizationResult } from '../interfaces/summarization-result.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-summarize-results',
  standalone: true,
  imports: [],
  template: `
    <h3>Text Summarization: </h3>
    @if (results().length > 0) {
    <div class="list">
      @for (item of results(); track item) {
        <div>
          <span>Url: </span>
          <p [innerHTML]="item.url"></p>
        </div>
        <div>
          <span>Result: </span>
          <p [innerHTML]="item.text"></p>
        </div>
        <hr />
      }
    </div>
    } @else {
      <p>No summarization</p>
    }
  `,
  styles: `
    h3 {
      font-size: 1.5rem;
      font-style: italic;
      text-decoration: underline;
      margin-bottom: 0.75rem;
    }

    p, span {
      display: inline-block;
    }

    div.list {
      border: 1px solid black;
      border-radius: 4px;
      padding: 1rem;
      width: 50%;
      height: 300px;
      overflow-y: scroll;
    }

    div.list > div {
      display: flex;
    }

    span {
      width: 20%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizeResultsComponent {
  results = input.required<SummarizationResult[]>();
}
