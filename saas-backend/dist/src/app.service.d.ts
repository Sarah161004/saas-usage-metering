import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getHello(): string;
    createTestUser(): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        updatedAt: Date;
        planSlug: string | null;
    }>;
    logUsage(params: {
        userId: string;
        apiKeyId?: string;
        endpoint: string;
        method: string;
        month: string;
    }): Promise<{
        id: string;
        userId: string;
        apiKeyId: string | null;
        endpoint: string;
        method: string;
        month: string;
        timestamp: Date;
    }>;
}
