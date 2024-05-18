import { Module } from '@nestjs/common';
import { GeminiSummarizationService } from './application/gemini-summarization.service';
import { LLM_PROVIDER } from './application/providers/local-llm.provider';
import { SummarizationChainService } from './application/summarization-chain.service';
import { SummarizationController } from './presenters/http/summarization.controller';

@Module({
  controllers: [SummarizationController],
  providers: [SummarizationChainService, GeminiSummarizationService, LLM_PROVIDER],
})
export class SummarizationModule {}
