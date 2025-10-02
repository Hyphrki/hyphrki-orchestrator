# Hyphrki Orchestrator - Production Deployment Guide

This guide covers the complete deployment process for the Hyphrki Orchestrator in a production environment.

## Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL 12+
- Docker and Docker Compose (for N8N)
- PM2 (for process management)
- Git

## Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd hyphrki-orchestrator
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp env.production.example .env
   # Edit .env with your production values
   ```

3. **Setup database**:
   ```bash
   ./scripts/setup-database.sh
   ./scripts/run-migrations.sh
   ```

4. **Setup N8N** (optional):
   ```bash
   ./scripts/setup-n8n-docker.sh
   ```

5. **Deploy application**:
   ```bash
   ./scripts/deploy.sh
   ```

6. **Setup monitoring**:
   ```bash
   ./scripts/setup-monitoring.sh
   ```

## Detailed Setup

### 1. Environment Configuration

Copy the example environment file and update with your production values:

```bash
cp env.production.example .env
```

Required environment variables:
- `DB_PASSWORD`: Secure database password
- `JWT_SECRET`: Strong JWT secret key
- `N8N_API_KEY`: N8N API key (if using N8N)
- `NODE_ENV`: Set to `production`

### 2. Database Setup

#### Option A: Using the setup script
```bash
./scripts/setup-database.sh
./scripts/run-migrations.sh
```

#### Option B: Manual setup
```bash
# Create database
createdb hyphrki_production

# Create user
psql -d hyphrki_production -c "CREATE USER hyphrki_user WITH PASSWORD 'your_secure_password';"
psql -d hyphrki_production -c "GRANT ALL PRIVILEGES ON DATABASE hyphrki_production TO hyphrki_user;"

# Run migrations
DB_PASSWORD=your_secure_password ./scripts/run-migrations.sh
```

### 3. N8N Integration (Optional)

If you want to use N8N for workflow management:

```bash
# Start Docker (if not running)
open -a Docker

# Setup N8N
./scripts/setup-n8n-docker.sh

# Get API key from N8N interface
# Update N8N_API_KEY in .env file
```

### 4. Application Deployment

#### Using PM2 (Recommended)
```bash
# Build and deploy
./scripts/deploy.sh

# Check status
pm2 status

# View logs
pm2 logs hyphrki-orchestrator
```

#### Manual deployment
```bash
# Build application
npm run build

# Start application
npm start
```

### 5. Monitoring Setup

```bash
# Setup monitoring
./scripts/setup-monitoring.sh

# Open monitoring dashboard
open monitoring/dashboard.html
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] N8N instance running (if needed)
- [ ] Application deployed with PM2
- [ ] Monitoring configured
- [ ] Log rotation enabled
- [ ] SSL certificates installed (if using HTTPS)
- [ ] Firewall configured
- [ ] Backup strategy implemented

## Security Considerations

1. **Change default passwords**:
   - Default admin: `admin@hyphrki.com` / `admin123`
   - Change immediately after first login

2. **Environment variables**:
   - Use strong, unique passwords
   - Generate secure JWT secrets
   - Never commit `.env` files

3. **Database security**:
   - Use strong database passwords
   - Limit database user permissions
   - Enable SSL connections

4. **Network security**:
   - Configure firewall rules
   - Use HTTPS in production
   - Implement rate limiting

## Monitoring and Maintenance

### Health Checks
- Application: `http://localhost:3001/api/health`
- Monitoring dashboard: `monitoring/dashboard.html`

### Log Management
- Logs location: `logs/` directory
- Log rotation: Configured via systemd timer
- View logs: `pm2 logs hyphrki-orchestrator`

### Backup Strategy
1. **Database backup**:
   ```bash
   pg_dump hyphrki_production > backup_$(date +%Y%m%d).sql
   ```

2. **Application backup**:
   ```bash
   tar -czf orchestrator_backup_$(date +%Y%m%d).tar.gz .
   ```

### Updates
1. Pull latest changes
2. Run `npm install` to update dependencies
3. Run `./scripts/run-migrations.sh` for database updates
4. Restart application: `pm2 restart hyphrki-orchestrator`

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   lsof -i :3001
   kill -9 <PID>
   ```

2. **Database connection failed**:
   - Check PostgreSQL is running
   - Verify database credentials
   - Check network connectivity

3. **N8N connection failed**:
   - Ensure Docker is running
   - Check N8N container status
   - Verify API key

4. **Application won't start**:
   - Check logs: `pm2 logs hyphrki-orchestrator`
   - Verify environment variables
   - Check file permissions

### Log Locations
- Application logs: `logs/combined.log`
- PM2 logs: `~/.pm2/logs/`
- System logs: `/var/log/syslog`

## Performance Optimization

1. **Database optimization**:
   - Add appropriate indexes
   - Regular VACUUM and ANALYZE
   - Connection pooling

2. **Application optimization**:
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching

3. **Monitoring**:
   - Set up alerts for critical metrics
   - Monitor memory and CPU usage
   - Track response times

## Support

For issues and questions:
1. Check the logs first
2. Review this deployment guide
3. Check the monitoring dashboard
4. Contact the development team

## Version History

- v1.0.0: Initial production deployment
- Database integration with PostgreSQL
- N8N workflow management
- JWT authentication
- File upload support
- Real-time WebSocket updates
- PM2 process management
- Comprehensive monitoring
