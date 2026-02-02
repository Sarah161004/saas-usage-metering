import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { UsageModule } from '../usage/usage.module';

@Module({
  imports: [UsageModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
