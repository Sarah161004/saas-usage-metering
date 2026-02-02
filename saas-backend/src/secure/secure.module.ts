import { Module } from '@nestjs/common';
import { SecureController } from './secure.controller';
import { UsageModule } from '../usage/usage.module'; // if you have a module for UsageService
import { ApiKeysModule } from '../apikey/apikey.module';
import { ApiKeyGuard } from '../auth/apikey.guard';
@Module({
  imports: [UsageModule,ApiKeysModule], // or provide UsageService directly if not using a module
  controllers: [SecureController],
  providers: [ApiKeyGuard],
})
export class SecureModule {}
