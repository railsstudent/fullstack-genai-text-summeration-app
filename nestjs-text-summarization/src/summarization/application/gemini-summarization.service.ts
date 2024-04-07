import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Inject, Injectable } from '@nestjs/common';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizeResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';
import { GOOGLE_CHAT_MODEL_PROVIDER } from './providers/gemini-chat-model.provider';
import { loadSummarizationChain } from 'langchain/chains';
import { LANGUAGE_NAMES } from './enums/language_names.enum';
import { Languages } from './types/languages.type';

@Injectable()
export class GeminiSummarizationService implements Summarize {
  readonly languageMapper = new Map<Languages, LANGUAGE_NAMES>();

  constructor(@Inject(GOOGLE_CHAT_MODEL_PROVIDER) private llm: ChatGoogleGenerativeAI) {
    this.languageMapper.set('en', LANGUAGE_NAMES.ENGLISH);
    this.languageMapper.set('es', LANGUAGE_NAMES.SPANISH);
    this.languageMapper.set('ja', LANGUAGE_NAMES.JAPANESE);
    this.languageMapper.set('vi', LANGUAGE_NAMES.VIETNAMESE);
    this.languageMapper.set('zh-Hans', LANGUAGE_NAMES.SIMPLIFIED_CHINESE);
    this.languageMapper.set('zh-Hant', LANGUAGE_NAMES.TRADITIONAL_CHINESE);
  }

  async summarize(input: SummarizeInput): Promise<SummarizeResult> {
    const language = this.languageMapper.get(input.code);
    const template = `You are a helpful assistant that summarizes the URL delimited by the triple quotes
    '''{url}''' in {language}.

    Summarize the web page into 3 sentences in a professional tone.

    Summary:
    `;
    const promptTemplate = PromptTemplate.fromTemplate(template);
    const chain = loadSummarizationChain(this.llm, {
      type: 'map_reduce',
      combineMapPrompt: promptTemplate,
      verbose: true,
    });

    const chainValues = await chain.invoke({
      url: input.url,
      language,
    });

    console.log(chainValues);

    return Promise.resolve({
      url: input.url,
      result: 'result',
    });
  }
}
