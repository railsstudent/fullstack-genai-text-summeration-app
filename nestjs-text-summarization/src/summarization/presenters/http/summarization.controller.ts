import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModelProvider } from '~summarization/application/interfaces/model-provider.interface';
import { SummarizationResult } from '~summarization/application/interfaces/summarize-result.interface';
import { SummarizeDto } from '../dtos/summarize.dto';
import { GeminiSummarizationService } from './../../application/gemini-summarization.service';

@ApiTags('Text Summarization')
@Controller('summarization')
export class SummarizationController {
  constructor(private service: GeminiSummarizationService) {}

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
        topic: {
          type: 'string',
          description: 'topic of the summary',
        },
      },
    },
    examples: {
      angularSignals: {
        value: {
          url: 'https://angular.dev/guide/signals',
        },
      },
      langchain: {
        value: {
          url: 'https://js.langchain.com/docs/expression_language/streaming#chains',
          topic: 'langchain, streaming',
        },
      },
      vectorDatabase: {
        value: {
          url: 'https://aws.amazon.com/what-is/vector-databases/',
          topic: 'vector database',
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
        topic: {
          type: 'string',
          description: 'topic of the summary',
        },
      },
    },
    examples: {
      angularSignals: {
        value: {
          url: 'https://angular.dev/guide/signals',
        },
      },
      langchain: {
        value: {
          url: 'https://js.langchain.com/docs/expression_language/streaming#chains',
          topic: 'langchain, streaming',
        },
      },
      vectorDatabase: {
        value: {
          url: 'https://aws.amazon.com/what-is/vector-databases/',
          topic: 'vector database',
        },
      },
    },
  })
  @ApiResponse({
    description: 'The bullet point list',
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
        company: { type: 'string', description: 'Company of the large language model' },
        developer: { type: 'string', description: 'Developer of the large language model' },
        model: { type: 'string', description: 'Name of the large language model' },
      },
    },
    status: 200,
  })
  @Get('llm')
  getLLModel(): ModelProvider {
    return this.service.getLLModel();
  }
}
