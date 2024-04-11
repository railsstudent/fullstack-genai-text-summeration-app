import dotenv from 'dotenv';
import { ModelTypes } from '~summarization/infrastructure/model.type';

dotenv.config();

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  AI: {
    MODEL_TYPE: (process.env.MODEL_TYPE || 'gemini') as ModelTypes,
  },
  GEMINI: {
    API_KEY: process.env.GOOGLE_GEMINI_API_KEY || '',
    MODEL_NAME: process.env.GOOGLE_GEMINI_MODEL || '',
  },
  OLLAMA: {
    BASE_URL: OLLAMA_BASE_URL,
    APP_BASE_URL: process.env.APP_OLLAMA_BASE_URL || OLLAMA_BASE_URL,
  },
};
