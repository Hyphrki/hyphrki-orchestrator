import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, n as normalizeClass, f as withCtx, j as createBaseVNode, s as createTextVNode, t as toDisplayString, i as createVNode, af as withModifiers } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { H as useWorkflowsStore, n as useUIStore, y as useSettingsStore, x as useRootStore, d0 as deepCopy, a4 as PLACEHOLDER_EMPTY_WORKFLOW_ID, c$ as WORKFLOW_SETTINGS_MODAL_KEY, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { w as workflowHelpers } from "./index-00f166b0.js";
const _sfc_main = defineComponent({
  name: "executions-info-accordion",
  mixins: [workflowHelpers],
  props: {
    initiallyExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultValues: {
        saveFailedExecutions: "all",
        saveSuccessfulExecutions: "all",
        saveManualExecutions: false
      },
      workflowSaveSettings: {
        saveFailedExecutions: false,
        saveSuccessfulExecutions: false,
        saveTestExecutions: false
      }
    };
  },
  mounted() {
    this.defaultValues.saveFailedExecutions = this.settingsStore.saveDataErrorExecution;
    this.defaultValues.saveSuccessfulExecutions = this.settingsStore.saveDataSuccessExecution;
    this.defaultValues.saveManualExecutions = this.settingsStore.saveManualExecutions;
    this.updateSettings(this.workflowSettings);
  },
  watch: {
    workflowSettings(newSettings) {
      this.updateSettings(newSettings);
    }
  },
  computed: {
    ...mapStores(useRootStore, useSettingsStore, useUIStore, useWorkflowsStore),
    accordionItems() {
      return [
        {
          id: "productionExecutions",
          label: this.$locale.baseText(
            "executionsLandingPage.emptyState.accordion.productionExecutions"
          ),
          icon: this.productionExecutionsIcon.icon,
          iconColor: this.productionExecutionsIcon.color,
          tooltip: this.productionExecutionsStatus === "unknown" ? this.$locale.baseText(
            "executionsLandingPage.emptyState.accordion.productionExecutionsWarningTooltip"
          ) : null
        },
        {
          id: "manualExecutions",
          label: this.$locale.baseText("executionsLandingPage.emptyState.accordion.testExecutions"),
          icon: this.workflowSaveSettings.saveTestExecutions ? "check" : "times",
          iconColor: this.workflowSaveSettings.saveTestExecutions ? "success" : "danger"
        }
      ];
    },
    shouldExpandAccordion() {
      if (!this.initiallyExpanded) {
        return false;
      }
      return !this.workflowSaveSettings.saveFailedExecutions || !this.workflowSaveSettings.saveSuccessfulExecutions || !this.workflowSaveSettings.saveTestExecutions;
    },
    productionExecutionsIcon() {
      if (this.productionExecutionsStatus === "saving") {
        return { icon: "check", color: "success" };
      } else if (this.productionExecutionsStatus === "not-saving") {
        return { icon: "times", color: "danger" };
      }
      return { icon: "exclamation-triangle", color: "warning" };
    },
    productionExecutionsStatus() {
      if (this.workflowSaveSettings.saveSuccessfulExecutions === this.workflowSaveSettings.saveFailedExecutions) {
        if (this.workflowSaveSettings.saveSuccessfulExecutions) {
          return "saving";
        }
        return "not-saving";
      } else {
        return "unknown";
      }
    },
    workflowSettings() {
      const workflowSettings = deepCopy(this.workflowsStore.workflowSettings);
      return workflowSettings;
    },
    accordionIcon() {
      if (!this.workflowSaveSettings.saveTestExecutions || this.productionExecutionsStatus !== "saving") {
        return { icon: "exclamation-triangle", color: "warning" };
      }
      return null;
    },
    currentWorkflowId() {
      return this.workflowsStore.workflowId;
    },
    isNewWorkflow() {
      return !this.currentWorkflowId || this.currentWorkflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID || this.currentWorkflowId === "new";
    },
    workflowName() {
      return this.workflowsStore.workflowName;
    },
    currentWorkflowTagIds() {
      return this.workflowsStore.workflowTags;
    }
  },
  methods: {
    updateSettings(workflowSettings) {
      this.workflowSaveSettings.saveFailedExecutions = workflowSettings.saveDataErrorExecution === void 0 ? this.defaultValues.saveFailedExecutions === "all" : workflowSettings.saveDataErrorExecution === "all";
      this.workflowSaveSettings.saveSuccessfulExecutions = workflowSettings.saveDataSuccessExecution === void 0 ? this.defaultValues.saveSuccessfulExecutions === "all" : workflowSettings.saveDataSuccessExecution === "all";
      this.workflowSaveSettings.saveTestExecutions = workflowSettings.saveManualExecutions === void 0 ? this.defaultValues.saveManualExecutions : workflowSettings.saveManualExecutions;
    },
    onAccordionClick(event) {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        this.uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
      }
    },
    onItemTooltipClick(item, event) {
      if (item === "productionExecutions" && event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        this.uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
      }
    },
    openWorkflowSettings(event) {
      this.uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
    },
    async onSaveWorkflowClick(event) {
      let currentId = void 0;
      if (this.currentWorkflowId !== PLACEHOLDER_EMPTY_WORKFLOW_ID) {
        currentId = this.currentWorkflowId;
      } else if (this.$route.params.name && this.$route.params.name !== "new") {
        currentId = this.$route.params.name;
      }
      const saved = await this.saveCurrentWorkflow({
        id: currentId,
        name: this.workflowName,
        tags: this.currentWorkflowTagIds
      });
      if (saved)
        await this.settingsStore.fetchPromptsData();
    }
  }
});
const accordion = "_accordion_67fqb_5";
const disabled = "_disabled_67fqb_31";
const style0 = {
  accordion,
  disabled
};
const _hoisted_1 = { class: "mt-2xs" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_n8n_info_accordion = resolveComponent("n8n-info-accordion");
  return openBlock(), createBlock(_component_n8n_info_accordion, {
    class: normalizeClass([_ctx.$style.accordion, "mt-2xl"]),
    title: _ctx.$locale.baseText("executionsLandingPage.emptyState.accordion.title"),
    items: _ctx.accordionItems,
    initiallyExpanded: _ctx.shouldExpandAccordion,
    headerIcon: _ctx.accordionIcon,
    "onClick:body": _ctx.onAccordionClick,
    onTooltipClick: _ctx.onItemTooltipClick
  }, {
    customContent: withCtx(() => [
      createBaseVNode("footer", _hoisted_1, [
        createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.accordion.footer")) + " ", 1),
        createVNode(_component_n8n_tooltip, {
          disabled: !_ctx.isNewWorkflow
        }, {
          content: withCtx(() => [
            createBaseVNode("div", null, [
              createVNode(_component_n8n_link, {
                onClick: withModifiers(_ctx.onSaveWorkflowClick, ["prevent"])
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.accordion.footer.tooltipLink")), 1)
                ]),
                _: 1
              }, 8, ["onClick"]),
              createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.accordion.footer.tooltipText")), 1)
            ])
          ]),
          default: withCtx(() => [
            createVNode(_component_n8n_link, {
              onClick: withModifiers(_ctx.openWorkflowSettings, ["prevent"]),
              class: normalizeClass({ [_ctx.$style.disabled]: _ctx.isNewWorkflow }),
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.accordion.footer.settingsLink")), 1)
              ]),
              _: 1
            }, 8, ["onClick", "class"])
          ]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]),
    _: 1
  }, 8, ["class", "title", "items", "initiallyExpanded", "headerIcon", "onClick:body", "onTooltipClick"]);
}
const cssModules = {
  "$style": style0
};
const ExecutionsInfoAccordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  ExecutionsInfoAccordion as E
};
