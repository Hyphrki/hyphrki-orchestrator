<template>
	<div :class="[$style.card, statusClass]">
		<div :class="$style.header">
			<div :class="$style.headerLeft">
				<div :class="$style.status" :title="agent.status">
					<span :class="$style.statusDot"></span>
					<span :class="$style.statusText">{{ statusLabel }}</span>
				</div>
			</div>
			<div :class="$style.headerRight">
				<n8n-action-dropdown
					:items="actionItems"
					@select="handleAction"
				/>
			</div>
		</div>

		<div :class="$style.body">
			<h3 :class="$style.name">{{ agent.name }}</h3>
			<div :class="$style.info">
				<div :class="$style.infoItem">
					<span :class="$style.label">Workflow:</span>
					<span :class="$style.value">{{ agent.workflowName || 'Unknown' }}</span>
				</div>
				<div :class="$style.infoItem">
					<span :class="$style.label">Created:</span>
					<span :class="$style.value">{{ formattedCreatedAt }}</span>
				</div>
				<div v-if="agent.lastExecutionAt" :class="$style.infoItem">
					<span :class="$style.label">Last Run:</span>
					<span :class="$style.value">{{ formattedLastExecution }}</span>
				</div>
			</div>
		</div>

		<div :class="$style.footer">
			<n8n-button
				v-if="agent.status === 'active'"
				size="small"
				type="secondary"
				@click="$emit('stop', agent.id)"
			>
				Stop
			</n8n-button>
			<n8n-button
				v-else
				size="small"
				type="primary"
				@click="$emit('restart', agent.id)"
			>
				Start
			</n8n-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

interface Agent {
	id: string;
	name: string;
	workflowId: string;
	workflowName?: string;
	status: string;
	createdAt: string;
	lastExecutionAt?: string;
}

export default defineComponent({
	name: 'AgentCard',
	props: {
		agent: {
			type: Object as PropType<Agent>,
			required: true,
		},
	},
	emits: ['stop', 'restart', 'delete'],
	computed: {
		statusClass(): string {
			return this.$style[`status-${this.agent.status}`] || '';
		},
		statusLabel(): string {
			const labels: Record<string, string> = {
				active: 'Active',
				stopped: 'Stopped',
				error: 'Error',
				deploying: 'Deploying',
			};
			return labels[this.agent.status] || this.agent.status;
		},
		formattedCreatedAt(): string {
			return this.formatDate(this.agent.createdAt);
		},
		formattedLastExecution(): string {
			return this.agent.lastExecutionAt ? this.formatDate(this.agent.lastExecutionAt) : 'Never';
		},
		actionItems() {
			return [
				{
					id: 'delete',
					label: 'Delete Agent',
					icon: 'trash',
					danger: true,
				},
			];
		},
	},
	methods: {
		formatDate(dateString: string): string {
			const date = new Date(dateString);
			const now = new Date();
			const diff = now.getTime() - date.getTime();
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			if (days === 0) {
				const hours = Math.floor(diff / (1000 * 60 * 60));
				if (hours === 0) {
					const minutes = Math.floor(diff / (1000 * 60));
					return `${minutes}m ago`;
				}
				return `${hours}h ago`;
			} else if (days < 7) {
				return `${days}d ago`;
			} else {
				return date.toLocaleDateString();
			}
		},
		handleAction(action: string) {
			if (action === 'delete') {
				this.$emit('delete', this.agent.id);
			}
		},
	},
});
</script>

<style lang="scss" module>
.card {
	background: var(--color-background-xlight);
	border: 1px solid var(--color-foreground-base);
	border-radius: var(--border-radius-large);
	padding: var(--spacing-m);
	transition: all 0.2s ease;

	&:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--spacing-s);
}

.headerLeft {
	flex: 1;
}

.status {
	display: flex;
	align-items: center;
	gap: var(--spacing-2xs);
}

.statusDot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--color-text-light);
}

.status-active .statusDot {
	background: var(--color-success);
	box-shadow: 0 0 6px var(--color-success);
}

.status-stopped .statusDot {
	background: var(--color-text-light);
}

.status-error .statusDot {
	background: var(--color-danger);
	box-shadow: 0 0 6px var(--color-danger);
}

.status-deploying .statusDot {
	background: var(--color-warning);
	animation: pulse 1.5s infinite;
}

@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

.statusText {
	font-size: var(--font-size-xs);
	font-weight: var(--font-weight-bold);
	text-transform: uppercase;
	color: var(--color-text-base);
}

.body {
	margin-bottom: var(--spacing-m);
}

.name {
	font-size: var(--font-size-l);
	font-weight: var(--font-weight-bold);
	margin: 0 0 var(--spacing-s) 0;
	color: var(--color-text-dark);
}

.info {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-2xs);
}

.infoItem {
	display: flex;
	gap: var(--spacing-2xs);
	font-size: var(--font-size-s);
}

.label {
	color: var(--color-text-light);
	font-weight: var(--font-weight-regular);
}

.value {
	color: var(--color-text-dark);
	font-weight: var(--font-weight-medium);
}

.footer {
	display: flex;
	gap: var(--spacing-xs);
	padding-top: var(--spacing-s);
	border-top: 1px solid var(--color-foreground-base);
}
</style>
