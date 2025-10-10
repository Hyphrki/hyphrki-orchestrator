import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExecutionRateChartProps {
  data: Array<{ timestamp: string; rate: number }>;
  className?: string;
}

export const ExecutionRateChart: React.FC<ExecutionRateChartProps> = ({ data, className }) => {
  // Format data for Recharts
  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    rate: item.rate,
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
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            labelFormatter={(value) => `Time: ${value}`}
            formatter={(value: number) => [`${value.toFixed(2)} executions/min`, 'Rate']}
          />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
