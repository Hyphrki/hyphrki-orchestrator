import { u as useToast, H as useWorkflowsStore, n as useUIStore, d4 as getActivatableTriggerNodes, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { w as workflowActivate } from "./workflowActivate-7e113acb.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { d as defineComponent, aB as pushScopeId, aC as popScopeId, h as resolveComponent, aw as resolveDirective, o as openBlock, k as createElementBlock, j as createBaseVNode, n as normalizeClass, b as createBlock, f as withCtx, s as createTextVNode, t as toDisplayString, i as createVNode, ac as withDirectives, q as createCommentVNode } from "./vendor-fd4bd18c.js";
const _sfc_main = defineComponent({
  name: "WorkflowActivator",
  props: ["workflowActive", "workflowId"],
  mixins: [workflowActivate],
  setup(props) {
    var _a, _b;
    return {
      ...useToast(),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = workflowActivate).setup) == null ? void 0 : _b.call(_a, props)
    };
  },
  computed: {
    ...mapStores(useUIStore, useWorkflowsStore),
    nodesIssuesExist() {
      return this.workflowsStore.nodesIssuesExist;
    },
    isWorkflowActive() {
      const activeWorkflows = this.workflowsStore.activeWorkflows;
      return activeWorkflows.includes(this.workflowId);
    },
    couldNotBeStarted() {
      return this.workflowActive === true && this.isWorkflowActive !== this.workflowActive;
    },
    getActiveColor() {
      if (this.couldNotBeStarted) {
        return "#ff4949";
      }
      return "#13ce66";
    },
    isCurrentWorkflow() {
      return this.workflowsStore.workflowId === this.workflowId;
    },
    disabled() {
      const isNewWorkflow = !this.workflowId;
      if (isNewWorkflow || this.isCurrentWorkflow) {
        return !this.workflowActive && !this.containsTrigger;
      }
      return false;
    },
    containsTrigger() {
      const foundTriggers = getActivatableTriggerNodes(this.workflowsStore.workflowTriggerNodes);
      return foundTriggers.length > 0;
    }
  },
  methods: {
    async activeChanged(newActiveState) {
      return this.updateWorkflowActivation(this.workflowId, newActiveState);
    },
    async displayActivationError() {
      let errorMessage;
      try {
        const errorData = await this.workflowsStore.getActivationError(this.workflowId);
        if (errorData === void 0) {
          errorMessage = this.$locale.baseText(
            "workflowActivator.showMessage.displayActivationError.message.errorDataUndefined"
          );
        } else {
          errorMessage = this.$locale.baseText(
            "workflowActivator.showMessage.displayActivationError.message.errorDataNotUndefined",
            { interpolate: { message: errorData.error.message } }
          );
        }
      } catch (error) {
        errorMessage = this.$locale.baseText(
          "workflowActivator.showMessage.displayActivationError.message.catchBlock"
        );
      }
      this.showMessage({
        title: this.$locale.baseText("workflowActivator.showMessage.displayActivationError.title"),
        message: errorMessage,
        type: "warning",
        duration: 0,
        dangerouslyUseHTMLString: true
      });
    }
  }
});
const activeStatusText = "_activeStatusText_1dwsh_5";
const style0 = {
  activeStatusText
};
const WorkflowActivator_vue_vue_type_style_index_1_scoped_b7dc7897_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-b7dc7897"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "workflow-activator" };
const _hoisted_2 = {
  key: 0,
  class: "could-not-be-started"
};
const _hoisted_3 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_el_switch = resolveComponent("el-switch");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _directive_loading = resolveDirective("loading");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.activeStatusText),
      "data-test-id": "workflow-activator-status"
    }, [
      _ctx.workflowActive ? (openBlock(), createBlock(_component_n8n_text, {
        key: 0,
        color: _ctx.couldNotBeStarted ? "danger" : "success",
        size: "small",
        bold: ""
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("workflowActivator.active")), 1)
        ]),
        _: 1
      }, 8, ["color"])) : (openBlock(), createBlock(_component_n8n_text, {
        key: 1,
        color: "text-base",
        size: "small",
        bold: ""
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("workflowActivator.inactive")), 1)
        ]),
        _: 1
      }))
    ], 2),
    createVNode(_component_n8n_tooltip, {
      disabled: !_ctx.disabled,
      placement: "bottom"
    }, {
      content: withCtx(() => [
        createBaseVNode("div", null, toDisplayString(_ctx.$locale.baseText("workflowActivator.thisWorkflowHasNoTriggerNodes")), 1)
      ]),
      default: withCtx(() => [
        withDirectives(createVNode(_component_el_switch, {
          modelValue: _ctx.workflowActive,
          "onUpdate:modelValue": _ctx.activeChanged,
          title: _ctx.workflowActive ? _ctx.$locale.baseText("workflowActivator.deactivateWorkflow") : _ctx.$locale.baseText("workflowActivator.activateWorkflow"),
          disabled: _ctx.disabled || _ctx.updatingWorkflowActivation,
          "active-color": _ctx.getActiveColor,
          "inactive-color": "#8899AA",
          "element-loading-spinner": "el-icon-loading",
          "data-test-id": "workflow-activate-switch"
        }, null, 8, ["modelValue", "onUpdate:modelValue", "title", "disabled", "active-color"]), [
          [_directive_loading, _ctx.updatingWorkflowActivation]
        ])
      ]),
      _: 1
    }, 8, ["disabled"]),
    _ctx.couldNotBeStarted ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode(_component_n8n_tooltip, { placement: "top" }, {
        content: withCtx(() => [
          createBaseVNode("div", {
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.displayActivationError && _ctx.displayActivationError(...args)),
            innerHTML: _ctx.$locale.baseText("workflowActivator.theWorkflowIsSetToBeActiveBut")
          }, null, 8, _hoisted_3)
        ]),
        default: withCtx(() => [
          createVNode(_component_font_awesome_icon, {
            onClick: _ctx.displayActivationError,
            icon: "exclamation-triangle"
          }, null, 8, ["onClick"])
        ]),
        _: 1
      })
    ])) : createCommentVNode("", true)
  ]);
}
const cssModules = {
  "$style": style0
};
const WorkflowActivator = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules], ["__scopeId", "data-v-b7dc7897"]]);
export {
  WorkflowActivator as W
};
