# User Portal API Contracts

## Overview
This document defines the API contracts for the user portal integration with the admin/orchestrator portal. The user portal will consume APIs from the shared backend while maintaining separate deployment and operation.

## Authentication APIs

### POST /api/auth/login
User authentication endpoint shared with admin portal.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "access_token": "jwt-token",
  "refresh_token": "refresh-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user",
    "organization_id": "org-uuid"
  },
  "expires_in": 3600
}
```

### POST /api/auth/refresh
Refresh JWT access token.

**Request:**
```json
{
  "refresh_token": "refresh-token"
}
```

**Response:**
```json
{
  "access_token": "new-jwt-token",
  "expires_in": 3600
}
```

## User Management APIs

### GET /api/users/profile
Get current user profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "avatar": "url",
  "organization": {
    "id": "org-uuid",
    "name": "Organization Name",
    "role": "member"
  },
  "preferences": {
    "theme": "light",
    "notifications": true
  },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

### PUT /api/users/profile
Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Updated Name",
  "preferences": {
    "theme": "dark",
    "notifications": false
  }
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Updated Name",
  "preferences": {
    "theme": "dark",
    "notifications": false
  },
  "updated_at": "2025-01-01T00:00:00Z"
}
```

## Agent Management APIs

### GET /api/users/agents
Get user's agents with status and configuration.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status` (optional): Filter by status (running, stopped, error)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "agents": [
    {
      "id": "agent-uuid",
      "name": "My Agent",
      "description": "Agent description",
      "status": "running",
      "framework": "langgraph",
      "version": "1.0.0",
      "last_execution": "2025-01-01T00:00:00Z",
      "usage_stats": {
        "executions_today": 15,
        "total_executions": 150,
        "avg_response_time": 2.3
      },
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

### POST /api/users/agents/{agent_id}/start
Start a user agent.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "agent_id": "agent-uuid",
  "status": "starting",
  "message": "Agent start initiated"
}
```

### POST /api/users/agents/{agent_id}/stop
Stop a user agent.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "agent_id": "agent-uuid",
  "status": "stopping",
  "message": "Agent stop initiated"
}
```

### GET /api/users/agents/{agent_id}/logs
Get agent execution logs.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `since` (optional): ISO8601 timestamp for log filtering
- `level` (optional): Log level filter (debug, info, warn, error)
- `limit` (optional): Maximum logs to return (default: 100)

**Response:**
```json
{
  "agent_id": "agent-uuid",
  "logs": [
    {
      "timestamp": "2025-01-01T00:00:00Z",
      "level": "info",
      "message": "Agent started successfully",
      "execution_id": "exec-uuid"
    }
  ]
}
```

## Marketplace APIs

### GET /api/marketplace/agents
Browse available agents in marketplace.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `category` (optional): Filter by category
- `framework` (optional): Filter by framework (langgraph, agno, crewai, n8n)
- `search` (optional): Search query
- `sort` (optional): Sort by (name, rating, downloads, updated)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "agents": [
    {
      "id": "marketplace-agent-uuid",
      "name": "Email Assistant",
      "description": "AI-powered email management agent",
      "framework": "langgraph",
      "version": "2.1.0",
      "author": "AI Solutions Inc",
      "rating": 4.5,
      "downloads": 1250,
      "pricing": {
        "type": "subscription",
        "price": 29.99,
        "currency": "USD",
        "period": "month"
      },
      "tags": ["email", "automation", "productivity"],
      "thumbnail": "url",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  },
  "categories": ["automation", "communication", "data-processing"]
}
```

### GET /api/marketplace/agents/{agent_id}
Get detailed agent information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "id": "marketplace-agent-uuid",
  "name": "Email Assistant",
  "description": "Comprehensive AI-powered email management agent",
  "framework": "langgraph",
  "version": "2.1.0",
  "author": {
    "name": "AI Solutions Inc",
    "verified": true
  },
  "rating": 4.5,
  "reviews_count": 89,
  "downloads": 1250,
  "pricing": {
    "type": "subscription",
    "price": 29.99,
    "currency": "USD",
    "period": "month",
    "trial_days": 14
  },
  "features": [
    "Email classification",
    "Auto-responses",
    "Priority detection",
    "Spam filtering"
  ],
  "requirements": {
    "min_instances": 1,
    "max_instances": 10,
    "supported_providers": ["openai", "anthropic"]
  },
  "screenshots": ["url1", "url2"],
  "documentation_url": "https://docs.example.com/agent",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

### POST /api/marketplace/agents/{agent_id}/install
Install agent from marketplace.

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "configuration": {
    "api_key": "user-api-key",
    "preferences": {
      "auto_start": true,
      "notification_settings": "email"
    }
  }
}
```

**Response:**
```json
{
  "installation_id": "install-uuid",
  "agent_id": "user-agent-uuid",
  "status": "installing",
  "estimated_completion": "2025-01-01T00:05:00Z",
  "message": "Agent installation started"
}
```

### GET /api/users/installations/{installation_id}
Check installation status.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "installation_id": "install-uuid",
  "agent_id": "user-agent-uuid",
  "status": "completed",
  "progress": 100,
  "agent": {
    "id": "user-agent-uuid",
    "name": "Email Assistant",
    "status": "stopped"
  },
  "completed_at": "2025-01-01T00:05:00Z"
}
```

## Workflow Execution APIs

### GET /api/users/workflows
Get user's workflow executions.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status` (optional): Filter by status (running, completed, failed)
- `agent_id` (optional): Filter by agent
- `date_from` (optional): Start date filter
- `date_to` (optional): End date filter
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "workflows": [
    {
      "id": "workflow-uuid",
      "agent_id": "agent-uuid",
      "agent_name": "Email Assistant",
      "status": "completed",
      "trigger": "manual",
      "input": {
        "email_subject": "Meeting Request",
        "email_body": "..."
      },
      "output": {
        "classification": "meeting_request",
        "suggested_response": "..."
      },
      "execution_time": 2.3,
      "started_at": "2025-01-01T00:00:00Z",
      "completed_at": "2025-01-01T00:00:02Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

### GET /api/users/workflows/{workflow_id}/details
Get detailed workflow execution information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "id": "workflow-uuid",
  "agent_id": "agent-uuid",
  "status": "completed",
  "steps": [
    {
      "id": "step-1",
      "name": "Email Analysis",
      "status": "completed",
      "input": {
        "email_subject": "Meeting Request",
        "email_body": "..."
      },
      "output": {
        "sentiment": "neutral",
        "urgency": "medium"
      },
      "execution_time": 0.8,
      "started_at": "2025-01-01T00:00:00Z",
      "completed_at": "2025-01-01T00:00:00Z"
    },
    {
      "id": "step-2",
      "name": "Response Generation",
      "status": "completed",
      "input": {
        "analysis": {...}
      },
      "output": {
        "response": "...",
        "confidence": 0.95
      },
      "execution_time": 1.5,
      "started_at": "2025-01-01T00:00:01Z",
      "completed_at": "2025-01-01T00:00:02Z"
    }
  ],
  "metrics": {
    "total_execution_time": 2.3,
    "total_tokens_used": 450,
    "cost": 0.012
  }
}
```

## Analytics and Billing APIs

### GET /api/users/analytics/usage
Get user usage analytics.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `period` (optional): Time period (day, week, month, year)
- `start_date` (optional): Start date
- `end_date` (optional): End date

**Response:**
```json
{
  "period": "month",
  "start_date": "2025-01-01",
  "end_date": "2025-01-31",
  "metrics": {
    "total_executions": 1250,
    "successful_executions": 1225,
    "failed_executions": 25,
    "avg_response_time": 2.1,
    "total_cost": 45.67,
    "agents_used": 5
  },
  "daily_breakdown": [
    {
      "date": "2025-01-01",
      "executions": 45,
      "cost": 1.23,
      "avg_response_time": 2.0
    }
  ]
}
```

### GET /api/users/billing/subscription
Get current subscription information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "subscription": {
    "id": "sub-uuid",
    "plan": "Pro",
    "status": "active",
    "current_period_start": "2025-01-01T00:00:00Z",
    "current_period_end": "2025-02-01T00:00:00Z",
    "cancel_at_period_end": false,
    "limits": {
      "monthly_executions": 50000,
      "concurrent_agents": 10,
      "storage_gb": 100
    }
  },
  "usage": {
    "executions_this_month": 1250,
    "executions_percentage": 2.5,
    "storage_used_gb": 15,
    "storage_percentage": 15
  }
}
```

### GET /api/users/billing/invoices
Get billing invoices.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status` (optional): Filter by status (paid, pending, failed)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "invoices": [
    {
      "id": "inv-uuid",
      "number": "INV-001",
      "status": "paid",
      "amount": 29.99,
      "currency": "USD",
      "period_start": "2025-01-01",
      "period_end": "2025-01-31",
      "paid_at": "2025-01-05T00:00:00Z",
      "download_url": "https://billing.example.com/invoice/inv-uuid"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "total_pages": 1
  }
}
```

## WebSocket Events

### Agent Status Updates
**Event: `agent:status`**
```json
{
  "agent_id": "agent-uuid",
  "status": "running",
  "timestamp": "2025-01-01T00:00:00Z",
  "metrics": {
    "cpu_usage": 45.2,
    "memory_usage": 67.8,
    "active_connections": 3
  }
}
```

### Workflow Execution Updates
**Event: `workflow:update`**
```json
{
  "workflow_id": "workflow-uuid",
  "status": "running",
  "current_step": "step-2",
  "progress": 60,
  "timestamp": "2025-01-01T00:00:00Z"
}
```

### Notifications
**Event: `notification:new`**
```json
{
  "id": "notif-uuid",
  "type": "agent_error",
  "title": "Agent Execution Failed",
  "message": "Email Assistant encountered an error processing request",
  "agent_id": "agent-uuid",
  "severity": "high",
  "timestamp": "2025-01-01T00:00:00Z",
  "actions": [
    {
      "label": "View Details",
      "url": "/agents/agent-uuid/logs"
    }
  ]
}
```

## Error Responses

All APIs follow consistent error response format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "request_id": "req-uuid",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

### Common Error Codes
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid request parameters
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server error
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable

## Rate Limiting

All user portal APIs implement rate limiting:
- **Authenticated requests**: 1000 requests per minute per user
- **Anonymous requests**: 100 requests per minute per IP
- **Installation requests**: 10 requests per minute per user

Rate limit headers included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1640995200
```

## Versioning

API versioning follows semantic versioning:
- **Current version**: v1
- **Endpoint format**: `/api/v1/resource`
- **Breaking changes**: New major version
- **Backward compatibility**: Maintained within major versions

## CORS Configuration

User portal implements proper CORS configuration:
- **Allowed origins**: Configurable per environment
- **Allowed methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed headers**: Content-Type, Authorization, X-Requested-With
- **Credentials**: Supported for authenticated requests

## Security Headers

All responses include security headers:
- `Content-Security-Policy`: Strict CSP policy
- `X-Frame-Options`: DENY
- `X-Content-Type-Options`: nosniff
- `X-XSS-Protection`: 1; mode=block
- `Strict-Transport-Security`: max-age=31536000

## Monitoring and Observability

### Metrics Collected
- Request count and latency by endpoint
- Error rates and types
- User authentication events
- Agent execution metrics
- WebSocket connection statistics

### Logging
- Structured JSON logs with correlation IDs
- Request/response logging (sensitive data redacted)
- Error stack traces with context
- User action audit logs

This API contract ensures the user portal can seamlessly integrate with the admin/orchestrator portal while maintaining independent operation and deployment capabilities.
