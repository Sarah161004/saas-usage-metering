import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsageService } from './usage.service';

@Injectable()
export class UsageLoggingInterceptor implements NestInterceptor {
  constructor(private readonly usageService: UsageService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const user = req.user;      // set by ApiKeyGuard
    const apiKey = req.apiKey;  // set by ApiKeyGuard

    const endpoint = req.path;
    const method = req.method;
    const now = new Date();
    const month = now.toISOString().slice(0, 7); // "YYYY-MM"

    return next.handle().pipe(
      tap(async () => {
        if (!user) return; // safety

        await this.usageService.meter({
          userId: user.id,
          apiKeyId: apiKey?.id ?? null,
          endpoint,
          method,
          month,
        });
      }),
    );
  }
}
