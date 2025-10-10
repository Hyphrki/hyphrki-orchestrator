import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Settings, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { cn } from '@/utils/cn'

// Output source options
const OUTPUT_SOURCES = [
  { value: 'finalResult', label: 'Final Result' },
  { value: 'specificNodes', label: 'Specific Nodes' },
  { value: 'customAggregation', label: 'Custom Aggregation' }
] as const

// Display format options
const DISPLAY_FORMATS = [
  { value: 'raw', label: 'Raw JSON' },
  { value: 'formatted', label: 'Formatted JSON' },
  { value: 'table', label: 'Table View' },
  { value: 'chart', label: 'Chart View' },
  { value: 'custom', label: 'Custom Template' }
] as const

// Field mapping schema
const fieldMappingSchema = z.object({
  jsonPath: z.string().min(1, 'JSON path is required'),
  displayLabel: z.string().min(1, 'Display label is required')
})

// Filter rules schema
const filterRulesSchema = z.object({
  exclude: z.array(z.string()).optional(),
  maxDepth: z.number().optional(),
  maxItems: z.number().optional()
})

// Output display config schema
const outputConfigSchema = z.object({
  outputSource: z.enum(['finalResult', 'specificNodes', 'customAggregation']),
  displayFormat: z.enum(['raw', 'formatted', 'table', 'chart', 'custom']),
  nodeIds: z.array(z.string()).optional(),
  fieldMappings: z.array(fieldMappingSchema).optional(),
  filterRules: filterRulesSchema.optional(),
  customTemplate: z.string().optional()
})

type OutputConfigFormData = z.infer<typeof outputConfigSchema>

interface OutputConfigFormProps {
  onOutputConfigChanged: (config: OutputConfigFormData) => void
  onSave: () => void
  className?: string
}

export function OutputConfigForm({
  onOutputConfigChanged,
  onSave,
  className
}: OutputConfigFormProps) {
  const [showFieldMappings, setShowFieldMappings] = useState(false)
  const [showFilterRules, setShowFilterRules] = useState(false)
  const [showCustomTemplate, setShowCustomTemplate] = useState(false)

  const form = useForm<OutputConfigFormData>({
    resolver: zodResolver(outputConfigSchema),
    defaultValues: {
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
  })

  const watchedOutputSource = form.watch('outputSource')
  const watchedDisplayFormat = form.watch('displayFormat')

  const handleSave = () => {
    form.handleSubmit((data) => {
      onOutputConfigChanged(data)
      onSave()
    })()
  }

  const addFieldMapping = () => {
    const currentMappings = form.getValues('fieldMappings') || []
    form.setValue('fieldMappings', [
      ...currentMappings,
      { jsonPath: '', displayLabel: '' }
    ])
  }

  const removeFieldMapping = (index: number) => {
    const currentMappings = form.getValues('fieldMappings') || []
    currentMappings.splice(index, 1)
    form.setValue('fieldMappings', currentMappings)
  }

  const addNodeId = () => {
    const currentNodeIds = form.getValues('nodeIds') || []
    form.setValue('nodeIds', [...currentNodeIds, ''])
  }

  const removeNodeId = (index: number) => {
    const currentNodeIds = form.getValues('nodeIds') || []
    currentNodeIds.splice(index, 1)
    form.setValue('nodeIds', currentNodeIds)
  }

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle>Output Display Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {/* Output Source */}
              <FormField
                control={form.control}
                name="outputSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select output source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {OUTPUT_SOURCES.map((source) => (
                          <SelectItem key={source.value} value={source.value}>
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose where to extract the output data from the workflow execution
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Specific Nodes Configuration */}
              {watchedOutputSource === 'specificNodes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Node IDs</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addNodeId}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Node
                    </Button>
                  </div>
                  
                  {form.watch('nodeIds')?.map((nodeId, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Node ID (e.g., node-123)"
                        value={nodeId}
                        onChange={(e) => {
                          const nodeIds = form.getValues('nodeIds') || []
                          nodeIds[index] = e.target.value
                          form.setValue('nodeIds', nodeIds)
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeNodeId(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Display Format */}
              <FormField
                control={form.control}
                name="displayFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select display format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DISPLAY_FORMATS.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how the output data should be displayed to users
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Field Mappings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Field Mappings</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFieldMappings(!showFieldMappings)}
                  >
                    {showFieldMappings ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {showFieldMappings ? 'Hide' : 'Show'} Field Mappings
                  </Button>
                </div>

                {showFieldMappings && (
                  <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFieldMapping}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Mapping
                      </Button>
                    </div>

                    {form.watch('fieldMappings')?.map((mapping, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="JSON Path (e.g., data.result.status)"
                          value={mapping.jsonPath}
                          onChange={(e) => {
                            const mappings = form.getValues('fieldMappings') || []
                            mappings[index] = { ...mapping, jsonPath: e.target.value }
                            form.setValue('fieldMappings', mappings)
                          }}
                        />
                        <Input
                          placeholder="Display Label (e.g., Status)"
                          value={mapping.displayLabel}
                          onChange={(e) => {
                            const mappings = form.getValues('fieldMappings') || []
                            mappings[index] = { ...mapping, displayLabel: e.target.value }
                            form.setValue('fieldMappings', mappings)
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFieldMapping(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Example mappings:</p>
                      <ul className="list-disc list-inside space-y-1 mt-1">
                        <li><code>data.result.status</code> → <code>Status</code></li>
                        <li><code>data.result.message</code> → <code>Message</code></li>
                        <li><code>data.result.count</code> → <code>Record Count</code></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Filter Rules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Filter Rules</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilterRules(!showFilterRules)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {showFilterRules ? 'Hide' : 'Show'} Filter Rules
                  </Button>
                </div>

                {showFilterRules && (
                  <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                    <FormField
                      control={form.control}
                      name="filterRules.exclude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exclude Fields</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Comma-separated field names (e.g., __internal, _meta)"
                              value={field.value?.join(', ') || ''}
                              onChange={(e) => {
                                const excludeFields = e.target.value
                                  .split(',')
                                  .map(field => field.trim())
                                  .filter(field => field.length > 0)
                                form.setValue('filterRules.exclude', excludeFields)
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Fields to exclude from the output display
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="filterRules.maxDepth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Depth</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="3"
                                value={field.value || ''}
                                onChange={(e) => {
                                  form.setValue('filterRules.maxDepth', parseInt(e.target.value) || undefined)
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum nesting depth to display
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="filterRules.maxItems"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Items</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="100"
                                value={field.value || ''}
                                onChange={(e) => {
                                  form.setValue('filterRules.maxItems', parseInt(e.target.value) || undefined)
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum number of items to display
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Template */}
              {watchedDisplayFormat === 'custom' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Custom Template</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCustomTemplate(!showCustomTemplate)}
                    >
                      {showCustomTemplate ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                      {showCustomTemplate ? 'Hide' : 'Show'} Template
                    </Button>
                  </div>

                  {showCustomTemplate && (
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="customTemplate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Enter custom template with placeholders..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Use placeholders like {'{data.result.status}'} to insert values
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Template example:</p>
                        <pre className="mt-1 p-2 bg-gray-100 rounded text-xs">
{`<div class="result">
  <h3>Execution Result</h3>
  <p>Status: {data.result.status}</p>
  <p>Message: {data.result.message}</p>
  <p>Count: {data.result.count}</p>
</div>`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                <Button type="button" onClick={handleSave}>
                  Save Output Configuration
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
