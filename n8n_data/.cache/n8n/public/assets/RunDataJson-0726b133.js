import { gy as nonExistingJsonPath, H as useWorkflowsStore, W as useNDVStore, ao as executionDataToJson, dS as shorten, gw as getMappedExpression, eM as isString, cT as __vitePreload, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { d as defineComponent, r as ref, aI as defineAsyncComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, b as createBlock, aK as Suspense, f as withCtx, q as createCommentVNode, i as createVNode, j as createBaseVNode, t as toDisplayString } from "./vendor-fd4bd18c.js";
import { V as VueJsonPretty } from "./vue-json-pretty-1f49a504.js";
import { D as Draggable } from "./NodeView-413a24e1.js";
import { e as externalHooks } from "./index-00f166b0.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { M as MappingPill } from "./MappingPill-f04ee9de.js";
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
import "./file-saver-ccbe3603.js";
import "./RunDataAi-1d763057.js";
import "./vue-markdown-render-1dc15361.js";
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
import "./workflowActivate-7e113acb.js";
const RunDataJsonActions = defineAsyncComponent(
  async () => __vitePreload(() => import("./RunDataJsonActions-76b02ed4.js"), true ? ["assets/RunDataJsonActions-76b02ed4.js","assets/vendor-fd4bd18c.js","assets/pinia-282957dc.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/jsonpath-adee9962.js","assets/index-00f166b0.js","assets/prettier-ee8b90a8.js","assets/codemirror-lang-html-n8n-1744db69.js","assets/@n8n/codemirror-lang-sql-71393e13.js","assets/@lezer/common-ff1769bd.js","assets/codemirror-lang-n8n-expression-5b146a0d.js","assets/fast-json-stable-stringify-4acbec5d.js","assets/timeago.js-527228bd.js","assets/qrcode.vue-401ae704.js","assets/vue3-touch-events-c30a9e21.js","assets/@fortawesome/free-solid-svg-icons-e786cea6.js","assets/@fortawesome/free-regular-svg-icons-d7581360.js","assets/chart.js-b7590faa.js","assets/index-ef6ecd1d.css","assets/NodeView-413a24e1.js","assets/file-saver-ccbe3603.js","assets/vue-json-pretty-1f49a504.js","assets/RunDataAi-1d763057.js","assets/vue-markdown-render-1dc15361.js","assets/RunDataAi-eaec1b12.css","assets/workflowActivate-7e113acb.js","assets/NodeView-5af9d965.css","assets/RunDataJsonActions-09bb9331.css"] : void 0)
);
const _sfc_main = defineComponent({
  name: "run-data-json",
  mixins: [externalHooks],
  components: {
    VueJsonPretty,
    Draggable,
    RunDataJsonActions,
    MappingPill
  },
  props: {
    editMode: {
      type: Object
    },
    sessionId: {
      type: String
    },
    paneType: {
      type: String
    },
    node: {
      type: Object
    },
    inputData: {
      type: Array
    },
    mappingEnabled: {
      type: Boolean
    },
    distanceFromActive: {
      type: Number
    },
    runIndex: {
      type: Number
    },
    totalRuns: {
      type: Number
    }
  },
  setup() {
    const selectedJsonPath = ref(nonExistingJsonPath);
    const draggingPath = ref(null);
    const displayMode = ref("json");
    return {
      selectedJsonPath,
      draggingPath,
      displayMode
    };
  },
  computed: {
    ...mapStores(useNDVStore, useWorkflowsStore),
    jsonData() {
      return executionDataToJson(this.inputData);
    }
  },
  methods: {
    getShortKey(el) {
      if (!el) {
        return "";
      }
      return shorten(el.dataset.name || "", 16, 2);
    },
    getJsonParameterPath(path) {
      const subPath = path.replace(/^(\["?\d"?])/, "");
      return getMappedExpression({
        nodeName: this.node.name,
        distanceFromActive: this.distanceFromActive,
        path: subPath
      });
    },
    onDragStart(el) {
      if (el == null ? void 0 : el.dataset.path) {
        this.draggingPath = el.dataset.path;
      }
      this.ndvStore.resetMappingTelemetry();
    },
    onDragEnd(el) {
      this.draggingPath = null;
      const mappingTelemetry = this.ndvStore.mappingTelemetry;
      const telemetryPayload = {
        src_node_type: this.node.type,
        src_field_name: el.dataset.name || "",
        src_nodes_back: this.distanceFromActive,
        src_run_index: this.runIndex,
        src_runs_total: this.totalRuns,
        src_field_nest_level: el.dataset.depth || 0,
        src_view: "json",
        src_element: el,
        success: false,
        ...mappingTelemetry
      };
      setTimeout(() => {
        void this.$externalHooks().run("runDataJson.onDragEnd", telemetryPayload);
        this.$telemetry.track("User dragged data for mapping", telemetryPayload);
      }, 1e3);
    },
    getContent(value) {
      return isString(value) ? `"${value}"` : JSON.stringify(value);
    },
    getListItemName(path) {
      return path.replace(/^(\["?\d"?]\.?)/g, "");
    }
  }
});
const jsonDisplay = "_jsonDisplay_1wesj_5";
const mappable = "_mappable_1wesj_24";
const dragged = "_dragged_1wesj_31";
const style0 = {
  jsonDisplay,
  mappable,
  dragged
};
const RunDataJson_vue_vue_type_style_index_1_lang = "";
const _hoisted_1 = ["data-value", "data-name", "data-path", "data-depth"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = ["data-value", "data-name", "data-path", "data-depth"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_run_data_json_actions = resolveComponent("run-data-json-actions");
  const _component_MappingPill = resolveComponent("MappingPill");
  const _component_vue_json_pretty = resolveComponent("vue-json-pretty");
  const _component_draggable = resolveComponent("draggable");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.jsonDisplay)
  }, [
    (openBlock(), createBlock(Suspense, null, {
      default: withCtx(() => [
        !_ctx.editMode.enabled ? (openBlock(), createBlock(_component_run_data_json_actions, {
          key: 0,
          node: _ctx.node,
          sessioId: _ctx.sessionId,
          displayMode: _ctx.displayMode,
          distanceFromActive: _ctx.distanceFromActive,
          selectedJsonPath: _ctx.selectedJsonPath,
          jsonData: _ctx.jsonData,
          paneType: _ctx.paneType
        }, null, 8, ["node", "sessioId", "displayMode", "distanceFromActive", "selectedJsonPath", "jsonData", "paneType"])) : createCommentVNode("", true)
      ]),
      _: 1
    })),
    createVNode(_component_draggable, {
      type: "mapping",
      targetDataKey: "mappable",
      disabled: !_ctx.mappingEnabled,
      onDragstart: _ctx.onDragStart,
      onDragend: _ctx.onDragEnd
    }, {
      preview: withCtx(({ canDrop, el }) => [
        el ? (openBlock(), createBlock(_component_MappingPill, {
          key: 0,
          html: _ctx.getShortKey(el),
          "can-drop": canDrop
        }, null, 8, ["html", "can-drop"])) : createCommentVNode("", true)
      ]),
      default: withCtx(() => [
        createVNode(_component_vue_json_pretty, {
          data: _ctx.jsonData,
          deep: 10,
          showLength: true,
          selectedValue: _ctx.selectedJsonPath,
          rootPath: "",
          selectableType: "single",
          class: "json-data",
          "onUpdate:selectedValue": _cache[0] || (_cache[0] = ($event) => _ctx.selectedJsonPath = $event)
        }, {
          renderNodeKey: withCtx(({ node }) => [
            createBaseVNode("span", {
              "data-target": "mappable",
              "data-value": _ctx.getJsonParameterPath(node.path),
              "data-name": node.key,
              "data-path": node.path,
              "data-depth": node.level,
              class: normalizeClass({
                [_ctx.$style.mappable]: _ctx.mappingEnabled,
                [_ctx.$style.dragged]: _ctx.draggingPath === node.path
              })
            }, '"' + toDisplayString(node.key) + '"', 11, _hoisted_1)
          ]),
          renderNodeValue: withCtx(({ node }) => [
            isNaN(node.index) ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.getContent(node.content)), 1)) : (openBlock(), createElementBlock("span", {
              key: 1,
              "data-target": "mappable",
              "data-value": _ctx.getJsonParameterPath(node.path),
              "data-name": _ctx.getListItemName(node.path),
              "data-path": node.path,
              "data-depth": node.level,
              class: normalizeClass([{
                [_ctx.$style.mappable]: _ctx.mappingEnabled,
                [_ctx.$style.dragged]: _ctx.draggingPath === node.path
              }, "ph-no-capture"])
            }, toDisplayString(_ctx.getContent(node.content)), 11, _hoisted_3))
          ]),
          _: 1
        }, 8, ["data", "selectedValue"])
      ]),
      _: 1
    }, 8, ["disabled", "onDragstart", "onDragend"])
  ], 2);
}
const cssModules = {
  "$style": style0
};
const RunDataJson = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  RunDataJson as default
};
