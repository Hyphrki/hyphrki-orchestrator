-- Orchestrator Platform Database Initialization
-- This script runs when the PostgreSQL container starts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create N8N database
CREATE DATABASE n8n;

-- Note: Actual table creation and migrations are handled by Prisma
