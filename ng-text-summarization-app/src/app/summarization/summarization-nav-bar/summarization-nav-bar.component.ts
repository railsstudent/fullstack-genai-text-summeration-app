import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-summarization-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <h3>Main Menu</h3>
    <ul>
      <li>
        <a routerLink="/summarization-page"  routerLinkActive="active-link">Text Summarization</a>
      </li>
      <li>
        <a routerLink="/summarization-as-list"  routerLinkActive="active-link">Bullet Points Summarization</a>
      </li>
    </ul>
  `,
  styles: `
    ul, h3 {
      padding: 0.5rem;
    }

    ul > li {
      padding: 0.5rem;
      padding-left: 0;
      list-style-type: none;
    }

    .active-link {
      font-size: 1.1rem;
      font-weight: bold;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummarizationNavBarComponent {}
