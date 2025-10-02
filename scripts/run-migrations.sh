#!/bin/bash

# Database migration script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

# Database configuration
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-hyphrki_production}
DB_USER=${DB_USER:-hyphrki_user}
DB_PASSWORD=${DB_PASSWORD}

if [ -z "$DB_PASSWORD" ]; then
    echo -e "${RED}DB_PASSWORD environment variable is required${NC}"
    exit 1
fi

echo -e "${GREEN}Running database migrations for Hyphrki Orchestrator${NC}"

# Set PGPASSWORD for psql
export PGPASSWORD="$DB_PASSWORD"

# Test database connection
echo -e "${YELLOW}Testing database connection...${NC}"
if ! psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${RED}Failed to connect to database${NC}"
    echo "Please check your database configuration and ensure PostgreSQL is running"
    exit 1
fi

echo -e "${GREEN}Database connection successful!${NC}"

# Create migrations table if it doesn't exist
echo -e "${YELLOW}Creating migrations table...${NC}"
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) UNIQUE NOT NULL,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);"

# Run migrations
echo -e "${YELLOW}Running migrations...${NC}"

# Migration 1: Create users table
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);"

# Migration 2: Create agent_templates table
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS agent_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    workflow_definition JSONB NOT NULL,
    configuration_schema JSONB DEFAULT '{}',
    execution_modes JSONB DEFAULT '[\"api\"]',
    billing_model VARCHAR(50) DEFAULT 'usage_based',
    status VARCHAR(20) DEFAULT 'draft',
    version VARCHAR(20) DEFAULT '1.0.0',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'
);"

# Migration 3: Create agent_instances table
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS agent_instances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES agent_templates(id),
    organization_id UUID,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'inactive',
    configuration JSONB DEFAULT '{}',
    n8n_workflow_id VARCHAR(255),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_executed TIMESTAMP WITH TIME ZONE
);"

# Migration 4: Create execution_logs table
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instance_id UUID REFERENCES agent_instances(id),
    status VARCHAR(20) NOT NULL,
    input_data JSONB,
    output_data JSONB,
    error_message TEXT,
    execution_time_ms INTEGER,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP WITH TIME ZONE
);"

# Migration 5: Create organizations table
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);"

# Create indexes
echo -e "${YELLOW}Creating indexes...${NC}"

psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_agent_templates_category ON agent_templates(category);
CREATE INDEX IF NOT EXISTS idx_agent_templates_status ON agent_templates(status);
CREATE INDEX IF NOT EXISTS idx_agent_instances_template_id ON agent_instances(template_id);
CREATE INDEX IF NOT EXISTS idx_agent_instances_status ON agent_instances(status);
CREATE INDEX IF NOT EXISTS idx_execution_logs_instance_id ON execution_logs(instance_id);
CREATE INDEX IF NOT EXISTS idx_execution_logs_started_at ON execution_logs(started_at);
"

# Insert default admin user
echo -e "${YELLOW}Creating default admin user...${NC}"

ADMIN_PASSWORD_HASH=$(node -e "const bcrypt = require('bcrypt'); console.log(bcrypt.hashSync('admin123', 10));")

psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@hyphrki.com', '$ADMIN_PASSWORD_HASH', 'Admin User', 'super_admin')
ON CONFLICT (email) DO NOTHING;
"

echo -e "${GREEN}Database migrations completed successfully!${NC}"
echo -e "${YELLOW}Default admin credentials:${NC}"
echo "  Email: admin@hyphrki.com"
echo "  Password: admin123"
echo ""
echo "Please change the default password after first login!"
