import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import {
  User as UserIcon,
  Bot,
  Activity,
  Settings,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Calendar,
  Mail,
  Shield,
  Clock,
  Play,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useUser } from '../../hooks/useAdminUsers';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [loadingDeployments, setLoadingDeployments] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [deployments, setDeployments] = useState<any[]>([]);

  const { data: user, isLoading, error } = useUser(userId!);

  // Load agents and deployments
  React.useEffect(() => {
    if (userId) {
      // Load agents
      setLoadingAgents(true);
      axios
        .get(`${API_BASE_URL}/api/admin/users/${userId}/agents`)
        .then(res => setAgents(res.data))
        .catch(err => console.error('Failed to load agents:', err))
        .finally(() => setLoadingAgents(false));

      // Load deployments
      setLoadingDeployments(true);
      axios
        .get(`${API_BASE_URL}/api/admin/users/${userId}/deployments`)
        .then(res => setDeployments(res.data))
        .catch(err => console.error('Failed to load deployments:', err))
        .finally(() => setLoadingDeployments(false));
    }
  }, [userId]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error || !user) {
    return (
      <AdminLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-800 dark:text-red-200">
              Failed to load user details.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/users/active')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                View user information, agents, and activity
              </p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.first_name} {user.last_name}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                {user.status}
              </span>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {user.subscription_tier}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last Login</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.last_login_at
                    ? new Date(user.last_login_at).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Agents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Bot className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Assigned Agents
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {agents.length} agents
            </span>
          </div>

          {loadingAgents ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : agents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No agents assigned yet
            </p>
          ) : (
            <div className="space-y-3">
              {agents.map((assignment: any) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {assignment.agentTemplate.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {assignment.agentTemplate.category} • v{assignment.agentTemplate.version}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      assignment.agentTemplate.publicationStatus === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}
                  >
                    {assignment.agentTemplate.publicationStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deployments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Play className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Deployments
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {deployments.length} deployments
            </span>
          </div>

          {loadingDeployments ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : deployments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No deployments yet
            </p>
          ) : (
            <div className="space-y-3">
              {deployments.map((deployment: any) => (
                <div
                  key={deployment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Play className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {deployment.deploymentName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {deployment.agentTemplate.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-8 text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {deployment.totalExecutions} executions
                      </span>
                      <span>•</span>
                      <span>
                        Last run: {deployment.lastExecutionAt
                          ? new Date(deployment.lastExecutionAt).toLocaleDateString()
                          : 'Never'}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      deployment.deploymentStatus === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : deployment.deploymentStatus === 'deprecated'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}
                  >
                    {deployment.deploymentStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {user.recent_activities && user.recent_activities.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {user.recent_activities.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserDetailPage;
