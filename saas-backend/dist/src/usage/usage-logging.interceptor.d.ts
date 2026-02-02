import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsageService } from './usage.service';
export declare class UsageLoggingInterceptor implements NestInterceptor {
    private readonly usageService;
    constructor(usageService: UsageService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
