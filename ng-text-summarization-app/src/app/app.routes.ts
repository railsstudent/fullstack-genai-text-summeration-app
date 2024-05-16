import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'summarization-page',
    loadComponent: () => import('./summarization/summarize-paragraph-page/summarize-paragraph-page.component')
      .then((m) => m.SummarizeParagraphComponent),
    title: 'Text Summarization',
  },
  {
    path: 'summarization-as-list',
    loadComponent: () => import('./summarization/summarize-bullet-point/summarize-bullet-point.component')
      .then((m) => m.SummarizeBulletPointComponent),
    title: 'Bullet Points Summarization',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'summarization-page',
  },
  {
    path: '**',
    redirectTo: 'summarization-page'
  }
];
