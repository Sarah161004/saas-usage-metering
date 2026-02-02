import { PrismaService } from '../prisma/prisma.service';
import { CreateUsageDto } from './dto/create-usage.dto';
import { EmailService } from '../email/email.service';
export declare class UsageService {
    private readonly prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    private getMonthString;
    meter(dto: CreateUsageDto): Promise<{
        success: boolean;
        log: {
            id: string;
            endpoint: string;
            method: string;
            timestamp: Date;
            month: string;
            userId: string;
            apiKeyId: string | null;
        };
    }>;
    getMonthlyCount(userId: string, month: string): Promise<{
        userId: string;
        month: string;
        count: number;
    }>;
    getMonthlyBill(userId: string, month: string): Promise<{
        userId: string;
        month: string;
        count: number;
        pricePerCall: number;
        amount: number;
        planName: string;
        requestsPerMonth: number;
        softLimitPercent: number;
        softLimit: number;
        isOverSoftLimit: boolean;
        isOverHardLimit: boolean;
    }>;
    getAdminSummary(month: string): Promise<{
        userId: string;
        email: string;
        planName: string;
        requestsPerMonth: number;
        count: number;
        isOverSoftLimit: boolean;
        isOverHardLimit: boolean;
    }[]>;
    getDailyUsage(userId: string, month: string): Promise<{
        date: string;
        requests: number;
    }[]>;
    getUsageByEndpoint(userId: string, month: string): Promise<{
        endpoint: string;
        count: number;
    }[]>;
    getUsageByMethod(userId: string, month: string): Promise<{
        method: string;
        count: number;
    }[]>;
}
