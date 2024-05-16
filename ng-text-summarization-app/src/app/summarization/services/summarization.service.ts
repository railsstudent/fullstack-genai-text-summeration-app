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

  private textSummarization = signal<Summarization>({
    url: '',
  });

  private bulletPointsSummization = signal<Summarization>({
    url: '',
  });

  result$  = toObservable(this.textSummarization)
    .pipe(
      filter((data) => !!data.url),
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

  bulletPointList$  = toObservable(this.bulletPointsSummization)
    .pipe(
      filter((data) => !!data.url),
      map((data) => ({ url: data.url })),
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

  summarizeText(data: Summarization) {
    this.textSummarization.set(data);
  }

  summarizeToBulletPoints(data: Summarization) {
    this.bulletPointsSummization.set(data);
  }

  getLargeLanguageModelUsed(): Observable<LargeLanguageModelUsed> {
    return this.httpService.get<LargeLanguageModelUsed>(`${config.url}/summarization/llm`);
  }
}
