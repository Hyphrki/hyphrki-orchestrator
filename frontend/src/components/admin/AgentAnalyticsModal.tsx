import React from 'react';
import { X, TrendingUp, Users, Activity, CheckCircle } from 'lucide-react';
import * as AgentHooks from '../../hooks/useAgents';
const { AgentTemplate } = AgentHooks;

interface AgentAnalyticsModalProps {
  agent: AgentTemplate;
  isOpen: boolean;
  onClose: () => void;
}

const AgentAnalyticsModal: React.FC<AgentAnalyticsModalProps> = ({
  agent,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const analytics = agent.analytics || {
    totalDeployments: 0,
    activeDeployments: 0,
    totalAssignments: 0,
    recentExecutions: 0,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="relative inline-block w-full max-w-3xl px-4 pt-5 pb-4 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Agent Analytics: {agent.name}
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Deployments
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {analytics.totalDeployments}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Active Deployments
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {analytics.activeDeployments}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Assignments
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {analytics.totalAssignments}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Recent Executions
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {analytics.recentExecutions}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Agent Details */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Agent Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                      {agent.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Version:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {agent.version}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                      {agent.publicationStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Pricing:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                      {agent.pricingTier}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {agent.tags && agent.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAnalyticsModal;
