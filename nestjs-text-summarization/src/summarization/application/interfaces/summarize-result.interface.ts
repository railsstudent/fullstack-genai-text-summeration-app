import { IterableReadableStream } from '@langchain/core/utils/stream';
export interface SummarizeResult {
  url: string;
  result: string;
}

export interface SummarizationStream {
  stream: IterableReadableStream<string>;
}
