import { SummarizeInput } from './summarize-input.interface';
import { SummarizationStream, SummarizeResult } from './summarize-result.interface';

export interface Summarize {
  getLLModel(): { vendor: string; model: string };
  summarize(input: SummarizeInput): Promise<SummarizationStream>;
  bulletPoints(input: SummarizeInput): Promise<SummarizeResult>;
}
