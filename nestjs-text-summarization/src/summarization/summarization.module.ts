import { Module } from '@nestjs/common';
import { SummarizationService } from './application/summarization.service';
import { SummarizationController } from './presenters/http/summarization.controller';

@Module({
  providers: [SummarizationService],
  controllers: [SummarizationController],
})
export class SummarizationModule {}
