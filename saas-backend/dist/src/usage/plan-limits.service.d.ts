import { PrismaService } from '../prisma/prisma.service';
export declare class PlanLimitsService {
    private prisma;
    constructor(prisma: PrismaService);
    checkAndHandleQuota(userId: string): Promise<{
        allowed: boolean;
        reason: string;
        usageCount?: undefined;
        limit?: undefined;
        usageRatio?: undefined;
        shouldWarn?: undefined;
        atOrOverLimit?: undefined;
    } | {
        allowed: boolean;
        usageCount: number;
        limit: number;
        usageRatio: number;
        shouldWarn: boolean;
        atOrOverLimit: boolean;
        reason?: undefined;
    }>;
}
