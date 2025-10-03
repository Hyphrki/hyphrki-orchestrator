import { Response } from 'express';
import { Get, RestController } from '@/decorators';
import type { AuthenticatedRequest } from '@/requests';
import { requireAdmin } from '@/middleware/hyphrki-auth';
import type { Pool as PgPool } from 'pg';

const pgModule = require('pg');
const { Pool } = pgModule as { Pool: new (config: any) => PgPool };

@RestController('/admin')
export class AdminController {
	private pool: PgPool;

	constructor() {
		this.pool = new Pool({
			connectionString: process.env.DATABASE_URL,
		});
	}

	/**
	 * Get admin dashboard stats
	 */
	@Get('/stats')
	async getStats(req: AuthenticatedRequest, res: Response) {
		// Check if user is Hyphrki admin
		requireAdmin(req, res, async () => {
			try {
				// Get user count
				const usersResult = await this.pool.query(
					`SELECT COUNT(*) as count FROM public.users WHERE is_deleted = false`,
				);

				// Get organization count
				const orgsResult = await this.pool.query(
					`SELECT COUNT(*) as count FROM public.organizations WHERE is_deleted = false`,
				);

				// Get agent count
				const agentsResult = await this.pool.query(
					`SELECT COUNT(*) as count, status FROM public.agents GROUP BY status`,
				);

				// Get workflow count from N8N schema
				const workflowsResult = await this.pool.query(
					`SELECT COUNT(*) as count, active FROM n8n.workflows_entity GROUP BY active`,
				);

				// Get execution stats
				const executionsResult = await this.pool.query(
					`SELECT
						COUNT(*) as count,
						finished
					FROM n8n.execution_entity
					WHERE "startedAt" >= NOW() - INTERVAL '30 days'
					GROUP BY finished`,
				);

				return res.json({
					status: 'success',
					data: {
						users: parseInt(usersResult.rows[0]?.count || '0'),
						organizations: parseInt(orgsResult.rows[0]?.count || '0'),
						agents: agentsResult.rows.reduce(
							(acc, row) => {
								acc[row.status] = parseInt(row.count);
								acc.total += parseInt(row.count);
								return acc;
							},
							{ total: 0 },
						),
						workflows: workflowsResult.rows.reduce(
							(acc, row) => {
								acc[row.active ? 'active' : 'inactive'] = parseInt(row.count);
								acc.total += parseInt(row.count);
								return acc;
							},
							{ total: 0, active: 0, inactive: 0 },
						),
						executions: {
							last30Days: executionsResult.rows.reduce((sum, row) => sum + parseInt(row.count), 0),
							successful: parseInt(
								executionsResult.rows.find((r) => r.finished === true)?.count || '0',
							),
							failed: parseInt(
								executionsResult.rows.find((r) => r.finished === false)?.count || '0',
							),
						},
					},
				});
			} catch (error) {
				console.error('Admin stats error:', error);
				return res.status(500).json({
					status: 'error',
					message: 'Failed to fetch admin stats',
				});
			}
		});
	}

	/**
	 * Get all users (admin only)
	 */
	@Get('/users')
	async getUsers(req: AuthenticatedRequest, res: Response) {
		requireAdmin(req, res, async () => {
			try {
				const result = await this.pool.query(
					`SELECT
						u.id, u.email, u.first_name, u.last_name,
						u.role, u.status, u.email_verified,
						u.created_at, u.last_login_at,
						o.name as organization_name, o.subscription_tier
					FROM public.users u
					LEFT JOIN public.organizations o ON u.organization_id = o.id
					WHERE u.is_deleted = false
					ORDER BY u.created_at DESC`,
				);

				return res.json({
					status: 'success',
					data: result.rows,
				});
			} catch (error) {
				console.error('Get users error:', error);
				return res.status(500).json({
					status: 'error',
					message: 'Failed to fetch users',
				});
			}
		});
	}

	/**
	 * Get all organizations (admin only)
	 */
	@Get('/organizations')
	async getOrganizations(req: AuthenticatedRequest, res: Response) {
		requireAdmin(req, res, async () => {
			try {
				const result = await this.pool.query(
					`SELECT
						o.*,
						COUNT(DISTINCT u.id) as user_count,
						COUNT(DISTINCT a.id) as agent_count
					FROM public.organizations o
					LEFT JOIN public.users u ON o.id = u.organization_id AND u.is_deleted = false
					LEFT JOIN public.agents a ON o.id = a.organization_id
					WHERE o.is_deleted = false
					GROUP BY o.id
					ORDER BY o.created_at DESC`,
				);

				return res.json({
					status: 'success',
					data: result.rows,
				});
			} catch (error) {
				console.error('Get organizations error:', error);
				return res.status(500).json({
					status: 'error',
					message: 'Failed to fetch organizations',
				});
			}
		});
	}

	/**
	 * Get all agents across all organizations (admin only)
	 */
	@Get('/agents')
	async getAllAgents(req: AuthenticatedRequest, res: Response) {
		requireAdmin(req, res, async () => {
			try {
				const result = await this.pool.query(
					`SELECT
						a.*,
						u.email as user_email,
						o.name as organization_name,
						w.name as workflow_name,
						w.active as workflow_active
					FROM public.agents a
					LEFT JOIN public.users u ON a.user_id = u.id
					LEFT JOIN public.organizations o ON a.organization_id = o.id
					LEFT JOIN n8n.workflows_entity w ON a.workflow_id = w.id::text
					ORDER BY a.created_at DESC`,
				);

				return res.json({
					status: 'success',
					data: result.rows,
				});
			} catch (error) {
				console.error('Get all agents error:', error);
				return res.status(500).json({
					status: 'error',
					message: 'Failed to fetch agents',
				});
			}
		});
	}

	/**
	 * Get system health status
	 */
	@Get('/health')
	async getHealth(req: AuthenticatedRequest, res: Response) {
		requireAdmin(req, res, async () => {
			try {
				// Check database connection
				const dbCheck = await this.pool.query('SELECT NOW()');
				const dbHealthy = dbCheck.rows.length > 0;

				// Check N8N schema access
				const n8nCheck = await this.pool.query(
					'SELECT COUNT(*) FROM n8n.workflows_entity LIMIT 1',
				);
				const n8nHealthy = n8nCheck.rows.length > 0;

				return res.json({
					status: 'success',
					data: {
						database: dbHealthy ? 'healthy' : 'unhealthy',
						n8n_schema: n8nHealthy ? 'healthy' : 'unhealthy',
						timestamp: new Date().toISOString(),
					},
				});
			} catch (error) {
				console.error('Health check error:', error);
				return res.status(500).json({
					status: 'error',
					message: 'Health check failed',
					data: {
						database: 'unknown',
						n8n_schema: 'unknown',
						timestamp: new Date().toISOString(),
					},
				});
			}
		});
	}
}
