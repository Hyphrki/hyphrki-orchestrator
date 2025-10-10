import React, { useState } from 'react';
import * as AgentHooks from '../../hooks/useAgents';
const { AgentTemplate, useUpdateAgentMutation, useAssignAgentToUserMutation } = AgentHooks;
import { useUsers } from '../../hooks/useAdminUsers';
import {
  X,
  Bot,
  Edit,
  Save,
  UserPlus,
  Loader2,
  AlertCircle,
  CheckCircle,
  Calendar,
  Tag,
  Code,
  Settings,
} from 'lucide-react';

interface AgentDetailModalProps {
  agent: AgentTemplate;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: agent.name,
    description: agent.description,
    category: agent.category,
    tags: agent.tags.join(', '),
  });
  const [selectedUserId, setSelectedUserId] = useState('');

  const updateMutation = useUpdateAgentMutation();
  const assignMutation = useAssignAgentToUserMutation();
  const { data: users } = useAdminUsers({ limit: 100 });

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        agentId: agent.id,
        updateData: {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update agent:', error);
    }
  };

  const handleAssignToUser = async () => {
    if (!selectedUserId) return;
    
    try {
      await assignMutation.mutateAsync({
        agentId: agent.id,
        userId: selectedUserId,
        customConfig: {},
      });
      setSelectedUserId('');
    } catch (error) {
      console.error('Failed to assign agent to user:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'unpublished':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Agent' : 'Agent Details'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {agent.version} • Created by {agent.createdBy.firstName} {agent.createdBy.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(agent.publicationStatus)}`}>
                {agent.publicationStatus.charAt(0).toUpperCase() + agent.publicationStatus.slice(1)}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pricing Tier
              </label>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
                {agent.pricingTier.charAt(0).toUpperCase() + agent.pricingTier.slice(1)}
              </span>
            </div>
          </div>

          {/* Agent Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{agent.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              {isEditing ? (
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="automation">Automation</option>
                  <option value="analytics">Analytics</option>
                  <option value="communication">Communication</option>
                  <option value="data-processing">Data Processing</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">{agent.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{agent.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Parameters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Parameters ({agent.parameters.length})
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              {agent.parameters.length > 0 ? (
                <div className="space-y-3">
                  {agent.parameters.map((param) => (
                    <div key={param.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{param.displayLabel}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{param.helpText}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          {param.fieldType}
                        </span>
                        {param.isRequired && (
                          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded ml-1">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No parameters configured</p>
              )}
            </div>
          </div>

          {/* Analytics Summary */}
          {agent.analytics && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Analytics Summary
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {agent.analytics.totalDeployments}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Total Deployments</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {agent.analytics.activeDeployments}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">Active Deployments</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {agent.analytics.totalAssignments}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Assignments</p>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {agent.analytics.recentExecutions}
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Recent Executions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assign to User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assign to User
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a user...</option>
                {users?.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name} ({user.email})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssignToUser}
                disabled={!selectedUserId || assignMutation.isPending}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {assignMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span>Assign</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailModal;
