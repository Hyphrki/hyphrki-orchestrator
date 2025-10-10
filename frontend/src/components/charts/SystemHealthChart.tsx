import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SystemHealthChartProps {
  cpuData: Array<{ timestamp: string; usage: number }>;
  memoryData: Array<{ timestamp: string; usage: number }>;
  className?: string;
}

export const SystemHealthChart: React.FC<SystemHealthChartProps> = ({ 
  cpuData, 
  memoryData, 
  className 
}) => {
  // Combine data for multi-line chart
  const chartData = cpuData.map((cpuItem, index) => ({
    time: new Date(cpuItem.timestamp).toLocaleTimeString(),
    cpu: cpuItem.usage,
    memory: memoryData[index]?.usage || 0,
  }));

  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            labelFormatter={(value) => `Time: ${value}`}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)}%`, 
              name === 'cpu' ? 'CPU Usage' : 'Memory Usage'
            ]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="cpu" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={false}
            name="CPU"
          />
          <Line 
            type="monotone" 
            dataKey="memory" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            name="Memory"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
