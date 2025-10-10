# Production Deployment Guide

## Quick Start

```bash
# Start all services
docker-compose -f docker-compose.production.yml up -d

# Check status
docker ps

# View logs
docker-compose -f docker-compose.production.yml logs -f
```

## Services

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **N8N**: http://localhost:5678 (admin/changeme)
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Environment Variables

All secure keys are pre-configured in `docker-compose.production.yml` with 512-bit encryption:
- JWT_SECRET (512-bit)
- JWT_REFRESH_SECRET (512-bit) 
- ENCRYPTION_KEY (512-bit)
- Database password: changeme_production

⚠️ **IMPORTANT**: Change these values in `.env.production` before deploying to a real production environment!

## Database Setup

The database schema is automatically created on first startup. If you need to reset:

```bash
# Stop and remove volumes
docker-compose -f docker-compose.production.yml down -v

# Start fresh
docker-compose -f docker-compose.production.yml up -d

# Push schema
docker exec orchestrator-backend npx prisma db push
```

## Testing

```bash
# Test backend health
curl http://localhost:3001/health

# Test frontend
curl http://localhost:5173/health

# Test registration
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123","name":"Test User"}'
```

## DigitalOcean Deployment

### Prerequisites
- doctl CLI installed
- DigitalOcean account with App Platform access

### Deploy

```bash
# Login to DigitalOcean
doctl auth init

# Create app (first time)
doctl apps create --spec .do/app.yaml

# Update app (subsequent deployments)
doctl apps update <APP_ID> --spec .do/app.yaml
```

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker logs orchestrator-backend

# Restart
docker-compose -f docker-compose.production.yml restart backend
```

### Database connection errors
```bash
# Check database is healthy
docker ps

# Reset database
docker-compose -f docker-compose.production.yml down -v
docker-compose -f docker-compose.production.yml up -d
```

### Frontend shows white page
```bash
# Check frontend logs
docker logs orchestrator-frontend

# Check API URL is correct (should be http://localhost:3001)
docker exec orchestrator-frontend env | grep VITE_API_URL
```

## Maintenance

```bash
# View all logs
docker-compose -f docker-compose.production.yml logs

# Stop all services
docker-compose -f docker-compose.production.yml down

# Rebuild after code changes
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d
```
