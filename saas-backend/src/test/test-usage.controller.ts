import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/apikey.guard';
import { UsageLoggingInterceptor } from '../usage/usage-logging.interceptor';

@Controller('test-usage')
export class TestUsageController {
  @Get()
  @UseGuards(ApiKeyGuard)                   // check x-api-key
  @UseInterceptors(UsageLoggingInterceptor) // log UsageLog row
  getTest() {
    return { ok: true };
  }
}
