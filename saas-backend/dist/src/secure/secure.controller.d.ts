import type { Request } from 'express';
import { UsageService } from '../usage/usage.service';
export declare class SecureController {
    private readonly usageService;
    constructor(usageService: UsageService);
    test(req: Request): Promise<{
        ok: boolean;
        message: string;
    }>;
}
