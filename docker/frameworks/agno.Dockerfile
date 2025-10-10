FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY docker/frameworks/requirements-agno.txt .
RUN pip install --no-cache-dir -r requirements-agno.txt

# Copy framework runtime code
COPY backend/src/frameworks/runtimes/agno/ ./agno-runtime/

# Set environment variables
ENV PYTHONPATH=/app
ENV AGNO_RUNTIME_PORT=8002
ENV AGNO_RUNTIME_HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${AGNO_RUNTIME_PORT}/health || exit 1

# Expose port
EXPOSE ${AGNO_RUNTIME_PORT}

# Run the framework runtime
CMD ["python", "-m", "agno-runtime.main"]
