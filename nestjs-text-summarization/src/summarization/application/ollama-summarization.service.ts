import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { PromptTemplate } from '@langchain/core/prompts';
import { Inject, Injectable } from '@nestjs/common';
import { loadSummarizationChain } from 'langchain/chains';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { env } from '~configs/env.config';
import { LLM } from '~core/constants/translator.constant';
import { LANGUAGE_NAMES } from '~core/enums/language_names.enum';
import { getLanguages } from '~core/utilities/languages.util';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizeResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';

@Injectable()
export class OllamaSummarizationService implements Summarize {
  private readonly languageMapper = getLanguages();

  constructor(@Inject(LLM) private ollamaLlm: ChatOllama) {}

  getLLModel(): { vendor: string; model: string } {
    return {
      vendor: 'Ollama',
      model: env.AI.MODEL_TYPE,
    };
  }

  async summarize(input: SummarizeInput): Promise<SummarizeResult> {
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const template = `You are a helpful assistant who summarizes web page.
    Below you find the docuemnts of the web page:
    --------
    {text}
    --------

    Please write a summary that states the main topic and lists the key information in two paragraphs in ${language}. 
    Please strictly write in the format of paragraphs and no point form.
    When you do not support ${language}, reply "I do not support ${language}" and stop.

    Paragraphs:
    `;
    const prompt = new PromptTemplate({
      template,
      inputVariables: ['text'],
    });

    const textSplitter = new CharacterTextSplitter({ chunkSize: 3000, chunkOverlap: 500 });
    const loader = new CheerioWebBaseLoader(input.url);
    const docs = await loader.loadAndSplit(textSplitter);

    const chain = loadSummarizationChain(this.ollamaLlm, {
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

  async bulletPoints(input: SummarizeInput): Promise<SummarizeResult> {
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const template = `You are a helpful assistant who summarizes web page.
    Below you find the docuemnts of the web page:
    --------
    {text}
    --------

    Please write a bullet point list that lists the main topic and the key information in ${language}. 
    Bullet Point List:
    `;
    const prompt = new PromptTemplate({
      template,
      inputVariables: ['text'],
    });

    const textSplitter = new CharacterTextSplitter({ chunkSize: 3000, chunkOverlap: 500 });
    const loader = new CheerioWebBaseLoader(input.url);
    const docs = await loader.loadAndSplit(textSplitter);

    const chain = loadSummarizationChain(this.ollamaLlm, {
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
