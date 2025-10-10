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
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prom_client_1 = require("prom-client");
let MetricsService = class MetricsService {
    httpRequestTotal;
    httpRequestDuration;
    httpRequestsInFlight;
    activeUsers;
    totalOrganizations;
    totalAgents;
    totalWorkflows;
    frameworkRequestsTotal;
    frameworkRequestDuration;
    frameworkErrorsTotal;
    agentExecutionsTotal;
    agentExecutionDuration;
    agentExecutionErrors;
    workflowExecutionsTotal;
    workflowExecutionDuration;
    workflowExecutionErrors;
    databaseConnections;
    databaseQueryDuration;
    authAttemptsTotal;
    authFailuresTotal;
    constructor() {
        this.initializeMetrics();
        this.startDefaultMetrics();
    }
    initializeMetrics() {
        this.httpRequestTotal = new prom_client_1.Counter({
            name: 'orchestrator_http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'route', 'status_code'],
        });
        this.httpRequestDuration = new prom_client_1.Histogram({
            name: 'orchestrator_http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code'],
            buckets: [0.1, 0.5, 1, 2, 5, 10],
        });
        this.httpRequestsInFlight = new prom_client_1.Gauge({
            name: 'orchestrator_http_requests_in_flight',
            help: 'Number of HTTP requests currently being processed',
            labelNames: ['method'],
        });
        this.activeUsers = new prom_client_1.Gauge({
            name: 'orchestrator_active_users',
            help: 'Number of active users',
        });
        this.totalOrganizations = new prom_client_1.Gauge({
            name: 'orchestrator_total_organizations',
            help: 'Total number of organizations',
        });
        this.totalAgents = new prom_client_1.Gauge({
            name: 'orchestrator_total_agents',
            help: 'Total number of agents',
            labelNames: ['framework', 'status'],
        });
        this.totalWorkflows = new prom_client_1.Gauge({
            name: 'orchestrator_total_workflows',
            help: 'Total number of workflows',
            labelNames: ['status'],
        });
        this.frameworkRequestsTotal = new prom_client_1.Counter({
            name: 'orchestrator_framework_requests_total',
            help: 'Total number of framework requests',
            labelNames: ['framework', 'operation'],
        });
        this.frameworkRequestDuration = new prom_client_1.Histogram({
            name: 'orchestrator_framework_request_duration_seconds',
            help: 'Duration of framework requests in seconds',
            labelNames: ['framework', 'operation'],
            buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
        });
        this.frameworkErrorsTotal = new prom_client_1.Counter({
            name: 'orchestrator_framework_errors_total',
            help: 'Total number of framework errors',
            labelNames: ['framework', 'error_type'],
        });
        this.agentExecutionsTotal = new prom_client_1.Counter({
            name: 'orchestrator_agent_executions_total',
            help: 'Total number of agent executions',
            labelNames: ['agent_id', 'framework', 'status'],
        });
        this.agentExecutionDuration = new prom_client_1.Summary({
            name: 'orchestrator_agent_execution_duration_seconds',
            help: 'Duration of agent executions in seconds',
            labelNames: ['agent_id', 'framework'],
            percentiles: [0.5, 0.9, 0.95, 0.99],
        });
        this.agentExecutionErrors = new prom_client_1.Counter({
            name: 'orchestrator_agent_execution_errors_total',
            help: 'Total number of agent execution errors',
            labelNames: ['agent_id', 'framework', 'error_type'],
        });
        this.workflowExecutionsTotal = new prom_client_1.Counter({
            name: 'orchestrator_workflow_executions_total',
            help: 'Total number of workflow executions',
            labelNames: ['workflow_id', 'status'],
        });
        this.workflowExecutionDuration = new prom_client_1.Summary({
            name: 'orchestrator_workflow_execution_duration_seconds',
            help: 'Duration of workflow executions in seconds',
            labelNames: ['workflow_id'],
            percentiles: [0.5, 0.9, 0.95, 0.99],
        });
        this.workflowExecutionErrors = new prom_client_1.Counter({
            name: 'orchestrator_workflow_execution_errors_total',
            help: 'Total number of workflow execution errors',
            labelNames: ['workflow_id', 'error_type'],
        });
        this.databaseConnections = new prom_client_1.Gauge({
            name: 'orchestrator_database_connections',
            help: 'Number of active database connections',
        });
        this.databaseQueryDuration = new prom_client_1.Histogram({
            name: 'orchestrator_database_query_duration_seconds',
            help: 'Duration of database queries in seconds',
            labelNames: ['operation', 'table'],
            buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
        });
        this.authAttemptsTotal = new prom_client_1.Counter({
            name: 'orchestrator_auth_attempts_total',
            help: 'Total number of authentication attempts',
            labelNames: ['method', 'result'],
        });
        this.authFailuresTotal = new prom_client_1.Counter({
            name: 'orchestrator_auth_failures_total',
            help: 'Total number of authentication failures',
            labelNames: ['method', 'reason'],
        });
    }
    startDefaultMetrics() {
        (0, prom_client_1.collectDefaultMetrics)({
            prefix: 'orchestrator_',
            gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
        });
    }
    incrementHttpRequests(method, route, statusCode) {
        this.httpRequestTotal.inc({ method, route, status_code: statusCode });
    }
    recordHttpRequestDuration(method, route, statusCode, duration) {
        this.httpRequestDuration.observe({ method, route, status_code: statusCode }, duration);
    }
    setHttpRequestsInFlight(method, count) {
        this.httpRequestsInFlight.set({ method }, count);
    }
    setActiveUsers(count) {
        this.activeUsers.set(count);
    }
    setTotalOrganizations(count) {
        this.totalOrganizations.set(count);
    }
    setTotalAgents(framework, status, count) {
        this.totalAgents.set({ framework, status }, count);
    }
    setTotalWorkflows(status, count) {
        this.totalWorkflows.set({ status }, count);
    }
    incrementFrameworkRequests(framework, operation) {
        this.frameworkRequestsTotal.inc({ framework, operation });
    }
    recordFrameworkRequestDuration(framework, operation, duration) {
        this.frameworkRequestDuration.observe({ framework, operation }, duration);
    }
    incrementFrameworkErrors(framework, errorType) {
        this.frameworkErrorsTotal.inc({ framework, error_type: errorType });
    }
    incrementAgentExecutions(agentId, framework, status) {
        this.agentExecutionsTotal.inc({ agent_id: agentId, framework, status });
    }
    recordAgentExecutionDuration(agentId, framework, duration) {
        this.agentExecutionDuration.observe({ agent_id: agentId, framework }, duration);
    }
    incrementAgentExecutionErrors(agentId, framework, errorType) {
        this.agentExecutionErrors.inc({ agent_id: agentId, framework, error_type: errorType });
    }
    incrementWorkflowExecutions(workflowId, status) {
        this.workflowExecutionsTotal.inc({ workflow_id: workflowId, status });
    }
    recordWorkflowExecutionDuration(workflowId, duration) {
        this.workflowExecutionDuration.observe({ workflow_id: workflowId }, duration);
    }
    incrementWorkflowExecutionErrors(workflowId, errorType) {
        this.workflowExecutionErrors.inc({ workflow_id: workflowId, error_type: errorType });
    }
    setDatabaseConnections(count) {
        this.databaseConnections.set(count);
    }
    recordDatabaseQueryDuration(operation, table, duration) {
        this.databaseQueryDuration.observe({ operation, table }, duration);
    }
    incrementAuthAttempts(method, result) {
        this.authAttemptsTotal.inc({ method, result });
    }
    incrementAuthFailures(method, reason) {
        this.authFailuresTotal.inc({ method, reason });
    }
    async getMetrics() {
        return prom_client_1.register.metrics();
    }
    async getRegistry() {
        return prom_client_1.register;
    }
    resetMetrics() {
        prom_client_1.register.resetMetrics();
        this.initializeMetrics();
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map