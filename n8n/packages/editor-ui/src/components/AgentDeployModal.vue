<template>
	<Modal
		:name="AGENT_DEPLOY_MODAL"
		:title="'Deploy New Agent'"
		:eventBus="modalBus"
		width="600px"
		@enter="handleDeploy"
	>
		<template #content>
			<div :class="$style.container">
				<div :class="$style.formGroup">
					<label :class="$style.label">Agent Name</label>
					<n8n-input
						v-model="agentName"
						placeholder="My Agent"
						:class="$style.input"
					/>
					<span v-if="errors.agentName" :class="$style.error">{{ errors.agentName }}</span>
				</div>

				<div :class="$style.formGroup">
					<label :class="$style.label">Workflow</label>
					<n8n-select
						v-model="selectedWorkflowId"
						:class="$style.input"
						placeholder="Select a workflow"
					>
						<n8n-option
							v-for="workflow in workflows"
							:key="workflow.id"
							:value="workflow.id"
							:label="workflow.name"
						/>
					</n8n-select>
					<span v-if="errors.workflowId" :class="$style.error">{{ errors.workflowId }}</span>
				</div>

				<div :class="$style.formGroup">
					<label :class="$style.label">Configuration (JSON)</label>
					<n8n-input-label
						:class="$style.textareaWrapper"
					>
						<textarea
							v-model="config"
							:class="$style.textarea"
							placeholder='{"key": "value"}'
							rows="6"
						/>
					</n8n-input-label>
					<span v-if="errors.config" :class="$style.error">{{ errors.config }}</span>
					<p :class="$style.hint">Optional: Add custom configuration as JSON</p>
				</div>

				<div v-if="deployError" :class="$style.deployError">
					<n8n-notice type="error" :message="deployError" />
				</div>
			</div>
		</template>

		<template #footer>
			<div :class="$style.footer">
				<n8n-button
					type="secondary"
					@click="handleClose"
				>
					Cancel
				</n8n-button>
				<n8n-button
					type="primary"
					:loading="deploying"
					:disabled="!canDeploy"
					@click="handleDeploy"
				>
					{{ deploying ? 'Deploying...' : 'Deploy Agent' }}
				</n8n-button>
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from './Modal.vue';
import { useToast } from '@/composables/useToast';
import { mapStores } from 'pinia';
import { useWorkflowsStore } from '@/stores/workflows.store';
import { createEventBus } from 'n8n-design-system/utils';

const AGENT_DEPLOY_MODAL = 'agentDeployModal';

interface Workflow {
	id: string;
	name: string;
}

export default defineComponent({
	name: 'AgentDeployModal',
	components: {
		Modal,
	},
	emits: ['close', 'deployed'],
	data() {
		return {
			AGENT_DEPLOY_MODAL,
			modalBus: createEventBus(),
			agentName: '',
			selectedWorkflowId: '',
			config: '{}',
			deploying: false,
			deployError: '',
			errors: {
				agentName: '',
				workflowId: '',
				config: '',
			},
		};
	},
	computed: {
		...mapStores(useWorkflowsStore),
		workflows(): Workflow[] {
			return this.workflowsStore.allWorkflows.map((w) => ({
				id: w.id,
				name: w.name,
			}));
		},
		canDeploy(): boolean {
			return Boolean(this.agentName && this.selectedWorkflowId && !this.deploying);
		},
	},
	async mounted() {
		this.modalBus.emit('open');
		await this.loadWorkflows();
	},
	methods: {
		async loadWorkflows() {
			try {
				await this.workflowsStore.fetchAllWorkflows();
			} catch (error: any) {
				useToast().showError({
					title: 'Error',
					message: 'Failed to load workflows',
				});
			}
		},

		validate(): boolean {
			this.errors = {
				agentName: '',
				workflowId: '',
				config: '',
			};

			if (!this.agentName.trim()) {
				this.errors.agentName = 'Agent name is required';
				return false;
			}

			if (!this.selectedWorkflowId) {
				this.errors.workflowId = 'Please select a workflow';
				return false;
			}

			if (this.config.trim()) {
				try {
					JSON.parse(this.config);
				} catch {
					this.errors.config = 'Invalid JSON configuration';
					return false;
				}
			}

			return true;
		},

		async handleDeploy() {
			if (!this.validate()) {
				return;
			}

			this.deploying = true;
			this.deployError = '';

			try {
				const payload = {
					agentName: this.agentName.trim(),
					workflowId: this.selectedWorkflowId,
					config: this.config.trim() ? JSON.parse(this.config) : {},
				};

				const response = await fetch('/agents', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(payload),
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.message || 'Failed to deploy agent');
				}

				this.$emit('deployed');
				this.handleClose();
			} catch (err: any) {
				this.deployError = err.message || 'Failed to deploy agent';
			} finally {
				this.deploying = false;
			}
		},

		handleClose() {
			this.modalBus.emit('close');
			this.$emit('close');
		},
	},
});
</script>

<style lang="scss" module>
.container {
	padding: var(--spacing-s) 0;
}

.formGroup {
	margin-bottom: var(--spacing-l);
}

.label {
	display: block;
	font-size: var(--font-size-s);
	font-weight: var(--font-weight-bold);
	margin-bottom: var(--spacing-2xs);
	color: var(--color-text-dark);
}

.input {
	width: 100%;
}

.textareaWrapper {
	display: block;
	width: 100%;
}

.textarea {
	width: 100%;
	font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	font-size: var(--font-size-s);
	padding: var(--spacing-xs);
	border: 1px solid var(--color-foreground-base);
	border-radius: var(--border-radius-base);
	background: var(--color-background-xlight);
	color: var(--color-text-dark);
	resize: vertical;

	&:focus {
		outline: none;
		border-color: var(--color-primary);
	}
}

.error {
	display: block;
	color: var(--color-danger);
	font-size: var(--font-size-2xs);
	margin-top: var(--spacing-3xs);
}

.hint {
	font-size: var(--font-size-2xs);
	color: var(--color-text-light);
	margin-top: var(--spacing-3xs);
	margin-bottom: 0;
}

.deployError {
	margin-top: var(--spacing-m);
}

.footer {
	display: flex;
	justify-content: flex-end;
	gap: var(--spacing-xs);
}
</style>
