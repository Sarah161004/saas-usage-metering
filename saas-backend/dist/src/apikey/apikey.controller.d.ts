import { ApiKeyService } from './apikey.service';
export declare class ApiKeyController {
    private readonly apiKeyService;
    constructor(apiKeyService: ApiKeyService);
    create(userId: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        revoked: boolean;
        apiKey: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string | null;
            createdAt: Date;
            email: string;
            password: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            updatedAt: Date;
            planSlug: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        keyHash: string;
        revoked: boolean;
        lastUsedAt: Date | null;
    })[]>;
}
