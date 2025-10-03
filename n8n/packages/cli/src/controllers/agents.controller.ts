import { Response } from 'express';
import { Get, Post, Delete, Patch, RestController } from '@/decorators';
import { AgentDeploymentService } from '@/services/agent-deployment.service';
import type { AuthenticatedRequest } from '@/requests';
import { Container } from 'typedi';

interface DeployAgentRequest extends AuthenticatedRequest {
	body: {
		workflowId: string;
		agentName: string;
		config?: Record<string, any>;
	};
}

interface AgentActionRequest extends AuthenticatedRequest {
	params: {
		agentId: string;
	};
}

@RestController('/agents')
export class AgentsController {
	private agentService: AgentDeploymentService;

	constructor() {
		this.agentService = Container.get(AgentDeploymentService);
	}

	/**
	 * Deploy a new agent from a workflow
	 */
	@Post('/')
	async deployAgent(req: DeployAgentRequest, res: Response) {
		// Check if user is authenticated via Hyphrki
		if (!req.hyphrkiUser) {
			return res.status(401).json({
				status: 'error',
				message: 'Authentication required',
			});
		}

		const { workflowId, agentName, config } = req.body;

		if (!workflowId || !agentName) {
			return res.status(400).json({
				status: 'error',
				message: 'workflowId and agentName are required',
			});
		}

		const result = await this.agentService.deployAgent(
			req.hyphrkiUser.id,
			req.hyphrkiUser.organization_id,
			workflowId,
			agentName,
			config || {},
		);

		if (result.success) {
			return res.status(201).json({
				status: 'success',
				data: result,
			});
		} else {
			return res.status(400).json({
				status: 'error',
				message: result.error,
			});
		}
	}

	/**
	 * Get all agents for the authenticated user
	 */
	@Get('/')
	async getUserAgents(req: AuthenticatedRequest, res: Response) {
		if (!req.hyphrkiUser) {
			return res.status(401).json({
				status: 'error',
				message: 'Authentication required',
			});
		}

		const agents = await this.agentService.getUserAgents(
			req.hyphrkiUser.id,
			req.hyphrkiUser.organization_id,
		);

		return res.json({
			status: 'success',
			data: agents,
		});
	}

	/**
	 * Stop an agent
	 */
	@Patch('/:agentId/stop')
	async stopAgent(req: AgentActionRequest, res: Response) {
		if (!req.hyphrkiUser) {
			return res.status(401).json({
				status: 'error',
				message: 'Authentication required',
			});
		}

		const result = await this.agentService.stopAgent(req.params.agentId, req.hyphrkiUser.id);

		if (result.success) {
			return res.json({
				status: 'success',
				data: result,
			});
		} else {
			return res.status(400).json({
				status: 'error',
				message: result.error,
			});
		}
	}

	/**
	 * Restart an agent
	 */
	@Patch('/:agentId/restart')
	async restartAgent(req: AgentActionRequest, res: Response) {
		if (!req.hyphrkiUser) {
			return res.status(401).json({
				status: 'error',
				message: 'Authentication required',
			});
		}

		const result = await this.agentService.restartAgent(req.params.agentId, req.hyphrkiUser.id);

		if (result.success) {
			return res.json({
				status: 'success',
				data: result,
			});
		} else {
			return res.status(400).json({
				status: 'error',
				message: result.error,
			});
		}
	}

	/**
	 * Delete an agent
	 */
	@Delete('/:agentId')
	async deleteAgent(req: AgentActionRequest, res: Response) {
		if (!req.hyphrkiUser) {
			return res.status(401).json({
				status: 'error',
				message: 'Authentication required',
			});
		}

		const result = await this.agentService.deleteAgent(req.params.agentId, req.hyphrkiUser.id);

		if (result.success) {
			return res.json({
				status: 'success',
				data: result,
			});
		} else {
			return res.status(400).json({
				status: 'error',
				message: result.error,
			});
		}
	}
}
