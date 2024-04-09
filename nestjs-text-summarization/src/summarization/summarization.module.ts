import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GeminiSummarizationService } from './application/gemini-summarization.service';
import { SummarizationController } from './presenters/http/summarization.controller';
import { SUMMARIZE_SERVICE } from './application/constants/summarize.constant';
import { ModelTypes } from './infrastructure/model.type';
import { GOOGLE_CHAT_MODEL_PROVIDER } from './application/providers/gemini-chat-model.provider';

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
      providers.push(GOOGLE_CHAT_MODEL_PROVIDER);
    }

    return {
      module: SummarizationModule,
      providers,
    };
  }
}
