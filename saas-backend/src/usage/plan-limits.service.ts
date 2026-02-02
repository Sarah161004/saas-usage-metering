// src/usage/plan-limits.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanLimitsService {
  constructor(private prisma: PrismaService) {}

  async checkAndHandleQuota(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },        // ✅ fetch plan with user
    });

    if (!user || !user.plan) {
      return { allowed: false, reason: 'NO_PLAN' };
    }

    const plan = user.plan;           // ✅ we know it exists here

    // month string like "2025-12"
    const now = new Date();
    const month = `${now.getFullYear()}-${String(
      now.getMonth() + 1,
    ).padStart(2, '0')}`;

    // use UsageLog model, filtered by stored month string
    const usageCount = await this.prisma.usageLog.count({
      where: {
        userId,
        month, // matches your UsageLog.month field
      },
    });

    // ✅ TAKE LIMIT FROM PLAN (e.g. plan.requestsPerMonth)
    const limit = plan.requestsPerMonth;   // not hard-coded 10

    const usageRatio = limit > 0 ? usageCount / limit : 0;

    // soft limit alert from Plan.softLimitPercent
    const alertThreshold = (plan.softLimitPercent ?? 80) / 100; // e.g. 0.8

    return {
      allowed: usageCount < limit, // hard cap
      usageCount,
      limit,
      usageRatio,
      shouldWarn: usageRatio >= alertThreshold && usageCount < limit,
      atOrOverLimit: usageCount >= limit,
    };
  }
}
