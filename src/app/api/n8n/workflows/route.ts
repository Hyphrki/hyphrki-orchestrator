import { NextRequest, NextResponse } from 'next/server'
import { n8nService } from '@/services/n8nService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const workflow = await n8nService.createWorkflow(body)
    
    return NextResponse.json(workflow, { status: 201 })
  } catch (error) {
    console.error('Create N8N workflow error:', error)
    return NextResponse.json(
      { error: 'Failed to create workflow in N8N' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const workflowId = searchParams.get('id')
    
    if (workflowId) {
      // Get specific workflow
      const executions = await n8nService.getWorkflowExecutions(workflowId)
      return NextResponse.json({ executions })
    }
    
    // Get available nodes
    const nodes = await n8nService.getAvailableNodes()
    return NextResponse.json({ nodes })
  } catch (error) {
    console.error('Get N8N data error:', error)
    return NextResponse.json(
      { error: 'Failed to get N8N data' },
      { status: 500 }
    )
  }
}
