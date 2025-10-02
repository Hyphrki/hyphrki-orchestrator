import { NextRequest, NextResponse } from 'next/server'

// Mock data - in production this would come from your database
const mockTemplates = [
  {
    id: "1",
    name: "Lead Qualification Agent",
    description: "Automatically qualifies leads based on predefined criteria and scoring algorithms",
    category: "sales",
    status: "published",
    version: "2.1.0",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:22:00Z",
    instance_count: 45,
    is_public: true,
    is_premium: false,
    price: 0,
    currency: "USD",
    configuration_schema: {
      required_fields: [
        {
          name: "salesforce_api_key",
          type: "password",
          label: "Salesforce API Key",
          description: "Your Salesforce API key for lead management",
          required: true,
          encrypted: true
        }
      ]
    },
    workflow_definition: {
      nodes: [],
      connections: []
    }
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const template = mockTemplates.find(t => t.id === id)

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error('Get template error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const templateIndex = mockTemplates.findIndex(t => t.id === id)
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Update template
    const updatedTemplate = {
      ...mockTemplates[templateIndex],
      ...body,
      id, // Ensure ID doesn't change
      updated_at: new Date().toISOString()
    }

    mockTemplates[templateIndex] = updatedTemplate

    return NextResponse.json(updatedTemplate)
  } catch (error) {
    console.error('Update template error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const templateIndex = mockTemplates.findIndex(t => t.id === id)
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    // Remove template
    mockTemplates.splice(templateIndex, 1)

    return NextResponse.json({ message: 'Template deleted successfully' })
  } catch (error) {
    console.error('Delete template error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
