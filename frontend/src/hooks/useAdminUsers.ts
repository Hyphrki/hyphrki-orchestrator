import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  subscription_tier: string;
  role: string;
  status: 'active' | 'suspended';
  created_at: string;
  last_login_at?: string;
  email_verified: boolean;
  suspended_at?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
  subscriptionTier?: string;
  page?: number;
  limit?: number;
}

export interface UserDetail extends User {
  assigned_workflows: Array<{
    id: string;
    name: string;
    description?: string;
    created_at: string;
  }>;
  recent_activities: Array<{
    id: string;
    action: string;
    timestamp: string;
    metadata: any;
  }>;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  subscription_tier?: string;
  role?: string;
}

export interface AssignWorkflowData {
  workflowId: string;
}

export interface UpdateRoleData {
  role: string;
}

// API functions
const fetchUsers = async (filters: UserFilters = {}): Promise<UserListResponse> => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
    params: filters,
  });
  return response.data;
};

const fetchUser = async (id: string): Promise<UserDetail> => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/users/${id}`);
  return response.data;
};

const updateUser = async ({ id, data }: { id: string; data: UpdateUserData }): Promise<User> => {
  const response = await axios.patch(`${API_BASE_URL}/api/admin/users/${id}`, data);
  return response.data;
};

const suspendUser = async (id: string): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/users/${id}/suspend`);
  return response.data;
};

const activateUser = async (id: string): Promise<User> => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/users/${id}/activate`);
  return response.data;
};

const updateUserRole = async ({ id, role }: { id: string; role: string }): Promise<User> => {
  const response = await axios.patch(`${API_BASE_URL}/api/admin/users/${id}/role`, { role });
  return response.data;
};

const assignWorkflow = async ({ userId, workflowId }: { userId: string; workflowId: string }): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/users/${userId}/workflows`, { workflowId });
  return response.data;
};

const fetchUserWorkflows = async (userId: string): Promise<any[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/users/${userId}/workflows`);
  return response.data;
};

// Hooks
export const useUsers = (filters: UserFilters = {}) => {
  return useQuery({
    queryKey: ['admin', 'users', filters],
    queryFn: () => fetchUsers(filters),
    staleTime: 30000, // 30 seconds
    retry: 3,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
    staleTime: 30000,
    retry: 3,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) => updateUser({ id, data }),
    onSuccess: (updatedUser) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['admin', 'users', updatedUser.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useSuspendUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: suspendUser,
    onSuccess: (suspendedUser) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users', suspendedUser.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: activateUser,
    onSuccess: (activatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users', activatedUser.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => updateUserRole({ id, role }),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users', updatedUser.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useAssignWorkflow = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, workflowId }: { userId: string; workflowId: string }) => 
      assignWorkflow({ userId, workflowId }),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users', userId] });
    },
  });
};

export const useUserWorkflows = (userId: string) => {
  return useQuery({
    queryKey: ['admin', 'users', userId, 'workflows'],
    queryFn: () => fetchUserWorkflows(userId),
    enabled: !!userId,
    staleTime: 30000,
  });
};
