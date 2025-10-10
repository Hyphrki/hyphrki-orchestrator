import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface AgentParameter {
  id: string
  agentTemplateId: string
  parameterName: string
  parameterPath: string
  fieldType: 'text' | 'password' | 'number' | 'email' | 'url' | 'select' | 'textarea' | 'checkbox' | 'date'
  displayLabel: string
  helpText?: string
  defaultValue?: string
  isRequired: boolean
  isSensitive: boolean
  validationRules?: {
    min?: number
    max?: number
    regex?: string
    errorMessage?: string
  }
  selectOptions?: Array<{
    value: string
    label: string
  }>
  order: number
  createdAt: string
  updatedAt: string
}

interface CreateParameterData {
  agentTemplateId: string
  parameterName: string
  parameterPath: string
  fieldType: AgentParameter['fieldType']
  displayLabel: string
  helpText?: string
  defaultValue?: string
  isRequired: boolean
  isSensitive: boolean
  validationRules?: AgentParameter['validationRules']
  selectOptions?: AgentParameter['selectOptions']
  order: number
}

interface UpdateParameterData {
  parameterName?: string
  parameterPath?: string
  fieldType?: AgentParameter['fieldType']
  displayLabel?: string
  helpText?: string
  defaultValue?: string
  isRequired?: boolean
  isSensitive?: boolean
  validationRules?: AgentParameter['validationRules']
  selectOptions?: AgentParameter['selectOptions']
  order?: number
}

interface ParameterValidationResult {
  isValid: boolean
  errors: Array<{
    field: string
    message: string
    rule?: string
  }>
}

// API functions
const parametersApi = {
  // Get parameters for an agent
  getParameters: async (agentTemplateId: string): Promise<AgentParameter[]> => {
    const response = await fetch(`/api/agents/${agentTemplateId}/parameters`)
    if (!response.ok) {
      throw new Error('Failed to fetch parameters')
    }
    return response.json()
  },

  // Get single parameter
  getParameter: async (agentTemplateId: string, parameterId: string): Promise<AgentParameter> => {
    const response = await fetch(`/api/agents/${agentTemplateId}/parameters/${parameterId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch parameter')
    }
    return response.json()
  },

  // Create parameter
  createParameter: async (data: CreateParameterData): Promise<AgentParameter> => {
    const response = await fetch(`/api/agents/${data.agentTemplateId}/parameters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create parameter')
    }

    return response.json()
  },

  // Update parameter
  updateParameter: async (
    agentTemplateId: string,
    parameterId: string,
    data: UpdateParameterData
  ): Promise<AgentParameter> => {
    const response = await fetch(`/api/agents/${agentTemplateId}/parameters/${parameterId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update parameter')
    }

    return response.json()
  },

  // Delete parameter
  deleteParameter: async (agentTemplateId: string, parameterId: string): Promise<void> => {
    const response = await fetch(`/api/agents/${agentTemplateId}/parameters/${parameterId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete parameter')
    }
  },

  // Validate parameter value
  validateParameterValue: async (
    parameterId: string,
    value: any
  ): Promise<ParameterValidationResult> => {
    const response = await fetch(`/api/parameters/${parameterId}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })

    if (!response.ok) {
      throw new Error('Failed to validate parameter')
    }

    return response.json()
  },

  // Bulk update parameters
  bulkUpdateParameters: async (
    agentTemplateId: string,
    parameters: UpdateParameterData[]
  ): Promise<AgentParameter[]> => {
    const response = await fetch(`/api/agents/${agentTemplateId}/parameters/bulk`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ parameters })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update parameters')
    }

    return response.json()
  }
}

// React Query hooks
export function useParameters(agentTemplateId: string) {
  return useQuery({
    queryKey: ['parameters', agentTemplateId],
    queryFn: () => parametersApi.getParameters(agentTemplateId),
    enabled: !!agentTemplateId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useParameter(agentTemplateId: string, parameterId: string) {
  return useQuery({
    queryKey: ['parameters', agentTemplateId, parameterId],
    queryFn: () => parametersApi.getParameter(agentTemplateId, parameterId),
    enabled: !!agentTemplateId && !!parameterId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreateParameter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: parametersApi.createParameter,
    onSuccess: (data) => {
      // Invalidate parameters list for the agent
      queryClient.invalidateQueries({ 
        queryKey: ['parameters', data.agentTemplateId] 
      })
      
      // Also invalidate the agent data since parameters are part of it
      queryClient.invalidateQueries({ 
        queryKey: ['agents', data.agentTemplateId] 
      })
    },
    onError: (error) => {
      console.error('Failed to create parameter:', error)
    }
  })
}

export function useUpdateParameter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      agentTemplateId, 
      parameterId, 
      data 
    }: { 
      agentTemplateId: string
      parameterId: string
      data: UpdateParameterData 
    }) => parametersApi.updateParameter(agentTemplateId, parameterId, data),
    onSuccess: (data, variables) => {
      // Update the specific parameter in cache
      queryClient.setQueryData(
        ['parameters', variables.agentTemplateId, variables.parameterId], 
        data
      )
      
      // Invalidate parameters list
      queryClient.invalidateQueries({ 
        queryKey: ['parameters', variables.agentTemplateId] 
      })
      
      // Also invalidate the agent data
      queryClient.invalidateQueries({ 
        queryKey: ['agents', variables.agentTemplateId] 
      })
    },
    onError: (error) => {
      console.error('Failed to update parameter:', error)
    }
  })
}

export function useDeleteParameter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      agentTemplateId, 
      parameterId 
    }: { 
      agentTemplateId: string
      parameterId: string 
    }) => parametersApi.deleteParameter(agentTemplateId, parameterId),
    onSuccess: (_, variables) => {
      // Remove parameter from cache
      queryClient.removeQueries({ 
        queryKey: ['parameters', variables.agentTemplateId, variables.parameterId] 
      })
      
      // Invalidate parameters list
      queryClient.invalidateQueries({ 
        queryKey: ['parameters', variables.agentTemplateId] 
      })
      
      // Also invalidate the agent data
      queryClient.invalidateQueries({ 
        queryKey: ['agents', variables.agentTemplateId] 
      })
    },
    onError: (error) => {
      console.error('Failed to delete parameter:', error)
    }
  })
}

export function useBulkUpdateParameters() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      agentTemplateId, 
      parameters 
    }: { 
      agentTemplateId: string
      parameters: UpdateParameterData[] 
    }) => parametersApi.bulkUpdateParameters(agentTemplateId, parameters),
    onSuccess: (data, variables) => {
      // Update parameters list in cache
      queryClient.setQueryData(
        ['parameters', variables.agentTemplateId], 
        data
      )
      
      // Also invalidate the agent data
      queryClient.invalidateQueries({ 
        queryKey: ['agents', variables.agentTemplateId] 
      })
    },
    onError: (error) => {
      console.error('Failed to bulk update parameters:', error)
    }
  })
}

export function useValidateParameterValue() {
  return useMutation({
    mutationFn: ({ 
      parameterId, 
      value 
    }: { 
      parameterId: string
      value: any 
    }) => parametersApi.validateParameterValue(parameterId, value),
    onError: (error) => {
      console.error('Failed to validate parameter value:', error)
    }
  })
}

// Utility hooks
export function useParameterActions(agentTemplateId: string) {
  const createMutation = useCreateParameter()
  const updateMutation = useUpdateParameter()
  const deleteMutation = useDeleteParameter()
  const bulkUpdateMutation = useBulkUpdateParameters()

  const createParameter = (data: Omit<CreateParameterData, 'agentTemplateId'>) => {
    return createMutation.mutateAsync({
      ...data,
      agentTemplateId
    })
  }

  const updateParameter = (parameterId: string, data: UpdateParameterData) => {
    return updateMutation.mutateAsync({
      agentTemplateId,
      parameterId,
      data
    })
  }

  const deleteParameter = (parameterId: string) => {
    return deleteMutation.mutateAsync({
      agentTemplateId,
      parameterId
    })
  }

  const bulkUpdateParameters = (parameters: UpdateParameterData[]) => {
    return bulkUpdateMutation.mutateAsync({
      agentTemplateId,
      parameters
    })
  }

  return {
    createParameter,
    updateParameter,
    deleteParameter,
    bulkUpdateParameters,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isBulkUpdating: bulkUpdateMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    bulkUpdateError: bulkUpdateMutation.error
  }
}

// Field type utilities
export const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'password', label: 'Password' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' }
] as const

export function getFieldTypeLabel(fieldType: AgentParameter['fieldType']): string {
  const type = FIELD_TYPES.find(t => t.value === fieldType)
  return type?.label || fieldType
}

export function isFieldTypeRequiringOptions(fieldType: AgentParameter['fieldType']): boolean {
  return fieldType === 'select'
}

export function isFieldTypeSensitive(fieldType: AgentParameter['fieldType']): boolean {
  return fieldType === 'password'
}
