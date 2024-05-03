import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGroq } from '@langchain/groq';
import { Inject, Injectable } from '@nestjs/common';
import { env } from '~configs/env.config';
import { LLM } from '~core/constants/translator.constant';
import { LANGUAGE_NAMES } from '~core/enums/language_names.enum';
import { getLanguages } from '~core/utilities/languages.util';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { SummarizationStream } from './interfaces/summarize-result.interface';
import { Summarize } from './interfaces/summarize.interface';

@Injectable()
export class GroqSummarizationService implements Summarize {
  private readonly languageMapper = getLanguages();

  constructor(@Inject(LLM) private model: ChatGroq) {}

  getLLModel(): { vendor: string; model: string } {
    return {
      vendor: 'Groq',
      model: env.GROQ.MODEL_NAME,
    };
  }

  async summarize(input: SummarizeInput): Promise<SummarizationStream> {
    console.log(input);
    const language = this.languageMapper.get(input.code) || LANGUAGE_NAMES.ENGLISH;
    const template = `You are a helpful assistant who summarizes web page.
    Below you find the URL of the web page:
    --------
    {url}
    --------

    Please write a summary that states the main topic and the key information in two paragraphs in {language}.
    Please strictly write the summary in two paragraph and no point form.

    Summary:
    `;
    const prompt = new PromptTemplate<{ url: string; language: string }>({
      template,
      inputVariables: ['url', 'language'],
    });

    const parser = new StringOutputParser();
    const chain = prompt.pipe(this.model).pipe(parser);

    const stream = await chain.stream({
      url: input.url,
      language,
    });

    return {
      stream,
    };
  }

  async bulletPoints(input: SummarizeInput): Promise<SummarizationStream> {
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

    const stream = await chain.stream({
      url: input.url,
      language,
    });

    return {
      stream,
    };
  }
}