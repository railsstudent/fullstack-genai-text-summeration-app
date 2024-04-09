import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Inject, Injectable } from '@nestjs/common';
import { loadSummarizationChain } from 'langchain/chains';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { GOOGLE_LLM } from '~core/constants/translator.constant';
import { getLanguages } from '~core/utilities/languages.util';
import { LANGUAGE_NAMES } from '../../core/enums/language_names.enum';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizeResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';

@Injectable()
export class GeminiSummarizationService implements Summarize {
  private readonly languageMapper = getLanguages();

  constructor(@Inject(GOOGLE_LLM) private llm: ChatGoogleGenerativeAI) {}

  async summarize(input: SummarizeInput): Promise<SummarizeResult> {
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const template = `You are a helpful assistant who summarizes web page.
    Below you find the docuemnts of the web page:
    --------
    {text}
    --------

    Please Write a concise summary that states the main topic and lists the key information in ${language}. 
    Summary:
    `;
    const prompt = new PromptTemplate({
      template,
      inputVariables: ['text'],
    });

    const textSplitter = new CharacterTextSplitter({ chunkSize: 3000, chunkOverlap: 500 });
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
