import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { LLM, MODEL_TYPE } from '~core/constants/translator.constant';
import { ModelTypes } from '~summarization/infrastructure/types/model.type';

const googleChatModel = new ChatGoogleGenerativeAI({
  model: env.GEMINI.MODEL_NAME,
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
  temperature: 0,
  topK: 10,
  topP: 0.5,
  apiKey: env.GEMINI.API_KEY,
});

const groqChatModel = new ChatGroq({
  apiKey: env.GROQ.API_KEY,
  model: env.GROQ.MODEL_NAME,
  maxTokens: 2048,
  temperature: 0,
});

export const LLM_PROVIDER: Provider = {
  provide: LLM,
  inject: [MODEL_TYPE],
  useFactory: (modelType: ModelTypes) => {
    if (modelType === 'gemini') {
      console.log('return google chat model');
      return googleChatModel;
    }

    console.log('return groq chat model');
    return groqChatModel;
  },
};
