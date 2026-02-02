"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureModule = void 0;
const common_1 = require("@nestjs/common");
const secure_controller_1 = require("./secure.controller");
const usage_module_1 = require("../usage/usage.module");
const apikey_module_1 = require("../apikey/apikey.module");
const apikey_guard_1 = require("../auth/apikey.guard");
let SecureModule = class SecureModule {
};
exports.SecureModule = SecureModule;
exports.SecureModule = SecureModule = __decorate([
    (0, common_1.Module)({
        imports: [usage_module_1.UsageModule, apikey_module_1.ApiKeysModule],
        controllers: [secure_controller_1.SecureController],
        providers: [apikey_guard_1.ApiKeyGuard],
    })
], SecureModule);
//# sourceMappingURL=secure.module.js.map