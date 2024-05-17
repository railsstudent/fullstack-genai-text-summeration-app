import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MODEL_TYPE } from '~core/constants/translator.constant';
import { SUMMARIZE_SERVICE } from './application/constants/summarize.constant';
import { GeminiSummarizationService } from './application/gemini-summarization.service';
import { GroqSummarizationService } from './application/groq-summarization.service';
import { LLM_PROVIDER } from './application/providers/local-llm.provider';
import { SummarizationChainService } from './application/summarization-chain.service';
import { ModelTypes } from './infrastructure/types/model.type';
import { SummarizationController } from './presenters/http/summarization.controller';

@Module({
  controllers: [SummarizationController],
  providers: [SummarizationChainService],
})
export class SummarizationModule {
  static register(model: ModelTypes = 'gemini'): DynamicModule {
    const modelMap = new Map<ModelTypes, any>();
    modelMap.set('gemini', GeminiSummarizationService);
    modelMap.set('groq', GroqSummarizationService);

    const service = modelMap.get(model) || GeminiSummarizationService;
    const providers: Provider[] = [
      {
        provide: MODEL_TYPE,
        useValue: model,
      },
      LLM_PROVIDER,
      {
        provide: SUMMARIZE_SERVICE,
        useClass: service,
      },
    ];

    return {
      module: SummarizationModule,
      providers,
    };
  }
}
