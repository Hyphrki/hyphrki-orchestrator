#!/bin/bash

# Production build script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Hyphrki Orchestrator for production${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from example...${NC}"
    cp env.production.example .env
    echo -e "${RED}Please update .env file with your production values!${NC}"
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm ci --only=production

# Create logs directory
echo -e "${YELLOW}Creating logs directory...${NC}"
mkdir -p logs

# Build the application
echo -e "${YELLOW}Building application...${NC}"
npm run build

# Check if build was successful
if [ -d ".next" ]; then
    echo -e "${GREEN}Build completed successfully!${NC}"
    echo -e "${YELLOW}Build artifacts:${NC}"
    echo "  - .next/ directory (Next.js build)"
    echo "  - public/ directory (static assets)"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Update .env file with production values"
    echo "2. Run: pm2 start ecosystem.config.js"
    echo "3. Run: pm2 save"
    echo "4. Run: pm2 startup (for auto-start on boot)"
else
    echo -e "${RED}Build failed! Check the output above for errors.${NC}"
    exit 1
fi
