import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Interfaces for agent data
export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  version: string;
  publicationStatus: 'draft' | 'published' | 'unpublished';
  pricingTier: 'free' | 'premium' | 'enterprise';
  createdById: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  unpublishedAt?: string;
  parameters: AgentParameter[];
  outputConfig: OutputConfig;
  createdBy: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  analytics?: {
    totalDeployments: number;
    activeDeployments: number;
    totalAssignments: number;
    recentExecutions: number;
  };
}

export interface AgentParameter {
  id: string;
  parameterName: string;
  parameterPath: string;
  fieldType: string;
  displayLabel: string;
  helpText: string;
  defaultValue?: string;
  isRequired: boolean;
  isSensitive: boolean;
  validationRules: any;
  order: number;
}

export interface OutputConfig {
  id: string;
  outputSource: string;
  displayFormat: string;
  nodeIds: string[];
  fieldMappings: any;
  filterRules: any;
}

export interface AgentAnalytics {
  agentId: string;
  agentName: string;
  timeRange: string;
  summary: {
    totalDeployments: number;
    activeDeployments: number;
    totalAssignments: number;
    totalExecutions: number;
    completedExecutions: number;
    failedExecutions: number;
    successRate: number;
    avgExecutionTime: number;
    uniqueUsers: number;
  };
  trends: {
    executionTrends: Array<{
      date: string;
      executions: number;
      completed: number;
      failed: number;
    }>;
    topUsers: Array<{
      userId: string;
      executionCount: number;
    }>;
  };
}

export interface UserAssignedAgent {
  id: string;
  assignedAt: string;
  customConfig: any;
  agentTemplate: AgentTemplate;
}

// Fetch all agents
export const useAgents = (status?: string, category?: string, createdById?: string) => {
  return useQuery<AgentTemplate[], Error>({
    queryKey: ['agents', { status, category, createdById }],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/agents`, {
        params: { status, category, createdById },
        withCredentials: true,
      });
      return data;
    },
    refetchInterval: 60000, // Refetch every minute
  });
};

// Fetch agents with analytics
export const useAgentsWithAnalytics = () => {
  return useQuery<AgentTemplate[], Error>({
    queryKey: ['agentsWithAnalytics'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/agents/analytics/summary`, {
        withCredentials: true,
      });
      return data;
    },
    refetchInterval: 60000,
  });
};

// Fetch single agent
export const useAgent = (agentId: string) => {
  return useQuery<AgentTemplate, Error>({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/agents/${agentId}`, {
        withCredentials: true,
      });
      return data;
    },
    enabled: !!agentId,
  });
};

// Fetch agent analytics
export const useAgentAnalytics = (agentId: string, timeRange: string = '30d') => {
  return useQuery<AgentAnalytics, Error>({
    queryKey: ['agentAnalytics', agentId, timeRange],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/agents/${agentId}/analytics`, {
        params: { timeRange },
        withCredentials: true,
      });
      return data;
    },
    enabled: !!agentId,
    refetchInterval: 30000,
  });
};

// Fetch user assigned agents
export const useUserAssignedAgents = (userId: string) => {
  return useQuery<UserAssignedAgent[], Error>({
    queryKey: ['userAssignedAgents', userId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/agents/user/${userId}/assigned`, {
        withCredentials: true,
      });
      return data;
    },
    enabled: !!userId,
  });
};

// Create agent mutation
export const useCreateAgentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AgentTemplate, Error, any>({
    mutationFn: async (createData) => {
      const { data } = await axios.post(`${API_BASE_URL}/agents`, createData, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};

// Update agent mutation
export const useUpdateAgentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AgentTemplate, Error, { agentId: string; updateData: any }>({
    mutationFn: async ({ agentId, updateData }) => {
      const { data } = await axios.patch(`${API_BASE_URL}/agents/${agentId}`, updateData, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (_, { agentId }) => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agent', agentId] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};

// Delete agent mutation
export const useDeleteAgentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (agentId) => {
      await axios.delete(`${API_BASE_URL}/agents/${agentId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};

// Publish agent mutation
export const usePublishAgentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AgentTemplate, Error, { agentId: string; publishData: any }>({
    mutationFn: async ({ agentId, publishData }) => {
      const { data } = await axios.post(`${API_BASE_URL}/agents/${agentId}/publish`, publishData, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (_, { agentId }) => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agent', agentId] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};

// Unpublish agent mutation
export const useUnpublishAgentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AgentTemplate, Error, string>({
    mutationFn: async (agentId) => {
      const { data } = await axios.post(`${API_BASE_URL}/agents/${agentId}/unpublish`, {}, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (_, agentId) => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agent', agentId] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};

// Assign agent to user mutation
export const useAssignAgentToUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { agentId: string; userId: string; customConfig?: any }>({
    mutationFn: async ({ agentId, userId, customConfig }) => {
      const { data } = await axios.post(`${API_BASE_URL}/agents/${agentId}/assign/${userId}`, customConfig, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['userAssignedAgents', userId] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};

// Remove agent assignment mutation
export const useRemoveAgentAssignmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: async (assignmentId) => {
      const { data } = await axios.delete(`${API_BASE_URL}/agents/assignments/${assignmentId}`, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAssignedAgents'] });
      queryClient.invalidateQueries({ queryKey: ['agentsWithAnalytics'] });
    },
  });
};