import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

// PostgreSQL connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

interface JWTPayload {
	userId: string;
	email: string;
	organizationId: string;
	role: string;
	iat?: number;
	exp?: number;
}

interface HyphrkiUser {
	id: string;
	email: string;
	organization_id: string;
	role: string;
	first_name: string | null;
	last_name: string | null;
	email_verified: boolean;
	status: string;
	organization_name: string;
	subscription_tier: string;
}

declare global {
	namespace Express {
		interface Request {
			hyphrkiUser?: HyphrkiUser;
		}
	}
}

/**
 * Hyphrki Authentication Middleware
 * Validates JWT tokens from hyphrki-app and loads user data
 */
export const hyphrkiAuthMiddleware: RequestHandler = async (req, res, next) => {
	try {
		// Extract token from cookie or Authorization header
		let token: string | undefined;

		// Check cookie first
		if (req.cookies?.auth_token) {
			token = req.cookies.auth_token;
		}

		// Fall back to Authorization header
		if (!token && req.headers.authorization) {
			const authHeader = req.headers.authorization;
			if (authHeader.startsWith('Bearer ')) {
				token = authHeader.substring(7);
			}
		}

		// If no token, allow request to continue (N8N may have its own auth)
		if (!token) {
			return next();
		}

		// Verify JWT token
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			console.error('JWT_SECRET not configured');
			return next();
		}

		const decoded = jwt.verify(token, jwtSecret) as JWTPayload;

		// Load user from hyphrki-app database
		const result = await pool.query(
			`SELECT
				u.id, u.email, u.organization_id, u.role,
				u.first_name, u.last_name, u.email_verified, u.status,
				o.name as organization_name, o.subscription_tier
			FROM users u
			LEFT JOIN organizations o ON u.organization_id = o.id
			WHERE u.id = $1 AND u.status = 'active' AND u.is_deleted = false`,
			[decoded.userId],
		);

		if (result.rows.length === 0) {
			console.warn(`User ${decoded.userId} not found or inactive`);
			return next();
		}

		const user = result.rows[0] as HyphrkiUser;

		// Attach user to request
		req.hyphrkiUser = user;

		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			console.warn('Invalid JWT token:', error.message);
		} else {
			console.error('Hyphrki auth middleware error:', error);
		}
		// Don't block request, let N8N handle authentication
		next();
	}
};

/**
 * Require admin role middleware
 */
export const requireAdmin: RequestHandler = (req, res, next) => {
	if (!req.hyphrkiUser) {
		return res.status(401).json({
			status: 'error',
			message: 'Authentication required',
		});
	}

	if (req.hyphrkiUser.role !== 'admin') {
		return res.status(403).json({
			status: 'error',
			message: 'Admin access required',
		});
	}

	next();
};

/**
 * Map Hyphrki role to N8N role
 */
export function mapRoleToN8N(hyphrkiRole: string): string {
	const roleMap: Record<string, string> = {
		admin: 'global:owner',
		manager: 'global:admin',
		user: 'global:member',
		viewer: 'global:member',
	};

	return roleMap[hyphrkiRole] || 'global:member';
}
