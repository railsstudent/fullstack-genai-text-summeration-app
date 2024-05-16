import { ChatGroq } from '@langchain/groq';
import { env } from '~configs/env.config';

export const groqChatModel = new ChatGroq({
  apiKey: env.GROQ.API_KEY,
  model: env.GROQ.MODEL_NAME,
  maxTokens: 2048,
  temperature: 0,
});
