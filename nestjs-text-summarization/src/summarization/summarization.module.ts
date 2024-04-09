import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SUMMARIZE_SERVICE } from './application/constants/summarize.constant';
import { GeminiSummarizationService } from './application/gemini-summarization.service';
import { GOOGLE_LLM_PROVIDER } from './application/providers/gemini-llm.provider';
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
        provide: SUMMARIZE_SERVICE,
        useClass: service,
      },
    ];

    if (model === 'gemini') {
      providers.push(GOOGLE_LLM_PROVIDER);
    }

    return {
      module: SummarizationModule,
      providers,
    };
  }
}
