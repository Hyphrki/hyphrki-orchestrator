#!/bin/bash

# Production Deployment Script
# Deploys the Orchestrator platform to production using Terraform and Kubernetes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT="${ENVIRONMENT:-production}"
TERRAFORM_DIR="terraform/environments/$ENVIRONMENT"
K8S_DIR="k8s/overlays/$ENVIRONMENT"

echo -e "${BLUE}Orchestrator Production Deployment${NC}"
echo "Environment: $ENVIRONMENT"
echo "=========================================="

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"
command -v terraform >/dev/null 2>&1 || { echo -e "${RED}Terraform is required but not installed. Aborting.${NC}" >&2; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo -e "${RED}kubectl is required but not installed. Aborting.${NC}" >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}Docker is required but not installed. Aborting.${NC}" >&2; exit 1; }

echo -e "${GREEN}✓ Prerequisites check passed${NC}"

# Build framework containers
echo -e "${YELLOW}Building framework containers...${NC}"
./scripts/build-frameworks.sh
echo -e "${GREEN}✓ Framework containers built${NC}"

# Initialize Terraform
echo -e "${YELLOW}Initializing Terraform...${NC}"
cd $TERRAFORM_DIR
terraform init
echo -e "${GREEN}✓ Terraform initialized${NC}"

# Validate Terraform configuration
echo -e "${YELLOW}Validating Terraform configuration...${NC}"
terraform validate
echo -e "${GREEN}✓ Terraform configuration valid${NC}"

# Plan Terraform changes
echo -e "${YELLOW}Planning Terraform changes...${NC}"
terraform plan -out=tfplan
echo -e "${GREEN}✓ Terraform plan created${NC}"

# Prompt for approval
read -p "Do you want to apply these changes? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled by user${NC}"
    exit 0
fi

# Apply Terraform changes
echo -e "${YELLOW}Applying Terraform changes...${NC}"
terraform apply tfplan
echo -e "${GREEN}✓ Infrastructure deployed${NC}"

# Configure kubectl
echo -e "${YELLOW}Configuring kubectl...${NC}"
aws eks update-kubeconfig --name orchestrator-prod --region us-east-1
echo -e "${GREEN}✓ kubectl configured${NC}"

# Deploy Kubernetes resources
echo -e "${YELLOW}Deploying Kubernetes resources...${NC}"
cd ../../$K8S_DIR
kubectl apply -k .
echo -e "${GREEN}✓ Kubernetes resources deployed${NC}"

# Wait for deployments to be ready
echo -e "${YELLOW}Waiting for deployments to be ready...${NC}"
kubectl wait --for=condition=available --timeout=600s deployment/orchestrator-backend -n orchestrator-system
kubectl wait --for=condition=available --timeout=300s deployment/langgraph-runtime -n orchestrator-frameworks
kubectl wait --for=condition=available --timeout=300s deployment/agno-runtime -n orchestrator-frameworks
kubectl wait --for=condition=available --timeout=300s deployment/crewai-runtime -n orchestrator-frameworks
kubectl wait --for=condition=available --timeout=300s deployment/n8n-runtime -n orchestrator-frameworks
echo -e "${GREEN}✓ All deployments ready${NC}"

# Run health checks
echo -e "${YELLOW}Running health checks...${NC}"
kubectl run health-check --image=curlimages/curl --rm -i --restart=Never -- curl -f http://orchestrator-backend.orchestrator-system/health
echo -e "${GREEN}✓ Health checks passed${NC}"

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}Production deployment completed successfully!${NC}"
echo -e "${BLUE}Services available at:${NC}"
echo "  - Backend API: https://api.orchestrator.example.com"
echo "  - Frontend: https://orchestrator.example.com"
echo "  - Metrics: https://api.orchestrator.example.com/metrics"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure DNS records to point to the load balancer"
echo "2. Set up monitoring and alerting"
echo "3. Configure backup policies"
echo "4. Set up CI/CD pipelines"
