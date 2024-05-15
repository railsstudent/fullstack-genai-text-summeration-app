import { Injectable } from '@nestjs/common';
import { env } from '~configs/env.config';
import { ModelProvider } from './interfaces/model-provider.interface';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizationResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';
import { PromptService } from './prompt.service';

@Injectable()
export class GroqSummarizationService implements Summarize {
  // private readonly languageMapper = getLanguages();

  // constructor(@Inject(LLM) private model: ChatGroq) {}
  constructor(private promptService: PromptService) {}

  getLLModel(): ModelProvider {
    return {
      company: 'Groq',
      developer: 'Meta',
      model: env.GROQ.MODEL_NAME,
    };
  }

  async summarize(input: SummarizeInput): Promise<SummarizationResult> {
    const stuffChain = await this.promptService.createParagraphsChain(input.topic);
    const text = await this.promptService.generateAnswer(stuffChain, input);

    return {
      url: input.url,
      text,
    };
  }

  async bulletPoints(input: SummarizeInput): Promise<SummarizationResult> {
    const stuffChain = await this.promptService.createBulletPointsChain(input.topic);
    const text = await this.promptService.generateAnswer(stuffChain, input);

    return {
      url: input.url,
      text,
    };
  }
}
