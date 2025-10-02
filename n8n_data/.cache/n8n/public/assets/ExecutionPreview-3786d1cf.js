import { d as defineComponent, j as createBaseVNode, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { f_ as ElDropdown, B as VIEWS, $ as useMessage, fh as useExecutionDebugging, a9 as MODAL_CONFIRM, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { W as WorkflowPreview } from "./WorkflowPreview-124dbe98.js";
import { e as executionHelpers } from "./executionsHelpers-fe945104.js";
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
const _sfc_main = defineComponent({
  name: "execution-preview",
  mixins: [executionHelpers],
  components: {
    ElDropdown,
    WorkflowPreview
  },
  data() {
    return {
      VIEWS
    };
  },
  setup() {
    return {
      ...useMessage(),
      ...useExecutionDebugging()
    };
  },
  computed: {
    executionUIDetails() {
      return this.activeExecution ? this.getExecutionUIDetails(this.activeExecution) : null;
    },
    executionMode() {
      var _a;
      return ((_a = this.activeExecution) == null ? void 0 : _a.mode) || "";
    },
    debugButtonData() {
      var _a;
      return ((_a = this.activeExecution) == null ? void 0 : _a.status) === "success" ? {
        text: this.$locale.baseText("executionsList.debug.button.copyToEditor"),
        type: "secondary"
      } : {
        text: this.$locale.baseText("executionsList.debug.button.debugInEditor"),
        type: "primary"
      };
    }
  },
  methods: {
    async onDeleteExecution() {
      const deleteConfirmed = await this.confirm(
        this.$locale.baseText("executionDetails.confirmMessage.message"),
        this.$locale.baseText("executionDetails.confirmMessage.headline"),
        {
          type: "warning",
          confirmButtonText: this.$locale.baseText(
            "executionDetails.confirmMessage.confirmButtonText"
          ),
          cancelButtonText: ""
        }
      );
      if (deleteConfirmed !== MODAL_CONFIRM) {
        return;
      }
      this.$emit("deleteCurrentExecution");
    },
    handleRetryClick(command) {
      this.$emit("retryExecution", { execution: this.activeExecution, command });
    },
    handleStopClick() {
      this.$emit("stopExecution");
    },
    onRetryButtonBlur(event) {
      const retryDropdownRef = this.$refs.retryDropdown;
      if (retryDropdownRef && event.relatedTarget === null) {
        retryDropdownRef.handleClose();
      }
    }
  }
});
const previewContainer = "_previewContainer_15m41_5";
const executionDetails = "_executionDetails_15m41_11";
const spinner = "_spinner_15m41_30";
const running = "_running_15m41_36";
const waiting = "_waiting_15m41_41";
const success = "_success_15m41_45";
const error = "_error_15m41_49";
const runningInfo = "_runningInfo_15m41_53";
const runningMessage = "_runningMessage_15m41_60";
const debugLink = "_debugLink_15m41_66";
const style0 = {
  previewContainer,
  executionDetails,
  spinner,
  running,
  waiting,
  success,
  error,
  runningInfo,
  runningMessage,
  debugLink
};
const _hoisted_1 = ["data-test-id"];
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_4 = { class: "retry-button" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  const _component_n8n_spinner = resolveComponent("n8n-spinner");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_router_link = resolveComponent("router-link");
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  const _component_workflow_preview = resolveComponent("workflow-preview");
  return ((_a = _ctx.executionUIDetails) == null ? void 0 : _a.name) === "running" ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass(_ctx.$style.runningInfo)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.spinner)
    }, [
      createVNode(_component_n8n_spinner, { type: "ring" })
    ], 2),
    createVNode(_component_n8n_text, {
      class: normalizeClass(_ctx.$style.runningMessage),
      color: "text-light"
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.runningMessage")), 1)
      ]),
      _: 1
    }, 8, ["class"]),
    createVNode(_component_n8n_button, {
      class: "mt-l",
      type: "tertiary",
      onClick: _ctx.handleStopClick
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsList.stopExecution")), 1)
      ]),
      _: 1
    }, 8, ["onClick"])
  ], 2)) : (openBlock(), createElementBlock("div", {
    key: 1,
    class: normalizeClass(_ctx.$style.previewContainer)
  }, [
    _ctx.activeExecution ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.executionDetails),
      "data-test-id": `execution-preview-details-${_ctx.executionId}`
    }, [
      createBaseVNode("div", null, [
        createVNode(_component_n8n_text, {
          size: "large",
          color: "text-base",
          bold: true,
          "data-test-id": "execution-time"
        }, {
          default: withCtx(() => {
            var _a2;
            return [
              createTextVNode(toDisplayString((_a2 = _ctx.executionUIDetails) == null ? void 0 : _a2.startTime), 1)
            ];
          }),
          _: 1
        }),
        _hoisted_2,
        ((_b = _ctx.executionUIDetails) == null ? void 0 : _b.name) === "running" ? (openBlock(), createBlock(_component_n8n_spinner, {
          key: 0,
          size: "small",
          class: normalizeClass([_ctx.$style.spinner, "mr-4xs"])
        }, null, 8, ["class"])) : createCommentVNode("", true),
        createVNode(_component_n8n_text, {
          size: "medium",
          class: normalizeClass([_ctx.$style.status, _ctx.$style[_ctx.executionUIDetails.name]]),
          "data-test-id": "execution-preview-label"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.executionUIDetails.label), 1)
          ]),
          _: 1
        }, 8, ["class"]),
        createTextVNode(" " + toDisplayString(" ") + " "),
        _ctx.executionUIDetails.name === "running" ? (openBlock(), createBlock(_component_n8n_text, {
          key: 1,
          color: "text-base",
          size: "medium"
        }, {
          default: withCtx(() => {
            var _a2;
            return [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.runningTimeRunning", {
                interpolate: { time: (_a2 = _ctx.executionUIDetails) == null ? void 0 : _a2.runningTime }
              })) + " | ID#" + toDisplayString(_ctx.activeExecution.id), 1)
            ];
          }),
          _: 1
        })) : _ctx.executionUIDetails.name !== "waiting" ? (openBlock(), createBlock(_component_n8n_text, {
          key: 2,
          color: "text-base",
          size: "medium",
          "data-test-id": "execution-preview-id"
        }, {
          default: withCtx(() => {
            var _a2;
            return [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.runningTimeFinished", {
                interpolate: { time: ((_a2 = _ctx.executionUIDetails) == null ? void 0 : _a2.runningTime) ?? "unknown" }
              })) + " | ID#" + toDisplayString(_ctx.activeExecution.id), 1)
            ];
          }),
          _: 1
        })) : ((_c = _ctx.executionUIDetails) == null ? void 0 : _c.name) === "waiting" ? (openBlock(), createBlock(_component_n8n_text, {
          key: 3,
          color: "text-base",
          size: "medium"
        }, {
          default: withCtx(() => [
            createTextVNode(" | ID#" + toDisplayString(_ctx.activeExecution.id), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        _hoisted_3,
        _ctx.activeExecution.mode === "retry" ? (openBlock(), createBlock(_component_n8n_text, {
          key: 4,
          color: "text-base",
          size: "medium"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.retry")) + " ", 1),
            createVNode(_component_router_link, {
              class: normalizeClass(_ctx.$style.executionLink),
              to: {
                name: _ctx.VIEWS.EXECUTION_PREVIEW,
                params: {
                  workflowId: _ctx.activeExecution.workflowId,
                  executionId: _ctx.activeExecution.retryOf
                }
              }
            }, {
              default: withCtx(() => [
                createTextVNode(" #" + toDisplayString(_ctx.activeExecution.retryOf), 1)
              ]),
              _: 1
            }, 8, ["class", "to"])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      createBaseVNode("div", null, [
        createVNode(_component_n8n_button, {
          size: "large",
          type: _ctx.debugButtonData.type,
          class: normalizeClass({
            [_ctx.$style.debugLink]: true,
            [_ctx.$style.secondary]: _ctx.debugButtonData.type === "secondary"
          })
        }, {
          default: withCtx(() => [
            createVNode(_component_router_link, {
              to: {
                name: _ctx.VIEWS.EXECUTION_DEBUG,
                params: {
                  name: _ctx.activeExecution.workflowId,
                  executionId: _ctx.activeExecution.id
                }
              }
            }, {
              default: withCtx(() => [
                createBaseVNode("span", {
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleDebugLinkClick && _ctx.handleDebugLinkClick(...args)),
                  "data-test-id": "execution-debug-button"
                }, toDisplayString(_ctx.debugButtonData.text), 1)
              ]),
              _: 1
            }, 8, ["to"])
          ]),
          _: 1
        }, 8, ["type", "class"]),
        ((_d = _ctx.executionUIDetails) == null ? void 0 : _d.name) === "error" ? (openBlock(), createBlock(_component_el_dropdown, {
          key: 0,
          trigger: "click",
          class: "mr-xs",
          onCommand: _ctx.handleRetryClick,
          ref: "retryDropdown"
        }, {
          dropdown: withCtx(() => [
            createVNode(_component_el_dropdown_menu, null, {
              default: withCtx(() => [
                createVNode(_component_el_dropdown_item, { command: "current-workflow" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsList.retryWithCurrentlySavedWorkflow")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_dropdown_item, { command: "original-workflow" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsList.retryWithOriginalWorkflow")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createBaseVNode("span", _hoisted_4, [
              createVNode(_component_n8n_icon_button, {
                size: "large",
                type: "tertiary",
                title: _ctx.$locale.baseText("executionsList.retryExecution"),
                icon: "redo",
                "data-test-id": "execution-preview-retry-button",
                onBlur: _ctx.onRetryButtonBlur
              }, null, 8, ["title", "onBlur"])
            ])
          ]),
          _: 1
        }, 8, ["onCommand"])) : createCommentVNode("", true),
        createVNode(_component_n8n_icon_button, {
          title: _ctx.$locale.baseText("executionDetails.deleteExecution"),
          icon: "trash",
          size: "large",
          type: "tertiary",
          "data-test-id": "execution-preview-delete-button",
          onClick: _ctx.onDeleteExecution
        }, null, 8, ["title", "onClick"])
      ])
    ], 10, _hoisted_1)) : createCommentVNode("", true),
    createVNode(_component_workflow_preview, {
      mode: "execution",
      loaderType: "spinner",
      executionId: _ctx.executionId,
      executionMode: _ctx.executionMode
    }, null, 8, ["executionId", "executionMode"])
  ], 2));
}
const cssModules = {
  "$style": style0
};
const ExecutionPreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  ExecutionPreview as default
};
