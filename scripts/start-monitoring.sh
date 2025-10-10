#!/bin/bash

# Start monitoring stack for Orchestrator platform

echo "Starting monitoring stack..."

# Start the main application stack
docker-compose -f docker-compose.yml up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Start monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d

echo "Monitoring stack started!"
echo ""
echo "Services available at:"
echo "- Orchestrator Backend: http://localhost:3001"
echo "- Orchestrator Frontend: http://localhost:5173"
echo "- Prometheus: http://localhost:9090"
echo "- Grafana: http://localhost:3000 (admin/admin)"
echo "- Metrics Endpoint: http://localhost:3001/metrics"
echo ""
echo "To stop monitoring: docker-compose -f docker-compose.monitoring.yml down"
echo "To stop all services: docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml down"
