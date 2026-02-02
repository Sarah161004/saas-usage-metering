import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiKeyService } from './apikey.service';

@Controller('apikeys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  create(@Body('userId') userId: string) {
    return this.apiKeyService.createApiKey(userId);
  }

  @Get()
  findAll() {
    return this.apiKeyService.findAll();
  }
}
