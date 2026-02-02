import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApiKeysModule } from './apikey/apikey.module';
import { ApiKeyGuard } from './auth/apikey.guard';
import { TestProtectedController } from './test/test-protected.controller';
import { TestUsageController } from './test/test-usage.controller';
import { SecureModule } from './secure/secure.module';
import { UsersModule } from './users/users.module';
import { UsageModule } from './usage/usage.module';
import { EmailModule } from './email/email.module';
import { WebhookModule } from './webhook/webhook.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    UsageModule,
    ApiKeysModule,SecureModule, UsersModule,EmailModule,WebhookModule
  ],
  controllers: [AppController,TestProtectedController,TestUsageController],
  providers: [AppService, ApiKeyGuard], // ⬅️ register guard here
})
export class AppModule {}
