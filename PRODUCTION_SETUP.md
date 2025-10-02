# Hyphrki Orchestrator - Production Setup Guide

## Overview

The Hyphrki Orchestrator is a production-ready admin portal for managing AI agent templates and workflows. This guide covers the complete setup and configuration for production deployment.

## Features Implemented

### ✅ Database Integration
- **PostgreSQL Connection**: Real database integration with connection pooling
- **Fallback Support**: Graceful fallback to mock data if database is unavailable
- **Query Optimization**: Efficient queries with pagination and filtering
- **Error Handling**: Comprehensive error handling and logging

### ✅ N8N API Integration
- **Real API Calls**: Production-ready N8N workflow management
- **Connection Management**: Automatic connection checking and retry logic
- **Fallback Support**: Mock data fallback for development/testing
- **Workflow Operations**: Create, update, delete, activate, deactivate workflows

### ✅ JWT Authentication
- **Secure Tokens**: JWT-based authentication with configurable expiration
- **Password Hashing**: bcrypt password hashing for security
- **Role-based Access**: Admin role validation and middleware
- **Token Validation**: Comprehensive token verification and refresh

### ✅ File Upload System
- **Multi-format Support**: Images, JSON, and text file uploads
- **Size Validation**: Configurable file size limits
- **Type Validation**: MIME type validation for security
- **Unique Naming**: UUID-based unique file naming
- **Public URLs**: Automatic public URL generation

### ✅ WebSocket Real-time Updates
- **Live Notifications**: Real-time updates for template changes
- **Authentication**: JWT-based WebSocket authentication
- **Subscription Management**: Topic-based subscription system
- **Role Broadcasting**: Role-specific message broadcasting
- **Connection Management**: Automatic client management and cleanup

## Environment Configuration

Create a `.env` file in the orchestrator root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hyphrki
DB_USER=postgres
DB_PASSWORD=your-secure-password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# N8N Configuration
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=your-n8n-api-key

# File Upload Configuration
UPLOAD_DIR=./public/uploads
BASE_URL=http://localhost:3001

# WebSocket Configuration
WS_PORT=8080

# Application Configuration
NODE_ENV=production
PORT=3001
```

## Database Setup

### 1. PostgreSQL Installation
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql
```

### 2. Database Creation
```sql
-- Connect to PostgreSQL
sudo -u postgres psql

-- Create database and user
CREATE DATABASE hyphrki;
CREATE USER hyphrki_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE hyphrki TO hyphrki_user;
```

### 3. Run Migrations
The orchestrator will automatically create the required tables on first run. The main tables include:
- `agent_templates` - Template definitions
- `users` - User authentication
- `agent_instances` - Deployed agent instances
- `execution_logs` - Workflow execution logs

## N8N Setup

### 1. Install N8N
```bash
# Global installation
npm install -g n8n

# Or using Docker
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
```

### 2. Configure N8N API
1. Start N8N: `n8n start`
2. Access N8N UI: `http://localhost:5678`
3. Create API credentials in Settings > API Keys
4. Set `N8N_API_KEY` in your environment

## File Upload Setup

### 1. Create Upload Directory
```bash
mkdir -p public/uploads/templates
mkdir -p public/uploads/icons
mkdir -p public/uploads/assets
```

### 2. Set Permissions
```bash
chmod 755 public/uploads
chmod 755 public/uploads/*
```

## WebSocket Setup

The WebSocket server runs on a separate port (default: 8080). Ensure this port is available and accessible.

## Production Deployment

### 1. Build the Application
```bash
npm run build
```

### 2. Start Production Server
```bash
npm start
```

### 3. Using PM2 (Recommended)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "hyphrki-orchestrator" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### 4. Using Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001 8080

CMD ["npm", "start"]
```

## Security Considerations

### 1. Environment Variables
- Use strong, unique JWT secrets
- Use secure database passwords
- Rotate API keys regularly
- Never commit `.env` files

### 2. Database Security
- Use SSL connections in production
- Implement connection pooling limits
- Regular security updates
- Backup strategies

### 3. File Upload Security
- Validate file types and sizes
- Scan uploaded files for malware
- Use CDN for file serving
- Implement access controls

### 4. WebSocket Security
- Use WSS in production
- Implement rate limiting
- Validate all messages
- Monitor connections

## Monitoring and Logging

### 1. Application Logs
- Database query logs
- API request/response logs
- WebSocket connection logs
- Error tracking

### 2. Health Checks
- Database connectivity
- N8N API availability
- File system access
- WebSocket server status

### 3. Performance Monitoring
- Response times
- Memory usage
- CPU utilization
- Connection counts

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Templates
- `GET /api/templates` - List templates (with pagination/filtering)
- `POST /api/templates` - Create template
- `GET /api/templates/[id]` - Get template details
- `PUT /api/templates/[id]` - Update template
- `DELETE /api/templates/[id]` - Delete template

### File Upload
- `POST /api/upload` - Upload files (requires authentication)

### N8N Workflows
- `GET /api/n8n/workflows` - List workflows
- `POST /api/n8n/workflows` - Create workflow
- `GET /api/n8n/workflows/[id]` - Get workflow details
- `PUT /api/n8n/workflows/[id]` - Update workflow
- `DELETE /api/n8n/workflows/[id]` - Delete workflow

## WebSocket Events

### Client to Server
- `authenticate` - Authenticate with JWT token
- `subscribe` - Subscribe to topic updates
- `unsubscribe` - Unsubscribe from topic
- `ping` - Keep-alive ping

### Server to Client
- `connected` - Connection established
- `authenticated` - Authentication successful
- `broadcast` - Topic-based broadcast
- `role_broadcast` - Role-specific broadcast
- `user_message` - Direct user message
- `error` - Error message

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials
   - Verify PostgreSQL is running
   - Check network connectivity

2. **N8N API Errors**
   - Verify N8N is running
   - Check API key configuration
   - Verify N8N version compatibility

3. **File Upload Issues**
   - Check directory permissions
   - Verify file size limits
   - Check MIME type validation

4. **WebSocket Connection Issues**
   - Check port availability
   - Verify firewall settings
   - Check authentication tokens

### Logs Location
- Application logs: Console output
- Database logs: PostgreSQL logs
- N8N logs: N8N application logs
- WebSocket logs: Console output

## Support

For production support and issues:
1. Check application logs
2. Verify environment configuration
3. Test individual components
4. Review security settings
5. Contact development team

## Next Steps

1. Set up monitoring and alerting
2. Implement backup strategies
3. Configure load balancing
4. Set up SSL certificates
5. Implement CI/CD pipelines
