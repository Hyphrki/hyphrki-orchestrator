# Orchestrator Platform Data Model

## Database Schema Design

### Core Entities

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  subscription_tier VARCHAR(20) NOT NULL CHECK (subscription_tier IN ('basic', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false
);
```

#### Organizations
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  subscription_tier VARCHAR(20) NOT NULL CHECK (subscription_tier IN ('basic', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);
```

#### Organization Members
```sql
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);
```

#### Agents
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_type VARCHAR(20) NOT NULL CHECK (owner_type IN ('user', 'organization')),
  owner_id UUID NOT NULL,
  framework VARCHAR(50) NOT NULL CHECK (framework IN ('langgraph', 'agno', 'crewai', 'n8n')),
  agent_type VARCHAR(20) NOT NULL CHECK (agent_type IN ('visual', 'code')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'active', 'inactive', 'error')),
  version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deployed_at TIMESTAMP WITH TIME ZONE,
  container_id VARCHAR(255),
  resource_limits JSONB,
  metadata JSONB,
  CONSTRAINT fk_agent_owner CHECK (
    (owner_type = 'user' AND owner_id IN (SELECT id FROM users)) OR
    (owner_type = 'organization' AND owner_id IN (SELECT id FROM organizations))
  )
);
```

#### Workflows
```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  workflow_data JSONB NOT NULL,
  workflow_type VARCHAR(20) NOT NULL CHECK (workflow_type IN ('visual', 'code')),
  framework VARCHAR(50) NOT NULL CHECK (framework IN ('langgraph', 'agno', 'crewai', 'n8n')),
  version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);
```

#### Workflow Executions
```sql
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('queued', 'pending', 'running', 'paused', 'completed', 'failed', 'cancelled', 'timeout')),
  status_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  paused_at TIMESTAMP WITH TIME ZONE,
  resumed_at TIMESTAMP WITH TIME ZONE,
  execution_data JSONB,
  execution_logs JSONB,
  error_message TEXT,
  error_code VARCHAR(50),
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  resource_usage JSONB,
  performance_metrics JSONB,
  correlation_id UUID NOT NULL,
  parent_execution_id UUID REFERENCES workflow_executions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX idx_workflow_executions_agent_status ON workflow_executions(agent_id, status);
CREATE INDEX idx_workflow_executions_correlation ON workflow_executions(correlation_id);
CREATE INDEX idx_workflow_executions_started ON workflow_executions(started_at);
```

**Execution State Transitions:**
- `queued` → `pending` → `running` → `completed`/`failed`/`timeout`
- `running` → `paused` → `running` (resume capability)
- Any state → `cancelled` (user-initiated cancellation)
- State transition validation prevents invalid transitions

**Execution Recovery States:**
- `failed` executions can be retried up to `max_retries`
- `timeout` executions trigger cleanup and resource release
- `paused` executions maintain state for resumption
- Failed executions store detailed error information for debugging

#### Marketplace Integrations
```sql
CREATE TABLE marketplace_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  marketplace_name VARCHAR(50) NOT NULL DEFAULT 'hyphrki',
  marketplace_agent_id VARCHAR(255),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'published', 'unpublished', 'error')),
  published_at TIMESTAMP WITH TIME ZONE,
  unpublished_at TIMESTAMP WITH TIME ZONE,
  usage_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Container Resources
```sql
CREATE TABLE container_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  subscription_tier VARCHAR(20) NOT NULL CHECK (subscription_tier IN ('basic', 'pro', 'enterprise')),
  cpu_limit INTEGER NOT NULL,
  memory_limit_mb INTEGER NOT NULL,
  network_isolation VARCHAR(20) NOT NULL CHECK (network_isolation IN ('shared', 'isolated')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes for Performance

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Organization indexes
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_subscription_tier ON organizations(subscription_tier);

-- Organization members indexes
CREATE INDEX idx_org_members_org_id ON organization_members(organization_id);
CREATE INDEX idx_org_members_user_id ON organization_members(user_id);

-- Agent indexes
CREATE INDEX idx_agents_owner ON agents(owner_type, owner_id);
CREATE INDEX idx_agents_framework ON agents(framework);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_created_at ON agents(created_at);

-- Workflow indexes
CREATE INDEX idx_workflows_agent_id ON workflows(agent_id);
CREATE INDEX idx_workflows_framework ON workflows(framework);
CREATE INDEX idx_workflows_active ON workflows(is_active);

-- Workflow execution indexes
CREATE INDEX idx_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX idx_executions_agent_id ON workflow_executions(agent_id);
CREATE INDEX idx_executions_status ON workflow_executions(status);
CREATE INDEX idx_executions_started_at ON workflow_executions(started_at);
CREATE INDEX idx_executions_correlation_id ON workflow_executions(correlation_id);

-- Marketplace integration indexes
CREATE INDEX idx_marketplace_agent_id ON marketplace_integrations(agent_id);
CREATE INDEX idx_marketplace_status ON marketplace_integrations(status);

-- Container resource indexes
CREATE INDEX idx_container_resources_agent_id ON container_resources(agent_id);
CREATE INDEX idx_container_resources_tier ON container_resources(subscription_tier);
```

### Row-Level Security (RLS)

#### Users Table RLS
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_own_data ON users
  FOR ALL TO authenticated
  USING (id = auth.uid());
```

#### Organizations Table RLS
```sql
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY org_members_access ON organizations
  FOR ALL TO authenticated
  USING (
    id IN (
      SELECT organization_id 
      FROM organization_members 
      WHERE user_id = auth.uid()
    )
  );
```

#### Agents Table RLS
```sql
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY agents_owner_access ON agents
  FOR ALL TO authenticated
  USING (
    (owner_type = 'user' AND owner_id = auth.uid()) OR
    (owner_type = 'organization' AND owner_id IN (
      SELECT organization_id 
      FROM organization_members 
      WHERE user_id = auth.uid()
    ))
  );
```

#### Workflows Table RLS
```sql
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY workflows_agent_access ON workflows
  FOR ALL TO authenticated
  USING (
    agent_id IN (
      SELECT id FROM agents WHERE
        (owner_type = 'user' AND owner_id = auth.uid()) OR
        (owner_type = 'organization' AND owner_id IN (
          SELECT organization_id 
          FROM organization_members 
          WHERE user_id = auth.uid()
        ))
    )
  );
```

#### Workflow Executions Table RLS
```sql
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY executions_workflow_access ON workflow_executions
  FOR ALL TO authenticated
  USING (
    workflow_id IN (
      SELECT w.id FROM workflows w
      JOIN agents a ON w.agent_id = a.id
      WHERE 
        (a.owner_type = 'user' AND a.owner_id = auth.uid()) OR
        (a.owner_type = 'organization' AND a.owner_id IN (
          SELECT organization_id 
          FROM organization_members 
          WHERE user_id = auth.uid()
        ))
    )
  );
```

### Data Relationships

#### Entity Relationship Diagram
```
Users (1) ←→ (M) Organization Members (M) ←→ (1) Organizations
Users (1) ←→ (M) Agents [owner_type='user']
Organizations (1) ←→ (M) Agents [owner_type='organization']
Agents (1) ←→ (M) Workflows
Workflows (1) ←→ (M) Workflow Executions
Agents (1) ←→ (1) Marketplace Integrations
Agents (1) ←→ (1) Container Resources
```

#### Key Relationships
1. **User-Organization**: Many-to-many through organization_members
2. **User-Agent**: One-to-many (direct ownership)
3. **Organization-Agent**: One-to-many (organization ownership)
4. **Agent-Workflow**: One-to-many (versioning support)
5. **Workflow-Execution**: One-to-many (execution history)
6. **Agent-Marketplace**: One-to-one (marketplace integration)
7. **Agent-Container**: One-to-one (resource allocation)

### Data Validation Rules

#### Business Rules
1. **Subscription Tiers**: Basic, Pro, Enterprise with specific resource limits
2. **Agent Ownership**: Either user or organization, not both
3. **Workflow Versioning**: Incremental versioning with semantic versioning
4. **Execution Correlation**: Each execution must have a unique correlation ID
5. **Resource Limits**: Must match subscription tier constraints

#### Constraint Examples
```sql
-- Ensure resource limits match subscription tier
ALTER TABLE container_resources 
ADD CONSTRAINT check_resource_limits 
CHECK (
  (subscription_tier = 'basic' AND cpu_limit = 1 AND memory_limit_mb = 2048) OR
  (subscription_tier = 'pro' AND cpu_limit = 4 AND memory_limit_mb = 8192) OR
  (subscription_tier = 'enterprise' AND cpu_limit = 16 AND memory_limit_mb = 32768)
);

-- Ensure network isolation matches subscription tier
ALTER TABLE container_resources 
ADD CONSTRAINT check_network_isolation 
CHECK (
  (subscription_tier = 'enterprise' AND network_isolation = 'isolated') OR
  (subscription_tier IN ('basic', 'pro') AND network_isolation = 'shared')
);
```

### Migration Strategy

#### Phase 1: Core Tables
1. Users, Organizations, Organization Members
2. Basic authentication and authorization
3. Row-level security policies

#### Phase 2: Agent Management
1. Agents, Workflows tables
2. Agent ownership and permissions
3. Workflow versioning

#### Phase 3: Execution & Integration
1. Workflow Executions, Marketplace Integrations
2. Container Resources
3. Performance indexes

#### Phase 4: Optimization
1. Additional indexes for performance
2. Data partitioning for large tables
3. Archival strategies for execution history

### Data Archival Strategy

#### Execution History
- **Retention**: 90 days for completed executions
- **Archival**: Move to cold storage after 30 days
- **Cleanup**: Delete after 90 days

#### Agent Versions
- **Retention**: Keep last 10 versions per agent
- **Archival**: Move older versions to cold storage
- **Cleanup**: Delete versions older than 1 year

#### Audit Logs
- **Retention**: 1 year for audit logs
- **Archival**: Move to cold storage after 6 months
- **Cleanup**: Delete after 1 year

### Backup Strategy

#### Database Backups
- **Frequency**: Daily full backups, hourly incremental
- **Retention**: 30 days for full backups, 7 days for incremental
- **Testing**: Monthly restore testing
- **Encryption**: AES-256 encryption for all backups

#### Point-in-Time Recovery
- **WAL Archiving**: Continuous WAL archiving
- **Recovery Time**: < 1 hour for point-in-time recovery
- **Testing**: Quarterly disaster recovery testing
