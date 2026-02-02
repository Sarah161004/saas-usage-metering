import { UsageService } from './usage.service';
import { CreateUsageDto } from './dto/create-usage.dto';
import { PlanLimitsService } from './plan-limits.service';
export declare class UsageController {
    private readonly usageService;
    private readonly planLimitsService;
    constructor(usageService: UsageService, planLimitsService: PlanLimitsService);
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
    getAdminSummary(month: string): Promise<{
        userId: string;
        email: string;
        planName: string;
        requestsPerMonth: number;
        count: number;
        isOverSoftLimit: boolean;
        isOverHardLimit: boolean;
    }[]>;
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
    getMonthly(userId: string, month: string): Promise<{
        userId: string;
        month: string;
        count: number;
    }>;
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
