import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Database, Settings } from 'lucide-react';

interface DataNodeData {
  label?: string;
  dataType?: string;
  value?: any;
}

export const DataNode: React.FC<NodeProps> = ({ data }) => {
  const nodeData = data as DataNodeData;
  const label = nodeData.label || 'Data Node';
  const dataType = nodeData.dataType || 'text';
  const value = nodeData.value;
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center space-x-2 mb-2">
        <div className="p-1 rounded bg-purple-500">
          <Database className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {dataType}
          </div>
        </div>
        <Settings className="w-4 h-4 text-gray-400" />
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-300">
        {value ? (
          typeof value === 'string' && value.length > 20
            ? `${value.substring(0, 20)}...`
            : String(value)
        ) : (
          <em className="text-gray-400">Empty</em>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};
