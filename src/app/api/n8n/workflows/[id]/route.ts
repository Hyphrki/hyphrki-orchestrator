import { NextRequest, NextResponse } from 'next/server'
import { n8nService } from '@/services/n8nService'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const workflow = await n8nService.updateWorkflow(id, body)
    return NextResponse.json(workflow)
  } catch (error) {
    console.error('Update N8N workflow error:', error)
    return NextResponse.json(
      { error: 'Failed to update workflow in N8N' },
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
    await n8nService.deleteWorkflow(id)
    
    return NextResponse.json({ message: 'Workflow deleted successfully' })
  } catch (error) {
    console.error('Delete N8N workflow error:', error)
    return NextResponse.json(
      { error: 'Failed to delete workflow from N8N' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { action } = await request.json()
    
    let workflow
    
    switch (action) {
      case 'activate':
        workflow = await n8nService.activateWorkflow(id)
        break
      case 'deactivate':
        workflow = await n8nService.deactivateWorkflow(id)
        break
      case 'test':
        const testData = await request.json()
        const execution = await n8nService.testWorkflow(id, testData)
        return NextResponse.json(execution)
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
    
    return NextResponse.json(workflow)
  } catch (error) {
    console.error('N8N workflow action error:', error)
    return NextResponse.json(
      { error: 'Failed to perform action on workflow' },
      { status: 500 }
    )
  }
}
