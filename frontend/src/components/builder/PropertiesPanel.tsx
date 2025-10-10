import React, { useState } from 'react';
import type { Node } from '@xyflow/react';
import { X, Save } from 'lucide-react';

interface PropertiesPanelProps {
  node: Node;
  onUpdate: (updates: Record<string, any>) => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  node,
  onUpdate,
  onClose,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(node.data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderField = (field: string, value: any) => {
    if (field === 'label') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {field}
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      );
    }

    if (field === 'framework') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            Framework
          </label>
          <select
            value={value || 'langgraph'}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="langgraph">LangGraph</option>
            <option value="agno">Agno</option>
            <option value="crewai">CrewAI</option>
            <option value="n8n">n8n</option>
          </select>
        </div>
      );
    }

    if (field === 'config' && typeof value === 'object') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Configuration
          </label>
          {Object.entries(value).map(([configKey, configValue]) => (
            <div key={configKey} className="flex space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-20 capitalize">
                {configKey}:
              </span>
              <input
                type="text"
                value={String(configValue)}
                onChange={(e) => {
                  const newConfig = { ...value, [configKey]: e.target.value };
                  handleInputChange(field, newConfig);
                }}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Node Properties
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {Object.entries(formData).map(([field, value]) =>
          renderField(field, value)
        )}

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};
