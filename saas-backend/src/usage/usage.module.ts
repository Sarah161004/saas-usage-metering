import { Module } from '@nestjs/common';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApiKeyGuard } from '../auth/apikey.guard';
import { ApiKeysModule } from '../apikey/apikey.module';
import { UsageLoggingInterceptor } from './usage-logging.interceptor';
import { PlanLimitsService } from './plan-limits.service'; // ⬅️ local import
import { EmailModule } from '../email/email.module';
@Module({
  imports: [ApiKeysModule,EmailModule],
  controllers: [UsageController],
  providers: [
    UsageService,
    PrismaService,
    ApiKeyGuard,
    UsageLoggingInterceptor,
    PlanLimitsService, // ⬅️ register here
  ],
  exports: [UsageService, UsageLoggingInterceptor],
})
export class UsageModule {}
