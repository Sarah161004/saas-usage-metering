"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
let UsageService = class UsageService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    getMonthString(date = new Date()) {
        return date.toISOString().slice(0, 7);
    }
    async meter(dto) {
        const month = dto.month ?? this.getMonthString();
        const user = await this.prisma.user.findUnique({
            where: { id: dto.userId },
            include: { plan: true },
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const plan = user.plan;
        const userEmail = user.email;
        const currentCount = await this.prisma.usageLog.count({
            where: {
                userId: dto.userId,
                month,
            },
        });
        console.log('PLAN DEBUG', userEmail, plan?.name, plan?.requestsPerMonth, plan?.softLimitPercent, 'currentCount=', currentCount);
        let softLimitTriggered = false;
        let hardLimitTriggered = false;
        if (plan) {
            const hardLimit = plan.requestsPerMonth;
            const softLimit = Math.floor((plan.requestsPerMonth * plan.softLimitPercent) / 100);
            const nextCount = currentCount + 1;
            if (currentCount < softLimit && nextCount >= softLimit) {
                softLimitTriggered = true;
            }
            if (nextCount > hardLimit) {
                hardLimitTriggered = true;
            }
            if (hardLimitTriggered) {
                await this.prisma.alert.create({
                    data: {
                        userId: dto.userId,
                        threshold: hardLimit,
                        type: 'OVERAGE',
                        message: `User exceeded monthly hard limit of ${hardLimit} requests`,
                    },
                });
                console.log('HARD LIMIT EMAIL', userEmail, month, nextCount);
                await this.emailService.sendHardLimitEmail(userEmail, month, nextCount, hardLimit);
                throw new common_1.ForbiddenException('Monthly request limit exceeded');
            }
        }
        const log = await this.prisma.usageLog.create({
            data: {
                userId: dto.userId,
                apiKeyId: dto.apiKeyId ?? null,
                endpoint: dto.endpoint,
                method: dto.method,
                month,
            },
        });
        if (softLimitTriggered && plan) {
            await this.prisma.alert.create({
                data: {
                    userId: dto.userId,
                    threshold: plan.requestsPerMonth,
                    type: 'SOFT_LIMIT',
                    message: `User reached ${plan.softLimitPercent}% of monthly limit (${plan.requestsPerMonth} requests)`,
                },
            });
            console.log('SOFT LIMIT EMAIL', userEmail, month, currentCount + 1, '/', plan.requestsPerMonth);
            await this.emailService.sendSoftLimitEmail(userEmail, month, currentCount + 1, plan.requestsPerMonth);
        }
        return { success: true, log };
    }
    async getMonthlyCount(userId, month) {
        const count = await this.prisma.usageLog.count({
            where: { userId, month },
        });
        return { userId, month, count };
    }
    async getMonthlyBill(userId, month) {
        const { count } = await this.getMonthlyCount(userId, month);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        const plan = user?.plan ?? null;
        const pricePerCall = plan?.priceMonthly != null && plan.requestsPerMonth > 0
            ? Number(plan.priceMonthly) / plan.requestsPerMonth
            : 0.01;
        const amount = count * pricePerCall;
        const requestsPerMonth = plan?.requestsPerMonth ?? 0;
        const softLimitPercent = plan?.softLimitPercent ?? 80;
        const softLimit = requestsPerMonth > 0
            ? Math.floor((requestsPerMonth * softLimitPercent) / 100)
            : 0;
        const isOverSoftLimit = softLimit > 0 && count >= softLimit;
        const isOverHardLimit = requestsPerMonth > 0 && count > requestsPerMonth;
        return {
            userId,
            month,
            count,
            pricePerCall,
            amount,
            planName: plan?.name ?? null,
            requestsPerMonth,
            softLimitPercent,
            softLimit,
            isOverSoftLimit,
            isOverHardLimit,
        };
    }
    async getAdminSummary(month) {
        const users = await this.prisma.user.findMany({
            include: { plan: true },
        });
        const results = await Promise.all(users.map(async (user) => {
            const count = await this.prisma.usageLog.count({
                where: { userId: user.id, month },
            });
            const plan = user.plan;
            const hardLimit = plan?.requestsPerMonth ?? 0;
            const softLimitPercent = plan?.softLimitPercent ?? 80;
            const softLimit = hardLimit > 0 ? Math.floor((hardLimit * softLimitPercent) / 100) : 0;
            const isOverSoftLimit = softLimit > 0 && count >= softLimit;
            const isOverHardLimit = hardLimit > 0 && count > hardLimit;
            return {
                userId: user.id,
                email: user.email,
                planName: plan?.name ?? null,
                requestsPerMonth: hardLimit,
                count,
                isOverSoftLimit,
                isOverHardLimit,
            };
        }));
        return results;
    }
    async getDailyUsage(userId, month) {
        const logs = await this.prisma.usageLog.findMany({
            where: { userId, month },
            orderBy: { timestamp: 'asc' },
        });
        const dailyData = {};
        logs.forEach((log) => {
            const date = log.timestamp.toISOString().split('T')[0];
            if (!dailyData[date]) {
                dailyData[date] = { date, requests: 0 };
            }
            dailyData[date].requests += 1;
        });
        return Object.values(dailyData);
    }
    async getUsageByEndpoint(userId, month) {
        const logs = await this.prisma.usageLog.findMany({
            where: { userId, month },
        });
        const endpointData = {};
        logs.forEach((log) => {
            if (!endpointData[log.endpoint]) {
                endpointData[log.endpoint] = { endpoint: log.endpoint, count: 0 };
            }
            endpointData[log.endpoint].count += 1;
        });
        return Object.values(endpointData);
    }
    async getUsageByMethod(userId, month) {
        const logs = await this.prisma.usageLog.findMany({
            where: { userId, month },
        });
        const methodData = {};
        logs.forEach((log) => {
            if (!methodData[log.method]) {
                methodData[log.method] = { method: log.method, count: 0 };
            }
            methodData[log.method].count += 1;
        });
        return Object.values(methodData);
    }
};
exports.UsageService = UsageService;
exports.UsageService = UsageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], UsageService);
//# sourceMappingURL=usage.service.js.map