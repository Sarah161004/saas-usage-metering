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
exports.PlanLimitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PlanLimitsService = class PlanLimitsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkAndHandleQuota(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan) {
            return { allowed: false, reason: 'NO_PLAN' };
        }
        const plan = user.plan;
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const usageCount = await this.prisma.usageLog.count({
            where: {
                userId,
                month,
            },
        });
        const limit = plan.requestsPerMonth;
        const usageRatio = limit > 0 ? usageCount / limit : 0;
        const alertThreshold = (plan.softLimitPercent ?? 80) / 100;
        return {
            allowed: usageCount < limit,
            usageCount,
            limit,
            usageRatio,
            shouldWarn: usageRatio >= alertThreshold && usageCount < limit,
            atOrOverLimit: usageCount >= limit,
        };
    }
};
exports.PlanLimitsService = PlanLimitsService;
exports.PlanLimitsService = PlanLimitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanLimitsService);
//# sourceMappingURL=plan-limits.service.js.map