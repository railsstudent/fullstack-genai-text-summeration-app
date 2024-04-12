import { SummarizeInput } from './summarize-input.interface';
import { SummarizeResult } from './summarize-result.interface';

export interface Summarize {
  getLLModel(): { vendor: string; model: string };
  summarize(input: SummarizeInput): Promise<SummarizeResult>;
  bulletPoints(input: SummarizeInput): Promise<SummarizeResult>;
}
