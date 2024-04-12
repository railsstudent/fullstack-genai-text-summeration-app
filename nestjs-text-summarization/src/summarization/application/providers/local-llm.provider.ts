import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Logger, Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { LLM, MODEL_TYPE } from '~core/constants/translator.constant';
import { GEMMA_2B, LLAMA2_LATEST } from '~summarization/infrastructure/constants/ollama-model-names.constant';
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

const logger = new Logger('LLM_PROVIDER');

export const LLM_PROVIDER: Provider = {
  provide: LLM,
  inject: [MODEL_TYPE],
  useFactory: (modelType: ModelTypes) => {
    const modelMap = new Map<ModelTypes, string>();
    modelMap.set('gemma', GEMMA_2B);
    modelMap.set('llama2', LLAMA2_LATEST);

    const model = modelMap.get(modelType) || '';
    logger.log(
      `model: ${model}, modelType, ${modelType}, model: ${model}, env.OLLAMA.APP_BASE_URL: ${env.OLLAMA.APP_BASE_URL}`,
    );
    if (!model) {
      return chatModel;
    }

    return new ChatOllama({
      baseUrl: env.OLLAMA.APP_BASE_URL,
      model,
      temperature: 0.2,
      topK: 10,
      topP: 0.5,
      verbose: true,
      numPredict: 2048, // max output tokens
    });
  },
};
