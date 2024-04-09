import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Inject, Injectable } from '@nestjs/common';
import { loadSummarizationChain } from 'langchain/chains';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GOOGLE_CHAT_MODEL } from '~core/constants/translator.constant';
import { LANGUAGE_NAMES } from './enums/language_names.enum';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizeResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';
import { Languages } from './types/languages.type';

@Injectable()
export class GeminiSummarizationService implements Summarize {
  readonly languageMapper = new Map<Languages, LANGUAGE_NAMES>();

  constructor(@Inject(GOOGLE_CHAT_MODEL) private llm: ChatGoogleGenerativeAI) {
    this.languageMapper.set('en', LANGUAGE_NAMES.ENGLISH);
    this.languageMapper.set('es', LANGUAGE_NAMES.SPANISH);
    this.languageMapper.set('ja', LANGUAGE_NAMES.JAPANESE);
    this.languageMapper.set('vi', LANGUAGE_NAMES.VIETNAMESE);
    this.languageMapper.set('zh-Hans', LANGUAGE_NAMES.SIMPLIFIED_CHINESE);
    this.languageMapper.set('zh-Hant', LANGUAGE_NAMES.TRADITIONAL_CHINESE);
  }

  async summarize(input: SummarizeInput): Promise<SummarizeResult> {
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const template = `You are a helpful assistant who summarizes web page.
    Below you find the docuemnts of the web page:
    --------
    {text}
    --------

    Please Write a concise summary with the key information in ${language}. 
    Summary:
    `;
    const prompt = new PromptTemplate({
      template,
      inputVariables: ['text'],
    });
    const textSplitter = new RecursiveCharacterTextSplitter();
    const loader = new CheerioWebBaseLoader(input.url);
    const docs = await loader.loadAndSplit(textSplitter);

    const chain = loadSummarizationChain(this.llm, {
      type: 'stuff',
      prompt,
      verbose: true,
    });

    const chainValues = await chain.invoke({
      input_documents: docs,
      language,
    });

    console.log(chainValues);

    return Promise.resolve({
      url: input.url,
      result: chainValues.text || '',
    });
  }
}
