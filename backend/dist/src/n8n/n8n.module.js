"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8NModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const n8n_api_service_1 = require("./services/n8n-api.service");
const parser_service_1 = require("./services/parser.service");
let N8NModule = class N8NModule {
};
exports.N8NModule = N8NModule;
exports.N8NModule = N8NModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [n8n_api_service_1.N8NApiService, parser_service_1.N8NWorkflowParserService],
        exports: [n8n_api_service_1.N8NApiService, parser_service_1.N8NWorkflowParserService],
    })
], N8NModule);
//# sourceMappingURL=n8n.module.js.map