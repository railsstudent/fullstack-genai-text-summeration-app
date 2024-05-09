import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LargeLanguageModelUsedComponent } from '../large-language-model-used/large-language-model-used.component';
import { SummarizationNavBarComponent } from '../summarization-nav-bar/summarization-nav-bar.component';

@Component({
  selector: 'app-summarization-shell',
  standalone: true,
  imports: [RouterOutlet, SummarizationNavBarComponent, LargeLanguageModelUsedComponent],
  template: `
    <div class="grid">
      <app-summarization-nav-bar class="nav-bar" />
      <div class="main">
        <router-outlet></router-outlet>
      </div>
      <app-large-language-model-used class="model-used" />
    </div>
  `,
  styles: `
    div.grid {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-template-rows: 1fr 85px;
      height: 100vh;
    }

    .nav-bar {
      grid-column: 1 / 2;
      grid-row: 1;

      border: 1px solid #4aa;
    }

    div.main, router-outlet + * {
      grid-column: 2 / 5;
      grid-row: 1;
    }

    .model-used {
      grid-column: 1 / 5;
      grid-row: 2;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    div.main {
      border: 1px solid #4aa;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizationShellComponent {}
