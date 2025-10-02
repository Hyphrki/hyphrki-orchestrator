"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bot, 
  ArrowLeft,
  Save,
  Settings,
  Workflow,
  Code,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

interface ConfigurationField {
  name: string
  type: 'text' | 'email' | 'password' | 'number' | 'boolean' | 'select'
  label: string
  description: string
  required: boolean
  encrypted: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export default function CreateTemplatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    version: "1.0.0",
    isPublic: false,
    isPremium: false,
    price: 0,
    currency: "USD"
  })
  const [workflowDefinition, setWorkflowDefinition] = useState({})
  const [configurationFields, setConfigurationFields] = useState<ConfigurationField[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const steps = [
    { id: 1, title: "Basic Information", description: "Template details and metadata" },
    { id: 2, title: "Workflow Definition", description: "N8N workflow configuration" },
    { id: 3, title: "Configuration Schema", description: "Customer input requirements" },
    { id: 4, title: "Review & Publish", description: "Final review and publication" }
  ]

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addConfigurationField = () => {
    const newField: ConfigurationField = {
      name: "",
      type: "text",
      label: "",
      description: "",
      required: false,
      encrypted: false
    }
    setConfigurationFields(prev => [...prev, newField])
  }

  const updateConfigurationField = (index: number, field: Partial<ConfigurationField>) => {
    setConfigurationFields(prev => 
      prev.map((item, i) => i === index ? { ...item, ...field } : item)
    )
  }

  const removeConfigurationField = (index: number) => {
    setConfigurationFields(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const templateData = {
        ...formData,
        workflowDefinition,
        configurationSchema: {
          required_fields: configurationFields
        }
      }

      // Save template to API
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      })

      if (!response.ok) {
        throw new Error('Failed to save template')
      }

      const savedTemplate = await response.json()
      console.log("Template saved:", savedTemplate)
      
      // Redirect to templates list
      window.location.href = "/templates"
    } catch (error) {
      console.error("Failed to save template:", error)
      alert("Failed to save template. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Lead Qualification Agent"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what this agent does and its use cases..."
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select category</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="marketing">Marketing</option>
                  <option value="analytics">Analytics</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => handleInputChange("version", e.target.value)}
                  placeholder="1.0.0"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => handleInputChange("isPublic", e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="isPublic">Make public</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={formData.isPremium}
                  onChange={(e) => handleInputChange("isPremium", e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="isPremium">Premium template</Label>
              </div>
            </div>
            
            {formData.isPremium && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => handleInputChange("currency", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Workflow Definition</h3>
              <p className="text-muted-foreground mb-4">
                Configure the N8N workflow for this agent template
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open('http://localhost:5678', '_blank')}
              >
                <Code className="h-4 w-4 mr-2" />
                Open N8N Editor
              </Button>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Workflow JSON</h4>
              <Textarea
                value={JSON.stringify(workflowDefinition, null, 2)}
                onChange={(e) => {
                  try {
                    setWorkflowDefinition(JSON.parse(e.target.value))
                  } catch {
                    // Invalid JSON, keep the text for editing
                  }
                }}
                placeholder="Paste your N8N workflow JSON here..."
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Configuration Fields</h3>
                <p className="text-muted-foreground">
                  Define what information customers need to provide
                </p>
              </div>
              <Button onClick={addConfigurationField}>
                <Settings className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>
            
            <div className="space-y-4">
              {configurationFields.map((field, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Field {index + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeConfigurationField(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Field Name</Label>
                        <Input
                          value={field.name}
                          onChange={(e) => updateConfigurationField(index, { name: e.target.value })}
                          placeholder="e.g., api_key"
                        />
                      </div>
                      <div>
                        <Label>Field Type</Label>
                        <select
                          value={field.type}
                          onChange={(e) => updateConfigurationField(index, { type: e.target.value as ConfigurationField['type'] })}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="password">Password</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="select">Select</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateConfigurationField(index, { label: e.target.value })}
                        placeholder="e.g., API Key"
                      />
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={field.description}
                        onChange={(e) => updateConfigurationField(index, { description: e.target.value })}
                        placeholder="Help text for this field..."
                        rows={2}
                      />
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateConfigurationField(index, { required: e.target.checked })}
                          className="rounded"
                        />
                        <Label>Required</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.encrypted}
                          onChange={(e) => updateConfigurationField(index, { encrypted: e.target.checked })}
                          className="rounded"
                        />
                        <Label>Encrypted</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {configurationFields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-8 w-8 mx-auto mb-2" />
                  <p>No configuration fields added yet</p>
                  <p className="text-sm">Click &quot;Add Field&quot; to get started</p>
                </div>
              )}
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Review Template</h3>
              <p className="text-muted-foreground">
                Review your template configuration before publishing
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>{formData.name}</CardTitle>
                <CardDescription>{formData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span> {formData.category}
                  </div>
                  <div>
                    <span className="font-medium">Version:</span> {formData.version}
                  </div>
                  <div>
                    <span className="font-medium">Public:</span> {formData.isPublic ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-medium">Premium:</span> {formData.isPremium ? "Yes" : "No"}
                  </div>
                  {formData.isPremium && (
                    <>
                      <div>
                        <span className="font-medium">Price:</span> ${formData.price} {formData.currency}
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  <span className="font-medium">Configuration Fields:</span> {configurationFields.length}
                </div>
                
                <div>
                  <span className="font-medium">Workflow:</span> {Object.keys(workflowDefinition).length > 0 ? "Configured" : "Not configured"}
                </div>
              </CardContent>
            </Card>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/templates">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Create Agent Template</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            
            {currentStep < steps.length ? (
              <Button onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={isSaving}>
                <CheckCircle className="h-4 w-4 mr-2" />
                {isSaving ? "Publishing..." : "Publish Template"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
