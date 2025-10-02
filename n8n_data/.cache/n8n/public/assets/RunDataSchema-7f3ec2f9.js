import { d as defineComponent, c as computed, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, t as toDisplayString, q as createCommentVNode, a3 as Fragment, ai as renderList, b as createBlock, a9 as normalizeStyle, r as ref, f as withCtx, s as createTextVNode, p as unref } from "./vendor-fd4bd18c.js";
import { dS as shorten, gw as getMappedExpression, gz as checkExhaustive, _ as _export_sfc, W as useNDVStore, cN as isEmpty, p as i18n, al as useDataSchema, l as runExternalHook, gi as telemetry } from "./n8n-8ddd8349.js";
import { D as Draggable } from "./NodeView-413a24e1.js";
import { M as MappingPill } from "./MappingPill-f04ee9de.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./pinia-282957dc.js";
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
import "./file-saver-ccbe3603.js";
import "./vue-json-pretty-1f49a504.js";
import "./RunDataAi-1d763057.js";
import "./vue-markdown-render-1dc15361.js";
import "./workflowActivate-7e113acb.js";
const _hoisted_1 = ["title"];
const _hoisted_2 = ["data-value", "data-name", "data-path", "data-depth"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["id"];
const _hoisted_5 = ["for"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RunDataSchemaItem",
  props: {
    schema: {},
    level: {},
    parent: {},
    subKey: {},
    paneType: {},
    mappingEnabled: { type: Boolean },
    draggingPath: {},
    distanceFromActive: {},
    node: {}
  },
  setup(__props) {
    const props = __props;
    const isSchemaValueArray = computed(() => Array.isArray(props.schema.value));
    const isSchemaParentTypeArray = computed(() => {
      var _a;
      return ((_a = props.parent) == null ? void 0 : _a.type) === "array";
    });
    const isFlat = computed(
      () => props.level === 0 && Array.isArray(props.schema.value) && props.schema.value.every((v) => !Array.isArray(v.value))
    );
    const key = computed(
      () => isSchemaParentTypeArray.value ? `[${props.schema.key}]` : props.schema.key
    );
    const schemaName = computed(
      () => isSchemaParentTypeArray.value ? `${props.schema.type}[${props.schema.key}]` : props.schema.key
    );
    const text2 = computed(
      () => Array.isArray(props.schema.value) ? "" : shorten(props.schema.value, 600, 0)
    );
    const getJsonParameterPath = (path) => getMappedExpression({
      nodeName: props.node.name,
      distanceFromActive: props.distanceFromActive,
      path
    });
    const transitionDelay = (i) => `${i * 0.033}s`;
    const getIconBySchemaType = (type) => {
      switch (type) {
        case "object":
          return "cube";
        case "array":
          return "list";
        case "string":
        case "null":
          return "font";
        case "number":
          return "hashtag";
        case "boolean":
          return "check-square";
        case "function":
          return "code";
        case "bigint":
          return "calculator";
        case "symbol":
          return "sun";
        case "undefined":
          return "ban";
      }
      checkExhaustive(type);
    };
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_run_data_schema_item = resolveComponent("run-data-schema-item", true);
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.item),
        "data-test-id": "run-data-schema-item"
      }, [
        _ctx.level > 0 || _ctx.level === 0 && !isSchemaValueArray.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          title: _ctx.schema.type,
          class: normalizeClass({
            [_ctx.$style.pill]: true,
            [_ctx.$style.mappable]: _ctx.mappingEnabled,
            [_ctx.$style.dragged]: _ctx.draggingPath === _ctx.schema.path
          })
        }, [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.label),
            "data-value": getJsonParameterPath(_ctx.schema.path),
            "data-name": schemaName.value,
            "data-path": _ctx.schema.path,
            "data-depth": _ctx.level,
            "data-target": "mappable"
          }, [
            createVNode(_component_font_awesome_icon, {
              icon: getIconBySchemaType(_ctx.schema.type),
              size: "sm"
            }, null, 8, ["icon"]),
            isSchemaParentTypeArray.value ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.parent.key), 1)) : createCommentVNode("", true),
            key.value ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass({ [_ctx.$style.arrayIndex]: isSchemaParentTypeArray.value })
            }, toDisplayString(key.value), 3)) : createCommentVNode("", true)
          ], 10, _hoisted_2)
        ], 10, _hoisted_1)) : createCommentVNode("", true),
        text2.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(_ctx.$style.text)
        }, toDisplayString(text2.value), 3)) : createCommentVNode("", true),
        _ctx.level > 0 && isSchemaValueArray.value ? (openBlock(), createElementBlock("input", {
          key: 2,
          id: _ctx.subKey,
          type: "checkbox",
          checked: ""
        }, null, 8, _hoisted_4)) : createCommentVNode("", true),
        _ctx.level > 0 && isSchemaValueArray.value ? (openBlock(), createElementBlock("label", {
          key: 3,
          class: normalizeClass(_ctx.$style.toggle),
          for: _ctx.subKey
        }, [
          createVNode(_component_font_awesome_icon, { icon: "angle-up" })
        ], 10, _hoisted_5)) : createCommentVNode("", true),
        isSchemaValueArray.value ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: normalizeClass({ [_ctx.$style.sub]: true, [_ctx.$style.flat]: isFlat.value })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.schema.value, (s, i) => {
            return openBlock(), createBlock(_component_run_data_schema_item, {
              key: `${s.type}-${_ctx.level}-${i}`,
              schema: s,
              level: _ctx.level + 1,
              parent: _ctx.schema,
              paneType: _ctx.paneType,
              subKey: `${_ctx.paneType}_${s.type}-${_ctx.level}-${i}`,
              mappingEnabled: _ctx.mappingEnabled,
              draggingPath: _ctx.draggingPath,
              distanceFromActive: _ctx.distanceFromActive,
              node: _ctx.node,
              style: normalizeStyle({ transitionDelay: transitionDelay(i) })
            }, null, 8, ["schema", "level", "parent", "paneType", "subKey", "mappingEnabled", "draggingPath", "distanceFromActive", "node", "style"]);
          }), 128))
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const item = "_item_dk8yb_5";
const sub = "_sub_dk8yb_18";
const toggle = "_toggle_dk8yb_24";
const flat = "_flat_dk8yb_45";
const pill = "_pill_dk8yb_55";
const mappable = "_mappable_dk8yb_74";
const dragged = "_dragged_dk8yb_82";
const label = "_label_dk8yb_93";
const arrayIndex = "_arrayIndex_dk8yb_98";
const text = "_text_dk8yb_104";
const style0$1 = {
  item,
  sub,
  toggle,
  flat,
  pill,
  mappable,
  dragged,
  label,
  arrayIndex,
  text
};
const cssModules$1 = {
  "$style": style0$1
};
const RunDataSchemaItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RunDataSchema",
  props: {
    data: {},
    mappingEnabled: { type: Boolean },
    distanceFromActive: { default: 0 },
    runIndex: {},
    totalRuns: {},
    paneType: {},
    node: {}
  },
  setup(__props) {
    const props = __props;
    const draggingPath = ref("");
    const ndvStore = useNDVStore();
    const { getSchemaForExecutionData } = useDataSchema();
    const schema2 = computed(() => getSchemaForExecutionData(props.data));
    const isDataEmpty = computed(() => isEmpty(props.data));
    const onDragStart = (el) => {
      var _a;
      if ((_a = el == null ? void 0 : el.dataset) == null ? void 0 : _a.path) {
        draggingPath.value = el.dataset.path;
      }
      ndvStore.resetMappingTelemetry();
    };
    const onDragEnd = (el) => {
      draggingPath.value = "";
      setTimeout(() => {
        var _a;
        const mappingTelemetry = ndvStore.mappingTelemetry;
        const telemetryPayload = {
          src_node_type: (_a = props.node) == null ? void 0 : _a.type,
          src_field_name: el.dataset.name || "",
          src_nodes_back: props.distanceFromActive,
          src_run_index: props.runIndex,
          src_runs_total: props.totalRuns,
          src_field_nest_level: el.dataset.depth || 0,
          src_view: "schema",
          src_element: el,
          success: false,
          ...mappingTelemetry
        };
        void runExternalHook("runDataJson.onDragEnd", telemetryPayload);
        telemetry.track("User dragged data for mapping", telemetryPayload);
      }, 1e3);
    };
    return (_ctx, _cache) => {
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.schemaWrapper)
      }, [
        isDataEmpty.value ? (openBlock(), createBlock(_component_n8n_info_tip, { key: 0 }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(i18n).baseText("dataMapping.schemaView.emptyData")), 1)
          ]),
          _: 1
        })) : (openBlock(), createBlock(Draggable, {
          key: 1,
          type: "mapping",
          targetDataKey: "mappable",
          disabled: !_ctx.mappingEnabled,
          onDragstart: onDragStart,
          onDragend: onDragEnd
        }, {
          preview: withCtx(({ canDrop, el }) => [
            el ? (openBlock(), createBlock(MappingPill, {
              key: 0,
              html: el.outerHTML,
              "can-drop": canDrop
            }, null, 8, ["html", "can-drop"])) : createCommentVNode("", true)
          ]),
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.schema)
            }, [
              createVNode(RunDataSchemaItem, {
                schema: schema2.value,
                level: 0,
                parent: null,
                paneType: _ctx.paneType,
                subKey: `${schema2.value.type}-0-0`,
                mappingEnabled: _ctx.mappingEnabled,
                draggingPath: draggingPath.value,
                distanceFromActive: _ctx.distanceFromActive,
                node: _ctx.node
              }, null, 8, ["schema", "paneType", "subKey", "mappingEnabled", "draggingPath", "distanceFromActive", "node"])
            ], 2)
          ]),
          _: 1
        }, 8, ["disabled"]))
      ], 2);
    };
  }
});
const schemaWrapper = "_schemaWrapper_czk1f_5";
const schema = "_schema_czk1f_5";
const style0 = {
  schemaWrapper,
  schema
};
const cssModules = {
  "$style": style0
};
const RunDataSchema = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  RunDataSchema as default
};
