import { Injectable } from '@nestjs/common';
import { Summarize } from './interfaces/summarize.interface';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizeResult } from './interfaces/summarize-result.interface';

@Injectable()
export class GeminiSummarizationService implements Summarize {
  summarize(input: SummarizeInput): Promise<SummarizeResult> {
    return Promise.resolve({
      url: input.url,
      result: 'result',
    });
  }
}
