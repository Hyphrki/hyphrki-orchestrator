#!/bin/bash

# Build Framework Runtime Containers
# This script builds all framework-specific containers for the Orchestrator platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCKER_REGISTRY="${DOCKER_REGISTRY:-orchestrator}"
TAG="${TAG:-latest}"

echo -e "${BLUE}Building Orchestrator Framework Containers${NC}"
echo "Registry: $DOCKER_REGISTRY"
echo "Tag: $TAG"
echo "=========================================="

# Build LangGraph Runtime
echo -e "${YELLOW}Building LangGraph Runtime...${NC}"
docker build -f docker/frameworks/langgraph.Dockerfile -t $DOCKER_REGISTRY/langgraph-runtime:$TAG .
echo -e "${GREEN}✓ LangGraph Runtime built${NC}"

# Build Agno Runtime
echo -e "${YELLOW}Building Agno Runtime...${NC}"
docker build -f docker/frameworks/agno.Dockerfile -t $DOCKER_REGISTRY/agno-runtime:$TAG .
echo -e "${GREEN}✓ Agno Runtime built${NC}"

# Build CrewAI Runtime
echo -e "${YELLOW}Building CrewAI Runtime...${NC}"
docker build -f docker/frameworks/crewai.Dockerfile -t $DOCKER_REGISTRY/crewai-runtime:$TAG .
echo -e "${GREEN}✓ CrewAI Runtime built${NC}"

# Build n8n Runtime
echo -e "${YELLOW}Building n8n Runtime...${NC}"
docker build -f docker/frameworks/n8n.Dockerfile -t $DOCKER_REGISTRY/n8n-runtime:$TAG .
echo -e "${GREEN}✓ n8n Runtime built${NC}"

# Push images if registry is not local
if [[ "$DOCKER_REGISTRY" != "orchestrator" ]]; then
    echo -e "${YELLOW}Pushing images to registry...${NC}"
    docker push $DOCKER_REGISTRY/langgraph-runtime:$TAG
    docker push $DOCKER_REGISTRY/agno-runtime:$TAG
    docker push $DOCKER_REGISTRY/crewai-runtime:$TAG
    docker push $DOCKER_REGISTRY/n8n-runtime:$TAG
    echo -e "${GREEN}✓ All images pushed${NC}"
fi

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}All framework containers built successfully!${NC}"
echo -e "${BLUE}Available images:${NC}"
echo "  - $DOCKER_REGISTRY/langgraph-runtime:$TAG"
echo "  - $DOCKER_REGISTRY/agno-runtime:$TAG"
echo "  - $DOCKER_REGISTRY/crewai-runtime:$TAG"
echo "  - $DOCKER_REGISTRY/n8n-runtime:$TAG"
