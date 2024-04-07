import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SUMMARIZE_SERVICE } from '~summarization/application/constants/summarize.constant';
import { Summarize } from '~summarization/application/interfaces/summarize.interface';
import { SummarizeDto } from '../dtos/summarize.dto';

@Controller('summarization')
export class SummarizationController {
  constructor(@Inject(SUMMARIZE_SERVICE) private service: Summarize) {}

  @Post()
  summarize(@Body() dto: SummarizeDto) {
    return this.service.summarize(dto);
  }
}
