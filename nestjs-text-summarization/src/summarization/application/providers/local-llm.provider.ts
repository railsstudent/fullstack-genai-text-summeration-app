import { Provider } from '@nestjs/common';
import { LLM, MODEL_TYPE } from '~core/constants/translator.constant';
import { ModelTypes } from '~summarization/infrastructure/types/model.type';
import { googleChatModel } from '../models/gemini.model';
import { groqChatModel } from '../models/groq.model';

export const LLM_PROVIDER: Provider = {
  provide: LLM,
  inject: [MODEL_TYPE],
  useFactory: (modelType: ModelTypes) => {
    if (modelType === 'gemini') {
      return googleChatModel;
    }

    return groqChatModel;
  },
};
