import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Inject, Injectable } from '@nestjs/common';
import { env } from '~configs/env.config';
import { LLM } from '~core/constants/translator.constant';
import { getLanguages } from '~core/utilities/languages.util';
import { LANGUAGE_NAMES } from '../../core/enums/language_names.enum';
import { ModelProvider } from './interfaces/model-provider.interface';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizationResult } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { loadSummarizationChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

@Injectable()
export class GeminiSummarizationService implements Summarize {
  private readonly languageMapper = getLanguages();

  constructor(@Inject(LLM) private model: ChatGoogleGenerativeAI) {}

  getLLModel(): ModelProvider {
    return {
      company: 'Google',
      developer: 'Google',
      model: env.GEMINI.MODEL_NAME,
    };
  }

  async summarize(input: SummarizeInput): Promise<SummarizationResult> {
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const loader = new CheerioWebBaseLoader(input.url);
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 50 });
    const docs = await loader.loadAndSplit(textSplitter);

    // const mapPromptTemplate = `
    //   Write a summary of this chunk of text that includes the main points and any important details in {language}.
    //   {text}
    // `;
    // const mapPrompt = new PromptTemplate<{ text: string; language: string }>({
    //   template: mapPromptTemplate,
    //   inputVariables: ['text', 'language'],
    // });

    // const combinePromptTemplate = `
    //   Write a concise summary of the following text delimited by triple quotes.
    //   Return your response in two paragraphs which covers the key points of the text.
    //   """{text}"""
    //   Summary:
    // `;

    // const combinePrompt = new PromptTemplate({
    //   template: combinePromptTemplate,
    //   inputVariables: ['text'],
    // });

    // const mapReduceChain = loadSummarizationChain(this.model, {
    //   type: 'map_reduce',
    //   returnIntermediateSteps: true,
    //   combineMapPrompt: mapPrompt,
    //   combinePrompt: combinePrompt,
    // });

    // const results = await mapReduceChain.invoke({
    //   input_documents: docs,
    //   language,
    // });

    const stuffPromptTemplate = `
      Write a concise summary of the following text delimited by triple quotes.
      Return your response in two paragraphs which covers the key points of the text in {language}.
      """{text}"""
      Summary:
  `;

    const stuffPrompt = new PromptTemplate<{ text: string; language: string }>({
      template: stuffPromptTemplate,
      inputVariables: ['text', 'language'],
    });

    const stuffChain = loadSummarizationChain(this.model, {
      type: 'stuff',
      prompt: stuffPrompt,
      verbose: true,
    });

    const results = await stuffChain.invoke({
      input_documents: docs,
      language,
    });

    // const template = `You are a helpful assistant who summarizes web page.
    // Below you find the URL of the web page:
    // --------
    // {url}
    // --------

    // Please write a summary that states the main topic and the key information in two paragraphs in {language}.
    // Please strictly write the summary in two paragraphs and no point form.

    // Summary:
    // `;
    // const prompt = new PromptTemplate<{ url: string; language: string }>({
    //   template,
    //   inputVariables: ['url', 'language'],
    // });

    // const parser = new StringOutputParser();
    // const chain = prompt.pipe(this.model).pipe(parser);

    // const text = await chain.invoke({
    //   url: input.url,
    //   language,
    // });

    return {
      url: input.url,
      text: results.text,
    };
  }

  async bulletPoints(input: SummarizeInput): Promise<SummarizationResult> {
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const template = `You are a helpful assistant who summarizes web page.
    Below you find the docuemnts of the web page:
    --------
    {url}
    --------

    Please write a bullet point list that lists the key information in {language}. 

    Bullet Point List:
    `;
    const prompt = new PromptTemplate<{ url: string; language: string }>({
      template,
      inputVariables: ['url', 'language'],
    });

    const parser = new StringOutputParser();
    const chain = prompt.pipe(this.model).pipe(parser);

    const text = await chain.invoke({
      url: input.url,
      language,
    });

    return {
      url: input.url,
      text,
    };
  }
}
