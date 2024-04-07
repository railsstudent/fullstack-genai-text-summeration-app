import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { throttlerConfig } from '~configs/throttler.config';
import { AppController } from './app.controller';
import { SummarizationModule } from './summarization/summarization.module';
import { env } from '~configs/env.config';

@Module({
  imports: [throttlerConfig, SummarizationModule.register(env.AI.MODEL_TYPE)],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
