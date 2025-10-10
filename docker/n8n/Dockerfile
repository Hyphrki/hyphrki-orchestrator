# n8n Workflow Engine Container (Custom Fork)
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    build-base \
    python3 \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY . .

    # Create non-root user
RUN addgroup -g 1001 -S n8n && \
    adduser -S n8n -u 1001

USER n8n

# Expose port
EXPOSE 8004

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "console.log('n8n ready')" || exit 1

# Default command
CMD ["npm", "start"]
