import { Provider } from '@nestjs/common';
import { LLM } from '~core/constants/translator.constant';
import { googleChatModel } from '../models/gemini.model';

export const LLM_PROVIDER: Provider = {
  provide: LLM,
  useValue: googleChatModel,
};
