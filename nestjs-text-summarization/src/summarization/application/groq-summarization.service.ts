import { Injectable } from '@nestjs/common';
import { Summarize } from './interfaces/summarize.interface';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizationStream } from './interfaces/summarize-result.interface';
import { env } from '~configs/env.config';

@Injectable()
export class GroqSummarizationService implements Summarize {
  getLLModel(): { vendor: string; model: string } {
    return {
      vendor: 'Groq',
      model: env.AI.MODEL_TYPE,
    };
  }
  summarize(input: SummarizeInput): Promise<SummarizationStream> {
    console.log(input);
    throw new Error('Method not implemented.');
  }

  bulletPoints(input: SummarizeInput): Promise<SummarizationStream> {
    console.log(input);
    throw new Error('Method not implemented.');
  }
}
