FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY docker/frameworks/requirements-langgraph.txt .
RUN pip install --no-cache-dir -r requirements-langgraph.txt

# Copy framework runtime code
COPY backend/src/frameworks/runtimes/langgraph/ ./langgraph-runtime/

# Set environment variables
ENV PYTHONPATH=/app
ENV LANGGRAPH_RUNTIME_PORT=8001
ENV LANGGRAPH_RUNTIME_HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${LANGGRAPH_RUNTIME_PORT}/health || exit 1

# Expose port
EXPOSE ${LANGGRAPH_RUNTIME_PORT}

# Run the framework runtime
CMD ["python", "-m", "langgraph-runtime.main"]
