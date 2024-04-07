import { DynamicModule, Module } from '@nestjs/common';
import { GeminiSummarizationService } from './application/gemini-summarization.service';
import { SummarizationController } from './presenters/http/summarization.controller';
import { SUMMARIZE_SERVICE } from './application/constants/summarize.constant';
import { ModelTypes } from './infrastructure/model.type';

@Module({
  controllers: [SummarizationController],
})
export class SummarizationModule {
  static register(model: ModelTypes): DynamicModule {
    const modelMap = new Map<ModelTypes, any>();
    modelMap.set('gemini', GeminiSummarizationService);

    const service = modelMap.get(model) || GeminiSummarizationService;
    return {
      module: SummarizationModule,
      providers: [
        {
          provide: SUMMARIZE_SERVICE,
          useClass: service,
        },
      ],
    };
  }
}
