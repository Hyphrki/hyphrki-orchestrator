# Production build for Hyphrki Orchestrator with N8N
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache curl python3 make g++ git

# Install pnpm
RUN npm install -g pnpm@9

# Create app directory
WORKDIR /app

# Create nodejs user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy orchestrator package files
COPY package*.json ./

# Install orchestrator dependencies
RUN npm ci --only=production

# Copy N8N source (we'll build it at runtime)
COPY n8n/ ./n8n/

# Copy orchestrator source
COPY src/ ./src/
COPY public/ ./public/

# Create directories and set permissions
RUN mkdir -p logs n8n_data /home/nodejs/.n8n && \
    chown -R nodejs:nodejs /app /home/nodejs && \
    chmod -R 755 /home/nodejs/.n8n

# Switch to nodejs user
USER nodejs

# Expose ports
EXPOSE 5678 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5678/health || exit 1

# Start the application
CMD ["npm", "start"]
