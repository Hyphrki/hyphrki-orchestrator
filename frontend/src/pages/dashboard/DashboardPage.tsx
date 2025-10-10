import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Users,
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from 'lucide-react';

import { MetricsCard } from '../../components/dashboard/MetricsCard';
import { AgentStatusCard } from '../../components/dashboard/AgentStatusCard';
import { PerformanceChart } from '../../components/dashboard/PerformanceChart';
import { useDeployments, useExecutions } from '../../hooks/useDeployments';
import { useExecutionMetrics, useOverviewMetrics } from '../../hooks/useMetrics';

const DashboardPage: React.FC = () => {
  const { data: deployments, isLoading: deploymentsLoading } = useDeployments();
  const { data: executions, isLoading: executionsLoading } = useExecutions();
  const { data: metricsOverview, isLoading: metricsLoading } = useOverviewMetrics();
  const { data: executionMetrics, isLoading: executionMetricsLoading } = useExecutionMetrics('24h');

  // Calculate metrics from real data
  const totalAgents = deployments?.length || 0;
  const runningAgents = deployments?.filter(d => d.deploymentStatus === 'active').length || 0;
  const totalExecutions = executions?.length || 0;

  // Calculate avg execution time from recent executions
  const completedExecutions = executions?.filter(e => e.status === 'completed' && e.stoppedAt && e.startedAt) || [];
  const avgResponseTime = completedExecutions.length > 0
    ? Math.round(
        completedExecutions.reduce((sum, e) => {
          const duration = new Date(e.stoppedAt!).getTime() - new Date(e.startedAt).getTime();
          return sum + duration;
        }, 0) / completedExecutions.length
      )
    : 0;

  // Transform deployments to match the agent card format
  const agents = deployments?.map(deployment => ({
    id: deployment.id,
    name: deployment.deploymentName,
    framework: 'n8n',
    status: deployment.deploymentStatus === 'active' ? 'running' as const : 'stopped' as const,
    lastRun: deployment.lastExecutionAt
      ? new Date(deployment.lastExecutionAt).toLocaleString()
      : 'Never',
    executionCount: deployment.totalExecutions,
    avgExecutionTime: avgResponseTime,
    memoryUsage: 0,
    cpuUsage: 0,
  })) || [];

  const handleAgentAction = (agentId: string, action: 'start' | 'stop' | 'pause') => {
    console.log('Agent action:', agentId, action);
    // TODO: Implement deployment status update API
  };

  // Format execution metrics for charts
  const performanceData = executionMetrics?.totalExecutions?.map((item, index) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    executions: item.count,
    avgResponseTime: executionMetrics.avgResponseTime?.[index]?.time || 0,
    memoryUsage: 0, // These would come from system metrics
    cpuUsage: 0,
  })) || [];

  if (deploymentsLoading || executionsLoading || metricsLoading || executionMetricsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Agent Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage your AI agents
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/marketplace"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse Marketplace
            </Link>
            <Link
              to="/deployments"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              My Deployments
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Total Deployments"
            value={totalAgents}
            change={`${runningAgents} active`}
            icon={Users}
          />
          <MetricsCard
            title="Running Agents"
            value={runningAgents}
            change={`${runningAgents}/${totalAgents} active`}
            icon={Activity}
          />
          <MetricsCard
            title="Total Executions"
            value={totalExecutions.toLocaleString()}
            change={`${executions?.filter(e => e.status === 'completed').length || 0} completed`}
            changeType="positive"
            icon={Zap}
          />
          <MetricsCard
            title="Avg Execution Time"
            value={avgResponseTime > 0 ? `${avgResponseTime}ms` : 'N/A'}
            change={`${completedExecutions.length} completed runs`}
            icon={Clock}
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            data={performanceData}
            type="line"
            metric="executions"
          />
          <PerformanceChart
            data={performanceData}
            type="area"
            metric="responseTime"
          />
        </div>

        {/* Agent Status Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Agent Status
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Running</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Paused</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Stopped</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentStatusCard
                key={agent.id}
                id={agent.id}
                name={agent.name}
                framework={agent.framework}
                status={agent.status}
                lastRun={agent.lastRun}
                executionCount={agent.executionCount}
                avgExecutionTime={agent.avgExecutionTime}
                memoryUsage={agent.memoryUsage}
                cpuUsage={agent.cpuUsage}
                onStart={() => handleAgentAction(agent.id, 'start')}
                onStop={() => handleAgentAction(agent.id, 'stop')}
                onPause={() => handleAgentAction(agent.id, 'pause')}
                onConfigure={() => console.log('Configure agent:', agent.id)}
              />
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  System Health
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Overall platform status
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Database</span>
                <span className="text-green-600 dark:text-green-400">Healthy</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Redis</span>
                <span className="text-green-600 dark:text-green-400">Healthy</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Frameworks</span>
                <span className="text-green-600 dark:text-green-400">4/4 Online</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Latest agent executions
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4 space-y-3">
              {executions?.slice(0, 3).map((execution) => (
                <div key={execution.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    execution.status === 'completed' ? 'bg-green-500' :
                    execution.status === 'running' ? 'bg-blue-500' :
                    execution.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {execution.deployment.deploymentName} - {execution.status}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(execution.startedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!executions || executions.length === 0) && (
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Alerts
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  System notifications
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    High memory usage on Data Analysis Agent
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    15 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    All agents successfully deployed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
