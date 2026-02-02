// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createTestUser() {
    const random = Date.now();

    const user = await this.prismaService.user.create({
      data: {
        email: `test+${random}@example.com`,
        name: 'Test User',
        // planId can be null; other fields have defaults
      },
    });

    return user;
  }

  async logUsage(params: {
    userId: string;
    apiKeyId?: string;
    endpoint: string;
    method: string;
    month: string;
  }) {
    const { userId, apiKeyId, endpoint, method, month } = params;

    return this.prismaService.usageLog.create({
      data: {
        userId,
        apiKeyId,
        endpoint,
        method,
        month,
      },
    });
  }
}
