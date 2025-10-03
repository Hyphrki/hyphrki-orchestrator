# Multi-stage build for Hyphrki Orchestrator (N8N-based)
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ curl git

# Install pnpm globally
RUN npm install -g pnpm@9

WORKDIR /app

# Copy N8N source
COPY n8n/ ./

# Install dependencies and build N8N
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Production stage
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache curl python3 make g++ git

# Install pnpm globally for runtime
RUN npm install -g pnpm@9

# Create app directory
WORKDIR /app

# Create nodejs user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built N8N from builder stage
COPY --from=builder /app ./

# Create directories and set permissions
RUN mkdir -p /home/nodejs/.n8n && \
    chown -R nodejs:nodejs /app /home/nodejs && \
    chmod -R 755 /home/nodejs/.n8n

# Switch to nodejs user
USER nodejs

# Expose N8N port
EXPOSE 5678

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:5678/healthz || exit 1

# Environment variables - Hyphrki Orchestrator
ENV N8N_PORT=5678
ENV N8N_PROTOCOL=http
ENV N8N_HOST=0.0.0.0
ENV DB_TYPE=postgresdb
ENV DB_POSTGRESDB_SCHEMA=n8n
ENV EXECUTIONS_PROCESS=main
ENV N8N_DIAGNOSTICS_ENABLED=false
ENV N8N_VERSION_NOTIFICATIONS_ENABLED=false
ENV N8N_PERSONALIZATION_ENABLED=false
ENV N8N_HIRING_BANNER_ENABLED=false
ENV N8N_TEMPLATES_ENABLED=false

# Start N8N directly
CMD ["pnpm", "start"]
