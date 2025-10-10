import React from 'react';
import { Play, Pause, Square, Settings, Activity, Clock, Zap } from 'lucide-react';

interface AgentStatusCardProps {
  id: string;
  name: string;
  framework: string;
  status: 'running' | 'stopped' | 'error' | 'paused';
  lastRun?: string;
  executionCount: number;
  avgExecutionTime: number;
  memoryUsage?: number;
  cpuUsage?: number;
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onConfigure?: () => void;
  className?: string;
}

export const AgentStatusCard: React.FC<AgentStatusCardProps> = ({
  name,
  framework,
  status,
  lastRun,
  executionCount,
  avgExecutionTime,
  memoryUsage,
  cpuUsage,
  onStart,
  onStop,
  onPause,
  onConfigure,
  className,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'stopped':
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'paused':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getFrameworkIcon = () => {
    switch (framework.toLowerCase()) {
      case 'langgraph':
        return '🔗';
      case 'agno':
        return '🚀';
      case 'crewai':
        return '👥';
      case 'n8n':
        return '⚡';
      default:
        return '🤖';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getFrameworkIcon()}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {framework}
            </p>
          </div>
        </div>

        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Executions</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {executionCount}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {avgExecutionTime}ms
            </p>
          </div>
        </div>

        {memoryUsage && (
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Memory</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {memoryUsage}MB
              </p>
            </div>
          </div>
        )}

        {cpuUsage && (
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">CPU</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {cpuUsage}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Last Run */}
      {lastRun && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Last run: {lastRun}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {status !== 'running' && onStart && (
            <button
              onClick={onStart}
              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              title="Start agent"
            >
              <Play className="w-4 h-4" />
            </button>
          )}

          {status === 'running' && onPause && (
            <button
              onClick={onPause}
              className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
              title="Pause agent"
            >
              <Pause className="w-4 h-4" />
            </button>
          )}

          {(status === 'running' || status === 'paused') && onStop && (
            <button
              onClick={onStop}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Stop agent"
            >
              <Square className="w-4 h-4" />
            </button>
          )}
        </div>

        {onConfigure && (
          <button
            onClick={onConfigure}
            className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/20 rounded-lg transition-colors"
            title="Configure agent"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
