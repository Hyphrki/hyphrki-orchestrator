#!/bin/bash

# N8N setup script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
N8N_PORT=${N8N_PORT:-5678}
N8N_DATA_DIR=${N8N_DATA_DIR:-/var/lib/n8n}
N8N_USER=${N8N_USER:-n8n}
N8N_GROUP=${N8N_GROUP:-n8n}

echo -e "${GREEN}Setting up N8N for Hyphrki Orchestrator${NC}"

# Check if N8N is already installed
if command -v n8n &> /dev/null; then
    echo -e "${YELLOW}N8N is already installed${NC}"
    n8n --version
else
    echo -e "${YELLOW}Installing N8N...${NC}"
    
    # Install N8N globally
    npm install -g n8n
    
    # Create N8N user and group
    if ! id "$N8N_USER" &>/dev/null; then
        sudo useradd -r -s /bin/false -d "$N8N_DATA_DIR" "$N8N_USER"
    fi
    
    # Create data directory
    sudo mkdir -p "$N8N_DATA_DIR"
    sudo chown -R "$N8N_USER:$N8N_GROUP" "$N8N_DATA_DIR"
fi

# Create N8N systemd service
echo -e "${YELLOW}Creating N8N systemd service...${NC}"

sudo tee /etc/systemd/system/n8n.service > /dev/null <<EOF
[Unit]
Description=n8n
After=network.target

[Service]
Type=simple
User=$N8N_USER
Group=$N8N_GROUP
WorkingDirectory=$N8N_DATA_DIR
ExecStart=/usr/bin/n8n start
Restart=always
RestartSec=10
Environment=N8N_BASIC_AUTH_ACTIVE=true
Environment=N8N_BASIC_AUTH_USER=admin
Environment=N8N_BASIC_AUTH_PASSWORD=$(openssl rand -base64 32)
Environment=N8N_HOST=0.0.0.0
Environment=N8N_PORT=$N8N_PORT
Environment=N8N_PROTOCOL=http
Environment=N8N_EDITOR_BASE_URL=http://localhost:$N8N_PORT
Environment=WEBHOOK_URL=http://localhost:$N8N_PORT

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and start N8N
sudo systemctl daemon-reload
sudo systemctl enable n8n
sudo systemctl start n8n

# Wait for N8N to start
echo -e "${YELLOW}Waiting for N8N to start...${NC}"
sleep 10

# Check if N8N is running
if systemctl is-active --quiet n8n; then
    echo -e "${GREEN}N8N is running successfully!${NC}"
    echo -e "${YELLOW}N8N Configuration:${NC}"
    echo "  URL: http://localhost:$N8N_PORT"
    echo "  Data Directory: $N8N_DATA_DIR"
    echo "  Service: n8n"
    echo ""
    echo "You can now access N8N at http://localhost:$N8N_PORT"
    echo "Default credentials will be shown in the service logs"
else
    echo -e "${RED}Failed to start N8N${NC}"
    sudo systemctl status n8n
    exit 1
fi
