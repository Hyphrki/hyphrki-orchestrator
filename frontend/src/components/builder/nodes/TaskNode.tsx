import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Play, Settings } from 'lucide-react';

interface TaskNodeData {
  label?: string;
  taskType?: string;
  parameters?: Record<string, any>;
}

export const TaskNode: React.FC<NodeProps> = ({ data }) => {
  const nodeData = data as TaskNodeData;
  const label = nodeData.label || 'Task Node';
  const taskType = nodeData.taskType || 'llm_call';
  const parameters = nodeData.parameters || {};
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center space-x-2 mb-2">
        <div className="p-1 rounded bg-green-500">
          <Play className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {taskType.replace('_', ' ')}
          </div>
        </div>
        <Settings className="w-4 h-4 text-gray-400" />
      </div>

      {Object.keys(parameters).length > 0 && (
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {Object.entries(parameters).slice(0, 2).map(([key, value]) => (
            <div key={key}>
              {key}: {String(value)}
            </div>
          ))}
          {Object.keys(parameters).length > 2 && (
            <div>...+{Object.keys(parameters).length - 2} more</div>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};
