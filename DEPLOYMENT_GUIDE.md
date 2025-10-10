# Hyphrki Orchestrator - Production Deployment Guide

This guide covers the complete production deployment process for the Hyphrki Orchestrator platform including backend, frontend, and user portal.

## 📋 Prerequisites

### Infrastructure Requirements
- **DigitalOcean Account** with App Platform access
- **Domain Name** (e.g., hyphrki.com)
- **SSL Certificate** (Let's Encrypt via DO)
- **Auth0 Account** for authentication
- **PostgreSQL Database** (managed or self-hosted)
- **Redis Instance** for caching and sessions

### System Requirements
- **Docker** 20.10+
- **Node.js** 18+ (for local development)
- **Git** for version control
- **doctl** CLI tool

## 🚀 Deployment Overview

### Architecture
```
Internet
    ↓
[Load Balancer/Nginx]
    ↓
├── [User Portal] (Next.js)
├── [Admin Frontend] (React)
└── [Backend API] (NestJS)
    ↓
├── [PostgreSQL]
├── [Redis]
└── [Monitoring Stack]
```

### Deployment Strategy
1. **Staging**: Automated deployment on every push to `main`
2. **Production**: Manual deployment approval required
3. **Rollback**: Version-based rollbacks available

## ⚙️ Environment Setup

### 1. DigitalOcean App Platform

Create App Platform applications:

```bash
# Login to DigitalOcean
doctl auth init

# Create staging app
doctl apps create --spec .do/app-spec-staging.yaml

# Create production app
doctl apps create --spec .do/app-spec-production.yaml
```

### 2. Domain Configuration

Configure domains in DigitalOcean:

```bash
# Add domain to your account
doctl domains create hyphrki.com

# Create DNS records
doctl domains records create hyphrki.com --record-type A --record-name @ --record-data YOUR_APP_IP
doctl domains records create hyphrki.com --record-type CNAME --record-name api --record-data YOUR_APP_IP
```

### 3. SSL Certificates

Enable SSL in App Platform:

```bash
# SSL is automatically configured via Let's Encrypt
# Verify in App Platform dashboard
```

### 4. Environment Variables

Set production environment variables in App Platform:

#### Backend Environment Variables
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://:pass@host:6379
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://hyphrki.com
LOG_LEVEL=warn
```

#### User Portal Environment Variables
```bash
NODE_ENV=production
NEXTAUTH_URL=https://hyphrki.com
NEXTAUTH_SECRET=your-nextauth-secret
AUTH0_CLIENT_ID=prod-client-id
AUTH0_CLIENT_SECRET=prod-client-secret
AUTH0_ISSUER=https://your-domain.auth0.com
NEXT_PUBLIC_API_URL=https://api.hyphrki.com
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-jwt-secret
```

## 🐳 Docker Deployment

### Local Docker Development

```bash
# Start all services
docker-compose up -d

# View service status
docker-compose ps

# View logs
docker-compose logs -f user-portal

# Stop services
docker-compose down
```

### Production Docker Build

```bash
# Build production images
docker build -f backend/Dockerfile.prod -t orchestrator-backend:latest ./backend
docker build -f frontend/Dockerfile -t orchestrator-frontend:latest ./frontend
docker build -f user-portal/Dockerfile.prod -t orchestrator-user-portal:latest ./user-portal

# Tag for registry
docker tag orchestrator-backend:latest registry.digitalocean.com/your-registry/orchestrator-backend:prod
docker tag orchestrator-frontend:latest registry.digitalocean.com/your-registry/orchestrator-frontend:prod
docker tag orchestrator-user-portal:latest registry.digitalocean.com/your-registry/orchestrator-user-portal:prod

# Push to registry
docker push registry.digitalocean.com/your-registry/orchestrator-backend:prod
docker push registry.digitalocean.com/your-registry/orchestrator-frontend:prod
docker push registry.digitalocean.com/your-registry/orchestrator-user-portal:prod
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

The deployment pipeline includes:

1. **Code Quality Checks**
   ```yaml
   - ESLint
   - TypeScript checks
   - Unit tests
   - Integration tests
   ```

2. **Build & Test**
   ```yaml
   - Docker image builds
   - Security scanning
   - Performance tests
   ```

3. **Staging Deployment**
   ```yaml
   - Automatic on main branch push
   - Health checks
   - Smoke tests
   ```

4. **Production Deployment**
   ```yaml
   - Manual approval required
   - Blue-green deployment
   - Automated rollback on failure
   ```

### Manual Deployment

```bash
# Trigger production deployment
gh workflow run deploy.yml -f environment=production
```

## 📊 Monitoring & Observability

### Health Checks

Configure health check endpoints:

```bash
# Backend health check
curl https://api.hyphrki.com/health

# User Portal health check
curl https://app.hyphrki.com/api/health
```

### Monitoring Stack

Set up monitoring with:

- **Prometheus**: Metrics collection
- **Grafana**: Dashboards and visualization
- **Loki**: Log aggregation
- **Promtail**: Log shipping

### Alerting

Configure alerts for:

- **Application Health**: Service availability
- **Performance**: Response times, error rates
- **Infrastructure**: CPU, memory, disk usage
- **Security**: Failed login attempts, suspicious activity

## 🔒 Security Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Secrets rotated (no hardcoded values)
- [ ] SSL certificates valid
- [ ] Firewall rules configured
- [ ] Database backups enabled

### Authentication & Authorization
- [ ] Auth0 production configuration
- [ ] JWT secrets configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled

### Data Protection
- [ ] Database encryption enabled
- [ ] Backup strategy in place
- [ ] Data retention policies
- [ ] GDPR compliance verified

### Network Security
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] WAF enabled
- [ ] DDoS protection active

## 🔄 Rollback Procedures

### Emergency Rollback

```bash
# Rollback to previous version
doctl apps update APP_ID --spec previous-app-spec.yaml

# Verify rollback
curl https://app.hyphrki.com/api/health
```

### Gradual Rollback

1. **Scale down new version**
2. **Scale up previous version**
3. **Monitor for issues**
4. **Complete rollback if needed**

## 📈 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: WebP format, lazy loading
- **Caching**: Service worker, CDN integration
- **Bundle Analysis**: Regular bundle size monitoring

### Backend Optimization
- **Database Indexing**: Query performance optimization
- **Caching Strategy**: Redis for frequently accessed data
- **Connection Pooling**: Database connection optimization
- **API Rate Limiting**: Prevent abuse and ensure fair usage

### Infrastructure Optimization
- **Auto-scaling**: Based on CPU/memory usage
- **Load Balancing**: Distribute traffic efficiently
- **CDN Integration**: Static asset delivery
- **Database Optimization**: Connection pooling, query optimization

## 🧪 Testing Strategies

### Pre-Deployment Testing

```bash
# Run full test suite
npm run test:ci

# E2E testing
npm run test:e2e

# Performance testing
npm run test:performance

# Security testing
npm run test:security
```

### Post-Deployment Testing

1. **Smoke Tests**: Basic functionality verification
2. **Integration Tests**: API and service interactions
3. **Performance Tests**: Load and stress testing
4. **Security Tests**: Penetration testing

## 📚 Troubleshooting

### Common Issues

#### Application Not Starting
```bash
# Check logs
doctl apps logs APP_ID

# Check environment variables
doctl apps get APP_ID

# Verify database connectivity
doctl databases get DB_ID
```

#### High Error Rates
```bash
# Check application metrics
curl https://api.hyphrki.com/metrics

# Review error logs
doctl apps logs APP_ID --follow

# Check database performance
doctl databases get DB_ID
```

#### Performance Issues
```bash
# Check resource usage
doctl apps get APP_ID

# Review performance metrics
# Access Grafana dashboard

# Check database slow queries
doctl databases get DB_ID
```

### Log Analysis

```bash
# Application logs
doctl apps logs APP_ID --follow

# Database logs
doctl databases logs DB_ID

# Container logs (if using Docker)
docker logs container_name
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks

- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and optimize database performance
- **Annually**: Security audit and compliance review

### Support Contacts

- **Development Team**: dev@hyphrki.com
- **Infrastructure Team**: infra@hyphrki.com
- **Security Team**: security@hyphrki.com
- **Customer Support**: support@hyphrki.com

### Emergency Procedures

1. **Assess Impact**: Determine scope and severity
2. **Communicate**: Notify stakeholders and customers
3. **Mitigate**: Implement immediate fixes
4. **Resolve**: Deploy permanent solution
5. **Review**: Post-mortem analysis and improvements

---

## 🎯 Success Metrics

Monitor these KPIs for deployment success:

- **Availability**: 99.9% uptime
- **Performance**: <2s response time
- **Error Rate**: <0.1% error rate
- **Security**: Zero security incidents
- **User Satisfaction**: >95% satisfaction score

---

*This deployment guide should be reviewed and updated regularly to reflect changes in infrastructure, processes, and best practices.*
