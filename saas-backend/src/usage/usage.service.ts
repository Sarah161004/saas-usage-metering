// src/usage/usage.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsageDto } from './dto/create-usage.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private getMonthString(date = new Date()): string {
    return date.toISOString().slice(0, 7);
  }

  async meter(dto: CreateUsageDto) {
    const month = dto.month ?? this.getMonthString();

    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      include: { plan: true },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const plan = user.plan;
    const userEmail = user.email;

    const currentCount = await this.prisma.usageLog.count({
      where: {
        userId: dto.userId,
        month,
      },
    });

    console.log(
      'PLAN DEBUG',
      userEmail,
      plan?.name,
      plan?.requestsPerMonth,
      plan?.softLimitPercent,
      'currentCount=',
      currentCount,
    );

    let softLimitTriggered = false;
    let hardLimitTriggered = false;

    if (plan) {
      const hardLimit = plan.requestsPerMonth;
      const softLimit = Math.floor(
        (plan.requestsPerMonth * plan.softLimitPercent) / 100,
      );
      const nextCount = currentCount + 1;

      if (currentCount < softLimit && nextCount >= softLimit) {
        softLimitTriggered = true;
      }

      if (nextCount > hardLimit) {
        hardLimitTriggered = true;
      }

      if (hardLimitTriggered) {
        await this.prisma.alert.create({
          data: {
            userId: dto.userId,
            threshold: hardLimit,
            type: 'OVERAGE',
            message: `User exceeded monthly hard limit of ${hardLimit} requests`,
          },
        });

        console.log('HARD LIMIT EMAIL', userEmail, month, nextCount);

        await this.emailService.sendHardLimitEmail(
          userEmail,
          month,
          nextCount,
          hardLimit,
        );

        throw new ForbiddenException('Monthly request limit exceeded');
      }
    }

    const log = await this.prisma.usageLog.create({
      data: {
        userId: dto.userId,
        apiKeyId: dto.apiKeyId ?? null,
        endpoint: dto.endpoint,
        method: dto.method,
        month,
      },
    });

    if (softLimitTriggered && plan) {
      await this.prisma.alert.create({
        data: {
          userId: dto.userId,
          threshold: plan.requestsPerMonth,
          type: 'SOFT_LIMIT',
          message: `User reached ${plan.softLimitPercent}% of monthly limit (${plan.requestsPerMonth} requests)`,
        },
      });

      console.log(
        'SOFT LIMIT EMAIL',
        userEmail,
        month,
        currentCount + 1,
        '/',
        plan.requestsPerMonth,
      );

      await this.emailService.sendSoftLimitEmail(
        userEmail,
        month,
        currentCount + 1,
        plan.requestsPerMonth,
      );
    }

    return { success: true, log };
  }

  async getMonthlyCount(userId: string, month: string) {
    const count = await this.prisma.usageLog.count({
      where: { userId, month },
    });
    return { userId, month, count };
  }

  // 🔹 EDITED: make this match BillingResponse
  async getMonthlyBill(userId: string, month: string) {
    const { count } = await this.getMonthlyCount(userId, month);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    const plan = user?.plan ?? null;

    // base price per call (or derive from plan)
    const pricePerCall =
      plan?.priceMonthly != null && plan.requestsPerMonth > 0
        ? Number(plan.priceMonthly) / plan.requestsPerMonth
        : 0.01;

    const amount = count * pricePerCall;

    const requestsPerMonth = plan?.requestsPerMonth ?? 0;
    const softLimitPercent = plan?.softLimitPercent ?? 80;
    const softLimit =
      requestsPerMonth > 0
        ? Math.floor((requestsPerMonth * softLimitPercent) / 100)
        : 0;

    const isOverSoftLimit = softLimit > 0 && count >= softLimit;
    const isOverHardLimit =
      requestsPerMonth > 0 && count > requestsPerMonth;

    return {
      userId,
      month,
      count,
      pricePerCall,
      amount,
      planName: plan?.name ?? null,
      requestsPerMonth,
      softLimitPercent,
      softLimit,
      isOverSoftLimit,
      isOverHardLimit,
    };
  }

  async getAdminSummary(month: string) {
    const users = await this.prisma.user.findMany({
      include: { plan: true },
    });

    const results = await Promise.all(
      users.map(async (user) => {
        const count = await this.prisma.usageLog.count({
          where: { userId: user.id, month },
        });

        const plan = user.plan;
        const hardLimit = plan?.requestsPerMonth ?? 0;
        const softLimitPercent = plan?.softLimitPercent ?? 80;
        const softLimit =
          hardLimit > 0 ? Math.floor((hardLimit * softLimitPercent) / 100) : 0;

        const isOverSoftLimit = softLimit > 0 && count >= softLimit;
        const isOverHardLimit = hardLimit > 0 && count > hardLimit;

        return {
          userId: user.id,
          email: user.email,
          planName: plan?.name ?? null,
          requestsPerMonth: hardLimit,
          count,
          isOverSoftLimit,
          isOverHardLimit,
        };
      }),
    );

    return results;
  }

  // NEW METHODS FOR CHARTS ⬇️

  async getDailyUsage(userId: string, month: string) {
    const logs = await this.prisma.usageLog.findMany({
      where: { userId, month },
      orderBy: { timestamp: 'asc' },
    });

    const dailyData: Record<string, { date: string; requests: number }> = {};

    logs.forEach((log) => {
      const date = log.timestamp.toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { date, requests: 0 };
      }
      dailyData[date].requests += 1;
    });

    return Object.values(dailyData);
  }

  async getUsageByEndpoint(userId: string, month: string) {
    const logs = await this.prisma.usageLog.findMany({
      where: { userId, month },
    });

    const endpointData: Record<string, { endpoint: string; count: number }> =
      {};

    logs.forEach((log) => {
      if (!endpointData[log.endpoint]) {
        endpointData[log.endpoint] = { endpoint: log.endpoint, count: 0 };
      }
      endpointData[log.endpoint].count += 1;
    });

    return Object.values(endpointData);
  }

  async getUsageByMethod(userId: string, month: string) {
    const logs = await this.prisma.usageLog.findMany({
      where: { userId, month },
    });

    const methodData: Record<string, { method: string; count: number }> = {};

    logs.forEach((log) => {
      if (!methodData[log.method]) {
        methodData[log.method] = { method: log.method, count: 0 };
      }
      methodData[log.method].count += 1;
    });

    return Object.values(methodData);
  }
}
