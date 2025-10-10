import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WorkflowUpload } from '@/components/workflow-upload/WorkflowUpload'
import { ParameterConfigForm } from '@/components/parameter-config/ParameterConfigForm'
import { OutputConfigForm } from '@/components/output-config/OutputConfigForm'
import { AgentMetadataForm } from '@/components/agents/AgentMetadataForm'
import { cn } from '@/utils/cn'

interface DetectedParameter {
  name: string
  path: string
  currentValue?: any
  suggestedType: 'text' | 'password' | 'number' | 'email' | 'url' | 'select' | 'textarea' | 'checkbox' | 'date'
  isRequired: boolean
}

interface AgentData {
  metadata: {
    name: string
    description: string
    category: string
    tags: string[]
    pricingTier: string
    version: string
  }
  parameters: any[]
  outputConfig: any
  workflowFile?: File
}

export function CreateAgentPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form data state
  const [agentData, setAgentData] = useState<AgentData>({
    metadata: {
      name: '',
      description: '',
      category: 'automation',
      tags: [],
      pricingTier: 'free',
      version: '1.0.0'
    },
    parameters: [],
    outputConfig: {
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
    },
    workflowFile: undefined
  })

  const [detectedParameters, setDetectedParameters] = useState<DetectedParameter[]>([])
  const [workflowError, setWorkflowError] = useState<string | null>(null)

  const steps = [
    { id: 1, title: 'Upload Workflow', description: 'Upload N8N workflow JSON' },
    { id: 2, title: 'Configure Parameters', description: 'Set up parameter configuration' },
    { id: 3, title: 'Output Display', description: 'Configure output formatting' },
    { id: 4, title: 'Agent Metadata', description: 'Set name, description, and pricing' }
  ]

  const handleWorkflowUpload = useCallback(async (file: File) => {
    try {
      setWorkflowError(null)
      
      // Parse the workflow JSON to detect parameters
      const content = await file.text()
      const workflow = JSON.parse(content)
      
      // Detect parameters from workflow nodes
      const detected: DetectedParameter[] = []
      
      if (workflow.nodes && Array.isArray(workflow.nodes)) {
        workflow.nodes.forEach((node: any, nodeIndex: number) => {
          if (node.parameters) {
            Object.keys(node.parameters).forEach(paramKey => {
              const paramValue = node.parameters[paramKey]
              
              // Skip if parameter already has a value
              if (paramValue !== undefined && paramValue !== null && paramValue !== '') {
                return
              }
              
              // Infer field type based on parameter name and context
              let suggestedType: DetectedParameter['suggestedType'] = 'text'
              
              if (paramKey.toLowerCase().includes('key') || paramKey.toLowerCase().includes('secret')) {
                suggestedType = 'password'
              } else if (paramKey.toLowerCase().includes('email')) {
                suggestedType = 'email'
              } else if (paramKey.toLowerCase().includes('url') || paramKey.toLowerCase().includes('endpoint')) {
                suggestedType = 'url'
              } else if (paramKey.toLowerCase().includes('count') || paramKey.toLowerCase().includes('number')) {
                suggestedType = 'number'
              } else if (paramKey.toLowerCase().includes('message') || paramKey.toLowerCase().includes('content')) {
                suggestedType = 'textarea'
              }
              
              detected.push({
                name: paramKey,
                path: `nodes[${nodeIndex}].parameters.${paramKey}`,
                suggestedType,
                isRequired: true
              })
            })
          }
        })
      }
      
      setDetectedParameters(detected)
      setAgentData(prev => ({ ...prev, workflowFile: file }))
      
    } catch (err) {
      setWorkflowError('Failed to parse workflow JSON')
      console.error('Workflow parsing error:', err)
    }
  }, [])

  const handleWorkflowRemove = useCallback(() => {
    setAgentData(prev => ({ ...prev, workflowFile: undefined }))
    setDetectedParameters([])
    setWorkflowError(null)
  }, [])

  const handleParametersConfigured = useCallback((parameters: any[]) => {
    setAgentData(prev => ({ ...prev, parameters }))
  }, [])

  const handleOutputConfigChanged = useCallback((outputConfig: any) => {
    setAgentData(prev => ({ ...prev, outputConfig }))
  }, [])

  const handleMetadataChanged = useCallback((metadata: any) => {
    setAgentData(prev => ({ ...prev, metadata }))
  }, [])

  const handleCreateAgent = async () => {
    if (!agentData.workflowFile) {
      setError('Please upload a workflow file')
      return
    }

    if (agentData.parameters.length === 0) {
      setError('Please configure at least one parameter')
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('workflowFile', agentData.workflowFile)
      formData.append('metadata', JSON.stringify(agentData.metadata))
      formData.append('parameters', JSON.stringify(agentData.parameters))
      formData.append('outputConfig', JSON.stringify(agentData.outputConfig))

      // Submit to backend
      const response = await fetch('/api/agents', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create agent')
      }

      const result = await response.json()
      
      // Navigate to agent list or agent details
      navigate(`/agents/${result.id}`)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create agent')
    } finally {
      setIsCreating(false)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return agentData.workflowFile !== undefined
      case 2:
        return agentData.parameters.length > 0
      case 3:
        return true // Output config is optional
      case 4:
        return agentData.metadata.name && agentData.metadata.description
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <WorkflowUpload
            onFileUpload={handleWorkflowUpload}
            onFileRemove={handleWorkflowRemove}
            uploadedFile={agentData.workflowFile}
            error={workflowError}
            isUploading={isCreating}
          />
        )
      case 2:
        return (
          <ParameterConfigForm
            detectedParameters={detectedParameters}
            onParametersConfigured={handleParametersConfigured}
            onSave={() => {}}
          />
        )
      case 3:
        return (
          <OutputConfigForm
            onOutputConfigChanged={handleOutputConfigChanged}
            onSave={() => {}}
          />
        )
      case 4:
        return (
          <AgentMetadataForm
            onMetadataChanged={handleMetadataChanged}
            onSave={() => {}}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/agents')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Create New Agent</h1>
          <p className="text-gray-600 mt-2">
            Upload an N8N workflow and configure it for the marketplace
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    )}
                  >
                    {step.id}
                  </div>
                  <div className="ml-3">
                    <p className={cn(
                      'text-sm font-medium',
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                    )}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-200 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <Settings className="h-5 w-5 mr-2" />}
              {currentStep === 2 && <Settings className="h-5 w-5 mr-2" />}
              {currentStep === 3 && <Eye className="h-5 w-5 mr-2" />}
              {currentStep === 4 && <Settings className="h-5 w-5 mr-2" />}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mt-4 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
                disabled={!canProceedToNext()}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleCreateAgent}
                disabled={!canProceedToNext() || isCreating}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating...' : 'Create Agent'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
