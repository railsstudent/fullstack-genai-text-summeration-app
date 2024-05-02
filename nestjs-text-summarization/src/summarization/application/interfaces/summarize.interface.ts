import { SummarizeInput } from './summarize-input.interface';
import { SummarizationStream } from './summarize-result.interface';

export interface Summarize {
  getLLModel(): { vendor: string; model: string };
  summarize(input: SummarizeInput): Promise<SummarizationStream>;
  bulletPoints(input: SummarizeInput): Promise<SummarizationStream>;
}
