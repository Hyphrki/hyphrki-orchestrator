# Orchestrator Platform Quickstart Guide

## Overview
The Orchestrator Platform is a multi-tenant system for creating, deploying, and managing AI agents. This guide will help you get started with the platform quickly.

## Prerequisites
- Node.js 18+ (LTS)
- Docker and Docker Compose
- PostgreSQL 14+
- Redis 6+
- Git

## Local Development Setup

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/your-org/orchestrator.git
cd orchestrator

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env
```

### 2. Environment Configuration
```bash
# .env file configuration
DATABASE_URL="postgresql://user:password@localhost:5432/orchestrator"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret"
AUTH0_DOMAIN="your-auth0-domain"
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"
HYPHRKI_WS_URL="wss://hyphrki.com/ws"
HYPHRKI_API_URL="https://hyphrki.com/api"
```

### 3. Database Setup
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Run database migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 4. Start Development Services
```bash
# Start all services
docker-compose up -d

# Start the application
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/docs

## User Onboarding

### 1. Create Account
1. Navigate to http://localhost:3000
2. Click "Sign Up"
3. Enter your email and password
4. Verify your email address
5. Complete your profile setup

### 2. Choose Subscription Tier
- **Basic**: 1 CPU, 2GB RAM, shared network
- **Pro**: 4 CPU, 8GB RAM, shared network
- **Enterprise**: 16 CPU, 32GB RAM, isolated network

### 3. Create Your First Agent

#### Option A: Visual Agent Builder
1. Click "Create Agent" → "Visual Builder"
2. Drag and drop nodes from the library
3. Connect nodes to create your workflow
4. Configure node settings
5. Test your workflow
6. Deploy your agent

#### Option B: Code-based Agent IDE
1. Click "Create Agent" → "Code Editor"
2. Choose your framework (LangGraph, Agno, CrewAI)
3. Select programming language (Python, JS/TS, Go, Rust)
4. Write your agent code
5. Use the built-in templates
6. Test and deploy

## Agent Development

### Visual Agent Builder (n8n-based)

#### Available Node Types
- **Input Nodes**: Webhook, Schedule, Manual Trigger
- **AI Nodes**: OpenAI, Anthropic, Custom LLM
- **Processing Nodes**: Data Transform, Conditional Logic, Loop
- **Output Nodes**: HTTP Request, Email, Slack, Webhook
- **Integration Nodes**: Database, File System, API

#### Example Workflow
```
Webhook → OpenAI Chat → Conditional Logic → Email Notification
```

#### Workflow Configuration
```json
{
  "nodes": [
    {
      "id": "webhook",
      "type": "webhook",
      "name": "Customer Request",
      "parameters": {
        "path": "/customer-support",
        "method": "POST"
      }
    },
    {
      "id": "openai",
      "type": "openai-chat",
      "name": "AI Response",
      "parameters": {
        "model": "gpt-4",
        "prompt": "Respond to customer support request: {{$json.message}}"
      }
    }
  ],
  "edges": [
    {
      "from": "webhook",
      "to": "openai"
    }
  ]
}
```

### Code-based Agent IDE

#### LangGraph Agent Example
```python
from langgraph.graph import StateGraph, END
from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool, initialize_agent

# Define the agent state
class AgentState(dict):
    pass

# Define tools
tools = [
    Tool(
        name="search",
        description="Search for information",
        func=lambda query: f"Search results for: {query}"
    )
]

# Initialize agent
agent = initialize_agent(tools, ChatOpenAI(), agent="zero-shot-react-description")

# Define nodes
def process_request(state: AgentState) -> AgentState:
    query = state["user_query"]
    response = agent.run(query)
    state["response"] = response
    return state

# Build graph
graph_builder = StateGraph(AgentState)
graph_builder.add_node("process", process_request)
graph_builder.set_entry_point("process")
graph_builder.add_edge("process", END)

# Compile and run
graph = graph_builder.compile()
```

#### Agno Agent Example
```python
from agno.agent import Agent
from agno.models.anthropic import Claude
from agno.tools.reasoning import ReasoningTools

# Create reasoning agent
agent = Agent(
    model=Claude(id="claude-sonnet-4-20250514"),
    tools=[ReasoningTools(add_instructions=True)],
    instructions="Provide helpful and accurate responses.",
    markdown=True,
)

# Use the agent
response = agent.run("Help me understand quantum computing")
```

#### CrewAI Agent Example
```python
from crewai import Agent, Task, Crew
from langchain.llms import OpenAI

# Define agents
researcher = Agent(
    role='Research Analyst',
    goal='Find relevant information',
    backstory='Expert researcher',
    llm=OpenAI()
)

writer = Agent(
    role='Technical Writer',
    goal='Write clear content',
    backstory='Experienced writer',
    llm=OpenAI()
)

# Define tasks
task1 = Task(description='Research the topic', agent=researcher)
task2 = Task(description='Write about the topic', agent=writer, depends_on=[task1])

# Create crew
crew = Crew(agents=[researcher, writer], tasks=[task1, task2])
result = crew.kickoff()
```

## Agent Deployment

### 1. Deploy Agent
1. Click "Deploy" on your agent
2. Choose deployment options:
   - Resource allocation
   - Environment variables
   - Network settings
3. Monitor deployment progress
4. Verify agent is running

### 2. Monitor Agent
- View real-time logs
- Monitor resource usage
- Check execution metrics
- Set up alerts

### 3. Test Agent
```bash
# Test via API
curl -X POST http://localhost:3001/api/v1/workflows/{workflow_id}/execute \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{"input_data": {"message": "Hello"}}'
```

## Marketplace Integration

### 1. Publish Agent
1. Go to your agent dashboard
2. Click "Publish to Marketplace"
3. Configure pricing and description
4. Add tags and categories
5. Submit for review

### 2. Monitor Usage
- Track downloads and usage
- View revenue metrics
- Monitor user feedback
- Update agent versions

## API Usage

### Authentication
```javascript
// Login
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
});

const { access_token } = await response.json();
```

### Create Agent
```javascript
// Create agent
const agent = await fetch('/api/v1/agents', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My Agent',
    description: 'AI agent description',
    framework: 'langgraph',
    agent_type: 'code'
  })
});
```

### Execute Workflow
```javascript
// Execute workflow
const execution = await fetch('/api/v1/workflows/{workflow_id}/execute', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    input_data: { message: 'Hello' }
  })
});
```

## WebSocket Integration

### Real-time Updates
```javascript
const ws = new WebSocket('wss://api.orchestrator.com/v1/ws');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: access_token
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'execution_update':
      console.log('Execution status:', data.data.status);
      break;
    case 'agent_status_update':
      console.log('Agent status:', data.data.status);
      break;
  }
};
```

## Troubleshooting

### Common Issues

#### Agent Deployment Fails
1. Check resource limits
2. Verify environment variables
3. Review container logs
4. Ensure framework dependencies are installed

#### Workflow Execution Errors
1. Validate workflow configuration
2. Check node connections
3. Review error logs
4. Test individual nodes

#### Authentication Issues
1. Verify JWT token validity
2. Check Auth0 configuration
3. Ensure proper permissions
4. Review organization membership

### Debugging Tools
- Container logs: `/api/v1/agents/{id}/container/logs`
- Execution logs: `/api/v1/executions/{id}`
- Health checks: `/api/v1/agents/{id}/container`
- Metrics: Prometheus endpoint

## Best Practices

### Agent Development
1. Start with simple workflows
2. Test thoroughly before deployment
3. Use proper error handling
4. Monitor resource usage
5. Version your agents

### Security
1. Use environment variables for secrets
2. Implement proper input validation
3. Follow OWASP guidelines
4. Regular security audits
5. Keep dependencies updated

### Performance
1. Optimize resource allocation
2. Use caching where appropriate
3. Monitor execution metrics
4. Implement proper logging
5. Scale horizontally when needed

## Support

### Documentation
- API Documentation: `/docs`
- Framework Guides: `/docs/frameworks`
- Architecture Guide: `/docs/architecture`
- Security Guide: `/docs/security`

### Community
- GitHub Issues: Report bugs and feature requests
- Discord: Community support and discussions
- Stack Overflow: Tag questions with `orchestrator-platform`

### Enterprise Support
- Email: enterprise@orchestrator.com
- Phone: +1-555-ORCHESTRATOR
- SLA: 24/7 support for Enterprise customers
