import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SUMMARIZE_SERVICE } from '~summarization/application/constants/summarize.constant';
import { Summarize } from '~summarization/application/interfaces/summarize.interface';
import { SummarizeDto } from '../dtos/summarize.dto';
import { SummarizationResult } from '~summarization/application/interfaces/summarize-result.interface';

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
          enum: ['en', 'zh-Hans', 'zh-Hant'],
        },
      },
    },
    examples: {
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
      angularSignals: {
        value: {
          url: 'https://angular.dev/guide/signals',
          code: 'zh-Hant',
        },
      },
      langchain: {
        value: {
          url: 'https://js.langchain.com/docs/expression_language/streaming#chains',
          code: 'en',
        },
      },
    },
  })
  @ApiResponse({
    description: 'The text summary',
    status: 201,
  })
  @Post()
  summarize(@Body() dto: SummarizeDto): Promise<SummarizationResult> {
    console.log('summarize called');
    return this.service.summarize(dto);
  }

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
          enum: ['en', 'zh-Hans', 'zh-Hant'],
        },
      },
    },
    examples: {
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
      angularSignals: {
        value: {
          url: 'https://angular.dev/guide/signals',
          code: 'zh-Hant',
        },
      },
      langchain: {
        value: {
          url: 'https://js.langchain.com/docs/expression_language/streaming#chains',
          code: 'en',
        },
      },
    },
  })
  @ApiResponse({
    description: 'The text summary',
    status: 201,
  })
  @Post('bullet-points')
  createBulletPoints(@Body() dto: SummarizeDto): Promise<SummarizationResult> {
    return this.service.bulletPoints(dto);
  }

  @ApiResponse({
    description: 'The large language model',
    schema: {
      type: 'object',
      properties: {
        vendor: { type: 'string', description: 'Vendor of the large language model' },
        model: { type: 'string', description: 'Name of the large language model' },
      },
    },
    status: 200,
  })
  @Get('llm')
  getLLModel(): { vendor: string; model: string } {
    return this.service.getLLModel();
  }
}
