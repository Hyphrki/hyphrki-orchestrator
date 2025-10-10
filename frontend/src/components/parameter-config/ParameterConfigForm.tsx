import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, Eye, EyeOff, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { cn } from '@/utils/cn'

// Field types available for parameters
const FIELD_TYPES = [
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

type FieldType = typeof FIELD_TYPES[number]['value']

// Validation rules schema
const validationRulesSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  regex: z.string().optional(),
  errorMessage: z.string().optional()
})

// Select options schema
const selectOptionSchema = z.object({
  value: z.string(),
  label: z.string()
})

// Parameter configuration schema
const parameterConfigSchema = z.object({
  parameterName: z.string().min(1, 'Parameter name is required'),
  parameterPath: z.string().min(1, 'Parameter path is required'),
  fieldType: z.enum(['text', 'password', 'number', 'email', 'url', 'select', 'textarea', 'checkbox', 'date']),
  displayLabel: z.string().min(1, 'Display label is required'),
  helpText: z.string().optional(),
  defaultValue: z.string().optional(),
  isRequired: z.boolean().default(true),
  isSensitive: z.boolean().default(false),
  validationRules: validationRulesSchema.optional(),
  selectOptions: z.array(selectOptionSchema).optional(),
  order: z.number().min(1)
})

const formSchema = z.object({
  parameters: z.array(parameterConfigSchema)
})

type ParameterConfigFormData = z.infer<typeof formSchema>

interface DetectedParameter {
  name: string
  path: string
  currentValue?: any
  suggestedType: FieldType
  isRequired: boolean
}

interface ParameterConfigFormProps {
  detectedParameters: DetectedParameter[]
  onParametersConfigured: (parameters: ParameterConfigFormData['parameters']) => void
  onSave: () => void
  className?: string
}

export function ParameterConfigForm({
  detectedParameters,
  onParametersConfigured,
  onSave,
  className
}: ParameterConfigFormProps) {
  const [showValidationRules, setShowValidationRules] = useState<Record<string, boolean>>({})
  const [showSelectOptions, setShowSelectOptions] = useState<Record<string, boolean>>({})

  const form = useForm<ParameterConfigFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parameters: detectedParameters.map((param, index) => ({
        parameterName: param.name,
        parameterPath: param.path,
        fieldType: param.suggestedType,
        displayLabel: param.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        helpText: '',
        defaultValue: param.currentValue?.toString() || '',
        isRequired: param.isRequired,
        isSensitive: param.suggestedType === 'password' || param.name.toLowerCase().includes('key'),
        validationRules: undefined,
        selectOptions: param.suggestedType === 'select' ? [{ value: '', label: 'Select an option' }] : undefined,
        order: index + 1
      }))
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'parameters'
  })

  const watchedParameters = form.watch('parameters')

  useEffect(() => {
    onParametersConfigured(watchedParameters)
  }, [watchedParameters, onParametersConfigured])

  const addParameter = () => {
    const newOrder = fields.length + 1
    append({
      parameterName: '',
      parameterPath: '',
      fieldType: 'text',
      displayLabel: '',
      helpText: '',
      defaultValue: '',
      isRequired: true,
      isSensitive: false,
      validationRules: undefined,
      selectOptions: undefined,
      order: newOrder
    })
  }

  const toggleValidationRules = (index: number) => {
    const key = index.toString()
    setShowValidationRules(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleSelectOptions = (index: number) => {
    const key = index.toString()
    setShowSelectOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    form.handleSubmit((data) => {
      onSave()
    })()
  }

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Parameter Configuration</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParameter}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Parameter
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {fields.map((field, index) => (
                <Card key={field.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`parameters.${index}.parameterName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parameter Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., apiKey" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`parameters.${index}.parameterPath`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Parameter Path</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., nodes[0].parameters.apiKey" {...field} />
                              </FormControl>
                              <FormDescription>
                                JSON path to the parameter in the N8N workflow
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`parameters.${index}.displayLabel`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Label</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., API Key" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`parameters.${index}.helpText`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Help Text</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Instructions for users on how to fill this parameter"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Field Configuration */}
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`parameters.${index}.fieldType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Field Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select field type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {FIELD_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`parameters.${index}.defaultValue`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Value</FormLabel>
                              <FormControl>
                                <Input placeholder="Optional default value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center space-x-4">
                          <FormField
                            control={form.control}
                            name={`parameters.${index}.isRequired`}
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="rounded border-gray-300"
                                  />
                                </FormControl>
                                <FormLabel className="!mt-0">Required</FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`parameters.${index}.isSensitive`}
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="rounded border-gray-300"
                                  />
                                </FormControl>
                                <FormLabel className="!mt-0">Sensitive (encrypt)</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Validation Rules */}
                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => toggleValidationRules(index)}
                            className="w-full"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            {showValidationRules[index] ? 'Hide' : 'Show'} Validation Rules
                          </Button>

                          {showValidationRules[index] && (
                            <div className="space-y-2 p-3 border rounded-md bg-gray-50">
                              <FormField
                                control={form.control}
                                name={`parameters.${index}.validationRules.min`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Minimum Length/Value</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="e.g., 5" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`parameters.${index}.validationRules.max`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Maximum Length/Value</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="e.g., 100" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`parameters.${index}.validationRules.regex`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Regex Pattern</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., ^[A-Z0-9]+$" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>

                        {/* Select Options */}
                        {watchedParameters[index]?.fieldType === 'select' && (
                          <div className="space-y-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSelectOptions(index)}
                              className="w-full"
                            >
                              {showSelectOptions[index] ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                              {showSelectOptions[index] ? 'Hide' : 'Show'} Select Options
                            </Button>

                            {showSelectOptions[index] && (
                              <div className="space-y-2 p-3 border rounded-md bg-gray-50">
                                <Label>Select Options</Label>
                                <div className="space-y-2">
                                  {form.watch(`parameters.${index}.selectOptions`)?.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex space-x-2">
                                      <Input
                                        placeholder="Value"
                                        value={option.value}
                                        onChange={(e) => {
                                          const options = form.getValues(`parameters.${index}.selectOptions`) || []
                                          options[optionIndex] = { ...option, value: e.target.value }
                                          form.setValue(`parameters.${index}.selectOptions`, options)
                                        }}
                                      />
                                      <Input
                                        placeholder="Label"
                                        value={option.label}
                                        onChange={(e) => {
                                          const options = form.getValues(`parameters.${index}.selectOptions`) || []
                                          options[optionIndex] = { ...option, label: e.target.value }
                                          form.setValue(`parameters.${index}.selectOptions`, options)
                                        }}
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const options = form.getValues(`parameters.${index}.selectOptions`) || []
                                          options.splice(optionIndex, 1)
                                          form.setValue(`parameters.${index}.selectOptions`, options)
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const options = form.getValues(`parameters.${index}.selectOptions`) || []
                                      options.push({ value: '', label: '' })
                                      form.setValue(`parameters.${index}.selectOptions`, options)
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Option
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Parameter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button type="button" onClick={handleSave}>
                  Save Parameters
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
