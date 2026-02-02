"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageModule = void 0;
const common_1 = require("@nestjs/common");
const usage_controller_1 = require("./usage.controller");
const usage_service_1 = require("./usage.service");
const prisma_service_1 = require("../prisma/prisma.service");
const apikey_guard_1 = require("../auth/apikey.guard");
const apikey_module_1 = require("../apikey/apikey.module");
const usage_logging_interceptor_1 = require("./usage-logging.interceptor");
const plan_limits_service_1 = require("./plan-limits.service");
const email_module_1 = require("../email/email.module");
let UsageModule = class UsageModule {
};
exports.UsageModule = UsageModule;
exports.UsageModule = UsageModule = __decorate([
    (0, common_1.Module)({
        imports: [apikey_module_1.ApiKeysModule, email_module_1.EmailModule],
        controllers: [usage_controller_1.UsageController],
        providers: [
            usage_service_1.UsageService,
            prisma_service_1.PrismaService,
            apikey_guard_1.ApiKeyGuard,
            usage_logging_interceptor_1.UsageLoggingInterceptor,
            plan_limits_service_1.PlanLimitsService,
        ],
        exports: [usage_service_1.UsageService, usage_logging_interceptor_1.UsageLoggingInterceptor],
    })
], UsageModule);
//# sourceMappingURL=usage.module.js.map