# User Portal Integration Data Model

## Overview
The user portal integration leverages the existing orchestrator database schema while adding user-specific views and access controls. This document describes the data model relationships and access patterns for the user portal.

## Shared Database Schema

The user portal uses the existing PostgreSQL database with row-level security (RLS) policies to ensure proper data isolation between users and organizations.

### Core Entities

#### Users Table (Existing)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url VARCHAR(500),
  auth_provider VARCHAR(50) DEFAULT 'auth0',
  auth_provider_id VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  organization_id UUID REFERENCES organizations(id),
  preferences JSONB DEFAULT '{}',
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY users_own_data ON users
  FOR ALL USING (auth.uid() = id);
```

#### Organizations Table (Existing)
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  subscription_plan VARCHAR(50) DEFAULT 'free',
  subscription_status VARCHAR(50) DEFAULT 'active',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY organizations_member_access ON organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM users WHERE auth.uid() = id
    )
  );
```

#### Agents Table (Existing - Extended for User Portal)
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  framework VARCHAR(50) NOT NULL, -- langgraph, agno, crewai, n8n
  version VARCHAR(50) NOT NULL,
  owner_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  status VARCHAR(50) DEFAULT 'stopped', -- running, stopped, error, starting, stopping
  configuration JSONB DEFAULT '{}',
  marketplace_agent_id UUID, -- Reference to marketplace catalog
  deployment_answers JSONB DEFAULT '{}', -- User answers to preconfigured questions during deployment
  instance_size VARCHAR(50) DEFAULT 'basic',
  resource_limits JSONB DEFAULT '{"cpu": "1", "memory": "2GB"}',
  last_execution_at TIMESTAMP WITH TIME ZONE,
  is_user_specific BOOLEAN DEFAULT true, -- Each deployment creates user-specific copy
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY agents_user_access ON agents
  FOR ALL USING (
    owner_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users WHERE auth.uid() = id
    )
  );
```

#### Workflows Table (Existing - Extended for User Portal)
```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'idle', -- idle, running, completed, failed, cancelled
  trigger_type VARCHAR(50) DEFAULT 'manual', -- manual, scheduled, webhook, event
  trigger_config JSONB DEFAULT '{}',
  workflow_definition JSONB NOT NULL, -- Node-based workflow structure
  execution_stats JSONB DEFAULT '{}',
  created_by UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY workflows_user_access ON workflows
  FOR ALL USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users WHERE auth.uid() = id
    )
  );
```

#### Workflow Executions Table (Existing - Extended for User Portal)
```sql
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, running, completed, failed, cancelled
  trigger_source VARCHAR(50), -- manual, scheduled, webhook, api
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  execution_steps JSONB DEFAULT '[]', -- Detailed step-by-step execution log
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  execution_time_seconds DECIMAL(10,3),
  resource_usage JSONB DEFAULT '{}', -- CPU, memory, tokens used
  cost_cents INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY executions_user_access ON workflow_executions
  FOR ALL USING (
    created_by = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM users WHERE auth.uid() = id
    )
  );

-- Performance indexes for user portal queries
CREATE INDEX idx_executions_user_date ON workflow_executions(created_by, created_at DESC);
CREATE INDEX idx_executions_status ON workflow_executions(status);
CREATE INDEX idx_executions_agent ON workflow_executions(agent_id);
```

### Marketplace Integration Tables

#### Marketplace Agents Table (New for User Portal)
```sql
CREATE TABLE marketplace_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  framework VARCHAR(50) NOT NULL,
  version VARCHAR(50) NOT NULL,
  author_id UUID REFERENCES users(id),
  author_name VARCHAR(255),
  author_verified BOOLEAN DEFAULT false,
  category VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  pricing_type VARCHAR(50) DEFAULT 'free', -- free, paid, subscription
  price_cents INTEGER,
  currency VARCHAR(3) DEFAULT 'USD',
  rating DECIMAL(3,2),
  reviews_count INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'published', -- draft, published, suspended
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Public read access for marketplace browsing
ALTER TABLE marketplace_agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY marketplace_public_read ON marketplace_agents
  FOR SELECT USING (status = 'published');
```

#### Agent Installations Table (New for User Portal)
```sql
CREATE TABLE agent_installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marketplace_agent_id UUID REFERENCES marketplace_agents(id),
  user_agent_id UUID REFERENCES agents(id),
  installed_by UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  status VARCHAR(50) DEFAULT 'installing', -- installing, completed, failed
  version VARCHAR(50),
  configuration JSONB DEFAULT '{}',
  installation_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  installation_completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY installations_user_access ON agent_installations
  FOR ALL USING (installed_by = auth.uid());
```

### Analytics and Billing Tables

#### Usage Metrics Table (New for User Portal)
```sql
CREATE TABLE usage_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  metric_type VARCHAR(100) NOT NULL, -- executions, tokens, cost, etc.
  metric_value DECIMAL(15,6) NOT NULL,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY metrics_user_access ON usage_metrics
  FOR SELECT USING (user_id = auth.uid());

-- Indexes for analytics queries
CREATE INDEX idx_usage_user_period ON usage_metrics(user_id, period_start, period_end);
CREATE INDEX idx_usage_type_period ON usage_metrics(metric_type, period_start);
```

#### Billing Records Table (New for User Portal)
```sql
CREATE TABLE billing_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  record_type VARCHAR(50) NOT NULL, -- subscription, usage, credit, refund
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  description TEXT,
  period_start DATE,
  period_end DATE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method_id VARCHAR(255),
  invoice_number VARCHAR(100),
  paid_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY billing_user_access ON billing_records
  FOR SELECT USING (user_id = auth.uid());
```

### Real-time Communication Tables

#### Notifications Table (New for User Portal)
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  type VARCHAR(100) NOT NULL, -- agent_error, workflow_complete, billing_alert, etc.
  title VARCHAR(255) NOT NULL,
  message TEXT,
  severity VARCHAR(50) DEFAULT 'info', -- info, warning, error, critical
  read_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  related_entity_type VARCHAR(50), -- agent, workflow, billing, etc.
  related_entity_id UUID,
  actions JSONB DEFAULT '[]', -- Action buttons with URLs
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal
CREATE POLICY notifications_user_access ON notifications
  FOR ALL USING (user_id = auth.uid());

-- Index for unread notifications
CREATE INDEX idx_notifications_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;
```

#### Data Exports Table (New for User Portal)
```sql
CREATE TABLE data_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  export_type VARCHAR(50) NOT NULL, -- usage_analytics, agent_data, billing_history, execution_logs
  format VARCHAR(20) NOT NULL, -- csv, pdf, json, xlsx
  status VARCHAR(50) DEFAULT 'processing', -- processing, completed, failed
  file_url VARCHAR(500),
  file_size_bytes INTEGER,
  record_count INTEGER,
  date_range_start DATE,
  date_range_end DATE,
  parameters JSONB DEFAULT '{}', -- Export configuration parameters
  error_message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policy for user portal
CREATE POLICY data_exports_user_access ON data_exports
  FOR ALL USING (user_id = auth.uid());
```

#### WebSocket Sessions Table (New for User Portal)
```sql
CREATE TABLE websocket_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255) NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  disconnected_at TIMESTAMP WITH TIME ZONE,
  last_ping TIMESTAMP WITH TIME ZONE,
  user_agent TEXT,
  ip_address INET,
  connection_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for user portal (admin access for monitoring)
CREATE POLICY websocket_sessions_user_access ON websocket_sessions
  FOR SELECT USING (user_id = auth.uid());
```

## User Portal Specific Views

### User Dashboard View
```sql
CREATE VIEW user_dashboard AS
SELECT
  u.id as user_id,
  u.name,
  u.email,
  u.avatar_url,
  o.name as organization_name,
  o.subscription_plan,
  COUNT(DISTINCT a.id) as total_agents,
  COUNT(DISTINCT CASE WHEN a.status = 'running' THEN a.id END) as running_agents,
  COUNT(DISTINCT we.id) as total_executions_today,
  COALESCE(SUM(we.cost_cents), 0) as cost_today_cents,
  AVG(we.execution_time_seconds) as avg_execution_time,
  COUNT(DISTINCT n.id) as unread_notifications
FROM users u
LEFT JOIN organizations o ON u.organization_id = o.id
LEFT JOIN agents a ON (a.owner_id = u.id OR a.organization_id = u.organization_id)
LEFT JOIN workflow_executions we ON we.created_by = u.id
  AND DATE(we.created_at) = CURRENT_DATE
LEFT JOIN notifications n ON n.user_id = u.id AND n.read_at IS NULL
WHERE u.id = auth.uid()
GROUP BY u.id, u.name, u.email, u.avatar_url, o.name, o.subscription_plan;
```

### Agent Status View
```sql
CREATE VIEW user_agent_status AS
SELECT
  a.id,
  a.name,
  a.description,
  a.framework,
  a.version,
  a.status,
  a.instance_size,
  a.last_execution_at,
  COUNT(we.id) as executions_today,
  COUNT(CASE WHEN we.status = 'completed' THEN 1 END) as successful_executions_today,
  COUNT(CASE WHEN we.status = 'failed' THEN 1 END) as failed_executions_today,
  AVG(we.execution_time_seconds) as avg_execution_time,
  SUM(we.cost_cents) as cost_today_cents,
  MAX(we.created_at) as last_execution_at_today
FROM agents a
LEFT JOIN workflow_executions we ON we.agent_id = a.id
  AND DATE(we.created_at) = CURRENT_DATE
WHERE a.owner_id = auth.uid() OR a.organization_id IN (
  SELECT organization_id FROM users WHERE id = auth.uid()
)
GROUP BY a.id, a.name, a.description, a.framework, a.version,
         a.status, a.instance_size, a.last_execution_at;
```

### Usage Analytics View
```sql
CREATE VIEW user_usage_analytics AS
SELECT
  DATE_TRUNC('day', created_at) as date,
  metric_type,
  SUM(metric_value) as total_value,
  AVG(metric_value) as avg_value,
  MIN(metric_value) as min_value,
  MAX(metric_value) as max_value,
  COUNT(*) as count
FROM usage_metrics
WHERE user_id = auth.uid()
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at), metric_type
ORDER BY date DESC, metric_type;
```

## Data Access Patterns

### User Portal Read Patterns
1. **Dashboard Loading**: Single query to `user_dashboard` view
2. **Agent Listing**: Query `user_agent_status` view with pagination
3. **Workflow History**: Join `workflows` and `workflow_executions` with user filter
4. **Marketplace Browsing**: Public read access to `marketplace_agents`
5. **Usage Analytics**: Query `user_usage_analytics` view

### User Portal Write Patterns
1. **Profile Updates**: Direct update to `users` table with RLS
2. **Agent Configuration**: Update `agents` table with ownership validation
3. **Installation Requests**: Insert into `agent_installations` table
4. **Notification Management**: Update `notifications.read_at` timestamp

### Real-time Update Patterns
1. **Agent Status Changes**: WebSocket broadcast on `agents.status` updates
2. **Workflow Execution Progress**: WebSocket updates during execution
3. **Notification Delivery**: WebSocket push for new notifications
4. **Usage Metric Updates**: Periodic aggregation into `usage_metrics`

## Security Considerations

### Row Level Security (RLS)
- All tables implement RLS policies
- User data isolation enforced at database level
- Organization-level access for team features
- Public read access for marketplace data

### Data Encryption
- Sensitive configuration data encrypted at rest
- JWT tokens properly validated
- API keys hashed and salted
- Audit logging for all data access

### Access Control
- JWT-based authentication
- Role-based permissions (user, admin, organization_owner)
- Resource ownership validation
- API rate limiting per user

## Performance Optimizations

### Indexes
- Composite indexes on frequently queried columns
- Partial indexes for status-based queries
- JSONB indexes for metadata searches
- Date-based indexes for time-range queries

### Caching Strategy
- Redis caching for frequently accessed data
- View result caching for dashboard queries
- CDN caching for static marketplace assets
- Application-level caching for API responses

### Query Optimization
- Efficient view definitions with proper joins
- Pagination for large result sets
- Selective field retrieval
- Query result caching

This data model ensures the user portal can efficiently access shared data while maintaining security, performance, and scalability requirements.
