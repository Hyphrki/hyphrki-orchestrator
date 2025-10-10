# Constitution Command Template

## Command: constitution.md

### Description
Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync for the Orchestrator project.

### Usage
The user input to you can be provided directly by the agent or as a command argument - you **MUST** consider it before proceeding with the prompt (if not empty).

### Execution Flow

1. **Load Existing Constitution**
   - Read `.specify/memory/constitution.md`
   - Identify placeholder tokens of the form `[ALL_CAPS_IDENTIFIER]`
   - Note: User may require different number of principles than template

2. **Collect/Derive Values**
   - Use user input values when provided
   - Infer from existing repo context (README, docs, prior versions)
   - For governance dates:
     - `RATIFICATION_DATE`: Original adoption date (ask if unknown)
     - `LAST_AMENDED_DATE`: Today if changes made, otherwise keep previous
   - `CONSTITUTION_VERSION`: Increment per semantic versioning:
     - **MAJOR**: Backward incompatible governance/principle changes
     - **MINOR**: New principle/section added or materially expanded
     - **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements

3. **Draft Updated Constitution**
   - Replace every placeholder with concrete text
   - Preserve heading hierarchy
   - Ensure each Principle section has:
     - Succinct name line
     - Paragraph/bullet list with non-negotiable rules
     - Explicit rationale if not obvious
   - Ensure Governance section includes:
     - Amendment procedure
     - Versioning policy
     - Compliance review expectations

4. **Consistency Propagation Checklist**
   - ✅ Read `.specify/templates/plan-template.md` - ensure constitution alignment
   - ✅ Read `.specify/templates/spec-template.md` - update scope/requirements alignment
   - ✅ Read `.specify/templates/tasks-template.md` - ensure task categorization reflects principles
   - ✅ Read `.specify/templates/commands/*.md` - verify no outdated references
   - ✅ Read runtime guidance docs (README.md, docs/quickstart.md) - update principle references

5. **Produce Sync Impact Report**
   - Version change: old → new
   - Modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if placeholders intentionally deferred

6. **Validation Before Final Output**
   - No remaining unexplained bracket tokens
   - Version line matches report
   - Dates in ISO format YYYY-MM-DD
   - Principles are declarative, testable, free of vague language

7. **Write Completed Constitution**
   - Overwrite `.specify/memory/constitution.md`
   - Include Sync Impact Report as HTML comment at top

8. **Output Final Summary**
   - New version and bump rationale
   - Files flagged for manual follow-up
   - Suggested commit message

### Formatting & Style Requirements
- Use Markdown headings exactly as in template
- Wrap long rationale lines (<100 chars ideally)
- Single blank line between sections
- Avoid trailing whitespace

### Error Handling
- If critical info missing (e.g., ratification date unknown), insert `TODO(<FIELD_NAME>): explanation`
- Include deferred items in Sync Impact Report
- Do not create new template; always operate on existing `.specify/memory/constitution.md`

### Constitution Principles Reference
When updating constitution, ensure alignment with these core principles:

1. **Clarity Over Cleverness**: Code readability and simplicity
2. **Consistency is King**: Uniform approach to architecture and process
3. **You Build It, You Run It (YBIYRI)**: Full lifecycle accountability
4. **Secure by Design**: Security as foundational requirement
5. **Automate to Accelerate**: Automation at every SDLC stage

### Technology Standards Reference
- **Frontend**: TypeScript + React v18+, functional components, proper state management
- **Backend**: Node.js + NestJS (primary) or Java + Spring Boot (secondary)
- **Testing**: Testing pyramid (70% unit, 20% integration, 10% E2E), 80% coverage minimum
- **Security**: OWASP Top 10, OAuth 2.0 + OIDC, dependency scanning, PII encryption
- **Observability**: Structured JSON logging, Prometheus metrics, OpenTelemetry tracing
- **DevOps**: Docker containerization, Terraform IaC, standardized CI/CD pipeline

### Quality Gates
- SAST scanning with SonarQube
- DAST scanning in staging
- 80% test coverage minimum
- All CI checks must pass before merge
- Minimum 2 PR approvals required

### Documentation Requirements
- OpenAPI v3.0 for REST APIs
- GraphQL schema documentation
- README.md with project overview and setup
- Architecture Decision Records (ADRs)
- Central developer portal for API docs
