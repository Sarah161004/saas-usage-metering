import { Body, Controller, Post } from '@nestjs/common';
import { UsageService } from '../usage/usage.service';
import { CreateUsageDto } from '../usage/dto/create-usage.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly usageService: UsageService) {}

  @Post('usage')
  async receiveUsage(@Body() body: any) {
    // Map incoming webhook body to your CreateUsageDto
    const dto: CreateUsageDto = {
      userId: body.userId,
      apiKeyId: null,
      endpoint: body.endpoint ?? '/webhook/demo',
      method: body.method ?? 'POST',
      month: undefined, // let service compute current month
    };

    const result = await this.usageService.meter(dto);

    return { ok: true, logged: result.log };
  }
}
