import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, filter, map, Observable, of, retry, switchMap } from 'rxjs';
import config from '~assets/config.json';
import { LargeLanguageModelUsed } from '../interfaces/llm-used.interface';
import { SummarizationResult } from '../interfaces/summarization-result.interface';
import { Summarization } from '../interfaces/summarization.interface';

function summarizeWebPage(data: Summarization) {
  return function (source: Observable<SummarizationResult>) {
    return source.pipe(
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
  }
}

@Injectable({
  providedIn: 'root'
})
export class SummarizationService {
  private readonly httpService = inject(HttpClient);

  private textSummarization = signal<Summarization>({
    url: '',
    topic: '',
  });

  private bulletPointsSummization = signal<Summarization>({
    url: '',
    topic: '',
  });

  result$  = toObservable(this.textSummarization)
    .pipe(
      filter((data) => !!data.url),
      switchMap((data) =>
        this.httpService.post<SummarizationResult>(`${config.url}/summarization`, data)
          .pipe(summarizeWebPage(data))
      ),
      map((result) => result as SummarizationResult),
    );

  bulletPointList$  = toObservable(this.bulletPointsSummization)
    .pipe(
      filter((data) => !!data.url),
      switchMap((data) =>
        this.httpService.post<SummarizationResult>(`${config.url}/summarization/bullet-points`, data)
          .pipe(summarizeWebPage(data))
      ),
      map((result) => result as SummarizationResult),
    );  
  
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
