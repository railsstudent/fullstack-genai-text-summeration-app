import { Injectable } from '@nestjs/common';
import { env } from '~configs/env.config';
import { ModelProvider } from './interfaces/model-provider.interface';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizationResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';
import { SummarizationChainService } from './summarization-chain.service';

@Injectable()
export class GeminiSummarizationService implements Summarize {
  constructor(private chainService: SummarizationChainService) {}

  getLLModel(): ModelProvider {
    return {
      company: 'Google',
      developer: 'Google',
      model: env.GEMINI.MODEL_NAME,
    };
  }

  async summarize(input: SummarizeInput): Promise<SummarizationResult> {
    const stuffChain = await this.chainService.createParagraphsChain(input.topic);
    const text = await this.chainService.generateAnswer(stuffChain, input);

    return {
      url: input.url,
      text,
    };
  }

  async bulletPoints(input: SummarizeInput): Promise<SummarizationResult> {
    const stuffChain = await this.chainService.createBulletPointsChain(input.topic);
    const text = await this.chainService.generateAnswer(stuffChain, input);

    return {
      url: input.url,
      text,
    };
  }
}
