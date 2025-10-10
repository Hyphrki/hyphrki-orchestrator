import React from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import {
  Bot,
  Store,
  BarChart3,
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useOverviewMetrics, useAgentMetrics, useSystemMetrics } from '../../hooks/useMetrics';
import { ExecutionRateChart } from '../../components/charts/ExecutionRateChart';
import { AgentStatusChart } from '../../components/charts/AgentStatusChart';
import { SystemHealthChart } from '../../components/charts/SystemHealthChart';

const AdminDashboardPage: React.FC = () => {
  const { data: overviewData, isLoading: overviewLoading, error: overviewError } = useOverviewMetrics();
  const { data: agentData, isLoading: agentLoading } = useAgentMetrics('1h');
  const { data: systemData, isLoading: systemLoading } = useSystemMetrics('1h');

  // Create stats from real data
  const stats = overviewData ? [
    {
      title: 'Total Agents',
      value: overviewData.totalAgents.toLocaleString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Bot,
    },
    {
      title: 'Published Agents',
      value: overviewData.publishedAgents.toLocaleString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Store,
    },
    {
      title: 'Active Users',
      value: overviewData.activeUsers.toLocaleString(),
      change: '+15%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Total Executions',
      value: overviewData.totalExecutions.toLocaleString(),
      change: '+23%',
      changeType: 'positive' as const,
      icon: Activity,
    },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage agents, marketplace, and platform analytics
          </p>
        </div>

        {/* Error State */}
        {overviewError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-red-800 dark:text-red-200">
                Failed to load dashboard metrics. Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Execution Rate Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Execution Rate (Last Hour)
            </h3>
            {agentLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : agentData ? (
              <ExecutionRateChart data={agentData.executionRate} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>

          {/* Agent Status Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Agent Status Distribution
            </h3>
            {agentLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : agentData ? (
              <AgentStatusChart data={agentData.statusBreakdown} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>

          {/* System Health Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Health (Last Hour)
            </h3>
            {systemLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : systemData ? (
              <SystemHealthChart 
                cpuData={systemData.cpuUsage} 
                memoryData={systemData.memoryUsage} 
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  Create New Agent
                </span>
                <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Publish to Marketplace
                </span>
                <Store className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <span className="text-purple-700 dark:text-purple-300 font-medium">
                  View Analytics
                </span>
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Agent "Email Newsletter Generator" published
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    User "john@example.com" deployed agent
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    5 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Agent "Data Processor" updated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
