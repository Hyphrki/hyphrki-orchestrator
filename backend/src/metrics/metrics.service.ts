import { Injectable } from '@nestjs/common';
import { register, collectDefaultMetrics, Gauge, Counter, Histogram, Summary } from 'prom-client';

export interface MetricLabels {
  method?: string;
  route?: string;
  status_code?: string;
  framework?: string;
  agent_id?: string;
  workflow_id?: string;
  execution_id?: string;
  organization_id?: string;
  user_id?: string;
  [key: string]: string | undefined;
}

@Injectable()
export class MetricsService {
  // HTTP metrics - Four Golden Signals
  private httpRequestTotal: Counter<string>;
  private httpRequestDuration: Histogram<string>;
  private httpRequestsInFlight: Gauge<string>;

  // Application metrics
  private activeUsers: Gauge<string>;
  private totalOrganizations: Gauge<string>;
  private totalAgents: Gauge<string>;
  private totalWorkflows: Gauge<string>;

  // Framework-specific metrics
  private frameworkRequestsTotal: Counter<string>;
  private frameworkRequestDuration: Histogram<string>;
  private frameworkErrorsTotal: Counter<string>;

  // Agent execution metrics
  private agentExecutionsTotal: Counter<string>;
  private agentExecutionDuration: Summary<string>;
  private agentExecutionErrors: Counter<string>;

  // Workflow execution metrics
  private workflowExecutionsTotal: Counter<string>;
  private workflowExecutionDuration: Summary<string>;
  private workflowExecutionErrors: Counter<string>;

  // Database metrics
  private databaseConnections: Gauge<string>;
  private databaseQueryDuration: Histogram<string>;

  // Security metrics
  private authAttemptsTotal: Counter<string>;
  private authFailuresTotal: Counter<string>;

  constructor() {
    this.initializeMetrics();
    this.startDefaultMetrics();
  }

  private initializeMetrics() {
    // HTTP Request Metrics
    this.httpRequestTotal = new Counter({
      name: 'orchestrator_http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    });

    this.httpRequestDuration = new Histogram({
      name: 'orchestrator_http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.5, 1, 2, 5, 10],
    });

    this.httpRequestsInFlight = new Gauge({
      name: 'orchestrator_http_requests_in_flight',
      help: 'Number of HTTP requests currently being processed',
      labelNames: ['method'],
    });

    // Application Metrics
    this.activeUsers = new Gauge({
      name: 'orchestrator_active_users',
      help: 'Number of active users',
    });

    this.totalOrganizations = new Gauge({
      name: 'orchestrator_total_organizations',
      help: 'Total number of organizations',
    });

    this.totalAgents = new Gauge({
      name: 'orchestrator_total_agents',
      help: 'Total number of agents',
      labelNames: ['framework', 'status'],
    });

    this.totalWorkflows = new Gauge({
      name: 'orchestrator_total_workflows',
      help: 'Total number of workflows',
      labelNames: ['status'],
    });

    // Framework Metrics
    this.frameworkRequestsTotal = new Counter({
      name: 'orchestrator_framework_requests_total',
      help: 'Total number of framework requests',
      labelNames: ['framework', 'operation'],
    });

    this.frameworkRequestDuration = new Histogram({
      name: 'orchestrator_framework_request_duration_seconds',
      help: 'Duration of framework requests in seconds',
      labelNames: ['framework', 'operation'],
      buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
    });

    this.frameworkErrorsTotal = new Counter({
      name: 'orchestrator_framework_errors_total',
      help: 'Total number of framework errors',
      labelNames: ['framework', 'error_type'],
    });

    // Agent Execution Metrics
    this.agentExecutionsTotal = new Counter({
      name: 'orchestrator_agent_executions_total',
      help: 'Total number of agent executions',
      labelNames: ['agent_id', 'framework', 'status'],
    });

    this.agentExecutionDuration = new Summary({
      name: 'orchestrator_agent_execution_duration_seconds',
      help: 'Duration of agent executions in seconds',
      labelNames: ['agent_id', 'framework'],
      percentiles: [0.5, 0.9, 0.95, 0.99],
    });

    this.agentExecutionErrors = new Counter({
      name: 'orchestrator_agent_execution_errors_total',
      help: 'Total number of agent execution errors',
      labelNames: ['agent_id', 'framework', 'error_type'],
    });

    // Workflow Execution Metrics
    this.workflowExecutionsTotal = new Counter({
      name: 'orchestrator_workflow_executions_total',
      help: 'Total number of workflow executions',
      labelNames: ['workflow_id', 'status'],
    });

    this.workflowExecutionDuration = new Summary({
      name: 'orchestrator_workflow_execution_duration_seconds',
      help: 'Duration of workflow executions in seconds',
      labelNames: ['workflow_id'],
      percentiles: [0.5, 0.9, 0.95, 0.99],
    });

    this.workflowExecutionErrors = new Counter({
      name: 'orchestrator_workflow_execution_errors_total',
      help: 'Total number of workflow execution errors',
      labelNames: ['workflow_id', 'error_type'],
    });

    // Database Metrics
    this.databaseConnections = new Gauge({
      name: 'orchestrator_database_connections',
      help: 'Number of active database connections',
    });

    this.databaseQueryDuration = new Histogram({
      name: 'orchestrator_database_query_duration_seconds',
      help: 'Duration of database queries in seconds',
      labelNames: ['operation', 'table'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
    });

    // Security Metrics
    this.authAttemptsTotal = new Counter({
      name: 'orchestrator_auth_attempts_total',
      help: 'Total number of authentication attempts',
      labelNames: ['method', 'result'],
    });

    this.authFailuresTotal = new Counter({
      name: 'orchestrator_auth_failures_total',
      help: 'Total number of authentication failures',
      labelNames: ['method', 'reason'],
    });
  }

  private startDefaultMetrics() {
    // Collect default Node.js metrics
    collectDefaultMetrics({
      prefix: 'orchestrator_',
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    });
  }

  // HTTP Metrics Methods
  incrementHttpRequests(method: string, route: string, statusCode: string) {
    this.httpRequestTotal.inc({ method, route, status_code: statusCode });
  }

  recordHttpRequestDuration(method: string, route: string, statusCode: string, duration: number) {
    this.httpRequestDuration.observe({ method, route, status_code: statusCode }, duration);
  }

  setHttpRequestsInFlight(method: string, count: number) {
    this.httpRequestsInFlight.set({ method }, count);
  }

  // Application Metrics Methods
  setActiveUsers(count: number) {
    this.activeUsers.set(count);
  }

  setTotalOrganizations(count: number) {
    this.totalOrganizations.set(count);
  }

  setTotalAgents(framework: string, status: string, count: number) {
    this.totalAgents.set({ framework, status }, count);
  }

  setTotalWorkflows(status: string, count: number) {
    this.totalWorkflows.set({ status }, count);
  }

  // Framework Metrics Methods
  incrementFrameworkRequests(framework: string, operation: string) {
    this.frameworkRequestsTotal.inc({ framework, operation });
  }

  recordFrameworkRequestDuration(framework: string, operation: string, duration: number) {
    this.frameworkRequestDuration.observe({ framework, operation }, duration);
  }

  incrementFrameworkErrors(framework: string, errorType: string) {
    this.frameworkErrorsTotal.inc({ framework, error_type: errorType });
  }

  // Agent Execution Metrics Methods
  incrementAgentExecutions(agentId: string, framework: string, status: string) {
    this.agentExecutionsTotal.inc({ agent_id: agentId, framework, status });
  }

  recordAgentExecutionDuration(agentId: string, framework: string, duration: number) {
    this.agentExecutionDuration.observe({ agent_id: agentId, framework }, duration);
  }

  incrementAgentExecutionErrors(agentId: string, framework: string, errorType: string) {
    this.agentExecutionErrors.inc({ agent_id: agentId, framework, error_type: errorType });
  }

  // Workflow Execution Metrics Methods
  incrementWorkflowExecutions(workflowId: string, status: string) {
    this.workflowExecutionsTotal.inc({ workflow_id: workflowId, status });
  }

  recordWorkflowExecutionDuration(workflowId: string, duration: number) {
    this.workflowExecutionDuration.observe({ workflow_id: workflowId }, duration);
  }

  incrementWorkflowExecutionErrors(workflowId: string, errorType: string) {
    this.workflowExecutionErrors.inc({ workflow_id: workflowId, error_type: errorType });
  }

  // Database Metrics Methods
  setDatabaseConnections(count: number) {
    this.databaseConnections.set(count);
  }

  recordDatabaseQueryDuration(operation: string, table: string, duration: number) {
    this.databaseQueryDuration.observe({ operation, table }, duration);
  }

  // Security Metrics Methods
  incrementAuthAttempts(method: string, result: string) {
    this.authAttemptsTotal.inc({ method, result });
  }

  incrementAuthFailures(method: string, reason: string) {
    this.authFailuresTotal.inc({ method, reason });
  }

  // Utility Methods
  async getMetrics(): Promise<string> {
    return register.metrics();
  }

  async getRegistry() {
    return register;
  }

  resetMetrics() {
    register.resetMetrics();
    this.initializeMetrics();
  }
}
