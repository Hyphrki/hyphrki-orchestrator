#!/bin/bash

# File upload setup script for Hyphrki Orchestrator
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
UPLOAD_DIR=${UPLOAD_DIR:-/var/www/hyphrki/uploads}
UPLOAD_USER=${UPLOAD_USER:-www-data}
UPLOAD_GROUP=${UPLOAD_GROUP:-www-data}

echo -e "${GREEN}Setting up file upload directories for Hyphrki Orchestrator${NC}"

# Create upload directories
echo -e "${YELLOW}Creating upload directories...${NC}"

sudo mkdir -p "$UPLOAD_DIR"/{templates,icons,assets,exports}
sudo mkdir -p "$UPLOAD_DIR"/templates/{workflows,configurations}
sudo mkdir -p "$UPLOAD_DIR"/icons/{agents,categories,status}
sudo mkdir -p "$UPLOAD_DIR"/assets/{images,documents,exports}

# Set proper permissions
echo -e "${YELLOW}Setting permissions...${NC}"

sudo chown -R "$UPLOAD_USER:$UPLOAD_GROUP" "$UPLOAD_DIR"
sudo chmod -R 755 "$UPLOAD_DIR"

# Create .htaccess for security (if using Apache)
if command -v apache2 &> /dev/null; then
    echo -e "${YELLOW}Creating .htaccess for Apache...${NC}"
    
    sudo tee "$UPLOAD_DIR/.htaccess" > /dev/null <<EOF
# Deny access to sensitive files
<Files "*.env">
    Order allow,deny
    Deny from all
</Files>

<Files "*.log">
    Order allow,deny
    Deny from all
</Files>

# Allow only specific file types
<FilesMatch "\.(jpg|jpeg|png|gif|svg|pdf|doc|docx|txt|json)$">
    Order allow,deny
    Allow from all
</FilesMatch>

# Deny everything else
<FilesMatch "^(?!.*\.(jpg|jpeg|png|gif|svg|pdf|doc|docx|txt|json)$).*$">
    Order allow,deny
    Deny from all
</FilesMatch>
EOF
fi

# Create nginx configuration (if using nginx)
if command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Creating nginx configuration...${NC}"
    
    sudo tee /etc/nginx/sites-available/hyphrki-uploads > /dev/null <<EOF
server {
    listen 80;
    server_name uploads.hyphrki.com;
    root $UPLOAD_DIR;
    index index.html;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # File upload limits
    client_max_body_size 10M;
    
    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
    
    location ~ \.(env|log)$ {
        deny all;
    }
    
    # Allow only specific file types
    location ~* \.(jpg|jpeg|png|gif|svg|pdf|doc|docx|txt|json)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Deny everything else
    location / {
        deny all;
    }
}
EOF
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/hyphrki-uploads /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
fi

echo -e "${GREEN}File upload setup completed successfully!${NC}"
echo -e "${YELLOW}Upload Configuration:${NC}"
echo "  Upload Directory: $UPLOAD_DIR"
echo "  Owner: $UPLOAD_USER:$UPLOAD_GROUP"
echo "  Permissions: 755"
echo "  Max File Size: 10MB"
echo "  Allowed Types: jpg, jpeg, png, gif, svg, pdf, doc, docx, txt, json"
