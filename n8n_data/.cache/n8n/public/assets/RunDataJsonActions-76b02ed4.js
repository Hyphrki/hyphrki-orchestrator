import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, b as createBlock, f as withCtx, i as createVNode, s as createTextVNode, t as toDisplayString, j as createBaseVNode } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { j as jp } from "./jsonpath-adee9962.js";
import { g as genericHelpers, n as nodeHelpers, c as copyPaste } from "./index-00f166b0.js";
import { p as pinData } from "./NodeView-413a24e1.js";
import { gy as nonExistingJsonPath, u as useToast, H as useWorkflowsStore, W as useNDVStore, eo as clearJsonKey, ao as executionDataToJson, gC as convertPath, am as useI18n, _ as _export_sfc } from "./n8n-8ddd8349.js";
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
import "./lodash-es-be629387.js";
import "./uuid-2dfcd766.js";
import "./luxon-63e8a0ed.js";
import "./esprima-next-b5fc8919.js";
import "./@vueuse/core-f4908be6.js";
import "./codemirror-lang-n8n-expression-5b146a0d.js";
import "./fast-json-stable-stringify-4acbec5d.js";
import "./timeago.js-527228bd.js";
import "./qrcode.vue-401ae704.js";
import "./vue3-touch-events-c30a9e21.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@fortawesome/free-solid-svg-icons-e786cea6.js";
import "./@fortawesome/free-regular-svg-icons-d7581360.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
import "./chart.js-b7590faa.js";
import "./flatted-551ad821.js";
import "./vue-i18n-86898575.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
import "./file-saver-ccbe3603.js";
import "./vue-json-pretty-1f49a504.js";
import "./RunDataAi-1d763057.js";
import "./vue-markdown-render-1dc15361.js";
import "./workflowActivate-7e113acb.js";
const _sfc_main = defineComponent({
  name: "run-data-json-actions",
  mixins: [genericHelpers, nodeHelpers, pinData, copyPaste],
  props: {
    node: {
      type: Object
    },
    paneType: {
      type: String
    },
    sessionId: {
      type: String
    },
    currentOutputIndex: {
      type: Number
    },
    runIndex: {
      type: Number
    },
    displayMode: {
      type: String
    },
    distanceFromActive: {
      type: Number
    },
    selectedJsonPath: {
      type: String,
      default: nonExistingJsonPath
    },
    jsonData: {
      type: Array,
      required: true
    }
  },
  setup() {
    const i18n = useI18n();
    return {
      i18n,
      ...useToast()
    };
  },
  computed: {
    ...mapStores(useNDVStore, useWorkflowsStore),
    activeNode() {
      return this.ndvStore.activeNode;
    },
    noSelection() {
      return this.selectedJsonPath === nonExistingJsonPath;
    },
    normalisedJsonPath() {
      return this.noSelection ? '[""]' : this.selectedJsonPath;
    }
  },
  methods: {
    getJsonValue() {
      let selectedValue = jp.query(this.jsonData, `$${this.normalisedJsonPath}`)[0];
      if (this.noSelection) {
        if (this.hasPinData) {
          selectedValue = clearJsonKey(this.pinData);
        } else {
          selectedValue = executionDataToJson(
            this.getNodeInputData(this.node, this.runIndex, this.currentOutputIndex)
          );
        }
      }
      let value = "";
      if (typeof selectedValue === "object") {
        value = JSON.stringify(selectedValue, null, 2);
      } else {
        value = selectedValue.toString();
      }
      return value;
    },
    getJsonItemPath() {
      const newPath = convertPath(this.normalisedJsonPath);
      let startPath = "";
      let path = "";
      const pathParts = newPath.split("]");
      const index = pathParts[0].slice(1);
      path = pathParts.slice(1).join("]");
      startPath = `$item(${index}).$node["${this.node.name}"].json`;
      return { path, startPath };
    },
    getJsonParameterPath() {
      const newPath = convertPath(this.normalisedJsonPath);
      const path = newPath.split("]").slice(1).join("]");
      let startPath = `$node["${this.node.name}"].json`;
      if (this.distanceFromActive === 1) {
        startPath = "$json";
      }
      return { path, startPath };
    },
    handleCopyClick(commandData) {
      let value;
      if (commandData.command === "value") {
        value = this.getJsonValue();
        this.showToast({
          title: this.i18n.baseText("runData.copyValue.toast"),
          message: "",
          type: "success",
          duration: 2e3
        });
      } else {
        let startPath = "";
        let path = "";
        if (commandData.command === "itemPath") {
          const jsonItemPath = this.getJsonItemPath();
          startPath = jsonItemPath.startPath;
          path = jsonItemPath.path;
          this.showToast({
            title: this.i18n.baseText("runData.copyItemPath.toast"),
            message: "",
            type: "success",
            duration: 2e3
          });
        } else if (commandData.command === "parameterPath") {
          const jsonParameterPath = this.getJsonParameterPath();
          startPath = jsonParameterPath.startPath;
          path = jsonParameterPath.path;
          this.showToast({
            title: this.i18n.baseText("runData.copyParameterPath.toast"),
            message: "",
            type: "success",
            duration: 2e3
          });
        }
        if (!path.startsWith("[") && !path.startsWith(".") && path) {
          path += ".";
        }
        value = `{{ ${startPath + path} }}`;
      }
      const copyType = {
        value: "selection",
        itemPath: "item_path",
        parameterPath: "parameter_path"
      }[commandData.command];
      this.$telemetry.track("User copied ndv data", {
        node_type: this.activeNode.type,
        session_id: this.sessionId,
        run_index: this.runIndex,
        view: "json",
        copy_type: copyType,
        workflow_id: this.workflowsStore.workflowId,
        pane: this.paneType,
        in_execution_log: this.isReadOnlyRoute
      });
      this.copyToClipboard(value);
    }
  }
});
const actionsGroup = "_actionsGroup_1ai92_5";
const style0 = {
  actionsGroup
};
const _hoisted_1 = { class: "el-dropdown-link" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.actionsGroup)
  }, [
    _ctx.noSelection ? (openBlock(), createBlock(_component_n8n_icon_button, {
      key: 0,
      title: _ctx.i18n.baseText("runData.copyToClipboard"),
      icon: "copy",
      type: "tertiary",
      circle: false,
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleCopyClick({ command: "value" }))
    }, null, 8, ["title"])) : (openBlock(), createBlock(_component_el_dropdown, {
      key: 1,
      trigger: "click",
      onCommand: _ctx.handleCopyClick
    }, {
      dropdown: withCtx(() => [
        createVNode(_component_el_dropdown_menu, null, {
          default: withCtx(() => [
            createVNode(_component_el_dropdown_item, { command: { command: "value" } }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.i18n.baseText("runData.copyValue")), 1)
              ]),
              _: 1
            }),
            createVNode(_component_el_dropdown_item, {
              command: { command: "itemPath" },
              divided: ""
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.i18n.baseText("runData.copyItemPath")), 1)
              ]),
              _: 1
            }),
            createVNode(_component_el_dropdown_item, { command: { command: "parameterPath" } }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.i18n.baseText("runData.copyParameterPath")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      default: withCtx(() => [
        createBaseVNode("span", _hoisted_1, [
          createVNode(_component_n8n_icon_button, {
            title: _ctx.i18n.baseText("runData.copyToClipboard"),
            icon: "copy",
            type: "tertiary",
            circle: false
          }, null, 8, ["title"])
        ])
      ]),
      _: 1
    }, 8, ["onCommand"]))
  ], 2);
}
const cssModules = {
  "$style": style0
};
const RunDataJsonActions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  RunDataJsonActions as default
};
