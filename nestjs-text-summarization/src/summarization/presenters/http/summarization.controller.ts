import { Body, Controller, Get, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ReadStream } from 'node:fs';
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
  async summarize(@Body() dto: SummarizeDto, @Res() res: Response): Promise<void> {
    const { stream } = await this.service.summarize(dto);
    const rs = ReadStream.from(stream);

    res.set({
      'Content-Type': 'application/text',
    });
    rs.pipe(res);
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
      angularSignals: {
        value: {
          url: 'https://angular.dev/guide/signals',
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
  @Post('bullet-points')
  createBulletPoints(@Body() dto: SummarizeDto): Promise<SummarizeResult> {
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
