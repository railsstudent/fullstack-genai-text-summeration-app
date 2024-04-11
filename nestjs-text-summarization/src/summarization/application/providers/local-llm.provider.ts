import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { LLM, MODEL_NAME } from '~core/constants/translator.constant';
import { ModelTypes } from '~summarization/infrastructure/model.type';

const chatModel = new ChatGoogleGenerativeAI({
  modelName: env.GEMINI.MODEL_NAME,
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  temperature: 0.2,
  topK: 10,
  topP: 0.5,
  apiKey: env.GEMINI.API_KEY,
});

export const LLM_PROVIDER: Provider = {
  provide: LLM,
  inject: [MODEL_NAME],
  useFactory: (modelName: ModelTypes) => {
    console.log('modelName', modelName);
    let model = 'llama2';
    if (modelName === 'gemma') {
      model = 'gemma';
    } else if (modelName === 'gemini') {
      return chatModel;
    }

    return new ChatOllama({
      baseUrl: env.OLLAMA.BASE_URL,
      model,
      temperature: 0.2,
      topK: 10,
      topP: 0.5,
      verbose: true,
    });
  },
};
