#!/usr/bin/env python3
"""
CrewAI Runtime for Orchestrator Platform
"""

import os
import asyncio
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from prometheus_client import make_asgi_app, Counter, Histogram
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="CrewAI Runtime", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus metrics
REQUEST_COUNT = Counter('crewai_requests_total', 'Total requests to CrewAI runtime', ['method', 'endpoint'])
REQUEST_LATENCY = Histogram('crewai_request_latency_seconds', 'Request latency in seconds', ['method', 'endpoint'])

@app.middleware("http")
async def add_prometheus_metrics(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time

    REQUEST_COUNT.labels(method=request.method, endpoint=request.url.path).inc()
    REQUEST_LATENCY.labels(method=request.method, endpoint=request.url.path).observe(duration)

    return response

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "crewai-runtime"}

@app.post("/execute")
async def execute_crew(request: Request):
    """
    Execute a CrewAI crew
    """
    try:
        data = await request.json()
        crew_config = data.get("config", {})
        inputs = data.get("inputs", {})

        # TODO: Implement actual CrewAI crew execution
        # For now, return a mock response
        result = {
            "status": "success",
            "crew_id": crew_config.get("id", "mock-crew"),
            "execution_id": f"exec-{int(time.time())}",
            "output": {
                "message": "CrewAI crew executed successfully",
                "inputs": inputs
            }
        }

        logger.info(f"Executed CrewAI crew: {result['execution_id']}")
        return result

    except Exception as e:
        logger.error(f"Error executing CrewAI crew: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/crews")
async def list_crews():
    """List available CrewAI crews"""
    # TODO: Implement actual crew listing
    return {
        "crews": [
            {
                "id": "sample-crew",
                "name": "Sample CrewAI Crew",
                "description": "A sample crew for testing"
            }
        ]
    }

@app.post("/crews")
async def create_crew(request: Request):
    """Create a new CrewAI crew"""
    try:
        data = await request.json()
        crew_config = data.get("config", {})

        # TODO: Implement actual crew creation
        crew = {
            "id": f"crew-{int(time.time())}",
            "name": crew_config.get("name", "Unnamed Crew"),
            "config": crew_config,
            "created_at": time.time()
        }

        logger.info(f"Created CrewAI crew: {crew['id']}")
        return crew

    except Exception as e:
        logger.error(f"Error creating CrewAI crew: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add Prometheus metrics endpoint
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

if __name__ == "__main__":
    port = int(os.getenv("CREWAI_RUNTIME_PORT", "8003"))
    host = os.getenv("CREWAI_RUNTIME_HOST", "0.0.0.0")

    logger.info(f"Starting CrewAI Runtime on {host}:{port}")
    uvicorn.run(app, host=host, port=port)
