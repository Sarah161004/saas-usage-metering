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
exports.UsageLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const usage_service_1 = require("./usage.service");
let UsageLoggingInterceptor = class UsageLoggingInterceptor {
    constructor(usageService) {
        this.usageService = usageService;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const apiKey = req.apiKey;
        const endpoint = req.path;
        const method = req.method;
        const now = new Date();
        const month = now.toISOString().slice(0, 7);
        return next.handle().pipe((0, operators_1.tap)(async () => {
            if (!user)
                return;
            await this.usageService.meter({
                userId: user.id,
                apiKeyId: apiKey?.id ?? null,
                endpoint,
                method,
                month,
            });
        }));
    }
};
exports.UsageLoggingInterceptor = UsageLoggingInterceptor;
exports.UsageLoggingInterceptor = UsageLoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usage_service_1.UsageService])
], UsageLoggingInterceptor);
//# sourceMappingURL=usage-logging.interceptor.js.map