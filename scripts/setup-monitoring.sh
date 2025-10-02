#!/bin/bash

# Monitoring setup script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up monitoring for Hyphrki Orchestrator${NC}"

# Create monitoring directory
echo -e "${YELLOW}Creating monitoring directory...${NC}"
mkdir -p monitoring

# Create log rotation configuration
echo -e "${YELLOW}Creating log rotation configuration...${NC}"
cat > monitoring/logrotate.conf << 'EOF'
/Users/dharshansenthil/Desktop/Hyphrki/projectZero/hyphrki-orchestrator/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Create health check script
echo -e "${YELLOW}Creating health check script...${NC}"
cat > monitoring/health-check.sh << 'EOF'
#!/bin/bash

# Health check script for Hyphrki Orchestrator
set -e

APP_URL="http://localhost:3001"
HEALTH_ENDPOINT="$APP_URL/api/health"

# Check if application is responding
if curl -f "$HEALTH_ENDPOINT" > /dev/null 2>&1; then
    echo "✅ Application is healthy"
    exit 0
else
    echo "❌ Application is not responding"
    exit 1
fi
EOF

chmod +x monitoring/health-check.sh

# Create monitoring dashboard HTML
echo -e "${YELLOW}Creating monitoring dashboard...${NC}"
cat > monitoring/dashboard.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hyphrki Orchestrator - Monitoring Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { background: white; padding: 20px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .status { padding: 10px; border-radius: 4px; margin: 10px 0; }
        .healthy { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .unhealthy { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .metric { text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; color: #007bff; }
        .metric-label { color: #666; margin-top: 5px; }
        button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 5px; }
        button:hover { background: #0056b3; }
        .log-container { background: #f8f9fa; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 12px; max-height: 300px; overflow-y: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hyphrki Orchestrator - Monitoring Dashboard</h1>
        
        <div class="card">
            <h2>Application Status</h2>
            <div id="app-status" class="status">Checking...</div>
            <button onclick="checkHealth()">Refresh Status</button>
        </div>

        <div class="card">
            <h2>System Metrics</h2>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value" id="uptime">-</div>
                    <div class="metric-label">Uptime</div>
                </div>
                <div class="metric">
                    <div class="metric-value" id="memory">-</div>
                    <div class="metric-label">Memory Usage</div>
                </div>
                <div class="metric">
                    <div class="metric-value" id="cpu">-</div>
                    <div class="metric-label">CPU Usage</div>
                </div>
                <div class="metric">
                    <div class="metric-value" id="requests">-</div>
                    <div class="metric-label">Total Requests</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>Recent Logs</h2>
            <button onclick="loadLogs()">Refresh Logs</button>
            <div id="logs" class="log-container">Loading logs...</div>
        </div>
    </div>

    <script>
        async function checkHealth() {
            const statusDiv = document.getElementById('app-status');
            try {
                const response = await fetch('/api/health');
                if (response.ok) {
                    statusDiv.className = 'status healthy';
                    statusDiv.textContent = '✅ Application is healthy';
                } else {
                    statusDiv.className = 'status unhealthy';
                    statusDiv.textContent = '❌ Application returned error';
                }
            } catch (error) {
                statusDiv.className = 'status unhealthy';
                statusDiv.textContent = '❌ Application is not responding';
            }
        }

        async function loadLogs() {
            const logsDiv = document.getElementById('logs');
            try {
                const response = await fetch('/api/logs');
                const logs = await response.text();
                logsDiv.textContent = logs;
            } catch (error) {
                logsDiv.textContent = 'Error loading logs: ' + error.message;
            }
        }

        // Auto-refresh every 30 seconds
        setInterval(() => {
            checkHealth();
            loadLogs();
        }, 30000);

        // Initial load
        checkHealth();
        loadLogs();
    </script>
</body>
</html>
EOF

# Create systemd service for log rotation
echo -e "${YELLOW}Creating systemd service for log rotation...${NC}"
cat > monitoring/hyphrki-logrotate.service << 'EOF'
[Unit]
Description=Log rotation for Hyphrki Orchestrator
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/sbin/logrotate /Users/dharshansenthil/Desktop/Hyphrki/projectZero/hyphrki-orchestrator/monitoring/logrotate.conf
User=root

[Install]
WantedBy=multi-user.target
EOF

# Create systemd timer for log rotation
cat > monitoring/hyphrki-logrotate.timer << 'EOF'
[Unit]
Description=Run log rotation for Hyphrki Orchestrator daily
Requires=hyphrki-logrotate.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
EOF

echo -e "${GREEN}Monitoring setup completed!${NC}"
echo -e "${YELLOW}Monitoring files created:${NC}"
echo "  - monitoring/logrotate.conf (log rotation config)"
echo "  - monitoring/health-check.sh (health check script)"
echo "  - monitoring/dashboard.html (monitoring dashboard)"
echo "  - monitoring/hyphrki-logrotate.service (systemd service)"
echo "  - monitoring/hyphrki-logrotate.timer (systemd timer)"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Open monitoring/dashboard.html in your browser"
echo "2. Set up log rotation: sudo cp monitoring/*.service monitoring/*.timer /etc/systemd/system/"
echo "3. Enable timer: sudo systemctl enable hyphrki-logrotate.timer"
echo "4. Start timer: sudo systemctl start hyphrki-logrotate.timer"
