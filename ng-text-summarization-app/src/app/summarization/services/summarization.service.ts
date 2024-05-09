import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, filter, map, Observable, of, retry, switchMap } from 'rxjs';
import config from '~assets/config.json';
import { LargeLanguageModelUsed } from '../interfaces/llm-used.interface';
import { SummarizationResult } from '../interfaces/summarization-result.interface';
import { Summarization } from '../interfaces/summarization.interface';

@Injectable({
  providedIn: 'root'
})
export class SummarizationService {
  private readonly httpService = inject(HttpClient);

  private summarization = signal<Summarization>({
    url: '',
    code: 'en',
  });

  result$  = toObservable(this.summarization)
    .pipe(
      filter((data) => !!data.url && !!data.code),
      map((data) => ({ url: data.url, code: data.code })),
      switchMap((data) =>
        this.httpService.post<{ url: string; text: string }>(`${config.url}/summarization`, data)
          .pipe(
            retry(3),
            map(({ url='', text }) => ({
              url,
              text
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

    bulletPointList$  = toObservable(this.summarization)
      .pipe(
        filter((data) => !!data.url && !!data.code),
        map((data) => ({ url: data.url, code: data.code })),
        switchMap((data) =>
          this.httpService.post<{ url: string; text: string }>(`${config.url}/summarization/bullet-points`, data)
            .pipe(
              retry(3),
              map(({ url='', text }) => ({
                url,
                text
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

  getLargeLanguageModelUsed(): Observable<LargeLanguageModelUsed> {
    return this.httpService.get<LargeLanguageModelUsed>(`${config.url}/summarization/llm`);
  }
}
