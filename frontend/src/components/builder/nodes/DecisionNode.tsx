import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { GitBranch, Settings } from 'lucide-react';

interface DecisionNodeData {
  label?: string;
  condition?: string;
}

export const DecisionNode: React.FC<NodeProps> = ({ data }) => {
  const nodeData = data as DecisionNodeData;
  const label = nodeData.label || 'Decision Node';
  const condition = nodeData.condition || 'value > 0';
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-yellow-700 min-w-[200px] transform rotate-45">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center space-x-2 mb-2 transform -rotate-45">
        <div className="p-1 rounded bg-yellow-500">
          <GitBranch className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Decision
          </div>
        </div>
        <Settings className="w-4 h-4 text-gray-400" />
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-300 transform -rotate-45">
        {condition}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};
