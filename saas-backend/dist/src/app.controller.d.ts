import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { UsageService } from './usage/usage.service';
import { PrismaService } from './prisma/prisma.service';
export declare class AppController {
    private readonly appService;
    private readonly emailService;
    private readonly usageService;
    private readonly prismaService;
    constructor(appService: AppService, emailService: EmailService, usageService: UsageService, prismaService: PrismaService);
    createTestUser(): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        planSlug: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    meter(body: {
        userId: string;
        apiKeyId?: string;
        endpoint: string;
        method: string;
        month: string;
    }): Promise<{
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
    getHello(): string;
    testEmail(): Promise<{
        success: boolean;
        status: number;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        status?: undefined;
    }>;
    createTestUserWithPlan(body?: {
        planName?: string;
        email?: string;
    }): Promise<({
        plan: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            requestsPerMonth: number;
            softLimitPercent: number;
            priceMonthly: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        planSlug: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }) | {
        error: string;
    }>;
    updateEmail(userId: string, body: {
        email: string;
    }): Promise<{
        plan: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            requestsPerMonth: number;
            softLimitPercent: number;
            priceMonthly: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        planSlug: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getPlans(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        slug: string;
        requestsPerMonth: number;
        softLimitPercent: number;
        priceMonthly: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    assignPlan(userId: string, body: {
        planName: string;
    }): Promise<({
        plan: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            requestsPerMonth: number;
            softLimitPercent: number;
            priceMonthly: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        planSlug: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }) | {
        error: string;
    }>;
}
