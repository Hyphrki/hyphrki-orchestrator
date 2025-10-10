# Security Implementation

This document describes the security measures implemented in the Orchestrator Platform.

## Encryption

### Data Encryption at Rest

The platform implements AES-256-GCM encryption for all Personally Identifiable Information (PII) and sensitive data:

- **User data**: email, firstName, lastName
- **Organization data**: name, description
- **Agent configurations**: name, description, config
- **Workflow data**: name, description, config
- **Execution data**: inputData, outputData

### Encryption Service

The `EncryptionService` provides:
- AES-256-GCM encryption/decryption
- Secure key generation
- Password hashing with scrypt
- Password strength validation

### Database Encryption

The `DatabaseEncryptionService` automatically encrypts/decrypts fields using Prisma middleware:
- Transparent encryption on write operations
- Transparent decryption on read operations
- Configurable encrypted fields per model

## Transport Layer Security (TLS)

### HTTPS Configuration

- TLS 1.2+ minimum version
- Strong cipher suites only
- Self-signed certificates for development
- Production certificates via environment variables

### Security Headers

The following security headers are set:
- `Strict-Transport-Security`: Enforces HTTPS
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-Frame-Options`: Prevents clickjacking
- `X-XSS-Protection`: XSS protection
- `Referrer-Policy`: Controls referrer information
- `Content-Security-Policy`: Prevents XSS and injection attacks
- `Permissions-Policy`: Restricts browser features

## Configuration

### Environment Variables

```bash
# Encryption
ENCRYPTION_KEY="your-64-character-hex-encryption-key-here"

# TLS (Production)
USE_TLS="true"
TLS_CERT_PATH="./certs/cert.pem"
TLS_KEY_PATH="./certs/key.pem"

# Application
NODE_ENV="production"
FRONTEND_URL="https://yourdomain.com"
```

### Generating Encryption Keys

```bash
# Generate a 256-bit encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Generating Self-Signed Certificates

```bash
# Generate private key
openssl genrsa -out key.pem 2048

# Generate certificate
openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

## Validation

### Encryption Validation

The system validates:
- Encryption key presence and format
- Encrypted fields configuration
- Encryption/decryption operations

### TLS Validation

The system validates:
- Certificate and key file existence
- TLS configuration in production
- Security header configuration

## Security Scanning

### Static Application Security Testing (SAST)

The platform uses SonarQube for comprehensive SAST:

- **Code Quality Analysis**: Cyclomatic complexity, code smells, duplications
- **Security Vulnerabilities**: SQL injection, XSS, CSRF, authentication issues
- **Coverage Analysis**: Test coverage requirements and reporting
- **Configuration**: Custom rules for NestJS and React applications

### Dependency Vulnerability Scanning

**Snyk** provides real-time dependency scanning:

- **Backend Dependencies**: Node.js/npm packages in backend/
- **Frontend Dependencies**: React and UI library packages
- **Infrastructure**: Docker and IaC vulnerability scanning
- **Automated PR Checks**: Blocks merges with critical vulnerabilities

### Dynamic Application Security Testing (DAST)

**OWASP ZAP** performs runtime security testing:

- **API Security**: RESTful API endpoint scanning
- **Authentication Testing**: JWT and session security
- **Injection Attacks**: SQL, NoSQL, XSS, command injection
- **Configuration**: Custom scan policies for the platform

### Container Security Scanning

**Trivy** scans container images for vulnerabilities:

- **Base Image Vulnerabilities**: OS-level security issues
- **Package Vulnerabilities**: Application dependency issues
- **Configuration Issues**: Dockerfile security best practices
- **CIS Benchmarks**: Container security compliance

## CI/CD Security Integration

### GitHub Actions Security Workflow

The `.github/workflows/security.yml` provides comprehensive scanning:

```yaml
# Triggers on PRs and main branch pushes
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  sonarcloud:    # SAST with SonarQube
  snyk:         # Dependency scanning
  container-security:  # Container vulnerability scanning
  zap-scan:     # DAST with OWASP ZAP
  security-summary:    # Results aggregation
```

### Security Gates

- **SonarQube Quality Gate**: Blocks PRs with critical issues
- **Snyk Policy**: Prevents vulnerable dependency merges
- **Container Scanning**: Fails builds with critical CVEs
- **ZAP Scan**: Reports runtime vulnerabilities

## Testing

### Encryption Tests

- Unit tests for encryption/decryption
- Database middleware tests
- Key rotation tests

### TLS Tests

- HTTPS connection tests
- Security header validation
- Certificate validation

### Security Scan Tests

- SAST rule validation
- Dependency audit testing
- Container security verification
- DAST automation testing

## Compliance

This implementation complies with:
- **Section 2.2.3**: SAST scanning integration
- **Section 4.1.3**: Dependency vulnerability scanning
- **Section 4.1.4**: AES-256 encryption for PII
- **Section 4.1.4**: TLS 1.2+ for data in transit
- **OWASP Top 10**: Comprehensive security coverage
- Industry security best practices
