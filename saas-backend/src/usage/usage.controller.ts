// src/usage/usage.controller.ts
import { Body, Controller, Get, Param, Post /*, UseGuards*/ } from '@nestjs/common';
import { UsageService } from './usage.service';
import { CreateUsageDto } from './dto/create-usage.dto';
// import { ApiKeyGuard } from '../auth/apikey.guard';
import { PlanLimitsService } from './plan-limits.service';

@Controller('usage')
export class UsageController {
  constructor(
    private readonly usageService: UsageService,
    private readonly planLimitsService: PlanLimitsService,
  ) {}

  @Post('meter')
  // @UseGuards(ApiKeyGuard)
  async meter(@Body() dto: CreateUsageDto) {
    //const userId = dto.userId;

    //const quota = await this.planLimitsService.checkAndHandleQuota(userId);

   // if (!quota.allowed) {
      //return {
      //  message: 'Usage limit reached for your plan.',
       // usageCount: quota.usageCount,
       // limit: quota.limit,
     // };
    //}

    //if (quota.shouldWarn) {
      // later: send soft‑limit warning
   // }

    return this.usageService.meter(dto);
  }

  // 1) admin summary FIRST
  @Get('admin/summary/:month')
  // @UseGuards(ApiKeyGuard)
  async getAdminSummary(@Param('month') month: string) {
    return this.usageService.getAdminSummary(month);
  }

  // 2) billing
  @Get('billing/:userId/:month')
  // @UseGuards(ApiKeyGuard)
  async getMonthlyBill(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.usageService.getMonthlyBill(userId, month);
  }

  // 3) generic user/month route LAST
  @Get(':userId/:month')
  // @UseGuards(ApiKeyGuard)
  async getMonthly(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.usageService.getMonthlyCount(userId, month);
  }
  @Get('daily/:userId/:month')
  async getDailyUsage(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.usageService.getDailyUsage(userId, month);
  }

  @Get('by-endpoint/:userId/:month')
  async getUsageByEndpoint(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.usageService.getUsageByEndpoint(userId, month);
  }

  @Get('by-method/:userId/:month')
  async getUsageByMethod(
    @Param('userId') userId: string,
    @Param('month') month: string,
  ) {
    return this.usageService.getUsageByMethod(userId, month);
  }
}

