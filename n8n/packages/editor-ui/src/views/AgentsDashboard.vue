<template>
	<div :class="$style.container">
		<div :class="$style.header">
			<div :class="$style.headerContent">
				<h1 :class="$style.title">Agent Management</h1>
				<p :class="$style.subtitle">Deploy and manage your AI agents</p>
			</div>
			<n8n-button
				:class="$style.deployButton"
				size="large"
				@click="openDeployModal"
			>
				Deploy New Agent
			</n8n-button>
		</div>

		<div v-if="loading" :class="$style.loading">
			<n8n-spinner />
			<p>Loading agents...</p>
		</div>

		<div v-else-if="error" :class="$style.error">
			<n8n-notice type="error" :message="error" />
		</div>

		<div v-else-if="agents.length === 0" :class="$style.empty">
			<div :class="$style.emptyContent">
				<h2>No agents deployed yet</h2>
				<p>Get started by deploying your first agent from a workflow</p>
				<n8n-button size="large" @click="openDeployModal">
					Deploy Your First Agent
				</n8n-button>
			</div>
		</div>

		<div v-else :class="$style.agentGrid">
			<AgentCard
				v-for="agent in agents"
				:key="agent.id"
				:agent="agent"
				@stop="handleStopAgent"
				@restart="handleRestartAgent"
				@delete="handleDeleteAgent"
			/>
		</div>

		<AgentDeployModal
			v-if="showDeployModal"
			@close="showDeployModal = false"
			@deployed="handleAgentDeployed"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AgentCard from '@/components/AgentCard.vue';
import AgentDeployModal from '@/components/AgentDeployModal.vue';
import { useToast } from '@/composables/useToast';

interface Agent {
	id: string;
	name: string;
	workflowId: string;
	workflowName: string;
	status: string;
	createdAt: string;
	lastExecutionAt?: string;
}

export default defineComponent({
	name: 'AgentsDashboard',
	components: {
		AgentCard,
		AgentDeployModal,
	},
	data() {
		return {
			agents: [] as Agent[],
			loading: false,
			error: '',
			showDeployModal: false,
		};
	},
	async mounted() {
		await this.loadAgents();
	},
	methods: {
		async loadAgents() {
			this.loading = true;
			this.error = '';

			try {
				const response = await fetch('/agents', {
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error('Failed to load agents');
				}

				const data = await response.json();
				this.agents = data.agents || [];
			} catch (err: any) {
				this.error = err.message || 'Failed to load agents';
				useToast().showError({ title: 'Error', message: this.error });
			} finally {
				this.loading = false;
			}
		},

		openDeployModal() {
			this.showDeployModal = true;
		},

		async handleStopAgent(agentId: string) {
			try {
				const response = await fetch(`/agents/${agentId}/stop`, {
					method: 'PATCH',
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error('Failed to stop agent');
				}

				await this.loadAgents();
				useToast().showMessage({ title: 'Success', message: 'Agent stopped successfully' });
			} catch (err: any) {
				useToast().showError({ title: 'Error', message: err.message || 'Failed to stop agent' });
			}
		},

		async handleRestartAgent(agentId: string) {
			try {
				const response = await fetch(`/agents/${agentId}/restart`, {
					method: 'PATCH',
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error('Failed to restart agent');
				}

				await this.loadAgents();
				useToast().showMessage({ title: 'Success', message: 'Agent restarted successfully' });
			} catch (err: any) {
				useToast().showError({ title: 'Error', message: err.message || 'Failed to restart agent' });
			}
		},

		async handleDeleteAgent(agentId: string) {
			if (!confirm('Are you sure you want to delete this agent?')) {
				return;
			}

			try {
				const response = await fetch(`/agents/${agentId}`, {
					method: 'DELETE',
					credentials: 'include',
				});

				if (!response.ok) {
					throw new Error('Failed to delete agent');
				}

				await this.loadAgents();
				useToast().showMessage({ title: 'Success', message: 'Agent deleted successfully' });
			} catch (err: any) {
				useToast().showError({ title: 'Error', message: err.message || 'Failed to delete agent' });
			}
		},

		async handleAgentDeployed() {
			this.showDeployModal = false;
			await this.loadAgents();
			useToast().showMessage({ title: 'Success', message: 'Agent deployed successfully' });
		},
	},
});
</script>

<style lang="scss" module>
.container {
	padding: var(--spacing-l);
	max-width: 1400px;
	margin: 0 auto;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--spacing-xl);
}

.headerContent {
	flex: 1;
}

.title {
	font-size: var(--font-size-2xl);
	font-weight: var(--font-weight-bold);
	margin: 0 0 var(--spacing-2xs) 0;
	color: var(--color-text-dark);
}

.subtitle {
	font-size: var(--font-size-m);
	color: var(--color-text-base);
	margin: 0;
}

.deployButton {
	margin-left: var(--spacing-l);
}

.loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-3xl) 0;
	gap: var(--spacing-m);
}

.error {
	margin-top: var(--spacing-l);
}

.empty {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: var(--spacing-3xl) 0;
}

.emptyContent {
	text-align: center;
	max-width: 400px;

	h2 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-s);
		color: var(--color-text-dark);
	}

	p {
		color: var(--color-text-base);
		margin-bottom: var(--spacing-l);
	}
}

.agentGrid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: var(--spacing-l);
}
</style>
