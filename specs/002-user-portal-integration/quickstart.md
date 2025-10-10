# User Portal Integration Quick Start

## Overview
This guide provides a quick start for implementing the user portal integration with the existing admin/orchestrator portal. The user portal will be a separate application that communicates with the admin portal through shared APIs and real-time communication.

## Prerequisites

### Technical Requirements
- Node.js 18+ and npm
- Docker and Docker Compose
- Git
- Access to shared authentication provider (Auth0)
- Access to backend APIs
- Network connectivity to admin portal

### Access Requirements
- GitHub repository access with provided token
- Backend API credentials
- Database access permissions
- Authentication provider configuration

## Getting Started

### 1. Repository Setup
```bash
# Clone the user portal repository (already done)
cd user-portal

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local
```

### 2. Environment Configuration
Edit `.env.local` with the following variables:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_ISSUER=your-auth0-domain

# Backend APIs
NEXT_PUBLIC_API_URL=http://localhost:3000/api
BACKEND_API_URL=http://localhost:3000/api

# WebSocket
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Database (if needed)
DATABASE_URL=postgresql://user:password@localhost:5432/orchestrator

# Redis (for sessions)
REDIS_URL=redis://localhost:6379
```

### 3. Project Structure Analysis
Examine the current user-portal directory structure:
- Identify existing HTML/CSS/JS files
- Locate reusable components and assets
- Note any existing authentication or API integrations
- Document cleanup requirements

### 4. Next.js Migration
```bash
# Initialize Next.js project (if not already done)
npx create-next-app@latest . --typescript --tailwind --eslint --app

# Install additional dependencies
npm install next-auth @auth0/nextjs
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install socket.io-client
npm install @radix-ui/react-* # shadcn/ui components
npm install lucide-react # icons
```

### 5. Basic Authentication Setup
Create authentication configuration:

```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
})
```

### 6. API Client Setup
Create API integration layer:

```typescript
// lib/api.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
})

export const apiClient = {
  get: (url: string) => fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`),
  post: (url: string, data: any) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  // Add other methods as needed
}
```

### 7. WebSocket Integration
Set up real-time communication:

```typescript
// lib/socket.ts
import { io } from 'socket.io-client'

export const socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
  auth: {
    token: localStorage.getItem('accessToken'),
  },
})

export const useSocket = () => {
  // Socket hooks and utilities
}
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
npm start
```

### 3. Run Tests
```bash
npm test
npm run test:e2e
```

### 4. Docker Development
```bash
# Build Docker image
docker build -t user-portal .

# Run with Docker Compose
docker-compose up
```

## Key Integration Points

### Authentication Flow
1. User authenticates via Auth0 (shared with admin portal)
2. JWT token stored and used for API calls
3. Session shared between admin and user portals
4. Automatic token refresh implemented

### API Integration
1. REST APIs for CRUD operations
2. Shared database access through backend
3. Proper error handling and retry logic
4. Request/response interceptors for auth

### Real-time Communication
1. WebSocket connection for live updates
2. Agent status monitoring
3. Workflow execution tracking
4. Notification system

## Testing Strategy

### Unit Tests
```bash
# Run unit tests
npm test -- --coverage

# Target: 80% coverage minimum
```

### Integration Tests
```bash
# Run API integration tests
npm run test:integration
```

### E2E Tests
```bash
# Run end-to-end tests
npm run test:e2e
```

## Deployment

### Staging Deployment
```bash
# Build for staging
npm run build:staging

# Deploy to staging environment
npm run deploy:staging
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to production
npm run deploy:production
```

## Monitoring and Observability

### Key Metrics to Monitor
- Page load times (< 2 seconds target)
- API response times (< 500ms target)
- Authentication success rates
- WebSocket connection stability
- Error rates and user experience issues

### Logging
- Structured JSON logging
- Correlation IDs for request tracing
- Error tracking with Sentry
- User action analytics

## Common Issues and Solutions

### Authentication Issues
- Check Auth0 configuration
- Verify JWT token validity
- Ensure shared session store accessibility

### API Connection Problems
- Verify backend API availability
- Check network connectivity
- Validate API credentials

### WebSocket Connection Issues
- Check WebSocket server configuration
- Verify authentication token passing
- Implement connection retry logic

## Next Steps

1. Complete project structure analysis
2. Implement authentication integration
3. Build dashboard components
4. Integrate with marketplace APIs
5. Implement real-time features
6. Comprehensive testing
7. Production deployment

## Support

- Refer to the full specification in `spec.md`
- Check implementation plan in `plan.md`
- Review detailed tasks in `tasks.md`
- Contact the development team for assistance
