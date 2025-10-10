import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface WorkflowUploadProps {
  onFileUpload: (file: File) => void
  onFileRemove: () => void
  uploadedFile?: File | null
  error?: string | null
  isUploading?: boolean
  className?: string
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function WorkflowUpload({
  onFileUpload,
  onFileRemove,
  uploadedFile,
  error,
  isUploading = false,
  className
}: WorkflowUploadProps) {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  const validateN8NWorkflow = useCallback((file: File): Promise<ValidationResult> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const workflow = JSON.parse(content)
          
          const errors: string[] = []
          const warnings: string[] = []
          
          // Check if it's a valid N8N workflow
          if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
            errors.push('Invalid N8N workflow: missing or invalid nodes array')
          }
          
          if (!workflow.connections || typeof workflow.connections !== 'object') {
            errors.push('Invalid N8N workflow: missing or invalid connections object')
          }
          
          // Check file size (5MB limit)
          if (file.size > 5 * 1024 * 1024) {
            errors.push('File size exceeds 5MB limit')
          }
          
          // Check for required nodes
          const hasWebhook = workflow.nodes?.some((node: any) => 
            node.type === 'n8n-nodes-base.webhook'
          )
          
          if (!hasWebhook) {
            warnings.push('No webhook trigger found. This workflow may not be executable via API.')
          }
          
          // Check for missing parameters
          const missingParams = workflow.nodes?.filter((node: any) => 
            node.parameters && Object.keys(node.parameters).length === 0
          ) || []
          
          if (missingParams.length > 0) {
            warnings.push(`${missingParams.length} nodes have no parameters configured`)
          }
          
          resolve({
            isValid: errors.length === 0,
            errors,
            warnings
          })
        } catch (parseError) {
          resolve({
            isValid: false,
            errors: ['Invalid JSON format'],
            warnings: []
          })
        }
      }
      
      reader.onerror = () => {
        resolve({
          isValid: false,
          errors: ['Failed to read file'],
          warnings: []
        })
      }
      
      reader.readAsText(file)
    })
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    
    // Validate file
    const validation = await validateN8NWorkflow(file)
    setValidationResult(validation)
    
    if (validation.isValid) {
      onFileUpload(file)
    }
  }, [onFileUpload, validateN8NWorkflow])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading
  })

  const handleRemoveFile = () => {
    setValidationResult(null)
    onFileRemove()
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              'hover:border-primary/50 hover:bg-primary/5',
              isDragActive && !isDragReject && 'border-primary bg-primary/10',
              isDragReject && 'border-destructive bg-destructive/10',
              uploadedFile && 'border-green-500 bg-green-50',
              isUploading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center space-y-4">
              {uploadedFile ? (
                <>
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-green-700">
                      Workflow Uploaded Successfully
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>{uploadedFile.name}</span>
                      <span className="text-gray-400">
                        ({(uploadedFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                    disabled={isUploading}
                  >
                    Remove File
                  </Button>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {isDragActive ? 'Drop the workflow file here' : 'Upload N8N Workflow'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Drag and drop your N8N workflow JSON file here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Maximum file size: 5MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    disabled={isUploading}
                  >
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validationResult && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              {validationResult.errors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Validation Errors</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationResult.warnings.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Warnings</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-yellow-600">
                    {validationResult.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationResult.isValid && validationResult.warnings.length === 0 && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Workflow validation passed</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Error */}
      {error && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Upload Error</span>
            </div>
            <p className="text-sm text-red-600 mt-2">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
