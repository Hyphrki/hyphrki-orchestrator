#!/bin/bash

# Deployment script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Deploying Hyphrki Orchestrator${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
fi

# Stop existing processes
echo -e "${YELLOW}Stopping existing processes...${NC}"
pm2 stop hyphrki-orchestrator 2>/dev/null || true
pm2 delete hyphrki-orchestrator 2>/dev/null || true

# Build the application
echo -e "${YELLOW}Building application...${NC}"
./scripts/build-production.sh

# Start with PM2
echo -e "${YELLOW}Starting application with PM2...${NC}"
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
echo -e "${YELLOW}Saving PM2 configuration...${NC}"
pm2 save

# Show status
echo -e "${GREEN}Deployment completed!${NC}"
echo -e "${YELLOW}Application status:${NC}"
pm2 status

echo -e "${YELLOW}Useful commands:${NC}"
echo "  pm2 status                    - Check application status"
echo "  pm2 logs hyphrki-orchestrator - View application logs"
echo "  pm2 restart hyphrki-orchestrator - Restart application"
echo "  pm2 stop hyphrki-orchestrator - Stop application"
echo "  pm2 monit                     - Monitor application"
