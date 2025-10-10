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
exports.FrameworksModule = void 0;
const common_1 = require("@nestjs/common");
const framework_registry_1 = require("./registry/framework-registry");
const framework_abstraction_service_1 = require("./abstraction/framework-abstraction.service");
const langgraph_adapter_1 = require("./langgraph/langgraph.adapter");
const agno_adapter_1 = require("./agno/agno.adapter");
const crewai_adapter_1 = require("./crewai/crewai.adapter");
const n8n_adapter_1 = require("./n8n/n8n.adapter");
let FrameworksModule = class FrameworksModule {
    frameworkRegistry;
    langGraphAdapter;
    agnoAdapter;
    crewAIAdapter;
    n8nAdapter;
    constructor(frameworkRegistry, langGraphAdapter, agnoAdapter, crewAIAdapter, n8nAdapter) {
        this.frameworkRegistry = frameworkRegistry;
        this.langGraphAdapter = langGraphAdapter;
        this.agnoAdapter = agnoAdapter;
        this.crewAIAdapter = crewAIAdapter;
        this.n8nAdapter = n8nAdapter;
    }
    async onModuleInit() {
        this.frameworkRegistry.registerAdapter(this.langGraphAdapter);
        this.frameworkRegistry.registerAdapter(this.agnoAdapter);
        this.frameworkRegistry.registerAdapter(this.crewAIAdapter);
        this.frameworkRegistry.registerAdapter(this.n8nAdapter);
        await this.frameworkRegistry.initializeAllFrameworks();
    }
    async onModuleDestroy() {
        await this.frameworkRegistry.shutdownAllFrameworks();
    }
};
exports.FrameworksModule = FrameworksModule;
exports.FrameworksModule = FrameworksModule = __decorate([
    (0, common_1.Module)({
        providers: [
            framework_registry_1.FrameworkRegistry,
            framework_abstraction_service_1.FrameworkAbstractionService,
            langgraph_adapter_1.LangGraphAdapter,
            agno_adapter_1.AgnoAdapter,
            crewai_adapter_1.CrewAIAdapter,
            n8n_adapter_1.N8nAdapter,
        ],
        exports: [framework_registry_1.FrameworkRegistry, framework_abstraction_service_1.FrameworkAbstractionService],
    }),
    __metadata("design:paramtypes", [framework_registry_1.FrameworkRegistry,
        langgraph_adapter_1.LangGraphAdapter,
        agno_adapter_1.AgnoAdapter,
        crewai_adapter_1.CrewAIAdapter,
        n8n_adapter_1.N8nAdapter])
], FrameworksModule);
//# sourceMappingURL=frameworks.module.js.map