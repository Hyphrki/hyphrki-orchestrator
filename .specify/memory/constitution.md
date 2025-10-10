<!--
Sync Impact Report:
Version change: 1.0.0 → 2.0.0
Modified principles: None (initial creation)
Added sections: Complete Enterprise Engineering Standards implementation
Removed sections: None
Templates requiring updates: ✅ updated
- .specify/templates/plan-template.md
- .specify/templates/spec-template.md  
- .specify/templates/tasks-template.md
- .specify/templates/commands/constitution.md
Follow-up TODOs: None
-->

# Orchestrator Engineering Constitution
Version: 2.0.0

Status: Active

Owner: Architecture Guild

Ratification Date: 2024-10-06

Last Amended: 2024-12-19

## 1.0 Introduction & Guiding Philosophy

### 1.1 Purpose
This document establishes the definitive set of standards, practices, and principles for all software development within Orchestrator. Its purpose is to ensure the creation of software that is Secure, Scalable, Maintainable, and Resilient. Adherence to these standards is mandatory for all engineering personnel and technology partners.

### 1.2 Guiding Philosophy
Our engineering culture is founded on the following core principles:

- **Clarity Over Cleverness**: Code is a form of communication. It will be read far more often than it is written. Optimize for readability and simplicity. Complex solutions require extensive justification and documentation.

- **Consistency is King**: A uniform approach to architecture, style, and process reduces cognitive load and accelerates development. We follow established patterns to ensure predictability across our entire codebase.

- **You Build It, You Run It (YBIYRI)**: Teams are accountable for the entire lifecycle of their applications, including development, testing, deployment, and operational support. This principle fosters deep ownership and higher-quality outcomes.

- **Secure by Design**: Security is a foundational, non-negotiable aspect of our engineering process, not an afterthought. Every engineer is responsible for writing secure code.

- **Automate to Accelerate**: We employ automation at every stage of the software development lifecycle (SDLC) to enforce standards, improve quality, and reduce the potential for human error.

## 2.0 Software Development Lifecycle (SDLC) Process

### 2.1 Version Control: Git
All source code must be stored in the company's centralized Git repository.

#### 2.1.1 Branching Strategy: GitFlow
We mandate the GitFlow branching model:

- **main**: This branch is the source of truth for production. It must always be stable and deployable. Direct commits are forbidden. Merges only occur from release or hotfix branches.

- **develop**: The primary integration branch. All feature branches are merged into develop. Nightly builds and deployments to the Staging environment originate here.

- **feature/<ticket-id>-<short-description>**: All new development work must be performed in a feature branch, created from develop. Example: feature/PROJ-123-user-authentication-service.

- **release/<version-number>**: Created from develop when preparing for a production release (e.g., release/v1.2.0). This branch is for stabilization, final testing, and documentation. Only critical bug fixes are permitted.

- **hotfix/<ticket-id>**: Created from main to address an urgent production issue. It is merged back into both main and develop upon completion.

#### 2.1.2 Commit Message Standard: Conventional Commits
We enforce the Conventional Commits v1.0.0 specification. This is critical for automated changelog generation and semantic versioning.

**Format**: `<type>(<scope>): <subject>`

**Allowed Types**:
- feat: A new feature for the user
- fix: A bug fix for the user
- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- docs: Documentation only changes
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (formatting, etc.)
- test: Adding missing tests or correcting existing tests

**Example**: `feat(api): add endpoint for user profile retrieval`

#### 2.1.3 Pull Requests (PRs)
- PRs are the sole mechanism for merging code into develop and main
- A PR must receive a minimum of two (2) approvals from other team members before it can be merged
- The PR description must follow the repository's template, linking to the corresponding work item and providing a clear explanation of the changes and the rationale behind them
- All automated CI checks must pass before a PR is eligible for merging

### 2.2 Code Quality & Testing Strategy

#### 2.2.1 The Testing Pyramid
We mandate a testing strategy that emphasizes a strong foundation of fast, reliable unit tests:

- **Unit Tests (≥70% of effort)**: Test a single function, class, or component in complete isolation from its dependencies (which should be mocked or stubbed). They must be fast (ms execution time).

- **Integration Tests (~20% of effort)**: Test the interaction and data flow between several components, such as an API controller, a service, and a database repository.

- **End-to-End (E2E) Tests (≤10% of effort)**: Test a complete user workflow through the entire application stack. These are reserved for critical "happy path" scenarios only, due to their slow and brittle nature.

#### 2.2.2 Test Coverage
All new or modified code must meet a minimum of 80% line coverage for unit tests. This is a non-negotiable quality gate enforced by the CI pipeline.

#### 2.2.3 Static & Dynamic Analysis
- **SAST (Static Application Security Testing)**: Code is automatically scanned for quality issues, bugs, and security vulnerabilities using SonarQube before merging. The quality gate must pass.
- **DAST (Dynamic Application Security Testing)**: Deployed applications in staging environments are subject to automated DAST scans to identify runtime vulnerabilities.

## 3.0 Technology-Specific Standards

### 3.1 Frontend (Web Applications)

#### 3.1.1 Language
TypeScript is mandatory. The tsconfig.json file must have strict: true enabled. The any type is forbidden except in rare, explicitly justified cases.

#### 3.1.2 Framework
React (v18+) is the standard framework.

**Component Architecture**: All components must be functional components utilizing Hooks. Class components are prohibited in new code.

#### 3.1.3 State Management
- **Server State**: Use TanStack Query (React Query) to manage the entire lifecycle of server data (fetching, caching, synchronization, error handling).
- **Global UI State**: Use Zustand or Redux Toolkit for application-wide UI state that is not tied to server data.
- **Local Component State**: Use useState and useReducer for state that is scoped to a single component or its immediate children.

#### 3.1.4 Styling
- **Scoping**: Use CSS Modules or a CSS-in-JS library (e.g., Styled Components) to prevent global style pollution.
- **Design System**: All UI elements must conform to the official corporate Design System. Do not create bespoke components or styles where a Design System equivalent exists.

#### 3.1.5 Accessibility (a11y)
All applications must be compliant with WCAG 2.1 Level AA standards. This includes semantic HTML, proper use of ARIA roles, and full keyboard navigability.

### 3.2 Backend (Microservices & APIs)

#### 3.2.1 Approved Stacks
- **Primary**: Node.js (latest LTS) with NestJS framework
- **Secondary (for high-performance computing)**: Java (latest LTS) with Spring Boot framework

#### 3.2.2 Architecture
Services must be architected around business domains, following Domain-Driven Design (DDD) principles. The code structure must reflect the domain, not the technical framework (e.g., a Billing module containing services and controllers, not separate services and controllers folders).

#### 3.2.3 API Design
- **RESTful APIs**: Must be documented using the OpenAPI v3.0 specification. Endpoints must be versioned (e.g., /api/v1/resource).
- **GraphQL APIs**: Must provide a well-defined, strongly-typed schema. Implement query complexity limits and depth limiting to prevent denial-of-service attacks.

#### 3.2.4 Database
- **Data Access**: An ORM is mandatory (Prisma/TypeORM for Node.js; Hibernate/JPA for Java).
- **Schema Management**: All schema changes must be managed via version-controlled migration files. Manual ALTER TABLE commands against any environment are strictly forbidden.

#### 3.2.5 Configuration
All configuration (database connection strings, API keys, feature flags) must be loaded from the runtime environment. Secrets must be managed via a centralized secrets management service (e.g., HashiCorp Vault, AWS Secrets Manager).

## 4.0 Cross-Cutting Concerns

### 4.1 Security

#### 4.1.1 OWASP Top 10
All engineers must be trained on and actively code to prevent the OWASP Top 10 web application security risks.

#### 4.1.2 Authentication & Authorization
All services must integrate with the central Identity Provider (IdP) using OAuth 2.0 and OpenID Connect (OIDC). No service shall implement its own user authentication logic.

#### 4.1.3 Dependency Management
Use Snyk or an equivalent tool integrated into the CI pipeline to scan all third-party dependencies for known vulnerabilities on every build.

#### 4.1.4 Data Handling
All Personally Identifiable Information (PII) must be encrypted at rest (AES-256) and in transit (TLS 1.2+).

### 4.2 Observability

#### 4.2.1 Logging
Logs must be written as structured JSON to stdout. Logs must not contain sensitive data. Every log entry must include a correlationId to trace a request across multiple services.

#### 4.2.2 Metrics
Services must expose key operational metrics (the FOUR Golden Signals: Latency, Traffic, Errors, Saturation) in a format consumable by Prometheus.

#### 4.2.3 Tracing
All services must be instrumented for Distributed Tracing (e.g., via OpenTelemetry) to allow for the analysis of request flows in a microservices environment.

### 4.3 Documentation

#### 4.3.1 API Documentation
Generated automatically from OpenAPI specs or GraphQL schemas and published to a central developer portal.

#### 4.3.2 README.md
Every repository's README.md must contain, at a minimum: a project overview, instructions for local setup, and steps to run tests.

#### 4.3.3 Architecture Decision Records (ADRs)
Significant architectural decisions (e.g., choosing a new database, adopting a new library) must be documented in a short "Architecture Decision Record" markdown file within the repository.

## 5.0 DevOps, Tooling & Infrastructure

### 5.1 CI/CD Pipeline
A standardized CI pipeline will be enforced for all applications. The pipeline stages are:

1. Source Checkout
2. Linting & Formatting Check
3. Unit & Integration Tests
4. SAST & Dependency Vulnerability Scans
5. Build Artifact (e.g., Docker image)
6. Publish Artifact to Registry
7. Deploy to Staging Environment

### 5.2 Infrastructure as Code (IaC)
All cloud infrastructure must be provisioned and managed using Terraform. The Terraform state must be stored in a secure, remote backend.

### 5.3 Containerization
All applications must be containerized using Docker. The Dockerfile must be optimized for security and build speed (e.g., using multi-stage builds and non-root users).

## 6.0 Governance & Compliance

### 6.1 Enforcement
The majority of these standards are automatically enforced via CI/CD quality gates, pre-commit hooks, and static analysis tools.

### 6.2 Review Process
This document is reviewed and updated on a semi-annual basis by the Architecture Guild.

### 6.3 Exception Process
A temporary exception to these standards may be granted only with explicit, written approval from the Architecture Guild. The request must include a clear justification and a plan to remediate the deviation.

### 6.4 Amendment Procedure
Constitutional amendments follow this process:
1. Proposed changes must be documented with clear rationale
2. Architecture Guild review and approval required
3. Version increment according to semantic versioning rules
4. All dependent templates and documentation updated
5. Team notification and training on changes

### 6.5 Compliance Review
- Quarterly compliance audits of all active projects
- Automated compliance checking via CI/CD pipelines
- Annual training refresher for all engineering personnel