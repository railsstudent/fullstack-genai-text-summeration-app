import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Inject, Injectable } from '@nestjs/common';
import { loadSummarizationChain, StuffDocumentsChain } from 'langchain/chains';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { LLM } from '~core/constants/translator.constant';
import { SummarizeInput } from './interfaces/summarize-input.interface';
import { ChatGroq } from '@langchain/groq';

@Injectable()
export class PromptService {
  constructor(@Inject(LLM) private model: ChatGoogleGenerativeAI | ChatGroq) {}

  createParagraphsChain(topic: string): StuffDocumentsChain {
    const topicInput = topic ? ` of {topic}` : '';
    const systemMessage = `Write a summary of the following text delimited by triple dashes which covers the key points${topicInput}.`;
    const stuffPromptTemplate = `
        ${systemMessage}
        Return your response in two paragraphs without bullet points.
        ---{text}---
        PARAGRAPH:`;

    const inputVariables = topic ? ['text', 'topic'] : ['text'];
    const stuffPrompt = new PromptTemplate({
      template: stuffPromptTemplate,
      inputVariables,
    });

    return loadSummarizationChain(this.model, {
      type: 'stuff',
      prompt: stuffPrompt,
      verbose: true,
    }) as StuffDocumentsChain;
  }

  createBulletPointsChain(topic: string): StuffDocumentsChain {
    const topicInput = topic ? ` of {topic}` : '';
    const systemMessage = `Write a summary of the following text delimited by triple dashes which covers the key points${topicInput}.`;
    const stuffPromptTemplate = `
        ${systemMessage}
        Return your response in bullet points.
        ---{text}---
        BULLET POINT SUMMARY:`;

    const inputVariables = topic ? ['text', 'topic'] : ['text'];
    const stuffPrompt = new PromptTemplate({
      template: stuffPromptTemplate,
      inputVariables,
    });

    return loadSummarizationChain(this.model, {
      type: 'stuff',
      prompt: stuffPrompt,
      verbose: true,
    }) as StuffDocumentsChain;
  }

  private async createDocumentsFromUrl(url: string) {
    const loader = new CheerioWebBaseLoader(url);
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000, chunkOverlap: 100 });
    return loader.loadAndSplit(textSplitter);
  }

  async generateAnswer(stuffChain: StuffDocumentsChain, input: SummarizeInput): Promise<string> {
    const { url, topic } = input;
    const docs = await this.createDocumentsFromUrl(url);
    const topicInputVariable = topic ? { topic } : {};
    const results = await stuffChain.invoke({
      ...topicInputVariable,
      input_documents: docs,
    });

    return results.text as string;
  }
}
