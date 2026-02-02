// src/app.controller.ts

import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { UsageService } from './usage/usage.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
    private readonly usageService: UsageService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('user/test')
  async createTestUser() {
    const user = await this.appService.createTestUser();
    return user;
  }

  @Post('usage/meter')
  async meter(
    @Body()
    body: {
      userId: string;
      apiKeyId?: string;
      endpoint: string;
      method: string;
      month: string;
    },
  ) {
    return await this.usageService.meter(body);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test-email')
  async testEmail() {
    return await this.emailService.testEmail();
  }

  @Post('user/test-with-plan')
  async createTestUserWithPlan(@Body() body?: { planName?: string; email?: string }) {
    const planName = body?.planName || 'Free';
    const email = body?.email || `test+${Date.now()}@example.com`;

    const plan = await this.prismaService.plan.findFirst({
      where: { name: planName },
    });

    if (!plan) {
      return { error: `Plan '${planName}' not found. Available plans: Free, Pro, Enterprise, Basic` };
    }

    const user = await this.prismaService.user.create({
      data: {
        email: email,
        name: 'Test User',
        planSlug: plan.slug, // CHANGED: Use planSlug instead of planId
      },
      include: { plan: true },
    });

    return user;
  }

  @Patch('user/:userId/email')
  async updateEmail(
    @Param('userId') userId: string,
    @Body() body: { email: string },
  ) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { email: body.email },
      include: { plan: true },
    });
    return user;
  }

  @Get('plans')
  async getPlans() {
    const plans = await this.prismaService.plan.findMany();
    return plans;
  }

  @Patch('user/:userId/assign-plan')
  async assignPlan(
    @Param('userId') userId: string,
    @Body() body: { planName: string },
  ) {
    const plan = await this.prismaService.plan.findFirst({
      where: { name: body.planName },
    });

    if (!plan) {
      return { error: 'Plan not found' };
    }

    // FIXED: Use planSlug instead of planId
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { 
        planSlug: plan.slug // Use slug, not id
      },
      include: { plan: true },
    });

    return user;
  }
}