import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MODEL_NAME } from '~core/constants/translator.constant';
import { SUMMARIZE_SERVICE } from './application/constants/summarize.constant';
import { GeminiSummarizationService } from './application/gemini-summarization.service';
import { LLM_PROVIDER } from './application/providers/local-llm.provider';
import { ModelTypes } from './infrastructure/model.type';
import { SummarizationController } from './presenters/http/summarization.controller';

@Module({
  controllers: [SummarizationController],
})
export class SummarizationModule {
  static register(model: ModelTypes = 'gemini'): DynamicModule {
    const modelMap = new Map<ModelTypes, any>();
    modelMap.set('gemini', GeminiSummarizationService);

    const service = modelMap.get(model) || GeminiSummarizationService;
    const providers: Provider[] = [
      {
        provide: MODEL_NAME,
        useValue: model,
      },
      LLM_PROVIDER,
    ];

    if (model === 'gemini') {
      providers.push({
        provide: SUMMARIZE_SERVICE,
        useClass: service,
      });
    }

    return {
      module: SummarizationModule,
      providers,
    };
  }
}
