import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'summarization-page',
    loadComponent: () => import('./summarization/summarize-page/summarize-page.component')
      .then((m) => m.SummarizePageComponent)
  },
  {
    path: 'summarization-translated-page',
    loadComponent: () => import('./summarization/summarize-translated-page/summarize-translated-page.component')
      .then((m) => m.SummarizeTranslatedPageComponent)
  },
  {
    path: 'summarization-as-list',
    loadComponent: () => import('./summarization/summarize-as-list/summarize-as-list.component')
      .then((m) => m.SummarizeAsListComponent)
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
