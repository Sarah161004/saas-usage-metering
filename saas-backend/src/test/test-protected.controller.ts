// src/test/test-protected.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/apikey.guard';

@Controller('test-protected')
export class TestProtectedController {
  @Get()
  @UseGuards(ApiKeyGuard)
  getProtected() {
    return { ok: true };
  }
}
