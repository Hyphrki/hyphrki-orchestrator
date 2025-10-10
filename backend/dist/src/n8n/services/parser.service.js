"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8NWorkflowParserService = void 0;
const common_1 = require("@nestjs/common");
let N8NWorkflowParserService = class N8NWorkflowParserService {
    MAX_WORKFLOW_SIZE = 5 * 1024 * 1024;
    validateWorkflowSize(workflowJson) {
        const sizeInBytes = Buffer.byteLength(workflowJson, 'utf8');
        if (sizeInBytes > this.MAX_WORKFLOW_SIZE) {
            throw new common_1.BadRequestException(`Workflow JSON exceeds maximum size of ${this.MAX_WORKFLOW_SIZE / (1024 * 1024)}MB`);
        }
    }
    validateWorkflowStructure(workflow) {
        if (!workflow || typeof workflow !== 'object') {
            throw new common_1.BadRequestException('Invalid workflow JSON: must be an object');
        }
        if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
            throw new common_1.BadRequestException('Invalid workflow JSON: missing or invalid nodes array');
        }
        if (workflow.nodes.length === 0) {
            throw new common_1.BadRequestException('Invalid workflow JSON: workflow must contain at least one node');
        }
    }
    parseWorkflow(workflowJson) {
        try {
            const workflow = JSON.parse(workflowJson);
            this.validateWorkflowStructure(workflow);
            const parameters = this.extractParameters(workflow);
            const triggers = this.extractTriggers(workflow);
            return {
                nodes: workflow.nodes || [],
                connections: workflow.connections || {},
                parameters,
                triggers,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Failed to parse workflow JSON: ${error.message}`);
        }
    }
    extractParameters(workflow) {
        const parameters = [];
        const nodes = workflow.nodes || [];
        for (const node of nodes) {
            if (node.parameters) {
                this.extractNodeParameters(node, parameters);
            }
        }
        return parameters;
    }
    extractNodeParameters(node, parameters) {
        const nodeParams = node.parameters || {};
        for (const [key, value] of Object.entries(nodeParams)) {
            if (typeof value === 'string' && this.isTemplateVariable(value)) {
                const paramName = this.extractVariableName(value);
                parameters.push({
                    name: paramName,
                    path: `nodes.${node.id}.parameters.${key}`,
                    defaultValue: value,
                    isRequired: true,
                });
            }
        }
    }
    isTemplateVariable(value) {
        return /\{\{.*?\}\}/.test(value);
    }
    extractVariableName(template) {
        const match = template.match(/\{\{\s*\$json\.(\w+)\s*\}\}/);
        return match ? match[1] : template.replace(/[{}$.\s]/g, '');
    }
    extractTriggers(workflow) {
        const nodes = workflow.nodes || [];
        return nodes.filter((node) => node.type && (node.type.includes('webhook') ||
            node.type.includes('trigger') ||
            node.type.includes('start')));
    }
};
exports.N8NWorkflowParserService = N8NWorkflowParserService;
exports.N8NWorkflowParserService = N8NWorkflowParserService = __decorate([
    (0, common_1.Injectable)()
], N8NWorkflowParserService);
//# sourceMappingURL=parser.service.js.map