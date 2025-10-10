import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Bot, Settings } from 'lucide-react';

interface AgentNodeData {
  label?: string;
  framework?: string;
  config?: Record<string, any>;
}

export const AgentNode: React.FC<NodeProps> = ({ data }) => {
  const nodeData = data as AgentNodeData;
  const label = nodeData.label || 'Agent Node';
  const framework = nodeData.framework || 'langgraph';
  const config = nodeData.config || {};

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'langgraph':
        return 'bg-blue-500';
      case 'agno':
        return 'bg-purple-500';
      case 'crewai':
        return 'bg-green-500';
      case 'n8n':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center space-x-2 mb-2">
        <div className={`p-1 rounded ${getFrameworkColor(framework)}`}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {framework}
          </div>
        </div>
        <Settings className="w-4 h-4 text-gray-400" />
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-300">
        Temperature: {config.temperature || 0.7}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};
