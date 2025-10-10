import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Types
export interface OverviewMetrics {
  totalAgents: number;
  publishedAgents: number;
  totalUsers: number;
  activeUsers: number;
  totalExecutions: number;
  totalDeployments: number;
  successRate: number;
  avgExecutionTime: number;
}

export interface AgentMetrics {
  executionRate: Array<{ timestamp: string; rate: number }>;
  successRate: Array<{ timestamp: string; rate: number }>;
  frameworkBreakdown: Array<{ framework: string; count: number }>;
  statusBreakdown: Array<{ status: string; count: number }>;
}

export interface SystemMetrics {
  cpuUsage: Array<{ timestamp: string; usage: number }>;
  memoryUsage: Array<{ timestamp: string; usage: number }>;
  databaseConnections: Array<{ timestamp: string; connections: number }>;
  httpRequestRate: Array<{ timestamp: string; rate: number }>;
}

export interface ExecutionMetrics {
  totalExecutions: Array<{ timestamp: string; count: number }>;
  completedExecutions: Array<{ timestamp: string; count: number }>;
  failedExecutions: Array<{ timestamp: string; count: number }>;
  avgResponseTime: Array<{ timestamp: string; time: number }>;
}

// API functions
const fetchOverviewMetrics = async (): Promise<OverviewMetrics> => {
  const response = await axios.get(`${API_BASE_URL}/api/metrics/overview`);
  return response.data;
};

const fetchAgentMetrics = async (timeRange: string = '1h'): Promise<AgentMetrics> => {
  const response = await axios.get(`${API_BASE_URL}/api/metrics/agents`, {
    params: { timeRange },
  });
  return response.data;
};

const fetchSystemMetrics = async (timeRange: string = '1h'): Promise<SystemMetrics> => {
  const response = await axios.get(`${API_BASE_URL}/api/metrics/system`, {
    params: { timeRange },
  });
  return response.data;
};

const fetchExecutionMetrics = async (timeRange: string = '1h'): Promise<ExecutionMetrics> => {
  const response = await axios.get(`${API_BASE_URL}/api/metrics/executions`, {
    params: { timeRange },
  });
  return response.data;
};

// Hooks
export const useOverviewMetrics = () => {
  return useQuery({
    queryKey: ['metrics', 'overview'],
    queryFn: fetchOverviewMetrics,
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 0, // Always consider data stale
    retry: 3,
    retryDelay: 1000,
  });
};

export const useAgentMetrics = (timeRange: string = '1h') => {
  return useQuery({
    queryKey: ['metrics', 'agents', timeRange],
    queryFn: () => fetchAgentMetrics(timeRange),
    refetchInterval: 5000,
    staleTime: 0,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useSystemMetrics = (timeRange: string = '1h') => {
  return useQuery({
    queryKey: ['metrics', 'system', timeRange],
    queryFn: () => fetchSystemMetrics(timeRange),
    refetchInterval: 5000,
    staleTime: 0,
    retry: 3,
    retryDelay: 1000,
  });
};

export const useExecutionMetrics = (timeRange: string = '1h') => {
  return useQuery({
    queryKey: ['metrics', 'executions', timeRange],
    queryFn: () => fetchExecutionMetrics(timeRange),
    refetchInterval: 5000,
    staleTime: 0,
    retry: 3,
    retryDelay: 1000,
  });
};
