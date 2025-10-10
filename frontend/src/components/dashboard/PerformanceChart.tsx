import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    timestamp: string;
    executions: number;
    avgResponseTime: number;
    memoryUsage: number;
    cpuUsage: number;
  }>;
  type: 'line' | 'area' | 'bar';
  metric: 'executions' | 'responseTime' | 'memory' | 'cpu';
  className?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  type,
  metric,
  className,
}) => {
  const getChartProps = () => {
    const baseProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case 'area':
        return {
          ...baseProps,
          children: (
            <>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="timestamp"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
              />
              <Area
                type="monotone"
                dataKey={getDataKey()}
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </>
          ),
        };
      case 'bar':
        return {
          ...baseProps,
          children: (
            <>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="timestamp"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
              />
              <Bar
                dataKey={getDataKey()}
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </>
          ),
        };
      default: // line
        return {
          ...baseProps,
          children: (
            <>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="timestamp"
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
              />
              <Line
                type="monotone"
                dataKey={getDataKey()}
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </>
          ),
        };
    }
  };

  const getDataKey = () => {
    switch (metric) {
      case 'executions':
        return 'executions';
      case 'responseTime':
        return 'avgResponseTime';
      case 'memory':
        return 'memoryUsage';
      case 'cpu':
        return 'cpuUsage';
      default:
        return 'executions';
    }
  };

  const getChartTitle = () => {
    switch (metric) {
      case 'executions':
        return 'Agent Executions';
      case 'responseTime':
        return 'Average Response Time (ms)';
      case 'memory':
        return 'Memory Usage (MB)';
      case 'cpu':
        return 'CPU Usage (%)';
      default:
        return 'Performance Metric';
    }
  };

  const ChartComponent = type === 'area' ? AreaChart : type === 'bar' ? BarChart : LineChart;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {getChartTitle()}
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent {...getChartProps()} />
        </ResponsiveContainer>
      </div>
    </div>
  );
};
