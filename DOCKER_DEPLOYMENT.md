# Docker Deployment Guide - N8N Agent Deployment System

**Last Updated**: 2025-10-10
**Feature**: 001-n8n-agent-deployment

---

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB RAM minimum (8GB recommended)
- 10GB disk space

---

## 🚀 Quick Start

### 1. Configure Environment

```bash
cd /Users/dharshansenthil/Desktop/hyphrki_final/orchestrator_admin

# Copy environment template
cp .env.docker .env.docker.local

# Generate secure keys
openssl rand -hex 32  # Use for ENCRYPTION_KEY
openssl rand -base64 32  # Use for JWT_SECRET

# Edit .env.docker.local with your values
nano .env.docker.local
```

### 2. Build and Start Services

```bash
# Build all images
docker-compose -f docker-compose.production.yml build

# Start all services
docker-compose -f docker-compose.production.yml --env-file .env.docker.local up -d

# View logs
docker-compose -f docker-compose.production.yml logs -f
```

### 3. Run Database Migrations

```bash
# Wait for PostgreSQL to be ready (check health)
docker exec orchestrator-postgres pg_isready -U orchestrator

# Run Prisma migrations
docker exec orchestrator-backend npx prisma migrate deploy

# Verify tables created
docker exec orchestrator-postgres psql -U orchestrator -d orchestrator -c "\dt"
```

### 4. Verify Services

```bash
# Check all containers are healthy
docker-compose -f docker-compose.production.yml ps

# Test each service
curl http://localhost:3001/health         # Backend health
curl http://localhost:5173                # Frontend
curl http://localhost:5678/healthz        # N8N health
docker exec orchestrator-redis redis-cli ping  # Redis
docker exec orchestrator-postgres pg_isready -U orchestrator  # PostgreSQL
```

---

## 🔧 Service Details

### PostgreSQL Database
- **Port**: 5432 (mapped to 5432)
- **Database**: `orchestrator`
- **User**: `orchestrator`
- **Health Check**: Every 10s
- **Volume**: `postgres_data`

**Access**:
```bash
docker exec -it orchestrator-postgres psql -U orchestrator -d orchestrator
```

### Redis Event Bus
- **Port**: 6379 (mapped to 6379)
- **Max Memory**: 256MB (noeviction policy)
- **Health Check**: Every 10s
- **Volume**: `redis_data`

**Access**:
```bash
docker exec -it orchestrator-redis redis-cli
```

**Monitor Events**:
```bash
docker exec -it orchestrator-redis redis-cli
> PSUBSCRIBE marketplace:*
```

### N8N Workflow Engine
- **Port**: 5678 (mapped to 5678)
- **UI**: http://localhost:5678
- **Auth**: Basic Auth (configured via env vars)
- **Database**: PostgreSQL (same instance)
- **Volume**: `n8n_data`

**Access**:
```bash
# Open in browser
open http://localhost:5678

# Login with N8N_USER and N8N_PASSWORD from .env.docker.local
```

### Orchestrator Backend (NestJS)
- **Port**: 3001 (mapped to 3001)
- **API Base**: http://localhost:3001
- **Health**: http://localhost:3001/health
- **Logs**: `docker logs -f orchestrator-backend`

**Access**:
```bash
# View logs
docker logs -f orchestrator-backend

# Execute shell
docker exec -it orchestrator-backend sh

# Run Prisma commands
docker exec orchestrator-backend npx prisma studio
```

### Orchestrator Frontend (React + Vite)
- **Port**: 5173 (mapped to 5173)
- **UI**: http://localhost:5173
- **Served by**: `serve` package
- **Logs**: `docker logs -f orchestrator-frontend`

---

## 🧪 Testing the Deployment

### 1. Database Verification

```bash
# Check tables exist
docker exec orchestrator-postgres psql -U orchestrator -d orchestrator -c "
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('agent_templates', 'agent_parameter_configs', 'output_display_configs', 'user_agent_deployments', 'agent_executions')
ORDER BY table_name;"

# Expected output: All 5 tables listed
```

### 2. Redis Event Bus Test

```bash
# Terminal 1: Subscribe to events
docker exec -it orchestrator-redis redis-cli
> SUBSCRIBE marketplace:agent:published

# Terminal 2: Publish test event
docker exec orchestrator-redis redis-cli PUBLISH marketplace:agent:published '{"test": "message"}'

# Terminal 1 should receive the message
```

### 3. N8N Integration Test

```bash
# Test N8N API is accessible from backend
docker exec orchestrator-backend wget -qO- http://n8n:5678/healthz

# Expected: {"status":"ok"}
```

### 4. Backend API Test

```bash
# Health check
curl http://localhost:3001/health

# Expected response:
# {
#   "status": "ok",
#   "database": "connected",
#   "redis": "connected"
# }
```

### 5. Full E2E Workflow Test

Create a test agent template using the API:

```bash
# Create test user first (if needed)
docker exec orchestrator-backend node create-test-user.ts

# Get user ID from output, then create agent
curl -X POST http://localhost:3001/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Email Agent",
    "description": "Test agent for Docker deployment validation",
    "category": "Communication",
    "tags": ["email", "test"],
    "pricingTier": "free",
    "version": "1.0.0",
    "createdById": "USER_UUID_HERE",
    "n8nWorkflowJson": {
      "nodes": [
        {
          "id": "webhook",
          "type": "n8n-nodes-base.webhook",
          "parameters": {
            "httpMethod": "POST",
            "path": "test-webhook"
          }
        }
      ],
      "connections": {}
    }
  }'

# Expected: 201 Created with agent details
```

---

## 🔍 Monitoring & Logs

### View All Logs
```bash
docker-compose -f docker-compose.production.yml logs -f
```

### View Specific Service Logs
```bash
docker logs -f orchestrator-backend
docker logs -f orchestrator-frontend
docker logs -f orchestrator-n8n
docker logs -f orchestrator-postgres
docker logs -f orchestrator-redis
```

### Monitor Resource Usage
```bash
docker stats
```

### Check Container Health
```bash
docker-compose -f docker-compose.production.yml ps
```

---

## 🛠️ Troubleshooting

### Issue: Backend can't connect to PostgreSQL

**Symptoms**: Backend logs show "ECONNREFUSED" or "database not found"

**Solution**:
```bash
# Check PostgreSQL is healthy
docker-compose -f docker-compose.production.yml ps postgres

# View PostgreSQL logs
docker logs orchestrator-postgres

# Manually test connection
docker exec orchestrator-postgres pg_isready -U orchestrator

# Restart backend
docker-compose -f docker-compose.production.yml restart backend
```

### Issue: Prisma migrations fail

**Symptoms**: "Migration failed" or "Schema out of sync"

**Solution**:
```bash
# Check current migration status
docker exec orchestrator-backend npx prisma migrate status

# Reset database (WARNING: Deletes all data)
docker exec orchestrator-backend npx prisma migrate reset --force

# Or manually apply migrations
docker exec orchestrator-backend npx prisma migrate deploy
```

### Issue: N8N not accessible

**Symptoms**: 502 Bad Gateway or connection refused

**Solution**:
```bash
# Check N8N health
docker-compose -f docker-compose.production.yml ps n8n

# View N8N logs
docker logs orchestrator-n8n

# Check N8N can access PostgreSQL
docker exec orchestrator-n8n wget -qO- http://postgres:5432

# Restart N8N
docker-compose -f docker-compose.production.yml restart n8n
```

### Issue: Redis connection errors

**Symptoms**: "Redis connection failed" in backend logs

**Solution**:
```bash
# Test Redis connectivity
docker exec orchestrator-redis redis-cli ping

# Check Redis logs
docker logs orchestrator-redis

# Test backend can reach Redis
docker exec orchestrator-backend ping -c 3 redis

# Restart Redis
docker-compose -f docker-compose.production.yml restart redis
```

### Issue: Frontend shows blank page

**Symptoms**: White screen or 404 errors

**Solution**:
```bash
# Check frontend logs
docker logs orchestrator-frontend

# Verify build completed
docker exec orchestrator-frontend ls -la dist/

# Check environment variables
docker exec orchestrator-frontend env | grep VITE

# Rebuild frontend
docker-compose -f docker-compose.production.yml build frontend
docker-compose -f docker-compose.production.yml up -d frontend
```

---

## 🔒 Security Hardening

### Production Recommendations

1. **Change All Default Passwords**:
   ```bash
   # Generate strong passwords
   openssl rand -base64 32 > postgres.pass
   openssl rand -base64 32 > n8n.pass
   openssl rand -hex 32 > encryption.key
   ```

2. **Use Docker Secrets** (for Docker Swarm):
   ```yaml
   secrets:
     postgres_password:
       external: true
     encryption_key:
       external: true
   ```

3. **Enable TLS/SSL**:
   - Configure PostgreSQL with SSL certificates
   - Use HTTPS reverse proxy (Nginx/Traefik)
   - Enable Redis TLS mode

4. **Restrict Network Access**:
   ```yaml
   # Only expose necessary ports
   ports:
     - "127.0.0.1:3001:3001"  # Backend only on localhost
   ```

5. **Regular Updates**:
   ```bash
   # Pull latest secure images
   docker-compose -f docker-compose.production.yml pull
   docker-compose -f docker-compose.production.yml up -d
   ```

---

## 🗑️ Cleanup Commands

### Stop Services
```bash
docker-compose -f docker-compose.production.yml down
```

### Stop and Remove Volumes (WARNING: Deletes all data)
```bash
docker-compose -f docker-compose.production.yml down -v
```

### Remove Images
```bash
docker-compose -f docker-compose.production.yml down --rmi all
```

### Complete Cleanup
```bash
docker-compose -f docker-compose.production.yml down -v --rmi all
docker volume prune -f
docker network prune -f
```

---

## 📊 Performance Tuning

### PostgreSQL Tuning

Edit `postgresql.conf` or use environment variables:

```yaml
environment:
  - POSTGRES_INITDB_ARGS="-E UTF8 --locale=C"
  - POSTGRES_MAX_CONNECTIONS=100
  - POSTGRES_SHARED_BUFFERS=256MB
  - POSTGRES_EFFECTIVE_CACHE_SIZE=1GB
```

### N8N Tuning

```yaml
environment:
  - EXECUTIONS_PROCESS=main  # Run executions in main process
  - EXECUTIONS_TIMEOUT=300   # 5-minute timeout
  - EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000
```

### Redis Tuning

```yaml
command: redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
```

---

## 🔄 Backup & Restore

### Backup Database

```bash
# Backup PostgreSQL
docker exec orchestrator-postgres pg_dump -U orchestrator orchestrator > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup N8N data
docker cp orchestrator-n8n:/home/node/.n8n ./n8n_backup_$(date +%Y%m%d_%H%M%S)
```

### Restore Database

```bash
# Restore PostgreSQL
cat backup_20251010_080000.sql | docker exec -i orchestrator-postgres psql -U orchestrator -d orchestrator

# Restore N8N data
docker cp ./n8n_backup_20251010_080000 orchestrator-n8n:/home/node/.n8n
docker-compose -f docker-compose.production.yml restart n8n
```

---

## 📝 Next Steps

1. **Configure Auth0**: Set up Auth0 application and update environment variables
2. **Deploy N8N Workflows**: Upload sample workflows for testing
3. **Setup Monitoring**: Integrate with Prometheus/Grafana
4. **Configure CI/CD**: Automate deployment with GitHub Actions
5. **Load Testing**: Use k6 or Apache Bench to test performance

---

## 🆘 Support

**Documentation**: `/specs/001-n8n-agent-deployment/`
**Issues**: Create GitHub issue with logs and steps to reproduce
**Logs Location**: Use `docker logs <container-name>`

---

**Deployment Checklist**:
- [ ] Environment variables configured
- [ ] Secure passwords generated
- [ ] All services healthy
- [ ] Database migrations applied
- [ ] Test agent created successfully
- [ ] Redis events working
- [ ] N8N accessible
- [ ] Backend API responding
- [ ] Frontend loading

---

**Generated**: 2025-10-10
**Version**: 1.0.0
