import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'summarization-page',
    loadComponent: () => import('./summarization/summarize-translated-page/summarize-translated-page.component')
      .then((m) => m.SummarizeTranslatedPageComponent),
    title: 'Text Summarization',
  },
  {
    path: 'summarization-as-list',
    loadComponent: () => import('./summarization/summarize-as-list/summarize-as-list.component')
      .then((m) => m.SummarizeAsListComponent),
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
