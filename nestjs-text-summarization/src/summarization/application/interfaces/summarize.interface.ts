import { SummarizeInput } from './summarize-input.interface';
import { SummarizeResult } from './summarize-result.interface';

export interface Summarize {
  summarize(input: SummarizeInput): Promise<SummarizeResult>;
}
