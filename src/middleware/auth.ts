import { NextRequest, NextResponse } from 'next/server';
import { JWTService, JWTPayload } from '@/lib/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization');
      const token = JWTService.extractTokenFromHeader(authHeader);

      if (!token) {
        return NextResponse.json(
          { error: 'No authentication token provided' },
          { status: 401 }
        );
      }

      const payload = JWTService.verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Add user info to request
      (req as AuthenticatedRequest).user = payload;

      return handler(req as AuthenticatedRequest);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

export function requireRole(role: string) {
  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return withAuth(async (req: AuthenticatedRequest) => {
      if (!req.user || req.user.role !== role) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      return handler(req);
    });
  };
}

export function requireAdmin(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return requireRole('admin')(handler);
}
