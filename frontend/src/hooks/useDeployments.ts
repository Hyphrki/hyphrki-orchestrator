import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Deployment {
  id: string;
  deploymentName: string;
  deploymentStatus: 'active' | 'deprecated' | 'archived';
  createdAt: string;
  lastExecutionAt?: string;
  totalExecutions: number;
  agentTemplate: {
    id: string;
    name: string;
    category: string;
  };
  parameterValues: Record<string, any>;
}

export interface Execution {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'timeout';
  startedAt: string;
  stoppedAt?: string;
  inputParameters: Record<string, any>;
  executionOutput?: any;
  errorMessage?: string;
  deployment: {
    id: string;
    deploymentName: string;
    agentTemplate: {
      id: string;
      name: string;
      category: string;
    };
  };
}

const getAuthToken = () => localStorage.getItem('authToken');

export const useDeployments = () => {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await axios.get<Deployment[]>(`${API_BASE_URL}/deployments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });
};

export const useDeployment = (id: string) => {
  return useQuery({
    queryKey: ['deployments', id],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/deployments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      agentTemplateId: string;
      deploymentName: string;
      parameterValues: Record<string, any>;
    }) => {
      const token = getAuthToken();
      const response = await axios.post(`${API_BASE_URL}/deployments`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
};

export const useExecuteDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, inputParameters }: { id: string; inputParameters?: Record<string, any> }) => {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_BASE_URL}/deployments/${id}/execute`,
        { inputParameters },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['deployments', id] });
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
  });
};

export const useDeleteDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = getAuthToken();
      await axios.delete(`${API_BASE_URL}/deployments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
};

export const useExecutions = () => {
  return useQuery({
    queryKey: ['executions'],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await axios.get<Execution[]>(`${API_BASE_URL}/executions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });
};

export const useExecution = (id: string) => {
  return useQuery({
    queryKey: ['executions', id],
    queryFn: async () => {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/executions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!id,
  });
};
