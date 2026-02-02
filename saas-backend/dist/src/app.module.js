"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const apikey_module_1 = require("./apikey/apikey.module");
const apikey_guard_1 = require("./auth/apikey.guard");
const test_protected_controller_1 = require("./test/test-protected.controller");
const test_usage_controller_1 = require("./test/test-usage.controller");
const secure_module_1 = require("./secure/secure.module");
const users_module_1 = require("./users/users.module");
const usage_module_1 = require("./usage/usage.module");
const email_module_1 = require("./email/email.module");
const webhook_module_1 = require("./webhook/webhook.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            prisma_module_1.PrismaModule,
            usage_module_1.UsageModule,
            apikey_module_1.ApiKeysModule, secure_module_1.SecureModule, users_module_1.UsersModule, email_module_1.EmailModule, webhook_module_1.WebhookModule
        ],
        controllers: [app_controller_1.AppController, test_protected_controller_1.TestProtectedController, test_usage_controller_1.TestUsageController],
        providers: [app_service_1.AppService, apikey_guard_1.ApiKeyGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map