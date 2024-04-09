import { ChatAnthropic } from '@langchain/anthropic';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { GOOGLE_LLM } from '~core/constants/translator.constant';

const claudeChatModel = new ChatAnthropic({
  modelName: 'claude-3-sonnet-20240229',
  temperature: 0,
  topK: 3,
  topP: 0.5,
  maxTokens: 1024,
  anthropicApiKey: env.GEMINI.API_KEY,
});

export const CLAUDE_LLM_PROVIDER: Provider = {
  provide: GOOGLE_LLM,
  useFactory: () => claudeChatModel,
};
