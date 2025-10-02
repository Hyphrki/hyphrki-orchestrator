# Hyphrki Orchestrator

Admin portal for managing AI agent templates and workflows in the Hyphrki platform.

## Overview

The Hyphrki Orchestrator is a separate admin portal that allows administrators to:

- Create and manage AI agent templates
- Define N8N workflow configurations
- Set up customer configuration schemas
- Monitor template usage and performance
- Manage organizations and users
- Oversee the entire platform

## Architecture

This is a Next.js 15 application with:

- **Frontend**: React 19 with TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Authentication**: Custom admin authentication system
- **API Routes**: Next.js API routes for backend functionality

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the orchestrator directory:
   ```bash
   cd hyphrki-orchestrator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

### Demo Credentials

For testing purposes, use these credentials:
- **Email**: admin@hyphrki.com
- **Password**: admin123

## Features

### 🎯 Agent Template Management
- Create new agent templates with a step-by-step wizard
- Define workflow configurations for N8N integration
- Set up customer configuration schemas
- Manage template versions and publishing

### 📊 Dashboard & Analytics
- Overview of platform statistics
- Template usage metrics
- Organization management
- Real-time activity monitoring

### 🔧 System Administration
- User and organization management
- Template approval workflows
- System health monitoring
- Audit logging

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── templates/         # Template management pages
│   │   └── create/        # Template creation wizard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard home page
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication state
│   └── ThemeContext.tsx  # Theme management
└── lib/                  # Utility functions
    └── utils.ts          # Common utilities
```

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Pages**: Add to `src/app/` directory
2. **API Routes**: Add to `src/app/api/` directory
3. **Components**: Add to `src/components/` directory
4. **Contexts**: Add to `src/contexts/` directory

### UI Components

This project uses shadcn/ui components. To add new components:

1. Install the required Radix UI dependencies
2. Create the component in `src/components/ui/`
3. Follow the shadcn/ui patterns for consistency

## Integration

### API Gateway Integration

The orchestrator communicates with the main API gateway for:
- Template CRUD operations
- User authentication
- Organization management
- Analytics data

### N8N Integration

Templates can be configured with N8N workflows:
- Workflow definition storage
- Template testing and validation
- Deployment management

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env.local` file:

```env
# API Gateway URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# N8N Integration
N8N_BASE_URL=http://localhost:5678
N8N_API_TOKEN=your_n8n_token

# Authentication
JWT_SECRET=your_jwt_secret
```

## Security

- Admin-only access with role-based permissions
- JWT token authentication
- Secure API communication
- Input validation and sanitization

## Contributing

1. Follow the existing code patterns
2. Use TypeScript for type safety
3. Follow the shadcn/ui component patterns
4. Add proper error handling
5. Include loading states for async operations

## License

This project is part of the Hyphrki platform and follows the same licensing terms.