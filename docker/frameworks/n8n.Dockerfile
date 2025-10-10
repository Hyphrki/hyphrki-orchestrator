FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    curl \
    build-base \
    python3 \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY docker/frameworks/package-n8n.json ./package.json

# Install Node.js dependencies
RUN npm install --production

# Copy framework runtime code
COPY backend/src/frameworks/runtimes/n8n/ ./n8n-runtime/

# Set environment variables
ENV NODE_ENV=production
ENV N8N_RUNTIME_PORT=8004
ENV N8N_RUNTIME_HOST=0.0.0.0

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${N8N_RUNTIME_PORT}/health || exit 1

# Expose port
EXPOSE ${N8N_RUNTIME_PORT}

# Run the framework runtime
CMD ["node", "n8n-runtime/main.js"]
