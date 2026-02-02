// src/secure/secure.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { ApiKeyGuard } from '../auth/apikey.guard';
import { UsageService } from '../usage/usage.service';

@Controller('secure')
export class SecureController {
  constructor(private readonly usageService: UsageService) {}

  @Get('test')
  @UseGuards(ApiKeyGuard)
  async test(@Req() req: Request) {
    const anyReq = req as any;

    try {
      await this.usageService.meter({
        userId: anyReq.user.id,
        apiKeyId: anyReq.apiKey.id,
        endpoint: '/secure/test',
        method: 'GET',
        month: new Date().toISOString().slice(0, 7),
      });
    } catch (e) {
      console.error('TEMP: ignoring meter error', e);
      // do NOT rethrow; just continue
    }

    return {
      ok: true,
      message: 'Secure endpoint accessed successfully',
    };
  }
}
