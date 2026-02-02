import { Module } from '@nestjs/common';
import { ApiKeyService } from './apikey.service';
import { ApiKeyController } from './apikey.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ApiKeyService, PrismaService],
  controllers: [ApiKeyController],
  exports: [ApiKeyService],
})
export class ApiKeysModule {}
