import { Controller, Inject, Post } from '@nestjs/common';
import { SUMMARIZE_SERVICE } from '~summarization/application/constants/summarize.constant';
import { Summarize } from '~summarization/application/interfaces/summarize.interface';

@Controller('summarization')
export class SummarizationController {
  constructor(@Inject(SUMMARIZE_SERVICE) private service: Summarize) {}

  @Post()
  summarize() {
    return this.service.summarize({
      url: '',
      language: 'en',
    });
  }
}
