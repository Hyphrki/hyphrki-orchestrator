# Orchestrator Platform API Contracts

## Authentication & Authorization

### Authentication Endpoints

#### POST /api/v1/auth/login
**Description**: User login with email and password
**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```
**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "subscription_tier": "pro"
  }
}
```

#### POST /api/v1/auth/refresh
**Description**: Refresh access token using refresh token
**Request**:
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

#### POST /api/v1/auth/logout
**Description**: Logout user and invalidate tokens
**Request**: None
**Response**:
```json
{
  "message": "Successfully logged out"
}
```

## User Management

### User Endpoints

#### GET /api/v1/users/me
**Description**: Get current user profile
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "subscription_tier": "pro",
  "created_at": "2024-12-19T10:00:00Z",
  "last_login_at": "2024-12-19T09:30:00Z",
  "email_verified": true
}
```

#### PUT /api/v1/users/me
**Description**: Update current user profile
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "first_name": "John",
  "last_name": "Doe"
}
```
**Response**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "subscription_tier": "pro",
  "updated_at": "2024-12-19T10:30:00Z"
}
```

## Organization Management

### Organization Endpoints

#### GET /api/v1/organizations
**Description**: List user's organizations
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "organizations": [
    {
      "id": "uuid",
      "name": "Acme Corp",
      "slug": "acme-corp",
      "subscription_tier": "enterprise",
      "role": "owner",
      "created_at": "2024-12-19T10:00:00Z"
    }
  ]
}
```

#### POST /api/v1/organizations
**Description**: Create new organization
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "subscription_tier": "pro"
}
```
**Response**:
```json
{
  "id": "uuid",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "subscription_tier": "pro",
  "created_at": "2024-12-19T10:00:00Z"
}
```

#### GET /api/v1/organizations/{id}
**Description**: Get organization details
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "name": "Acme Corp",
  "slug": "acme-corp",
  "subscription_tier": "enterprise",
  "members": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "email": "user@example.com",
      "role": "owner",
      "joined_at": "2024-12-19T10:00:00Z"
    }
  ],
  "created_at": "2024-12-19T10:00:00Z"
}
```

## Agent Management

### Agent Endpoints

#### GET /api/v1/agents
**Description**: List user's agents
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `owner_type`: `user` | `organization`
- `framework`: `langgraph` | `agno` | `crewai` | `n8n`
- `status`: `draft` | `active` | `inactive` | `error`
- `page`: number (default: 1)
- `limit`: number (default: 20)
**Response**:
```json
{
  "agents": [
    {
      "id": "uuid",
      "name": "Customer Support Bot",
      "description": "AI agent for customer support",
      "owner_type": "user",
      "owner_id": "uuid",
      "framework": "langgraph",
      "agent_type": "visual",
      "status": "active",
      "version": "1.0.0",
      "created_at": "2024-12-19T10:00:00Z",
      "deployed_at": "2024-12-19T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

#### POST /api/v1/agents
**Description**: Create new agent
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "name": "Customer Support Bot",
  "description": "AI agent for customer support",
  "owner_type": "user",
  "framework": "langgraph",
  "agent_type": "visual"
}
```
**Response**:
```json
{
  "id": "uuid",
  "name": "Customer Support Bot",
  "description": "AI agent for customer support",
  "owner_type": "user",
  "owner_id": "uuid",
  "framework": "langgraph",
  "agent_type": "visual",
  "status": "draft",
  "version": "1.0.0",
  "created_at": "2024-12-19T10:00:00Z"
}
```

#### GET /api/v1/agents/{id}
**Description**: Get agent details
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "name": "Customer Support Bot",
  "description": "AI agent for customer support",
  "owner_type": "user",
  "owner_id": "uuid",
  "framework": "langgraph",
  "agent_type": "visual",
  "status": "active",
  "version": "1.0.0",
  "created_at": "2024-12-19T10:00:00Z",
  "deployed_at": "2024-12-19T10:30:00Z",
  "container_id": "container-uuid",
  "resource_limits": {
    "cpu": 4,
    "memory": 8192,
    "network_isolation": "shared"
  },
  "metadata": {
    "node_count": 15,
    "execution_time": "2.5s"
  }
}
```

#### PUT /api/v1/agents/{id}
**Description**: Update agent
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "name": "Updated Customer Support Bot",
  "description": "Updated AI agent for customer support"
}
```
**Response**:
```json
{
  "id": "uuid",
  "name": "Updated Customer Support Bot",
  "description": "Updated AI agent for customer support",
  "updated_at": "2024-12-19T11:00:00Z"
}
```

#### DELETE /api/v1/agents/{id}
**Description**: Delete agent
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "message": "Agent deleted successfully"
}
```

#### POST /api/v1/agents/{id}/deploy
**Description**: Deploy agent
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "status": "active",
  "container_id": "container-uuid",
  "deployed_at": "2024-12-19T10:30:00Z",
  "deployment_logs": [
    "Container created successfully",
    "Agent deployed and running"
  ]
}
```

#### POST /api/v1/agents/{id}/undeploy
**Description**: Undeploy agent
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "status": "inactive",
  "undeployed_at": "2024-12-19T11:00:00Z"
}
```

## Workflow Management

### Workflow Endpoints

#### GET /api/v1/agents/{agent_id}/workflows
**Description**: List agent workflows
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "workflows": [
    {
      "id": "uuid",
      "name": "Main Workflow",
      "description": "Primary customer support workflow",
      "workflow_type": "visual",
      "framework": "langgraph",
      "version": "1.0.0",
      "created_at": "2024-12-19T10:00:00Z",
      "is_active": true
    }
  ]
}
```

#### POST /api/v1/agents/{agent_id}/workflows
**Description**: Create new workflow
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "name": "Main Workflow",
  "description": "Primary customer support workflow",
  "workflow_data": {
    "nodes": [...],
    "edges": [...],
    "settings": {...}
  },
  "workflow_type": "visual",
  "framework": "langgraph"
}
```
**Response**:
```json
{
  "id": "uuid",
  "name": "Main Workflow",
  "description": "Primary customer support workflow",
  "workflow_data": {...},
  "workflow_type": "visual",
  "framework": "langgraph",
  "version": "1.0.0",
  "created_at": "2024-12-19T10:00:00Z",
  "is_active": true
}
```

#### GET /api/v1/workflows/{id}
**Description**: Get workflow details
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "agent_id": "uuid",
  "name": "Main Workflow",
  "description": "Primary customer support workflow",
  "workflow_data": {
    "nodes": [...],
    "edges": [...],
    "settings": {...}
  },
  "workflow_type": "visual",
  "framework": "langgraph",
  "version": "1.0.0",
  "created_at": "2024-12-19T10:00:00Z",
  "is_active": true
}
```

#### PUT /api/v1/workflows/{id}
**Description**: Update workflow
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "name": "Updated Main Workflow",
  "workflow_data": {
    "nodes": [...],
    "edges": [...],
    "settings": {...}
  }
}
```
**Response**:
```json
{
  "id": "uuid",
  "name": "Updated Main Workflow",
  "workflow_data": {...},
  "version": "1.1.0",
  "updated_at": "2024-12-19T11:00:00Z"
}
```

## Workflow Execution

### Execution Endpoints

#### POST /api/v1/workflows/{id}/execute
**Description**: Execute workflow
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "input_data": {
    "message": "Hello, I need help with my order",
    "user_id": "customer-uuid"
  },
  "execution_options": {
    "timeout": 30000,
    "retry_count": 3
  }
}
```
**Response**:
```json
{
  "execution_id": "uuid",
  "status": "running",
  "started_at": "2024-12-19T10:00:00Z",
  "correlation_id": "uuid"
}
```

#### GET /api/v1/executions/{id}
**Description**: Get execution status and results
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "id": "uuid",
  "workflow_id": "uuid",
  "agent_id": "uuid",
  "status": "completed",
  "started_at": "2024-12-19T10:00:00Z",
  "completed_at": "2024-12-19T10:02:30Z",
  "execution_data": {
    "input": {...},
    "output": {
      "response": "I'd be happy to help you with your order. Can you provide your order number?",
      "confidence": 0.95
    },
    "steps": [...]
  },
  "resource_usage": {
    "cpu_time": 2.5,
    "memory_peak": 512,
    "execution_time": 2.5
  },
  "correlation_id": "uuid"
}
```

#### GET /api/v1/executions
**Description**: List executions with filtering
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `workflow_id`: UUID
- `agent_id`: UUID
- `status`: `pending` | `running` | `completed` | `failed` | `cancelled`
- `start_date`: ISO date
- `end_date`: ISO date
- `page`: number (default: 1)
- `limit`: number (default: 20)
**Response**:
```json
{
  "executions": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Marketplace Integration

### Marketplace Endpoints

#### POST /api/v1/agents/{id}/publish
**Description**: Publish agent to marketplace
**Headers**: `Authorization: Bearer <token>`
**Request**:
```json
{
  "marketplace_name": "hyphrki",
  "pricing": {
    "type": "subscription",
    "amount": 29.99,
    "currency": "USD",
    "interval": "monthly"
  },
  "description": "AI-powered customer support agent",
  "tags": ["customer-support", "ai", "automation"]
}
```
**Response**:
```json
{
  "integration_id": "uuid",
  "marketplace_agent_id": "hyphrki-agent-uuid",
  "status": "published",
  "published_at": "2024-12-19T10:00:00Z",
  "marketplace_url": "https://hyphrki.com/agents/hyphrki-agent-uuid"
}
```

#### GET /api/v1/agents/{id}/marketplace
**Description**: Get agent marketplace integration status
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "integration_id": "uuid",
  "marketplace_name": "hyphrki",
  "marketplace_agent_id": "hyphrki-agent-uuid",
  "status": "published",
  "published_at": "2024-12-19T10:00:00Z",
  "usage_metrics": {
    "total_downloads": 150,
    "active_users": 45,
    "revenue": 1349.55
  }
}
```

#### POST /api/v1/agents/{id}/unpublish
**Description**: Unpublish agent from marketplace
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "integration_id": "uuid",
  "status": "unpublished",
  "unpublished_at": "2024-12-19T11:00:00Z"
}
```

## Container Management

### Container Endpoints

#### GET /api/v1/agents/{id}/container
**Description**: Get agent container status
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "container_id": "container-uuid",
  "status": "running",
  "resource_usage": {
    "cpu_percent": 45.2,
    "memory_usage": 1024,
    "memory_limit": 8192,
    "network_rx": 1024000,
    "network_tx": 512000
  },
  "health_status": "healthy",
  "last_health_check": "2024-12-19T10:00:00Z",
  "logs": [
    "Container started successfully",
    "Agent initialized",
    "Workflow loaded"
  ]
}
```

#### POST /api/v1/agents/{id}/container/restart
**Description**: Restart agent container
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "container_id": "container-uuid",
  "status": "restarting",
  "restarted_at": "2024-12-19T10:00:00Z"
}
```

#### GET /api/v1/agents/{id}/container/logs
**Description**: Get container logs
**Headers**: `Authorization: Bearer <token>`
**Query Parameters**:
- `since`: ISO timestamp
- `until`: ISO timestamp
- `tail`: number (default: 100)
**Response**:
```json
{
  "logs": [
    {
      "timestamp": "2024-12-19T10:00:00Z",
      "level": "INFO",
      "message": "Container started successfully",
      "source": "container"
    }
  ]
}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ],
    "timestamp": "2024-12-19T10:00:00Z",
    "correlation_id": "uuid"
  }
}
```

### Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `AUTHENTICATION_ERROR`: Authentication failed
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict
- `RATE_LIMIT_EXCEEDED`: Rate limit exceeded
- `INTERNAL_ERROR`: Internal server error
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable

## WebSocket Events

### Real-time Updates

#### Connection
```javascript
const ws = new WebSocket('wss://api.orchestrator.com/v1/ws');
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'bearer-token'
  }));
};
```

#### Event Types
```json
{
  "type": "execution_update",
  "data": {
    "execution_id": "uuid",
    "status": "running",
    "progress": 45,
    "current_step": "processing_request"
  }
}
```

```json
{
  "type": "agent_status_update",
  "data": {
    "agent_id": "uuid",
    "status": "active",
    "container_id": "container-uuid"
  }
}
```

```json
{
  "type": "marketplace_update",
  "data": {
    "agent_id": "uuid",
    "integration_id": "uuid",
    "status": "published",
    "usage_metrics": {...}
  }
}
```
