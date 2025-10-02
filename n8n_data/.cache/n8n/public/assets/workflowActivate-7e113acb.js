import { d as defineComponent } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { u as useToast, y as useSettingsStore, n as useUIStore, H as useWorkflowsStore, a4 as PLACEHOLDER_EMPTY_WORKFLOW_ID, d2 as useStorage, d3 as LOCAL_STORAGE_ACTIVATION_FLAG, d1 as WORKFLOW_ACTIVE_MODAL_KEY } from "./n8n-8ddd8349.js";
import { e as externalHooks, w as workflowHelpers } from "./index-00f166b0.js";
const workflowActivate = defineComponent({
  mixins: [externalHooks, workflowHelpers],
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      updatingWorkflowActivation: false
    };
  },
  computed: {
    ...mapStores(useSettingsStore, useUIStore, useWorkflowsStore)
  },
  methods: {
    async activateCurrentWorkflow(telemetrySource) {
      const workflowId = this.workflowsStore.workflowId;
      return this.updateWorkflowActivation(workflowId, true, telemetrySource);
    },
    async updateWorkflowActivation(workflowId, newActiveState, telemetrySource) {
      this.updatingWorkflowActivation = true;
      const nodesIssuesExist = this.workflowsStore.nodesIssuesExist;
      let currWorkflowId = workflowId;
      if (!currWorkflowId || currWorkflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID) {
        const saved = await this.saveCurrentWorkflow();
        if (!saved) {
          this.updatingWorkflowActivation = false;
          return;
        }
        currWorkflowId = this.workflowsStore.workflowId;
      }
      const isCurrentWorkflow = currWorkflowId === this.workflowsStore.workflowId;
      const activeWorkflows = this.workflowsStore.activeWorkflows;
      const isWorkflowActive = activeWorkflows.includes(currWorkflowId);
      const telemetryPayload = {
        workflow_id: currWorkflowId,
        is_active: newActiveState,
        previous_status: isWorkflowActive,
        ndv_input: telemetrySource === "ndv"
      };
      this.$telemetry.track("User set workflow active status", telemetryPayload);
      void this.$externalHooks().run("workflowActivate.updateWorkflowActivation", telemetryPayload);
      try {
        if (isWorkflowActive && newActiveState) {
          this.showMessage({
            title: this.$locale.baseText("workflowActivator.workflowIsActive"),
            type: "success"
          });
          this.updatingWorkflowActivation = false;
          return;
        }
        if (isCurrentWorkflow && nodesIssuesExist && newActiveState) {
          this.showMessage({
            title: this.$locale.baseText(
              "workflowActivator.showMessage.activeChangedNodesIssuesExistTrue.title"
            ),
            message: this.$locale.baseText(
              "workflowActivator.showMessage.activeChangedNodesIssuesExistTrue.message"
            ),
            type: "error"
          });
          this.updatingWorkflowActivation = false;
          return;
        }
        await this.updateWorkflow(
          { workflowId: currWorkflowId, active: newActiveState },
          !this.uiStore.stateIsDirty
        );
      } catch (error) {
        const newStateName = newActiveState ? "activated" : "deactivated";
        this.showError(
          error,
          this.$locale.baseText("workflowActivator.showError.title", {
            interpolate: { newStateName }
          }) + ":"
        );
        this.updatingWorkflowActivation = false;
        return;
      }
      const activationEventName = isCurrentWorkflow ? "workflow.activeChangeCurrent" : "workflow.activeChange";
      void this.$externalHooks().run(activationEventName, {
        workflowId: currWorkflowId,
        active: newActiveState
      });
      this.$emit("workflowActiveChanged", { id: currWorkflowId, active: newActiveState });
      this.updatingWorkflowActivation = false;
      if (isCurrentWorkflow) {
        if (newActiveState && useStorage(LOCAL_STORAGE_ACTIVATION_FLAG).value !== "true") {
          this.uiStore.openModal(WORKFLOW_ACTIVE_MODAL_KEY);
        } else {
          await this.settingsStore.fetchPromptsData();
        }
      }
    }
  }
});
export {
  workflowActivate as w
};
