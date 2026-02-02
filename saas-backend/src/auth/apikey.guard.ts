import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    // private readonly apiKeyService: ApiKeyService,
    // private readonly usageService: UsageService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const apiKey = req.headers['x-api-key'] as string | undefined;

    if (!apiKey) {
      throw new UnauthorizedException('Missing API key');
    }

    // 1) Validate API key (demo: always valid)
    const apiKeyValid = true;
    // const keyRecord = await this.apiKeyService.findByKey(apiKey);
    // const apiKeyValid = !!keyRecord && !keyRecord.revoked;

    if (!apiKeyValid) {
      throw new UnauthorizedException('API key is invalid or revoked');
    }

    // 2) Attach info to request for controller (demo values)
    (req as any).user = { id: 'demo-user-id' };
    (req as any).apiKey = { id: 'demo-apikey-id', key: apiKey };

    // If you still want apiAuth, you can also keep this:
    (req as any).apiAuth = {
      userId: 'demo-user-id',
      apiKeyId: 'demo-apikey-id',
    };

    return true;
  }
}
