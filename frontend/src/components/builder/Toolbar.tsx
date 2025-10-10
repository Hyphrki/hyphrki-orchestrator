import React from 'react';
import { Bot, Play, GitBranch, Database, ZoomIn, ZoomOut, Save, Download } from 'lucide-react';

interface ToolbarProps {
  onAddNode: (type: string, position: { x: number; y: number }) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAddNode }) => {
  const nodeTypes = [
    { type: 'agent', label: 'Agent', icon: Bot, color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'task', label: 'Task', icon: Play, color: 'bg-green-500 hover:bg-green-600' },
    { type: 'decision', label: 'Decision', icon: GitBranch, color: 'bg-yellow-500 hover:bg-yellow-600' },
    { type: 'data', label: 'Data', icon: Database, color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const handleAddNode = (type: string) => {
    // Add node at a random position near the center
    const position = {
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
    };
    onAddNode(type, position);
  };

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-1 mr-4" data-testid="node-palette">
        {nodeTypes.map(({ type, label, icon: Icon, color }) => (
          <button
            key={type}
            onClick={() => handleAddNode(type)}
            className={`flex items-center space-x-1 px-3 py-1 rounded text-white text-sm font-medium transition-colors ${color}`}
            title={`Add ${label} Node`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

      <div className="flex items-center space-x-1">
        <button
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        <button
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        <button
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Save Workflow"
        >
          <Save className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        <button
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Export Workflow"
        >
          <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};
