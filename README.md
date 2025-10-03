# Hyphrki Orchestrator

Hyphrki Orchestrator is a powerful workflow automation and agent orchestration platform built on N8N v1.17.0, customized for the Hyphrki platform.

## Features

- **Workflow Automation**: Full N8N workflow automation capabilities
- **Agent Deployment**: Deploy workflows as agents with REST API
- **Multi-tenancy**: Organization-based isolation with PostgreSQL schemas
- **Authentication**: JWT-based authentication integrated with hyphrki-app
- **Admin Dashboard**: Administrative endpoints for platform management
- **Role-based Access**: User roles (admin, manager, user, viewer) with appropriate permissions

## Architecture

The orchestrator runs N8N directly (not as a wrapper) with custom middleware:

- **hyphrki-auth**: Validates JWT tokens and fetches user data from hyphrki-app database
- **Agent Deployment Service**: Manages agent lifecycle (deploy, stop, restart, delete)
- **Admin Controller**: Provides admin-only endpoints for platform monitoring

### Database Schema

- `public` schema: Hyphrki app data (users, organizations, agents)
- `n8n` schema: N8N workflow data (workflows, executions, credentials)

## API Endpoints

### Agents API

- `POST /rest/agents` - Deploy a new agent from a workflow
- `GET /rest/agents` - List all agents for authenticated user
- `PATCH /rest/agents/:agentId/stop` - Stop an agent
- `PATCH /rest/agents/:agentId/restart` - Restart an agent
- `DELETE /rest/agents/:agentId` - Delete an agent

### Admin API (Admin only)

- `GET /rest/admin/stats` - Platform statistics
- `GET /rest/admin/users` - List all users
- `GET /rest/admin/organizations` - List all organizations
- `GET /rest/admin/agents` - List all agents across organizations
- `GET /rest/admin/health` - System health check

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Shared with hyphrki-app for token validation
- `N8N_PORT` - Port to run on (default: 5678)

Optional:
- `DB_POSTGRESDB_SCHEMA` - N8N schema name (default: n8n)
- `N8N_ENCRYPTION_KEY` - Encryption key for credentials

## Development

```bash
# Install dependencies
cd n8n && pnpm install

# Build
pnpm build

# Start in development
pnpm dev
```

## Deployment

The orchestrator is deployed using Docker to DigitalOcean App Platform:

```bash
# Build and deploy
docker build -t hyphrki-orchestrator .
doctl apps create-deployment <app-id>
```

## Integration with hyphrki-app

The orchestrator integrates with hyphrki-app through:

1. **Shared Database**: Both use the same PostgreSQL instance with different schemas
2. **JWT Authentication**: Validates tokens issued by hyphrki-app
3. **User Context**: Fetches user and organization data for request context
4. **Agent Records**: Stores agent metadata in hyphrki-app's public schema

## Version

Based on N8N v1.17.0

## License

SEE LICENSE IN LICENSE.md