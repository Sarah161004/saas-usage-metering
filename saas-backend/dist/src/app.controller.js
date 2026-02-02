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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const email_service_1 = require("./email/email.service");
const usage_service_1 = require("./usage/usage.service");
const prisma_service_1 = require("./prisma/prisma.service");
let AppController = class AppController {
    constructor(appService, emailService, usageService, prismaService) {
        this.appService = appService;
        this.emailService = emailService;
        this.usageService = usageService;
        this.prismaService = prismaService;
    }
    async createTestUser() {
        const user = await this.appService.createTestUser();
        return user;
    }
    async meter(body) {
        return await this.usageService.meter(body);
    }
    getHello() {
        return this.appService.getHello();
    }
    async testEmail() {
        return await this.emailService.testEmail();
    }
    async createTestUserWithPlan(body) {
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
                planSlug: plan.slug,
            },
            include: { plan: true },
        });
        return user;
    }
    async updateEmail(userId, body) {
        const user = await this.prismaService.user.update({
            where: { id: userId },
            data: { email: body.email },
            include: { plan: true },
        });
        return user;
    }
    async getPlans() {
        const plans = await this.prismaService.plan.findMany();
        return plans;
    }
    async assignPlan(userId, body) {
        const plan = await this.prismaService.plan.findFirst({
            where: { name: body.planName },
        });
        if (!plan) {
            return { error: 'Plan not found' };
        }
        const user = await this.prismaService.user.update({
            where: { id: userId },
            data: {
                planSlug: plan.slug
            },
            include: { plan: true },
        });
        return user;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('user/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createTestUser", null);
__decorate([
    (0, common_1.Post)('usage/meter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "meter", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/test-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testEmail", null);
__decorate([
    (0, common_1.Post)('user/test-with-plan'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createTestUserWithPlan", null);
__decorate([
    (0, common_1.Patch)('user/:userId/email'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Get)('plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Patch)('user/:userId/assign-plan'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "assignPlan", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        email_service_1.EmailService,
        usage_service_1.UsageService,
        prisma_service_1.PrismaService])
], AppController);
//# sourceMappingURL=app.controller.js.map