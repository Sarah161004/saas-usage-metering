import { UsageService } from '../usage/usage.service';
export declare class WebhookController {
    private readonly usageService;
    constructor(usageService: UsageService);
    receiveUsage(body: any): Promise<{
        ok: boolean;
        logged: {
            id: string;
            endpoint: string;
            method: string;
            timestamp: Date;
            month: string;
            userId: string;
            apiKeyId: string | null;
        };
    }>;
}
