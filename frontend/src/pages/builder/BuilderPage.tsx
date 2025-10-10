import React from 'react';
import { WorkflowCanvas } from '../../components/builder/WorkflowCanvas';

const BuilderPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Visual Agent Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage AI agent workflows with drag-and-drop
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Upload Workflow
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Workflow
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Deploy Agent
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1" data-testid="workflow-canvas">
        <WorkflowCanvas />
      </div>
    </div>
  );
};

export default BuilderPage;
