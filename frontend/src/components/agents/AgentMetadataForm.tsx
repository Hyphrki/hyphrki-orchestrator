import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { cn } from '@/utils/cn'

// Pricing tier options
const PRICING_TIERS = [
  { value: 'free', label: 'Free' },
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' }
] as const

// Category options
const CATEGORIES = [
  { value: 'automation', label: 'Automation' },
  { value: 'data-processing', label: 'Data Processing' },
  { value: 'integration', label: 'Integration' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'communication', label: 'Communication' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'development', label: 'Development' },
  { value: 'other', label: 'Other' }
] as const

// Agent metadata schema
const agentMetadataSchema = z.object({
  name: z.string().min(1, 'Agent name is required').max(255, 'Name must be less than 255 characters'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be less than 2000 characters'),
  category: z.enum(['automation', 'data-processing', 'integration', 'marketing', 'analytics', 'communication', 'productivity', 'development', 'other']),
  tags: z.array(z.string()).optional(),
  pricingTier: z.enum(['free', 'basic', 'pro', 'enterprise']),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must follow semantic versioning (e.g., 1.0.0)')
})

type AgentMetadataFormData = z.infer<typeof agentMetadataSchema>

interface AgentMetadataFormProps {
  onMetadataChanged: (metadata: AgentMetadataFormData) => void
  onSave: () => void
  className?: string
}

export function AgentMetadataForm({
  onMetadataChanged,
  onSave,
  className
}: AgentMetadataFormProps) {
  const form = useForm<AgentMetadataFormData>({
    resolver: zodResolver(agentMetadataSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'automation',
      tags: [],
      pricingTier: 'free',
      version: '1.0.0'
    }
  })

  const watchedMetadata = form.watch()

  React.useEffect(() => {
    onMetadataChanged(watchedMetadata)
  }, [watchedMetadata, onMetadataChanged])

  const handleSave = () => {
    form.handleSubmit((data) => {
      onSave()
    })()
  }

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
    form.setValue('tags', tags)
  }

  const getTagsValue = () => {
    return form.getValues('tags')?.join(', ') || ''
  }

  return (
    <div className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle>Agent Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Email Newsletter Generator" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear, descriptive name for your agent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Version</FormLabel>
                      <FormControl>
                        <Input placeholder="1.0.0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Semantic version (e.g., 1.0.0)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this agent does, its capabilities, and use cases..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a comprehensive description of the agent's functionality
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category and Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the most appropriate category for your agent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricingTier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing Tier</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing tier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRICING_TIERS.map((tier) => (
                            <SelectItem key={tier.value} value={tier.value}>
                              {tier.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Required subscription tier to deploy this agent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., email, newsletter, automation, marketing"
                        value={getTagsValue()}
                        onChange={(e) => handleTagsChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Comma-separated tags for searchability and filtering
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing Tier Information */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-900 mb-2">Pricing Tier Information</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Free:</strong> Available to all users</p>
                  <p><strong>Basic:</strong> Requires Basic subscription or higher</p>
                  <p><strong>Pro:</strong> Requires Pro subscription or higher</p>
                  <p><strong>Enterprise:</strong> Requires Enterprise subscription</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={handleSave}>
                  Save Metadata
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
