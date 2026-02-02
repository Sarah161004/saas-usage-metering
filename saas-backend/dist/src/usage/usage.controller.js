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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageController = void 0;
const common_1 = require("@nestjs/common");
const usage_service_1 = require("./usage.service");
const create_usage_dto_1 = require("./dto/create-usage.dto");
const plan_limits_service_1 = require("./plan-limits.service");
let UsageController = class UsageController {
    constructor(usageService, planLimitsService) {
        this.usageService = usageService;
        this.planLimitsService = planLimitsService;
    }
    async meter(dto) {
        return this.usageService.meter(dto);
    }
    async getAdminSummary(month) {
        return this.usageService.getAdminSummary(month);
    }
    async getMonthlyBill(userId, month) {
        return this.usageService.getMonthlyBill(userId, month);
    }
    async getMonthly(userId, month) {
        return this.usageService.getMonthlyCount(userId, month);
    }
    async getDailyUsage(userId, month) {
        return this.usageService.getDailyUsage(userId, month);
    }
    async getUsageByEndpoint(userId, month) {
        return this.usageService.getUsageByEndpoint(userId, month);
    }
    async getUsageByMethod(userId, month) {
        return this.usageService.getUsageByMethod(userId, month);
    }
};
exports.UsageController = UsageController;
__decorate([
    (0, common_1.Post)('meter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usage_dto_1.CreateUsageDto]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "meter", null);
__decorate([
    (0, common_1.Get)('admin/summary/:month'),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "getAdminSummary", null);
__decorate([
    (0, common_1.Get)('billing/:userId/:month'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "getMonthlyBill", null);
__decorate([
    (0, common_1.Get)(':userId/:month'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "getMonthly", null);
__decorate([
    (0, common_1.Get)('daily/:userId/:month'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "getDailyUsage", null);
__decorate([
    (0, common_1.Get)('by-endpoint/:userId/:month'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "getUsageByEndpoint", null);
__decorate([
    (0, common_1.Get)('by-method/:userId/:month'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsageController.prototype, "getUsageByMethod", null);
exports.UsageController = UsageController = __decorate([
    (0, common_1.Controller)('usage'),
    __metadata("design:paramtypes", [usage_service_1.UsageService,
        plan_limits_service_1.PlanLimitsService])
], UsageController);
//# sourceMappingURL=usage.controller.js.map