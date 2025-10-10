import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Activity, 
  Loader2,
  AlertCircle 
} from 'lucide-react';
import { useExecutionMetrics, useAgentMetrics } from '../../hooks/useMetrics';
import { ExecutionRateChart } from '../../components/charts/ExecutionRateChart';
import { AgentStatusChart } from '../../components/charts/AgentStatusChart';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  const { data: executionData, isLoading: executionLoading, error: executionError } = useExecutionMetrics(timeRange);
  const { data: agentData, isLoading: agentLoading, error: agentError } = useAgentMetrics(timeRange);

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  const handleExportCSV = () => {
    if (!executionData) return;
    
    const csvContent = [
      'Timestamp,Total Executions,Completed Executions,Failed Executions,Avg Response Time (s)',
      ...executionData.totalExecutions.map((item, index) => {
        const completed = executionData.completedExecutions[index]?.count || 0;
        const failed = executionData.failedExecutions[index]?.count || 0;
        const avgTime = executionData.avgResponseTime[index]?.time || 0;
        return `${item.timestamp},${item.count},${completed},${failed},${avgTime}`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Platform analytics and performance metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Export Button */}
            <button
              onClick={handleExportCSV}
              disabled={!executionData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Error States */}
        {(executionError || agentError) && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-red-800 dark:text-red-200">
                Failed to load analytics data. Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {executionData ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Executions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {executionData.totalExecutions.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                      {executionData.totalExecutions.length > 0 ? 
                        Math.round(
                          (executionData.completedExecutions.reduce((sum, item) => sum + item.count, 0) / 
                           executionData.totalExecutions.reduce((sum, item) => sum + item.count, 0)) * 100
                        ) : 0}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Executions</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                      {executionData.failedExecutions.reduce((sum, item) => sum + item.count, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {executionData.avgResponseTime.length > 0 ? 
                        Math.round(
                          executionData.avgResponseTime.reduce((sum, item) => sum + item.time, 0) / 
                          executionData.avgResponseTime.length
                        ) : 0}s
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Execution Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Execution Trends
            </h3>
            {executionLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : executionData ? (
              <ExecutionRateChart data={executionData.totalExecutions.map(item => ({
                timestamp: item.timestamp,
                rate: item.count
              }))} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>

          {/* Framework Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Framework Distribution
            </h3>
            {agentLoading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : agentData ? (
              <AgentStatusChart data={agentData.frameworkBreakdown} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
