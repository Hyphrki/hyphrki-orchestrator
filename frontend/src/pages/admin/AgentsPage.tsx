import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import {
  useAgentsWithAnalytics,
  usePublishAgentMutation,
  useUnpublishAgentMutation,
  useDeleteAgentMutation,
  AgentTemplate,
} from '../../hooks/useAgents';
import {
  Bot,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';
import AgentDetailModal from '../../components/admin/AgentDetailModal';
import AgentAnalyticsModal from '../../components/admin/AgentAnalyticsModal';
import CreateAgentModal from '../../components/admin/CreateAgentModal';

const AgentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<AgentTemplate | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: agents, isLoading, error, refetch } = useAgentsWithAnalytics();
  const publishMutation = usePublishAgentMutation();
  const unpublishMutation = useUnpublishAgentMutation();
  const deleteMutation = useDeleteAgentMutation();

  const handleCreateSuccess = () => {
    refetch();
  };

  // Filter agents based on search and filters
  const filteredAgents = agents?.filter(agent => {
    const matchesSearch = !searchTerm || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || agent.publicationStatus === statusFilter;
    const matchesCategory = !categoryFilter || agent.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  const handlePublish = async (agentId: string) => {
    try {
      await publishMutation.mutateAsync({
        agentId,
        publishData: {
          isBreakingUpdate: false,
          releaseNotes: 'Published via admin panel',
        },
      });
    } catch (error) {
      console.error('Failed to publish agent:', error);
    }
  };

  const handleUnpublish = async (agentId: string) => {
    try {
      await unpublishMutation.mutateAsync(agentId);
    } catch (error) {
      console.error('Failed to unpublish agent:', error);
    }
  };

  const handleDelete = async (agentId: string) => {
    if (window.confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      try {
        await deleteMutation.mutateAsync(agentId);
      } catch (error) {
        console.error('Failed to delete agent:', error);
      }
    }
  };

  const openAgentDetail = (agent: AgentTemplate) => {
    setSelectedAgent(agent);
    setIsDetailModalOpen(true);
  };

  const openAgentAnalytics = (agent: AgentTemplate) => {
    setSelectedAgent(agent);
    setIsAnalyticsModalOpen(true);
  };

  const closeModals = () => {
    setSelectedAgent(null);
    setIsDetailModalOpen(false);
    setIsAnalyticsModalOpen(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'unpublished':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Agent Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create, configure, and manage AI agents
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-wrap gap-4">
          <div className="flex-grow flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search agents..."
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="automation">Automation</option>
              <option value="analytics">Analytics</option>
              <option value="communication">Communication</option>
              <option value="data-processing">Data Processing</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-red-800 dark:text-red-200">
                Failed to load agents. Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {agent.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(agent.publicationStatus)}`}>
                      {getStatusIcon(agent.publicationStatus)}
                      <span className="capitalize">{agent.publicationStatus}</span>
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {agent.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {agent.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                      +{agent.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Analytics Summary */}
                {agent.analytics && (
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {agent.analytics.totalDeployments} deployments
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {agent.analytics.recentExecutions} recent runs
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openAgentDetail(agent)}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openAgentAnalytics(agent)}
                      className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      title="View Analytics"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    {agent.publicationStatus === 'draft' && (
                      <button
                        onClick={() => handlePublish(agent.id)}
                        disabled={publishMutation.isPending}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {publishMutation.isPending ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          'Publish'
                        )}
                      </button>
                    )}
                    
                    {agent.publicationStatus === 'published' && (
                      <button
                        onClick={() => handleUnpublish(agent.id)}
                        disabled={unpublishMutation.isPending}
                        className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                      >
                        {unpublishMutation.isPending ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          'Unpublish'
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(agent.id)}
                      disabled={deleteMutation.isPending}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete Agent"
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No agents found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || statusFilter || categoryFilter
                ? 'Try adjusting your search criteria'
                : 'Get started by creating your first agent'
              }
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Agent
            </button>
          </div>
        )}

        {/* Modals */}
        {selectedAgent && (
          <>
            <AgentDetailModal
              agent={selectedAgent}
              isOpen={isDetailModalOpen}
              onClose={closeModals}
            />
            <AgentAnalyticsModal
              agent={selectedAgent}
              isOpen={isAnalyticsModalOpen}
              onClose={closeModals}
            />
          </>
        )}
        <CreateAgentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default AgentsPage;