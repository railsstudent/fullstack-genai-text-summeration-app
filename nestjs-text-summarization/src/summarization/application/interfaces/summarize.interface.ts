import { ModelProvider } from './model-provider.interface';
import { SummarizeInput } from './summarize-input.interface';
import { SummarizationResult } from './summarize-result.interface';

export interface Summarize {
  getLLModel(): ModelProvider;
  summarize(input: SummarizeInput): Promise<SummarizationResult>;
  bulletPoints(input: SummarizeInput): Promise<SummarizationResult>;
}
