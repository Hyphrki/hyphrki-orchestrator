# Hyphrki Orchestrator - Deployment Guide

## 🎉 What's Included

The Hyphrki Orchestrator is a fully integrated N8N-based workflow automation platform with:

### ✅ Core Features:
- **N8N Workflow Engine** (v1.17.0) - Built from source with all enterprise features unlocked
- **JWT Authentication** - Seamless integration with Hyphrki main app
- **Admin Dashboard** - Vue.js-based UI for user & agent management
- **Multi-tenancy** - Organization-level isolation
- **Agent Deployment** - Deploy N8N workflows as user-accessible agents
- **Enterprise Features** - All N8N enterprise features enabled (no license required)

### 🔓 Unlocked Enterprise Features:
- Variables
- External Secrets
- LDAP/SSO & SAML
- Advanced Execution Filters
- Debug in Editor
- Binary Data S3
- Multiple Main Instances
- Source Control
- Workflow History
- Worker View
- Log Streaming
- Sharing

---

## 📋 Pre-Deployment Checklist

### 1. Database Setup
Ensure your PostgreSQL database has:
- [ ] `users` table (from hyphrki-app)
- [ ] `organizations` table (from hyphrki-app)
- [ ] `n8n` schema created (will be auto-created by N8N on first run)

### 2. Environment Variables
You'll need these secrets (store in DigitalOcean):
```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/hyphrki_platform
DB_NAME=hyphrki_platform
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# JWT (MUST match hyphrki-app)
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# Security
SESSION_SECRET=your-session-secret-32-chars
ENCRYPTION_KEY=your-encryption-key-64-chars
N8N_ENCRYPTION_KEY=your-n8n-encryption-key-32-chars

# Inter-service (MUST match hyphrki-app)
INTER_SERVER_API_KEY=your-inter-server-api-key

# Redis
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

### 3. GitHub Repository
- [ ] Push orchestrator code to GitHub repository
- [ ] Ensure repository is accessible to DigitalOcean

---

## 🚀 Deployment Steps

### Option A: DigitalOcean App Platform (Recommended)

#### Step 1: Push to GitHub
```bash
cd /Users/dharshansenthil/Desktop/Hyphrki/projectZero/hyphrki-orchestrator

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Hyphrki Orchestrator with N8N integration"

# Add remote and push
git remote add origin https://github.com/Hyphrki/hyphrki-orchestrator.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to DigitalOcean
```bash
# Install doctl if not already installed
# brew install doctl (macOS)

# Authenticate
doctl auth init

# Create app from spec
doctl apps create --spec app-spec.yaml

# Get app ID
doctl apps list

# Monitor deployment
doctl apps logs <app-id> --follow
```

#### Step 3: Configure DNS
1. Go to your DNS provider (e.g., Cloudflare, DigitalOcean)
2. Add CNAME record:
   - Name: `admin`
   - Value: `<your-do-app>.ondigitalocean.app`
   - Proxy: Yes (if using Cloudflare)

#### Step 4: Set Environment Variables
```bash
# Via doctl
doctl apps update <app-id> --spec app-spec.yaml

# Or via DigitalOcean UI:
# 1. Go to Apps → Your App → Settings
# 2. Navigate to "Environment Variables"
# 3. Add all required secrets
```

#### Step 5: Verify Deployment
1. Visit https://admin.hyphrki.com
2. Login with admin credentials
3. Check N8N: https://admin.hyphrki.com/n8n
4. Test admin dashboard: https://admin.hyphrki.com/admin

---

### Option B: Docker Deployment

#### Build Docker Image
```bash
cd /Users/dharshansenthil/Desktop/Hyphrki/projectZero/hyphrki-orchestrator

# Build image
docker build -t hyphrki-orchestrator:latest .

# Test locally
docker run -p 5678:5678 -p 8081:8081 \
  --env-file .env \
  hyphrki-orchestrator:latest
```

#### Push to Registry
```bash
# Tag for Docker Hub
docker tag hyphrki-orchestrator:latest your-username/hyphrki-orchestrator:latest

# Push
docker push your-username/hyphrki-orchestrator:latest
```

#### Deploy to Server
```bash
# SSH to server
ssh your-server

# Pull and run
docker pull your-username/hyphrki-orchestrator:latest
docker run -d \
  -p 5678:5678 \
  -p 8081:8081 \
  --name hyphrki-orchestrator \
  --restart unless-stopped \
  --env-file /path/to/.env \
  your-username/hyphrki-orchestrator:latest
```

---

## 🔧 Post-Deployment Configuration

### 1. Database Migrations
N8N will automatically create its schema on first run. No manual migrations needed.

### 2. Create Admin User
If you don't have an admin user yet:
```sql
-- Connect to database
psql $DATABASE_URL

-- Create admin user
INSERT INTO users (
  id, email, password_hash, first_name, last_name,
  role, email_verified, status, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'admin@hyphrki.com',
  '$2b$10$...',  -- Use bcrypt hash
  'Admin',
  'User',
  'admin',
  true,
  'active',
  NOW(),
  NOW()
);
```

### 3. Configure CORS
Ensure hyphrki-app allows requests from admin.hyphrki.com:
```bash
# In hyphrki-app .env
CORS_ORIGIN=https://hyphrki.com,https://admin.hyphrki.com
```

---

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```bash
curl https://admin.hyphrki.com/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-10-03T00:00:00.000Z",
  "uptime": 12345,
  "database": "connected",
  "n8n": "running"
}
```

### Logs
```bash
# DigitalOcean
doctl apps logs <app-id> --follow

# Docker
docker logs -f hyphrki-orchestrator
```

### Metrics to Monitor
- Response time (< 500ms)
- N8N process status (should be "running")
- Database connections
- Memory usage
- Error rates

---

## 🔐 Security Checklist

- [ ] JWT_SECRET matches hyphrki-app
- [ ] All secrets are stored securely (not in code)
- [ ] HTTPS enabled via DigitalOcean
- [ ] CORS configured correctly
- [ ] Database uses strong password
- [ ] N8N_ENCRYPTION_KEY is unique and secure
- [ ] Admin access requires authentication
- [ ] Rate limiting enabled

---

## 🐛 Troubleshooting

### N8N Not Starting
```bash
# Check logs
doctl apps logs <app-id> | grep N8N

# Common causes:
# 1. Database connection failed → Check DATABASE_URL
# 2. Port already in use → Check if multiple instances running
# 3. Encryption key missing → Check N8N_ENCRYPTION_KEY
```

### Authentication Failing
```bash
# Verify JWT_SECRET matches between apps
# Check cookie domain settings
# Ensure user exists and is active in database
```

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL

# Check if n8n schema exists
\dn

# If not, N8N will create it on first run
```

---

## 📚 API Endpoints

### Public Endpoints
- `GET /` - Orchestrator info
- `GET /health` - Health check
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Admin Endpoints (Authentication Required)
- `GET /admin` - Admin dashboard UI
- `GET /n8n` - N8N workflow editor (proxied)
- `GET /api/users` - List users
- `GET /api/agents` - List agents
- `GET /api/workflows` - List workflows
- `GET /api/executions` - List executions
- `POST /api/agents` - Deploy agent
- `DELETE /api/agents/:id` - Undeploy agent

---

## 🎯 Next Steps After Deployment

1. **Test Authentication** - Login as admin and access dashboard
2. **Create First Workflow** - Use N8N editor to create a test workflow
3. **Deploy First Agent** - Deploy the workflow as an agent
4. **Monitor Performance** - Check logs and metrics
5. **Set Up Alerts** - Configure monitoring alerts for downtime

---

## 📞 Support

For issues or questions:
- Check logs first
- Review this deployment guide
- Check N8N documentation: https://docs.n8n.io
- Review code in GitHub repository

---

**Status**: Ready for Production Deployment ✅

**Last Updated**: 2025-10-03
