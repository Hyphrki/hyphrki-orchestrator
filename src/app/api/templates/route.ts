import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

// Mock data for fallback - will be replaced by database queries
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
        },
        {
          name: "email_server",
          type: "email",
          label: "Email Server",
          description: "SMTP server for sending notifications",
          required: true,
          encrypted: false
        }
      ]
    },
    workflow_definition: {
      nodes: [
        {
          id: "1",
          type: "n8n-nodes-base.webhook",
          name: "Lead Webhook",
          parameters: {}
        },
        {
          id: "2",
          type: "n8n-nodes-base.salesforce",
          name: "Check Lead",
          parameters: {
            operation: "get",
            resource: "Lead"
          }
        }
      ],
      connections: [
        {
          source: "1",
          target: "2"
        }
      ]
    }
  },
  {
    id: "2",
    name: "Customer Support Bot",
    description: "Handles customer inquiries, provides instant responses, and escalates complex issues",
    category: "support",
    status: "published",
    version: "1.3.2",
    created_at: "2024-01-10T09:15:00Z",
    updated_at: "2024-01-18T16:45:00Z",
    instance_count: 78,
    is_public: true,
    is_premium: true,
    price: 29.99,
    currency: "USD",
    configuration_schema: {
      required_fields: [
        {
          name: "openai_api_key",
          type: "password",
          label: "OpenAI API Key",
          description: "API key for GPT integration",
          required: true,
          encrypted: true
        },
        {
          name: "support_email",
          type: "email",
          label: "Support Email",
          description: "Email address for support inquiries",
          required: true,
          encrypted: false
        }
      ]
    },
    workflow_definition: {
      nodes: [
        {
          id: "1",
          type: "n8n-nodes-base.webhook",
          name: "Support Webhook",
          parameters: {}
        },
        {
          id: "2",
          type: "n8n-nodes-base.openai",
          name: "Generate Response",
          parameters: {
            model: "gpt-3.5-turbo",
            prompt: "Respond to customer support inquiry"
          }
        }
      ],
      connections: [
        {
          source: "1",
          target: "2"
        }
      ]
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const category = searchParams.get('category') || ''

    // Build dynamic query
    let query = `
      SELECT 
        id,
        name,
        description,
        category,
        status,
        version,
        created_at,
        updated_at,
        workflow_definition,
        configuration_schema,
        execution_modes,
        billing_model,
        created_by,
        metadata
      FROM agent_templates 
      WHERE 1=1
    `
    const params: unknown[] = []
    let paramCount = 0

    if (search) {
      paramCount++
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`
      params.push(`%${search}%`)
    }

    if (status) {
      paramCount++
      query += ` AND status = $${paramCount}`
      params.push(status)
    }

    if (category) {
      paramCount++
      query += ` AND category = $${paramCount}`
      params.push(category)
    }

    // Add pagination
    const offset = (page - 1) * limit
    paramCount++
    query += ` ORDER BY created_at DESC LIMIT $${paramCount}`
    params.push(limit)
    
    paramCount++
    query += ` OFFSET $${paramCount}`
    params.push(offset)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total FROM agent_templates WHERE 1=1
    `
    const countParams: unknown[] = []
    let countParamCount = 0

    if (search) {
      countParamCount++
      countQuery += ` AND (name ILIKE $${countParamCount} OR description ILIKE $${countParamCount})`
      countParams.push(`%${search}%`)
    }

    if (status) {
      countParamCount++
      countQuery += ` AND status = $${countParamCount}`
      countParams.push(status)
    }

    if (category) {
      countParamCount++
      countQuery += ` AND category = $${countParamCount}`
      countParams.push(category)
    }

    try {
      const [templatesResult, countResult] = await Promise.all([
        db.query(query, params),
        db.query(countQuery, countParams)
      ])

      const total = parseInt(countResult.rows[0].total)
      
      return NextResponse.json({
        templates: templatesResult.rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (dbError) {
      console.error('Database error, falling back to mock data:', dbError)
      // Fallback to mock data if database is not available
      let filteredTemplates = mockTemplates

      if (search) {
        filteredTemplates = filteredTemplates.filter(template =>
          template.name.toLowerCase().includes(search.toLowerCase()) ||
          template.description.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (status) {
        filteredTemplates = filteredTemplates.filter(template => template.status === status)
      }

      if (category) {
        filteredTemplates = filteredTemplates.filter(template => template.category === category)
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex)

      return NextResponse.json({
        templates: paginatedTemplates,
        pagination: {
          page,
          limit,
          total: filteredTemplates.length,
          pages: Math.ceil(filteredTemplates.length / limit)
        }
      })
    }
  } catch (error) {
    console.error('Get templates error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      category,
      version = "1.0.0",
      isPublic = false,
      isPremium = false,
      price = 0,
      currency = "USD",
      configurationSchema,
      workflowDefinition,
      executionModes = ['api'],
      billingModel = 'usage_based',
      createdBy = 'admin'
    } = body

    // Validate required fields
    if (!name || !description || !category) {
      return NextResponse.json(
        { error: 'Name, description, and category are required' },
        { status: 400 }
      )
    }

    try {
      // Get admin user ID for created_by field
      let adminUserId = createdBy
      if (createdBy === 'admin' || !createdBy) {
        const adminUser = await db.query(
          'SELECT id FROM users WHERE email = $1',
          ['admin@hyphrki.com']
        )
        adminUserId = adminUser.rows[0]?.id || null
      }

      // Create new template in database
      const result = await db.query(`
        INSERT INTO agent_templates (
          name,
          description,
          category,
          workflow_definition,
          configuration_schema,
          execution_modes,
          billing_model,
          status,
          version,
          created_by,
          metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `, [
        name,
        description,
        category,
        JSON.stringify(workflowDefinition || { nodes: [], connections: [] }),
        JSON.stringify(configurationSchema || { required_fields: [] }),
        JSON.stringify(executionModes),
        billingModel,
        'draft',
        version,
        adminUserId,
        JSON.stringify({
          is_public: isPublic,
          is_premium: isPremium,
          price,
          currency,
          instance_count: 0
        })
      ])

      return NextResponse.json(result.rows[0], { status: 201 })
    } catch (dbError) {
      console.error('Database error, falling back to mock data:', dbError)
      // Fallback to mock data if database is not available
      const newTemplate = {
        id: (mockTemplates.length + 1).toString(),
        name,
        description,
        category,
        status: "draft",
        version,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        instance_count: 0,
        is_public: isPublic,
        is_premium: isPremium,
        price,
        currency,
        configuration_schema: configurationSchema || { required_fields: [] },
        workflow_definition: workflowDefinition || { nodes: [], connections: [] }
      }

      mockTemplates.push(newTemplate)
      return NextResponse.json(newTemplate, { status: 201 })
    }
  } catch (error) {
    console.error('Create template error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
