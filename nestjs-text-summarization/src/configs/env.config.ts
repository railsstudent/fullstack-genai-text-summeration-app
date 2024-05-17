import dotenv from 'dotenv';
import { ModelTypes } from '~summarization/infrastructure/types/model.type';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  AI: {
    MODEL_TYPE: (process.env.MODEL_TYPE || 'gemini') as ModelTypes,
  },
  GEMINI: {
    API_KEY: process.env.GOOGLE_GEMINI_API_KEY || '',
    MODEL_NAME: process.env.GOOGLE_GEMINI_MODEL || 'gemini-pro',
  },
  GROQ: {
    API_KEY: process.env.GROQ_API_KEY || '',
    MODEL_NAME: process.env.GROQ_MODEL || '',
  },
};
