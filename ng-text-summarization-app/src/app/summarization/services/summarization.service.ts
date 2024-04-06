import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, retry, catchError, of } from 'rxjs';
import config from '~assets/config.json';
import { Summarization } from '../interfaces/summarization.interface';
import { SummarizationResult } from '../interfaces/summarization-result.interface';

@Injectable({
  providedIn: 'root'
})
export class SummarizationService {
  private readonly httpService = inject(HttpClient);

  private summarization = signal<Summarization>({
    url: '',
    isValid: false,
  });

  translation$  = toObservable(this.summarization)
    .pipe(
      filter(({ isValid }) => isValid),
      map(({ url, language='en' }) => ({ url, language })),
      switchMap((data) =>
        this.httpService.post<{ url: string; result: string }>(`${config.url}/summarize`, data)
          .pipe(
            retry(3),
            map(({ url='', result }) => ({
              url,
              result
            })),
            catchError((err) => {
              console.error(err);
              return of({
                url: data.url,
                result: 'No summarization due to error',
              });
            })
          )
      ),
      map((result) => result as SummarizationResult),
    );

  getSupportedLanguages() {
    return config.languages;
  }

  summarizePage(data: Summarization) {
    this.summarization.set(data);
  }
}
