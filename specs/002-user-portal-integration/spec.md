# User Portal Integration Specification

## Constitution Compliance
This specification must adhere to the Orchestrator Engineering Constitution. Key compliance areas:

- **Technology Standards** (Section 3.0): All proposed technologies must be from approved stacks
- **Security Requirements** (Section 4.1): OWASP Top 10 compliance, OAuth 2.0/OIDC integration
- **Testing Requirements** (Section 2.2): 80% test coverage minimum, testing pyramid approach
- **Documentation Standards** (Section 4.3): API documentation, README requirements, ADRs

## Clarifications

### Session 2025-10-06
- Q: Separate deployment strategy → A: User portal and admin portal as independent applications with shared authentication
- Q: Communication protocol → A: REST API + WebSocket for real-time updates
- Q: Data sharing strategy → A: Shared database with proper access controls and views
- Q: Authentication flow → A: Single sign-on with JWT tokens across both portals

### Session 2025-10-06 (Continued)
- Q: What specific features or capabilities should be explicitly declared as out-of-scope for the user portal MVP? → A: Portal UI already built, focus on connecting components to orchestrator backend
- Q: How should the user portal handle error states, empty states, and loading states for key user journeys? → A: Toast notifications for errors, progress bars for loading, detailed empty state guidance
- Q: What data export and import capabilities should the user portal support for user data portability? → A: CSV, PDF, and any other formats as needed
- Q: How should the user portal handle concurrent edit conflicts when multiple users interact with the same agent or workflow? → A: No user access to edit templates - users find agents in marketplace, answer preconfigured questions, each deployment creates separate user-specific copy with no cross-user access
- Q: What specific recovery time objectives (RTO) and recovery point objectives (RPO) should the user portal meet for different failure scenarios? → A: RTO: 15 minutes, RPO: 5 minutes for authentication and core features
**Project**: Orchestrator User Portal Integration
**Version**: 1.0.0
**Created**: 2025-10-06
**Last Updated**: 2025-10-06

## Scope & Requirements

### In Scope
- **Core Focus**: User portal UI is already built - integration work focuses on connecting existing components to orchestrator backend for full functionality
- **Agent Deployment Model**: Users discover agents in marketplace, answer preconfigured questions, each deployment creates separate user-specific copy with no cross-user access
- **User Capabilities**: Non-technical users can deploy and manage agents through guided workflows
- **Data Portability**: Support for CSV, PDF, and other export formats for user data

### Out of Scope
- **Template Editing**: Users cannot modify agent templates or workflow definitions
- **Cross-User Access**: No access to other users' deployed agents or configurations
- **Advanced Development**: No code editing or custom agent development capabilities

### Functional Requirements

1. **FR-001**: Backend Integration for Existing UI
   - Acceptance Criteria:
     - [ ] Analyze existing user portal UI components and structure
     - [ ] Connect existing UI components to orchestrator backend APIs
     - [ ] Implement data fetching and state management for existing components
     - [ ] Preserve existing UI/UX while adding backend functionality
     - [ ] Establish WebSocket connections for real-time updates
   - Testing Requirements:
     - Unit tests: 80% coverage for components and utilities
     - Integration tests: API connectivity and data flow
     - E2E tests: User journey from login to dashboard

2. **FR-002**: Authentication Integration
   - Acceptance Criteria:
     - [ ] Implement OAuth 2.0/OIDC authentication flow
     - [ ] Shared authentication state between admin and user portals
     - [ ] JWT token management with refresh capabilities
     - [ ] User session persistence and security
     - [ ] Role-based access control for user portal features
   - Testing Requirements:
     - Unit tests: 80% coverage for auth utilities and guards
     - Integration tests: OAuth flow and token refresh
     - E2E tests: Complete login/logout workflow

3. **FR-003**: User Dashboard Implementation
   - Acceptance Criteria:
     - [ ] Personal dashboard showing user's agents and workflows
     - [ ] Agent execution status and monitoring
     - [ ] Usage analytics and billing information
     - [ ] Quick actions for common user tasks
     - [ ] Real-time notifications and alerts
   - Testing Requirements:
     - Unit tests: 80% coverage for dashboard components
     - Integration tests: Data fetching and real-time updates
     - E2E tests: Dashboard interaction and navigation

4. **FR-004**: Agent Marketplace Integration (User View)
   - Acceptance Criteria:
     - [ ] Browse and search available agents from marketplace
     - [ ] Guided agent deployment with preconfigured question workflow
     - [ ] Automatic creation of user-specific agent copies upon deployment
     - [ ] User-specific agent management (start/stop/configure) with isolated access
     - [ ] Agent usage tracking and cost monitoring per user
     - [ ] Integration with admin portal agent publishing and question configuration
   - Testing Requirements:
     - Unit tests: 80% coverage for marketplace components
     - Integration tests: Agent installation and deployment
     - E2E tests: Complete agent discovery to deployment workflow

5. **FR-005**: Inter-Portal Communication System
   - Acceptance Criteria:
     - [ ] REST API endpoints for cross-portal data exchange
     - [ ] WebSocket connections for real-time updates
     - [ ] Shared database access with proper security controls
     - [ ] Event-driven communication between portals
     - [ ] User action synchronization (admin actions affecting user portal)
   - Testing Requirements:
     - Unit tests: 80% coverage for API clients and WebSocket handlers
     - Integration tests: Cross-portal data synchronization
     - E2E tests: Real-time communication scenarios

6. **FR-006**: User Profile and Settings
   - Acceptance Criteria:
     - [ ] User profile management with personal information
     - [ ] Account settings and preferences
     - [ ] Billing and subscription management
     - [ ] API key generation and management
     - [ ] Security settings (password, 2FA)
     - [ ] Data export capabilities (CSV, PDF, and other formats)
   - Testing Requirements:
     - Unit tests: 80% coverage for profile components
     - Integration tests: Settings persistence and validation
     - E2E tests: Profile update and settings workflow

7. **FR-007**: Workflow Execution Monitoring (User View)
   - Acceptance Criteria:
     - [ ] Real-time workflow execution visualization
     - [ ] Execution logs and error tracking
     - [ ] Performance metrics and analytics
     - [ ] Workflow debugging and troubleshooting tools
     - [ ] Historical execution data and reporting
   - Testing Requirements:
     - Unit tests: 80% coverage for monitoring components
     - Integration tests: Real-time data streaming
     - E2E tests: Workflow monitoring and debugging

### Non-Functional Requirements

#### Performance Requirements
- **NFR-001**: Page load time < 2 seconds (95th percentile)
- **NFR-002**: API response time < 500ms for user actions (95th percentile)
- **NFR-003**: Support for 1000+ concurrent users (5000 concurrent sessions)
- **NFR-004**: Real-time updates < 100ms latency (95th percentile)

#### Reliability Requirements
- **NFR-019**: RTO: 15 minutes, RPO: 5 minutes for authentication and core features
- **NFR-020**: 99.9% uptime SLA for user portal services

#### Security Requirements
- **NFR-005**: OAuth 2.0 + OIDC authentication (per Section 4.1.2)
- **NFR-006**: JWT token encryption and secure storage (per Section 4.1.4)
- **NFR-007**: OWASP Top 10 compliance for user portal (per Section 4.1.1)
- **NFR-008**: Cross-site scripting (XSS) protection
- **NFR-009**: Cross-site request forgery (CSRF) protection
- **NFR-010**: Secure inter-portal communication with TLS

#### Observability Requirements
- **NFR-011**: Structured JSON logging with correlationId (per Section 4.2.1)
- **NFR-012**: User action analytics and performance metrics (per Section 4.2.2)
- **NFR-013**: Error tracking and user experience monitoring
- **NFR-014**: Real-time alerting for user portal issues

#### Quality Requirements
- **NFR-015**: 80% minimum test coverage (per Section 2.2.2)
- **NFR-016**: Code quality gates (linting, formatting, type checking)
- **NFR-017**: Accessibility compliance (WCAG 2.1 Level AA)
- **NFR-018**: Error handling with toast notifications for errors, progress bars for loading, detailed empty state guidance

## Technical Architecture

### System Architecture
- **Architecture Pattern**: Separate frontend applications with shared backend services
- **Deployment Strategy**: Independent deployment pipelines for admin and user portals
- **Communication Protocol**: REST API + WebSocket for real-time features
- **Data Sharing**: Shared database with row-level security and API mediation

### Technology Stack

#### User Portal Frontend
- **Framework**: Next.js 14+ with App Router (per Section 3.1.2)
- **Language**: TypeScript with strict mode (per Section 3.1.1)
- **State Management**: TanStack Query + Zustand (per Section 3.1.3)
- **Styling**: Tailwind CSS with shadcn/ui components (per Section 3.1.4)
- **Accessibility**: WCAG 2.1 Level AA compliance (per Section 3.1.5)
- **Real-time Features**: WebSocket integration for live updates

#### Shared Backend Integration
- **API Client**: Custom TypeScript client for backend APIs
- **Authentication**: NextAuth.js with OAuth 2.0/OIDC providers
- **WebSocket**: Socket.io client for real-time communication
- **Data Fetching**: TanStack Query for server state management

#### Communication Layer
- **REST API**: Axios-based HTTP client with interceptors
- **WebSocket**: Socket.io for real-time events
- **Authentication**: JWT token management with automatic refresh
- **Error Handling**: Global error boundaries and retry logic

### Data Architecture
- **Shared Database**: PostgreSQL with the existing orchestrator schema
- **Access Control**: Row-level security policies for user data isolation
- **API Mediation**: Backend APIs provide controlled access to shared data
- **Caching Strategy**: Redis for session data and API response caching

### Integration Points

#### Authentication Integration
- **OAuth Provider**: Shared Auth0/OIDC configuration
- **Token Sharing**: JWT tokens valid across both portals
- **Session Management**: Shared Redis session store
- **User Synchronization**: Real-time user data sync between portals

#### Marketplace Integration
- **Agent Catalog**: Shared marketplace data via API
- **Installation Workflow**: User portal triggers agent deployment via admin APIs
- **Usage Tracking**: Real-time usage metrics shared between portals
- **Billing Integration**: Subscription and usage data synchronization

#### Workflow Execution
- **Execution Monitoring**: Real-time workflow status via WebSocket
- **Log Streaming**: Live execution logs to user portal
- **Performance Data**: Metrics and analytics shared via APIs
- **Error Notifications**: Real-time alerts for execution failures

## Testing Strategy

### Unit Testing (≥70% effort) (per Section 2.2.1)
- **Framework**: Jest with React Testing Library
- **Coverage Target**: 80% minimum (per Section 2.2.2)
- **Mocking Strategy**: Mock API calls, WebSocket connections, and external services

### Integration Testing (~20% effort) (per Section 2.2.1)
- **API Integration**: Backend API connectivity and data flow
- **WebSocket Integration**: Real-time communication testing
- **Authentication Integration**: OAuth flow and token management
- **Cross-Portal Integration**: Data synchronization between portals

### End-to-End Testing (≤10% effort) (per Section 2.2.1)
- **Critical User Paths**:
  - Complete user registration and login flow
  - Agent discovery, installation, and management
  - Workflow execution monitoring
  - Profile and settings management
  - Billing and subscription workflow
- **Framework**: Playwright for E2E testing
- **Environment**: Staging environment with shared backend

## Security Considerations

### Authentication & Authorization
- **Identity Provider**: Shared Auth0 with OAuth 2.0 + OIDC (per Section 4.1.2)
- **Authorization Model**: RBAC with portal-specific permissions
- **Multi-tenancy**: User data isolation with proper access controls
- **Session Security**: Secure JWT handling and automatic token refresh

### Data Protection
- **Encryption at Rest**: AES-256 for sensitive user data (per Section 4.1.4)
- **Encryption in Transit**: TLS 1.3 for all communications (per Section 4.1.4)
- **PII Handling**: Encrypted storage with proper data classification

### OWASP Top 10 Compliance (per Section 4.1.1)
- **A01:2021-Broken Access Control**: JWT validation, user context verification
- **A02:2021-Cryptographic Failures**: TLS 1.3, secure token storage
- **A03:2021-Injection**: Parameterized queries, input sanitization
- **A04:2021-Insecure Design**: Secure by design, threat modeling
- **A05:2021-Security Misconfiguration**: Environment-based config, secrets management
- **A06:2021-Vulnerable Components**: Automated dependency updates
- **A07:2021-Identification & Authentication Failures**: OAuth 2.0/OIDC implementation
- **A08:2021-Software Integrity Failures**: Code signing, CI/CD security
- **A09:2021-Security Logging & Monitoring**: Comprehensive audit logging
- **A10:2021-Server-Side Request Forgery**: Input validation, allowlists

### Inter-Portal Security
- **API Authentication**: Mutual TLS for portal-to-portal communication
- **Data Validation**: Schema validation for all cross-portal data exchange
- **Rate Limiting**: API rate limits to prevent abuse
- **Audit Logging**: Comprehensive logging of cross-portal operations

## Observability & Monitoring

### Logging
- **Format**: Structured JSON to stdout (per Section 4.2.1)
- **Correlation ID**: Required for all user actions (per Section 4.2.1)
- **Log Levels**: DEBUG, INFO, WARN, ERROR, FATAL
- **User Action Logging**: Detailed user interaction tracking

### Metrics
- **User Metrics**: Page views, user engagement, conversion rates
- **Performance Metrics**: Page load times, API response times
- **Business Metrics**: Agent installations, workflow executions
- **Error Metrics**: Client-side errors, API failures

### Tracing
- **Framework**: OpenTelemetry integration (per Section 4.2.3)
- **User Journey Tracing**: Complete user action tracing
- **Cross-Portal Tracing**: Request tracing between portals
- **Performance Tracing**: Frontend performance monitoring

## Documentation Requirements

### API Documentation
- **Format**: OpenAPI v3.0 specification for user portal APIs (per Section 4.3.1)
- **User Portal APIs**: Authentication, user management, marketplace integration
- **Interactive Docs**: Swagger UI for API exploration

### Project Documentation
- **README.md**: User portal setup, development, and deployment guide
- **User Guide**: End-user documentation for portal features
- **Integration Guide**: Admin portal integration documentation
- **Deployment Guide**: Independent deployment procedures

## Deployment & Operations

### CI/CD Pipeline
1. Source Checkout
2. Linting & Formatting Check
3. Unit & Integration Tests
4. SAST & Dependency Vulnerability Scans
5. Build Artifact (Docker image)
6. Publish Artifact to Registry
7. Deploy to Staging Environment
8. E2E Tests in Staging
9. Deploy to Production (with approval)

### Environment Configuration
- **Configuration Management**: Environment-based configuration (per Section 3.2.5)
- **Secrets Management**: Shared HashiCorp Vault instance (per Section 3.2.5)
- **Environment Variables**: Separate configs for each deployment environment

### Container Orchestration
- **Development**: Docker Compose for local development
- **Staging**: Independent Kubernetes deployment
- **Production**: Independent Kubernetes deployment with auto-scaling
- **Resource Allocation**: Separate resource quotas for user portal
- **Network Security**: Isolated network with controlled access to shared services

### Inter-Portal Deployment
- **Independent Pipelines**: Separate CI/CD for admin and user portals
- **Shared Services**: Common backend services and database
- **Version Compatibility**: API versioning for backward compatibility
- **Rollback Strategy**: Independent rollback capabilities

## Risk Assessment

### Technical Risks
- **Risk 1**: Cross-portal data synchronization complexity - Mitigation: Comprehensive testing and monitoring
- **Risk 2**: Authentication state management across portals - Mitigation: Shared session store and proper token handling
- **Risk 3**: Real-time communication reliability - Mitigation: WebSocket fallback and retry mechanisms
- **Risk 4**: Performance impact on shared backend - Mitigation: API optimization and caching strategies

### Security Risks
- **Risk 1**: Data leakage between portals - Mitigation: Strict access controls and data validation
- **Risk 2**: Authentication bypass - Mitigation: Proper JWT validation and session management
- **Risk 3**: Cross-site vulnerabilities - Mitigation: CORS policies and input sanitization

### Operational Risks
- **Risk 1**: Deployment coordination - Mitigation: Automated testing and gradual rollout
- **Risk 2**: Shared resource contention - Mitigation: Resource monitoring and quotas
- **Risk 3**: Breaking changes in shared APIs - Mitigation: API versioning and compatibility testing

## Acceptance Criteria

### Definition of Done
- [ ] User portal transformed from static site to full application
- [ ] Authentication integration with admin portal
- [ ] User dashboard with agent and workflow management
- [ ] Marketplace integration for agent discovery and installation
- [ ] Real-time communication between portals
- [ ] Security and performance requirements met
- [ ] Comprehensive test coverage achieved
- [ ] Documentation complete and reviewed

### Quality Gates
- [ ] Unit test coverage ≥ 80%
- [ ] Integration tests passing
- [ ] E2E tests passing in staging
- [ ] Security scans passing
- [ ] Performance benchmarks met
- [ ] Accessibility compliance verified
- [ ] Cross-browser compatibility confirmed

### MVP Deliverables
- [ ] Functional user portal application
- [ ] Integrated authentication system
- [ ] Basic dashboard and agent management
- [ ] Marketplace browsing and installation
- [ ] Real-time updates and notifications
- [ ] Production deployment configuration
- [ ] User documentation and guides
