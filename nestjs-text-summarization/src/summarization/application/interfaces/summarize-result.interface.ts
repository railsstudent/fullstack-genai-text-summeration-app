import { IterableReadableStream } from '@langchain/core/utils/stream';

export interface SummarizationStream {
  stream: IterableReadableStream<string>;
}
