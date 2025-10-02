#!/bin/bash

# N8N Docker setup script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up N8N with Docker for Hyphrki Orchestrator${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Create N8N data directory
echo -e "${YELLOW}Creating N8N data directory...${NC}"
mkdir -p ./n8n-data

# Create docker-compose.yml for N8N
echo -e "${YELLOW}Creating N8N Docker Compose configuration...${NC}"
cat > docker-compose.n8n.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: hyphrki-n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=hyphrki2024
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=http://localhost:5678/
      - GENERIC_TIMEZONE=UTC
      - N8N_METRICS=true
      - N8N_LOG_LEVEL=info
      - N8N_USER_MANAGEMENT_DISABLED=false
      - N8N_PERSONALIZATION_ENABLED=true
    volumes:
      - ./n8n-data:/home/node/.n8n
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - hyphrki-network

networks:
  hyphrki-network:
    driver: bridge
EOF

# Start N8N
echo -e "${YELLOW}Starting N8N container...${NC}"
docker-compose -f docker-compose.n8n.yml up -d

# Wait for N8N to be ready
echo -e "${YELLOW}Waiting for N8N to be ready...${NC}"
sleep 10

# Check if N8N is running
if curl -f http://localhost:5678/healthz > /dev/null 2>&1; then
    echo -e "${GREEN}N8N is running successfully!${NC}"
    echo -e "${YELLOW}N8N Access Information:${NC}"
    echo "  URL: http://localhost:5678"
    echo "  Username: admin"
    echo "  Password: hyphrki2024"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Open http://localhost:5678 in your browser"
    echo "2. Login with the credentials above"
    echo "3. Go to Settings > API Keys"
    echo "4. Create a new API key"
    echo "5. Update N8N_API_KEY in your .env file"
else
    echo -e "${RED}Failed to start N8N. Check the logs with:${NC}"
    echo "docker-compose -f docker-compose.n8n.yml logs"
    exit 1
fi

echo -e "${GREEN}N8N setup completed!${NC}"
