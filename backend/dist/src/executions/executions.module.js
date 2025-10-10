"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionsModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const frameworks_module_1 = require("../frameworks/frameworks.module");
const websocket_module_1 = require("../websocket/websocket.module");
const executions_controller_1 = require("./controllers/executions.controller");
const executions_service_1 = require("./services/executions.service");
let ExecutionsModule = class ExecutionsModule {
};
exports.ExecutionsModule = ExecutionsModule;
exports.ExecutionsModule = ExecutionsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, frameworks_module_1.FrameworksModule, websocket_module_1.WebSocketModule],
        controllers: [executions_controller_1.ExecutionsController, executions_controller_1.WorkflowExecutionsController],
        providers: [executions_service_1.ExecutionsService],
        exports: [executions_service_1.ExecutionsService],
    })
], ExecutionsModule);
//# sourceMappingURL=executions.module.js.map