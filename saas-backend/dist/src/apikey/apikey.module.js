"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysModule = void 0;
const common_1 = require("@nestjs/common");
const apikey_service_1 = require("./apikey.service");
const apikey_controller_1 = require("./apikey.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let ApiKeysModule = class ApiKeysModule {
};
exports.ApiKeysModule = ApiKeysModule;
exports.ApiKeysModule = ApiKeysModule = __decorate([
    (0, common_1.Module)({
        providers: [apikey_service_1.ApiKeyService, prisma_service_1.PrismaService],
        controllers: [apikey_controller_1.ApiKeyController],
        exports: [apikey_service_1.ApiKeyService],
    })
], ApiKeysModule);
//# sourceMappingURL=apikey.module.js.map