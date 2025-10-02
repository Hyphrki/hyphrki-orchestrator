const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

/**
 * N8N Authentication Bridge
 *
 * This module bridges our JWT-based authentication system with N8N's auth system.
 * It validates our JWT tokens and provides user data in N8N-compatible format.
 */
class N8NAuthBridge {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;

    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
  }

  /**
   * Validate JWT token and return user data
   * @param {string} token - JWT token from cookie or Authorization header
   * @returns {Promise<Object>} User object or null if invalid
   */
  async validateToken(token) {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, this.jwtSecret);

      // Fetch user from our database
      const result = await query(
        `SELECT
          u.id,
          u.email,
          u.first_name,
          u.last_name,
          u.role,
          u.organization_id,
          u.permissions,
          u.email_verified,
          u.status,
          o.name as organization_name,
          o.subscription_tier
        FROM users u
        LEFT JOIN organizations o ON u.organization_id = o.id
        WHERE u.id = $1 AND u.status = 'active' AND u.is_deleted = false`,
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        console.warn(`User ${decoded.userId} not found or inactive`);
        return null;
      }

      return result.rows[0];
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.warn('JWT token expired');
      } else if (error.name === 'JsonWebTokenError') {
        console.warn('Invalid JWT token');
      } else {
        console.error('Error validating token:', error);
      }
      return null;
    }
  }

  /**
   * Convert our user object to N8N user format
   * @param {Object} user - Our user object from database
   * @returns {Object} N8N-compatible user object
   */
  toN8NUser(user) {
    // Map our roles to N8N global roles
    const globalRoleMap = {
      'admin': 'owner',        // Full access to everything
      'manager': 'admin',      // Can manage users and workflows
      'user': 'member',        // Can create and execute workflows
      'viewer': 'member'       // Read-only access (we'll handle via permissions)
    };

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name || '',
      lastName: user.last_name || '',

      // N8N specific fields
      globalRole: globalRoleMap[user.role] || 'member',

      // Our custom fields for multi-tenancy
      organizationId: user.organization_id,
      organizationName: user.organization_name,
      subscriptionTier: user.subscription_tier,
      permissions: user.permissions || [],

      // Status fields
      isEmailVerified: user.email_verified,
      isPending: false,
      isDisabled: user.status !== 'active',

      // Settings (N8N expects this)
      settings: {
        allowSSOManualLogin: true
      }
    };
  }

  /**
   * Middleware to extract and validate JWT from request
   * Compatible with Express middleware signature
   */
  async authMiddleware(req, res, next) {
    try {
      // Try to get token from cookie first
      let token = req.cookies?.auth_token;

      // If not in cookie, try Authorization header
      if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7);
        }
      }

      if (!token) {
        // No token provided - user is not authenticated
        req.user = null;
        return next();
      }

      // Validate token and get user
      const user = await this.validateToken(token);

      if (!user) {
        // Invalid token
        req.user = null;
        return next();
      }

      // Attach N8N-formatted user to request
      req.user = this.toN8NUser(user);
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      req.user = null;
      next();
    }
  }

  /**
   * Check if user has specific permission
   * @param {Object} user - User object
   * @param {string} permission - Permission to check
   * @returns {boolean} True if user has permission
   */
  hasPermission(user, permission) {
    if (!user) return false;

    // Admins have all permissions
    if (user.globalRole === 'owner') return true;

    // Check user's permission array
    return user.permissions && user.permissions.includes(permission);
  }

  /**
   * Check if user is admin
   * @param {Object} user - User object
   * @returns {boolean} True if user is admin
   */
  isAdmin(user) {
    return user && (user.globalRole === 'owner' || user.globalRole === 'admin');
  }

  /**
   * Get all users for an organization (for N8N user management)
   * @param {string} organizationId - Organization ID
   * @returns {Promise<Array>} Array of users in N8N format
   */
  async getOrganizationUsers(organizationId) {
    try {
      const result = await query(
        `SELECT
          u.id,
          u.email,
          u.first_name,
          u.last_name,
          u.role,
          u.organization_id,
          u.permissions,
          u.email_verified,
          u.status,
          o.name as organization_name,
          o.subscription_tier
        FROM users u
        LEFT JOIN organizations o ON u.organization_id = o.id
        WHERE u.organization_id = $1 AND u.is_deleted = false
        ORDER BY u.created_at DESC`,
        [organizationId]
      );

      return result.rows.map(user => this.toN8NUser(user));
    } catch (error) {
      console.error('Error fetching organization users:', error);
      return [];
    }
  }
}

// Export singleton instance
module.exports = new N8NAuthBridge();
