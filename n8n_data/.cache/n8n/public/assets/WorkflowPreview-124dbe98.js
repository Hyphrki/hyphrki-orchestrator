import { d as defineComponent, r as ref, c as computed, N as onMounted, M as onBeforeUnmount, w as watch, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, q as createCommentVNode, j as createBaseVNode, p as unref } from "./vendor-fd4bd18c.js";
import { u as useToast, x as useRootStore, H as useWorkflowsStore, am as useI18n, _ as _export_sfc } from "./n8n-8ddd8349.js";
const _hoisted_1 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowPreview",
  props: {
    loading: { type: Boolean, default: false },
    mode: { default: "workflow" },
    workflow: {},
    executionId: {},
    executionMode: {},
    loaderType: { default: "image" }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const i18n = useI18n();
    const toast = useToast();
    const rootStore = useRootStore();
    const workflowsStore = useWorkflowsStore();
    const iframeRef = ref(null);
    const nodeViewDetailsOpened = ref(false);
    const ready = ref(false);
    const insideIframe = ref(false);
    const scrollX = ref(0);
    const scrollY = ref(0);
    const showPreview = computed(() => {
      return !props.loading && (props.mode === "workflow" && props.workflow || props.mode === "execution" && props.executionId) && ready.value;
    });
    const loadWorkflow = () => {
      var _a, _b, _c;
      try {
        if (!props.workflow) {
          throw new Error(i18n.baseText("workflowPreview.showError.missingWorkflow"));
        }
        if (!props.workflow.nodes || !Array.isArray(props.workflow.nodes)) {
          throw new Error(i18n.baseText("workflowPreview.showError.arrayEmpty"));
        }
        (_c = (_b = (_a = iframeRef.value) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.postMessage) == null ? void 0 : _c.call(
          _b,
          JSON.stringify({
            command: "openWorkflow",
            workflow: props.workflow
          }),
          "*"
        );
      } catch (error) {
        toast.showError(
          error,
          i18n.baseText("workflowPreview.showError.previewError.title"),
          i18n.baseText("workflowPreview.showError.previewError.message")
        );
      }
    };
    const loadExecution = () => {
      var _a, _b, _c, _d, _e, _f;
      try {
        if (!props.executionId) {
          throw new Error(i18n.baseText("workflowPreview.showError.missingExecution"));
        }
        (_c = (_b = (_a = iframeRef.value) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.postMessage) == null ? void 0 : _c.call(
          _b,
          JSON.stringify({
            command: "openExecution",
            executionId: props.executionId,
            executionMode: props.executionMode || ""
          }),
          "*"
        );
        if (workflowsStore.activeWorkflowExecution) {
          (_f = (_e = (_d = iframeRef.value) == null ? void 0 : _d.contentWindow) == null ? void 0 : _e.postMessage) == null ? void 0 : _f.call(
            _e,
            JSON.stringify({
              command: "setActiveExecution",
              execution: workflowsStore.activeWorkflowExecution
            }),
            "*"
          );
        }
      } catch (error) {
        toast.showError(
          error,
          i18n.baseText("workflowPreview.showError.previewError.title"),
          i18n.baseText("workflowPreview.executionMode.showError.previewError.message")
        );
      }
    };
    const onMouseEnter = () => {
      insideIframe.value = true;
      scrollX.value = window.scrollX;
      scrollY.value = window.scrollY;
    };
    const onMouseLeave = () => {
      insideIframe.value = false;
    };
    const receiveMessage = ({ data }) => {
      try {
        const json = JSON.parse(data);
        if (json.command === "n8nReady") {
          ready.value = true;
        } else if (json.command === "openNDV") {
          nodeViewDetailsOpened.value = true;
        } else if (json.command === "closeNDV") {
          nodeViewDetailsOpened.value = false;
        } else if (json.command === "error") {
          emit("close");
        }
      } catch (e) {
        console.error(e);
      }
    };
    const onDocumentScroll = () => {
      if (insideIframe.value) {
        window.scrollTo(scrollX.value, scrollY.value);
      }
    };
    onMounted(() => {
      window.addEventListener("message", receiveMessage);
      document.addEventListener("scroll", onDocumentScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("message", receiveMessage);
      document.removeEventListener("scroll", onDocumentScroll);
    });
    watch(
      () => showPreview.value,
      () => {
        if (showPreview.value) {
          if (props.mode === "workflow") {
            loadWorkflow();
          } else if (props.mode === "execution") {
            loadExecution();
          }
        }
      }
    );
    watch(
      () => props.executionId,
      () => {
        if (props.mode === "execution" && props.executionId) {
          loadExecution();
        }
      }
    );
    watch(
      () => props.workflow,
      () => {
        if (props.mode === "workflow" && props.workflow) {
          loadWorkflow();
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_n8n_spinner = resolveComponent("n8n-spinner");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        _ctx.loaderType === "image" && !showPreview.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.imageLoader)
        }, [
          createVNode(_component_n8n_loading, {
            loading: !showPreview.value,
            rows: 1,
            variant: "image"
          }, null, 8, ["loading"])
        ], 2)) : _ctx.loaderType === "spinner" && !showPreview.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.$style.spinner)
        }, [
          createVNode(_component_n8n_spinner, { type: "dots" })
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("iframe", {
          class: normalizeClass({
            [_ctx.$style.workflow]: !nodeViewDetailsOpened.value,
            [_ctx.$style.executionPreview]: _ctx.mode === "execution",
            [_ctx.$style.openNDV]: nodeViewDetailsOpened.value,
            [_ctx.$style.show]: showPreview.value
          }),
          ref_key: "iframeRef",
          ref: iframeRef,
          src: `${unref(rootStore).baseUrl}workflows/demo`,
          onMouseenter: onMouseEnter,
          onMouseleave: onMouseLeave
        }, null, 42, _hoisted_1)
      ], 2);
    };
  }
});
const container = "_container_2z8pg_5";
const workflow = "_workflow_2z8pg_12";
const show = "_show_2z8pg_18";
const openNDV = "_openNDV_2z8pg_24";
const spinner = "_spinner_2z8pg_33";
const imageLoader = "_imageLoader_2z8pg_41";
const executionPreview = "_executionPreview_2z8pg_45";
const style0 = {
  container,
  workflow,
  show,
  openNDV,
  spinner,
  imageLoader,
  executionPreview
};
const cssModules = {
  "$style": style0
};
const WorkflowPreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowPreview as W
};
