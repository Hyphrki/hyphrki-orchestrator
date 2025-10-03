import { Service } from 'typedi';
import type { Pool as PgPool } from 'pg';

const pgModule = require('pg');
const { Pool } = pgModule as { Pool: new (config: any) => PgPool };

interface AgentConfig {
	id: string;
	user_id: string;
	organization_id: string;
	name: string;
	workflow_id: string;
	status: 'pending' | 'deploying' | 'active' | 'failed' | 'stopped';
	config: Record<string, any>;
	created_at: Date;
	updated_at: Date;
}

interface DeploymentResult {
	success: boolean;
	agentId: string;
	workflowId: string;
	message?: string;
	error?: string;
}

@Service()
export class AgentDeploymentService {
	private pool: PgPool;

	constructor() {
		this.pool = new Pool({
			connectionString: process.env.DATABASE_URL,
		});
	}

	/**
	 * Deploy a workflow as an agent for a user
	 */
	async deployAgent(
		userId: string,
		organizationId: string,
		workflowId: string,
		agentName: string,
		config: Record<string, any> = {},
	): Promise<DeploymentResult> {
		try {
			// Check if workflow exists and user has access
			const workflowCheck = await this.pool.query(
				`SELECT id, name, active FROM n8n.workflows_entity WHERE id = $1`,
				[workflowId],
			);

			if (workflowCheck.rows.length === 0) {
				return {
					success: false,
					agentId: '',
					workflowId,
					error: 'Workflow not found',
				};
			}

			// Create agent record in hyphrki-app database
			const agentResult = await this.pool.query(
				`INSERT INTO public.agents (user_id, organization_id, name, workflow_id, status, config, created_at, updated_at)
				 VALUES ($1, $2, $3, $4, 'deploying', $5, NOW(), NOW())
				 RETURNING id`,
				[userId, organizationId, agentName, workflowId, JSON.stringify(config)],
			);

			const agentId = agentResult.rows[0].id;

			// Activate the workflow in N8N
			await this.pool.query(
				`UPDATE n8n.workflows_entity SET active = true, updated_at = NOW() WHERE id = $1`,
				[workflowId],
			);

			// Update agent status to active
			await this.pool.query(
				`UPDATE public.agents SET status = 'active', updated_at = NOW() WHERE id = $1`,
				[agentId],
			);

			return {
				success: true,
				agentId,
				workflowId,
				message: 'Agent deployed successfully',
			};
		} catch (error) {
			console.error('Agent deployment error:', error);
			return {
				success: false,
				agentId: '',
				workflowId,
				error: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}

	/**
	 * Stop an agent
	 */
	async stopAgent(agentId: string, userId: string): Promise<DeploymentResult> {
		try {
			// Get agent details
			const agentResult = await this.pool.query(
				`SELECT id, workflow_id, user_id, organization_id FROM public.agents WHERE id = $1 AND user_id = $2`,
				[agentId, userId],
			);

			if (agentResult.rows.length === 0) {
				return {
					success: false,
					agentId,
					workflowId: '',
					error: 'Agent not found or access denied',
				};
			}

			const workflowId = agentResult.rows[0].workflow_id;

			// Deactivate the workflow
			await this.pool.query(
				`UPDATE n8n.workflows_entity SET active = false, updated_at = NOW() WHERE id = $1`,
				[workflowId],
			);

			// Update agent status
			await this.pool.query(
				`UPDATE public.agents SET status = 'stopped', updated_at = NOW() WHERE id = $1`,
				[agentId],
			);

			return {
				success: true,
				agentId,
				workflowId,
				message: 'Agent stopped successfully',
			};
		} catch (error) {
			console.error('Agent stop error:', error);
			return {
				success: false,
				agentId,
				workflowId: '',
				error: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}

	/**
	 * Get all agents for a user
	 */
	async getUserAgents(userId: string, organizationId: string): Promise<AgentConfig[]> {
		try {
			const result = await this.pool.query(
				`SELECT a.*, w.name as workflow_name, w.active as workflow_active
				 FROM public.agents a
				 LEFT JOIN n8n.workflows_entity w ON a.workflow_id = w.id::text
				 WHERE a.user_id = $1 AND a.organization_id = $2
				 ORDER BY a.created_at DESC`,
				[userId, organizationId],
			);

			return result.rows;
		} catch (error) {
			console.error('Get user agents error:', error);
			return [];
		}
	}

	/**
	 * Delete an agent
	 */
	async deleteAgent(agentId: string, userId: string): Promise<DeploymentResult> {
		try {
			// Get agent details
			const agentResult = await this.pool.query(
				`SELECT id, workflow_id FROM public.agents WHERE id = $1 AND user_id = $2`,
				[agentId, userId],
			);

			if (agentResult.rows.length === 0) {
				return {
					success: false,
					agentId,
					workflowId: '',
					error: 'Agent not found or access denied',
				};
			}

			const workflowId = agentResult.rows[0].workflow_id;

			// Deactivate workflow first
			await this.pool.query(
				`UPDATE n8n.workflows_entity SET active = false WHERE id = $1`,
				[workflowId],
			);

			// Delete agent record
			await this.pool.query(`DELETE FROM public.agents WHERE id = $1`, [agentId]);

			return {
				success: true,
				agentId,
				workflowId,
				message: 'Agent deleted successfully',
			};
		} catch (error) {
			console.error('Agent deletion error:', error);
			return {
				success: false,
				agentId,
				workflowId: '',
				error: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}

	/**
	 * Restart an agent
	 */
	async restartAgent(agentId: string, userId: string): Promise<DeploymentResult> {
		try {
			// Stop first
			const stopResult = await this.stopAgent(agentId, userId);
			if (!stopResult.success) {
				return stopResult;
			}

			// Wait a bit
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Get agent details
			const agentResult = await this.pool.query(
				`SELECT workflow_id, user_id, organization_id FROM public.agents WHERE id = $1`,
				[agentId],
			);

			if (agentResult.rows.length === 0) {
				return {
					success: false,
					agentId,
					workflowId: '',
					error: 'Agent not found',
				};
			}

			const workflowId = agentResult.rows[0].workflow_id;

			// Reactivate
			await this.pool.query(
				`UPDATE n8n.workflows_entity SET active = true, updated_at = NOW() WHERE id = $1`,
				[workflowId],
			);

			await this.pool.query(
				`UPDATE public.agents SET status = 'active', updated_at = NOW() WHERE id = $1`,
				[agentId],
			);

			return {
				success: true,
				agentId,
				workflowId,
				message: 'Agent restarted successfully',
			};
		} catch (error) {
			console.error('Agent restart error:', error);
			return {
				success: false,
				agentId,
				workflowId: '',
				error: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}
}
