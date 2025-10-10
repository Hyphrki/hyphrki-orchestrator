import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DetectedParameter {
  name: string
  path: string
  currentValue?: any
  suggestedType: 'text' | 'password' | 'number' | 'email' | 'url' | 'select' | 'textarea' | 'checkbox' | 'date'
  isRequired: boolean
}

interface AgentParameter {
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
}

interface OutputConfig {
  outputSource: 'finalResult' | 'specificNodes' | 'customAggregation'
  displayFormat: 'raw' | 'formatted' | 'table' | 'chart' | 'custom'
  nodeIds?: string[]
  fieldMappings?: Array<{
    jsonPath: string
    displayLabel: string
  }>
  filterRules?: {
    exclude?: string[]
    maxDepth?: number
    maxItems?: number
  }
  customTemplate?: string
}

interface AgentMetadata {
  name: string
  description: string
  category: string
  tags: string[]
  pricingTier: 'free' | 'basic' | 'pro' | 'enterprise'
  version: string
}

interface AgentCreationState {
  // Current step in the creation process
  currentStep: number
  
  // Workflow file
  workflowFile: File | null
  
  // Detected parameters from workflow parsing
  detectedParameters: DetectedParameter[]
  
  // Configured parameters
  parameters: AgentParameter[]
  
  // Output configuration
  outputConfig: OutputConfig
  
  // Agent metadata
  metadata: AgentMetadata
  
  // Auto-save state
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  
  // Actions
  setCurrentStep: (step: number) => void
  setWorkflowFile: (file: File | null) => void
  setDetectedParameters: (parameters: DetectedParameter[]) => void
  setParameters: (parameters: AgentParameter[]) => void
  setOutputConfig: (config: OutputConfig) => void
  setMetadata: (metadata: AgentMetadata) => void
  
  // Auto-save actions
  markAsSaved: () => void
  markAsUnsaved: () => void
  
  // Reset actions
  resetAgentCreation: () => void
  resetToStep: (step: number) => void
}

const initialOutputConfig: OutputConfig = {
  outputSource: 'finalResult',
  displayFormat: 'formatted',
  nodeIds: [],
  fieldMappings: [],
  filterRules: {
    exclude: ['__internal', '_meta'],
    maxDepth: 3,
    maxItems: 100
  },
  customTemplate: ''
}

const initialMetadata: AgentMetadata = {
  name: '',
  description: '',
  category: 'automation',
  tags: [],
  pricingTier: 'free',
  version: '1.0.0'
}

export const useAgentStore = create<AgentCreationState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      workflowFile: null,
      detectedParameters: [],
      parameters: [],
      outputConfig: initialOutputConfig,
      metadata: initialMetadata,
      lastSaved: null,
      hasUnsavedChanges: false,

      // Step management
      setCurrentStep: (step: number) => {
        set({ currentStep: step })
      },

      // Workflow file management
      setWorkflowFile: (file: File | null) => {
        set({ 
          workflowFile: file,
          hasUnsavedChanges: true 
        })
      },

      // Parameter management
      setDetectedParameters: (parameters: DetectedParameter[]) => {
        set({ 
          detectedParameters: parameters,
          hasUnsavedChanges: true 
        })
      },

      setParameters: (parameters: AgentParameter[]) => {
        set({ 
          parameters,
          hasUnsavedChanges: true 
        })
      },

      // Output configuration management
      setOutputConfig: (config: OutputConfig) => {
        set({ 
          outputConfig: config,
          hasUnsavedChanges: true 
        })
      },

      // Metadata management
      setMetadata: (metadata: AgentMetadata) => {
        set({ 
          metadata,
          hasUnsavedChanges: true 
        })
      },

      // Auto-save management
      markAsSaved: () => {
        set({ 
          lastSaved: new Date(),
          hasUnsavedChanges: false 
        })
      },

      markAsUnsaved: () => {
        set({ hasUnsavedChanges: true })
      },

      // Reset actions
      resetAgentCreation: () => {
        set({
          currentStep: 1,
          workflowFile: null,
          detectedParameters: [],
          parameters: [],
          outputConfig: initialOutputConfig,
          metadata: initialMetadata,
          lastSaved: null,
          hasUnsavedChanges: false
        })
      },

      resetToStep: (step: number) => {
        const state = get()
        
        // Reset data based on step
        if (step <= 1) {
          set({
            currentStep: 1,
            workflowFile: null,
            detectedParameters: [],
            parameters: [],
            outputConfig: initialOutputConfig,
            metadata: initialMetadata,
            hasUnsavedChanges: false
          })
        } else if (step <= 2) {
          set({
            currentStep: 2,
            parameters: [],
            outputConfig: initialOutputConfig,
            metadata: initialMetadata,
            hasUnsavedChanges: false
          })
        } else if (step <= 3) {
          set({
            currentStep: 3,
            outputConfig: initialOutputConfig,
            metadata: initialMetadata,
            hasUnsavedChanges: false
          })
        } else {
          set({
            currentStep: 4,
            metadata: initialMetadata,
            hasUnsavedChanges: false
          })
        }
      }
    }),
    {
      name: 'agent-creation-store',
      // Only persist certain fields to avoid storing File objects
      partialize: (state) => ({
        currentStep: state.currentStep,
        detectedParameters: state.detectedParameters,
        parameters: state.parameters,
        outputConfig: state.outputConfig,
        metadata: state.metadata,
        lastSaved: state.lastSaved,
        hasUnsavedChanges: state.hasUnsavedChanges
      })
    }
  )
)

// Utility functions
export const agentStoreUtils = {
  // Check if current step can proceed
  canProceedToNext: (state: AgentCreationState): boolean => {
    switch (state.currentStep) {
      case 1:
        return state.workflowFile !== null
      case 2:
        return state.parameters.length > 0
      case 3:
        return true // Output config is optional
      case 4:
        return state.metadata.name.length > 0 && state.metadata.description.length > 0
      default:
        return false
    }
  },

  // Get validation errors for current step
  getStepValidationErrors: (state: AgentCreationState): string[] => {
    const errors: string[] = []

    switch (state.currentStep) {
      case 1:
        if (!state.workflowFile) {
          errors.push('Please upload a workflow file')
        }
        break
      case 2:
        if (state.parameters.length === 0) {
          errors.push('Please configure at least one parameter')
        }
        // Check for required fields in parameters
        state.parameters.forEach((param, index) => {
          if (!param.parameterName) {
            errors.push(`Parameter ${index + 1}: Name is required`)
          }
          if (!param.parameterPath) {
            errors.push(`Parameter ${index + 1}: Path is required`)
          }
          if (!param.displayLabel) {
            errors.push(`Parameter ${index + 1}: Display label is required`)
          }
        })
        break
      case 3:
        // Output config validation is optional
        break
      case 4:
        if (!state.metadata.name) {
          errors.push('Agent name is required')
        }
        if (!state.metadata.description) {
          errors.push('Agent description is required')
        }
        if (!state.metadata.version.match(/^\d+\.\d+\.\d+$/)) {
          errors.push('Version must follow semantic versioning (e.g., 1.0.0)')
        }
        break
    }

    return errors
  },

  // Auto-save functionality
  autoSave: (state: AgentCreationState) => {
    // This would typically trigger an API call to save draft
    // For now, we just mark as saved
    state.markAsSaved()
  },

  // Get progress percentage
  getProgressPercentage: (state: AgentCreationState): number => {
    const totalSteps = 4
    return (state.currentStep / totalSteps) * 100
  },

  // Check if agent creation is complete
  isCreationComplete: (state: AgentCreationState): boolean => {
    return (
      state.workflowFile !== null &&
      state.parameters.length > 0 &&
      state.metadata.name.length > 0 &&
      state.metadata.description.length > 0
    )
  }
}

// Auto-save hook
export function useAutoSave() {
  const { 
    hasUnsavedChanges, 
    markAsSaved, 
    markAsUnsaved 
  } = useAgentStore()

  // Auto-save every 30 seconds if there are unsaved changes
  React.useEffect(() => {
    if (!hasUnsavedChanges) return

    const interval = setInterval(() => {
      agentStoreUtils.autoSave(useAgentStore.getState())
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [hasUnsavedChanges])

  return {
    hasUnsavedChanges,
    markAsSaved,
    markAsUnsaved
  }
}

// Import React for the useEffect hook
import React from 'react'
