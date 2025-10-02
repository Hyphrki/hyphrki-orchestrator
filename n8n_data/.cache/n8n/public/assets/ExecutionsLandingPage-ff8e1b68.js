import { H as useWorkflowsStore, n as useUIStore, a4 as PLACEHOLDER_EMPTY_WORKFLOW_ID, B as VIEWS, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { E as ExecutionsInfoAccordion } from "./ExecutionsInfoAccordion-ff562257.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./lodash-es-be629387.js";
import "./@vueuse/core-f4908be6.js";
import "./uuid-2dfcd766.js";
import "./vue-i18n-86898575.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
import "./index-00f166b0.js";
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
import "./codemirror-lang-n8n-expression-5b146a0d.js";
import "./fast-json-stable-stringify-4acbec5d.js";
import "./timeago.js-527228bd.js";
import "./qrcode.vue-401ae704.js";
import "./vue3-touch-events-c30a9e21.js";
import "./@fortawesome/free-solid-svg-icons-e786cea6.js";
import "./@fortawesome/free-regular-svg-icons-d7581360.js";
import "./chart.js-b7590faa.js";
const _sfc_main = defineComponent({
  name: "executions-landing-page",
  components: {
    ExecutionsInfoAccordion
  },
  computed: {
    ...mapStores(useUIStore, useWorkflowsStore),
    executionCount() {
      return this.workflowsStore.currentWorkflowExecutions.length;
    },
    containsTrigger() {
      return this.workflowsStore.workflowTriggerNodes.length > 0;
    }
  },
  methods: {
    onSetupFirstStep(event) {
      this.uiStore.addFirstStepOnLoad = true;
      const workflowRoute = this.getWorkflowRoute();
      void this.$router.push(workflowRoute);
    },
    getWorkflowRoute() {
      const workflowId = this.workflowsStore.workflowId || this.$route.params.name;
      if (workflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID) {
        return { name: VIEWS.NEW_WORKFLOW, params: {} };
      } else {
        return { name: VIEWS.WORKFLOW, params: { name: workflowId } };
      }
    }
  }
});
const container = "_container_liidw_5";
const messageContainer = "_messageContainer_liidw_15";
const icon = "_icon_liidw_26";
const style0 = {
  container,
  messageContainer,
  icon
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_executions_info_accordion = resolveComponent("executions-info-accordion");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["workflow-executions-container", _ctx.$style.container])
  }, [
    _ctx.executionCount === 0 ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([_ctx.$style.messageContainer, _ctx.$style.noExecutionsMessage])
    }, [
      !_ctx.containsTrigger ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n8n_heading, {
          tag: "h2",
          size: "xlarge",
          color: "text-dark",
          class: "mb-2xs"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.noTrigger.heading")), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_text, { size: "medium" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.message")), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_button, {
          class: "mt-l",
          type: "tertiary",
          size: "large",
          onClick: _ctx.onSetupFirstStep
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.noTrigger.buttonText")), 1)
          ]),
          _: 1
        }, 8, ["onClick"])
      ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(_component_n8n_heading, {
          tag: "h2",
          size: "xlarge",
          color: "text-dark",
          class: "mb-2xs"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.emptyState.heading")), 1)
          ]),
          _: 1
        }),
        createVNode(_component_executions_info_accordion)
      ]))
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const ExecutionsLandingPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  ExecutionsLandingPage as default
};
