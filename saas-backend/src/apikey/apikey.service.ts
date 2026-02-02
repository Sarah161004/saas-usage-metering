import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}

  async createApiKey(userId: string) {
    const rawKey = crypto.randomUUID();

    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    const apiKey = await this.prisma.apiKey.create({
      data: {
        keyHash,
        userId,
        revoked: false,
      },
    });

    return {
      id: apiKey.id,
      userId: apiKey.userId,
      createdAt: apiKey.createdAt,
      revoked: apiKey.revoked,
      apiKey: rawKey,
    };
  }

  async findAll() {
    return this.prisma.apiKey.findMany({
      include: { user: true },
    });
  }
}
