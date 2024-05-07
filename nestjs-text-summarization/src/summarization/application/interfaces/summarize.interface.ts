import { SummarizeInput } from './summarize-input.interface';
import { SummarizationResult } from './summarize-result.interface';

export interface Summarize {
  getLLModel(): { vendor: string; model: string };
  summarize(input: SummarizeInput): Promise<SummarizationResult>;
  bulletPoints(input: SummarizeInput): Promise<SummarizationResult>;
}
