import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SUMMARIZE_SERVICE } from '~summarization/application/constants/summarize.constant';
import { SummarizeResult } from '~summarization/application/interfaces/summarize-result.interface';
import { Summarize } from '~summarization/application/interfaces/summarize.interface';
import { SummarizeDto } from '../dtos/summarize.dto';

@ApiTags('Text Summarization')
@Controller('summarization')
export class SummarizationController {
  constructor(@Inject(SUMMARIZE_SERVICE) private service: Summarize) {}

  @ApiBody({
    description: 'An intance of SummarizeDto',
    required: true,
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL of the web page',
        },
        code: {
          type: 'string',
          description: 'language code',
          enum: ['en', 'es', 'zh-Hans', 'zh-Hant', 'vi', 'ja'],
        },
      },
    },
    examples: {
      klookTaipeiSpanish: {
        value: {
          url: 'https://www.klook.com/zh-TW/activity/17290-beitou-yangmingshan-tour-taipei/',
          code: 'es',
        },
      },
      klookTaipeiSimplifiedChinese: {
        value: {
          url: 'https://www.klook.com/zh-TW/activity/17290-beitou-yangmingshan-tour-taipei/',
          code: 'zh-Hans',
        },
      },
      klookTaiChungEnglish: {
        value: {
          url: 'https://www.klook.com/zh-TW/activity/3010-cherry-blossom-wuling-farm-yilan/',
          code: 'en',
        },
      },
      claude: {
        value: {
          url: 'https://www.mlyearning.org/claude-api-key/',
          code: 'zh-Hant',
        },
      },
    },
  })
  @ApiResponse({
    description: 'The text summary',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'the URL of the web page' },
        result: { type: 'string', description: 'the text summarization' },
      },
    },
    status: 200,
  })
  @HttpCode(200)
  @Post()
  summarize(@Body() dto: SummarizeDto): Promise<SummarizeResult> {
    return this.service.summarize(dto);
  }
}
