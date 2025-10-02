import { n as useUIStore, dZ as getMousePosition, G as useNodeTypesStore, H as useWorkflowsStore, u as useToast, W as useNDVStore, d_ as PIN_DATA_NODE_TYPES_DENYLIST, d$ as jsonStringify, e0 as MAX_PINNED_DATA_SIZE, e1 as stringSizeInBytes, e2 as MAX_WORKFLOW_SIZE, e3 as MAX_EXPECTED_REQUEST_SIZE, e4 as jsonParse, _ as _export_sfc, e5 as NPM_PACKAGE_DOCS_BASE_URL, e6 as BUILTIN_NODES_DOCS_URL, bc as isCommunityPackageName, aH as COMMUNITY_NODES_INSTALLATION_DOCS_URL, P as NodeConnectionType, e7 as OPEN_URL_PANEL_TRIGGER_NODE_TYPES, cR as FORM_TRIGGER_NODE_TYPE, $ as useMessage, e8 as MANUAL_TRIGGER_NODE_TYPE, a3 as WEBHOOK_NODE_TYPE, a9 as MODAL_CONFIRM, a1 as useWorkflowsEEStore, D as useCredentialsStore, F as useHistoryStore, d6 as IMPORT_CURL_MODAL_KEY, N as getNodeInputs, c_ as getConnectionTypes, e9 as CUSTOM_NODES_DOCS_URL, ea as MAIN_NODE_PANEL_WIDTH, d0 as deepCopy, eb as RenameNodeCommand, a7 as getNodeParameters, ec as ndvEventBus, d2 as useStorage, ed as LOCAL_STORAGE_MAIN_PANEL_RELATIVE_WIDTH, ee as sanitizeHtml, ef as sanitizeHtml_1, eg as MAX_DISPLAY_DATA_SIZE, ag as sanitizeHtml$1, eh as MAX_DISPLAY_ITEMS_AUTO_ALL, ei as DATA_PINNING_DOCS_URL, ej as DATA_EDITING_DOCS_URL, cN as isEmpty, b1 as HTML_NODE_TYPE, ao as executionDataToJson, ek as NODE_TYPES_EXCLUDED_FROM_OUTPUT_NAME_APPEND, U as getNodeOutputs, el as LOCAL_STORAGE_PIN_DATA_DISCOVERY_NDV_FLAG, em as dataPinningEventBus, en as LOCAL_STORAGE_PIN_DATA_DISCOVERY_CANVAS_FLAG, eo as clearJsonKey, cT as __vitePreload, ep as TEST_PIN_DATA, eq as START_NODE_TYPE, er as CRON_NODE_TYPE, es as INTERVAL_NODE_TYPE, w as createEventBus, d5 as getTriggerNodeServiceName, B as VIEWS, c$ as WORKFLOW_SETTINGS_MODAL_KEY, et as useDeviceSupportHelpers, y as useSettingsStore, eu as EXECUTABLE_TRIGGER_NODE_TYPES, S as STICKY_NODE_TYPE, ev as BASE_NODE_SURVEY_URL, aa as EnterpriseEditionFeature, ew as NODE_CONNECTION_TYPE_ALLOW_MULTIPLE, ex as useCanvasStore, ey as getAnchorPosition, ez as getEndpointScope, eA as getInputEndpointUUID, eB as getInputEndpointStyle, eC as getScope, eD as getInputNameOverlay, eE as NODE_INSERT_SPACER_BETWEEN_INPUT_GROUPS, eF as NODE_MIN_INPUT_ITEMS_COUNT, eG as getOutputEndpointUUID, eH as getOutputEndpointStyle, eI as getOutputNameOverlay, eJ as NO_OP_NODE_TYPE, eK as NOT_DUPLICATABE_NODE_TYPES, cP as nodeIssuesToString, eL as WAIT_TIME_UNLIMITED, J as CUSTOM_API_CALL_KEY, Q as EnableNodeToggleCommand, eM as isString, eN as isNumber, eO as QUICKSTART_NOTE_NAME, eP as useNodeCreatorStore, cW as AI_SUBCATEGORY, am as useI18n, cY as AI_CATEGORY_CHAINS, cX as AI_CATEGORY_AGENTS, eQ as AI_NODE_CREATOR_VIEW, eR as AI_OTHERS_NODE_CREATOR_VIEW, eS as AI_CATEGORY_DOCUMENT_LOADERS, eT as AI_CATEGORY_LANGUAGE_MODELS, eU as AI_CATEGORY_MEMORY, eV as AI_CATEGORY_OUTPUTPARSER, eW as AI_CATEGORY_RETRIEVERS, eX as AI_CATEGORY_TEXT_SPLITTERS, eY as AI_CATEGORY_TOOLS, eZ as AI_CATEGORY_EMBEDDING, e_ as AI_CATEGORY_VECTOR_STORES, e$ as AI_UNCATEGORIZED_CATEGORY, f0 as TRIGGER_NODE_CREATOR_VIEW, f1 as DEFAULT_SUBCATEGORY, f2 as EMAIL_IMAP_NODE_TYPE, f3 as SCHEDULE_TRIGGER_NODE_TYPE, f4 as CORE_NODES_CATEGORY, f5 as EXECUTE_WORKFLOW_TRIGGER_NODE_TYPE, f6 as OTHER_TRIGGER_NODES_SUBCATEGORY, f7 as REGULAR_NODE_CREATOR_VIEW, f8 as TRANSFORM_DATA_SUBCATEGORY, f9 as HELPERS_SUBCATEGORY, fa as FLOWS_CONTROL_SUBCATEGORY, fb as FILES_SUBCATEGORY, fc as searchNodes, fd as transformNodeType, fe as subcategorizeItems, ff as sortNodeCreateElements, fg as useCanvasMouseSelect, dD as useGlobalLinkActions, cO as useTitleChange, fh as useExecutionDebugging, dY as MAIN_HEADER_TABS, fi as getNodeViewTab, a4 as PLACEHOLDER_EMPTY_WORKFLOW_ID, fj as MODAL_CANCEL, ad as useExternalSecretsStore, Y as useEnvironmentsStore, t as useUsersStore, a0 as useTemplatesStore, x as useRootStore, bp as useTagsStore, fk as getBackgroundStyles, cV as MANUAL_CHAT_TRIGGER_NODE_TYPE, fl as GRID_SIZE, fm as NODE_CREATOR_OPEN_SOURCES, cU as WORKFLOW_LM_CHAT_MODAL_KEY, cQ as generateNodesGraph, fn as getFixedNodesList, de as nodeViewEventBus, fo as MoveNodeCommand, fp as UPDATE_WEBHOOK_ID_NODE_TYPES, fq as getNewNodePosition, fr as DRAG_EVENT_DATA_KEY, fs as MAX_X_TO_PUSH_DOWNSTREAM_NODES, ft as PUSH_NODES_OFFSET, fu as NODE_SIZE, b6 as useSegment, fv as resetConnection, fw as moveBackInputLabelPosition, fx as AddConnectionCommand, fy as hideOutputNameLabel, fz as addConnectionActionsOverlay, fA as addConnectionTestData, fB as getOverlay, fC as OVERLAY_ENDPOINT_ARROW_ID, fD as getConnectorPaintStyleData, fE as showOrHideItemsLabel, fF as showOrHideMidpointArrow, fG as hideConnectionActions, fH as showConnectionActions, fI as resetInputLabelPosition, fJ as getConnectionInfo, fK as showOutputNameLabel, fL as RemoveConnectionCommand, fM as MODAL_CLOSE, fN as getOutputSummary, fO as recoveredConnection, fP as addConnectionOutputSuccess, fQ as getRunItemsLabel, fR as RemoveNodeCommand, fS as AddNodeCommand, cI as getAccountAge, cJ as ONBOARDING_PROMPT_TIMEBOX, bt as ONBOARDING_CALL_SIGNUP_MODAL_KEY, fT as historyBus, fU as getConnectorLengths, fV as showDropConnectionState, fW as showPullConnectionState, fX as resetConnectionAfterPull, fY as NODE_OUTPUT_DEFAULT_KEY, cK as FIRST_ONBOARDING_PROMPT_TIMEOUT } from "./n8n-8ddd8349.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode, aj as withKeys, af as withModifiers, aB as pushScopeId, aC as popScopeId, a3 as Fragment, ai as renderList, m as mergeProps, ac as withDirectives, ad as vShow, e as resolveDynamicComponent, g as renderSlot, a8 as Teleport, a9 as normalizeStyle, aI as defineAsyncComponent, ak as createSlots, aK as Suspense, Z as createStaticVNode, ab as Transition, aw as resolveDirective, c as computed, p as unref, r as ref, L as nextTick } from "./vendor-fd4bd18c.js";
import { m as mapStores, d as defineStore } from "./pinia-282957dc.js";
import { _ as INTERCEPT_BEFORE_DROP, $ as EVENT_CONNECTION, a0 as EVENT_CONNECTION_MOVED, a1 as EVENT_CONNECTION_DETACHED } from "./@jsplumb/core-defb43f2.js";
import { N as NodeIcon, e as externalHooks, c as copyPaste, w as workflowHelpers, a as workflowRun, n as nodeHelpers, b as NodeCredentials, P as ParameterInputList, d as debounceHelper, g as genericHelpers, C as CodeNodeEditor, f as CopyInput, h as TitledList, E as EVENT_PLUS_ENDPOINT_CLICK, i as EVENT_ADD_INPUT_ENDPOINT_CLICK, j as N8nPlusEndpointType, s as sourceControlEventBus } from "./index-00f166b0.js";
import { g as get, s as set, x as unset, y as isObject } from "./lodash-es-be629387.js";
import { F as FileSaver_minExports } from "./file-saver-ccbe3603.js";
import { V as VueJsonPretty } from "./vue-json-pretty-1f49a504.js";
import RunDataAi from "./RunDataAi-1d763057.js";
import { w as workflowActivate } from "./workflowActivate-7e113acb.js";
import { F as FontAwesomeIcon } from "./@fortawesome/vue-fontawesome-04873987.js";
import { v as v4 } from "./uuid-2dfcd766.js";
import { f as EVENT_CONNECTION_ABORT, g as EVENT_DRAG_MOVE, a as EVENT_CONNECTION_MOUSEOVER, E as EVENT_CONNECTION_MOUSEOUT, b as EVENT_ENDPOINT_MOUSEOVER, d as EVENT_ENDPOINT_MOUSEOUT, h as EVENT_CONNECTION_DRAG, i as ready } from "./@jsplumb/browser-ui-21fcaa55.js";
const deviceSupportHelpers = defineComponent({
  data() {
    return {
      // @ts-ignore msMaxTouchPoints is deprecated but must fix tablet bugs before fixing this.. otherwise breaks touchscreen computers
      isTouchDevice: "ontouchstart" in window || navigator.msMaxTouchPoints,
      isMacOs: /(ipad|iphone|ipod|mac)/i.test(navigator.platform)
      // TODO: `platform` deprecated
    };
  },
  computed: {
    // TODO: Check if used anywhere
    controlKeyCode() {
      if (this.isMacOs) {
        return "Meta";
      }
      return "Control";
    }
  },
  methods: {
    isCtrlKeyPressed(e) {
      if (this.isTouchDevice === true && e instanceof MouseEvent) {
        return true;
      }
      if (this.isMacOs) {
        return e.metaKey;
      }
      return e.ctrlKey;
    }
  }
});
const moveNodeWorkflow = defineComponent({
  mixins: [deviceSupportHelpers],
  data() {
    return {
      moveLastPosition: [0, 0]
    };
  },
  computed: {
    ...mapStores(useUIStore)
  },
  methods: {
    moveWorkflow(e) {
      const offsetPosition = this.uiStore.nodeViewOffsetPosition;
      const [x, y] = getMousePosition(e);
      const nodeViewOffsetPositionX = offsetPosition[0] + (x - this.moveLastPosition[0]);
      const nodeViewOffsetPositionY = offsetPosition[1] + (y - this.moveLastPosition[1]);
      this.uiStore.nodeViewOffsetPosition = [nodeViewOffsetPositionX, nodeViewOffsetPositionY];
      this.moveLastPosition[0] = x;
      this.moveLastPosition[1] = y;
    },
    mouseDownMoveWorkflow(e, moveButtonPressed) {
      if (!this.isCtrlKeyPressed(e) && !moveButtonPressed) {
        return;
      }
      if (this.uiStore.isActionActive("dragActive")) {
        return;
      }
      if (e.button !== 1) {
        this.uiStore.nodeViewMoveInProgress = true;
      }
      const [x, y] = getMousePosition(e);
      this.moveLastPosition[0] = x;
      this.moveLastPosition[1] = y;
      this.$el.addEventListener("mousemove", this.mouseMoveNodeWorkflow);
    },
    mouseUpMoveWorkflow(e) {
      if (!this.uiStore.nodeViewMoveInProgress) {
        return;
      }
      this.$el.removeEventListener("mousemove", this.mouseMoveNodeWorkflow);
      this.uiStore.nodeViewMoveInProgress = false;
    },
    mouseMoveNodeWorkflow(e) {
      if (e.target && !e.target.id.includes("node-view")) {
        return;
      }
      if (this.uiStore.isActionActive("dragActive")) {
        return;
      }
      if (e.buttons === 4) {
        this.uiStore.nodeViewMoveInProgress = true;
      }
      if (e.buttons === 0) {
        this.mouseUp(e);
        return;
      }
      this.moveWorkflow(e);
    }
  }
});
function useUniqueNodeName() {
  function numberSuffixedNames() {
    return useNodeTypesStore().allNodeTypes.reduce((acc, nodeType) => {
      if (typeof nodeType.defaults.name !== "string") {
        throw new Error("Expected node name default to be a string");
      }
      if (/\d$/.test(nodeType.defaults.name))
        acc.push(nodeType.defaults.name);
      return acc;
    }, []);
  }
  function uniqueNodeName(originalName, extraNames = []) {
    var _a, _b;
    const { canvasNames } = useWorkflowsStore();
    const isUnique = !canvasNames.has(originalName) && !extraNames.includes(originalName);
    if (isUnique)
      return originalName;
    const nsn = numberSuffixedNames().find((nsn2) => originalName.startsWith(nsn2));
    if (nsn) {
      let unique2 = "";
      let index2 = 1;
      const remainder = originalName.split(nsn).pop();
      const lastChar = remainder == null ? void 0 : remainder[remainder.length - 1];
      if (lastChar && Number.isInteger(Number(lastChar))) {
        index2 = parseInt(lastChar, 10);
        originalName = originalName.slice(0, -1);
      }
      unique2 = originalName;
      while (canvasNames.has(unique2) || extraNames.includes(unique2)) {
        unique2 = originalName + index2++;
      }
      return unique2;
    }
    if (/^\d+-?\d*$/.test(originalName)) {
      let unique2 = "";
      let index2 = 1;
      const match2 = originalName.match(/(?<base>\d+)-?(?<suffix>\d*)/);
      if (!(match2 == null ? void 0 : match2.groups)) {
        throw new Error("Failed to find match for unique name");
      }
      if (((_a = match2 == null ? void 0 : match2.groups) == null ? void 0 : _a.suffix) !== "") {
        index2 = parseInt(match2.groups.suffix, 10);
      }
      unique2 = match2.groups.base;
      while (canvasNames.has(unique2) || extraNames.includes(unique2)) {
        unique2 = match2.groups.base + "-" + index2++;
      }
      return unique2;
    }
    let unique = "";
    let index = 1;
    const match = originalName.match(/(?<base>.*\D+)(?<suffix>\d*)/);
    if (!(match == null ? void 0 : match.groups)) {
      throw new Error("Failed to find match for unique name");
    }
    if (((_b = match == null ? void 0 : match.groups) == null ? void 0 : _b.suffix) !== "") {
      index = parseInt(match.groups.suffix, 10);
    }
    unique = match.groups.base;
    while (canvasNames.has(unique) || extraNames.includes(unique)) {
      unique = match.groups.base + index++;
    }
    return unique;
  }
  return { uniqueNodeName };
}
const pinData = defineComponent({
  setup() {
    return {
      ...useToast()
    };
  },
  computed: {
    ...mapStores(useWorkflowsStore, useNDVStore),
    pinData() {
      return this.node ? this.workflowsStore.pinDataByNodeName(this.node.name) : void 0;
    },
    hasPinData() {
      return !!this.node && typeof this.pinData !== "undefined";
    },
    isPinDataNodeType() {
      return !!this.node && !this.isMultipleOutputsNodeType && !PIN_DATA_NODE_TYPES_DENYLIST.includes(this.node.type);
    },
    isMultipleOutputsNodeType() {
      var _a;
      return ((_a = this.nodeType) == null ? void 0 : _a.outputs.length) > 1;
    }
  },
  methods: {
    isValidPinDataJSON(data) {
      try {
        JSON.parse(data);
        return true;
      } catch (error) {
        const title2 = this.$locale.baseText("runData.editOutputInvalid");
        const toRemove = new RegExp(/JSON\.parse:|of the JSON data/, "g");
        const message = error.message.replace(toRemove, "").trim();
        const positionMatchRegEx = /at position (\d+)/;
        const positionMatch = error.message.match(positionMatchRegEx);
        error.message = message.charAt(0).toUpperCase() + message.slice(1);
        error.message = error.message.replace(
          "Unexpected token ' in JSON",
          this.$locale.baseText("runData.editOutputInvalid.singleQuote")
        );
        if (positionMatch) {
          const position = parseInt(positionMatch[1], 10);
          const lineBreaksUpToPosition = (data.slice(0, position).match(/\n/g) || []).length;
          error.message = error.message.replace(
            positionMatchRegEx,
            this.$locale.baseText("runData.editOutputInvalid.atPosition", {
              interpolate: {
                position: `${position}`
              }
            })
          );
          error.message = `${this.$locale.baseText("runData.editOutputInvalid.onLine", {
            interpolate: {
              line: `${lineBreaksUpToPosition + 1}`
            }
          })} ${error.message}`;
        }
        this.showError(error, title2);
        return false;
      }
    },
    isValidPinDataSize(data, activeNodeName) {
      if (typeof data === "object")
        data = JSON.stringify(data);
      const { pinData: currentPinData, ...workflow } = this.workflowsStore.getCurrentWorkflow();
      const workflowJson = jsonStringify(workflow, { replaceCircularRefs: true });
      const newPinData = { ...currentPinData, [activeNodeName]: data };
      const newPinDataSize = this.workflowsStore.getPinDataSize(newPinData);
      if (newPinDataSize > MAX_PINNED_DATA_SIZE) {
        this.showError(
          new Error(this.$locale.baseText("ndv.pinData.error.tooLarge.description")),
          this.$locale.baseText("ndv.pinData.error.tooLarge.title")
        );
        return false;
      }
      if (stringSizeInBytes(workflowJson) + newPinDataSize > MAX_WORKFLOW_SIZE - MAX_EXPECTED_REQUEST_SIZE) {
        this.showError(
          new Error(this.$locale.baseText("ndv.pinData.error.tooLargeWorkflow.description")),
          this.$locale.baseText("ndv.pinData.error.tooLargeWorkflow.title")
        );
        return false;
      }
      return true;
    },
    setPinData(node, data, source) {
      if (typeof data === "string") {
        if (!this.isValidPinDataJSON(data)) {
          this.onDataPinningError({ errorType: "invalid-json", source });
          throw new Error("Invalid JSON");
        }
        data = jsonParse(data);
      }
      if (!this.isValidPinDataSize(data, node.name)) {
        this.onDataPinningError({ errorType: "data-too-large", source });
        throw new Error("Data too large");
      }
      this.onDataPinningSuccess({ source });
      this.workflowsStore.pinData({ node, data });
    },
    unsetPinData(node, source) {
      this.onDataUnpinning({ source });
      this.workflowsStore.unpinData({ node });
    },
    onDataPinningSuccess({ source }) {
      var _a;
      const telemetryPayload = {
        pinning_source: source,
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        session_id: this.sessionId,
        data_size: stringSizeInBytes(this.pinData),
        view: this.displayMode,
        run_index: this.runIndex
      };
      void this.$externalHooks().run("runData.onDataPinningSuccess", telemetryPayload);
      this.$telemetry.track("Ndv data pinning success", telemetryPayload);
    },
    onDataPinningError({
      errorType,
      source
    }) {
      var _a;
      this.$telemetry.track("Ndv data pinning failure", {
        pinning_source: source,
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        session_id: this.sessionId,
        data_size: stringSizeInBytes(this.pinData),
        view: this.displayMode,
        run_index: this.runIndex,
        error_type: errorType
      });
    },
    onDataUnpinning({
      source
    }) {
      var _a;
      this.$telemetry.track("User unpinned ndv data", {
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        session_id: this.sessionId,
        run_index: this.runIndex,
        source,
        data_size: stringSizeInBytes(this.pinData)
      });
    }
  }
});
const _sfc_main$m = defineComponent({
  name: "NodeTitle",
  components: {
    NodeIcon
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    nodeType: {},
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editName: false,
      newName: ""
    };
  },
  computed: {
    editable() {
      return !this.readOnly && window === window.parent;
    }
  },
  methods: {
    async onEdit() {
      this.newName = this.modelValue;
      this.editName = true;
      await this.$nextTick();
      const inputRef = this.$refs.input;
      if (inputRef) {
        inputRef.focus();
      }
    },
    onRename() {
      if (this.newName.trim() !== "") {
        this.$emit("update:modelValue", this.newName.trim());
      }
      this.editName = false;
    }
  }
});
const container$2 = "_container_15oh7_5";
const title$2 = "_title_15oh7_15";
const hoverable = "_hoverable_15oh7_23";
const editIcon = "_editIcon_15oh7_26";
const iconWrapper = "_iconWrapper_15oh7_30";
const editIconContainer = "_editIconContainer_15oh7_43";
const editButtons = "_editButtons_15oh7_49";
const editContainer = "_editContainer_15oh7_57";
const style0$9 = {
  container: container$2,
  title: title$2,
  hoverable,
  editIcon,
  iconWrapper,
  editIconContainer,
  editButtons,
  editContainer
};
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NodeIcon = resolveComponent("NodeIcon");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_input = resolveComponent("n8n-input");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_popover = resolveComponent("n8n-popover");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass(_ctx.$style.container),
    "data-test-id": "node-title-container",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.onEdit && _ctx.onEdit(...args))
  }, [
    createBaseVNode("span", {
      class: normalizeClass(_ctx.$style.iconWrapper)
    }, [
      createVNode(_component_NodeIcon, {
        nodeType: _ctx.nodeType,
        size: 18
      }, null, 8, ["nodeType"])
    ], 2),
    createVNode(_component_n8n_popover, {
      placement: "right",
      width: "200",
      visible: _ctx.editName,
      disabled: !_ctx.editable
    }, {
      reference: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass({ [_ctx.$style.title]: true, [_ctx.$style.hoverable]: _ctx.editable })
        }, [
          createTextVNode(toDisplayString(_ctx.modelValue) + " ", 1),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.editIconContainer)
          }, [
            _ctx.editable ? (openBlock(), createBlock(_component_font_awesome_icon, {
              key: 0,
              class: normalizeClass(_ctx.$style.editIcon),
              icon: "pencil-alt"
            }, null, 8, ["class"])) : createCommentVNode("", true)
          ], 2)
        ], 2)
      ]),
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.editContainer),
          onKeydown: [
            _cache[2] || (_cache[2] = withKeys((...args) => _ctx.onRename && _ctx.onRename(...args), ["enter"])),
            _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["stop"])),
            _cache[4] || (_cache[4] = withKeys(($event) => _ctx.editName = false, ["esc"]))
          ]
        }, [
          createVNode(_component_n8n_text, {
            bold: true,
            color: "text-base",
            tag: "div"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.title.renameNode")), 1)
            ]),
            _: 1
          }),
          createVNode(_component_n8n_input, {
            ref: "input",
            size: "small",
            modelValue: _ctx.newName,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.newName = $event),
            "data-test-id": "node-rename-input"
          }, null, 8, ["modelValue"]),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.editButtons)
          }, [
            createVNode(_component_n8n_button, {
              type: "secondary",
              size: "small",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.editName = false),
              label: _ctx.$locale.baseText("ndv.title.cancel")
            }, null, 8, ["label"]),
            createVNode(_component_n8n_button, {
              type: "primary",
              size: "small",
              onClick: _ctx.onRename,
              label: _ctx.$locale.baseText("ndv.title.rename")
            }, null, 8, ["onClick", "label"])
          ], 2)
        ], 34)
      ]),
      _: 1
    }, 8, ["visible", "disabled"])
  ], 2);
}
const cssModules$b = {
  "$style": style0$9
};
const NodeTitle = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__cssModules", cssModules$b]]);
const _sfc_main$l = defineComponent({
  name: "NodeSettingsTabs",
  mixins: [externalHooks],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    nodeType: {},
    sessionId: {
      type: String
    }
  },
  computed: {
    ...mapStores(useNDVStore, useWorkflowsStore),
    activeNode() {
      return this.ndvStore.activeNode;
    },
    documentationUrl() {
      var _a, _b, _c, _d;
      const nodeType = this.nodeType;
      if (!nodeType) {
        return "";
      }
      if (nodeType.documentationUrl && nodeType.documentationUrl.startsWith("http")) {
        return nodeType.documentationUrl;
      }
      const utmTags = "?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=" + nodeType.name;
      const primaryDocUrl = (_d = (_c = (_b = (_a = nodeType.codex) == null ? void 0 : _a.resources) == null ? void 0 : _b.primaryDocumentation) == null ? void 0 : _c[0]) == null ? void 0 : _d.url;
      if (primaryDocUrl) {
        return primaryDocUrl + utmTags;
      }
      if (this.isCommunityNode) {
        return `${NPM_PACKAGE_DOCS_BASE_URL}${nodeType.name.split(".")[0]}`;
      }
      return BUILTIN_NODES_DOCS_URL + utmTags;
    },
    isCommunityNode() {
      const nodeType = this.nodeType;
      if (nodeType) {
        return isCommunityPackageName(nodeType.name);
      }
      return false;
    },
    packageName() {
      const nodeType = this.nodeType;
      return nodeType.name.split(".")[0];
    },
    options() {
      const options = [
        {
          label: this.$locale.baseText("nodeSettings.parameters"),
          value: "params"
        }
      ];
      if (this.documentationUrl) {
        options.push({
          label: this.$locale.baseText("nodeSettings.docs"),
          value: "docs",
          href: this.documentationUrl
        });
      }
      if (this.isCommunityNode) {
        options.push({
          icon: "cube",
          value: "communityNode",
          align: "right",
          tooltip: this.$locale.baseText("generic.communityNode.tooltip", {
            interpolate: {
              docUrl: COMMUNITY_NODES_INSTALLATION_DOCS_URL,
              packageName: this.packageName
            }
          })
        });
      }
      const pushCogRight = this.isCommunityNode ? false : true;
      options.push({
        icon: "cog",
        value: "settings",
        align: pushCogRight ? "right" : void 0
      });
      return options;
    }
  },
  methods: {
    onTabSelect(tab) {
      if (tab === "docs" && this.nodeType) {
        void this.$externalHooks().run("dataDisplay.onDocumentationUrlClick", {
          nodeType: this.nodeType,
          documentationUrl: this.documentationUrl
        });
        this.$telemetry.track("User clicked ndv link", {
          node_type: this.activeNode.type,
          workflow_id: this.workflowsStore.workflowId,
          session_id: this.sessionId,
          pane: NodeConnectionType.Main,
          type: "docs"
        });
      }
      if (tab === "settings" && this.nodeType) {
        this.$telemetry.track("User viewed node settings", {
          node_type: this.nodeType.name,
          workflow_id: this.workflowsStore.workflowId
        });
      }
      if (tab === "settings" || tab === "params") {
        this.$emit("update:modelValue", tab);
      }
    },
    onTooltipClick(tab, event) {
      if (tab === "communityNode" && event.target.localName === "a") {
        this.$telemetry.track("user clicked cnr docs link", { source: "node details view" });
      }
    }
  }
});
const NodeSettingsTabs_vue_vue_type_style_index_0_lang = "";
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_tabs = resolveComponent("n8n-tabs");
  return openBlock(), createBlock(_component_n8n_tabs, {
    options: _ctx.options,
    modelValue: _ctx.modelValue,
    "onUpdate:modelValue": _ctx.onTabSelect,
    onTooltipClick: _ctx.onTooltipClick
  }, null, 8, ["options", "modelValue", "onUpdate:modelValue", "onTooltipClick"]);
}
const NodeSettingsTabs = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k]]);
const _sfc_main$k = defineComponent({
  name: "NodeWebhooks",
  mixins: [copyPaste, workflowHelpers],
  props: [
    "node",
    // NodeUi
    "nodeType"
    // INodeTypeDescription
  ],
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      isMinimized: this.nodeType && !OPEN_URL_PANEL_TRIGGER_NODE_TYPES.includes(this.nodeType.name),
      showUrlFor: "test"
    };
  },
  computed: {
    webhooksNode() {
      if (this.nodeType === null || this.nodeType.webhooks === void 0) {
        return [];
      }
      return this.nodeType.webhooks.filter(
        (webhookData) => webhookData.restartWebhook !== true && !webhookData.hasLifecycleMethods
      );
    },
    baseText() {
      const nodeType = this.nodeType.name;
      switch (nodeType) {
        case FORM_TRIGGER_NODE_TYPE:
          return {
            toggleTitle: this.$locale.baseText("nodeWebhooks.webhookUrls.formTrigger"),
            clickToDisplay: this.$locale.baseText(
              "nodeWebhooks.clickToDisplayWebhookUrls.formTrigger"
            ),
            clickToHide: this.$locale.baseText("nodeWebhooks.clickToHideWebhookUrls.formTrigger"),
            clickToCopy: this.$locale.baseText("nodeWebhooks.clickToCopyWebhookUrls.formTrigger"),
            testUrl: this.$locale.baseText("nodeWebhooks.testUrl"),
            productionUrl: this.$locale.baseText("nodeWebhooks.productionUrl"),
            copyTitle: this.$locale.baseText("nodeWebhooks.showMessage.title.formTrigger"),
            copyMessage: this.$locale.baseText("nodeWebhooks.showMessage.message.formTrigger")
          };
        default:
          return {
            toggleTitle: this.$locale.baseText("nodeWebhooks.webhookUrls"),
            clickToDisplay: this.$locale.baseText("nodeWebhooks.clickToDisplayWebhookUrls"),
            clickToHide: this.$locale.baseText("nodeWebhooks.clickToHideWebhookUrls"),
            clickToCopy: this.$locale.baseText("nodeWebhooks.clickToCopyWebhookUrls"),
            testUrl: this.$locale.baseText("nodeWebhooks.testUrl"),
            productionUrl: this.$locale.baseText("nodeWebhooks.productionUrl"),
            copyTitle: this.$locale.baseText("nodeWebhooks.showMessage.title"),
            copyMessage: void 0
          };
      }
    }
  },
  methods: {
    copyWebhookUrl(webhookData) {
      const webhookUrl = this.getWebhookUrlDisplay(webhookData);
      this.copyToClipboard(webhookUrl);
      this.showMessage({
        title: this.baseText.copyTitle,
        message: this.baseText.copyMessage,
        type: "success"
      });
      this.$telemetry.track("User copied webhook URL", {
        pane: "parameters",
        type: `${this.showUrlFor} url`
      });
    },
    getWebhookUrlDisplay(webhookData) {
      if (this.node) {
        return this.getWebhookUrl(webhookData, this.node, this.showUrlFor);
      }
      return "";
    }
  },
  watch: {
    node() {
      this.isMinimized = !OPEN_URL_PANEL_TRIGGER_NODE_TYPES.includes(this.nodeType.name);
    }
  }
});
const NodeWebhooks_vue_vue_type_style_index_0_scoped_55673278_lang = "";
const _withScopeId$7 = (n) => (pushScopeId("data-v-55673278"), n = n(), popScopeId(), n);
const _hoisted_1$g = {
  key: 0,
  class: "webhooks"
};
const _hoisted_2$d = ["title"];
const _hoisted_3$9 = {
  key: 0,
  class: "node-webhooks"
};
const _hoisted_4$7 = { class: "url-selection" };
const _hoisted_5$8 = {
  key: 0,
  class: "webhook-wrapper"
};
const _hoisted_6$7 = { class: "http-field" };
const _hoisted_7$6 = { class: "http-method" };
const _hoisted_8$6 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_9$3 = { class: "url-field" };
const _hoisted_10$3 = ["onClick"];
const _hoisted_11$2 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_12$2 = {
  key: 1,
  class: "webhook-wrapper"
};
const _hoisted_13$2 = { class: "url-field-full-width" };
const _hoisted_14$2 = ["onClick"];
const _hoisted_15$2 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_radio_buttons = resolveComponent("n8n-radio-buttons");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_el_collapse_transition = resolveComponent("el-collapse-transition");
  return _ctx.webhooksNode.length ? (openBlock(), createElementBlock("div", _hoisted_1$g, [
    createBaseVNode("div", {
      class: normalizeClass(["clickable headline", { expanded: !_ctx.isMinimized }]),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.isMinimized = !_ctx.isMinimized),
      title: _ctx.isMinimized ? _ctx.baseText.clickToDisplay : _ctx.baseText.clickToHide
    }, [
      createVNode(_component_font_awesome_icon, {
        icon: "angle-down",
        class: "minimize-button minimize-icon"
      }),
      createTextVNode(" " + toDisplayString(_ctx.baseText.toggleTitle), 1)
    ], 10, _hoisted_2$d),
    createVNode(_component_el_collapse_transition, null, {
      default: withCtx(() => [
        !_ctx.isMinimized ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
          createBaseVNode("div", _hoisted_4$7, [
            createVNode(_component_el_row, null, {
              default: withCtx(() => [
                createVNode(_component_el_col, { span: 24 }, {
                  default: withCtx(() => [
                    createVNode(_component_n8n_radio_buttons, {
                      modelValue: _ctx.showUrlFor,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.showUrlFor = $event),
                      options: [
                        { label: _ctx.baseText.testUrl, value: "test" },
                        {
                          label: _ctx.baseText.productionUrl,
                          value: "production"
                        }
                      ]
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.webhooksNode.filter((webhook) => !webhook.ndvHideUrl), (webhook, index) => {
            return openBlock(), createBlock(_component_n8n_tooltip, {
              key: index,
              class: "item",
              content: _ctx.baseText.clickToCopy,
              placement: "left"
            }, {
              default: withCtx(() => [
                !webhook.ndvHideMethod ? (openBlock(), createElementBlock("div", _hoisted_5$8, [
                  createBaseVNode("div", _hoisted_6$7, [
                    createBaseVNode("div", _hoisted_7$6, [
                      createTextVNode(toDisplayString(_ctx.getWebhookExpressionValue(webhook, "httpMethod")), 1),
                      _hoisted_8$6
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_9$3, [
                    createBaseVNode("div", {
                      class: "webhook-url left-ellipsis clickable",
                      onClick: ($event) => _ctx.copyWebhookUrl(webhook)
                    }, [
                      createTextVNode(toDisplayString(_ctx.getWebhookUrlDisplay(webhook)), 1),
                      _hoisted_11$2
                    ], 8, _hoisted_10$3)
                  ])
                ])) : (openBlock(), createElementBlock("div", _hoisted_12$2, [
                  createBaseVNode("div", _hoisted_13$2, [
                    createBaseVNode("div", {
                      class: "webhook-url left-ellipsis clickable",
                      onClick: ($event) => _ctx.copyWebhookUrl(webhook)
                    }, [
                      createTextVNode(toDisplayString(_ctx.getWebhookUrlDisplay(webhook)), 1),
                      _hoisted_15$2
                    ], 8, _hoisted_14$2)
                  ])
                ]))
              ]),
              _: 2
            }, 1032, ["content"]);
          }), 128))
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ])) : createCommentVNode("", true);
}
const NodeWebhooks = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-55673278"]]);
const _sfc_main$j = defineComponent({
  inheritAttrs: false,
  mixins: [workflowRun, pinData],
  props: {
    nodeName: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    transparent: {
      type: Boolean,
      default: false
    },
    telemetrySource: {
      type: String
    }
  },
  setup(props) {
    var _a, _b;
    return {
      ...useToast(),
      ...useMessage(),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = workflowRun).setup) == null ? void 0 : _b.call(_a, props)
    };
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useWorkflowsStore),
    node() {
      return this.workflowsStore.getNodeByName(this.nodeName);
    },
    nodeType() {
      if (this.node) {
        return this.nodeTypesStore.getNodeType(this.node.type, this.node.typeVersion);
      }
      return null;
    },
    nodeRunning() {
      const triggeredNode = this.workflowsStore.executedNode;
      return this.workflowRunning && (this.workflowsStore.isNodeExecuting(this.node.name) || triggeredNode === this.node.name);
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    isTriggerNode() {
      if (!this.node) {
        return false;
      }
      return this.nodeTypesStore.isTriggerNode(this.node.type);
    },
    isManualTriggerNode() {
      return Boolean(this.nodeType && this.nodeType.name === MANUAL_TRIGGER_NODE_TYPE);
    },
    isFormTriggerNode() {
      return Boolean(this.nodeType && this.nodeType.name === FORM_TRIGGER_NODE_TYPE);
    },
    isPollingTypeNode() {
      var _a;
      return !!((_a = this.nodeType) == null ? void 0 : _a.polling);
    },
    isScheduleTrigger() {
      var _a;
      return !!((_a = this.nodeType) == null ? void 0 : _a.group.includes("schedule"));
    },
    isWebhookNode() {
      return Boolean(this.nodeType && this.nodeType.name === WEBHOOK_NODE_TYPE);
    },
    isListeningForEvents() {
      const waitingOnWebhook = this.workflowsStore.executionWaitingForWebhook;
      const executedNode = this.workflowsStore.executedNode;
      return this.node && !this.node.disabled && this.isTriggerNode && waitingOnWebhook && (!executedNode || executedNode === this.nodeName);
    },
    isListeningForWorkflowEvents() {
      return this.nodeRunning && this.isTriggerNode && !this.isScheduleTrigger && !this.isManualTriggerNode;
    },
    hasIssues() {
      var _a;
      return Boolean(
        ((_a = this.node) == null ? void 0 : _a.issues) && (this.node.issues.parameters || this.node.issues.credentials)
      );
    },
    disabledHint() {
      if (this.isListeningForEvents) {
        return "";
      }
      if (this.isTriggerNode && this.node.disabled) {
        return this.$locale.baseText("ndv.execute.nodeIsDisabled");
      }
      if (this.isTriggerNode && this.hasIssues) {
        const activeNode = this.ndvStore.activeNode;
        if (activeNode && activeNode.name !== this.nodeName) {
          return this.$locale.baseText("ndv.execute.fixPrevious");
        }
        return this.$locale.baseText("ndv.execute.requiredFieldsMissing");
      }
      if (this.workflowRunning && !this.nodeRunning) {
        return this.$locale.baseText("ndv.execute.workflowAlreadyRunning");
      }
      return "";
    },
    buttonLabel() {
      var _a;
      if (this.isListeningForEvents || this.isListeningForWorkflowEvents) {
        return this.$locale.baseText("ndv.execute.stopListening");
      }
      if (this.label) {
        return this.label;
      }
      if (this.isWebhookNode) {
        return this.$locale.baseText("ndv.execute.listenForTestEvent");
      }
      if (this.isFormTriggerNode) {
        return this.$locale.baseText("ndv.execute.testStep");
      }
      if (this.isPollingTypeNode || ((_a = this.nodeType) == null ? void 0 : _a.mockManualExecution)) {
        return this.$locale.baseText("ndv.execute.fetchEvent");
      }
      if (this.isTriggerNode && !this.isScheduleTrigger && !this.isManualTriggerNode && !this.isFormTriggerNode) {
        return this.$locale.baseText("ndv.execute.listenForEvent");
      }
      return this.$locale.baseText("ndv.execute.executeNode");
    }
  },
  methods: {
    async stopWaitingForWebhook() {
      try {
        await this.workflowsStore.removeTestWebhook(this.workflowsStore.workflowId);
      } catch (error) {
        this.showError(error, this.$locale.baseText("ndv.execute.stopWaitingForWebhook.error"));
        return;
      }
    },
    async onClick() {
      if (this.isListeningForEvents) {
        await this.stopWaitingForWebhook();
      } else if (this.isListeningForWorkflowEvents) {
        this.$emit("stopExecution");
      } else {
        let shouldUnpinAndExecute = false;
        if (this.hasPinData) {
          const confirmResult = await this.confirm(
            this.$locale.baseText("ndv.pinData.unpinAndExecute.description"),
            this.$locale.baseText("ndv.pinData.unpinAndExecute.title"),
            {
              confirmButtonText: this.$locale.baseText("ndv.pinData.unpinAndExecute.confirm"),
              cancelButtonText: this.$locale.baseText("ndv.pinData.unpinAndExecute.cancel")
            }
          );
          shouldUnpinAndExecute = confirmResult === MODAL_CONFIRM;
          if (shouldUnpinAndExecute && this.node) {
            this.unsetPinData(this.node, "unpin-and-execute-modal");
          }
        }
        if (!this.hasPinData || shouldUnpinAndExecute) {
          const telemetryPayload = {
            node_type: this.nodeType ? this.nodeType.name : null,
            workflow_id: this.workflowsStore.workflowId,
            source: this.telemetrySource,
            session_id: this.ndvStore.sessionId
          };
          this.$telemetry.track("User clicked execute node button", telemetryPayload);
          await this.$externalHooks().run("nodeExecuteButton.onClick", telemetryPayload);
          await this.runWorkflow({
            destinationNode: this.nodeName,
            source: "RunData.ExecuteNodeButton"
          });
          this.$emit("execute");
        }
      }
    }
  }
});
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_n8n_tooltip, {
      placement: "bottom",
      disabled: !_ctx.disabledHint
    }, {
      content: withCtx(() => [
        createBaseVNode("div", null, toDisplayString(_ctx.disabledHint), 1)
      ]),
      default: withCtx(() => [
        createBaseVNode("div", null, [
          createVNode(_component_n8n_button, mergeProps(_ctx.$attrs, {
            loading: _ctx.nodeRunning && !_ctx.isListeningForEvents && !_ctx.isListeningForWorkflowEvents,
            disabled: _ctx.disabled || !!_ctx.disabledHint,
            label: _ctx.buttonLabel,
            type: _ctx.type,
            size: _ctx.size,
            icon: _ctx.isFormTriggerNode && "flask",
            transparentBackground: _ctx.transparent,
            onClick: _ctx.onClick
          }), null, 16, ["loading", "disabled", "label", "type", "size", "icon", "transparentBackground", "onClick"])
        ])
      ]),
      _: 1
    }, 8, ["disabled"])
  ]);
}
const NodeExecuteButton = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i]]);
const _sfc_main$i = defineComponent({
  name: "NodeSettings",
  mixins: [externalHooks, nodeHelpers],
  components: {
    NodeTitle,
    NodeCredentials,
    ParameterInputList,
    NodeSettingsTabs,
    NodeWebhooks,
    NodeExecuteButton
  },
  computed: {
    ...mapStores(
      useHistoryStore,
      useNodeTypesStore,
      useNDVStore,
      useUIStore,
      useCredentialsStore,
      useWorkflowsStore,
      useWorkflowsEEStore
    ),
    isCurlImportModalOpen() {
      return this.uiStore.isModalOpen(IMPORT_CURL_MODAL_KEY);
    },
    isReadOnly() {
      return this.readOnly || this.hasForeignCredential;
    },
    isExecutable() {
      if (this.nodeType && this.node) {
        const workflow = this.workflowsStore.getCurrentWorkflow();
        const workflowNode = workflow.getNode(this.node.name);
        const inputs = getNodeInputs(workflow, workflowNode, this.nodeType);
        const inputNames = getConnectionTypes(inputs);
        if (!inputNames.includes(NodeConnectionType.Main) && !this.isTriggerNode) {
          return false;
        }
      }
      return this.executable || this.hasForeignCredential;
    },
    nodeTypeName() {
      if (this.nodeType) {
        const shortNodeType = this.$locale.shortNodeType(this.nodeType.name);
        return this.$locale.headerText({
          key: `headers.${shortNodeType}.displayName`,
          fallback: this.nodeType.name
        });
      }
      return "";
    },
    nodeTypeDescription() {
      var _a;
      if ((_a = this.nodeType) == null ? void 0 : _a.description) {
        const shortNodeType = this.$locale.shortNodeType(this.nodeType.name);
        return this.$locale.headerText({
          key: `headers.${shortNodeType}.description`,
          fallback: this.nodeType.description
        });
      } else {
        return this.$locale.baseText("nodeSettings.noDescriptionFound");
      }
    },
    headerStyle() {
      if (!this.node) {
        return {};
      }
      return {
        "background-color": this.node.color
      };
    },
    node() {
      return this.ndvStore.activeNode;
    },
    parametersSetting() {
      return this.parameters.filter((item) => {
        return item.isNodeSetting;
      });
    },
    parametersNoneSetting() {
      return this.parameters.filter((item) => {
        return !item.isNodeSetting;
      });
    },
    parameters() {
      if (this.nodeType === null) {
        return [];
      }
      return this.nodeType.properties;
    },
    outputPanelEditMode() {
      return this.ndvStore.outputPanelEditMode;
    },
    isCommunityNode() {
      var _a;
      return isCommunityPackageName((_a = this.node) == null ? void 0 : _a.type);
    },
    isTriggerNode() {
      var _a;
      return this.nodeTypesStore.isTriggerNode((_a = this.node) == null ? void 0 : _a.type);
    },
    workflowOwnerName() {
      return this.workflowsEEStore.getWorkflowOwnerName(`${this.workflowsStore.workflowId}`);
    },
    hasForeignCredential() {
      return this.foreignCredentials.length > 0;
    },
    usedCredentials() {
      return Object.values(this.workflowsStore.usedCredentials).filter((credential) => {
        var _a;
        return Object.values(((_a = this.node) == null ? void 0 : _a.credentials) || []).find((nodeCredential) => {
          return nodeCredential.id === credential.id;
        });
      });
    },
    credentialOwnerName() {
      const credential = this.usedCredentials ? Object.values(this.usedCredentials).find((credential2) => {
        return credential2.id === this.foreignCredentials[0];
      }) : void 0;
      return this.credentialsStore.getCredentialOwnerName(credential);
    }
  },
  props: {
    eventBus: {
      type: Object
    },
    dragging: {
      type: Boolean
    },
    sessionId: {
      type: String
    },
    nodeType: {
      type: Object
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    foreignCredentials: {
      type: Array,
      default: () => []
    },
    blockUI: {
      type: Boolean,
      default: false
    },
    executable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      nodeValid: true,
      nodeColor: null,
      openPanel: "params",
      nodeValues: {
        color: "#ff0000",
        alwaysOutputData: false,
        executeOnce: false,
        notesInFlow: false,
        onError: "stopWorkflow",
        retryOnFail: false,
        maxTries: 3,
        waitBetweenTries: 1e3,
        notes: "",
        parameters: {}
      },
      nodeValuesInitialized: false,
      // Used to prevent nodeValues from being overwritten by defaults on reopening ndv
      nodeSettings: [],
      COMMUNITY_NODES_INSTALLATION_DOCS_URL,
      CUSTOM_NODES_DOCS_URL,
      MAIN_NODE_PANEL_WIDTH,
      hiddenIssuesInputs: []
    };
  },
  watch: {
    node(newNode, oldNode) {
      this.setNodeValues();
    },
    isCurlImportModalOpen(newValue, oldValue) {
      if (newValue === false) {
        let parameters = this.uiStore.getHttpNodeParameters || "";
        if (!parameters)
          return;
        try {
          parameters = JSON.parse(parameters);
          this.valueChanged({
            node: this.node.name,
            name: "parameters",
            value: parameters
          });
          this.uiStore.setHttpNodeParameters({ name: IMPORT_CURL_MODAL_KEY, parameters: "" });
        } catch {
        }
      }
    }
  },
  methods: {
    populateHiddenIssuesSet() {
      if (!this.node || !this.workflowsStore.isNodePristine(this.node.name))
        return;
      this.hiddenIssuesInputs.push("credentials");
      this.parametersNoneSetting.forEach((parameter) => {
        this.hiddenIssuesInputs.push(parameter.name);
      });
      this.workflowsStore.setNodePristine(this.node.name, false);
    },
    populateSettings() {
      if (this.isExecutable && !this.isTriggerNode) {
        this.nodeSettings.push(
          ...[
            {
              displayName: this.$locale.baseText("nodeSettings.alwaysOutputData.displayName"),
              name: "alwaysOutputData",
              type: "boolean",
              default: false,
              noDataExpression: true,
              description: this.$locale.baseText("nodeSettings.alwaysOutputData.description")
            },
            {
              displayName: this.$locale.baseText("nodeSettings.executeOnce.displayName"),
              name: "executeOnce",
              type: "boolean",
              default: false,
              noDataExpression: true,
              description: this.$locale.baseText("nodeSettings.executeOnce.description")
            },
            {
              displayName: this.$locale.baseText("nodeSettings.retryOnFail.displayName"),
              name: "retryOnFail",
              type: "boolean",
              default: false,
              noDataExpression: true,
              description: this.$locale.baseText("nodeSettings.retryOnFail.description")
            },
            {
              displayName: this.$locale.baseText("nodeSettings.maxTries.displayName"),
              name: "maxTries",
              type: "number",
              typeOptions: {
                minValue: 2,
                maxValue: 5
              },
              default: 3,
              displayOptions: {
                show: {
                  retryOnFail: [true]
                }
              },
              noDataExpression: true,
              description: this.$locale.baseText("nodeSettings.maxTries.description")
            },
            {
              displayName: this.$locale.baseText("nodeSettings.waitBetweenTries.displayName"),
              name: "waitBetweenTries",
              type: "number",
              typeOptions: {
                minValue: 0,
                maxValue: 5e3
              },
              default: 1e3,
              displayOptions: {
                show: {
                  retryOnFail: [true]
                }
              },
              noDataExpression: true,
              description: this.$locale.baseText("nodeSettings.waitBetweenTries.description")
            },
            {
              displayName: this.$locale.baseText("nodeSettings.onError.displayName"),
              name: "onError",
              type: "options",
              options: [
                {
                  name: this.$locale.baseText(
                    "nodeSettings.onError.options.stopWorkflow.displayName"
                  ),
                  value: "stopWorkflow",
                  description: this.$locale.baseText(
                    "nodeSettings.onError.options.stopWorkflow.description"
                  )
                },
                {
                  name: this.$locale.baseText(
                    "nodeSettings.onError.options.continueRegularOutput.displayName"
                  ),
                  value: "continueRegularOutput",
                  description: this.$locale.baseText(
                    "nodeSettings.onError.options.continueRegularOutput.description"
                  )
                },
                {
                  name: this.$locale.baseText(
                    "nodeSettings.onError.options.continueErrorOutput.displayName"
                  ),
                  value: "continueErrorOutput",
                  description: this.$locale.baseText(
                    "nodeSettings.onError.options.continueErrorOutput.description"
                  )
                }
              ],
              default: "stopWorkflow",
              noDataExpression: true,
              description: this.$locale.baseText("nodeSettings.onError.description")
            }
          ]
        );
      }
      this.nodeSettings.push(
        ...[
          {
            displayName: this.$locale.baseText("nodeSettings.notes.displayName"),
            name: "notes",
            type: "string",
            typeOptions: {
              rows: 5
            },
            default: "",
            noDataExpression: true,
            description: this.$locale.baseText("nodeSettings.notes.description")
          },
          {
            displayName: this.$locale.baseText("nodeSettings.notesInFlow.displayName"),
            name: "notesInFlow",
            type: "boolean",
            default: false,
            noDataExpression: true,
            description: this.$locale.baseText("nodeSettings.notesInFlow.description")
          }
        ]
      );
    },
    onParameterBlur(parameterName) {
      this.hiddenIssuesInputs = this.hiddenIssuesInputs.filter((name) => name !== parameterName);
    },
    onWorkflowActivate() {
      this.hiddenIssuesInputs = [];
      this.$emit("activate");
    },
    onNodeExecute() {
      this.hiddenIssuesInputs = [];
      this.$emit("execute");
    },
    setValue(name, value) {
      const nameParts = name.split(".");
      let lastNamePart = nameParts.pop();
      let isArray = false;
      if (lastNamePart !== void 0 && lastNamePart.includes("[")) {
        const lastNameParts = lastNamePart.match(/(.*)\[(\d+)\]$/);
        if (lastNameParts) {
          nameParts.push(lastNameParts[1]);
          lastNamePart = lastNameParts[2];
          isArray = true;
        }
      }
      if (nameParts.length === 0) {
        if (value === null) {
          const { [lastNamePart]: removedNodeValue, ...remainingNodeValues } = this.nodeValues;
          this.nodeValues = remainingNodeValues;
        } else {
          this.nodeValues = {
            ...this.nodeValues,
            [lastNamePart]: value
          };
        }
      } else {
        if (value === null) {
          let tempValue = get(this.nodeValues, nameParts.join("."));
          const { [lastNamePart]: removedNodeValue, ...remainingNodeValues } = tempValue;
          tempValue = remainingNodeValues;
          if (isArray && tempValue.length === 0) {
            lastNamePart = nameParts.pop();
            tempValue = get(this.nodeValues, nameParts.join("."));
            const { [lastNamePart]: removedArrayNodeValue, ...remainingArrayNodeValues } = tempValue;
            tempValue = remainingArrayNodeValues;
          }
        } else {
          if (typeof value === "object") {
            set(
              get(this.nodeValues, nameParts.join(".")),
              lastNamePart,
              deepCopy(value)
            );
          } else {
            set(
              get(this.nodeValues, nameParts.join(".")),
              lastNamePart,
              value
            );
          }
        }
      }
      this.nodeValues = { ...this.nodeValues };
    },
    credentialSelected(updateInformation) {
      this.workflowsStore.updateNodeProperties(updateInformation);
      const node = this.workflowsStore.getNodeByName(updateInformation.name);
      if (node) {
        this.updateNodeCredentialIssues(node);
      }
      void this.$externalHooks().run("nodeSettings.credentialSelected", { updateInformation });
    },
    nameChanged(name) {
      if (this.node) {
        this.historyStore.pushCommandToUndo(new RenameNodeCommand(this.node.name, name));
      }
      this.valueChanged({
        value: name,
        name: "name"
      });
    },
    valueChanged(parameterData) {
      var _a;
      let newValue;
      if (parameterData.hasOwnProperty("value")) {
        newValue = parameterData.value;
      } else {
        newValue = get(this.nodeValues, parameterData.name);
      }
      const nodeNameBefore = parameterData.node || ((_a = this.node) == null ? void 0 : _a.name);
      const node = this.workflowsStore.getNodeByName(nodeNameBefore);
      if (node === null) {
        return;
      }
      if (parameterData.name === "onError") {
        this.$emit("redrawRequired");
      }
      if (parameterData.name === "name") {
        const sendData = {
          value: newValue,
          oldValue: nodeNameBefore,
          name: parameterData.name
        };
        this.$emit("valueChanged", sendData);
      } else if (parameterData.name === "parameters") {
        const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
        if (!nodeType) {
          return;
        }
        let nodeParameters = getNodeParameters(
          nodeType.properties,
          node.parameters,
          false,
          false,
          node
        );
        const oldNodeParameters = Object.assign({}, nodeParameters);
        nodeParameters = deepCopy(nodeParameters);
        for (const parameterName of Object.keys(parameterData.value)) {
          newValue = parameterData.value[parameterName];
          const parameterPath = parameterName.split(".").slice(1).join(".");
          const parameterPathArray = parameterPath.match(/(.*)\[(\d+)\]$/);
          if (parameterData[parameterName] === void 0 && parameterPathArray !== null) {
            const path = parameterPathArray[1];
            const index = parameterPathArray[2];
            const data = get(nodeParameters, path);
            if (Array.isArray(data)) {
              data.splice(parseInt(index, 10), 1);
              set(nodeParameters, path, data);
            }
          } else {
            if (newValue === void 0) {
              unset(nodeParameters, parameterPath);
            } else {
              set(nodeParameters, parameterPath, newValue);
            }
          }
          void this.$externalHooks().run("nodeSettings.valueChanged", {
            parameterPath,
            newValue,
            parameters: this.parameters,
            oldNodeParameters
          });
        }
        nodeParameters = getNodeParameters(
          nodeType.properties,
          nodeParameters,
          true,
          false,
          node
        );
        for (const key of Object.keys(nodeParameters)) {
          if (nodeParameters && nodeParameters[key] !== null && nodeParameters[key] !== void 0) {
            this.setValue(`parameters.${key}`, nodeParameters[key]);
          }
        }
        if (nodeParameters) {
          const updateInformation = {
            name: node.name,
            value: nodeParameters
          };
          this.workflowsStore.setNodeParameters(updateInformation);
          this.updateNodeParameterIssuesByName(node.name);
          this.updateNodeCredentialIssuesByName(node.name);
        }
      } else if (parameterData.name.startsWith("parameters.")) {
        const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
        if (!nodeType) {
          return;
        }
        let nodeParameters = getNodeParameters(
          nodeType.properties,
          node.parameters,
          false,
          false,
          node
        );
        const oldNodeParameters = Object.assign({}, nodeParameters);
        nodeParameters = deepCopy(nodeParameters);
        const parameterPath = parameterData.name.split(".").slice(1).join(".");
        const parameterPathArray = parameterPath.match(/(.*)\[(\d+)\]$/);
        if (parameterData.value === void 0 && parameterPathArray !== null) {
          const path = parameterPathArray[1];
          const index = parameterPathArray[2];
          const data = get(nodeParameters, path);
          if (Array.isArray(data)) {
            data.splice(parseInt(index, 10), 1);
            set(nodeParameters, path, data);
          }
        } else {
          if (newValue === void 0) {
            unset(nodeParameters, parameterPath);
          } else {
            set(nodeParameters, parameterPath, newValue);
          }
        }
        nodeParameters = getNodeParameters(
          nodeType.properties,
          nodeParameters,
          true,
          false,
          node
        );
        for (const key of Object.keys(nodeParameters)) {
          if (nodeParameters && nodeParameters[key] !== null && nodeParameters[key] !== void 0) {
            this.setValue(`parameters.${key}`, nodeParameters[key]);
          }
        }
        const updateInformation = {
          name: node.name,
          value: nodeParameters
        };
        this.workflowsStore.setNodeParameters(updateInformation);
        void this.$externalHooks().run("nodeSettings.valueChanged", {
          parameterPath,
          newValue,
          parameters: this.parameters,
          oldNodeParameters
        });
        this.updateNodeParameterIssuesByName(node.name);
        this.updateNodeCredentialIssuesByName(node.name);
        this.$telemetry.trackNodeParametersValuesChange(nodeType.name, parameterData);
      } else {
        this.nodeValues = {
          ...this.nodeValues,
          [parameterData.name]: newValue
        };
        const updateInformation = {
          name: node.name,
          key: parameterData.name,
          value: newValue
        };
        this.workflowsStore.setNodeValue(updateInformation);
      }
    },
    /**
     * Sets the values of the active node in the internal settings variables
     */
    setNodeValues() {
      if (!this.node) {
        this.nodeValuesInitialized = true;
        return;
      }
      if (this.nodeType !== null) {
        this.nodeValid = true;
        const foundNodeSettings = [];
        if (this.node.color) {
          foundNodeSettings.push("color");
          this.nodeValues = {
            ...this.nodeValues,
            color: this.node.color
          };
        }
        if (this.node.notes) {
          foundNodeSettings.push("notes");
          this.nodeValues = {
            ...this.nodeValues,
            notes: this.node.notes
          };
        }
        if (this.node.alwaysOutputData) {
          foundNodeSettings.push("alwaysOutputData");
          this.nodeValues = {
            ...this.nodeValues,
            alwaysOutputData: this.node.alwaysOutputData
          };
        }
        if (this.node.executeOnce) {
          foundNodeSettings.push("executeOnce");
          this.nodeValues = {
            ...this.nodeValues,
            executeOnce: this.node.executeOnce
          };
        }
        if (this.node.continueOnFail) {
          foundNodeSettings.push("onError");
          this.nodeValues = {
            ...this.nodeValues,
            onError: "continueRegularOutput"
          };
        }
        if (this.node.onError) {
          foundNodeSettings.push("onError");
          this.nodeValues = {
            ...this.nodeValues,
            onError: this.node.onError
          };
        }
        if (this.node.notesInFlow) {
          foundNodeSettings.push("notesInFlow");
          this.nodeValues = {
            ...this.nodeValues,
            notesInFlow: this.node.notesInFlow
          };
        }
        if (this.node.retryOnFail) {
          foundNodeSettings.push("retryOnFail");
          this.nodeValues = {
            ...this.nodeValues,
            retryOnFail: this.node.retryOnFail
          };
        }
        if (this.node.maxTries) {
          foundNodeSettings.push("maxTries");
          this.nodeValues = {
            ...this.nodeValues,
            maxTries: this.node.maxTries
          };
        }
        if (this.node.waitBetweenTries) {
          foundNodeSettings.push("waitBetweenTries");
          this.nodeValues = {
            ...this.nodeValues,
            waitBetweenTries: this.node.waitBetweenTries
          };
        }
        for (const nodeSetting of this.nodeSettings) {
          if (!foundNodeSettings.includes(nodeSetting.name)) {
            this.nodeValues = {
              ...this.nodeValues,
              [nodeSetting.name]: nodeSetting.default
            };
          }
        }
        this.nodeValues = {
          ...this.nodeValues,
          parameters: deepCopy(this.node.parameters)
        };
      } else {
        this.nodeValid = false;
      }
      this.nodeValuesInitialized = true;
    },
    onMissingNodeTextClick(event) {
      if (event.target.localName === "a") {
        this.$telemetry.track("user clicked cnr browse button", {
          source: "cnr missing node modal"
        });
      }
    },
    onMissingNodeLearnMoreLinkClick() {
      var _a, _b;
      this.$telemetry.track("user clicked cnr docs link", {
        source: "missing node modal source",
        package_name: (_a = this.node) == null ? void 0 : _a.type.split(".")[0],
        node_type: (_b = this.node) == null ? void 0 : _b.type
      });
    },
    onStopExecution() {
      this.$emit("stopExecution");
    },
    openSettings() {
      this.openPanel = "settings";
    }
  },
  mounted() {
    var _a;
    this.populateHiddenIssuesSet();
    this.populateSettings();
    this.setNodeValues();
    (_a = this.eventBus) == null ? void 0 : _a.on("openSettings", this.openSettings);
    this.updateNodeParameterIssues(this.node, this.nodeType);
  },
  beforeUnmount() {
    var _a;
    (_a = this.eventBus) == null ? void 0 : _a.off("openSettings", this.openSettings);
  }
});
const header$2 = "_header_1uxvz_5";
const warningIcon = "_warningIcon_1uxvz_9";
const descriptionContainer = "_descriptionContainer_1uxvz_14";
const style0$8 = {
  header: header$2,
  warningIcon,
  descriptionContainer
};
const NodeSettings_vue_vue_type_style_index_1_scoped_03ed5174_lang = "";
const _withScopeId$6 = (n) => (pushScopeId("data-v-03ed5174"), n = n(), popScopeId(), n);
const _hoisted_1$f = { class: "header-side-menu" };
const _hoisted_2$c = { key: 1 };
const _hoisted_3$8 = {
  key: 0,
  class: "node-is-not-valid"
};
const _hoisted_4$6 = { class: "missingNodeTitleContainer mt-s mb-xs" };
const _hoisted_5$7 = { class: "mb-l" };
const _hoisted_6$6 = ["href"];
const _hoisted_7$5 = ["href", "textContent"];
const _hoisted_8$5 = {
  key: 1,
  class: "node-parameters-wrapper",
  "data-test-id": "node-parameters"
};
const _hoisted_9$2 = {
  key: 1,
  class: "no-parameters"
};
const _hoisted_10$2 = {
  key: 2,
  class: "parameter-item parameter-notice",
  "data-test-id": "node-parameters-http-notice"
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NodeTitle = resolveComponent("NodeTitle");
  const _component_NodeExecuteButton = resolveComponent("NodeExecuteButton");
  const _component_NodeSettingsTabs = resolveComponent("NodeSettingsTabs");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_i18n_t = resolveComponent("i18n-t");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_notice = resolveComponent("n8n-notice");
  const _component_node_webhooks = resolveComponent("node-webhooks");
  const _component_node_credentials = resolveComponent("node-credentials");
  const _component_parameter_input_list = resolveComponent("parameter-input-list");
  const _component_n8n_block_ui = resolveComponent("n8n-block-ui");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "node-settings": true,
      dragging: _ctx.dragging
    }),
    onKeydown: _cache[1] || (_cache[1] = withModifiers(() => {
    }, ["stop"]))
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      createBaseVNode("div", _hoisted_1$f, [
        _ctx.node ? (openBlock(), createBlock(_component_NodeTitle, {
          key: 0,
          class: "node-name",
          modelValue: _ctx.node.name,
          nodeType: _ctx.nodeType,
          readOnly: _ctx.isReadOnly,
          "onUpdate:modelValue": _ctx.nameChanged
        }, null, 8, ["modelValue", "nodeType", "readOnly", "onUpdate:modelValue"])) : createCommentVNode("", true),
        _ctx.isExecutable ? (openBlock(), createElementBlock("div", _hoisted_2$c, [
          !_ctx.blockUI && _ctx.node && _ctx.nodeValid ? (openBlock(), createBlock(_component_NodeExecuteButton, {
            key: 0,
            "data-test-id": "node-execute-button",
            nodeName: _ctx.node.name,
            disabled: _ctx.outputPanelEditMode.enabled && !_ctx.isTriggerNode,
            size: "small",
            telemetrySource: "parameters",
            onExecute: _ctx.onNodeExecute,
            onStopExecution: _ctx.onStopExecution
          }, null, 8, ["nodeName", "disabled", "onExecute", "onStopExecution"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]),
      _ctx.node && _ctx.nodeValid ? (openBlock(), createBlock(_component_NodeSettingsTabs, {
        key: 0,
        modelValue: _ctx.openPanel,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.openPanel = $event),
        nodeType: _ctx.nodeType,
        sessionId: _ctx.sessionId
      }, null, 8, ["modelValue", "nodeType", "sessionId"])) : createCommentVNode("", true)
    ], 2),
    _ctx.node && !_ctx.nodeValid ? (openBlock(), createElementBlock("div", _hoisted_3$8, [
      createBaseVNode("p", {
        class: normalizeClass(_ctx.$style.warningIcon)
      }, [
        createVNode(_component_font_awesome_icon, { icon: "exclamation-triangle" })
      ], 2),
      createBaseVNode("div", _hoisted_4$6, [
        createVNode(_component_n8n_text, {
          size: "large",
          color: "text-dark",
          bold: ""
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeSettings.communityNodeUnknown.title")), 1)
          ]),
          _: 1
        })
      ]),
      _ctx.isCommunityNode ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.descriptionContainer)
      }, [
        createBaseVNode("div", _hoisted_5$7, [
          createVNode(_component_i18n_t, {
            keypath: "nodeSettings.communityNodeUnknown.description",
            tag: "span",
            onClick: _ctx.onMissingNodeTextClick
          }, {
            action: withCtx(() => [
              createBaseVNode("a", {
                href: `https://www.npmjs.com/package/${_ctx.node.type.split(".")[0]}`,
                target: "_blank"
              }, toDisplayString(_ctx.node.type.split(".")[0]), 9, _hoisted_6$6)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        createVNode(_component_n8n_link, {
          to: _ctx.COMMUNITY_NODES_INSTALLATION_DOCS_URL,
          onClick: _ctx.onMissingNodeLearnMoreLinkClick
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeSettings.communityNodeUnknown.installLink.text")), 1)
          ]),
          _: 1
        }, 8, ["to", "onClick"])
      ], 2)) : (openBlock(), createBlock(_component_i18n_t, {
        key: 1,
        keypath: "nodeSettings.nodeTypeUnknown.description",
        tag: "span"
      }, {
        action: withCtx(() => [
          createBaseVNode("a", {
            href: _ctx.CUSTOM_NODES_DOCS_URL,
            target: "_blank",
            textContent: toDisplayString(_ctx.$locale.baseText("nodeSettings.nodeTypeUnknown.description.customNode"))
          }, null, 8, _hoisted_7$5)
        ]),
        _: 1
      }))
    ])) : createCommentVNode("", true),
    _ctx.node && _ctx.nodeValid ? (openBlock(), createElementBlock("div", _hoisted_8$5, [
      _ctx.hasForeignCredential ? (openBlock(), createBlock(_component_n8n_notice, {
        key: 0,
        content: _ctx.$locale.baseText("nodeSettings.hasForeignCredential", {
          interpolate: { owner: _ctx.credentialOwnerName }
        })
      }, null, 8, ["content"])) : createCommentVNode("", true),
      withDirectives(createBaseVNode("div", null, [
        createVNode(_component_node_webhooks, {
          node: _ctx.node,
          nodeType: _ctx.nodeType
        }, null, 8, ["node", "nodeType"]),
        _ctx.nodeValuesInitialized ? (openBlock(), createBlock(_component_parameter_input_list, {
          key: 0,
          parameters: _ctx.parametersNoneSetting,
          hideDelete: true,
          nodeValues: _ctx.nodeValues,
          isReadOnly: _ctx.isReadOnly,
          hiddenIssuesInputs: _ctx.hiddenIssuesInputs,
          path: "parameters",
          onValueChanged: _ctx.valueChanged,
          onActivate: _ctx.onWorkflowActivate,
          onParameterBlur: _ctx.onParameterBlur
        }, {
          default: withCtx(() => [
            createVNode(_component_node_credentials, {
              node: _ctx.node,
              readonly: _ctx.isReadOnly,
              showAll: true,
              onCredentialSelected: _ctx.credentialSelected,
              onValueChanged: _ctx.valueChanged,
              onBlur: _ctx.onParameterBlur,
              "hide-issues": _ctx.hiddenIssuesInputs.includes("credentials")
            }, null, 8, ["node", "readonly", "onCredentialSelected", "onValueChanged", "onBlur", "hide-issues"])
          ]),
          _: 1
        }, 8, ["parameters", "nodeValues", "isReadOnly", "hiddenIssuesInputs", "onValueChanged", "onActivate", "onParameterBlur"])) : createCommentVNode("", true),
        _ctx.parametersNoneSetting.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
          createVNode(_component_n8n_text, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeSettings.thisNodeDoesNotHaveAnyParameters")), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        _ctx.isCustomApiCallSelected(_ctx.nodeValues) ? (openBlock(), createElementBlock("div", _hoisted_10$2, [
          createVNode(_component_n8n_notice, {
            content: _ctx.$locale.baseText("nodeSettings.useTheHttpRequestNode", {
              interpolate: { nodeTypeDisplayName: _ctx.nodeType.displayName }
            })
          }, null, 8, ["content"])
        ])) : createCommentVNode("", true)
      ], 512), [
        [vShow, _ctx.openPanel === "params"]
      ]),
      withDirectives(createBaseVNode("div", null, [
        createVNode(_component_parameter_input_list, {
          parameters: _ctx.parametersSetting,
          nodeValues: _ctx.nodeValues,
          isReadOnly: _ctx.isReadOnly,
          hiddenIssuesInputs: _ctx.hiddenIssuesInputs,
          path: "parameters",
          onValueChanged: _ctx.valueChanged,
          onParameterBlur: _ctx.onParameterBlur
        }, null, 8, ["parameters", "nodeValues", "isReadOnly", "hiddenIssuesInputs", "onValueChanged", "onParameterBlur"]),
        createVNode(_component_parameter_input_list, {
          parameters: _ctx.nodeSettings,
          hideDelete: true,
          nodeValues: _ctx.nodeValues,
          isReadOnly: _ctx.isReadOnly,
          hiddenIssuesInputs: _ctx.hiddenIssuesInputs,
          path: "",
          onValueChanged: _ctx.valueChanged,
          onParameterBlur: _ctx.onParameterBlur
        }, null, 8, ["parameters", "nodeValues", "isReadOnly", "hiddenIssuesInputs", "onValueChanged", "onParameterBlur"])
      ], 512), [
        [vShow, _ctx.openPanel === "settings"]
      ])
    ])) : createCommentVNode("", true),
    createVNode(_component_n8n_block_ui, { show: _ctx.blockUI }, null, 8, ["show"])
  ], 34);
}
const cssModules$a = {
  "$style": style0$8
};
const NodeSettings = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__cssModules", cssModules$a], ["__scopeId", "data-v-03ed5174"]]);
const _sfc_main$h = defineComponent({
  name: "draggable",
  props: {
    disabled: {
      type: Boolean
    },
    type: {
      type: String
    },
    data: {
      type: String
    },
    tag: {
      type: String,
      default: "div"
    },
    targetDataKey: {
      type: String
    }
  },
  data() {
    const draggablePosition = {
      x: -100,
      y: -100
    };
    return {
      isDragging: false,
      draggablePosition,
      draggingEl: null,
      draggableStyle: {
        transform: `translate(${draggablePosition.x}px, ${draggablePosition.y}px)`
      },
      animationFrameId: 0
    };
  },
  computed: {
    ...mapStores(useNDVStore),
    canDrop() {
      return this.ndvStore.canDraggableDrop;
    },
    stickyPosition() {
      return this.ndvStore.draggableStickyPos;
    }
  },
  methods: {
    setDraggableStyle() {
      this.draggableStyle = {
        transform: `translate(${this.draggablePosition.x}px, ${this.draggablePosition.y}px)`
      };
    },
    onDragStart(e) {
      var _a, _b, _c;
      if (this.disabled) {
        return;
      }
      this.draggingEl = e.target;
      if (this.targetDataKey && ((_a = this.draggingEl.dataset) == null ? void 0 : _a.target) !== this.targetDataKey) {
        this.draggingEl = this.draggingEl.closest(
          `[data-target="${this.targetDataKey}"]`
        );
      }
      if (this.targetDataKey && ((_c = (_b = this.draggingEl) == null ? void 0 : _b.dataset) == null ? void 0 : _c.target) !== this.targetDataKey) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = false;
      this.draggablePosition = { x: e.pageX, y: e.pageY };
      this.setDraggableStyle();
      window.addEventListener("mousemove", this.onDrag);
      window.addEventListener("mouseup", this.onDragEnd);
      const activeElement = document.activeElement;
      if (activeElement) {
        activeElement.blur();
      }
    },
    onDrag(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      if (!this.isDragging) {
        this.isDragging = true;
        const data = this.targetDataKey && this.draggingEl ? this.draggingEl.dataset.value : this.data || "";
        this.ndvStore.draggableStartDragging({ type: this.type, data: data || "" });
        this.$emit("dragstart", this.draggingEl);
        document.body.style.cursor = "grabbing";
      }
      this.animationFrameId = window.requestAnimationFrame(() => {
        if (this.canDrop && this.stickyPosition) {
          this.draggablePosition = { x: this.stickyPosition[0], y: this.stickyPosition[1] };
        } else {
          this.draggablePosition = { x: e.pageX, y: e.pageY };
        }
        this.setDraggableStyle();
        this.$emit("drag", this.draggablePosition);
      });
    },
    onDragEnd() {
      if (this.disabled) {
        return;
      }
      document.body.style.cursor = "unset";
      window.removeEventListener("mousemove", this.onDrag);
      window.removeEventListener("mouseup", this.onDragEnd);
      window.cancelAnimationFrame(this.animationFrameId);
      setTimeout(() => {
        this.$emit("dragend", this.draggingEl);
        this.isDragging = false;
        this.draggingEl = null;
        this.ndvStore.draggableStopDragging();
      }, 0);
    }
  }
});
const dragging$1 = "_dragging_bt5wj_5";
const draggable$1 = "_draggable_bt5wj_10";
const style0$7 = {
  dragging: dragging$1,
  draggable: draggable$1,
  "draggable-data-transfer": "_draggable-data-transfer_bt5wj_17"
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass({ [_ctx.$style.dragging]: _ctx.isDragging }),
    onMousedown: _ctx.onDragStart,
    ref: "wrapper"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", { isDragging: _ctx.isDragging }),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        withDirectives(createBaseVNode("div", {
          ref: "draggable",
          class: normalizeClass(_ctx.$style.draggable),
          style: normalizeStyle(_ctx.draggableStyle)
        }, [
          renderSlot(_ctx.$slots, "preview", {
            canDrop: _ctx.canDrop,
            el: _ctx.draggingEl
          })
        ], 6), [
          [vShow, _ctx.isDragging]
        ])
      ]))
    ]),
    _: 3
  }, 40, ["class", "onMousedown"]);
}
const cssModules$9 = {
  "$style": style0$7
};
const Draggable = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__cssModules", cssModules$9]]);
const _sfc_main$g = defineComponent({
  components: {
    Draggable
  },
  props: {
    canMoveRight: {
      type: Boolean
    },
    canMoveLeft: {
      type: Boolean
    }
  },
  methods: {
    onDrag(e) {
      this.$emit("drag", e);
    },
    onDragStart() {
      this.$emit("dragstart");
    },
    onDragEnd() {
      this.$emit("dragend");
    }
  }
});
const dragContainer = "_dragContainer_4rvyw_5";
const dragButton = "_dragButton_4rvyw_9";
const leftArrow = "_leftArrow_4rvyw_23 _arrow_4rvyw_32";
const rightArrow = "_rightArrow_4rvyw_24 _arrow_4rvyw_32";
const visible$1 = "_visible_4rvyw_28";
const arrow = "_arrow_4rvyw_32";
const grid = "_grid_4rvyw_50";
const style0$6 = {
  dragContainer,
  dragButton,
  leftArrow,
  rightArrow,
  visible: visible$1,
  arrow,
  grid
};
const _hoisted_1$e = /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div")
], -1);
const _hoisted_2$b = /* @__PURE__ */ createBaseVNode("div", null, [
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div"),
  /* @__PURE__ */ createBaseVNode("div")
], -1);
const _hoisted_3$7 = [
  _hoisted_1$e,
  _hoisted_2$b
];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_Draggable = resolveComponent("Draggable");
  return openBlock(), createBlock(_component_Draggable, {
    type: "panel-resize",
    onDrag: _ctx.onDrag,
    onDragstart: _ctx.onDragStart,
    onDragend: _ctx.onDragEnd,
    class: normalizeClass(_ctx.$style.dragContainer)
  }, {
    default: withCtx(({ isDragging }) => [
      createBaseVNode("div", {
        class: normalizeClass({ [_ctx.$style.dragButton]: true })
      }, [
        _ctx.canMoveLeft ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass({ [_ctx.$style.leftArrow]: true, [_ctx.$style.visible]: isDragging })
        }, [
          createVNode(_component_font_awesome_icon, { icon: "arrow-left" })
        ], 2)) : createCommentVNode("", true),
        _ctx.canMoveRight ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass({ [_ctx.$style.rightArrow]: true, [_ctx.$style.visible]: isDragging })
        }, [
          createVNode(_component_font_awesome_icon, { icon: "arrow-right" })
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.grid)
        }, _hoisted_3$7, 2)
      ], 2)
    ]),
    _: 1
  }, 8, ["onDrag", "onDragstart", "onDragend", "class"]);
}
const cssModules$8 = {
  "$style": style0$6
};
const PanelDragButton = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__cssModules", cssModules$8]]);
const SIDE_MARGIN = 24;
const SIDE_PANELS_MARGIN = 80;
const MIN_PANEL_WIDTH = 280;
const PANEL_WIDTH = 320;
const PANEL_WIDTH_LARGE = 420;
const initialMainPanelWidth = {
  regular: MAIN_NODE_PANEL_WIDTH,
  dragless: MAIN_NODE_PANEL_WIDTH,
  unknown: MAIN_NODE_PANEL_WIDTH,
  inputless: MAIN_NODE_PANEL_WIDTH,
  wide: MAIN_NODE_PANEL_WIDTH * 2
};
const _sfc_main$f = defineComponent({
  name: "NDVDraggablePanels",
  mixins: [debounceHelper],
  components: {
    PanelDragButton
  },
  props: {
    isDraggable: {
      type: Boolean
    },
    hideInputAndOutput: {
      type: Boolean
    },
    position: {
      type: Number
    },
    nodeType: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      windowWidth: 1,
      isDragging: false,
      MIN_PANEL_WIDTH,
      initialized: false
    };
  },
  mounted() {
    this.setTotalWidth();
    if (this.mainPanelDimensions.relativeLeft === 1 && this.mainPanelDimensions.relativeRight === 1) {
      this.setMainPanelWidth();
      this.setPositions(this.getInitialLeftPosition(this.mainPanelDimensions.relativeWidth));
      this.restorePositionData();
    }
    window.addEventListener("resize", this.setTotalWidth);
    this.$emit("init", { position: this.mainPanelDimensions.relativeLeft });
    setTimeout(() => {
      this.initialized = true;
    }, 0);
    ndvEventBus.on("setPositionByName", this.setPositionByName);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setTotalWidth);
    ndvEventBus.off("setPositionByName", this.setPositionByName);
  },
  computed: {
    ...mapStores(useNDVStore),
    mainPanelDimensions() {
      return this.ndvStore.getMainPanelDimensions(this.currentNodePaneType);
    },
    supportedResizeDirections() {
      const supportedDirections = ["right"];
      if (this.isDraggable)
        supportedDirections.push("left");
      return supportedDirections;
    },
    currentNodePaneType() {
      if (!this.hasInputSlot)
        return "inputless";
      if (!this.isDraggable)
        return "dragless";
      if (this.nodeType === null)
        return "unknown";
      return get(this, "nodeType.parameterPane") || "regular";
    },
    hasInputSlot() {
      return this.$slots.input !== void 0;
    },
    inputPanelMargin() {
      return this.pxToRelativeWidth(SIDE_PANELS_MARGIN);
    },
    minWindowWidth() {
      return 2 * (SIDE_MARGIN + SIDE_PANELS_MARGIN) + MIN_PANEL_WIDTH;
    },
    minimumLeftPosition() {
      if (this.windowWidth < this.minWindowWidth)
        return this.pxToRelativeWidth(1);
      if (!this.hasInputSlot)
        return this.pxToRelativeWidth(SIDE_MARGIN);
      return this.pxToRelativeWidth(SIDE_MARGIN + 20) + this.inputPanelMargin;
    },
    maximumRightPosition() {
      if (this.windowWidth < this.minWindowWidth)
        return this.pxToRelativeWidth(1);
      return this.pxToRelativeWidth(SIDE_MARGIN + 20) + this.inputPanelMargin;
    },
    canMoveLeft() {
      return this.mainPanelDimensions.relativeLeft > this.minimumLeftPosition;
    },
    canMoveRight() {
      return this.mainPanelDimensions.relativeRight > this.maximumRightPosition;
    },
    mainPanelStyles() {
      return {
        left: `${this.relativeWidthToPx(this.mainPanelDimensions.relativeLeft)}px`,
        right: `${this.relativeWidthToPx(this.mainPanelDimensions.relativeRight)}px`
      };
    },
    inputPanelStyles() {
      return {
        right: `${this.relativeWidthToPx(this.calculatedPositions.inputPanelRelativeRight)}px`
      };
    },
    outputPanelStyles() {
      return {
        left: `${this.relativeWidthToPx(this.calculatedPositions.outputPanelRelativeLeft)}px`,
        transform: `translateX(-${this.relativeWidthToPx(this.outputPanelRelativeTranslate)}px)`
      };
    },
    calculatedPositions() {
      const hasInput = this.$slots.input !== void 0;
      const outputPanelRelativeLeft = this.mainPanelDimensions.relativeLeft + this.mainPanelDimensions.relativeWidth;
      const inputPanelRelativeRight = hasInput ? 1 - outputPanelRelativeLeft + this.mainPanelDimensions.relativeWidth : 1 - this.pxToRelativeWidth(SIDE_MARGIN);
      return {
        inputPanelRelativeRight,
        outputPanelRelativeLeft
      };
    },
    outputPanelRelativeTranslate() {
      const panelMinLeft = 1 - this.pxToRelativeWidth(MIN_PANEL_WIDTH + SIDE_MARGIN);
      const currentRelativeLeftDelta = this.calculatedPositions.outputPanelRelativeLeft - panelMinLeft;
      return currentRelativeLeftDelta > 0 ? currentRelativeLeftDelta : 0;
    },
    hasDoubleWidth() {
      return get(this, "nodeType.parameterPane") === "wide";
    },
    fixedPanelWidth() {
      const multiplier = this.hasDoubleWidth ? 2 : 1;
      if (this.windowWidth > 1700) {
        return PANEL_WIDTH_LARGE * multiplier;
      }
      return PANEL_WIDTH * multiplier;
    },
    isBelowMinWidthMainPanel() {
      const minRelativeWidth = this.pxToRelativeWidth(MIN_PANEL_WIDTH);
      return this.mainPanelDimensions.relativeWidth < minRelativeWidth;
    }
  },
  watch: {
    windowWidth(windowWidth) {
      const minRelativeWidth = this.pxToRelativeWidth(MIN_PANEL_WIDTH);
      if (this.isBelowMinWidthMainPanel) {
        this.setMainPanelWidth(minRelativeWidth);
      }
      const isBelowMinLeft = this.minimumLeftPosition > this.mainPanelDimensions.relativeLeft;
      const isMaxRight = this.maximumRightPosition > this.mainPanelDimensions.relativeRight;
      if (windowWidth > this.minWindowWidth && isBelowMinLeft && isMaxRight) {
        this.setMainPanelWidth(minRelativeWidth);
        this.setPositions(this.getInitialLeftPosition(this.mainPanelDimensions.relativeWidth));
      }
      this.setPositions(this.mainPanelDimensions.relativeLeft);
    }
  },
  methods: {
    getInitialLeftPosition(width) {
      if (this.currentNodePaneType === "dragless")
        return this.pxToRelativeWidth(SIDE_MARGIN + 1 + this.fixedPanelWidth);
      return this.hasInputSlot ? 0.5 - width / 2 : this.minimumLeftPosition;
    },
    setMainPanelWidth(relativeWidth) {
      const mainPanelRelativeWidth = relativeWidth || this.pxToRelativeWidth(initialMainPanelWidth[this.currentNodePaneType]);
      this.ndvStore.setMainPanelDimensions({
        panelType: this.currentNodePaneType,
        dimensions: {
          relativeWidth: mainPanelRelativeWidth
        }
      });
    },
    setPositions(relativeLeft) {
      const mainPanelRelativeLeft = relativeLeft || 1 - this.calculatedPositions.inputPanelRelativeRight;
      const mainPanelRelativeRight = 1 - mainPanelRelativeLeft - this.mainPanelDimensions.relativeWidth;
      const isMaxRight = this.maximumRightPosition > mainPanelRelativeRight;
      const isMinLeft = this.minimumLeftPosition > mainPanelRelativeLeft;
      const isInputless = this.currentNodePaneType === "inputless";
      if (isMinLeft) {
        this.ndvStore.setMainPanelDimensions({
          panelType: this.currentNodePaneType,
          dimensions: {
            relativeLeft: this.minimumLeftPosition,
            relativeRight: 1 - this.mainPanelDimensions.relativeWidth - this.minimumLeftPosition
          }
        });
        return;
      }
      if (isMaxRight) {
        this.ndvStore.setMainPanelDimensions({
          panelType: this.currentNodePaneType,
          dimensions: {
            relativeLeft: 1 - this.mainPanelDimensions.relativeWidth - this.maximumRightPosition,
            relativeRight: this.maximumRightPosition
          }
        });
        return;
      }
      this.ndvStore.setMainPanelDimensions({
        panelType: this.currentNodePaneType,
        dimensions: {
          relativeLeft: isInputless ? this.minimumLeftPosition : mainPanelRelativeLeft,
          relativeRight: mainPanelRelativeRight
        }
      });
    },
    setPositionByName(position) {
      const positionByName = {
        minLeft: this.minimumLeftPosition,
        maxRight: this.maximumRightPosition,
        initial: this.getInitialLeftPosition(this.mainPanelDimensions.relativeWidth)
      };
      this.setPositions(positionByName[position]);
    },
    pxToRelativeWidth(px) {
      return px / this.windowWidth;
    },
    relativeWidthToPx(relativeWidth) {
      return relativeWidth * this.windowWidth;
    },
    onResizeStart() {
      this.setTotalWidth();
    },
    onResizeEnd() {
      this.storePositionData();
    },
    onResizeDebounced(data) {
      if (this.initialized) {
        void this.callDebounced("onResize", { debounceTime: 10, trailing: true }, data);
      }
    },
    onResize({ direction, x, width }) {
      const relativeDistance = this.pxToRelativeWidth(x);
      const relativeWidth = this.pxToRelativeWidth(width);
      if (direction === "left" && relativeDistance <= this.minimumLeftPosition)
        return;
      if (direction === "right" && 1 - relativeDistance <= this.maximumRightPosition)
        return;
      if (width <= MIN_PANEL_WIDTH)
        return;
      this.setMainPanelWidth(relativeWidth);
      this.setPositions(
        direction === "left" ? relativeDistance : this.mainPanelDimensions.relativeLeft
      );
    },
    restorePositionData() {
      const storedPanelWidthData = useStorage(
        `${LOCAL_STORAGE_MAIN_PANEL_RELATIVE_WIDTH}_${this.currentNodePaneType}`
      ).value;
      if (storedPanelWidthData) {
        const parsedWidth = parseFloat(storedPanelWidthData);
        this.setMainPanelWidth(parsedWidth);
        const initialPosition = this.getInitialLeftPosition(parsedWidth);
        this.setPositions(initialPosition);
        return true;
      }
      return false;
    },
    storePositionData() {
      useStorage(`${LOCAL_STORAGE_MAIN_PANEL_RELATIVE_WIDTH}_${this.currentNodePaneType}`).value = this.mainPanelDimensions.relativeWidth.toString();
    },
    onDragStart() {
      this.isDragging = true;
      this.$emit("dragstart", { position: this.mainPanelDimensions.relativeLeft });
    },
    onDrag(e) {
      const relativeLeft = this.pxToRelativeWidth(e.x) - this.mainPanelDimensions.relativeWidth / 2;
      this.setPositions(relativeLeft);
    },
    onDragEnd() {
      setTimeout(() => {
        this.isDragging = false;
        this.$emit("dragend", {
          windowWidth: this.windowWidth,
          position: this.mainPanelDimensions.relativeLeft
        });
      }, 0);
      this.storePositionData();
    },
    setTotalWidth() {
      this.windowWidth = window.innerWidth;
    },
    close() {
      this.$emit("close");
    }
  }
});
const dataPanel = "_dataPanel_w56ig_5";
const inputPanel = "_inputPanel_w56ig_14 _dataPanel_w56ig_5";
const outputPanel = "_outputPanel_w56ig_22 _dataPanel_w56ig_5";
const mainPanel = "_mainPanel_w56ig_30";
const draggable = "_draggable_w56ig_34";
const mainPanelInner = "_mainPanelInner_w56ig_38";
const dragging = "_dragging_w56ig_45";
const dragButtonContainer = "_dragButtonContainer_w56ig_58";
const visible = "_visible_w56ig_74";
const style0$5 = {
  dataPanel,
  inputPanel,
  outputPanel,
  mainPanel,
  draggable,
  mainPanelInner,
  dragging,
  "double-width": "_double-width_w56ig_54",
  dragButtonContainer,
  visible
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PanelDragButton = resolveComponent("PanelDragButton");
  const _component_n8n_resize_wrapper = resolveComponent("n8n-resize-wrapper");
  return openBlock(), createElementBlock("div", null, [
    !_ctx.hideInputAndOutput ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.inputPanel),
      style: normalizeStyle(_ctx.inputPanelStyles)
    }, [
      renderSlot(_ctx.$slots, "input")
    ], 6)) : createCommentVNode("", true),
    !_ctx.hideInputAndOutput ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.$style.outputPanel),
      style: normalizeStyle(_ctx.outputPanelStyles)
    }, [
      renderSlot(_ctx.$slots, "output")
    ], 6)) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.mainPanel),
      style: normalizeStyle(_ctx.mainPanelStyles)
    }, [
      createVNode(_component_n8n_resize_wrapper, {
        isResizingEnabled: _ctx.currentNodePaneType !== "unknown",
        width: _ctx.relativeWidthToPx(_ctx.mainPanelDimensions.relativeWidth),
        minWidth: _ctx.MIN_PANEL_WIDTH,
        gridSize: 20,
        onResize: _ctx.onResizeDebounced,
        onResizestart: _ctx.onResizeStart,
        onResizeend: _ctx.onResizeEnd,
        supportedDirections: _ctx.supportedResizeDirections
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.dragButtonContainer)
          }, [
            !_ctx.hideInputAndOutput && _ctx.isDraggable ? (openBlock(), createBlock(_component_PanelDragButton, {
              key: 0,
              class: normalizeClass({ [_ctx.$style.draggable]: true, [_ctx.$style.visible]: _ctx.isDragging }),
              canMoveLeft: _ctx.canMoveLeft,
              canMoveRight: _ctx.canMoveRight,
              onDragstart: _ctx.onDragStart,
              onDrag: _ctx.onDrag,
              onDragend: _ctx.onDragEnd
            }, null, 8, ["class", "canMoveLeft", "canMoveRight", "onDragstart", "onDrag", "onDragend"])) : createCommentVNode("", true)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass({ [_ctx.$style.mainPanelInner]: true, [_ctx.$style.dragging]: _ctx.isDragging })
          }, [
            renderSlot(_ctx.$slots, "main")
          ], 2)
        ]),
        _: 3
      }, 8, ["isResizingEnabled", "width", "minWidth", "onResize", "onResizestart", "onResizeend", "supportedDirections"])
    ], 6)
  ]);
}
const cssModules$7 = {
  "$style": style0$5
};
const NDVDraggablePanels = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__cssModules", cssModules$7]]);
const sanitizeOptions = {
  allowVulnerableTags: false,
  enforceHtmlBoundary: false,
  disallowedTagsMode: "discard",
  allowedTags: [...sanitizeHtml_1.defaults.allowedTags, "style", "img", "title"],
  allowedAttributes: {
    ...sanitizeHtml_1.defaults.allowedAttributes,
    "*": ["class", "style"]
  },
  transformTags: {
    head: ""
  }
};
const _sfc_main$e = {
  name: "RunDataHtml",
  props: {
    inputHtml: {
      type: String
    }
  },
  computed: {
    sanitizedHtml() {
      return sanitizeHtml(this.inputHtml, sanitizeOptions);
    }
  }
};
const RunDataHtml_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$d = ["srcdoc"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("iframe", {
    class: "__html-display",
    srcdoc: $options.sanitizedHtml
  }, null, 8, _hoisted_1$d);
}
const RunDataHtml$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d]]);
const RunDataHtml$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RunDataHtml$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = defineComponent({
  name: "BinaryDataDisplayEmbed",
  components: {
    VueJsonPretty,
    RunDataHtml: RunDataHtml$1
  },
  props: {
    binaryData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      embedSource: "",
      error: false,
      data: ""
    };
  },
  computed: {
    ...mapStores(useWorkflowsStore)
  },
  async mounted() {
    const { id, data, fileName, fileType, mimeType } = this.binaryData;
    const isJSONData = fileType === "json";
    const isHTMLData = fileType === "html";
    if (!id) {
      if (isJSONData || isHTMLData) {
        this.data = jsonParse(atob(data));
      } else {
        this.embedSource = "data:" + mimeType + ";base64," + data;
      }
    } else {
      try {
        const binaryUrl = this.workflowsStore.getBinaryUrl(id, "view", fileName, mimeType);
        if (isJSONData || isHTMLData) {
          const fetchedData = await fetch(binaryUrl, { credentials: "include" });
          this.data = await (isJSONData ? fetchedData.json() : fetchedData.text());
        } else {
          this.embedSource = binaryUrl;
        }
      } catch (e) {
        this.error = true;
      }
    }
    this.isLoading = false;
  },
  methods: {
    embedClass() {
      const { fileType } = this.binaryData;
      return [fileType ?? "other"];
    }
  }
});
const BinaryDataDisplayEmbed_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$c = { key: 0 };
const _hoisted_2$a = { key: 1 };
const _hoisted_3$6 = { key: 2 };
const _hoisted_4$5 = {
  key: 0,
  controls: "",
  autoplay: ""
};
const _hoisted_5$6 = ["src", "type"];
const _hoisted_6$5 = {
  key: 1,
  controls: "",
  autoplay: ""
};
const _hoisted_7$4 = ["src", "type"];
const _hoisted_8$4 = ["src"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_vue_json_pretty = resolveComponent("vue-json-pretty");
  const _component_run_data_html = resolveComponent("run-data-html");
  return openBlock(), createElementBlock("span", null, [
    _ctx.isLoading ? (openBlock(), createElementBlock("div", _hoisted_1$c, "Loading binary data...")) : _ctx.error ? (openBlock(), createElementBlock("div", _hoisted_2$a, "Error loading binary data")) : (openBlock(), createElementBlock("span", _hoisted_3$6, [
      _ctx.binaryData.fileType === "video" ? (openBlock(), createElementBlock("video", _hoisted_4$5, [
        createBaseVNode("source", {
          src: _ctx.embedSource,
          type: _ctx.binaryData.mimeType
        }, null, 8, _hoisted_5$6),
        createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("binaryDataDisplay.yourBrowserDoesNotSupport")), 1)
      ])) : _ctx.binaryData.fileType === "audio" ? (openBlock(), createElementBlock("audio", _hoisted_6$5, [
        createBaseVNode("source", {
          src: _ctx.embedSource,
          type: _ctx.binaryData.mimeType
        }, null, 8, _hoisted_7$4),
        createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("binaryDataDisplay.yourBrowserDoesNotSupport")), 1)
      ])) : _ctx.binaryData.fileType === "json" ? (openBlock(), createBlock(_component_vue_json_pretty, {
        key: 2,
        data: _ctx.data,
        deep: 3,
        showLength: true
      }, null, 8, ["data"])) : _ctx.binaryData.fileType === "html" ? (openBlock(), createBlock(_component_run_data_html, {
        key: 3,
        inputHtml: _ctx.data
      }, null, 8, ["inputHtml"])) : (openBlock(), createElementBlock("embed", {
        key: 4,
        src: _ctx.embedSource,
        class: normalizeClass(["binary-data", _ctx.embedClass()])
      }, null, 10, _hoisted_8$4))
    ]))
  ]);
}
const BinaryDataDisplayEmbed = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c]]);
const _sfc_main$c = defineComponent({
  name: "BinaryDataDisplay",
  mixins: [nodeHelpers],
  components: {
    BinaryDataDisplayEmbed
  },
  props: [
    "displayData",
    // IBinaryData
    "windowVisible"
    // boolean
  ],
  computed: {
    ...mapStores(useWorkflowsStore),
    binaryData() {
      const binaryData = this.getBinaryData(
        this.workflowRunData,
        this.displayData.node,
        this.displayData.runIndex,
        this.displayData.outputIndex
      );
      if (binaryData.length === 0) {
        return null;
      }
      if (this.displayData.index >= binaryData.length || binaryData[this.displayData.index][this.displayData.key] === void 0) {
        return null;
      }
      const binaryDataItem = binaryData[this.displayData.index][this.displayData.key];
      return binaryDataItem;
    },
    workflowRunData() {
      const workflowExecution = this.workflowsStore.getWorkflowExecution;
      if (workflowExecution === null) {
        return null;
      }
      const executionData = workflowExecution.data;
      return executionData ? executionData.resultData.runData : null;
    }
  },
  methods: {
    closeWindow() {
      this.$emit("close");
      return false;
    }
  }
});
const BinaryDataDisplay_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$b = { class: "binary-data-window-wrapper" };
const _hoisted_2$9 = { key: 0 };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_BinaryDataDisplayEmbed = resolveComponent("BinaryDataDisplayEmbed");
  return _ctx.windowVisible ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass(["binary-data-window", (_a = _ctx.binaryData) == null ? void 0 : _a.fileType])
  }, [
    createVNode(_component_n8n_button, {
      onClick: withModifiers(_ctx.closeWindow, ["stop"]),
      size: "small",
      class: "binary-data-window-back",
      title: _ctx.$locale.baseText("binaryDataDisplay.backToOverviewPage"),
      icon: "arrow-left",
      label: _ctx.$locale.baseText("binaryDataDisplay.backToList")
    }, null, 8, ["onClick", "title", "label"]),
    createBaseVNode("div", _hoisted_1$b, [
      !_ctx.binaryData ? (openBlock(), createElementBlock("div", _hoisted_2$9, toDisplayString(_ctx.$locale.baseText("binaryDataDisplay.noDataFoundToDisplay")), 1)) : (openBlock(), createBlock(_component_BinaryDataDisplayEmbed, {
        key: 1,
        binaryData: _ctx.binaryData
      }, null, 8, ["binaryData"]))
    ])
  ], 2)) : createCommentVNode("", true);
}
const BinaryDataDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b]]);
const _sfc_main$b = defineComponent({
  name: "NodeErrorView",
  mixins: [copyPaste],
  props: ["error"],
  components: {
    VueJsonPretty
  },
  setup() {
    return {
      ...useToast()
    };
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore),
    displayCause() {
      return JSON.stringify(this.error.cause).length < MAX_DISPLAY_DATA_SIZE;
    },
    parameters() {
      const node = this.ndvStore.activeNode;
      if (!node) {
        return [];
      }
      const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
      if (nodeType === null) {
        return [];
      }
      return nodeType.properties;
    }
  },
  methods: {
    replacePlaceholders(parameter, message) {
      const parameterName = this.parameterDisplayName(parameter, false);
      const parameterFullName = this.parameterDisplayName(parameter, true);
      return message.replace(/%%PARAMETER%%/g, parameterName).replace(/%%PARAMETER_FULL%%/g, parameterFullName);
    },
    getErrorDescription() {
      var _a;
      if (!((_a = this.error.context) == null ? void 0 : _a.descriptionTemplate)) {
        return sanitizeHtml$1(this.error.description);
      }
      const parameterName = this.parameterDisplayName(this.error.context.parameter);
      return sanitizeHtml$1(
        this.error.context.descriptionTemplate.replace(/%%PARAMETER%%/g, parameterName)
      );
    },
    getErrorMessage() {
      var _a;
      const baseErrorMessage = this.$locale.baseText("nodeErrorView.error") + ": ";
      if (!((_a = this.error.context) == null ? void 0 : _a.messageTemplate)) {
        return baseErrorMessage + this.error.message;
      }
      const parameterName = this.parameterDisplayName(this.error.context.parameter);
      return baseErrorMessage + this.error.context.messageTemplate.replace(/%%PARAMETER%%/g, parameterName);
    },
    parameterDisplayName(path, fullPath = true) {
      try {
        const parameters = this.parameterName(this.parameters, path.split("."));
        if (!parameters.length) {
          throw new Error();
        }
        if (!fullPath) {
          return parameters.pop().displayName;
        }
        return parameters.map((parameter) => parameter.displayName).join(" > ");
      } catch (error) {
        return `Could not find parameter "${path}"`;
      }
    },
    parameterName(parameters, pathParts) {
      let currentParameterName = pathParts.shift();
      if (currentParameterName === void 0) {
        return [];
      }
      const arrayMatch = currentParameterName.match(/(.*)\[([\d])\]$/);
      if (arrayMatch !== null && arrayMatch.length > 0) {
        currentParameterName = arrayMatch[1];
      }
      const currentParameter = parameters.find(
        (parameter) => parameter.name === currentParameterName
      );
      if (currentParameter === void 0) {
        throw new Error(`Could not find parameter "${currentParameterName}"`);
      }
      if (pathParts.length === 0) {
        return [currentParameter];
      }
      if (currentParameter.hasOwnProperty("options")) {
        return [
          currentParameter,
          ...this.parameterName(currentParameter.options, pathParts)
        ];
      }
      if (currentParameter.hasOwnProperty("values")) {
        return [
          currentParameter,
          ...this.parameterName(currentParameter.values, pathParts)
        ];
      }
      return [currentParameter];
    },
    copyCause() {
      this.copyToClipboard(JSON.stringify(this.error.cause));
      this.copySuccess();
    },
    copySuccess() {
      this.showMessage({
        title: this.$locale.baseText("nodeErrorView.showMessage.title"),
        type: "info"
      });
    }
  }
});
const NodeErrorView_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$a = { class: "error-header" };
const _hoisted_2$8 = { class: "error-message" };
const _hoisted_3$5 = ["innerHTML"];
const _hoisted_4$4 = { class: "error-details__summary" };
const _hoisted_5$5 = { class: "error-details__content" };
const _hoisted_6$4 = { key: 0 };
const _hoisted_7$3 = { key: 1 };
const _hoisted_8$3 = { class: "clearfix box-card__title" };
const _hoisted_9$1 = {
  key: 2,
  class: "el-card box-card is-never-shadow el-card__body"
};
const _hoisted_10$1 = { class: "error-details__summary" };
const _hoisted_11$1 = { key: 0 };
const _hoisted_12$1 = { class: "error-details__summary" };
const _hoisted_13$1 = { key: 1 };
const _hoisted_14$1 = { class: "error-details__summary" };
const _hoisted_15$1 = { key: 3 };
const _hoisted_16$1 = { class: "clearfix box-card__title" };
const _hoisted_17$1 = { key: 4 };
const _hoisted_18$1 = { class: "clearfix box-card__title" };
const _hoisted_19$1 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_20$1 = { class: "box-card__subtitle" };
const _hoisted_21$1 = {
  key: 0,
  class: "copy-button"
};
const _hoisted_22$1 = { key: 2 };
const _hoisted_23$1 = { key: 5 };
const _hoisted_24$1 = { class: "clearfix box-card__title" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_el_card = resolveComponent("el-card");
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _component_vue_json_pretty = resolveComponent("vue-json-pretty");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$a, [
      createBaseVNode("div", _hoisted_2$8, toDisplayString(_ctx.getErrorMessage()), 1),
      _ctx.error.description ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "error-description",
        innerHTML: _ctx.getErrorDescription()
      }, null, 8, _hoisted_3$5)) : createCommentVNode("", true)
    ]),
    createBaseVNode("details", null, [
      createBaseVNode("summary", _hoisted_4$4, [
        createVNode(_component_font_awesome_icon, {
          class: "error-details__icon",
          icon: "angle-right"
        }),
        createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("nodeErrorView.details")), 1)
      ]),
      createBaseVNode("div", _hoisted_5$5, [
        _ctx.error.context && _ctx.error.context.causeDetailed ? (openBlock(), createElementBlock("div", _hoisted_6$4, [
          createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", null, toDisplayString(_ctx.error.context.causeDetailed), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        _ctx.error.timestamp ? (openBlock(), createElementBlock("div", _hoisted_7$3, [
          createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            header: withCtx(() => [
              createBaseVNode("div", _hoisted_8$3, [
                createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("nodeErrorView.time")), 1)
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, toDisplayString(new Date(_ctx.error.timestamp).toLocaleString()), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        _ctx.error.context && _ctx.error.context.itemIndex !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
          createBaseVNode("span", _hoisted_10$1, toDisplayString(_ctx.$locale.baseText("nodeErrorView.itemIndex")) + ":", 1),
          createTextVNode(" " + toDisplayString(_ctx.error.context.itemIndex) + " ", 1),
          _ctx.error.context.runIndex ? (openBlock(), createElementBlock("span", _hoisted_11$1, [
            createTextVNode(" | "),
            createBaseVNode("span", _hoisted_12$1, toDisplayString(_ctx.$locale.baseText("nodeErrorView.itemIndex")) + ":", 1),
            createTextVNode(" " + toDisplayString(_ctx.error.context.runIndex), 1)
          ])) : createCommentVNode("", true),
          _ctx.error.context.parameter ? (openBlock(), createElementBlock("span", _hoisted_13$1, [
            createTextVNode(" | "),
            createBaseVNode("span", _hoisted_14$1, toDisplayString(_ctx.$locale.baseText("nodeErrorView.inParameter")) + ":", 1),
            createTextVNode(" " + toDisplayString(_ctx.parameterDisplayName(_ctx.error.context.parameter)), 1)
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        _ctx.error.httpCode ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
          createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            header: withCtx(() => [
              createBaseVNode("div", _hoisted_16$1, [
                createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("nodeErrorView.httpCode")), 1)
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, toDisplayString(_ctx.error.httpCode), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        _ctx.error.cause ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
          createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            header: withCtx(() => [
              createBaseVNode("div", _hoisted_18$1, [
                createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("nodeErrorView.cause")), 1),
                _hoisted_19$1,
                createBaseVNode("span", _hoisted_20$1, toDisplayString(_ctx.$locale.baseText("nodeErrorView.dataBelowMayContain")), 1)
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, [
                _ctx.displayCause ? (openBlock(), createElementBlock("div", _hoisted_21$1, [
                  createVNode(_component_n8n_icon_button, {
                    onClick: _ctx.copyCause,
                    title: _ctx.$locale.baseText("nodeErrorView.copyToClipboard"),
                    icon: "copy"
                  }, null, 8, ["onClick", "title"])
                ])) : createCommentVNode("", true),
                _ctx.displayCause ? (openBlock(), createBlock(_component_vue_json_pretty, {
                  key: 1,
                  data: _ctx.error.cause,
                  deep: 3,
                  showLength: true,
                  selectableType: "single",
                  path: "error",
                  class: "json-data"
                }, null, 8, ["data"])) : (openBlock(), createElementBlock("span", _hoisted_22$1, [
                  createVNode(_component_font_awesome_icon, { icon: "info-circle" }),
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeErrorView.theErrorCauseIsTooLargeToBeDisplayed")), 1)
                ]))
              ])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        _ctx.error.stack ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
          createVNode(_component_el_card, {
            class: "box-card",
            shadow: "never"
          }, {
            header: withCtx(() => [
              createBaseVNode("div", _hoisted_24$1, [
                createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("nodeErrorView.stack")), 1)
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createBaseVNode("pre", null, [
                  createBaseVNode("code", null, toDisplayString(_ctx.error.stack), 1)
                ])
              ])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true)
      ])
    ])
  ]);
}
const NodeErrorView = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a]]);
const RunDataTable = defineAsyncComponent(async () => __vitePreload(() => import("./RunDataTable-032caaf3.js"), true ? ["assets/RunDataTable-032caaf3.js","assets/vendor-fd4bd18c.js","assets/pinia-282957dc.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/index-00f166b0.js","assets/prettier-ee8b90a8.js","assets/codemirror-lang-html-n8n-1744db69.js","assets/@n8n/codemirror-lang-sql-71393e13.js","assets/@lezer/common-ff1769bd.js","assets/codemirror-lang-n8n-expression-5b146a0d.js","assets/fast-json-stable-stringify-4acbec5d.js","assets/timeago.js-527228bd.js","assets/qrcode.vue-401ae704.js","assets/vue3-touch-events-c30a9e21.js","assets/@fortawesome/free-solid-svg-icons-e786cea6.js","assets/@fortawesome/free-regular-svg-icons-d7581360.js","assets/chart.js-b7590faa.js","assets/index-ef6ecd1d.css","assets/MappingPill-f04ee9de.js","assets/MappingPill-307b56db.css","assets/file-saver-ccbe3603.js","assets/vue-json-pretty-1f49a504.js","assets/RunDataAi-1d763057.js","assets/vue-markdown-render-1dc15361.js","assets/RunDataAi-eaec1b12.css","assets/workflowActivate-7e113acb.js","assets/RunDataTable-b383e427.css"] : void 0));
const RunDataJson = defineAsyncComponent(async () => __vitePreload(() => import("./RunDataJson-0726b133.js"), true ? ["assets/RunDataJson-0726b133.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/pinia-282957dc.js","assets/vendor-fd4bd18c.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/vue-json-pretty-1f49a504.js","assets/index-00f166b0.js","assets/prettier-ee8b90a8.js","assets/codemirror-lang-html-n8n-1744db69.js","assets/@n8n/codemirror-lang-sql-71393e13.js","assets/@lezer/common-ff1769bd.js","assets/codemirror-lang-n8n-expression-5b146a0d.js","assets/fast-json-stable-stringify-4acbec5d.js","assets/timeago.js-527228bd.js","assets/qrcode.vue-401ae704.js","assets/vue3-touch-events-c30a9e21.js","assets/@fortawesome/free-solid-svg-icons-e786cea6.js","assets/@fortawesome/free-regular-svg-icons-d7581360.js","assets/chart.js-b7590faa.js","assets/index-ef6ecd1d.css","assets/MappingPill-f04ee9de.js","assets/MappingPill-307b56db.css","assets/file-saver-ccbe3603.js","assets/RunDataAi-1d763057.js","assets/vue-markdown-render-1dc15361.js","assets/RunDataAi-eaec1b12.css","assets/workflowActivate-7e113acb.js","assets/RunDataJson-084997d9.css"] : void 0));
const RunDataSchema = defineAsyncComponent(async () => __vitePreload(() => import("./RunDataSchema-7f3ec2f9.js"), true ? ["assets/RunDataSchema-7f3ec2f9.js","assets/vendor-fd4bd18c.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/pinia-282957dc.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/MappingPill-f04ee9de.js","assets/MappingPill-307b56db.css","assets/index-00f166b0.js","assets/prettier-ee8b90a8.js","assets/codemirror-lang-html-n8n-1744db69.js","assets/@n8n/codemirror-lang-sql-71393e13.js","assets/@lezer/common-ff1769bd.js","assets/codemirror-lang-n8n-expression-5b146a0d.js","assets/fast-json-stable-stringify-4acbec5d.js","assets/timeago.js-527228bd.js","assets/qrcode.vue-401ae704.js","assets/vue3-touch-events-c30a9e21.js","assets/@fortawesome/free-solid-svg-icons-e786cea6.js","assets/@fortawesome/free-regular-svg-icons-d7581360.js","assets/chart.js-b7590faa.js","assets/index-ef6ecd1d.css","assets/file-saver-ccbe3603.js","assets/vue-json-pretty-1f49a504.js","assets/RunDataAi-1d763057.js","assets/vue-markdown-render-1dc15361.js","assets/RunDataAi-eaec1b12.css","assets/workflowActivate-7e113acb.js","assets/RunDataSchema-0876c076.css"] : void 0));
const RunDataHtml = defineAsyncComponent(async () => __vitePreload(() => Promise.resolve().then(() => RunDataHtml$2), true ? void 0 : void 0));
const _sfc_main$a = defineComponent({
  name: "RunData",
  mixins: [externalHooks, genericHelpers, nodeHelpers, pinData],
  components: {
    BinaryDataDisplay,
    NodeErrorView,
    CodeNodeEditor,
    RunDataTable,
    RunDataJson,
    RunDataSchema,
    RunDataHtml
  },
  props: {
    nodeUi: {
      type: Object
    },
    runIndex: {
      type: Number,
      required: true
    },
    linkedRuns: {
      type: Boolean
    },
    canLinkRuns: {
      type: Boolean
    },
    tooMuchDataTitle: {
      type: String
    },
    noDataInBranchMessage: {
      type: String
    },
    isExecuting: {
      type: Boolean
    },
    executingMessage: {
      type: String
    },
    sessionId: {
      type: String
    },
    paneType: {
      type: String
    },
    overrideOutputs: {
      type: Array
    },
    mappingEnabled: {
      type: Boolean
    },
    distanceFromActive: {
      type: Number
    },
    blockUI: {
      type: Boolean,
      default: false
    },
    isProductionExecutionPreview: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      connectionType: NodeConnectionType.Main,
      binaryDataPreviewActive: false,
      dataSize: 0,
      showData: false,
      outputIndex: 0,
      binaryDataDisplayVisible: false,
      binaryDataDisplayData: null,
      MAX_DISPLAY_DATA_SIZE,
      MAX_DISPLAY_ITEMS_AUTO_ALL,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      pinDataDiscoveryTooltipVisible: false,
      isControlledPinDataTooltip: false
    };
  },
  mounted() {
    this.init();
    if (!this.isPaneTypeInput) {
      this.showPinDataDiscoveryTooltip(this.jsonData);
    }
    this.ndvStore.setNDVBranchIndex({
      pane: this.paneType,
      branchIndex: this.currentOutputIndex
    });
    if (this.paneType === "output")
      this.setDisplayMode();
  },
  beforeUnmount() {
    this.hidePinDataDiscoveryTooltip();
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useWorkflowsStore),
    activeNode() {
      return this.ndvStore.activeNode;
    },
    dataPinningDocsUrl() {
      return DATA_PINNING_DOCS_URL;
    },
    dataEditingDocsUrl() {
      return DATA_EDITING_DOCS_URL;
    },
    displayMode() {
      return this.ndvStore.getPanelDisplayMode(this.paneType);
    },
    node() {
      return this.nodeUi || null;
    },
    nodeType() {
      if (this.node) {
        return this.nodeTypesStore.getNodeType(this.node.type, this.node.typeVersion);
      }
      return null;
    },
    isSchemaView() {
      return this.displayMode === "schema";
    },
    isTriggerNode() {
      if (this.node === null) {
        return false;
      }
      return this.nodeTypesStore.isTriggerNode(this.node.type);
    },
    canPinData() {
      if (this.node === null) {
        return false;
      }
      const workflow = this.workflowsStore.getCurrentWorkflow();
      const workflowNode = workflow.getNode(this.node.name);
      const inputs = getNodeInputs(workflow, workflowNode, this.nodeType);
      const inputNames = getConnectionTypes(inputs);
      const nonMainInputs = !!inputNames.find((inputName) => inputName !== NodeConnectionType.Main);
      return !nonMainInputs && !this.isPaneTypeInput && this.isPinDataNodeType && !(this.binaryData && this.binaryData.length > 0);
    },
    buttons() {
      var _a;
      const defaults = [
        { label: this.$locale.baseText("runData.table"), value: "table" },
        { label: this.$locale.baseText("runData.json"), value: "json" }
      ];
      if (this.binaryData.length) {
        defaults.push({ label: this.$locale.baseText("runData.binary"), value: "binary" });
      }
      const schemaView = { label: this.$locale.baseText("runData.schema"), value: "schema" };
      if (this.isPaneTypeInput && !isEmpty(this.jsonData)) {
        defaults.unshift(schemaView);
      } else {
        defaults.push(schemaView);
      }
      if (this.isPaneTypeOutput && ((_a = this.activeNode) == null ? void 0 : _a.type) === HTML_NODE_TYPE && this.activeNode.parameters.operation === "generateHtmlTemplate") {
        defaults.unshift({ label: "HTML", value: "html" });
      }
      return defaults;
    },
    hasNodeRun() {
      return Boolean(
        !this.isExecuting && this.node && (this.workflowRunData && this.workflowRunData.hasOwnProperty(this.node.name) || this.hasPinData)
      );
    },
    isArtificialRecoveredEventItem() {
      var _a, _b, _c;
      return !!((_c = (_b = (_a = this.rawInputData) == null ? void 0 : _a[0]) == null ? void 0 : _b.json) == null ? void 0 : _c.isArtificialRecoveredEventItem);
    },
    subworkflowExecutionError() {
      return this.workflowsStore.subWorkflowExecutionError;
    },
    hasSubworkflowExecutionError() {
      return Boolean(this.subworkflowExecutionError);
    },
    hasRunError() {
      var _a, _b, _c;
      return Boolean(this.node && ((_c = (_b = (_a = this.workflowRunData) == null ? void 0 : _a[this.node.name]) == null ? void 0 : _b[this.runIndex]) == null ? void 0 : _c.error));
    },
    workflowExecution() {
      return this.workflowsStore.getWorkflowExecution;
    },
    workflowRunData() {
      if (this.workflowExecution === null) {
        return null;
      }
      const executionData = this.workflowExecution.data;
      if (executionData == null ? void 0 : executionData.resultData) {
        return executionData.resultData.runData;
      }
      return null;
    },
    dataCount() {
      return this.getDataCount(this.runIndex, this.currentOutputIndex);
    },
    dataSizeInMB() {
      return (this.dataSize / 1024 / 1e3).toLocaleString();
    },
    maxOutputIndex() {
      if (this.node === null || this.runIndex === void 0) {
        return 0;
      }
      const runData = this.workflowRunData;
      if (runData === null || !runData.hasOwnProperty(this.node.name)) {
        return 0;
      }
      if (runData[this.node.name].length < this.runIndex) {
        return 0;
      }
      if (runData[this.node.name][this.runIndex]) {
        const taskData = runData[this.node.name][this.runIndex].data;
        if (taskData == null ? void 0 : taskData.main) {
          return taskData.main.length - 1;
        }
      }
      return 0;
    },
    currentPageOffset() {
      return this.pageSize * (this.currentPage - 1);
    },
    maxRunIndex() {
      if (this.node === null) {
        return 0;
      }
      const runData = this.workflowRunData;
      if (runData === null || !runData.hasOwnProperty(this.node.name)) {
        return 0;
      }
      if (runData[this.node.name].length) {
        return runData[this.node.name].length - 1;
      }
      return 0;
    },
    rawInputData() {
      return this.getRawInputData(this.runIndex, this.currentOutputIndex, this.connectionType);
    },
    inputData() {
      return this.getPinDataOrLiveData(this.rawInputData);
    },
    inputDataPage() {
      const offset = this.pageSize * (this.currentPage - 1);
      return this.inputData.slice(offset, offset + this.pageSize);
    },
    jsonData() {
      return executionDataToJson(this.inputData);
    },
    binaryData() {
      if (!this.node) {
        return [];
      }
      const binaryData = this.getBinaryData(
        this.workflowRunData,
        this.node.name,
        this.runIndex,
        this.currentOutputIndex
      );
      return binaryData.filter((data) => Boolean(data && Object.keys(data).length));
    },
    currentOutputIndex() {
      var _a;
      if (((_a = this.overrideOutputs) == null ? void 0 : _a.length) && !this.overrideOutputs.includes(this.outputIndex)) {
        return this.overrideOutputs[0];
      }
      return this.outputIndex;
    },
    branches() {
      var _a;
      const capitalize = (name) => name.charAt(0).toLocaleUpperCase() + name.slice(1);
      const branches = [];
      for (let i = 0; i <= this.maxOutputIndex; i++) {
        if (this.overrideOutputs && !this.overrideOutputs.includes(i)) {
          continue;
        }
        const itemsCount2 = this.getDataCount(this.runIndex, i);
        const items = this.$locale.baseText("ndv.output.items", { adjustToNumber: itemsCount2 });
        let outputName = this.getOutputName(i);
        if (`${outputName}` === `${i}`) {
          outputName = `${this.$locale.baseText("ndv.output")} ${outputName}`;
        } else {
          const appendBranchWord = NODE_TYPES_EXCLUDED_FROM_OUTPUT_NAME_APPEND.includes(
            (_a = this.node) == null ? void 0 : _a.type
          ) ? "" : ` ${this.$locale.baseText("ndv.output.branch")}`;
          outputName = capitalize(`${this.getOutputName(i)}${appendBranchWord}`);
        }
        branches.push({
          label: itemsCount2 ? `${outputName} (${itemsCount2} ${items})` : outputName,
          value: i
        });
      }
      return branches;
    },
    editMode() {
      return this.isPaneTypeInput ? { enabled: false, value: "" } : this.ndvStore.outputPanelEditMode;
    },
    isPaneTypeInput() {
      return this.paneType === "input";
    },
    isPaneTypeOutput() {
      return this.paneType === "output";
    },
    readOnlyEnv() {
      return this.sourceControlStore.preferences.branchReadOnly;
    }
  },
  methods: {
    getResolvedNodeOutputs() {
      if (this.node && this.nodeType) {
        const workflow = this.workflowsStore.getCurrentWorkflow();
        const workflowNode = workflow.getNode(this.node.name);
        if (workflowNode) {
          const outputs = getNodeOutputs(workflow, workflowNode, this.nodeType);
          return outputs;
        }
      }
      return [];
    },
    onItemHover(itemIndex) {
      if (itemIndex === null) {
        this.$emit("itemHover", null);
        return;
      }
      this.$emit("itemHover", {
        outputIndex: this.currentOutputIndex,
        itemIndex
      });
    },
    onClickDataPinningDocsLink() {
      var _a;
      this.$telemetry.track("User clicked ndv link", {
        workflow_id: this.workflowsStore.workflowId,
        session_id: this.sessionId,
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        pane: "output",
        type: "data-pinning-docs"
      });
    },
    showPinDataDiscoveryTooltip(value) {
      if (!this.isTriggerNode) {
        return;
      }
      const pinDataDiscoveryFlag = useStorage(LOCAL_STORAGE_PIN_DATA_DISCOVERY_NDV_FLAG).value;
      if (value && value.length > 0 && !this.isReadOnlyRoute && !pinDataDiscoveryFlag) {
        this.pinDataDiscoveryComplete();
        setTimeout(() => {
          this.isControlledPinDataTooltip = true;
          this.pinDataDiscoveryTooltipVisible = true;
          dataPinningEventBus.emit("data-pinning-discovery", { isTooltipVisible: true });
        }, 500);
      }
    },
    hidePinDataDiscoveryTooltip() {
      if (this.pinDataDiscoveryTooltipVisible) {
        this.isControlledPinDataTooltip = false;
        this.pinDataDiscoveryTooltipVisible = false;
        dataPinningEventBus.emit("data-pinning-discovery", { isTooltipVisible: false });
      }
    },
    pinDataDiscoveryComplete() {
      useStorage(LOCAL_STORAGE_PIN_DATA_DISCOVERY_NDV_FLAG).value = "true";
      useStorage(LOCAL_STORAGE_PIN_DATA_DISCOVERY_CANVAS_FLAG).value = "true";
    },
    enterEditMode({ origin }) {
      var _a;
      const inputData = this.pinData ? clearJsonKey(this.pinData) : executionDataToJson(this.rawInputData);
      const data = inputData.length > 0 ? inputData : TEST_PIN_DATA;
      this.ndvStore.setOutputPanelEditModeEnabled(true);
      this.ndvStore.setOutputPanelEditModeValue(JSON.stringify(data, null, 2));
      this.$telemetry.track("User opened ndv edit state", {
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        click_type: origin === "editIconButton" ? "button" : "link",
        session_id: this.sessionId,
        run_index: this.runIndex,
        is_output_present: this.hasNodeRun || this.hasPinData,
        view: !this.hasNodeRun && !this.hasPinData ? "undefined" : this.displayMode,
        is_data_pinned: this.hasPinData
      });
    },
    onClickCancelEdit() {
      this.ndvStore.setOutputPanelEditModeEnabled(false);
      this.ndvStore.setOutputPanelEditModeValue("");
      this.onExitEditMode({ type: "cancel" });
    },
    onClickSaveEdit() {
      if (!this.node) {
        return;
      }
      const { value } = this.editMode;
      this.clearAllStickyNotifications();
      try {
        this.setPinData(this.node, clearJsonKey(value), "save-edit");
      } catch (error) {
        console.error(error);
        return;
      }
      this.ndvStore.setOutputPanelEditModeEnabled(false);
      this.onExitEditMode({ type: "save" });
    },
    onExitEditMode({ type }) {
      var _a;
      this.$telemetry.track("User closed ndv edit state", {
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        session_id: this.sessionId,
        run_index: this.runIndex,
        view: this.displayMode,
        type
      });
    },
    async onTogglePinData({ source }) {
      if (!this.node) {
        return;
      }
      if (source === "pin-icon-click") {
        const telemetryPayload = {
          node_type: this.activeNode.type,
          session_id: this.sessionId,
          run_index: this.runIndex,
          view: !this.hasNodeRun && !this.hasPinData ? "none" : this.displayMode
        };
        void this.$externalHooks().run("runData.onTogglePinData", telemetryPayload);
        this.$telemetry.track("User clicked pin data icon", telemetryPayload);
      }
      this.updateNodeParameterIssues(this.node);
      if (this.hasPinData) {
        this.unsetPinData(this.node, source);
        return;
      }
      try {
        this.setPinData(this.node, this.rawInputData, "pin-icon-click");
      } catch (error) {
        console.error(error);
        return;
      }
      if (this.maxRunIndex > 0) {
        this.showToast({
          title: this.$locale.baseText("ndv.pinData.pin.multipleRuns.title", {
            interpolate: {
              index: `${this.runIndex}`
            }
          }),
          message: this.$locale.baseText("ndv.pinData.pin.multipleRuns.description"),
          type: "success",
          duration: 2e3
        });
      }
      this.hidePinDataDiscoveryTooltip();
      this.pinDataDiscoveryComplete();
    },
    switchToBinary() {
      this.onDisplayModeChange("binary");
    },
    onBranchChange(value) {
      this.outputIndex = value;
      this.$telemetry.track("User changed ndv branch", {
        session_id: this.sessionId,
        branch_index: value,
        node_type: this.activeNode.type,
        node_type_input_selection: this.nodeType ? this.nodeType.name : "",
        pane: this.paneType
      });
    },
    showTooMuchData() {
      this.showData = true;
      this.$telemetry.track("User clicked ndv button", {
        node_type: this.activeNode.type,
        workflow_id: this.workflowsStore.workflowId,
        session_id: this.sessionId,
        pane: this.paneType,
        type: "showTooMuchData"
      });
    },
    toggleLinkRuns() {
      this.linkedRuns ? this.unlinkRun() : this.linkRun();
    },
    linkRun() {
      this.$emit("linkRun");
    },
    unlinkRun() {
      this.$emit("unlinkRun");
    },
    onCurrentPageChange(value) {
      var _a;
      this.currentPage = value;
      this.$telemetry.track("User changed ndv page", {
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        workflow_id: this.workflowsStore.workflowId,
        session_id: this.sessionId,
        pane: this.paneType,
        page_selected: this.currentPage,
        page_size: this.pageSize,
        items_total: this.dataCount
      });
    },
    onPageSizeChange(pageSize) {
      var _a;
      this.pageSize = pageSize;
      const maxPage = Math.ceil(this.dataCount / this.pageSize);
      if (maxPage < this.currentPage) {
        this.currentPage = maxPage;
      }
      this.$telemetry.track("User changed ndv page size", {
        node_type: (_a = this.activeNode) == null ? void 0 : _a.type,
        workflow_id: this.workflowsStore.workflowId,
        session_id: this.sessionId,
        pane: this.paneType,
        page_selected: this.currentPage,
        page_size: this.pageSize,
        items_total: this.dataCount
      });
    },
    onDisplayModeChange(displayMode) {
      const previous = this.displayMode;
      this.ndvStore.setPanelDisplayMode({ pane: this.paneType, mode: displayMode });
      const dataContainerRef = this.$refs.dataContainer;
      if (dataContainerRef) {
        const dataDisplay2 = dataContainerRef.children[0];
        if (dataDisplay2) {
          dataDisplay2.scrollTo(0, 0);
        }
      }
      this.closeBinaryDataDisplay();
      void this.$externalHooks().run("runData.displayModeChanged", {
        newValue: displayMode,
        oldValue: previous
      });
      if (this.activeNode) {
        this.$telemetry.track("User changed ndv item view", {
          previous_view: previous,
          new_view: displayMode,
          node_type: this.activeNode.type,
          workflow_id: this.workflowsStore.workflowId,
          session_id: this.sessionId,
          pane: this.paneType
        });
      }
    },
    getRunLabel(option) {
      let itemsCount2 = 0;
      for (let i = 0; i <= this.maxOutputIndex; i++) {
        itemsCount2 += this.getDataCount(option - 1, i);
      }
      const items = this.$locale.baseText("ndv.output.items", { adjustToNumber: itemsCount2 });
      const itemsLabel = itemsCount2 > 0 ? ` (${itemsCount2} ${items})` : "";
      return option + this.$locale.baseText("ndv.output.of") + (this.maxRunIndex + 1) + itemsLabel;
    },
    getRawInputData(runIndex, outputIndex, connectionType = NodeConnectionType.Main) {
      let inputData = [];
      if (this.node) {
        inputData = this.getNodeInputData(
          this.node,
          runIndex,
          outputIndex,
          this.paneType,
          connectionType
        );
      }
      if (inputData.length === 0 || !Array.isArray(inputData)) {
        return [];
      }
      return inputData;
    },
    getPinDataOrLiveData(inputData) {
      if (this.pinData && !this.isProductionExecutionPreview) {
        return Array.isArray(this.pinData) ? this.pinData.map((value) => ({
          json: value
        })) : [
          {
            json: this.pinData
          }
        ];
      }
      return inputData;
    },
    getDataCount(runIndex, outputIndex, connectionType = NodeConnectionType.Main) {
      var _a;
      if (!this.node) {
        return 0;
      }
      if ((_a = this.workflowRunData) == null ? void 0 : _a[this.node.name][runIndex].hasOwnProperty("error")) {
        return 1;
      }
      const rawInputData = this.getRawInputData(runIndex, outputIndex, connectionType);
      return this.getPinDataOrLiveData(rawInputData).length;
    },
    init() {
      this.outputIndex = 0;
      this.refreshDataSize();
      this.closeBinaryDataDisplay();
      let outputTypes = [];
      if (this.nodeType !== null && this.node !== null) {
        const outputs = this.getResolvedNodeOutputs();
        outputTypes = getConnectionTypes(outputs);
      }
      this.connectionType = outputTypes.length === 0 ? NodeConnectionType.Main : outputTypes[0];
      if (this.binaryData.length > 0) {
        this.ndvStore.setPanelDisplayMode({
          pane: this.paneType,
          mode: "binary"
        });
      } else if (this.displayMode === "binary") {
        this.ndvStore.setPanelDisplayMode({
          pane: this.paneType,
          mode: "table"
        });
      }
    },
    closeBinaryDataDisplay() {
      this.binaryDataDisplayVisible = false;
      this.binaryDataDisplayData = null;
    },
    clearExecutionData() {
      this.workflowsStore.setWorkflowExecutionData(null);
      this.updateNodesExecutionIssues();
    },
    isViewable(index, key) {
      const { fileType } = this.binaryData[index][key];
      return !!fileType && ["image", "audio", "video", "text", "json", "pdf", "html"].includes(fileType);
    },
    isDownloadable(index, key) {
      const { mimeType, fileName } = this.binaryData[index][key];
      return !!(mimeType && fileName);
    },
    async downloadBinaryData(index, key) {
      const { id, data, fileName, fileExtension, mimeType } = this.binaryData[index][key];
      if (id) {
        const url = this.workflowsStore.getBinaryUrl(id, "download", fileName, mimeType);
        FileSaver_minExports.saveAs(url, [fileName, fileExtension].join("."));
        return;
      } else {
        const bufferString = "data:" + mimeType + ";base64," + data;
        const blob = await fetch(bufferString).then(async (d) => d.blob());
        FileSaver_minExports.saveAs(blob, fileName);
      }
    },
    async downloadJsonData() {
      const fileName = this.node.name.replace(/[^\w\d]/g, "_");
      const blob = new Blob([JSON.stringify(this.rawInputData, null, 2)], {
        type: "application/json"
      });
      FileSaver_minExports.saveAs(blob, `${fileName}.json`);
    },
    displayBinaryData(index, key) {
      this.binaryDataDisplayVisible = true;
      this.binaryDataDisplayData = {
        node: this.node.name,
        runIndex: this.runIndex,
        outputIndex: this.currentOutputIndex,
        index,
        key
      };
    },
    getOutputName(outputIndex) {
      if (this.node === null) {
        return outputIndex + 1;
      }
      const nodeType = this.nodeType;
      const outputs = this.getResolvedNodeOutputs();
      const outputConfiguration = outputs == null ? void 0 : outputs[outputIndex];
      if (outputConfiguration && isObject(outputConfiguration)) {
        return outputConfiguration == null ? void 0 : outputConfiguration.displayName;
      }
      if (!(nodeType == null ? void 0 : nodeType.outputNames) || nodeType.outputNames.length <= outputIndex) {
        return outputIndex + 1;
      }
      return nodeType.outputNames[outputIndex];
    },
    refreshDataSize() {
      this.showData = false;
      const jsonItems = this.inputDataPage.map((item) => item.json);
      this.dataSize = JSON.stringify(jsonItems).length;
      if (this.dataSize < this.MAX_DISPLAY_DATA_SIZE) {
        this.showData = true;
      }
    },
    onRunIndexChange(run) {
      this.$emit("runChange", run);
    },
    enableNode() {
      if (this.node) {
        const updateInformation = {
          name: this.node.name,
          properties: {
            disabled: !this.node.disabled
          }
        };
        this.workflowsStore.updateNodeProperties(updateInformation);
      }
    },
    setDisplayMode() {
      if (!this.activeNode)
        return;
      const shouldDisplayHtml = this.activeNode.type === HTML_NODE_TYPE && this.activeNode.parameters.operation === "generateHtmlTemplate";
      if (shouldDisplayHtml) {
        this.ndvStore.setPanelDisplayMode({
          pane: "output",
          mode: "html"
        });
      }
    }
  },
  watch: {
    node() {
      this.init();
    },
    hasNodeRun() {
      if (this.paneType === "output")
        this.setDisplayMode();
    },
    inputDataPage: {
      handler(data) {
        if (this.paneType && data) {
          this.ndvStore.setNDVPanelDataIsEmpty({
            panel: this.paneType,
            isEmpty: data.every((item) => isEmpty(item.json))
          });
        }
      },
      immediate: true,
      deep: true
    },
    jsonData(value) {
      this.refreshDataSize();
      this.showPinDataDiscoveryTooltip(value);
    },
    binaryData(newData, prevData) {
      if (newData.length && !prevData.length && this.displayMode !== "binary") {
        this.switchToBinary();
      } else if (!newData.length && this.displayMode === "binary") {
        this.onDisplayModeChange("table");
      }
    },
    currentOutputIndex(branchIndex) {
      this.ndvStore.setNDVBranchIndex({
        pane: this.paneType,
        branchIndex
      });
    }
  }
});
const infoIcon = "_infoIcon_1b6jv_5";
const center = "_center_1b6jv_9";
const container$1 = "_container_1b6jv_23";
const pinnedDataCallout = "_pinnedDataCallout_1b6jv_32";
const header$1 = "_header_1b6jv_40";
const dataContainer = "_dataContainer_1b6jv_54";
const dataDisplay = "_dataDisplay_1b6jv_63";
const tabs = "_tabs_1b6jv_75";
const itemsCount = "_itemsCount_1b6jv_79";
const runSelector = "_runSelector_1b6jv_84";
const pagination = "_pagination_1b6jv_95";
const pageSizeSelector = "_pageSizeSelector_1b6jv_105";
const binaryIndex = "_binaryIndex_1b6jv_111";
const binaryRow = "_binaryRow_1b6jv_128";
const binaryCell = "_binaryCell_1b6jv_133";
const binaryHeader = "_binaryHeader_1b6jv_145";
const binaryButtonContainer = "_binaryButtonContainer_1b6jv_154";
const binaryValue = "_binaryValue_1b6jv_165";
const displayModes = "_displayModes_1b6jv_170";
const tooltipContain = "_tooltipContain_1b6jv_176";
const pinDataButton = "_pinDataButton_1b6jv_180";
const spinner = "_spinner_1b6jv_184";
const editMode = "_editMode_1b6jv_195";
const editModeBody = "_editModeBody_1b6jv_204";
const editModeFooter = "_editModeFooter_1b6jv_211";
const editModeFooterInfotip = "_editModeFooterInfotip_1b6jv_221";
const editModeActions = "_editModeActions_1b6jv_227";
const stretchVertically = "_stretchVertically_1b6jv_234";
const uiBlocker = "_uiBlocker_1b6jv_238";
const style0$4 = {
  infoIcon,
  center,
  container: container$1,
  pinnedDataCallout,
  header: header$1,
  dataContainer,
  "actions-group": "_actions-group_1b6jv_59",
  dataDisplay,
  tabs,
  itemsCount,
  runSelector,
  pagination,
  pageSizeSelector,
  binaryIndex,
  binaryRow,
  binaryCell,
  binaryHeader,
  binaryButtonContainer,
  binaryValue,
  displayModes,
  tooltipContain,
  pinDataButton,
  spinner,
  editMode,
  editModeBody,
  editModeFooter,
  editModeFooterInfotip,
  editModeActions,
  stretchVertically,
  uiBlocker
};
const RunData_vue_vue_type_style_index_1_scoped_6bf4fa46_lang = "";
const _withScopeId$5 = (n) => (pushScopeId("data-v-6bf4fa46"), n = n(), popScopeId(), n);
const _hoisted_1$9 = {
  key: 0,
  class: "ml-4xs"
};
const _hoisted_2$7 = ["innerHTML"];
const _hoisted_3$4 = ["data-test-id"];
const _hoisted_4$3 = { key: 0 };
const _hoisted_5$4 = { key: 1 };
const _hoisted_6$3 = { key: 2 };
const _hoisted_7$2 = { key: 3 };
const _hoisted_8$2 = { key: 4 };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_callout = resolveComponent("n8n-callout");
  const _component_BinaryDataDisplay = resolveComponent("BinaryDataDisplay");
  const _component_n8n_radio_buttons = resolveComponent("n8n-radio-buttons");
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  const _component_n8n_tabs = resolveComponent("n8n-tabs");
  const _component_n8n_spinner = resolveComponent("n8n-spinner");
  const _component_code_node_editor = resolveComponent("code-node-editor");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_NodeErrorView = resolveComponent("NodeErrorView");
  const _component_run_data_table = resolveComponent("run-data-table");
  const _component_run_data_json = resolveComponent("run-data-json");
  const _component_run_data_html = resolveComponent("run-data-html");
  const _component_run_data_schema = resolveComponent("run-data-schema");
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_n8n_block_ui = resolveComponent("n8n-block-ui");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["run-data", _ctx.$style.container])
  }, [
    _ctx.canPinData && _ctx.hasPinData && !_ctx.editMode.enabled && !_ctx.isProductionExecutionPreview ? (openBlock(), createBlock(_component_n8n_callout, {
      key: 0,
      theme: "secondary",
      icon: "thumbtack",
      class: normalizeClass(_ctx.$style.pinnedDataCallout)
    }, {
      trailingContent: withCtx(() => [
        createVNode(_component_n8n_link, {
          to: _ctx.dataPinningDocsUrl,
          size: "small",
          theme: "secondary",
          bold: "",
          underline: "",
          onClick: _ctx.onClickDataPinningDocsLink
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.pindata.learnMore")), 1)
          ]),
          _: 1
        }, 8, ["to", "onClick"])
      ]),
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.pindata.thisDataIsPinned")) + " ", 1),
        !_ctx.isReadOnlyRoute && !_ctx.readOnlyEnv ? (openBlock(), createElementBlock("span", _hoisted_1$9, [
          createVNode(_component_n8n_link, {
            theme: "secondary",
            size: "small",
            underline: "",
            bold: "",
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.onTogglePinData({ source: "banner-link" }), ["stop"]))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.pindata.unpin")), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["class"])) : createCommentVNode("", true),
    createVNode(_component_BinaryDataDisplay, {
      windowVisible: _ctx.binaryDataDisplayVisible,
      displayData: _ctx.binaryDataDisplayData,
      onClose: _ctx.closeBinaryDataDisplay
    }, null, 8, ["windowVisible", "displayData", "onClose"]),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      renderSlot(_ctx.$slots, "header", {}, void 0, true),
      withDirectives(createBaseVNode("div", {
        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["stop"])),
        class: normalizeClass(_ctx.$style.displayModes),
        "data-test-id": "run-data-pane-header"
      }, [
        withDirectives(createVNode(_component_n8n_radio_buttons, {
          modelValue: _ctx.displayMode,
          options: _ctx.buttons,
          "data-test-id": "ndv-run-data-display-mode",
          "onUpdate:modelValue": _ctx.onDisplayModeChange
        }, null, 8, ["modelValue", "options", "onUpdate:modelValue"]), [
          [
            vShow,
            _ctx.hasNodeRun && (_ctx.jsonData && _ctx.jsonData.length > 0 || _ctx.binaryData && _ctx.binaryData.length > 0) && !_ctx.editMode.enabled
          ]
        ]),
        _ctx.canPinData && !_ctx.isReadOnlyRoute && !_ctx.readOnlyEnv ? withDirectives((openBlock(), createBlock(_component_n8n_icon_button, {
          key: 0,
          title: _ctx.$locale.baseText("runData.editOutput"),
          circle: false,
          disabled: _ctx.node.disabled,
          class: "ml-2xs",
          icon: "pencil-alt",
          type: "tertiary",
          "data-test-id": "ndv-edit-pinned-data",
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.enterEditMode({ origin: "editIconButton" }))
        }, null, 8, ["title", "disabled"])), [
          [vShow, !_ctx.editMode.enabled]
        ]) : createCommentVNode("", true),
        _ctx.canPinData && _ctx.jsonData && _ctx.jsonData.length > 0 ? withDirectives((openBlock(), createBlock(_component_n8n_tooltip, {
          key: 1,
          placement: "bottom-end",
          visible: _ctx.isControlledPinDataTooltip ? _ctx.isControlledPinDataTooltip && _ctx.pinDataDiscoveryTooltipVisible : void 0
        }, createSlots({
          default: withCtx(() => [
            createVNode(_component_n8n_icon_button, {
              class: normalizeClass(["ml-2xs", _ctx.$style.pinDataButton]),
              type: "tertiary",
              active: _ctx.hasPinData,
              icon: "thumbtack",
              disabled: _ctx.editMode.enabled || _ctx.rawInputData.length === 0 && !_ctx.hasPinData || _ctx.isReadOnlyRoute || _ctx.readOnlyEnv,
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onTogglePinData({ source: "pin-icon-click" })),
              "data-test-id": "ndv-pin-data"
            }, null, 8, ["class", "active", "disabled"])
          ]),
          _: 2
        }, [
          !_ctx.isControlledPinDataTooltip ? {
            name: "content",
            fn: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.tooltipContainer)
              }, [
                createBaseVNode("strong", null, toDisplayString(_ctx.$locale.baseText("ndv.pinData.pin.title")), 1),
                createVNode(_component_n8n_text, {
                  size: "small",
                  tag: "p"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.pinData.pin.description")) + " ", 1),
                    createVNode(_component_n8n_link, {
                      to: _ctx.dataPinningDocsUrl,
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.pinData.pin.link")), 1)
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ]),
                  _: 1
                })
              ], 2)
            ]),
            key: "0"
          } : {
            name: "content",
            fn: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.tooltipContainer)
              }, toDisplayString(_ctx.$locale.baseText("node.discovery.pinData.ndv")), 3)
            ]),
            key: "1"
          }
        ]), 1032, ["visible"])), [
          [vShow, !_ctx.editMode.enabled]
        ]) : createCommentVNode("", true),
        withDirectives(createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.editModeActions)
        }, [
          createVNode(_component_n8n_button, {
            type: "tertiary",
            label: _ctx.$locale.baseText("runData.editor.cancel"),
            onClick: _ctx.onClickCancelEdit
          }, null, 8, ["label", "onClick"]),
          createVNode(_component_n8n_button, {
            class: "ml-2xs",
            type: "primary",
            label: _ctx.$locale.baseText("runData.editor.save"),
            onClick: _ctx.onClickSaveEdit
          }, null, 8, ["label", "onClick"])
        ], 2), [
          [vShow, _ctx.editMode.enabled]
        ])
      ], 2), [
        [vShow, !_ctx.hasRunError]
      ])
    ], 2),
    _ctx.maxRunIndex > 0 ? withDirectives((openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.$style.runSelector),
      "data-test-id": "run-selector"
    }, [
      createVNode(_component_n8n_select, {
        size: "small",
        modelValue: _ctx.runIndex,
        "onUpdate:modelValue": _ctx.onRunIndexChange,
        onClick: _cache[4] || (_cache[4] = withModifiers(() => {
        }, ["stop"])),
        teleported: ""
      }, {
        prepend: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.run")), 1)
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.maxRunIndex + 1, (option) => {
            return openBlock(), createBlock(_component_n8n_option, {
              label: _ctx.getRunLabel(option),
              value: option - 1,
              key: option
            }, null, 8, ["label", "value"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "onUpdate:modelValue"]),
      _ctx.canLinkRuns ? (openBlock(), createBlock(_component_n8n_tooltip, {
        key: 0,
        placement: "right"
      }, {
        content: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText(_ctx.linkedRuns ? "runData.unlinking.hint" : "runData.linking.hint")), 1)
        ]),
        default: withCtx(() => [
          createVNode(_component_n8n_icon_button, {
            class: "linkRun",
            icon: _ctx.linkedRuns ? "unlink" : "link",
            text: "",
            type: "tertiary",
            size: "small",
            onClick: _ctx.toggleLinkRuns
          }, null, 8, ["icon", "onClick"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "run-info", {}, void 0, true)
    ], 2)), [
      [vShow, !_ctx.editMode.enabled]
    ]) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "before-data", {}, void 0, true),
    _ctx.maxOutputIndex > 0 && _ctx.branches.length > 1 ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: normalizeClass(_ctx.$style.tabs),
      "data-test-id": "branches"
    }, [
      createVNode(_component_n8n_tabs, {
        modelValue: _ctx.currentOutputIndex,
        options: _ctx.branches,
        "onUpdate:modelValue": _ctx.onBranchChange
      }, null, 8, ["modelValue", "options", "onUpdate:modelValue"])
    ], 2)) : _ctx.hasNodeRun && _ctx.dataCount > 0 && _ctx.maxRunIndex === 0 && !_ctx.isArtificialRecoveredEventItem ? withDirectives((openBlock(), createElementBlock("div", {
      key: 3,
      class: normalizeClass(_ctx.$style.itemsCount)
    }, [
      createVNode(_component_n8n_text, null, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.dataCount) + " " + toDisplayString(_ctx.$locale.baseText("ndv.output.items", { adjustToNumber: _ctx.dataCount })), 1)
        ]),
        _: 1
      })
    ], 2)), [
      [vShow, !_ctx.editMode.enabled]
    ]) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.dataContainer),
      ref: "dataContainer",
      "data-test-id": "ndv-data-container"
    }, [
      _ctx.isExecuting ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.center),
        "data-test-id": "ndv-executing"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.spinner)
        }, [
          createVNode(_component_n8n_spinner, { type: "ring" })
        ], 2),
        createVNode(_component_n8n_text, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.executingMessage), 1)
          ]),
          _: 1
        })
      ], 2)) : _ctx.editMode.enabled ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.editMode)
      }, [
        createBaseVNode("div", {
          class: normalizeClass([_ctx.$style.editModeBody, "ignore-key-press"])
        }, [
          createVNode(_component_code_node_editor, {
            modelValue: _ctx.editMode.value,
            language: "json",
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.ndvStore.setOutputPanelEditModeValue($event))
          }, null, 8, ["modelValue"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.editModeFooter)
        }, [
          createVNode(_component_n8n_info_tip, {
            bold: false,
            class: normalizeClass(_ctx.$style.editModeFooterInfotip)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.editor.copyDataInfo")) + " ", 1),
              createVNode(_component_n8n_link, {
                to: _ctx.dataEditingDocsUrl,
                size: "small"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("generic.learnMore")), 1)
                ]),
                _: 1
              }, 8, ["to"])
            ]),
            _: 1
          }, 8, ["class"])
        ], 2)
      ], 2)) : _ctx.paneType === "output" && _ctx.hasSubworkflowExecutionError ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(_ctx.$style.stretchVertically)
      }, [
        createVNode(_component_NodeErrorView, {
          error: _ctx.subworkflowExecutionError,
          class: normalizeClass(_ctx.$style.errorDisplay)
        }, null, 8, ["error", "class"])
      ], 2)) : !_ctx.hasNodeRun ? (openBlock(), createElementBlock("div", {
        key: 3,
        class: normalizeClass(_ctx.$style.center)
      }, [
        renderSlot(_ctx.$slots, "node-not-run", {}, void 0, true)
      ], 2)) : _ctx.paneType === "input" && _ctx.node.disabled ? (openBlock(), createElementBlock("div", {
        key: 4,
        class: normalizeClass(_ctx.$style.center)
      }, [
        createVNode(_component_n8n_text, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.disabled", { interpolate: { nodeName: _ctx.node.name } })) + " ", 1),
            createVNode(_component_n8n_link, { onClick: _ctx.enableNode }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.disabled.cta")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        })
      ], 2)) : _ctx.hasNodeRun && _ctx.isArtificialRecoveredEventItem ? (openBlock(), createElementBlock("div", {
        key: 5,
        class: normalizeClass(_ctx.$style.center)
      }, [
        renderSlot(_ctx.$slots, "recovered-artificial-output-data", {}, void 0, true)
      ], 2)) : _ctx.hasNodeRun && _ctx.hasRunError ? (openBlock(), createElementBlock("div", {
        key: 6,
        class: normalizeClass(_ctx.$style.stretchVertically)
      }, [
        _ctx.isPaneTypeInput ? (openBlock(), createBlock(_component_n8n_text, {
          key: 0,
          class: normalizeClass(_ctx.$style.center),
          size: "large",
          tag: "p",
          bold: ""
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeErrorView.inputPanel.previousNodeError.title", {
              interpolate: { nodeName: _ctx.node.name }
            })), 1)
          ]),
          _: 1
        }, 8, ["class"])) : _ctx.$slots["content"] ? renderSlot(_ctx.$slots, "content", { key: 1 }, void 0, true) : (openBlock(), createBlock(_component_NodeErrorView, {
          key: 2,
          error: _ctx.workflowRunData[_ctx.node.name][_ctx.runIndex].error,
          class: normalizeClass(_ctx.$style.dataDisplay)
        }, null, 8, ["error", "class"]))
      ], 2)) : _ctx.hasNodeRun && _ctx.jsonData && _ctx.jsonData.length === 0 && _ctx.branches.length > 1 ? (openBlock(), createElementBlock("div", {
        key: 7,
        class: normalizeClass(_ctx.$style.center)
      }, [
        createVNode(_component_n8n_text, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.noDataInBranchMessage), 1)
          ]),
          _: 1
        })
      ], 2)) : _ctx.hasNodeRun && _ctx.jsonData && _ctx.jsonData.length === 0 ? (openBlock(), createElementBlock("div", {
        key: 8,
        class: normalizeClass(_ctx.$style.center)
      }, [
        renderSlot(_ctx.$slots, "no-output-data", {}, () => [
          createTextVNode("xxx")
        ], true)
      ], 2)) : _ctx.hasNodeRun && !_ctx.showData ? (openBlock(), createElementBlock("div", {
        key: 9,
        class: normalizeClass(_ctx.$style.center)
      }, [
        createVNode(_component_n8n_text, {
          bold: true,
          color: "text-dark",
          size: "large"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.tooMuchDataTitle), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_text, {
          align: "center",
          tag: "div"
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText("ndv.output.tooMuchData.message", {
                interpolate: { size: _ctx.dataSizeInMB }
              })
            }, null, 8, _hoisted_2$7)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_button, {
          outline: "",
          label: _ctx.$locale.baseText("ndv.output.tooMuchData.showDataAnyway"),
          onClick: _ctx.showTooMuchData
        }, null, 8, ["label", "onClick"]),
        createVNode(_component_n8n_button, {
          size: "small",
          label: _ctx.$locale.baseText("runData.downloadBinaryData"),
          onClick: _cache[6] || (_cache[6] = ($event) => _ctx.downloadJsonData())
        }, null, 8, ["label"])
      ], 2)) : _ctx.hasNodeRun && _ctx.$slots["content"] ? renderSlot(_ctx.$slots, "content", { key: 10 }, void 0, true) : _ctx.hasNodeRun && _ctx.displayMode === "table" && _ctx.binaryData.length > 0 && _ctx.jsonData.length === 1 && Object.keys(_ctx.jsonData[0] || {}).length === 0 ? (openBlock(), createElementBlock("div", {
        key: 11,
        class: normalizeClass(_ctx.$style.center)
      }, [
        createVNode(_component_n8n_text, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.switchToBinary.info")) + " ", 1),
            createBaseVNode("a", {
              onClick: _cache[7] || (_cache[7] = (...args) => _ctx.switchToBinary && _ctx.switchToBinary(...args))
            }, toDisplayString(_ctx.$locale.baseText("runData.switchToBinary.binary")), 1)
          ]),
          _: 1
        })
      ], 2)) : _ctx.hasNodeRun && _ctx.displayMode === "table" ? (openBlock(), createBlock(Suspense, { key: 12 }, {
        default: withCtx(() => [
          createVNode(_component_run_data_table, {
            node: _ctx.node,
            inputData: _ctx.inputDataPage,
            mappingEnabled: _ctx.mappingEnabled,
            distanceFromActive: _ctx.distanceFromActive,
            runIndex: _ctx.runIndex,
            pageOffset: _ctx.currentPageOffset,
            totalRuns: _ctx.maxRunIndex,
            hasDefaultHoverState: _ctx.paneType === "input",
            onMounted: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("tableMounted", $event)),
            onActiveRowChanged: _ctx.onItemHover,
            onDisplayModeChange: _ctx.onDisplayModeChange
          }, null, 8, ["node", "inputData", "mappingEnabled", "distanceFromActive", "runIndex", "pageOffset", "totalRuns", "hasDefaultHoverState", "onActiveRowChanged", "onDisplayModeChange"])
        ]),
        _: 1
      })) : _ctx.hasNodeRun && _ctx.displayMode === "json" ? (openBlock(), createBlock(Suspense, { key: 13 }, {
        default: withCtx(() => [
          createVNode(_component_run_data_json, {
            paneType: _ctx.paneType,
            editMode: _ctx.editMode,
            sessioId: _ctx.sessionId,
            node: _ctx.node,
            inputData: _ctx.inputDataPage,
            mappingEnabled: _ctx.mappingEnabled,
            distanceFromActive: _ctx.distanceFromActive,
            runIndex: _ctx.runIndex,
            totalRuns: _ctx.maxRunIndex
          }, null, 8, ["paneType", "editMode", "sessioId", "node", "inputData", "mappingEnabled", "distanceFromActive", "runIndex", "totalRuns"])
        ]),
        _: 1
      })) : _ctx.hasNodeRun && _ctx.isPaneTypeOutput && _ctx.displayMode === "html" ? (openBlock(), createBlock(Suspense, { key: 14 }, {
        default: withCtx(() => [
          createVNode(_component_run_data_html, {
            inputHtml: _ctx.inputDataPage[0].json.html
          }, null, 8, ["inputHtml"])
        ]),
        _: 1
      })) : _ctx.hasNodeRun && _ctx.isSchemaView ? (openBlock(), createBlock(Suspense, { key: 15 }, {
        default: withCtx(() => [
          createVNode(_component_run_data_schema, {
            data: _ctx.jsonData,
            mappingEnabled: _ctx.mappingEnabled,
            distanceFromActive: _ctx.distanceFromActive,
            node: _ctx.node,
            paneType: _ctx.paneType,
            runIndex: _ctx.runIndex,
            totalRuns: _ctx.maxRunIndex
          }, null, 8, ["data", "mappingEnabled", "distanceFromActive", "node", "paneType", "runIndex", "totalRuns"])
        ]),
        _: 1
      })) : _ctx.displayMode === "binary" && _ctx.binaryData.length === 0 ? (openBlock(), createElementBlock("div", {
        key: 16,
        class: normalizeClass(_ctx.$style.center)
      }, [
        createVNode(_component_n8n_text, {
          align: "center",
          tag: "div"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.noBinaryDataFound")), 1)
          ]),
          _: 1
        })
      ], 2)) : _ctx.displayMode === "binary" ? (openBlock(), createElementBlock("div", {
        key: 17,
        class: normalizeClass(_ctx.$style.dataDisplay)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.binaryData, (binaryDataEntry, index) => {
          return openBlock(), createElementBlock("div", { key: index }, [
            _ctx.binaryData.length > 1 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.binaryIndex)
            }, [
              createBaseVNode("div", null, toDisplayString(index + 1), 1)
            ], 2)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.binaryRow)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(binaryDataEntry, (binaryData, key) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(_ctx.$style.binaryCell),
                  key: index + "_" + key
                }, [
                  createBaseVNode("div", {
                    "data-test-id": "ndv-binary-data_" + index
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(_ctx.$style.binaryHeader)
                    }, toDisplayString(key), 3),
                    binaryData.fileName ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
                      createBaseVNode("div", null, [
                        createVNode(_component_n8n_text, {
                          size: "small",
                          bold: true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.fileName")) + ": ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.$style.binaryValue)
                      }, toDisplayString(binaryData.fileName), 3)
                    ])) : createCommentVNode("", true),
                    binaryData.directory ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
                      createBaseVNode("div", null, [
                        createVNode(_component_n8n_text, {
                          size: "small",
                          bold: true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.directory")) + ": ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.$style.binaryValue)
                      }, toDisplayString(binaryData.directory), 3)
                    ])) : createCommentVNode("", true),
                    binaryData.fileExtension ? (openBlock(), createElementBlock("div", _hoisted_6$3, [
                      createBaseVNode("div", null, [
                        createVNode(_component_n8n_text, {
                          size: "small",
                          bold: true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.fileExtension")) + ":", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.$style.binaryValue)
                      }, toDisplayString(binaryData.fileExtension), 3)
                    ])) : createCommentVNode("", true),
                    binaryData.mimeType ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
                      createBaseVNode("div", null, [
                        createVNode(_component_n8n_text, {
                          size: "small",
                          bold: true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.mimeType")) + ": ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.$style.binaryValue)
                      }, toDisplayString(binaryData.mimeType), 3)
                    ])) : createCommentVNode("", true),
                    binaryData.fileSize ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
                      createBaseVNode("div", null, [
                        createVNode(_component_n8n_text, {
                          size: "small",
                          bold: true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.fileSize")) + ": ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.$style.binaryValue)
                      }, toDisplayString(binaryData.fileSize), 3)
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", {
                      class: normalizeClass(_ctx.$style.binaryButtonContainer)
                    }, [
                      _ctx.isViewable(index, key) ? (openBlock(), createBlock(_component_n8n_button, {
                        key: 0,
                        size: "small",
                        label: _ctx.$locale.baseText("runData.showBinaryData"),
                        "data-test-id": "ndv-view-binary-data",
                        onClick: ($event) => _ctx.displayBinaryData(index, key)
                      }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                      _ctx.isDownloadable(index, key) ? (openBlock(), createBlock(_component_n8n_button, {
                        key: 1,
                        size: "small",
                        type: "secondary",
                        label: _ctx.$locale.baseText("runData.downloadBinaryData"),
                        "data-test-id": "ndv-download-binary-data",
                        onClick: ($event) => _ctx.downloadBinaryData(index, key)
                      }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
                    ], 2)
                  ], 8, _hoisted_3$4)
                ], 2);
              }), 128))
            ], 2)
          ]);
        }), 128))
      ], 2)) : createCommentVNode("", true)
    ], 2),
    _ctx.hasNodeRun && !_ctx.hasRunError && _ctx.binaryData.length === 0 && _ctx.dataCount > _ctx.pageSize && !_ctx.isSchemaView && !_ctx.isArtificialRecoveredEventItem ? withDirectives((openBlock(), createElementBlock("div", {
      key: 4,
      class: normalizeClass(_ctx.$style.pagination)
    }, [
      createVNode(_component_el_pagination, {
        background: "",
        "hide-on-single-page": true,
        "current-page": _ctx.currentPage,
        "pager-count": 5,
        "page-size": _ctx.pageSize,
        layout: "prev, pager, next",
        "onUpdate:currentPage": _ctx.onCurrentPageChange,
        total: _ctx.dataCount
      }, null, 8, ["current-page", "page-size", "onUpdate:currentPage", "total"]),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.pageSizeSelector)
      }, [
        createVNode(_component_n8n_select, {
          size: "mini",
          modelValue: _ctx.pageSize,
          "onUpdate:modelValue": _ctx.onPageSizeChange,
          teleported: ""
        }, {
          prepend: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.pageSize")), 1)
          ]),
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pageSizes, (size) => {
              return openBlock(), createBlock(_component_n8n_option, {
                key: size,
                label: size,
                value: size
              }, null, 8, ["label", "value"]);
            }), 128)),
            createVNode(_component_n8n_option, {
              label: _ctx.$locale.baseText("ndv.output.all"),
              value: _ctx.dataCount
            }, null, 8, ["label", "value"])
          ]),
          _: 1
        }, 8, ["modelValue", "onUpdate:modelValue"])
      ], 2)
    ], 2)), [
      [vShow, !_ctx.editMode.enabled]
    ]) : createCommentVNode("", true),
    createVNode(_component_n8n_block_ui, {
      show: _ctx.blockUI,
      class: normalizeClass(_ctx.$style.uiBlocker)
    }, null, 8, ["show", "class"])
  ], 2);
}
const cssModules$6 = {
  "$style": style0$4
};
const RunData = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__cssModules", cssModules$6], ["__scopeId", "data-v-6bf4fa46"]]);
const _sfc_main$9 = defineComponent({
  props: {
    taskData: {}
    // ITaskData
  },
  computed: {
    runTaskData() {
      return this.taskData;
    },
    runMetadata() {
      if (!this.runTaskData) {
        return null;
      }
      return {
        executionTime: this.runTaskData.executionTime,
        startTime: new Date(this.runTaskData.startTime).toLocaleString()
      };
    }
  }
});
const _hoisted_1$8 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  return _ctx.runMetadata ? (openBlock(), createBlock(_component_n8n_info_tip, {
    key: 0,
    type: "tooltip",
    theme: "info-light",
    tooltipPlacement: "right"
  }, {
    default: withCtx(() => [
      createBaseVNode("div", null, [
        createVNode(_component_n8n_text, {
          bold: true,
          size: "small"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.startTime") + ":"), 1)
          ]),
          _: 1
        }),
        createTextVNode(" " + toDisplayString(_ctx.runMetadata.startTime), 1),
        _hoisted_1$8,
        createVNode(_component_n8n_text, {
          bold: true,
          size: "small"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("runData.executionTime") + ":"), 1)
          ]),
          _: 1
        }),
        createTextVNode(" " + toDisplayString(_ctx.runMetadata.executionTime) + " " + toDisplayString(_ctx.$locale.baseText("runData.ms")), 1)
      ])
    ]),
    _: 1
  })) : createCommentVNode("", true);
}
const RunInfo = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8]]);
const OUTPUT_TYPE = {
  REGULAR: "regular",
  LOGS: "logs"
};
const _sfc_main$8 = defineComponent({
  name: "OutputPanel",
  mixins: [pinData],
  components: { RunData, RunInfo, RunDataAi },
  data() {
    return {
      outputMode: "regular",
      outputTypes: [
        { label: this.$locale.baseText("ndv.output.outType.regular"), value: OUTPUT_TYPE.REGULAR },
        { label: this.$locale.baseText("ndv.output.outType.logs"), value: OUTPUT_TYPE.LOGS }
      ]
    };
  },
  props: {
    runIndex: {
      type: Number,
      required: true
    },
    isReadOnly: {
      type: Boolean
    },
    linkedRuns: {
      type: Boolean
    },
    canLinkRuns: {
      type: Boolean
    },
    sessionId: {
      type: String
    },
    blockUI: {
      type: Boolean,
      default: false
    },
    isProductionExecutionPreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useUIStore, useWorkflowsStore),
    node() {
      return this.ndvStore.activeNode;
    },
    nodeType() {
      if (this.node) {
        return this.nodeTypesStore.getNodeType(this.node.type, this.node.typeVersion);
      }
      return null;
    },
    isTriggerNode() {
      return this.nodeTypesStore.isTriggerNode(this.node.type);
    },
    hasAiMetadata() {
      if (this.node) {
        const resultData = this.workflowsStore.getWorkflowResultDataByNodeName(this.node.name);
        if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
          return false;
        }
        return !!resultData[resultData.length - 1].metadata;
      }
      return false;
    },
    isPollingTypeNode() {
      return !!(this.nodeType && this.nodeType.polling);
    },
    isScheduleTrigger() {
      return !!(this.nodeType && this.nodeType.group.includes("schedule"));
    },
    isNodeRunning() {
      return this.node && this.workflowsStore.isNodeExecuting(this.node.name);
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    workflowExecution() {
      return this.workflowsStore.getWorkflowExecution;
    },
    workflowRunData() {
      var _a;
      if (this.workflowExecution === null) {
        return null;
      }
      const executionData = this.workflowExecution.data;
      if (!((_a = executionData == null ? void 0 : executionData.resultData) == null ? void 0 : _a.runData)) {
        return null;
      }
      return executionData.resultData.runData;
    },
    hasNodeRun() {
      if (this.workflowsStore.subWorkflowExecutionError)
        return true;
      return Boolean(
        this.node && this.workflowRunData && this.workflowRunData.hasOwnProperty(this.node.name)
      );
    },
    runTaskData() {
      if (!this.node || this.workflowExecution === null) {
        return null;
      }
      const runData = this.workflowRunData;
      if (runData === null || !runData.hasOwnProperty(this.node.name)) {
        return null;
      }
      if (runData[this.node.name].length <= this.runIndex) {
        return null;
      }
      return runData[this.node.name][this.runIndex];
    },
    runsCount() {
      if (this.node === null) {
        return 0;
      }
      const runData = this.workflowRunData;
      if (runData === null || !runData.hasOwnProperty(this.node.name)) {
        return 0;
      }
      if (runData[this.node.name].length) {
        return runData[this.node.name].length;
      }
      return 0;
    },
    staleData() {
      if (!this.node) {
        return false;
      }
      const updatedAt = this.workflowsStore.getParametersLastUpdate(this.node.name);
      if (!updatedAt || !this.runTaskData) {
        return false;
      }
      const runAt = this.runTaskData.startTime;
      return updatedAt > runAt;
    },
    outputPanelEditMode() {
      return this.ndvStore.outputPanelEditMode;
    },
    canPinData() {
      return this.isPinDataNodeType && !this.isReadOnly;
    }
  },
  methods: {
    insertTestData() {
      const runDataRef = this.$refs.runData;
      if (runDataRef) {
        runDataRef.enterEditMode({
          origin: "insertTestDataLink"
        });
        this.$telemetry.track("User clicked ndv link", {
          workflow_id: this.workflowsStore.workflowId,
          session_id: this.sessionId,
          node_type: this.node.type,
          pane: "output",
          type: "insert-test-data"
        });
      }
    },
    onLinkRun() {
      this.$emit("linkRun");
    },
    onUnlinkRun() {
      this.$emit("unlinkRun");
    },
    openSettings() {
      this.$emit("openSettings");
      this.$telemetry.track("User clicked ndv link", {
        node_type: this.node.type,
        workflow_id: this.workflowsStore.workflowId,
        session_id: this.sessionId,
        pane: "output",
        type: "settings"
      });
    },
    onRunIndexChange(run) {
      this.$emit("runChange", run);
    },
    onUpdateOutputMode(outputMode) {
      if (outputMode === OUTPUT_TYPE.LOGS) {
        ndvEventBus.emit("setPositionByName", "minLeft");
      } else {
        ndvEventBus.emit("setPositionByName", "initial");
      }
    }
  }
});
const outputTypeSelect = "_outputTypeSelect_1rlob_10";
const titleSection$1 = "_titleSection_1rlob_15";
const title$1 = "_title_1rlob_15";
const noOutputData$1 = "_noOutputData_1rlob_30";
const recoveredOutputData$1 = "_recoveredOutputData_1rlob_40";
const style0$3 = {
  outputTypeSelect,
  titleSection: titleSection$1,
  title: title$1,
  noOutputData: noOutputData$1,
  recoveredOutputData: recoveredOutputData$1
};
const _hoisted_1$7 = ["innerHTML"];
const _hoisted_2$6 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_radio_buttons = resolveComponent("n8n-radio-buttons");
  const _component_RunInfo = resolveComponent("RunInfo");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_run_data_ai = resolveComponent("run-data-ai");
  const _component_RunData = resolveComponent("RunData");
  return openBlock(), createBlock(_component_RunData, {
    nodeUi: _ctx.node,
    runIndex: _ctx.runIndex,
    linkedRuns: _ctx.linkedRuns,
    canLinkRuns: _ctx.canLinkRuns,
    tooMuchDataTitle: _ctx.$locale.baseText("ndv.output.tooMuchData.title"),
    noDataInBranchMessage: _ctx.$locale.baseText("ndv.output.noOutputDataInBranch"),
    isExecuting: _ctx.isNodeRunning,
    executingMessage: _ctx.$locale.baseText("ndv.output.executing"),
    sessionId: _ctx.sessionId,
    blockUI: _ctx.blockUI,
    isProductionExecutionPreview: _ctx.isProductionExecutionPreview,
    paneType: "output",
    onRunChange: _ctx.onRunIndexChange,
    onLinkRun: _ctx.onLinkRun,
    onUnlinkRun: _ctx.onUnlinkRun,
    onTableMounted: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("tableMounted", $event)),
    onItemHover: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("itemHover", $event)),
    ref: "runData",
    "data-output-type": _ctx.outputMode
  }, createSlots({
    header: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.titleSection)
      }, [
        _ctx.hasAiMetadata ? (openBlock(), createBlock(_component_n8n_radio_buttons, {
          key: 0,
          options: _ctx.outputTypes,
          modelValue: _ctx.outputMode,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => _ctx.outputMode = $event),
            _ctx.onUpdateOutputMode
          ]
        }, null, 8, ["options", "modelValue", "onUpdate:modelValue"])) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(_ctx.$style.title)
        }, toDisplayString(_ctx.$locale.baseText(_ctx.outputPanelEditMode.enabled ? "ndv.output.edit" : "ndv.output")), 3)),
        !_ctx.hasPinData && _ctx.runsCount === 1 ? withDirectives((openBlock(), createBlock(_component_RunInfo, {
          key: 2,
          taskData: _ctx.runTaskData
        }, null, 8, ["taskData"])), [
          [vShow, !_ctx.outputPanelEditMode.enabled]
        ]) : createCommentVNode("", true),
        _ctx.hasNodeRun && _ctx.staleData ? (openBlock(), createBlock(_component_n8n_info_tip, {
          key: 3,
          theme: "warning",
          type: "tooltip",
          tooltipPlacement: "right"
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: _ctx.$locale.baseText(
                _ctx.hasPinData ? "ndv.output.staleDataWarning.pinData" : "ndv.output.staleDataWarning.regular"
              )
            }, null, 8, _hoisted_1$7)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 2)
    ]),
    "node-not-run": withCtx(() => [
      _ctx.workflowRunning && !_ctx.isTriggerNode ? (openBlock(), createBlock(_component_n8n_text, {
        key: 0,
        "data-test-id": "ndv-output-waiting"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.waitingToRun")), 1)
        ]),
        _: 1
      })) : createCommentVNode("", true),
      !_ctx.workflowRunning ? (openBlock(), createBlock(_component_n8n_text, {
        key: 1,
        "data-test-id": "ndv-output-run-node-hint"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.runNodeHint")) + " ", 1),
          _ctx.canPinData ? (openBlock(), createElementBlock("span", {
            key: 0,
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.insertTestData && _ctx.insertTestData(...args))
          }, [
            _hoisted_2$6,
            createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("generic.or")) + " ", 1),
            createVNode(_component_n8n_text, {
              tag: "a",
              size: "medium",
              color: "primary"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.insertTestData")), 1)
              ]),
              _: 1
            })
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    "no-output-data": withCtx(() => [
      createVNode(_component_n8n_text, {
        bold: true,
        color: "text-dark",
        size: "large"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.noOutputData.title")), 1)
        ]),
        _: 1
      }),
      createVNode(_component_n8n_text, null, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.output.noOutputData.message")) + " ", 1),
          createBaseVNode("a", {
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.openSettings && _ctx.openSettings(...args))
          }, toDisplayString(_ctx.$locale.baseText("ndv.output.noOutputData.message.settings")), 1),
          createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("ndv.output.noOutputData.message.settingsOption")), 1)
        ]),
        _: 1
      })
    ]),
    "recovered-artificial-output-data": withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.recoveredOutputData)
      }, [
        createVNode(_component_n8n_text, {
          tag: "div",
          bold: true,
          color: "text-dark",
          size: "large"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.executionFailed.recoveredNodeTitle")), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_text, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.executionFailed.recoveredNodeMessage")), 1)
          ]),
          _: 1
        })
      ], 2)
    ]),
    _: 2
  }, [
    _ctx.outputMode === "logs" ? {
      name: "content",
      fn: withCtx(() => [
        createVNode(_component_run_data_ai, {
          node: _ctx.node,
          "run-index": _ctx.runIndex
        }, null, 8, ["node", "run-index"])
      ]),
      key: "0"
    } : void 0,
    !_ctx.hasPinData && _ctx.runsCount > 1 ? {
      name: "run-info",
      fn: withCtx(() => [
        createVNode(_component_RunInfo, { taskData: _ctx.runTaskData }, null, 8, ["taskData"])
      ]),
      key: "1"
    } : void 0
  ]), 1032, ["nodeUi", "runIndex", "linkedRuns", "canLinkRuns", "tooMuchDataTitle", "noDataInBranchMessage", "isExecuting", "executingMessage", "sessionId", "blockUI", "isProductionExecutionPreview", "onRunChange", "onLinkRun", "onUnlinkRun", "data-output-type"]);
}
const cssModules$5 = {
  "$style": style0$3
};
const OutputPanel = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__cssModules", cssModules$5]]);
const _sfc_main$7 = {};
const _hoisted_1$6 = {
  width: "112",
  height: "80",
  viewBox: "0 0 112 80",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
};
const _hoisted_2$5 = /* @__PURE__ */ createStaticVNode('<mask id="mask0_489_46042" style="mask-type:alpha;" maskUnits="userSpaceOnUse" x="0" y="0" width="112" height="80"><rect width="112" height="80" fill="url(#paint0_linear_489_46042)"></rect></mask><g mask="url(#mask0_489_46042)"><rect x="-0.5" width="112" height="80" fill="url(#pattern0)" fill-opacity="0.6"></rect></g><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_489_46042" transform="scale(0.00357143 0.005)"></use></pattern><linearGradient id="paint0_linear_489_46042" x1="90.5" y1="40.4494" x2="112.5" y2="40.4494" gradientUnits="userSpaceOnUse"><stop></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><image id="image0_489_46042" width="280" height="200" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAADICAYAAAAzx/4XAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABhdSURBVHgB7d0JcFTVngbw/72d4IYa0Ie4IK2llgpodNwtB9AaxVILF7ZxynkgWupojaRwASXQGEBqEAI8LXfBpZQS9IFabjMFkXFfijCKyqjQqIiKShCUpdP3vvPdpXP7pjtk6dPdSX+/qlPpJX07UfrL/yz3XEOIPJNiswaZkbKBtkiluC0qRB1gCJW86ntmjzYM81YvWIhyhgFTwlCxGJGyBcJKhTQxhUrSpJraKSpcVgjDhTQqEyo5U+6prbVExmV6TnWT6ixbnuxmSZ262xCLVTUIUTsxYEoMKpdM4aKCZV5ZUmIMFMoljsGUkMk1c9RArjE39HBchcuYadVVdUKUYwyYEjEhVhstj8gqdbMi8HA8kpTBqmqJC5EGHOQtEeVlMkXSw6WB4UK6cQymBKB6UYMso4OPWYZMrWG4kGasYEpAmWGHB3Xj0ydVzRUizRgwJcAwjaFpD9gyVYjygAHTxTndo9Bium2WLBWiPGDAdHFlkWT4/KK6uVzrQnnCgOniDNuIBu/blr1aiPKEAdPF2Xba1DQeYfVCecOAISJtGDBEpA0Dhoi0YcAQkTYMGCLShgFDRNowYIhIGwYMEWnDgCEibRgwRKQNA4aItGHAEJE2DBgi0oYBQ0TaMGCISBsGDBFpw4AhIm0YMESkDQOGiLRhwBCRNgwYItKGAUNE2jBgiEgbBgwRacOAISJtGDBEpA0Dhoi0YcAQkTYMGCLShgFDRNowYIhIGwYMEWnDgCEibRgwRKQNA4aItGHAEJE2DBgi0oYBQ0TaMGCISBsGDBFpw4AhIm0YMESkDQOGiLRhwBCRNgwYItKGAUNE2jBgiEgbBgwRacOAISJtGDBEpA0Dhoi0YcAQkTYMGCLShgFDRNowYIhIGwYMEWnDgCEibRgwRKQNA4aItGHAEJE2DBgi0oYBQ0TaMGCISBsGDBFpw4AhIm0YMESkDQOGiLRhwBCRNgwYItKGAUNE2hhCXc7ll19eUVZWNto0zYFGJDLIamys8J+LRMrilpWst217WSKRqFu6dGlciDRhwHQho0aNilqWVavC4/I2vGyhCpqpDBrSISLUJYwcOfJWFS6vq5vHS9tURiKRcf3795c1a9a8JUQ5xAqmk0N3qLy8/O/q5iDpIMMwlu7evXuMqmYahCgHOMjbyalwWSE5CBdA18o7HlFOsIvUiY0YMaJWfWnLeEtr9FbdpQrVXXpDiDqIXaROavjw4aPVlwWiiapmBi9ZsqROiDqAXaTOa4popMZjtIUXlQ4GTCfkVS9R0SvqvQ9RuzFgOqe/Sn7k632oi+IYTCfjTUtvkTxJJBI9OG1N7cUKppMpKyurlDzK9/tR18KA6Xzy+oG3LCsqRO3EgOl8KiSPTNOMClE7MWCISJsyIUcsVlvRGJEVhm3Nq5k8fqEUr3wPuHKAl9qNFYwnFqtqMND9MMwF1TW16yfXzLl1Qqw2KkXGtu245Fe9ELUTAybAaPprHbXFmFsekfXV02oX3BX7r6KZSUkmk3WSR42NjQwYajcGTIBl2aubPWjL6EikfJWqalZU3zN7tBSYtyalTvJAVUt1XANDHcExmDTofmRdezhIdZ8GqaCZYog9d3fSWDYzVhWXwnhScrRFQ0sMw3hSiDqAFUyAZUi8Fd9W8O5TIpFYqr7ERa/44sWLFwpRBzBggiJm28YbCtR9QrfFsqwq0WuqEHUQz0UKwFR1MiIdOc8nns/u01VXXTXXNM1bJcdUeM174YUXxglRBzFgQlQ1goDp+GpZQxYmGxPzZsTu0DYL4534iC0uc9lNq1ddo1OEKAfYRQoYpyoYI1djG6r7ZEbKF+CYogm6Smo8ZjA265YcwHFwPCHKkZKrYPCB31cSUTEjlaYtUSNi9rVtqTTcqiUqOWKLzCtLql5XrCov07zDhg2LqYBo9y53akq6asmSJXOFKIe6ZMDEYvdGG6W80jKNioiYJ6vfUs38qDBxA0T7yYJqNqpq+qSqvH9YceG1xsZGBE1bNorihddIm04ZMMEqJILAMFWI2E5wYCwiKoUTV0E2Zlp1VZ0UEIImmUwOUjeHRiKRSnU76j9nlpU1WI2NdapieUuF0UIupCOdijZgUIXslkhFhq5MVPRWIQ3tOb4KlnrVJboiVrjFdxlNmjo7ZphmqutkW9bUaVPGx4QoDwq6ktfvyhimEVV/W/uiKyNuFVKRVC110SbEoJ2zNGywMZ1sSL2dtLdahlFvGtKgwqEe4aCmqqNqqnp9Ww6Y7/EWos5Ca8Bk6cpExa1CoipEdJVQ6Ko0uCFibbAMM94tIvWSkPieQgAho6aqpbUKNd5C1Bl0OGCaDaiaUpHelSlv+mZbcimuWr1t2RvUoGbcNiSOKkQ91pCDSiIuex7LccZbVLjUhR5vT2bm9r8MUZHYY8CgCqmQnRVZujKpKiTVnclTV0b0QlBFsz2ZZbzFCH0N3w4dIo3Riu/Z0+NERScVMM5Je1nWhiRlb21dGcGHWQWHWLJahVVDa7syOjlVkZn5Nw6Nt4S/yQg0LGJECJ+n2nGqdVPtO9XeUW2lagnZw4+R4bYdeE8GDRW9VMCURcoX2PhA5HhA1WvNujLFNtsSZBjetg12+mfYErtq+uTx86QpQFIvkab/ZOgTnqlajWpniBssQY2qrVJtumornMOK9BQ3jE5XrY9q3VXbodo61d5U7TPVtgeO4QcNQ4aKWipgsNmS+qvdnnNaAl2ZtAHVhmIOkZbYKmCM9HCJJ3bvGjtz2sT/FffDv7e4/+3wTegl7lJtt3f/JHHD5VzVjH333Ve6deuGZfjYHU62b99eZts2gmS+ajHVvlZtjGqjVNsnw4+DkxkfVW2OapuF1Qx1IoExmBY3W1LPFV9XRhcracUjpulUMKq8WP3Lr1uGPzx/Gk6CPFu1gaqdrNrB4lYjP6n2iWr/p9pG1W5X7Z9UM4499li59NJL5ZRTTnFC5ssvv5Tly5fL+++/L7t370alMkO1TaqdYqr36969uxx44IG42Bm2xpStW7fK77//fqAKpPHiVkYIpR+897Wl5WBh6FDBNQWMaSJAFhZgQLXYGNbO5AZzn4gkLWv+199+O23xgr/tpR7/V9VuUK1fhtdcLW43BhXOaart07NnT5kzZ44MGTLECQxABTN06FAZM2aM1NfXI817oyFcEEbnn3++DBgwwAmZbdu2yTvvvCNvvPGGbN68WRVU9s3ijt9sFbdqOki1fcUNEoTfL9I0rhOsbogKJhUw06qrcEZuTs7K7exmzpy49a7qe8feWzPxKXErh39TrVq1ngiLCjWv1qNHD+ybggpDGhoasMtcf/X8ieJ9sC+88EI599xzU+ECuH3MMcfIyJEjETCpxw8++GCpqqqSa665RtCl8g0fPlzuuusuWbRoEaoZHOhKcSumY8Ttgh0pbjWD6ul/xJ39+i3wq7CKoYLinrzpUlPNM9xwwQAtQuM/VeuJILjgggucdvTRRzsVyTfffCPLli2T9957D1VHauD3zDPPdLpFYfvtt5+cdtppTpD8+eefzmP9+vWTgQMHpoULoAq69tpr5e2333a6S8r54obLaaHDXqTaNar9TbUnVPtVguGC8SSDBQ3lHwOmueA0MwZdMRN01D777COnnnqq1NTUON2ZIHRr7rzzTidkfAcddJBEIpHmB1cfdARV37595YsvvnAeQ0X0l7/8JeMPc8IJJ8ghhxwin3/+ObZU6KUe6uUfPxqNyo4dO2TdunXGzp07D1UP/4dq34hbiWJ2Cq8x8J4MGSoEbjjVJLhQLhgwGNB1xkVQuYTDBc444ww5++yz5YADDkg9tv/++zthkgnCChUQIITQ3cLxM8FxjjrqKCkvb1oRjdCZMWOGzJs3zxnnufrqq3ENaTyFMZ1LxR2ANv3fif0kKhRWMOnCC+XQMMDrjJ+EuzC+vfbay+n2YEB2zZo1zmP+1HQme++9t1OV+LdRwQTHasJQ7SBg1MyTc//mm2+W66+/3jk+xoHw3GuvvSabNm3CQfp4zRmLsdWkO+sWKhRWMJkFF9JhdsYZL9m4cWPWF5x++ulOpeGHSksBg0BCFwdQoWTrHvmOOOKIVAWDMBoxYkTq2KhcevXq5by3Zz9xK5iI83uoAEL3yKlibNYylF8MmHTh6sWfoXEGWT/99NPUwGwYxkMwJY1qA10m3M80BgPoEmGGqbKy0hkMRmsJxn4wOIxQwXuEAwlhhuDx74obMs7vkFRjMIwVKhR2kVzBpf7BbhICZr1qW5LJZA/MGK1du9ZZOBeGLs5ll13mTEPj9mGHHeaPizSDQBg8eLAzZoNqpn///tISjPvMmjVLNmzYIIMGDWr2PN4Hx/Eg1RAyTsBgkDdVubCzRHnGgMkcLH4Fg9vbxK1iBm7evNlZhZspYODII4902h7fUH3QES4ImdbA2M+wYcOcGSNUMpkEwsw/uT01yEtUKKXeRco0c4SG2ZgrVLtRtb+KNxGDBXXvvvsuVtZKvmEMBqGUrdsVkgpIO5k0/HMK2FWifCvlCiZT5YJp6RGqjVXtEO++3+Vwzg/CepS6ujpnlW2RMkKNqGBYwTRVLvuLe8byveIurouKGzKYkUktcME09EsvveSvrC16lhAVTqlWMMHqxe9O3CbuuT7OdMzxxx/vnAmNLsknn3wiK1eudNah7Nq1ywmZVatWZRxwLQScsrBz507/LjIFJz2ygqGCK+Uukj8Iiq/YcW6keOFyww03yN133+2sUcHgKaqV5557TqZOnepMU3/77bfO1gvFEjDougWmzxEuu4WoCJRiwGSaLbpANWdxyVlnnSUPPfRQ2gswuDp27Fhn1ezEiROdr63xww8/yPr16+Wcc85ptugOA8aYkcIpAlg3Ex68xZQ0zrg++eSTpU+fPi0O7qKCCXTZEC47hKgIlOoYTDBk8MnFMlhnqewll1yS8QVYeYvl+Y8++qjMnDnTmTZuCVb94gzp8847T6qrq9OeQxg888wzcvHFF8tNN90kL7/8ctrzv/zyi0yYMEGuvPJKufHGG+Wrr75q8b3QbcNrPOgrdY4BIurySrmCQbj660XKvcdSS/gzwXPXXXedtAbGabBXjG3bznYLQVjP8v333zu3f/vtN6fLFYSw2LJli1Mpff3119hms8X3QsD8+uuv/l30lRAwzsw0l2pTIZXav7/wJUX8CuYP8SZc8IHvTBBgCKA//vjDuStuBfO7EBWBUvwDF5xd8cdgUttNrlu3TjqTRCIh8Xg8dVfczaawCTnX1VHBlXIFHewqob/iBAy6NnYnOusYAYOBZA+ql58leOUBNQvGVXdUKFxo58In1Pmrj5W6GP/o8IEDs0aYRtYFa3NwlrcH/SR/TwlWMFRwpV7B+PChxEhrI3bzf/7556WjsGudHzLZtnjoKExPYzr7448/9h/CANL/S9OpR9gvk0FDBVPKARP84KHEeEu89SNPPPFEh09oxJYNfsDoqmAwsPvqq6/6U9T42dHVQ1Cmn9+In4NbNVABlGLAhK/57DcsRomrlvzoo4/kvvvuS21RWawwIP3444/7dzG4i8vMImgwI8YTqKngSi1ggpdd9ZvlNVwxEbvxO4tO8MFdunRpq1ft5hsGonH6gjfrhSTEJWhxWYNguLCLRAVV6l0kS9JD5lVxr87oLFybPXu2rFixQnINXSd/gygERXtCDCdfPvvss/5d9JH+W7Ufpel3SS20S80gsZtEeVaqXaRgwwCJ5X3FwMsDqq3CN+JcICzz/+CDDySXcF6Rv8UlBmrb2hVbvXq1cyVIbxNyTK9jqTACxgo1VjBUUKVawQS7R37I+A19DlwhcR0++NiWAdce+uyzzySXgicvtqWCQWU1efJk5+cS9+fHz/uCuDNIflimmmFGbFYuVCilXMH4H0L/Q9no3cbXD1Wbr9pm7LPyyiuvSG1tbcFX+SKIHnzwQXn99df9hzCw+4i4ewYHQ5KDvFQUSn0Mxg+a4IcTAYM+CwZfZqm2BetYsDYGlcN3333XqoMfeuihqbUwuMJAEK4qgEuXADb0Dp9giX1ounfv7rwWx8HF2QAXV3vssceCXaoHxb3o/W7v5/ZD0g9PB8dfqFBatYN0F5TppMdwQ/g0iLv0/sxEIlGOcEFFc+KJJ2a91KsPwYFrUGNnPGy5cPjhh6eewxoZvB7PY9OqK664wgkVHwIFe9DgciWjRo2Sk046yTkDe/z48c64kKdO3IDBVQ8QLAlJr8KcKmbg4Iv+WQXVoFTA2PZbK+verBOiPCjVHe0QHn6I+GMwqOYS3vP+SZAIl9dU66Vme67fsmVL+YIFC+Tnn3+W6dOnOxdZywZVysiRI51qI3ypEYy/IHjuuOOO8DWNUq+96KKLnMua4Htx//777xesz/HOk8Ks0Qxxt2VISnq4sItERaPUr4sUnk0KngDp38bWB4vFvUb1v2/durUcm36j4sBMznHHHZf14AiOcHgEZbvWNaDK8a9XjbGXxYsXC05j8Dyh2iZp6hZlC5emlbxEBVDKAROsYvzxiuAVHYMnIP+k2jOq7VIVxLXbt2/f++mnn3bOMbrttttkwIABohO23sSWDN5sE6qVl6SpagmHS7ARFVSpn02daU1MIktDyDyl2gMqZLbhPKCnnnpKbr/9dmeLh/ZAcNxyyy3Su3dv6devnzz88MPBKiUF2zFg1zoPRpl/C/1smWaQRNhFogLjpWObPoTBv/jB7pIEvqK7hDUn+LTfotoBb775pnOdJAziBi5Av0c//vijzJ8/Xx544AHn/k8//SRTpkxxFt5hn97gda2xQXjghMmNkh4o4XDh+AsVDW7Zmnm62p+V8S8BEqwWMLD6d9UeVu1nDLouX77cuYxJa2FbTgQTAsZ7b6e7g5BZtGiRfPjhh2lnYKN6CWyCtUOyj70EqxeigmPAuIJdinDQBMPGb9jg5RPVPseLsGQfVUZrYYOoWbNmOVPP4p5cWe8dy8a1r1ER4Zh+qIQueWJK5vEWW9g1oiLDLlKTTFPXRuh5/3vQsO2ds7k2LkPiX4wNMLUcvg4SwgLbW2ItDS7g5p16gLDCiU4LVTtBtR5qILcPVuuiizRkyBBnvQwqG7zWg+s3ZQsXdo2oqDBg0vkBgg+tXymINL9YW3DTcKfL88gjj8iLL77oBAMWygXHUABjK9iKEwHj7aGLY8dVW6baN+IO3PZW7SpVDVXgTO4lS5Y44zp4XWBXvL7e+zJYqOgxYJoLhox4t4NB4y/CA2clNFb34vrVbYBuF1IG+898JE1ncmO7CKzK+xd1zB5r167N1IXtJu51nFi9UNFjwGQWDhlfsILBtDVOisSJRPuGno9I8038cUzMPmHnf8wEYd+ZleKGjR8MOJtyobhbX1aqdqB3LASQf0lY7PD9hzBYqBNgwGQXDBm/e+QP/vrXUkIFgg98T0m/UmQ3aQqi4DQ4ggELXbBvrn/1xeDMD74f4YNFfW94x8WxEt7rMO6zSTKfDsCQoaLDgGlZeLVveJUvQgZBgS5LRJoCxsxwnEzbRPiDyb5gFwxVzEbJvAgwKaxgqBNgwLROOBwQMqb31YcP/Z4CxsrS/IDwqx5T0isgW9L3rOGCOuoUGDB7FuyCBM9bagw8jsf8cMk2/tJSwPiCYzzB2apM+9bwrGkqegyY1guGCzQGHiuTpqom05VagwETDppgQISnws0Mr/cXAPK8Iyp6DJjWC6/2Dd72181ASwETrmQyVR/h7SLCxwhu88kxGCpqDJjWCa/ytaR5WIR3xAu/Pjzj01LA7Cmk2DWiToEB03Z+mJiB28GAEckcMMHbVuhxO/S6TCHlf1+msGLQUFFiwLSeX8X4ty1pHiit2TouU7cmU8BI6Lad5StR0WLAtE0wCMKDs209RkvPtTY8GDJU1Bgw7WNnuW+04TVEXR4DJrcYIkQB3HCKiLRhwBCRNgwYItKGAUNE2jBgiEgbBgwRacOAISJtGDBdnGFI2gWbjIjZV4jyhAHTxdmGHU9/QKJClCcMmC6uLBmpDz1UOS5W2/qLaBN1AAOmi4vFquLiXuDNV7GfaY0WojxgwJQA27KeDN43DXOoEOUBA6YElNnmwtBDg6rvmT1OiDRjwJQAdJNssdOqGDHMKRNitVEh0ogBUyLKkkZMfQlOWVeUR2QFQ4Z0YsCUCGew15CpoYejCJlJNbWDhEiDtmz1SF2ACpOY+p8+pdkThixMNMrUme6sE1FOMGBK0KSaOXMNMW7N8vRSNe20LGkl62fE7qgXog5gwJSorJUMUQ4xYEoYxl7UP4AF6mZUiDRgwJBU31M7Wv1LQDUTFaIcYsBQSmx6bWVjo3W5mOZAww2bqBB1wD8AobUpv0xPqN8AAAAASUVORK5CYII="></image></defs>', 3);
const _hoisted_5$3 = [
  _hoisted_2$5
];
function _sfc_render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_5$3);
}
const WireMeUp = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6]]);
const _sfc_main$6 = defineComponent({
  name: "InputPanel",
  mixins: [workflowHelpers],
  components: { RunData, NodeExecuteButton, WireMeUp },
  props: {
    currentNodeName: {
      type: String
    },
    runIndex: {
      type: Number,
      required: true
    },
    linkedRuns: {
      type: Boolean
    },
    workflow: {},
    canLinkRuns: {
      type: Boolean
    },
    sessionId: {
      type: String
    },
    readOnly: {
      type: Boolean
    },
    isProductionExecutionPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDraggableHintWithDelay: false,
      draggableHintShown: false,
      inputMode: "debugging",
      mappedNode: null,
      inputModes: [
        { value: "mapping", label: this.$locale.baseText("ndv.input.mapping") },
        { value: "debugging", label: this.$locale.baseText("ndv.input.debugging") }
      ]
    };
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useWorkflowsStore),
    focusedMappableInput() {
      return this.ndvStore.focusedMappableInput;
    },
    isUserOnboarded() {
      return this.ndvStore.isMappingOnboarded;
    },
    isMappingMode() {
      return this.isActiveNodeConfig && this.inputMode === "mapping";
    },
    showDraggableHint() {
      const toIgnore = [
        START_NODE_TYPE,
        MANUAL_TRIGGER_NODE_TYPE,
        CRON_NODE_TYPE,
        INTERVAL_NODE_TYPE
      ];
      if (!this.currentNode || toIgnore.includes(this.currentNode.type)) {
        return false;
      }
      return !!this.focusedMappableInput && !this.isUserOnboarded;
    },
    isActiveNodeConfig() {
      var _a, _b;
      let inputs = ((_a = this.activeNodeType) == null ? void 0 : _a.inputs) ?? [];
      let outputs = ((_b = this.activeNodeType) == null ? void 0 : _b.outputs) ?? [];
      if (this.activeNode !== null && this.currentWorkflow !== null) {
        const node = this.currentWorkflow.getNode(this.activeNode.name);
        inputs = getNodeInputs(this.currentWorkflow, node, this.activeNodeType);
        outputs = getNodeOutputs(this.currentWorkflow, node, this.activeNodeType);
      } else {
        if (!Array.isArray(inputs)) {
          inputs = [];
        }
        if (!Array.isArray(outputs)) {
          outputs = [];
        }
      }
      if ((inputs.length === 0 || inputs.find((inputName) => inputName !== NodeConnectionType.Main)) && outputs.find((outputName) => outputName !== NodeConnectionType.Main)) {
        return true;
      }
      return false;
    },
    isMappingEnabled() {
      if (this.readOnly)
        return false;
      if (this.isActiveNodeConfig)
        return this.isMappingMode && this.mappedNode !== null;
      return true;
    },
    isExecutingPrevious() {
      if (!this.workflowRunning) {
        return false;
      }
      const triggeredNode = this.workflowsStore.executedNode;
      const executingNode = this.workflowsStore.executingNode;
      if (this.activeNode && triggeredNode === this.activeNode.name && !this.workflowsStore.isNodeExecuting(this.activeNode.name)) {
        return true;
      }
      if (executingNode.length || triggeredNode) {
        return !!this.parentNodes.find(
          (node) => this.workflowsStore.isNodeExecuting(node.name) || node.name === triggeredNode
        );
      }
      return false;
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    currentWorkflow() {
      return this.workflow;
    },
    activeNode() {
      return this.ndvStore.activeNode;
    },
    rootNode() {
      const workflow = this.currentWorkflow;
      const rootNodes = workflow.getChildNodes(this.activeNode.name, "ALL_NON_MAIN");
      return rootNodes[0];
    },
    rootNodesParents() {
      const workflow = this.currentWorkflow;
      const parentNodes = [...workflow.getParentNodes(this.rootNode, "main")].reverse();
      return parentNodes;
    },
    currentNode() {
      if (this.isActiveNodeConfig) {
        if (this.mappedNode) {
          return this.workflowsStore.getNodeByName(this.mappedNode);
        }
        return this.activeNode;
      }
      return this.workflowsStore.getNodeByName(this.currentNodeName);
    },
    connectedCurrentNodeOutputs() {
      const search = this.parentNodes.find(({ name }) => name === this.currentNodeName);
      if (search) {
        return search.indicies;
      }
      return void 0;
    },
    parentNodes() {
      if (!this.activeNode) {
        return [];
      }
      const nodes = this.workflow.getParentNodesByDepth(
        this.activeNode.name
      );
      return nodes.filter(
        ({ name }, i) => this.activeNode && name !== this.activeNode.name && nodes.findIndex((node) => node.name === name) === i
      );
    },
    currentNodeDepth() {
      const node = this.parentNodes.find(
        (node2) => this.currentNode && node2.name === this.currentNode.name
      );
      return node ? node.depth : -1;
    },
    activeNodeType() {
      if (!this.activeNode)
        return null;
      return this.nodeTypesStore.getNodeType(this.activeNode.type, this.activeNode.typeVersion);
    },
    isMultiInputNode() {
      return this.activeNodeType !== null && this.activeNodeType.inputs.length > 1;
    }
  },
  methods: {
    onInputModeChange(val) {
      this.inputMode = val;
    },
    onMappedNodeSelected(val) {
      this.mappedNode = val;
      this.onRunIndexChange(0);
      this.onUnlinkRun();
    },
    getMultipleNodesText(nodeName) {
      var _a;
      if (!nodeName || !this.isMultiInputNode || !this.activeNode || ((_a = this.activeNodeType) == null ? void 0 : _a.inputNames) === void 0)
        return "";
      const activeNodeConnections = this.currentWorkflow.connectionsByDestinationNode[this.activeNode.name].main || [];
      const connectedInputIndexes = activeNodeConnections.reduce((acc, node, index) => {
        if (node[0] && node[0].node === nodeName)
          return [...acc, index];
        return acc;
      }, []);
      const connectedInputs = connectedInputIndexes.map(
        (inputIndex) => {
          var _a2, _b;
          return (_b = (_a2 = this.activeNodeType) == null ? void 0 : _a2.inputNames) == null ? void 0 : _b[inputIndex];
        }
      );
      if (connectedInputs.length === 0)
        return "";
      return `(${connectedInputs.join(" & ")})`;
    },
    onNodeExecute() {
      this.$emit("execute");
      if (this.activeNode) {
        this.$telemetry.track("User clicked ndv button", {
          node_type: this.activeNode.type,
          workflow_id: this.workflowsStore.workflowId,
          session_id: this.sessionId,
          pane: "input",
          type: "executePrevious"
        });
      }
    },
    onRunIndexChange(run) {
      this.$emit("runChange", run);
    },
    onLinkRun() {
      this.$emit("linkRun");
    },
    onUnlinkRun() {
      this.$emit("unlinkRun");
    },
    onInputNodeChange(value) {
      const index = this.parentNodes.findIndex((node) => node.name === value) + 1;
      this.$emit("changeInputNode", value, index);
    },
    onConnectionHelpClick() {
      if (this.activeNode) {
        this.$telemetry.track("User clicked ndv link", {
          node_type: this.activeNode.type,
          workflow_id: this.workflowsStore.workflowId,
          session_id: this.sessionId,
          pane: "input",
          type: "not-connected-help"
        });
      }
    },
    truncate(nodeName) {
      const truncated = nodeName.substring(0, 30);
      if (truncated.length < nodeName.length) {
        return `${truncated}...`;
      }
      return truncated;
    }
  },
  watch: {
    inputMode: {
      handler(val) {
        this.onRunIndexChange(-1);
        if (val === "mapping") {
          this.onUnlinkRun();
          this.mappedNode = this.rootNodesParents[0];
        }
      },
      immediate: true
    },
    showDraggableHint(curr, prev) {
      if (curr && !prev) {
        setTimeout(() => {
          if (this.draggableHintShown) {
            return;
          }
          this.showDraggableHintWithDelay = this.showDraggableHint;
          if (this.showDraggableHintWithDelay) {
            this.draggableHintShown = true;
            this.$telemetry.track("User viewed data mapping tooltip", {
              type: "unexecuted input pane"
            });
          }
        }, 1e3);
      } else if (!curr) {
        this.showDraggableHintWithDelay = false;
      }
    }
  }
});
const mappedNode = "_mappedNode_13qhk_5";
const titleSection = "_titleSection_13qhk_10";
const inputModeTab = "_inputModeTab_13qhk_19";
const noOutputData = "_noOutputData_13qhk_23";
const recoveredOutputData = "_recoveredOutputData_13qhk_33";
const notConnected = "_notConnected_13qhk_42";
const title = "_title_13qhk_10";
const style0$2 = {
  mappedNode,
  titleSection,
  inputModeTab,
  noOutputData,
  recoveredOutputData,
  notConnected,
  title
};
const InputPanel_vue_vue_type_style_index_1_scoped_ea2166d2_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-ea2166d2"), n = n(), popScopeId(), n);
const _hoisted_1$5 = { key: 0 };
const _hoisted_2$4 = { key: 1 };
const _hoisted_3$3 = ["innerHTML"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  const _component_n8n_radio_buttons = resolveComponent("n8n-radio-buttons");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_NodeExecuteButton = resolveComponent("NodeExecuteButton");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_WireMeUp = resolveComponent("WireMeUp");
  const _component_RunData = resolveComponent("RunData");
  return openBlock(), createBlock(_component_RunData, {
    nodeUi: _ctx.currentNode,
    runIndex: _ctx.runIndex,
    linkedRuns: _ctx.linkedRuns,
    canLinkRuns: !_ctx.mappedNode && _ctx.canLinkRuns,
    tooMuchDataTitle: _ctx.$locale.baseText("ndv.input.tooMuchData.title"),
    noDataInBranchMessage: _ctx.$locale.baseText("ndv.input.noOutputDataInBranch"),
    isExecuting: _ctx.isExecutingPrevious,
    executingMessage: _ctx.$locale.baseText("ndv.input.executingPrevious"),
    sessionId: _ctx.sessionId,
    overrideOutputs: _ctx.connectedCurrentNodeOutputs,
    mappingEnabled: _ctx.isMappingEnabled,
    distanceFromActive: _ctx.currentNodeDepth,
    isProductionExecutionPreview: _ctx.isProductionExecutionPreview,
    paneType: "input",
    onItemHover: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("itemHover", $event)),
    onLinkRun: _ctx.onLinkRun,
    onUnlinkRun: _ctx.onUnlinkRun,
    onRunChange: _ctx.onRunIndexChange,
    onTableMounted: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("tableMounted", $event)),
    "data-test-id": "ndv-input-panel"
  }, createSlots({
    header: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.titleSection)
      }, [
        _ctx.parentNodes.length ? (openBlock(), createBlock(_component_n8n_select, {
          key: 0,
          teleported: "",
          size: "small",
          modelValue: _ctx.currentNodeName,
          "onUpdate:modelValue": _ctx.onInputNodeChange,
          "no-data-text": _ctx.$locale.baseText("ndv.input.noNodesFound"),
          placeholder: _ctx.$locale.baseText("ndv.input.parentNodes"),
          filterable: "",
          "data-test-id": "ndv-input-select"
        }, {
          prepend: withCtx(() => [
            createBaseVNode("span", {
              class: normalizeClass(_ctx.$style.title)
            }, toDisplayString(_ctx.$locale.baseText("ndv.input")), 3)
          ]),
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.parentNodes, (node) => {
              return openBlock(), createBlock(_component_n8n_option, {
                value: node.name,
                key: node.name,
                class: "node-option",
                label: `${_ctx.truncate(node.name)} ${_ctx.getMultipleNodesText(node.name)}`,
                "data-test-id": "ndv-input-option"
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, toDisplayString(_ctx.truncate(node.name)) + " ", 1),
                  _ctx.getMultipleNodesText(node.name) ? (openBlock(), createElementBlock("span", _hoisted_1$5, toDisplayString(_ctx.getMultipleNodesText(node.name)), 1)) : (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(_ctx.$locale.baseText("ndv.input.nodeDistance", { adjustToNumber: node.depth })), 1))
                ]),
                _: 2
              }, 1032, ["value", "label"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["modelValue", "onUpdate:modelValue", "no-data-text", "placeholder"])) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(_ctx.$style.title)
        }, toDisplayString(_ctx.$locale.baseText("ndv.input")), 3)),
        _ctx.isActiveNodeConfig && !_ctx.readOnly ? (openBlock(), createBlock(_component_n8n_radio_buttons, {
          key: 2,
          options: _ctx.inputModes,
          modelValue: _ctx.inputMode,
          "onUpdate:modelValue": _ctx.onInputModeChange
        }, null, 8, ["options", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
      ], 2)
    ]),
    "node-not-run": withCtx(() => [
      _ctx.isActiveNodeConfig && _ctx.rootNode || _ctx.parentNodes.length ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.noOutputData)
      }, [
        createVNode(_component_n8n_text, {
          tag: "div",
          bold: true,
          color: "text-dark",
          size: "large"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.noOutputData.title")), 1)
          ]),
          _: 1
        }),
        !_ctx.readOnly ? (openBlock(), createBlock(_component_n8n_tooltip, {
          key: 0,
          visible: _ctx.showDraggableHint && _ctx.showDraggableHintWithDelay
        }, {
          content: withCtx(() => [
            createBaseVNode("div", {
              innerHTML: _ctx.$locale.baseText("dataMapping.dragFromPreviousHint", {
                interpolate: { name: _ctx.focusedMappableInput }
              })
            }, null, 8, _hoisted_3$3)
          ]),
          default: withCtx(() => [
            createVNode(_component_NodeExecuteButton, {
              type: "secondary",
              transparent: true,
              nodeName: _ctx.isActiveNodeConfig ? _ctx.rootNode : _ctx.currentNodeName,
              label: _ctx.$locale.baseText("ndv.input.noOutputData.executePrevious"),
              onExecute: _ctx.onNodeExecute,
              telemetrySource: "inputs",
              "data-test-id": "execute-previous-node"
            }, null, 8, ["nodeName", "label", "onExecute"])
          ]),
          _: 1
        }, 8, ["visible"])) : createCommentVNode("", true),
        !_ctx.readOnly ? (openBlock(), createBlock(_component_n8n_text, {
          key: 1,
          tag: "div",
          size: "small"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.noOutputData.hint")), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.notConnected)
      }, [
        createBaseVNode("div", null, [
          createVNode(_component_WireMeUp)
        ]),
        createVNode(_component_n8n_text, {
          tag: "div",
          bold: true,
          color: "text-dark",
          size: "large"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.notConnected.title")), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_text, { tag: "div" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.notConnected.message")) + " ", 1),
            createBaseVNode("a", {
              href: "https://docs.n8n.io/workflows/connections/",
              target: "_blank",
              onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConnectionHelpClick && _ctx.onConnectionHelpClick(...args))
            }, toDisplayString(_ctx.$locale.baseText("ndv.input.notConnected.learnMore")), 1)
          ]),
          _: 1
        })
      ], 2))
    ]),
    "no-output-data": withCtx(() => [
      createVNode(_component_n8n_text, {
        tag: "div",
        bold: true,
        color: "text-dark",
        size: "large"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.noOutputData")), 1)
        ]),
        _: 1
      })
    ]),
    "recovered-artificial-output-data": withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.recoveredOutputData)
      }, [
        createVNode(_component_n8n_text, {
          tag: "div",
          bold: true,
          color: "text-dark",
          size: "large"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.executionFailed.recoveredNodeTitle")), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_text, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.executionFailed.recoveredNodeMessage")), 1)
          ]),
          _: 1
        })
      ], 2)
    ]),
    _: 2
  }, [
    _ctx.isMappingMode ? {
      name: "before-data",
      fn: withCtx(() => [
        (openBlock(), createBlock(resolveDynamicComponent("style"), null, {
          default: withCtx(() => [
            createTextVNode("button.linkRun { display: none }")
          ]),
          _: 1
        })),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.mappedNode)
        }, [
          createVNode(_component_n8n_select, {
            modelValue: _ctx.mappedNode,
            "onUpdate:modelValue": _ctx.onMappedNodeSelected,
            size: "small",
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"])),
            teleported: ""
          }, {
            prepend: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.input.previousNode")), 1)
            ]),
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rootNodesParents, (nodeName) => {
                return openBlock(), createBlock(_component_n8n_option, {
                  key: nodeName,
                  label: nodeName,
                  value: nodeName
                }, null, 8, ["label", "value"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])
        ], 2)
      ]),
      key: "0"
    } : void 0
  ]), 1032, ["nodeUi", "runIndex", "linkedRuns", "canLinkRuns", "tooMuchDataTitle", "noDataInBranchMessage", "isExecuting", "executingMessage", "sessionId", "overrideOutputs", "mappingEnabled", "distanceFromActive", "isProductionExecutionPreview", "onLinkRun", "onUnlinkRun", "onRunChange"]);
}
const cssModules$4 = {
  "$style": style0$2
};
const InputPanel = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__cssModules", cssModules$4], ["__scopeId", "data-v-ea2166d2"]]);
const _sfc_main$5 = defineComponent({
  name: "TriggerPanel",
  mixins: [workflowHelpers, copyPaste],
  components: {
    NodeExecuteButton,
    CopyInput,
    NodeIcon
  },
  data: () => {
    return {
      executionsHelpEventBus: createEventBus()
    };
  },
  props: {
    nodeName: {
      type: String
    },
    sessionId: {
      type: String
    }
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useUIStore, useWorkflowsStore),
    node() {
      return this.workflowsStore.getNodeByName(this.nodeName);
    },
    nodeType() {
      if (this.node) {
        return this.nodeTypesStore.getNodeType(this.node.type, this.node.typeVersion);
      }
      return null;
    },
    hasIssues() {
      var _a;
      return Boolean(
        ((_a = this.node) == null ? void 0 : _a.issues) && (this.node.issues.parameters || this.node.issues.credentials)
      );
    },
    serviceName() {
      if (this.nodeType) {
        return getTriggerNodeServiceName(this.nodeType);
      }
      return "";
    },
    isWebhookNode() {
      return Boolean(this.node && this.node.type === WEBHOOK_NODE_TYPE);
    },
    webhookHttpMethod() {
      var _a, _b;
      if (!this.node || !((_b = (_a = this.nodeType) == null ? void 0 : _a.webhooks) == null ? void 0 : _b.length)) {
        return void 0;
      }
      return this.getWebhookExpressionValue(this.nodeType.webhooks[0], "httpMethod");
    },
    webhookTestUrl() {
      var _a, _b;
      if (!this.node || !((_b = (_a = this.nodeType) == null ? void 0 : _a.webhooks) == null ? void 0 : _b.length)) {
        return void 0;
      }
      return this.getWebhookUrl(this.nodeType.webhooks[0], this.node, "test");
    },
    isWebhookBasedNode() {
      var _a, _b;
      return Boolean((_b = (_a = this.nodeType) == null ? void 0 : _a.webhooks) == null ? void 0 : _b.length);
    },
    isPollingNode() {
      return Boolean(this.nodeType && this.nodeType.polling);
    },
    isListeningForEvents() {
      const waitingOnWebhook = this.workflowsStore.executionWaitingForWebhook;
      const executedNode = this.workflowsStore.executedNode;
      return !!this.node && !this.node.disabled && this.isWebhookBasedNode && waitingOnWebhook && (!executedNode || executedNode === this.nodeName);
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    isActivelyPolling() {
      const triggeredNode = this.workflowsStore.executedNode;
      return this.workflowRunning && this.isPollingNode && this.nodeName === triggeredNode;
    },
    isWorkflowActive() {
      return this.workflowsStore.isWorkflowActive;
    },
    listeningTitle() {
      var _a;
      return ((_a = this.nodeType) == null ? void 0 : _a.name) === FORM_TRIGGER_NODE_TYPE ? this.$locale.baseText("ndv.trigger.webhookNode.formTrigger.listening") : this.$locale.baseText("ndv.trigger.webhookNode.listening");
    },
    listeningHint() {
      var _a;
      return ((_a = this.nodeType) == null ? void 0 : _a.name) === FORM_TRIGGER_NODE_TYPE ? this.$locale.baseText("ndv.trigger.webhookBasedNode.formTrigger.serviceHint") : this.$locale.baseText("ndv.trigger.webhookBasedNode.serviceHint", {
        interpolate: { service: this.serviceName }
      });
    },
    header() {
      var _a;
      const serviceName = this.nodeType ? getTriggerNodeServiceName(this.nodeType) : "";
      if (this.isActivelyPolling) {
        return this.$locale.baseText("ndv.trigger.pollingNode.fetchingEvent");
      }
      if (((_a = this.nodeType) == null ? void 0 : _a.triggerPanel) && typeof this.nodeType.triggerPanel.header === "string") {
        return this.nodeType.triggerPanel.header;
      }
      if (this.isWebhookBasedNode) {
        return this.$locale.baseText("ndv.trigger.webhookBasedNode.action", {
          interpolate: { name: serviceName }
        });
      }
      return "";
    },
    subheader() {
      const serviceName = this.nodeType ? getTriggerNodeServiceName(this.nodeType) : "";
      if (this.isActivelyPolling) {
        return this.$locale.baseText("ndv.trigger.pollingNode.fetchingHint", {
          interpolate: { name: serviceName }
        });
      }
      return "";
    },
    executionsHelp() {
      var _a, _b;
      if (((_b = (_a = this.nodeType) == null ? void 0 : _a.triggerPanel) == null ? void 0 : _b.executionsHelp) !== void 0) {
        if (typeof this.nodeType.triggerPanel.executionsHelp === "string") {
          return this.nodeType.triggerPanel.executionsHelp;
        }
        if (!this.isWorkflowActive && this.nodeType.triggerPanel.executionsHelp.inactive) {
          return this.nodeType.triggerPanel.executionsHelp.inactive;
        }
        if (this.isWorkflowActive && this.nodeType.triggerPanel.executionsHelp.active) {
          return this.nodeType.triggerPanel.executionsHelp.active;
        }
      }
      if (this.isWebhookBasedNode) {
        if (this.isWorkflowActive) {
          return this.$locale.baseText("ndv.trigger.webhookBasedNode.executionsHelp.active", {
            interpolate: { service: this.serviceName }
          });
        } else {
          return this.$locale.baseText("ndv.trigger.webhookBasedNode.executionsHelp.inactive", {
            interpolate: { service: this.serviceName }
          });
        }
      }
      if (this.isPollingNode) {
        if (this.isWorkflowActive) {
          return this.$locale.baseText("ndv.trigger.pollingNode.executionsHelp.active", {
            interpolate: { service: this.serviceName }
          });
        } else {
          return this.$locale.baseText("ndv.trigger.pollingNode.executionsHelp.inactive", {
            interpolate: { service: this.serviceName }
          });
        }
      }
      return "";
    },
    activationHint() {
      var _a, _b;
      if (this.isActivelyPolling) {
        return "";
      }
      if ((_b = (_a = this.nodeType) == null ? void 0 : _a.triggerPanel) == null ? void 0 : _b.activationHint) {
        if (typeof this.nodeType.triggerPanel.activationHint === "string") {
          return this.nodeType.triggerPanel.activationHint;
        }
        if (!this.isWorkflowActive && typeof this.nodeType.triggerPanel.activationHint.inactive === "string") {
          return this.nodeType.triggerPanel.activationHint.inactive;
        }
        if (this.isWorkflowActive && typeof this.nodeType.triggerPanel.activationHint.active === "string") {
          return this.nodeType.triggerPanel.activationHint.active;
        }
      }
      if (this.isWebhookBasedNode) {
        if (this.isWorkflowActive) {
          return this.$locale.baseText("ndv.trigger.webhookBasedNode.activationHint.active", {
            interpolate: { service: this.serviceName }
          });
        } else {
          return this.$locale.baseText("ndv.trigger.webhookBasedNode.activationHint.inactive", {
            interpolate: { service: this.serviceName }
          });
        }
      }
      if (this.isPollingNode) {
        if (this.isWorkflowActive) {
          return this.$locale.baseText("ndv.trigger.pollingNode.activationHint.active", {
            interpolate: { service: this.serviceName }
          });
        } else {
          return this.$locale.baseText("ndv.trigger.pollingNode.activationHint.inactive", {
            interpolate: { service: this.serviceName }
          });
        }
      }
      return "";
    }
  },
  methods: {
    expandExecutionHelp() {
      if (this.$refs.help) {
        this.executionsHelpEventBus.emit("expand");
      }
    },
    onLinkClick(e) {
      var _a;
      if (!e.target) {
        return;
      }
      const target = e.target;
      if (target.localName !== "a")
        return;
      if ((_a = target.dataset) == null ? void 0 : _a.key) {
        e.stopPropagation();
        e.preventDefault();
        if (target.dataset.key === "activate") {
          this.$emit("activate");
        } else if (target.dataset.key === "executions") {
          this.$telemetry.track("User clicked ndv link", {
            workflow_id: this.workflowsStore.workflowId,
            session_id: this.sessionId,
            pane: "input",
            type: "open-executions-log"
          });
          this.ndvStore.activeNodeName = null;
          void this.$router.push({
            name: VIEWS.EXECUTIONS
          });
        } else if (target.dataset.key === "settings") {
          this.uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
        }
      }
    },
    onTestLinkCopied() {
      this.$telemetry.track("User copied webhook URL", {
        pane: "inputs",
        type: "test url"
      });
    },
    onNodeExecute() {
      this.$emit("execute");
    }
  }
});
const container = "_container_2vg29_5";
const header = "_header_2vg29_22";
const action = "_action_2vg29_29";
const shake$1 = "_shake_2vg29_33";
const accordion = "_accordion_2vg29_54";
const style0$1 = {
  container,
  header,
  action,
  shake: shake$1,
  accordion
};
const TriggerPanel_vue_vue_type_style_index_1_scoped_779655ca_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-779655ca"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { key: "empty" };
const _hoisted_2$3 = { key: "listening" };
const _hoisted_3$2 = { key: 0 };
const _hoisted_4$2 = { key: 1 };
const _hoisted_5$2 = { key: "default" };
const _hoisted_6$2 = {
  key: 0,
  class: "mb-xl"
};
const _hoisted_7$1 = ["textContent"];
const _hoisted_8$1 = ["innerHTML"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NodeIcon = resolveComponent("NodeIcon");
  const _component_n8n_pulse = resolveComponent("n8n-pulse");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_CopyInput = resolveComponent("CopyInput");
  const _component_NodeExecuteButton = resolveComponent("NodeExecuteButton");
  const _component_n8n_spinner = resolveComponent("n8n-spinner");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_info_accordion = resolveComponent("n8n-info-accordion");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createVNode(Transition, {
      name: "fade",
      mode: "out-in"
    }, {
      default: withCtx(() => [
        _ctx.hasIssues ? (openBlock(), createElementBlock("div", _hoisted_1$4)) : _ctx.isListeningForEvents ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
          createVNode(_component_n8n_pulse, null, {
            default: withCtx(() => [
              createVNode(_component_NodeIcon, {
                nodeType: _ctx.nodeType,
                size: 40
              }, null, 8, ["nodeType"])
            ]),
            _: 1
          }),
          _ctx.isWebhookNode ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            createVNode(_component_n8n_text, {
              tag: "div",
              size: "large",
              color: "text-dark",
              class: "mb-2xs",
              bold: ""
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.trigger.webhookNode.listening")), 1)
              ]),
              _: 1
            }),
            createBaseVNode("div", {
              class: normalizeClass([_ctx.$style.shake, "mb-xs"])
            }, [
              createVNode(_component_n8n_text, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.trigger.webhookNode.requestHint", {
                    interpolate: { type: this.webhookHttpMethod }
                  })), 1)
                ]),
                _: 1
              })
            ], 2),
            createVNode(_component_CopyInput, {
              value: _ctx.webhookTestUrl,
              toastTitle: _ctx.$locale.baseText("ndv.trigger.copiedTestUrl"),
              class: "mb-2xl",
              size: "medium",
              collapse: true,
              "copy-button-text": _ctx.$locale.baseText("generic.clickToCopy"),
              onCopy: _ctx.onTestLinkCopied
            }, null, 8, ["value", "toastTitle", "copy-button-text", "onCopy"]),
            createVNode(_component_NodeExecuteButton, {
              "data-test-id": "trigger-execute-button",
              nodeName: _ctx.nodeName,
              onExecute: _ctx.onNodeExecute,
              size: "medium",
              telemetrySource: "inputs"
            }, null, 8, ["nodeName", "onExecute"])
          ])) : (openBlock(), createElementBlock("div", _hoisted_4$2, [
            createVNode(_component_n8n_text, {
              tag: "div",
              size: "large",
              color: "text-dark",
              class: "mb-2xs",
              bold: ""
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.listeningTitle), 1)
              ]),
              _: 1
            }),
            createBaseVNode("div", {
              class: normalizeClass([_ctx.$style.shake, "mb-xs"])
            }, [
              createVNode(_component_n8n_text, { tag: "div" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.listeningHint), 1)
                ]),
                _: 1
              })
            ], 2),
            createVNode(_component_NodeExecuteButton, {
              "data-test-id": "trigger-execute-button",
              nodeName: _ctx.nodeName,
              onExecute: _ctx.onNodeExecute,
              size: "medium",
              telemetrySource: "inputs"
            }, null, 8, ["nodeName", "onExecute"])
          ]))
        ])) : (openBlock(), createElementBlock("div", _hoisted_5$2, [
          _ctx.isActivelyPolling ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
            createVNode(_component_n8n_spinner, { type: "ring" })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.action)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.header)
            }, [
              _ctx.header ? (openBlock(), createBlock(_component_n8n_heading, {
                key: 0,
                tag: "h1",
                bold: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.header), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              _ctx.subheader ? (openBlock(), createBlock(_component_n8n_text, { key: 1 }, {
                default: withCtx(() => [
                  createBaseVNode("span", {
                    textContent: toDisplayString(_ctx.subheader)
                  }, null, 8, _hoisted_7$1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ], 2),
            createVNode(_component_NodeExecuteButton, {
              "data-test-id": "trigger-execute-button",
              nodeName: _ctx.nodeName,
              onExecute: _ctx.onNodeExecute,
              size: "medium",
              telemetrySource: "inputs"
            }, null, 8, ["nodeName", "onExecute"])
          ], 2),
          _ctx.activationHint ? (openBlock(), createBlock(_component_n8n_text, {
            key: 1,
            size: "small",
            onClick: _ctx.onLinkClick
          }, {
            default: withCtx(() => [
              createBaseVNode("span", { innerHTML: _ctx.activationHint }, null, 8, _hoisted_8$1),
              createTextVNode("  ")
            ]),
            _: 1
          }, 8, ["onClick"])) : createCommentVNode("", true),
          _ctx.activationHint && _ctx.executionsHelp ? (openBlock(), createBlock(_component_n8n_link, {
            key: 2,
            size: "small",
            onClick: _ctx.expandExecutionHelp
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.trigger.moreInfo")), 1)
            ]),
            _: 1
          }, 8, ["onClick"])) : createCommentVNode("", true),
          _ctx.executionsHelp ? (openBlock(), createBlock(_component_n8n_info_accordion, {
            key: 3,
            ref: "help",
            class: normalizeClass(_ctx.$style.accordion),
            title: _ctx.$locale.baseText("ndv.trigger.executionsHint.question"),
            description: _ctx.executionsHelp,
            eventBus: _ctx.executionsHelpEventBus,
            "onClick:body": _ctx.onLinkClick
          }, null, 8, ["class", "title", "description", "eventBus", "onClick:body"])) : createCommentVNode("", true)
        ]))
      ]),
      _: 1
    })
  ], 2);
}
const cssModules$3 = {
  "$style": style0$1
};
const TriggerPanel = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__cssModules", cssModules$3], ["__scopeId", "data-v-779655ca"]]);
const _sfc_main$4 = defineComponent({
  name: "NodeDetailsView",
  mixins: [externalHooks, nodeHelpers, workflowHelpers, workflowActivate, pinData],
  components: {
    NodeSettings,
    InputPanel,
    OutputPanel,
    NDVDraggablePanels,
    TriggerPanel
  },
  props: {
    readOnly: {
      type: Boolean
    },
    renaming: {
      type: Boolean
    },
    isProductionExecutionPreview: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    var _a, _b;
    return {
      ...useDeviceSupportHelpers(),
      ...useMessage(),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = workflowActivate).setup) == null ? void 0 : _b.call(_a, props)
    };
  },
  data() {
    return {
      settingsEventBus: createEventBus(),
      redrawRequired: false,
      runInputIndex: -1,
      runOutputIndex: -1,
      isLinkingEnabled: true,
      selectedInput: void 0,
      triggerWaitingWarningEnabled: false,
      isDragging: false,
      mainPanelPosition: 0,
      pinDataDiscoveryTooltipVisible: false,
      avgInputRowHeight: 0,
      avgOutputRowHeight: 0
    };
  },
  mounted() {
    dataPinningEventBus.on("data-pinning-discovery", this.setIsTooltipVisible);
  },
  beforeUnmount() {
    dataPinningEventBus.off("data-pinning-discovery", this.setIsTooltipVisible);
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useUIStore, useWorkflowsStore, useSettingsStore),
    sessionId() {
      return this.ndvStore.sessionId;
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    showTriggerWaitingWarning() {
      return this.triggerWaitingWarningEnabled && !!this.activeNodeType && !this.activeNodeType.group.includes("trigger") && this.workflowRunning && this.workflowsStore.executionWaitingForWebhook;
    },
    activeNode() {
      return this.ndvStore.activeNode;
    },
    inputNodeName() {
      return this.selectedInput || this.parentNode;
    },
    inputNode() {
      if (this.inputNodeName) {
        return this.workflowsStore.getNodeByName(this.inputNodeName);
      }
      return null;
    },
    activeNodeType() {
      if (this.activeNode) {
        return this.nodeTypesStore.getNodeType(this.activeNode.type, this.activeNode.typeVersion);
      }
      return null;
    },
    showTriggerPanel() {
      var _a, _b, _c, _d;
      const isWebhookBasedNode = !!((_b = (_a = this.activeNodeType) == null ? void 0 : _a.webhooks) == null ? void 0 : _b.length);
      const isPollingNode = (_c = this.activeNodeType) == null ? void 0 : _c.polling;
      const override = !!((_d = this.activeNodeType) == null ? void 0 : _d.triggerPanel);
      return !this.readOnly && this.isTriggerNode && (isWebhookBasedNode || isPollingNode || override);
    },
    workflow() {
      return this.getCurrentWorkflow();
    },
    parentNodes() {
      if (this.activeNode) {
        return this.workflow.getParentNodesByDepth(this.activeNode.name, 1).map(({ name }) => name) || [];
      }
      return [];
    },
    parentNode() {
      var _a;
      const pinData2 = this.workflowsStore.getPinData;
      for (const parentNodeName of this.parentNodes) {
        if (pinData2[parentNodeName]) {
          return parentNodeName;
        }
        if ((_a = this.workflowRunData) == null ? void 0 : _a[parentNodeName]) {
          return parentNodeName;
        }
      }
      return this.parentNodes[0];
    },
    isExecutableTriggerNode() {
      if (!this.activeNodeType)
        return false;
      return EXECUTABLE_TRIGGER_NODE_TYPES.includes(this.activeNodeType.name);
    },
    isTriggerNode() {
      return !!this.activeNodeType && (this.activeNodeType.group.includes("trigger") || this.activeNodeType.name === START_NODE_TYPE);
    },
    isActiveStickyNode() {
      return !!this.ndvStore.activeNode && this.ndvStore.activeNode.type === STICKY_NODE_TYPE;
    },
    workflowExecution() {
      return this.workflowsStore.getWorkflowExecution;
    },
    workflowRunData() {
      if (this.workflowExecution === null) {
        return null;
      }
      const executionData = this.workflowExecution.data;
      if (executionData == null ? void 0 : executionData.resultData) {
        return executionData.resultData.runData;
      }
      return null;
    },
    maxOutputRun() {
      if (this.activeNode === null) {
        return 0;
      }
      const runData = this.workflowRunData;
      if (runData === null || !runData.hasOwnProperty(this.activeNode.name)) {
        return 0;
      }
      if (runData[this.activeNode.name].length) {
        return runData[this.activeNode.name].length - 1;
      }
      return 0;
    },
    outputRun() {
      if (this.runOutputIndex === -1) {
        return this.maxOutputRun;
      }
      return Math.min(this.runOutputIndex, this.maxOutputRun);
    },
    maxInputRun() {
      if (this.inputNode === null || this.activeNode === null) {
        return 0;
      }
      const workflowNode = this.workflow.getNode(this.activeNode.name);
      const outputs = getNodeOutputs(this.workflow, workflowNode, this.activeNodeType);
      let node = this.inputNode;
      const runData = this.workflowRunData;
      if (outputs.some((output) => output !== NodeConnectionType.Main)) {
        node = this.activeNode;
      }
      if (!node || !runData || !runData.hasOwnProperty(node.name)) {
        return 0;
      }
      if (runData[node.name].length) {
        return runData[node.name].length - 1;
      }
      return 0;
    },
    inputRun() {
      if (this.isLinkingEnabled && this.maxOutputRun === this.maxInputRun) {
        return this.outputRun;
      }
      if (this.runInputIndex === -1) {
        return this.maxInputRun;
      }
      return Math.min(this.runInputIndex, this.maxInputRun);
    },
    canLinkRuns() {
      return this.maxOutputRun > 0 && this.maxOutputRun === this.maxInputRun;
    },
    linked() {
      return this.isLinkingEnabled && this.canLinkRuns;
    },
    inputPanelMargin() {
      return this.isTriggerNode ? 0 : 80;
    },
    featureRequestUrl() {
      if (!this.activeNodeType) {
        return "";
      }
      return `${BASE_NODE_SURVEY_URL}${this.activeNodeType.name}`;
    },
    outputPanelEditMode() {
      return this.ndvStore.outputPanelEditMode;
    },
    isWorkflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    isExecutionWaitingForWebhook() {
      return this.workflowsStore.executionWaitingForWebhook;
    },
    blockUi() {
      return this.isWorkflowRunning || this.isExecutionWaitingForWebhook;
    },
    foreignCredentials() {
      const credentials = (this.activeNode || {}).credentials;
      const usedCredentials = this.workflowsStore.usedCredentials;
      const foreignCredentials = [];
      if (credentials && this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Sharing)) {
        Object.values(credentials).forEach((credential) => {
          if (credential.id && usedCredentials[credential.id] && !usedCredentials[credential.id].currentUserHasAccess) {
            foreignCredentials.push(credential.id);
          }
        });
      }
      return foreignCredentials;
    },
    hasForeignCredential() {
      return this.foreignCredentials.length > 0;
    }
  },
  watch: {
    activeNode(node, oldNode) {
      if (node && node.name !== (oldNode == null ? void 0 : oldNode.name) && !this.isActiveStickyNode) {
        this.runInputIndex = -1;
        this.runOutputIndex = -1;
        this.isLinkingEnabled = true;
        this.selectedInput = void 0;
        this.triggerWaitingWarningEnabled = false;
        this.avgOutputRowHeight = 0;
        this.avgInputRowHeight = 0;
        setTimeout(() => this.ndvStore.setNDVSessionId(), 0);
        void this.$externalHooks().run("dataDisplay.nodeTypeChanged", {
          nodeSubtitle: this.getNodeSubtitle(node, this.activeNodeType, this.getCurrentWorkflow())
        });
        setTimeout(() => {
          if (this.activeNode) {
            const outgoingConnections = this.workflowsStore.outgoingConnectionsByNodeName(
              this.activeNode.name
            );
            this.$telemetry.track("User opened node modal", {
              node_type: this.activeNodeType ? this.activeNodeType.name : "",
              workflow_id: this.workflowsStore.workflowId,
              session_id: this.sessionId,
              is_editable: !this.hasForeignCredential,
              parameters_pane_position: this.mainPanelPosition,
              input_first_connector_runs: this.maxInputRun,
              output_first_connector_runs: this.maxOutputRun,
              selected_view_inputs: this.isTriggerNode ? "trigger" : this.ndvStore.inputPanelDisplayMode,
              selected_view_outputs: this.ndvStore.outputPanelDisplayMode,
              input_connectors: this.parentNodes.length,
              output_connectors: outgoingConnections && outgoingConnections.main && outgoingConnections.main.length,
              input_displayed_run_index: this.inputRun,
              output_displayed_run_index: this.outputRun,
              data_pinning_tooltip_presented: this.pinDataDiscoveryTooltipVisible,
              input_displayed_row_height_avg: this.avgInputRowHeight,
              output_displayed_row_height_avg: this.avgOutputRowHeight
            });
          }
        }, 2e3);
      }
      if (window.top && !this.isActiveStickyNode) {
        window.top.postMessage(JSON.stringify({ command: node ? "openNDV" : "closeNDV" }), "*");
      }
    },
    maxOutputRun() {
      this.runOutputIndex = -1;
    },
    maxInputRun() {
      this.runInputIndex = -1;
    },
    inputNodeName(nodeName) {
      setTimeout(() => {
        this.ndvStore.setInputNodeName(nodeName);
      }, 0);
    },
    inputRun() {
      setTimeout(() => {
        this.ndvStore.setInputRunIndex(this.inputRun);
      }, 0);
    }
  },
  methods: {
    setIsTooltipVisible({ isTooltipVisible }) {
      this.pinDataDiscoveryTooltipVisible = isTooltipVisible;
    },
    onKeyDown(e) {
      if (e.key === "s" && this.isCtrlKeyPressed(e)) {
        e.stopPropagation();
        e.preventDefault();
        if (this.readOnly)
          return;
        this.$emit("saveKeyboardShortcut", e);
      }
    },
    onInputItemHover(e) {
      if (!this.inputNodeName) {
        return;
      }
      if (e === null) {
        this.ndvStore.setHoveringItem(null);
        return;
      }
      const item = {
        nodeName: this.inputNodeName,
        runIndex: this.inputRun,
        outputIndex: e.outputIndex,
        itemIndex: e.itemIndex
      };
      this.ndvStore.setHoveringItem(item);
    },
    onOutputItemHover(e) {
      if (e === null || !this.activeNode) {
        this.ndvStore.setHoveringItem(null);
        return;
      }
      const item = {
        nodeName: this.activeNode.name,
        runIndex: this.outputRun,
        outputIndex: e.outputIndex,
        itemIndex: e.itemIndex
      };
      this.ndvStore.setHoveringItem(item);
    },
    onInputTableMounted(e) {
      this.avgInputRowHeight = e.avgRowHeight;
    },
    onOutputTableMounted(e) {
      this.avgOutputRowHeight = e.avgRowHeight;
    },
    onWorkflowActivate() {
      this.ndvStore.activeNodeName = null;
      setTimeout(() => {
        void this.activateCurrentWorkflow("ndv");
      }, 1e3);
    },
    onFeatureRequestClick() {
      window.open(this.featureRequestUrl, "_blank");
      if (this.activeNode) {
        this.$telemetry.track("User clicked ndv link", {
          node_type: this.activeNode.type,
          workflow_id: this.workflowsStore.workflowId,
          session_id: this.sessionId,
          pane: NodeConnectionType.Main,
          type: "i-wish-this-node-would"
        });
      }
    },
    onPanelsInit(e) {
      this.mainPanelPosition = e.position;
    },
    onDragStart(e) {
      this.isDragging = true;
      this.mainPanelPosition = e.position;
    },
    onDragEnd(e) {
      this.isDragging = false;
      this.$telemetry.track("User moved parameters pane", {
        window_width: e.windowWidth,
        start_position: this.mainPanelPosition,
        end_position: e.position,
        node_type: this.activeNodeType ? this.activeNodeType.name : "",
        session_id: this.sessionId,
        workflow_id: this.workflowsStore.workflowId
      });
      this.mainPanelPosition = e.position;
    },
    onLinkRunToInput() {
      this.runOutputIndex = this.runInputIndex;
      this.isLinkingEnabled = true;
      this.trackLinking("input");
    },
    onLinkRunToOutput() {
      this.isLinkingEnabled = true;
      this.trackLinking("output");
    },
    onUnlinkRun(pane) {
      this.runInputIndex = this.runOutputIndex;
      this.isLinkingEnabled = false;
      this.trackLinking(pane);
    },
    trackLinking(pane) {
      this.$telemetry.track("User changed ndv run linking", {
        node_type: this.activeNodeType ? this.activeNodeType.name : "",
        session_id: this.sessionId,
        linked: this.linked,
        pane
      });
    },
    onNodeExecute() {
      setTimeout(() => {
        if (!this.activeNode || !this.workflowRunning) {
          return;
        }
        this.triggerWaitingWarningEnabled = true;
      }, 1e3);
    },
    openSettings() {
      this.settingsEventBus.emit("openSettings");
    },
    valueChanged(parameterData) {
      this.$emit("valueChanged", parameterData);
    },
    nodeTypeSelected(nodeTypeName) {
      this.$emit("nodeTypeSelected", nodeTypeName);
    },
    async close() {
      var _a, _b;
      if (this.isDragging) {
        return;
      }
      if (typeof ((_a = this.activeNodeType) == null ? void 0 : _a.outputs) === "string" || typeof ((_b = this.activeNodeType) == null ? void 0 : _b.inputs) === "string" || this.redrawRequired) {
        const nodeName = this.activeNode.name;
        setTimeout(() => {
          this.$emit("redrawNode", nodeName);
        }, 1);
      }
      if (this.outputPanelEditMode.enabled) {
        const shouldPinDataBeforeClosing = await this.confirm(
          "",
          this.$locale.baseText("ndv.pinData.beforeClosing.title"),
          {
            confirmButtonText: this.$locale.baseText("ndv.pinData.beforeClosing.confirm"),
            cancelButtonText: this.$locale.baseText("ndv.pinData.beforeClosing.cancel")
          }
        );
        if (shouldPinDataBeforeClosing === MODAL_CONFIRM) {
          const { value } = this.outputPanelEditMode;
          if (this.activeNode) {
            try {
              this.setPinData(this.activeNode, jsonParse(value), "on-ndv-close-modal");
            } catch (error) {
              console.error(error);
            }
          }
        }
        this.ndvStore.setOutputPanelEditModeEnabled(false);
      }
      await this.$externalHooks().run("dataDisplay.nodeEditingFinished");
      this.$telemetry.track("User closed node modal", {
        node_type: this.activeNodeType ? this.activeNodeType.name : "",
        session_id: this.sessionId,
        workflow_id: this.workflowsStore.workflowId
      });
      this.triggerWaitingWarningEnabled = false;
      this.ndvStore.activeNodeName = null;
      this.ndvStore.resetNDVSessionId();
    },
    onRunOutputIndexChange(run) {
      this.runOutputIndex = run;
      this.trackRunChange(run, "output");
    },
    onRunInputIndexChange(run) {
      this.runInputIndex = run;
      if (this.linked) {
        this.runOutputIndex = run;
      }
      this.trackRunChange(run, "input");
    },
    trackRunChange(run, pane) {
      this.$telemetry.track("User changed ndv run dropdown", {
        session_id: this.sessionId,
        run_index: run,
        node_type: this.activeNodeType ? this.activeNodeType.name : "",
        pane
      });
    },
    onInputNodeChange(value, index) {
      this.runInputIndex = -1;
      this.isLinkingEnabled = true;
      this.selectedInput = value;
      this.$telemetry.track("User changed ndv input dropdown", {
        node_type: this.activeNode ? this.activeNode.type : "",
        session_id: this.sessionId,
        workflow_id: this.workflowsStore.workflowId,
        selection_value: index,
        input_node_type: this.inputNode ? this.inputNode.type : ""
      });
    },
    onStopExecution() {
      this.$emit("stopExecution");
    }
  }
});
const NodeDetailsView_vue_vue_type_style_index_0_lang = "";
const modalBackground = "_modalBackground_17uio_5";
const triggerWarning = "_triggerWarning_17uio_10";
const backToCanvas = "_backToCanvas_17uio_14";
const featureRequest = "_featureRequest_17uio_35";
const style1 = {
  modalBackground,
  triggerWarning,
  backToCanvas,
  featureRequest
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_icon = resolveComponent("n8n-icon");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_TriggerPanel = resolveComponent("TriggerPanel");
  const _component_InputPanel = resolveComponent("InputPanel");
  const _component_OutputPanel = resolveComponent("OutputPanel");
  const _component_NodeSettings = resolveComponent("NodeSettings");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_NDVDraggablePanels = resolveComponent("NDVDraggablePanels");
  const _component_el_dialog = resolveComponent("el-dialog");
  return openBlock(), createBlock(_component_el_dialog, {
    modelValue: (!!_ctx.activeNode || _ctx.renaming) && !_ctx.isActiveStickyNode,
    "before-close": _ctx.close,
    "show-close": false,
    class: "data-display-wrapper ndv-wrapper",
    "overlay-class": "data-display-overlay",
    width: "auto",
    "append-to-body": "",
    "data-test-id": "ndv"
  }, {
    default: withCtx(() => {
      var _a;
      return [
        createVNode(_component_n8n_tooltip, {
          placement: "bottom-start",
          visible: _ctx.showTriggerWaitingWarning,
          disabled: !_ctx.showTriggerWaitingWarning
        }, {
          content: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.triggerWarning)
            }, toDisplayString(_ctx.$locale.baseText("ndv.backToCanvas.waitingForTriggerWarning")), 3)
          ]),
          default: withCtx(() => [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.backToCanvas),
              onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
              "data-test-id": "back-to-canvas"
            }, [
              createVNode(_component_n8n_icon, {
                icon: "arrow-left",
                color: "text-xlight",
                size: "medium"
              }),
              createVNode(_component_n8n_text, {
                color: "text-xlight",
                size: "medium",
                bold: true
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("ndv.backToCanvas")), 1)
                ]),
                _: 1
              })
            ], 2)
          ]),
          _: 1
        }, 8, ["visible", "disabled"]),
        _ctx.activeNode ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "data-display",
          ref: "container",
          onKeydownCapture: _cache[6] || (_cache[6] = (...args) => _ctx.onKeyDown && _ctx.onKeyDown(...args)),
          tabindex: "0"
        }, [
          createBaseVNode("div", {
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.close && _ctx.close(...args)),
            class: normalizeClass(_ctx.$style.modalBackground)
          }, null, 2),
          createVNode(_component_NDVDraggablePanels, {
            isTriggerNode: _ctx.isTriggerNode,
            hideInputAndOutput: _ctx.activeNodeType === null,
            position: _ctx.isTriggerNode && !_ctx.showTriggerPanel ? 0 : void 0,
            isDraggable: !_ctx.isTriggerNode,
            hasDoubleWidth: ((_a = _ctx.activeNodeType) == null ? void 0 : _a.parameterPane) === "wide",
            nodeType: _ctx.activeNodeType,
            onClose: _ctx.close,
            onInit: _ctx.onPanelsInit,
            onDragstart: _ctx.onDragStart,
            onDragend: _ctx.onDragEnd
          }, createSlots({
            output: withCtx(() => [
              createVNode(_component_OutputPanel, {
                "data-test-id": "output-panel",
                canLinkRuns: _ctx.canLinkRuns,
                runIndex: _ctx.outputRun,
                linkedRuns: _ctx.linked,
                sessionId: _ctx.sessionId,
                isReadOnly: _ctx.readOnly || _ctx.hasForeignCredential,
                blockUI: _ctx.blockUi && _ctx.isTriggerNode && !_ctx.isExecutableTriggerNode,
                isProductionExecutionPreview: _ctx.isProductionExecutionPreview,
                onLinkRun: _ctx.onLinkRunToOutput,
                onUnlinkRun: _cache[3] || (_cache[3] = () => _ctx.onUnlinkRun("output")),
                onRunChange: _ctx.onRunOutputIndexChange,
                onOpenSettings: _ctx.openSettings,
                onTableMounted: _ctx.onOutputTableMounted,
                onItemHover: _ctx.onOutputItemHover
              }, null, 8, ["canLinkRuns", "runIndex", "linkedRuns", "sessionId", "isReadOnly", "blockUI", "isProductionExecutionPreview", "onLinkRun", "onRunChange", "onOpenSettings", "onTableMounted", "onItemHover"])
            ]),
            main: withCtx(() => [
              createVNode(_component_NodeSettings, {
                eventBus: _ctx.settingsEventBus,
                dragging: _ctx.isDragging,
                sessionId: _ctx.sessionId,
                nodeType: _ctx.activeNodeType,
                foreignCredentials: _ctx.foreignCredentials,
                readOnly: _ctx.readOnly,
                blockUI: _ctx.blockUi && _ctx.showTriggerPanel,
                executable: !_ctx.readOnly,
                onValueChanged: _ctx.valueChanged,
                onExecute: _ctx.onNodeExecute,
                onStopExecution: _ctx.onStopExecution,
                onRedrawRequired: _cache[4] || (_cache[4] = ($event) => _ctx.redrawRequired = true),
                onActivate: _ctx.onWorkflowActivate
              }, null, 8, ["eventBus", "dragging", "sessionId", "nodeType", "foreignCredentials", "readOnly", "blockUI", "executable", "onValueChanged", "onExecute", "onStopExecution", "onActivate"]),
              _ctx.featureRequestUrl ? (openBlock(), createElementBlock("a", {
                key: 0,
                onClick: _cache[5] || (_cache[5] = (...args) => _ctx.onFeatureRequestClick && _ctx.onFeatureRequestClick(...args)),
                class: normalizeClass(_ctx.$style.featureRequest),
                target: "_blank"
              }, [
                createVNode(_component_font_awesome_icon, { icon: "lightbulb" }),
                createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("ndv.featureRequest")), 1)
              ], 2)) : createCommentVNode("", true)
            ]),
            _: 2
          }, [
            _ctx.showTriggerPanel || !_ctx.isTriggerNode ? {
              name: "input",
              fn: withCtx(() => [
                _ctx.showTriggerPanel ? (openBlock(), createBlock(_component_TriggerPanel, {
                  key: 0,
                  nodeName: _ctx.activeNode.name,
                  sessionId: _ctx.sessionId,
                  onExecute: _ctx.onNodeExecute,
                  onActivate: _ctx.onWorkflowActivate
                }, null, 8, ["nodeName", "sessionId", "onExecute", "onActivate"])) : !_ctx.isTriggerNode ? (openBlock(), createBlock(_component_InputPanel, {
                  key: 1,
                  workflow: _ctx.workflow,
                  canLinkRuns: _ctx.canLinkRuns,
                  runIndex: _ctx.inputRun,
                  linkedRuns: _ctx.linked,
                  currentNodeName: _ctx.inputNodeName,
                  sessionId: _ctx.sessionId,
                  readOnly: _ctx.readOnly || _ctx.hasForeignCredential,
                  isProductionExecutionPreview: _ctx.isProductionExecutionPreview,
                  onLinkRun: _ctx.onLinkRunToInput,
                  onUnlinkRun: _cache[2] || (_cache[2] = () => _ctx.onUnlinkRun("input")),
                  onRunChange: _ctx.onRunInputIndexChange,
                  onOpenSettings: _ctx.openSettings,
                  onChangeInputNode: _ctx.onInputNodeChange,
                  onExecute: _ctx.onNodeExecute,
                  onTableMounted: _ctx.onInputTableMounted,
                  onItemHover: _ctx.onInputItemHover
                }, null, 8, ["workflow", "canLinkRuns", "runIndex", "linkedRuns", "currentNodeName", "sessionId", "readOnly", "isProductionExecutionPreview", "onLinkRun", "onRunChange", "onOpenSettings", "onChangeInputNode", "onExecute", "onTableMounted", "onItemHover"])) : createCommentVNode("", true)
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["isTriggerNode", "hideInputAndOutput", "position", "isDraggable", "hasDoubleWidth", "nodeType", "onClose", "onInit", "onDragstart", "onDragend"])
        ], 544)) : createCommentVNode("", true)
      ];
    }),
    _: 1
  }, 8, ["modelValue", "before-close"]);
}
const cssModules$2 = {
  "$style": style1
};
const NodeDetailsView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__cssModules", cssModules$2]]);
const createAddInputEndpointSpec = (connectionName, color) => {
  const multiple = NODE_CONNECTION_TYPE_ALLOW_MULTIPLE.includes(connectionName);
  return {
    type: "N8nAddInput",
    options: {
      width: 24,
      height: 72,
      color,
      multiple
    }
  };
};
const createDiamondOutputEndpointSpec = () => ({
  type: "Rectangle",
  options: {
    height: 10,
    width: 10,
    cssClass: "diamond-output-endpoint"
  }
});
const nodeBase = defineComponent({
  mixins: [deviceSupportHelpers],
  mounted() {
    if (this.data !== null) {
      try {
        this.__addNode(this.data);
      } catch (error) {
      }
    }
  },
  data() {
    return {
      inputs: [],
      outputs: []
    };
  },
  computed: {
    ...mapStores(useNodeTypesStore, useUIStore, useCanvasStore, useWorkflowsStore, useHistoryStore),
    data() {
      return this.workflowsStore.getNodeByName(this.name);
    },
    nodeId() {
      var _a;
      return ((_a = this.data) == null ? void 0 : _a.id) || "";
    }
  },
  props: {
    name: {
      type: String
    },
    instance: {
      type: Object
    },
    isReadOnly: {
      type: Boolean
    },
    isActive: {
      type: Boolean
    },
    hideActions: {
      type: Boolean
    },
    disableSelecting: {
      type: Boolean
    },
    showCustomTooltip: {
      type: Boolean
    }
  },
  methods: {
    __addEndpointTestingData(endpoint, type, inputIndex) {
      if ((window == null ? void 0 : window.Cypress) && "canvas" in endpoint.endpoint) {
        const canvas = endpoint.endpoint.canvas;
        this.instance.setAttribute(canvas, "data-endpoint-name", this.data.name);
        this.instance.setAttribute(canvas, "data-input-index", inputIndex.toString());
        this.instance.setAttribute(canvas, "data-endpoint-type", type);
      }
    },
    __addInputEndpoints(node, nodeTypeData) {
      const rootTypeIndexData = {};
      const typeIndexData = {};
      const workflow = this.workflowsStore.getCurrentWorkflow();
      const inputs = getNodeInputs(workflow, this.data, nodeTypeData) || [];
      this.inputs = inputs;
      const sortedInputs = [...inputs];
      sortedInputs.sort((a, b) => {
        if (typeof a === "string") {
          return 1;
        } else if (typeof b === "string") {
          return -1;
        }
        if (a.required && !b.required) {
          return -1;
        } else if (!a.required && b.required) {
          return 1;
        }
        return 0;
      });
      sortedInputs.forEach((value, i) => {
        var _a, _b;
        let inputConfiguration;
        if (typeof value === "string") {
          inputConfiguration = {
            type: value
          };
        } else {
          inputConfiguration = value;
        }
        const inputName = inputConfiguration.type;
        const rootCategoryInputName = inputName === NodeConnectionType.Main ? NodeConnectionType.Main : "other";
        if (rootTypeIndexData.hasOwnProperty(rootCategoryInputName)) {
          rootTypeIndexData[rootCategoryInputName]++;
        } else {
          rootTypeIndexData[rootCategoryInputName] = 0;
        }
        if (typeIndexData.hasOwnProperty(inputName)) {
          typeIndexData[inputName]++;
        } else {
          typeIndexData[inputName] = 0;
        }
        const rootTypeIndex = rootTypeIndexData[rootCategoryInputName];
        const typeIndex = typeIndexData[inputName];
        const inputsOfSameRootType = inputs.filter((inputData) => {
          const thisInputName = typeof inputData === "string" ? inputData : inputData.type;
          return inputName === NodeConnectionType.Main ? thisInputName === NodeConnectionType.Main : thisInputName !== NodeConnectionType.Main;
        });
        const nonMainInputs = inputsOfSameRootType.filter((inputData) => {
          return inputData !== NodeConnectionType.Main;
        });
        const requiredNonMainInputs = nonMainInputs.filter((inputData) => {
          return typeof inputData !== "string" && inputData.required;
        });
        const optionalNonMainInputs = nonMainInputs.filter((inputData) => {
          return typeof inputData !== "string" && !inputData.required;
        });
        const spacerIndexes = this.getSpacerIndexes(
          requiredNonMainInputs.length,
          optionalNonMainInputs.length
        );
        const anchorPosition = getAnchorPosition(
          inputName,
          "input",
          inputsOfSameRootType.length,
          spacerIndexes
        )[rootTypeIndex];
        const scope = getEndpointScope(inputName);
        const newEndpointData = {
          uuid: getInputEndpointUUID(this.nodeId, inputName, typeIndex),
          anchor: anchorPosition,
          // We potentially want to change that in the future to allow people to dynamically
          // activate and deactivate connected nodes
          maxConnections: inputConfiguration.maxConnections ?? -1,
          endpoint: "Rectangle",
          paintStyle: getInputEndpointStyle(
            nodeTypeData,
            "--color-foreground-xdark",
            inputName
          ),
          hoverPaintStyle: getInputEndpointStyle(
            nodeTypeData,
            "--color-primary",
            inputName
          ),
          scope: getScope(scope),
          source: inputName !== NodeConnectionType.Main,
          target: !this.isReadOnly && inputs.length > 1,
          // only enabled for nodes with multiple inputs.. otherwise attachment handled by connectionDrag event in NodeView,
          parameters: {
            connection: "target",
            nodeId: this.nodeId,
            type: inputName,
            index: typeIndex
          },
          enabled: !this.isReadOnly,
          // enabled in default case to allow dragging
          cssClass: "rect-input-endpoint",
          dragAllowedWhenFull: true,
          hoverClass: "rect-input-endpoint-hover",
          ...this.__getInputConnectionStyle(inputName, nodeTypeData)
        };
        const endpoint = (_a = this.instance) == null ? void 0 : _a.addEndpoint(
          this.$refs[this.data.name],
          newEndpointData
        );
        this.__addEndpointTestingData(endpoint, "input", typeIndex);
        if (inputConfiguration.displayName || ((_b = nodeTypeData.inputNames) == null ? void 0 : _b[i])) {
          endpoint.addOverlay(
            getInputNameOverlay(
              inputConfiguration.displayName || nodeTypeData.inputNames[i],
              inputName,
              inputConfiguration.required
            )
          );
        }
        if (!Array.isArray(endpoint)) {
          endpoint.__meta = {
            nodeName: node.name,
            nodeId: this.nodeId,
            index: typeIndex,
            totalEndpoints: inputsOfSameRootType.length,
            nodeType: node.type
          };
        }
      });
      if (sortedInputs.length === 0) {
        this.instance.manage(this.$refs[this.data.name]);
      }
    },
    getSpacerIndexes(leftGroupItemsCount, rightGroupItemsCount, insertSpacerBetweenGroups = NODE_INSERT_SPACER_BETWEEN_INPUT_GROUPS, minItemsCount = NODE_MIN_INPUT_ITEMS_COUNT) {
      const spacerIndexes = [];
      if (leftGroupItemsCount > 0 && rightGroupItemsCount > 0) {
        if (insertSpacerBetweenGroups) {
          spacerIndexes.push(leftGroupItemsCount);
        } else if (leftGroupItemsCount + rightGroupItemsCount < minItemsCount) {
          for (let spacerIndex = leftGroupItemsCount; spacerIndex < minItemsCount - rightGroupItemsCount; spacerIndex++) {
            spacerIndexes.push(spacerIndex);
          }
        }
      } else {
        if (leftGroupItemsCount > 0 && leftGroupItemsCount < minItemsCount && rightGroupItemsCount === 0) {
          for (let spacerIndex = 0; spacerIndex < minItemsCount - leftGroupItemsCount; spacerIndex++) {
            spacerIndexes.push(spacerIndex + leftGroupItemsCount);
          }
        } else if (leftGroupItemsCount === 0 && rightGroupItemsCount > 0 && rightGroupItemsCount < minItemsCount) {
          for (let spacerIndex = 0; spacerIndex < minItemsCount - rightGroupItemsCount; spacerIndex++) {
            spacerIndexes.push(spacerIndex);
          }
        }
      }
      return spacerIndexes;
    },
    __addOutputEndpoints(node, nodeTypeData) {
      const rootTypeIndexData = {};
      const typeIndexData = {};
      const workflow = this.workflowsStore.getCurrentWorkflow();
      this.outputs = getNodeOutputs(workflow, this.data, nodeTypeData) || [];
      let maxLabelLength = 0;
      const outputConfigurations = [];
      this.outputs.forEach((value, i) => {
        var _a;
        let outputConfiguration;
        if (typeof value === "string") {
          outputConfiguration = {
            type: value
          };
        } else {
          outputConfiguration = value;
        }
        if ((_a = nodeTypeData.outputNames) == null ? void 0 : _a[i]) {
          outputConfiguration.displayName = nodeTypeData.outputNames[i];
        }
        if (outputConfiguration.displayName) {
          maxLabelLength = outputConfiguration.displayName.length > maxLabelLength ? outputConfiguration.displayName.length : maxLabelLength;
        }
        outputConfigurations.push(outputConfiguration);
      });
      const endpointLabelLength = maxLabelLength < 4 ? "short" : "medium";
      this.outputs.forEach((value, i) => {
        const outputConfiguration = outputConfigurations[i];
        const outputName = outputConfiguration.type;
        const rootCategoryOutputName = outputName === NodeConnectionType.Main ? NodeConnectionType.Main : "other";
        if (rootTypeIndexData.hasOwnProperty(rootCategoryOutputName)) {
          rootTypeIndexData[rootCategoryOutputName]++;
        } else {
          rootTypeIndexData[rootCategoryOutputName] = 0;
        }
        if (typeIndexData.hasOwnProperty(outputName)) {
          typeIndexData[outputName]++;
        } else {
          typeIndexData[outputName] = 0;
        }
        const rootTypeIndex = rootTypeIndexData[rootCategoryOutputName];
        const typeIndex = typeIndexData[outputName];
        const outputsOfSameRootType = this.outputs.filter((outputData) => {
          const thisOutputName = typeof outputData === "string" ? outputData : outputData.type;
          return outputName === NodeConnectionType.Main ? thisOutputName === NodeConnectionType.Main : thisOutputName !== NodeConnectionType.Main;
        });
        const anchorPosition = getAnchorPosition(
          outputName,
          "output",
          outputsOfSameRootType.length
        )[rootTypeIndex];
        const scope = getEndpointScope(outputName);
        const newEndpointData = {
          uuid: getOutputEndpointUUID(this.nodeId, outputName, typeIndex),
          anchor: anchorPosition,
          maxConnections: -1,
          endpoint: {
            type: "Dot",
            options: {
              radius: nodeTypeData && outputsOfSameRootType.length > 2 ? 7 : 9
            }
          },
          hoverPaintStyle: getOutputEndpointStyle(nodeTypeData, "--color-primary"),
          scope,
          source: true,
          target: outputName !== NodeConnectionType.Main,
          enabled: !this.isReadOnly,
          parameters: {
            connection: "source",
            nodeId: this.nodeId,
            type: outputName,
            index: typeIndex
          },
          hoverClass: "dot-output-endpoint-hover",
          connectionsDirected: true,
          dragAllowedWhenFull: false,
          ...this.__getOutputConnectionStyle(outputName, outputConfiguration, nodeTypeData)
        };
        const endpoint = this.instance.addEndpoint(
          this.$refs[this.data.name],
          newEndpointData
        );
        this.__addEndpointTestingData(endpoint, "output", typeIndex);
        if (outputConfiguration.displayName) {
          const overlaySpec = getOutputNameOverlay(
            outputConfiguration.displayName,
            outputName,
            outputConfiguration == null ? void 0 : outputConfiguration.category
          );
          endpoint.addOverlay(overlaySpec);
        }
        if (!Array.isArray(endpoint)) {
          endpoint.__meta = {
            nodeName: node.name,
            nodeId: this.nodeId,
            index: typeIndex,
            totalEndpoints: outputsOfSameRootType.length,
            endpointLabelLength
          };
        }
        if (!this.isReadOnly && outputName === NodeConnectionType.Main) {
          const plusEndpointData = {
            uuid: getOutputEndpointUUID(this.nodeId, outputName, typeIndex),
            anchor: anchorPosition,
            maxConnections: -1,
            endpoint: {
              type: "N8nPlus",
              options: {
                dimensions: 24,
                connectedEndpoint: endpoint,
                showOutputLabel: this.outputs.length === 1,
                size: this.outputs.length >= 3 ? "small" : "medium",
                endpointLabelLength,
                hoverMessage: this.$locale.baseText("nodeBase.clickToAddNodeOrDragToConnect")
              }
            },
            source: true,
            target: false,
            enabled: !this.isReadOnly,
            paintStyle: {
              outlineStroke: "none"
            },
            hoverPaintStyle: {
              outlineStroke: "none"
            },
            parameters: {
              connection: "source",
              nodeId: this.nodeId,
              type: outputName,
              index: typeIndex,
              category: outputConfiguration == null ? void 0 : outputConfiguration.category
            },
            cssClass: "plus-draggable-endpoint",
            dragAllowedWhenFull: false
          };
          if (outputConfiguration == null ? void 0 : outputConfiguration.category) {
            plusEndpointData.cssClass = `${plusEndpointData.cssClass} ${outputConfiguration == null ? void 0 : outputConfiguration.category}`;
          }
          const plusEndpoint = this.instance.addEndpoint(
            this.$refs[this.data.name],
            plusEndpointData
          );
          this.__addEndpointTestingData(plusEndpoint, "plus", typeIndex);
          if (!Array.isArray(plusEndpoint)) {
            plusEndpoint.__meta = {
              nodeName: node.name,
              nodeId: this.nodeId,
              index: typeIndex,
              nodeType: node.type,
              totalEndpoints: outputsOfSameRootType.length
            };
          }
        }
      });
    },
    __addNode(node) {
      const nodeTypeData = this.nodeTypesStore.getNodeType(node.type, node.typeVersion) ?? this.nodeTypesStore.getNodeType(NO_OP_NODE_TYPE);
      this.__addInputEndpoints(node, nodeTypeData);
      this.__addOutputEndpoints(node, nodeTypeData);
    },
    __getEndpointColor(connectionType) {
      return `--node-type-${connectionType}-color`;
    },
    __getInputConnectionStyle(connectionType, nodeTypeData) {
      if (connectionType === NodeConnectionType.Main) {
        return {
          paintStyle: getInputEndpointStyle(
            nodeTypeData,
            this.__getEndpointColor(NodeConnectionType.Main),
            connectionType
          )
        };
      }
      if (!Object.values(NodeConnectionType).includes(connectionType)) {
        return {};
      }
      const createSupplementalConnectionType = (connectionName) => ({
        endpoint: createAddInputEndpointSpec(
          connectionName,
          this.__getEndpointColor(connectionName)
        )
      });
      return createSupplementalConnectionType(connectionType);
    },
    __getOutputConnectionStyle(connectionType, outputConfiguration, nodeTypeData) {
      const type = "output";
      const createSupplementalConnectionType = (connectionName) => ({
        endpoint: createDiamondOutputEndpointSpec(),
        paintStyle: getOutputEndpointStyle(
          nodeTypeData,
          this.__getEndpointColor(connectionName)
        ),
        hoverPaintStyle: getOutputEndpointStyle(
          nodeTypeData,
          this.__getEndpointColor(connectionName)
        )
      });
      if (connectionType === NodeConnectionType.Main) {
        if (outputConfiguration.category === "error") {
          return {
            paintStyle: {
              ...getOutputEndpointStyle(
                nodeTypeData,
                this.__getEndpointColor(NodeConnectionType.Main)
              ),
              fill: "var(--node-error-output-color)"
            },
            cssClass: `dot-${type}-endpoint`
          };
        }
        return {
          paintStyle: getOutputEndpointStyle(
            nodeTypeData,
            this.__getEndpointColor(NodeConnectionType.Main)
          ),
          cssClass: `dot-${type}-endpoint`
        };
      }
      if (!Object.values(NodeConnectionType).includes(connectionType)) {
        return {};
      }
      return createSupplementalConnectionType(connectionType);
    },
    touchEnd(e) {
      if (this.isTouchDevice) {
        if (this.uiStore.isActionActive("dragActive")) {
          this.uiStore.removeActiveAction("dragActive");
        }
      }
    },
    mouseLeftClick(e) {
      const path = e.path || e.composedPath && e.composedPath();
      for (let index = 0; index < path.length; index++) {
        if (path[index].className && typeof path[index].className === "string" && path[index].className.includes("no-select-on-click")) {
          return;
        }
      }
      if (!this.isTouchDevice) {
        if (this.uiStore.isActionActive("dragActive")) {
          this.uiStore.removeActiveAction("dragActive");
        } else {
          if (!this.isCtrlKeyPressed(e)) {
            this.$emit("deselectAllNodes");
          }
          if (this.uiStore.isNodeSelected(this.data.name)) {
            this.$emit("deselectNode", this.name);
          } else {
            this.$emit("nodeSelected", this.name);
          }
        }
      }
    }
  }
});
const _sfc_main$3 = defineComponent({
  name: "Node",
  mixins: [externalHooks, nodeBase, nodeHelpers, workflowHelpers, pinData, debounceHelper],
  components: {
    TitledList,
    FontAwesomeIcon,
    NodeIcon
  },
  props: {
    isProductionExecutionPreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useUIStore, useWorkflowsStore),
    showPinnedDataInfo() {
      return this.hasPinData && !this.isProductionExecutionPreview;
    },
    isDuplicatable() {
      if (!this.nodeType)
        return true;
      if (NOT_DUPLICATABE_NODE_TYPES.includes(this.nodeType.name))
        return false;
      return this.nodeType.maxNodes === void 0 || this.sameTypeNodes.length < this.nodeType.maxNodes;
    },
    isScheduledGroup() {
      var _a;
      return ((_a = this.nodeType) == null ? void 0 : _a.group.includes("schedule")) === true;
    },
    iconColorDefault() {
      if (this.isConfigNode) {
        return "var(--color-text-base)";
      }
      return void 0;
    },
    nodeRunData() {
      var _a;
      return this.workflowsStore.getWorkflowResultDataByNodeName(((_a = this.data) == null ? void 0 : _a.name) || "") || [];
    },
    hasIssues() {
      var _a;
      if (this.nodeExecutionStatus && ["crashed", "error", "failed"].includes(this.nodeExecutionStatus))
        return true;
      if (this.hasPinData)
        return false;
      if (((_a = this.data) == null ? void 0 : _a.issues) !== void 0 && Object.keys(this.data.issues).length) {
        return true;
      }
      return false;
    },
    workflowDataItems() {
      const workflowResultDataNode = this.nodeRunData;
      if (workflowResultDataNode === null) {
        return 0;
      }
      return workflowResultDataNode.length;
    },
    canvasOffsetPosition() {
      return this.uiStore.nodeViewOffsetPosition;
    },
    getTriggerNodeTooltip() {
      if (this.nodeType !== null && this.nodeType.hasOwnProperty("eventTriggerDescription")) {
        const nodeName = this.$locale.shortNodeType(this.nodeType.name);
        const { eventTriggerDescription } = this.nodeType;
        return this.$locale.nodeText().eventTriggerDescription(nodeName, eventTriggerDescription || "");
      } else {
        return this.$locale.baseText("node.waitingForYouToCreateAnEventIn", {
          interpolate: {
            nodeType: this.nodeType ? getTriggerNodeServiceName(this.nodeType) : ""
          }
        });
      }
    },
    isPollingTypeNode() {
      return !!(this.nodeType && this.nodeType.polling);
    },
    isExecuting() {
      return this.workflowsStore.isNodeExecuting(this.data.name);
    },
    isSingleActiveTriggerNode() {
      const nodes = this.workflowsStore.workflowTriggerNodes.filter((node) => {
        const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
        return nodeType && nodeType.eventTriggerDescription !== "" && !node.disabled;
      });
      return nodes.length === 1;
    },
    isManualTypeNode() {
      return this.data.type === MANUAL_TRIGGER_NODE_TYPE;
    },
    isConfigNode() {
      var _a;
      return this.nodeTypesStore.isConfigNode(
        this.getCurrentWorkflow(),
        this.data,
        ((_a = this.data) == null ? void 0 : _a.type) ?? ""
      );
    },
    isConfigurableNode() {
      var _a;
      return this.nodeTypesStore.isConfigurableNode(
        this.getCurrentWorkflow(),
        this.data,
        ((_a = this.data) == null ? void 0 : _a.type) ?? ""
      );
    },
    isTriggerNode() {
      var _a;
      return this.nodeTypesStore.isTriggerNode(((_a = this.data) == null ? void 0 : _a.type) || "");
    },
    isTriggerNodeTooltipEmpty() {
      return this.nodeType !== null ? this.nodeType.eventTriggerDescription === "" : false;
    },
    isNodeDisabled() {
      return this.node && this.node.disabled;
    },
    nodeType() {
      return this.data && this.nodeTypesStore.getNodeType(this.data.type, this.data.typeVersion);
    },
    node() {
      return this.workflowsStore.nodesByName[this.name];
    },
    sameTypeNodes() {
      return this.workflowsStore.allNodes.filter((node) => node.type === this.data.type);
    },
    nodeWrapperClass() {
      const classes = {
        "node-wrapper": true,
        "node-wrapper--trigger": this.isTriggerNode,
        "node-wrapper--configurable": this.isConfigurableNode,
        "node-wrapper--config": this.isConfigNode
      };
      if (this.outputs.length) {
        const outputTypes = getConnectionTypes(this.outputs);
        const otherOutputs = outputTypes.filter(
          (outputName) => outputName !== NodeConnectionType.Main
        );
        if (otherOutputs.length) {
          otherOutputs.forEach((outputName) => {
            classes[`node-wrapper--connection-type-${outputName}`] = true;
          });
        }
      }
      return classes;
    },
    nodeWrapperStyles() {
      const styles = {
        left: this.position[0] + "px",
        top: this.position[1] + "px"
      };
      if (this.node && this.nodeType) {
        const workflow = this.workflowsStore.getCurrentWorkflow();
        const inputs = getNodeInputs(workflow, this.node, this.nodeType) || [];
        const inputTypes = getConnectionTypes(inputs);
        const nonMainInputs = inputTypes.filter((input) => input !== NodeConnectionType.Main);
        if (nonMainInputs.length) {
          const requiredNonMainInputs = inputs.filter(
            (input) => typeof input !== "string" && input.required
          );
          let spacerCount = 0;
          if (NODE_INSERT_SPACER_BETWEEN_INPUT_GROUPS) {
            const requiredNonMainInputsCount = requiredNonMainInputs.length;
            const optionalNonMainInputsCount = nonMainInputs.length - requiredNonMainInputsCount;
            spacerCount = requiredNonMainInputsCount > 0 && optionalNonMainInputsCount > 0 ? 1 : 0;
          }
          styles["--configurable-node-input-count"] = nonMainInputs.length + spacerCount;
        }
        const outputs = getNodeOutputs(workflow, this.node, this.nodeType) || [];
        const outputTypes = getConnectionTypes(outputs);
        const mainOutputs = outputTypes.filter((output) => output === NodeConnectionType.Main);
        styles["--node-main-output-count"] = mainOutputs.length;
      }
      return styles;
    },
    nodeClass() {
      return {
        "node-box": true,
        disabled: this.data.disabled,
        executing: this.isExecuting
      };
    },
    nodeExecutionStatus() {
      var _a;
      const nodeExecutionRunData = (_a = this.workflowsStore.getWorkflowRunData) == null ? void 0 : _a[this.name];
      if (nodeExecutionRunData) {
        return nodeExecutionRunData[0].executionStatus ?? "";
      }
      return "";
    },
    nodeIssues() {
      var _a, _b;
      const issues = [];
      const nodeExecutionRunData = (_a = this.workflowsStore.getWorkflowRunData) == null ? void 0 : _a[this.name];
      if (nodeExecutionRunData) {
        nodeExecutionRunData.forEach((executionRunData) => {
          if (executionRunData.error) {
            issues.push(
              `${executionRunData.error.message}${executionRunData.error.description ? ` (${executionRunData.error.description})` : ""}`
            );
          }
        });
      }
      if (((_b = this.data) == null ? void 0 : _b.issues) !== void 0) {
        issues.push(...nodeIssuesToString(this.data.issues, this.data));
      }
      return issues;
    },
    nodeDisabledIcon() {
      if (this.data.disabled === false) {
        return "pause";
      } else {
        return "play";
      }
    },
    position() {
      return this.node ? this.node.position : [0, 0];
    },
    showDisabledLinethrough() {
      return !!(this.data.disabled && this.inputs.length === 1 && this.outputs.length === 1);
    },
    shortNodeType() {
      return this.$locale.shortNodeType(this.data.type);
    },
    nodeTitle() {
      if (this.data.name === "Start") {
        return this.$locale.headerText({
          key: "headers.start.displayName",
          fallback: "Start"
        });
      }
      return this.data.name;
    },
    waiting() {
      const workflowExecution = this.workflowsStore.getWorkflowExecution;
      if (workflowExecution == null ? void 0 : workflowExecution.waitTill) {
        const lastNodeExecuted = get(workflowExecution, "data.resultData.lastNodeExecuted");
        if (this.name === lastNodeExecuted) {
          const waitDate = new Date(workflowExecution.waitTill);
          if (waitDate.toISOString() === WAIT_TIME_UNLIMITED) {
            return this.$locale.baseText(
              "node.theNodeIsWaitingIndefinitelyForAnIncomingWebhookCall"
            );
          }
          return this.$locale.baseText("node.nodeIsWaitingTill", {
            interpolate: {
              date: waitDate.toLocaleDateString(),
              time: waitDate.toLocaleTimeString()
            }
          });
        }
      }
      return void 0;
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    nodeStyle() {
      const returnStyles = {};
      let borderColor = "--color-foreground-xdark";
      if (this.isConfigurableNode || this.isConfigNode) {
        borderColor = "--color-foreground-dark";
      }
      if (this.data.disabled) {
        borderColor = "--color-foreground-base";
      } else if (!this.isExecuting) {
        if (this.hasIssues) {
          borderColor = "--color-danger";
          returnStyles["border-width"] = "2px";
          returnStyles["border-style"] = "solid";
        } else if (this.waiting || this.showPinnedDataInfo) {
          borderColor = "--color-canvas-node-pinned-border";
        } else if (this.nodeExecutionStatus === "unknown") {
          borderColor = "--color-foreground-xdark";
        } else if (this.workflowDataItems) {
          returnStyles["border-width"] = "2px";
          returnStyles["border-style"] = "solid";
          borderColor = "--color-success";
        }
      }
      returnStyles["border-color"] = `var(${borderColor})`;
      return returnStyles;
    },
    isSelected() {
      return this.uiStore.getSelectedNodes.find((node) => node.name === this.data.name) !== void 0;
    },
    shiftOutputCount() {
      return !!(this.nodeType && this.outputs.length > 2);
    },
    shouldShowTriggerTooltip() {
      return !!this.node && this.isTriggerNode && !this.isPollingTypeNode && !this.hasPinData && !this.isNodeDisabled && this.workflowRunning && this.workflowDataItems === 0 && this.isSingleActiveTriggerNode && !this.isTriggerNodeTooltipEmpty && !this.hasIssues && !this.dragging;
    }
  },
  watch: {
    isActive(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.setSubtitle();
      }
    },
    canvasOffsetPosition() {
      if (this.showTriggerNodeTooltip) {
        this.showTriggerNodeTooltip = false;
        setTimeout(() => {
          this.showTriggerNodeTooltip = this.shouldShowTriggerTooltip;
        }, 200);
      }
      if (this.pinDataDiscoveryTooltipVisible) {
        this.pinDataDiscoveryTooltipVisible = false;
        setTimeout(() => {
          this.pinDataDiscoveryTooltipVisible = true;
        }, 200);
      }
    },
    shouldShowTriggerTooltip(shouldShowTriggerTooltip) {
      if (shouldShowTriggerTooltip) {
        setTimeout(() => {
          this.showTriggerNodeTooltip = this.shouldShowTriggerTooltip;
        }, 2500);
      } else {
        this.showTriggerNodeTooltip = false;
      }
    },
    nodeRunData(newValue) {
      if (!this.data) {
        return;
      }
      this.$emit("run", { name: this.data.name, data: newValue, waiting: !!this.waiting });
    }
  },
  created() {
    const hasSeenPinDataTooltip = useStorage(LOCAL_STORAGE_PIN_DATA_DISCOVERY_CANVAS_FLAG).value;
    if (!hasSeenPinDataTooltip) {
      this.unwatchWorkflowDataItems = this.$watch("workflowDataItems", (dataItemsCount) => {
        this.showPinDataDiscoveryTooltip(dataItemsCount);
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.setSubtitle();
    }, 0);
    if (this.nodeRunData) {
      setTimeout(() => {
        this.$emit("run", {
          name: this.data && this.data.name,
          data: this.nodeRunData,
          waiting: !!this.waiting
        });
      }, 0);
    }
  },
  data() {
    return {
      isTouchActive: false,
      nodeSubtitle: "",
      showTriggerNodeTooltip: false,
      pinDataDiscoveryTooltipVisible: false,
      dragging: false,
      unwatchWorkflowDataItems: () => {
      }
    };
  },
  methods: {
    showPinDataDiscoveryTooltip(dataItemsCount) {
      if (!this.isTriggerNode || this.isManualTypeNode || this.isScheduledGroup || dataItemsCount === 0)
        return;
      useStorage(LOCAL_STORAGE_PIN_DATA_DISCOVERY_CANVAS_FLAG).value = "true";
      this.pinDataDiscoveryTooltipVisible = true;
      this.unwatchWorkflowDataItems();
    },
    setSubtitle() {
      try {
        const nodeSubtitle = this.getNodeSubtitle(this.data, this.nodeType, this.getCurrentWorkflow()) || "";
        this.nodeSubtitle = nodeSubtitle.includes(CUSTOM_API_CALL_KEY) ? "" : nodeSubtitle;
      } catch (e) {
      }
    },
    disableNode() {
      if (this.data !== null) {
        this.disableNodes([this.data]);
        this.historyStore.pushCommandToUndo(
          new EnableNodeToggleCommand(
            this.data.name,
            !this.data.disabled,
            this.data.disabled === true
          )
        );
        this.$telemetry.track("User clicked node hover button", {
          node_type: this.data.type,
          button_name: "disable",
          workflow_id: this.workflowsStore.workflowId
        });
      }
    },
    executeNode() {
      this.$emit("runWorkflow", this.data.name, "Node.executeNode");
      this.$telemetry.track("User clicked node hover button", {
        node_type: this.data.type,
        button_name: "execute",
        workflow_id: this.workflowsStore.workflowId
      });
    },
    async deleteNode() {
      this.$telemetry.track("User clicked node hover button", {
        node_type: this.data.type,
        button_name: "delete",
        workflow_id: this.workflowsStore.workflowId
      });
      await this.$nextTick();
      this.$emit("removeNode", this.data.name);
    },
    async duplicateNode() {
      this.$telemetry.track("User clicked node hover button", {
        node_type: this.data.type,
        button_name: "duplicate",
        workflow_id: this.workflowsStore.workflowId
      });
      await this.$nextTick();
      this.$emit("duplicateNode", this.data.name);
    },
    onClick(event) {
      void this.callDebounced("onClickDebounced", { debounceTime: 50, trailing: true }, event);
    },
    onClickDebounced(event) {
      const isDoubleClick = event.detail >= 2;
      if (isDoubleClick) {
        this.setNodeActive();
      } else {
        this.mouseLeftClick(event);
      }
    },
    setNodeActive() {
      this.ndvStore.activeNodeName = this.data ? this.data.name : "";
      this.pinDataDiscoveryTooltipVisible = false;
    },
    touchStart() {
      if (this.isTouchDevice === true && !this.isMacOs && !this.isTouchActive) {
        this.isTouchActive = true;
        setTimeout(() => {
          this.isTouchActive = false;
        }, 2e3);
      }
    }
  }
});
const Node_vue_vue_type_style_index_0_scoped_064e8b83_lang = "";
const Node_vue_vue_type_style_index_1_lang = "";
const Node_vue_vue_type_style_index_2_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-064e8b83"), n = n(), popScopeId(), n);
const _hoisted_1$3 = ["id", "data-name"];
const _hoisted_2$2 = { class: "select-background" };
const _hoisted_3$1 = {
  key: 0,
  class: "trigger-icon"
};
const _hoisted_4$1 = ["innerHTML"];
const _hoisted_5$1 = {
  key: 0,
  class: "node-issues",
  "data-test-id": "node-issues"
};
const _hoisted_6$1 = {
  key: 1,
  class: "waiting"
};
const _hoisted_7 = ["textContent"];
const _hoisted_8 = {
  key: 2,
  class: "node-pin-data-icon"
};
const _hoisted_9 = {
  key: 0,
  class: "items-count"
};
const _hoisted_10 = { key: 3 };
const _hoisted_11 = {
  key: 4,
  class: "data-count"
};
const _hoisted_12 = {
  key: 0,
  class: "items-count"
};
const _hoisted_13 = ["title"];
const _hoisted_14 = { class: "node-trigger-tooltip__wrapper" };
const _hoisted_15 = ["textContent"];
const _hoisted_16 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, null, -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, null, -1));
const _hoisted_18 = {
  key: 0,
  class: "node-options no-select-on-click"
};
const _hoisted_19 = ["title"];
const _hoisted_20 = ["title"];
const _hoisted_21 = ["title"];
const _hoisted_22 = ["title"];
const _hoisted_23 = ["title"];
const _hoisted_24 = { class: "node-description" };
const _hoisted_25 = ["title"];
const _hoisted_26 = { "data-test-id": "canvas-node-box-title" };
const _hoisted_27 = { key: 0 };
const _hoisted_28 = ["title"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_titled_list = resolveComponent("titled-list");
  const _component_NodeIcon = resolveComponent("NodeIcon");
  const _directive_touch = resolveDirective("touch");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.nodeWrapperClass),
    style: normalizeStyle(_ctx.nodeWrapperStyles),
    id: _ctx.nodeId,
    "data-test-id": "canvas-node",
    ref: _ctx.data.name,
    "data-name": _ctx.data.name
  }, [
    withDirectives(createBaseVNode("div", _hoisted_2$2, null, 512), [
      [vShow, _ctx.isSelected]
    ]),
    createBaseVNode("div", {
      class: normalizeClass({
        "node-default": true,
        "touch-active": _ctx.isTouchActive,
        "is-touch-device": _ctx.isTouchDevice
      })
    }, [
      withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.nodeClass),
        style: normalizeStyle(_ctx.nodeStyle),
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.onClick && _ctx.onClick(...args), ["left"]))
      }, [
        _ctx.isTriggerNode ? (openBlock(), createElementBlock("i", _hoisted_3$1, [
          createVNode(_component_n8n_tooltip, { placement: "bottom" }, {
            content: withCtx(() => [
              createBaseVNode("span", {
                innerHTML: _ctx.$locale.baseText("node.thisIsATriggerNode")
              }, null, 8, _hoisted_4$1)
            ]),
            default: withCtx(() => [
              createVNode(_component_font_awesome_icon, {
                icon: "bolt",
                size: "lg"
              })
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        !_ctx.data.disabled ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass({ "node-info-icon": true, "shift-icon": _ctx.shiftOutputCount })
        }, [
          _ctx.hasIssues ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
            createVNode(_component_n8n_tooltip, { placement: "bottom" }, {
              content: withCtx(() => [
                createVNode(_component_titled_list, {
                  title: `${_ctx.$locale.baseText("node.issues")}:`,
                  items: _ctx.nodeIssues
                }, null, 8, ["title", "items"])
              ]),
              default: withCtx(() => [
                createVNode(_component_font_awesome_icon, { icon: "exclamation-triangle" })
              ]),
              _: 1
            })
          ])) : _ctx.waiting || _ctx.nodeExecutionStatus === "waiting" ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
            createVNode(_component_n8n_tooltip, { placement: "bottom" }, {
              content: withCtx(() => [
                createBaseVNode("div", {
                  textContent: toDisplayString(_ctx.waiting)
                }, null, 8, _hoisted_7)
              ]),
              default: withCtx(() => [
                createVNode(_component_font_awesome_icon, { icon: "clock" })
              ]),
              _: 1
            })
          ])) : _ctx.showPinnedDataInfo ? (openBlock(), createElementBlock("span", _hoisted_8, [
            createVNode(_component_font_awesome_icon, { icon: "thumbtack" }),
            _ctx.workflowDataItems > 1 ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(_ctx.workflowDataItems), 1)) : createCommentVNode("", true)
          ])) : _ctx.nodeExecutionStatus === "unknown" ? (openBlock(), createElementBlock("span", _hoisted_10)) : _ctx.workflowDataItems ? (openBlock(), createElementBlock("span", _hoisted_11, [
            createVNode(_component_font_awesome_icon, { icon: "check" }),
            _ctx.workflowDataItems > 1 ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(_ctx.workflowDataItems), 1)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "node-executing-info",
          title: _ctx.$locale.baseText("node.nodeIsExecuting")
        }, [
          createVNode(_component_font_awesome_icon, {
            icon: "sync-alt",
            spin: ""
          })
        ], 8, _hoisted_13),
        createBaseVNode("div", _hoisted_14, [
          createVNode(_component_n8n_tooltip, {
            placement: "top",
            visible: _ctx.showTriggerNodeTooltip,
            "popper-class": "node-trigger-tooltip__wrapper--item"
          }, {
            content: withCtx(() => [
              createBaseVNode("div", {
                textContent: toDisplayString(_ctx.getTriggerNodeTooltip)
              }, null, 8, _hoisted_15)
            ]),
            default: withCtx(() => [
              _hoisted_16
            ]),
            _: 1
          }, 8, ["visible"]),
          _ctx.isTriggerNode ? (openBlock(), createBlock(_component_n8n_tooltip, {
            key: 0,
            placement: "top",
            visible: _ctx.pinDataDiscoveryTooltipVisible,
            "popper-class": "node-trigger-tooltip__wrapper--item"
          }, {
            content: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("node.discovery.pinData.canvas")), 1)
            ]),
            default: withCtx(() => [
              _hoisted_17
            ]),
            _: 1
          }, 8, ["visible"])) : createCommentVNode("", true)
        ]),
        createVNode(_component_NodeIcon, {
          class: "node-icon",
          nodeType: _ctx.nodeType,
          size: 40,
          shrink: false,
          colorDefault: _ctx.iconColorDefault,
          disabled: this.data.disabled
        }, null, 8, ["nodeType", "colorDefault", "disabled"])
      ], 6)), [
        [_directive_touch, _ctx.touchStart, "start"],
        [_directive_touch, _ctx.touchEnd, "end"]
      ]),
      !_ctx.isReadOnly ? withDirectives((openBlock(), createElementBlock("div", _hoisted_18, [
        withDirectives((openBlock(), createElementBlock("div", {
          class: "option",
          title: _ctx.$locale.baseText("node.deleteNode"),
          "data-test-id": "delete-node-button"
        }, [
          createVNode(_component_font_awesome_icon, { icon: "trash" })
        ], 8, _hoisted_19)), [
          [_directive_touch, _ctx.deleteNode, "tap"]
        ]),
        withDirectives((openBlock(), createElementBlock("div", {
          class: "option",
          title: _ctx.$locale.baseText("node.activateDeactivateNode"),
          "data-test-id": "disable-node-button"
        }, [
          createVNode(_component_font_awesome_icon, { icon: _ctx.nodeDisabledIcon }, null, 8, ["icon"])
        ], 8, _hoisted_20)), [
          [_directive_touch, _ctx.disableNode, "tap"]
        ]),
        _ctx.isDuplicatable ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: "option",
          title: _ctx.$locale.baseText("node.duplicateNode"),
          "data-test-id": "duplicate-node-button"
        }, [
          createVNode(_component_font_awesome_icon, { icon: "clone" })
        ], 8, _hoisted_21)), [
          [_directive_touch, _ctx.duplicateNode, "tap"]
        ]) : createCommentVNode("", true),
        withDirectives((openBlock(), createElementBlock("div", {
          class: "option touch",
          title: _ctx.$locale.baseText("node.editNode"),
          "data-test-id": "activate-node-button"
        }, [
          createVNode(_component_font_awesome_icon, {
            class: "execute-icon",
            icon: "cog"
          })
        ], 8, _hoisted_22)), [
          [_directive_touch, _ctx.setNodeActive, "tap"]
        ]),
        !_ctx.workflowRunning && !_ctx.isConfigNode ? withDirectives((openBlock(), createElementBlock("div", {
          key: 1,
          class: "option",
          title: _ctx.$locale.baseText("node.executeNode"),
          "data-test-id": "execute-node-button"
        }, [
          createVNode(_component_font_awesome_icon, {
            class: "execute-icon",
            icon: "play-circle"
          })
        ], 8, _hoisted_23)), [
          [_directive_touch, _ctx.executeNode, "tap"]
        ]) : createCommentVNode("", true)
      ], 512)), [
        [vShow, !_ctx.hideActions]
      ]) : createCommentVNode("", true),
      _ctx.showDisabledLinethrough ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass({
          "disabled-linethrough": true,
          success: !["unknown"].includes(_ctx.nodeExecutionStatus) && _ctx.workflowDataItems > 0
        })
      }, null, 2)) : createCommentVNode("", true)
    ], 2),
    createBaseVNode("div", _hoisted_24, [
      createBaseVNode("div", {
        class: "node-name",
        title: _ctx.nodeTitle
      }, [
        createBaseVNode("p", _hoisted_26, toDisplayString(_ctx.nodeTitle), 1),
        _ctx.data.disabled ? (openBlock(), createElementBlock("p", _hoisted_27, "(" + toDisplayString(_ctx.$locale.baseText("node.disabled")) + ")", 1)) : createCommentVNode("", true)
      ], 8, _hoisted_25),
      _ctx.nodeSubtitle !== void 0 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "node-subtitle",
        title: _ctx.nodeSubtitle
      }, toDisplayString(_ctx.nodeSubtitle), 9, _hoisted_28)) : createCommentVNode("", true)
    ])
  ], 14, _hoisted_1$3);
}
const Node = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-064e8b83"]]);
const _sfc_main$2 = defineComponent({
  name: "Sticky",
  mixins: [externalHooks, nodeBase, nodeHelpers, workflowHelpers],
  props: {
    nodeViewScale: {
      type: Number
    },
    gridSize: {
      type: Number
    }
  },
  computed: {
    ...mapStores(useNodeTypesStore, useNDVStore, useUIStore, useWorkflowsStore),
    defaultText() {
      if (!this.nodeType) {
        return "";
      }
      const properties = this.nodeType.properties;
      const content2 = properties.find((property) => property.name === "content");
      return content2 && isString(content2.default) ? content2.default : "";
    },
    isSelected() {
      return this.uiStore.getSelectedNodes.find((node) => node.name === this.data.name) !== void 0;
    },
    nodeType() {
      return this.data && this.nodeTypesStore.getNodeType(this.data.type, this.data.typeVersion);
    },
    node() {
      return this.workflowsStore.getNodeByName(this.name);
    },
    position() {
      if (this.node) {
        return this.node.position;
      } else {
        return [0, 0];
      }
    },
    height() {
      return this.node && isNumber(this.node.parameters.height) ? this.node.parameters.height : 0;
    },
    width() {
      return this.node && isNumber(this.node.parameters.width) ? this.node.parameters.width : 0;
    },
    stickySize() {
      const returnStyles = {
        height: this.height + "px",
        width: this.width + "px"
      };
      return returnStyles;
    },
    stickyPosition() {
      const returnStyles = {
        left: this.position[0] + "px",
        top: this.position[1] + "px",
        zIndex: this.isActive ? 9999999 : -1 * Math.floor(this.height * this.width / 1e3)
      };
      return returnStyles;
    },
    showActions() {
      return !(this.hideActions || this.isReadOnly || this.workflowRunning || this.isResizing) || this.forceActions;
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    }
  },
  data() {
    return {
      forceActions: false,
      isResizing: false,
      isTouchActive: false
    };
  },
  methods: {
    onShowPopover() {
      this.forceActions = true;
    },
    onHidePopover() {
      this.forceActions = false;
    },
    async deleteNode() {
      await this.$nextTick();
      this.$emit("removeNode", this.data.name);
    },
    changeColor(index) {
      this.workflowsStore.updateNodeProperties({
        name: this.name,
        properties: { parameters: { ...this.node.parameters, color: index } }
      });
    },
    onEdit(edit) {
      if (edit && !this.isActive && this.node) {
        this.ndvStore.activeNodeName = this.node.name;
      } else if (this.isActive && !edit) {
        this.ndvStore.activeNodeName = null;
      }
    },
    onMarkdownClick(link, event) {
      if (link) {
        const isOnboardingNote = this.name === QUICKSTART_NOTE_NAME;
        const isWelcomeVideo = link.querySelector('img[alt="n8n quickstart video"');
        const type = isOnboardingNote && isWelcomeVideo ? "welcome_video" : isOnboardingNote && link.getAttribute("href") === "/templates" ? "templates" : "other";
        this.$telemetry.track("User clicked note link", { type });
      }
    },
    onInputChange(content2) {
      this.node.parameters.content = content2;
      this.setParameters({ content: content2 });
    },
    onResizeStart() {
      this.isResizing = true;
      if (!this.isSelected && this.node) {
        this.$emit("nodeSelected", this.node.name, false, true);
      }
    },
    onResize({ height, width, dX, dY }) {
      if (!this.node) {
        return;
      }
      if (dX !== 0 || dY !== 0) {
        this.setPosition([this.node.position[0] + (dX || 0), this.node.position[1] + (dY || 0)]);
      }
      this.setParameters({ height, width });
    },
    onResizeEnd() {
      this.isResizing = false;
    },
    setParameters(params) {
      if (this.node) {
        const nodeParameters = {
          content: isString(params.content) ? params.content : this.node.parameters.content,
          height: isNumber(params.height) ? params.height : this.node.parameters.height,
          width: isNumber(params.width) ? params.width : this.node.parameters.width,
          color: isString(params.color) ? params.color : this.node.parameters.color
        };
        const updateInformation = {
          key: this.node.id,
          name: this.node.name,
          value: nodeParameters
        };
        this.workflowsStore.setNodeParameters(updateInformation);
      }
    },
    setPosition(position) {
      if (!this.node) {
        return;
      }
      const updateInformation = {
        name: this.node.name,
        properties: {
          position
        }
      };
      this.workflowsStore.updateNodeProperties(updateInformation);
    },
    touchStart() {
      if (this.isTouchDevice === true && !this.isMacOs && !this.isTouchActive) {
        this.isTouchActive = true;
        setTimeout(() => {
          this.isTouchActive = false;
        }, 2e3);
      }
    }
  }
});
const Sticky_vue_vue_type_style_index_0_scoped_c0e51ee9_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-c0e51ee9"), n = n(), popScopeId(), n);
const _hoisted_1$2 = ["id", "data-name"];
const _hoisted_2$1 = { class: "select-sticky-background" };
const _hoisted_3 = ["title"];
const _hoisted_4 = ["title"];
const _hoisted_5 = { class: "content" };
const _hoisted_6 = ["onClick"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_sticky = resolveComponent("n8n-sticky");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_popover = resolveComponent("n8n-popover");
  const _directive_touch = resolveDirective("touch");
  return openBlock(), createElementBlock("div", {
    class: "sticky-wrapper",
    id: _ctx.nodeId,
    ref: _ctx.data.name,
    style: normalizeStyle(_ctx.stickyPosition),
    "data-name": _ctx.data.name,
    "data-test-id": "sticky"
  }, [
    createBaseVNode("div", {
      class: normalizeClass({
        "sticky-default": true,
        "touch-active": _ctx.isTouchActive,
        "is-touch-device": _ctx.isTouchDevice
      }),
      style: normalizeStyle(_ctx.stickySize)
    }, [
      withDirectives(createBaseVNode("div", _hoisted_2$1, null, 512), [
        [vShow, _ctx.isSelected]
      ]),
      withDirectives((openBlock(), createElementBlock("div", {
        class: "sticky-box",
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.mouseLeftClick && _ctx.mouseLeftClick(...args), ["left"]))
      }, [
        createVNode(_component_n8n_sticky, {
          modelValue: _ctx.node.parameters.content,
          height: _ctx.node.parameters.height,
          width: _ctx.node.parameters.width,
          scale: _ctx.nodeViewScale,
          backgroundColor: _ctx.node.parameters.color,
          id: _ctx.node.id,
          readOnly: _ctx.isReadOnly,
          defaultText: _ctx.defaultText,
          editMode: _ctx.isActive && !_ctx.isReadOnly,
          gridSize: _ctx.gridSize,
          onEdit: _ctx.onEdit,
          onResizestart: _ctx.onResizeStart,
          onResize: _ctx.onResize,
          onResizeend: _ctx.onResizeEnd,
          onMarkdownClick: _ctx.onMarkdownClick,
          "onUpdate:modelValue": _ctx.onInputChange
        }, null, 8, ["modelValue", "height", "width", "scale", "backgroundColor", "id", "readOnly", "defaultText", "editMode", "gridSize", "onEdit", "onResizestart", "onResize", "onResizeend", "onMarkdownClick", "onUpdate:modelValue"])
      ])), [
        [_directive_touch, _ctx.touchStart, "start"],
        [_directive_touch, _ctx.touchEnd, "end"]
      ]),
      withDirectives(createBaseVNode("div", {
        class: normalizeClass({ "sticky-options": true, "no-select-on-click": true, "force-show": _ctx.forceActions })
      }, [
        withDirectives((openBlock(), createElementBlock("div", {
          class: "option",
          "data-test-id": "delete-sticky",
          title: _ctx.$locale.baseText("node.deleteNode")
        }, [
          createVNode(_component_font_awesome_icon, { icon: "trash" })
        ], 8, _hoisted_3)), [
          [_directive_touch, _ctx.deleteNode, "tap"]
        ]),
        createVNode(_component_n8n_popover, {
          effect: "dark",
          "popper-style": { width: "208px" },
          trigger: "click",
          placement: "top",
          onShow: _ctx.onShowPopover,
          onHide: _ctx.onHidePopover
        }, {
          reference: withCtx(() => [
            createBaseVNode("div", {
              class: "option",
              "data-test-id": "change-sticky-color",
              title: _ctx.$locale.baseText("node.changeColor")
            }, [
              createVNode(_component_font_awesome_icon, { icon: "palette" })
            ], 8, _hoisted_4)
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from({ length: 7 }), (_, index) => {
                var _a, _b;
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["color", `sticky-color-${index + 1}`]),
                  "data-test-id": "color",
                  key: index,
                  onClick: ($event) => _ctx.changeColor(index + 1),
                  style: normalizeStyle({
                    "border-width": "1px",
                    "border-style": "solid",
                    "border-color": "var(--color-foreground-xdark)",
                    "background-color": `var(--color-sticky-background-${index + 1})`,
                    "box-shadow": index === 0 && ((_a = _ctx.node) == null ? void 0 : _a.parameters.color) === "" || index + 1 === ((_b = _ctx.node) == null ? void 0 : _b.parameters.color) ? `0 0 0 1px var(--color-sticky-background-${index + 1})` : "none"
                  })
                }, null, 14, _hoisted_6);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["onShow", "onHide"])
      ], 2), [
        [vShow, _ctx.showActions]
      ])
    ], 6)
  ], 12, _hoisted_1$2);
}
const Sticky = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-c0e51ee9"]]);
const _hoisted_1$1 = ["textContent"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CanvasAddButton",
  props: {
    showTooltip: { type: Boolean },
    position: {}
  },
  setup(__props) {
    const props = __props;
    const nodeCreatorStore = useNodeCreatorStore();
    const containerCssVars = computed(() => ({
      "--trigger-placeholder-left-position": `${props.position[0]}px`,
      "--trigger-placeholder-top-position": `${props.position[1]}px`
    }));
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.canvasAddButton),
        style: normalizeStyle(containerCssVars.value),
        ref: "container",
        "data-test-id": "canvas-add-button"
      }, [
        createVNode(_component_n8n_tooltip, {
          placement: "top",
          visible: _ctx.showTooltip,
          disabled: unref(nodeCreatorStore).showScrim,
          "popper-class": _ctx.$style.tooltip,
          "show-after": 700
        }, {
          content: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeView.canvasAddButton.addATriggerNodeBeforeExecuting")), 1)
          ]),
          default: withCtx(() => [
            createBaseVNode("button", {
              class: normalizeClass(_ctx.$style.button),
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click")),
              "data-test-id": "canvas-plus-button"
            }, [
              createVNode(_component_font_awesome_icon, {
                icon: "plus",
                size: "lg"
              })
            ], 2)
          ]),
          _: 1
        }, 8, ["visible", "disabled", "popper-class"]),
        createBaseVNode("p", {
          class: normalizeClass(_ctx.$style.label),
          textContent: toDisplayString(_ctx.$locale.baseText("nodeView.canvasAddButton.addFirstStep"))
        }, null, 10, _hoisted_1$1)
      ], 6);
    };
  }
});
const canvasAddButton = "_canvasAddButton_mfxxv_5";
const button = "_button_mfxxv_17";
const label = "_label_mfxxv_38";
const style0 = {
  canvasAddButton,
  button,
  label
};
const cssModules$1 = {
  "$style": style0
};
const CanvasAddButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const KEYBOARD_ID_ATTR = "data-keyboard-nav-id";
const WATCHED_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  "Escape",
  "Tab"
];
const useKeyboardNavigation = defineStore("nodeCreatorKeyboardNavigation", () => {
  const selectableItems = ref([]);
  const activeItemId = ref(null);
  const keysHooks = ref({});
  function getItemType(element) {
    return element == null ? void 0 : element.getAttribute("data-keyboard-nav-type");
  }
  function getElementId(element) {
    return (element == null ? void 0 : element.getAttribute(KEYBOARD_ID_ATTR)) || void 0;
  }
  async function refreshSelectableItems() {
    return new Promise((resolve) => {
      cleanupSelectableItems();
      setTimeout(() => {
        selectableItems.value = Array.from(
          document.querySelectorAll("[data-keyboard-nav-type]")
        ).map((el) => new WeakRef(el));
        resolve();
      }, 0);
    });
  }
  function executeKeyHooks(keyboardKey, activeItem) {
    const flatHooks = Object.values(keysHooks.value);
    const hooks = flatHooks.filter((hook) => hook.keyboardKeys.includes(keyboardKey));
    hooks.forEach((hook) => {
      if (!activeItemId.value)
        return;
      const conditionPassed = hook.condition === void 0 || hook.condition(getItemType(activeItem) || "", activeItemId.value);
      if (conditionPassed && activeItemId.value) {
        hook.handler(activeItemId.value, keyboardKey);
      }
    });
  }
  async function onKeyDown(e) {
    var _a, _b, _c;
    const pressedKey = e.key;
    if (!WATCHED_KEYS.includes(pressedKey))
      return;
    e.preventDefault();
    e.stopPropagation();
    await refreshSelectableItems();
    const activeItemIndex = selectableItems.value.findIndex(
      (item) => getElementId(item == null ? void 0 : item.deref()) === activeItemId.value
    );
    const activeItem = (_a = selectableItems.value[activeItemIndex]) == null ? void 0 : _a.deref();
    const isArrowDown = pressedKey === "ArrowDown";
    const isArrowUp = pressedKey === "ArrowUp";
    if (!activeItem)
      return;
    if (isArrowDown) {
      const nextItemIndex = activeItemIndex < selectableItems.value.length - 1 ? activeItemIndex + 1 : 0;
      setActiveItem((_b = selectableItems.value[nextItemIndex]) == null ? void 0 : _b.deref());
    }
    if (isArrowUp) {
      const previousIndex = activeItemIndex > 0 ? activeItemIndex - 1 : selectableItems.value.length - 1;
      setActiveItem((_c = selectableItems.value[previousIndex]) == null ? void 0 : _c.deref());
    }
    executeKeyHooks(pressedKey, activeItem);
  }
  function setActiveItemId(id) {
    activeItemId.value = id;
  }
  function setActiveItem(item) {
    const itemId = getElementId(item);
    if (!itemId)
      return;
    setActiveItemId(itemId);
    if (item == null ? void 0 : item.scrollIntoView) {
      item == null ? void 0 : item.scrollIntoView({ block: "center" });
    }
  }
  async function setActiveItemIndex(index) {
    var _a;
    await refreshSelectableItems();
    setActiveItem((_a = selectableItems.value[index]) == null ? void 0 : _a.deref());
  }
  function attachKeydownEvent() {
    document.addEventListener("keydown", onKeyDown, { capture: true });
  }
  function detachKeydownEvent() {
    cleanupSelectableItems();
    document.removeEventListener("keydown", onKeyDown, { capture: true });
  }
  function registerKeyHook(name, hook) {
    hook.keyboardKeys.forEach((keyboardKey) => {
      if (WATCHED_KEYS.includes(keyboardKey)) {
        keysHooks.value = { ...keysHooks.value, [name]: hook };
      } else {
        throw new Error(`Key ${keyboardKey} is not supported`);
      }
    });
  }
  function cleanupSelectableItems() {
    selectableItems.value = [];
  }
  function getActiveItemIndex() {
    return selectableItems.value.findIndex(
      (item) => getElementId(item == null ? void 0 : item.deref()) === activeItemId.value
    );
  }
  return {
    activeItemId,
    attachKeydownEvent,
    refreshSelectableItems,
    detachKeydownEvent,
    registerKeyHook,
    getActiveItemIndex,
    setActiveItemId,
    setActiveItemIndex
  };
});
function getAiNodesBySubcategory(nodes, subcategory) {
  return nodes.filter((node) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = node.codex) == null ? void 0 : _a.subcategories) == null ? void 0 : _b[AI_SUBCATEGORY]) == null ? void 0 : _c.includes(subcategory);
  }).map((node) => ({
    key: node.name,
    type: "node",
    properties: {
      group: [],
      name: node.name,
      displayName: node.displayName,
      title: node.displayName,
      description: node.description,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      icon: node.icon
    }
  })).sort((a, b) => a.properties.displayName.localeCompare(b.properties.displayName));
}
function AIView(_nodes) {
  const i18n = useI18n();
  const nodeTypesStore = useNodeTypesStore();
  const chainNodes = getAiNodesBySubcategory(nodeTypesStore.allLatestNodeTypes, AI_CATEGORY_CHAINS);
  const agentNodes = getAiNodesBySubcategory(nodeTypesStore.allLatestNodeTypes, AI_CATEGORY_AGENTS);
  return {
    value: AI_NODE_CREATOR_VIEW,
    title: i18n.baseText("nodeCreator.aiPanel.aiNodes"),
    subtitle: i18n.baseText("nodeCreator.aiPanel.selectAiNode"),
    info: i18n.baseText("nodeCreator.aiPanel.infoBox"),
    items: [
      ...chainNodes,
      ...agentNodes,
      {
        key: AI_OTHERS_NODE_CREATOR_VIEW,
        type: "view",
        properties: {
          title: i18n.baseText("nodeCreator.aiPanel.aiOtherNodes"),
          icon: "robot",
          description: i18n.baseText("nodeCreator.aiPanel.aiOtherNodesDescription")
        }
      }
    ]
  };
}
function AINodesView(_nodes) {
  const i18n = useI18n();
  function getAISubcategoryProperties(nodeConnectionType) {
    return {
      connectionType: nodeConnectionType,
      iconProps: {
        color: `var(--node-type-${nodeConnectionType}-color)`
      },
      panelClass: `nodes-list-panel-${nodeConnectionType}`
    };
  }
  return {
    value: AI_OTHERS_NODE_CREATOR_VIEW,
    title: i18n.baseText("nodeCreator.aiPanel.aiOtherNodes"),
    subtitle: i18n.baseText("nodeCreator.aiPanel.selectAiNode"),
    items: [
      {
        key: AI_CATEGORY_DOCUMENT_LOADERS,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_DOCUMENT_LOADERS,
          icon: "file-import",
          ...getAISubcategoryProperties(NodeConnectionType.AiDocument)
        }
      },
      {
        key: AI_CATEGORY_LANGUAGE_MODELS,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_LANGUAGE_MODELS,
          icon: "language",
          ...getAISubcategoryProperties(NodeConnectionType.AiLanguageModel)
        }
      },
      {
        key: AI_CATEGORY_MEMORY,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_MEMORY,
          icon: "brain",
          ...getAISubcategoryProperties(NodeConnectionType.AiMemory)
        }
      },
      {
        key: AI_CATEGORY_OUTPUTPARSER,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_OUTPUTPARSER,
          icon: "list",
          ...getAISubcategoryProperties(NodeConnectionType.AiOutputParser)
        }
      },
      {
        key: AI_CATEGORY_RETRIEVERS,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_RETRIEVERS,
          icon: "search",
          ...getAISubcategoryProperties(NodeConnectionType.AiRetriever)
        }
      },
      {
        key: AI_CATEGORY_TEXT_SPLITTERS,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_TEXT_SPLITTERS,
          icon: "grip-lines-vertical",
          ...getAISubcategoryProperties(NodeConnectionType.AiTextSplitter)
        }
      },
      {
        key: AI_CATEGORY_TOOLS,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_TOOLS,
          icon: "tools",
          ...getAISubcategoryProperties(NodeConnectionType.AiTool)
        }
      },
      {
        key: AI_CATEGORY_EMBEDDING,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_EMBEDDING,
          icon: "vector-square",
          ...getAISubcategoryProperties(NodeConnectionType.AiEmbedding)
        }
      },
      {
        key: AI_CATEGORY_VECTOR_STORES,
        type: "subcategory",
        properties: {
          title: AI_CATEGORY_VECTOR_STORES,
          icon: "project-diagram",
          ...getAISubcategoryProperties(NodeConnectionType.AiVectorStore)
        }
      },
      {
        key: AI_UNCATEGORIZED_CATEGORY,
        type: "subcategory",
        properties: {
          title: AI_UNCATEGORIZED_CATEGORY,
          icon: "code"
        }
      }
    ]
  };
}
function TriggerView(nodes) {
  const i18n = useI18n();
  const view = {
    value: TRIGGER_NODE_CREATOR_VIEW,
    title: i18n.baseText("nodeCreator.triggerHelperPanel.selectATrigger"),
    subtitle: i18n.baseText("nodeCreator.triggerHelperPanel.selectATriggerDescription"),
    items: [
      {
        key: DEFAULT_SUBCATEGORY,
        type: "subcategory",
        properties: {
          forceIncludeNodes: [WEBHOOK_NODE_TYPE, EMAIL_IMAP_NODE_TYPE],
          title: "App Trigger Nodes",
          icon: "satellite-dish"
        }
      },
      {
        key: SCHEDULE_TRIGGER_NODE_TYPE,
        type: "node",
        category: [CORE_NODES_CATEGORY],
        properties: {
          group: [],
          name: SCHEDULE_TRIGGER_NODE_TYPE,
          displayName: i18n.baseText("nodeCreator.triggerHelperPanel.scheduleTriggerDisplayName"),
          description: i18n.baseText("nodeCreator.triggerHelperPanel.scheduleTriggerDescription"),
          icon: "fa:clock"
        }
      },
      {
        key: WEBHOOK_NODE_TYPE,
        type: "node",
        category: [CORE_NODES_CATEGORY],
        properties: {
          group: [],
          name: WEBHOOK_NODE_TYPE,
          displayName: i18n.baseText("nodeCreator.triggerHelperPanel.webhookTriggerDisplayName"),
          description: i18n.baseText("nodeCreator.triggerHelperPanel.webhookTriggerDescription"),
          iconData: {
            type: "file",
            icon: "webhook",
            fileBuffer: "/n8n/static/webhook-icon.svg"
          }
        }
      },
      {
        key: FORM_TRIGGER_NODE_TYPE,
        type: "node",
        category: [CORE_NODES_CATEGORY],
        properties: {
          group: [],
          name: FORM_TRIGGER_NODE_TYPE,
          displayName: i18n.baseText("nodeCreator.triggerHelperPanel.formTriggerDisplayName"),
          description: i18n.baseText("nodeCreator.triggerHelperPanel.formTriggerDescription"),
          iconData: {
            type: "file",
            icon: "form",
            fileBuffer: "/n8n/static/form-grey.svg"
          }
        }
      },
      {
        key: MANUAL_TRIGGER_NODE_TYPE,
        type: "node",
        category: [CORE_NODES_CATEGORY],
        properties: {
          group: [],
          name: MANUAL_TRIGGER_NODE_TYPE,
          displayName: i18n.baseText("nodeCreator.triggerHelperPanel.manualTriggerDisplayName"),
          description: i18n.baseText("nodeCreator.triggerHelperPanel.manualTriggerDescription"),
          icon: "fa:mouse-pointer"
        }
      },
      {
        key: EXECUTE_WORKFLOW_TRIGGER_NODE_TYPE,
        type: "node",
        category: [CORE_NODES_CATEGORY],
        properties: {
          group: [],
          name: EXECUTE_WORKFLOW_TRIGGER_NODE_TYPE,
          displayName: i18n.baseText("nodeCreator.triggerHelperPanel.workflowTriggerDisplayName"),
          description: i18n.baseText("nodeCreator.triggerHelperPanel.workflowTriggerDescription"),
          icon: "fa:sign-out-alt"
        }
      },
      {
        type: "subcategory",
        key: OTHER_TRIGGER_NODES_SUBCATEGORY,
        category: CORE_NODES_CATEGORY,
        properties: {
          title: OTHER_TRIGGER_NODES_SUBCATEGORY,
          icon: "folder-open"
        }
      }
    ]
  };
  const hasAINodes = (nodes ?? []).some((node) => {
    var _a, _b;
    return (_b = (_a = node.codex) == null ? void 0 : _a.categories) == null ? void 0 : _b.includes(AI_SUBCATEGORY);
  });
  if (hasAINodes)
    view.items.push({
      key: AI_NODE_CREATOR_VIEW,
      type: "view",
      properties: {
        title: i18n.baseText("nodeCreator.aiPanel.langchainAiNodes"),
        icon: "robot",
        description: i18n.baseText("nodeCreator.aiPanel.nodesForAi")
      }
    });
  return view;
}
function RegularView(nodes) {
  const i18n = useI18n();
  const view = {
    value: REGULAR_NODE_CREATOR_VIEW,
    title: i18n.baseText("nodeCreator.triggerHelperPanel.whatHappensNext"),
    items: [
      {
        key: DEFAULT_SUBCATEGORY,
        type: "subcategory",
        properties: {
          title: "App Regular Nodes",
          icon: "globe"
        }
      },
      {
        type: "subcategory",
        key: TRANSFORM_DATA_SUBCATEGORY,
        category: CORE_NODES_CATEGORY,
        properties: {
          title: TRANSFORM_DATA_SUBCATEGORY,
          icon: "pen"
        }
      },
      {
        type: "subcategory",
        key: HELPERS_SUBCATEGORY,
        category: CORE_NODES_CATEGORY,
        properties: {
          title: HELPERS_SUBCATEGORY,
          icon: "toolbox"
        }
      },
      {
        type: "subcategory",
        key: FLOWS_CONTROL_SUBCATEGORY,
        category: CORE_NODES_CATEGORY,
        properties: {
          title: FLOWS_CONTROL_SUBCATEGORY,
          icon: "code-branch"
        }
      },
      {
        type: "subcategory",
        key: FILES_SUBCATEGORY,
        category: CORE_NODES_CATEGORY,
        properties: {
          title: FILES_SUBCATEGORY,
          icon: "file-alt"
        }
      }
    ]
  };
  const hasAINodes = (nodes ?? []).some((node) => {
    var _a, _b;
    return (_b = (_a = node.codex) == null ? void 0 : _a.categories) == null ? void 0 : _b.includes(AI_SUBCATEGORY);
  });
  if (hasAINodes)
    view.items.push({
      key: AI_NODE_CREATOR_VIEW,
      type: "view",
      properties: {
        title: i18n.baseText("nodeCreator.aiPanel.langchainAiNodes"),
        icon: "robot",
        description: i18n.baseText("nodeCreator.aiPanel.nodesForAi")
      }
    });
  view.items.push({
    key: TRIGGER_NODE_CREATOR_VIEW,
    type: "view",
    properties: {
      title: i18n.baseText("nodeCreator.triggerHelperPanel.addAnotherTrigger"),
      icon: "bolt",
      description: i18n.baseText("nodeCreator.triggerHelperPanel.addAnotherTriggerDescription")
    }
  });
  return view;
}
const useViewStacks = defineStore("nodeCreatorViewStacks", () => {
  const nodeCreatorStore = useNodeCreatorStore();
  const { getActiveItemIndex } = useKeyboardNavigation();
  const viewStacks = ref([]);
  const activeStackItems = computed(() => {
    const stack = viewStacks.value[viewStacks.value.length - 1];
    if (!(stack == null ? void 0 : stack.baselineItems)) {
      return stack.items ? extendItemsWithUUID(stack.items) : [];
    }
    if (stack.search && searchBaseItems.value) {
      const searchBase = searchBaseItems.value.length > 0 ? searchBaseItems.value : stack.baselineItems;
      return extendItemsWithUUID(searchNodes(stack.search || "", searchBase));
    }
    return extendItemsWithUUID(stack.baselineItems);
  });
  const activeViewStack = computed(() => {
    const stack = viewStacks.value[viewStacks.value.length - 1];
    if (!stack)
      return {};
    return {
      ...stack,
      items: activeStackItems.value,
      hasSearch: (stack.baselineItems || []).length > 8 || (stack == null ? void 0 : stack.hasSearch)
    };
  });
  const activeViewStackMode = computed(
    () => activeViewStack.value.mode || TRIGGER_NODE_CREATOR_VIEW
  );
  const searchBaseItems = computed(() => {
    const stack = viewStacks.value[viewStacks.value.length - 1];
    if (!(stack == null ? void 0 : stack.searchItems))
      return [];
    return stack.searchItems.map((item) => transformNodeType(item, stack.subcategory));
  });
  const globalSearchItemsDiff = computed(() => {
    const stack = viewStacks.value[viewStacks.value.length - 1];
    if (!(stack == null ? void 0 : stack.search))
      return [];
    const allNodes = nodeCreatorStore.mergedNodes.map((item) => transformNodeType(item));
    const globalSearchResult = extendItemsWithUUID(searchNodes(stack.search || "", allNodes));
    return globalSearchResult.filter((item) => {
      return !activeStackItems.value.find((activeItem) => activeItem.key === item.key);
    });
  });
  async function gotoCompatibleConnectionView(connectionType, isOutput, filter) {
    var _a;
    const i18n = useI18n();
    let nodesByConnectionType;
    let relatedAIView;
    if (isOutput === true) {
      nodesByConnectionType = useNodeTypesStore().visibleNodeTypesByInputConnectionTypeNames;
      relatedAIView = {
        properties: {
          title: i18n.baseText("nodeCreator.aiPanel.aiNodes"),
          icon: "robot"
        }
      };
    } else {
      nodesByConnectionType = useNodeTypesStore().visibleNodeTypesByOutputConnectionTypeNames;
      relatedAIView = AINodesView([]).items.find(
        (item) => item.properties.connectionType === connectionType
      );
    }
    await nextTick();
    pushViewStack({
      title: relatedAIView == null ? void 0 : relatedAIView.properties.title,
      rootView: AI_OTHERS_NODE_CREATOR_VIEW,
      mode: "nodes",
      items: nodeCreatorStore.allNodeCreatorNodes,
      nodeIcon: {
        iconType: "icon",
        icon: relatedAIView == null ? void 0 : relatedAIView.properties.icon,
        color: (_a = relatedAIView == null ? void 0 : relatedAIView.properties.iconProps) == null ? void 0 : _a.color
      },
      panelClass: relatedAIView == null ? void 0 : relatedAIView.properties.panelClass,
      baseFilter: (i) => {
        var _a2;
        const displayNode = nodesByConnectionType[connectionType].includes(i.key);
        if (displayNode && ((_a2 = filter == null ? void 0 : filter.nodes) == null ? void 0 : _a2.length)) {
          return filter.nodes.includes(i.key);
        }
        return displayNode;
      },
      itemsMapper(item) {
        return {
          ...item,
          subcategory: connectionType
        };
      },
      preventBack: true
    });
  }
  function setStackBaselineItems() {
    const stack = viewStacks.value[viewStacks.value.length - 1];
    if (!stack || !activeViewStack.value.uuid)
      return;
    let stackItems = (stack == null ? void 0 : stack.items) ?? subcategorizeItems(nodeCreatorStore.mergedNodes)[(stack == null ? void 0 : stack.subcategory) ?? DEFAULT_SUBCATEGORY] ?? [];
    if ((stack.forceIncludeNodes ?? []).length > 0) {
      const matchedNodes = nodeCreatorStore.mergedNodes.filter((item) => {
        var _a;
        return (_a = stack.forceIncludeNodes) == null ? void 0 : _a.includes(item.name);
      }).map((item) => transformNodeType(item, stack.subcategory));
      stackItems.push(...matchedNodes);
    }
    if (stack.baseFilter) {
      stackItems = stackItems.filter(stack.baseFilter);
    }
    if (stack.itemsMapper) {
      stackItems = stackItems.map(stack.itemsMapper);
    }
    if (!stack.items) {
      sortNodeCreateElements(stackItems);
    }
    updateCurrentViewStack({ baselineItems: stackItems });
  }
  function extendItemsWithUUID(items) {
    return items.map((item) => ({
      ...item,
      uuid: `${item.key}-${v4()}`
    }));
  }
  function pushViewStack(stack) {
    if (activeViewStack.value.uuid) {
      updateCurrentViewStack({ activeIndex: getActiveItemIndex() });
    }
    const newStackUuid = v4();
    viewStacks.value.push({
      ...stack,
      uuid: newStackUuid,
      transitionDirection: "in",
      activeIndex: 0
    });
    setStackBaselineItems();
  }
  function popViewStack() {
    if (activeViewStack.value.uuid) {
      viewStacks.value.pop();
      updateCurrentViewStack({ transitionDirection: "out" });
    }
  }
  function updateCurrentViewStack(stack) {
    const currentStack = viewStacks.value[viewStacks.value.length - 1];
    const matchedIndex = viewStacks.value.findIndex((s) => s.uuid === currentStack.uuid);
    if (!currentStack)
      return;
    Object.keys(stack).forEach((key) => {
      const typedKey = key;
      viewStacks.value[matchedIndex] = {
        ...viewStacks.value[matchedIndex],
        [key]: stack[typedKey]
      };
    });
  }
  function resetViewStacks() {
    viewStacks.value = [];
  }
  return {
    viewStacks,
    activeViewStack,
    activeViewStackMode,
    globalSearchItemsDiff,
    gotoCompatibleConnectionView,
    resetViewStacks,
    updateCurrentViewStack,
    pushViewStack,
    popViewStack
  };
});
const NodeCreation = defineAsyncComponent(async () => __vitePreload(() => import("./NodeCreation-791ef879.js").then((n) => n.N), true ? ["assets/NodeCreation-791ef879.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/pinia-282957dc.js","assets/vendor-fd4bd18c.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/NodeCreation-0035bc7e.css"] : void 0));
const CanvasControls = defineAsyncComponent(async () => __vitePreload(() => import("./CanvasControls-b3bd3896.js"), true ? ["assets/CanvasControls-b3bd3896.js","assets/vendor-fd4bd18c.js","assets/pinia-282957dc.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/CanvasControls-a1fda376.css"] : void 0));
const _sfc_main = defineComponent({
  name: "NodeView",
  mixins: [
    copyPaste,
    externalHooks,
    genericHelpers,
    moveNodeWorkflow,
    workflowHelpers,
    workflowRun,
    debounceHelper,
    pinData
  ],
  components: {
    NodeDetailsView,
    Node,
    Sticky,
    CanvasAddButton,
    NodeCreation,
    CanvasControls
  },
  setup(props) {
    var _a, _b;
    const locale = useI18n();
    return {
      locale,
      ...useCanvasMouseSelect(),
      ...useGlobalLinkActions(),
      ...useTitleChange(),
      ...useToast(),
      ...useMessage(),
      ...useUniqueNodeName(),
      ...useExecutionDebugging(),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = workflowRun).setup) == null ? void 0 : _b.call(_a, props)
    };
  },
  errorCaptured: (err, vm, info) => {
    console.error("errorCaptured");
    console.error(err);
  },
  watch: {
    // Listen to route changes and load the workflow accordingly
    async $route(to, from) {
      this.readOnlyEnvRouteCheck();
      const currentTab = getNodeViewTab(to);
      const nodeViewNotInitialized = !this.uiStore.nodeViewInitialized;
      let workflowChanged = from.params.name !== to.params.name && // Both 'new' and __EMPTY__ are new workflow names, so ignore them when detecting if wf changed
      !(from.params.name === "new" && this.currentWorkflow === PLACEHOLDER_EMPTY_WORKFLOW_ID) && !(from.name === VIEWS.NEW_WORKFLOW) && // Also ignore if workflow id changes when saving new workflow
      to.params.action !== "workflowSave";
      const isOpeningTemplate = to.name === VIEWS.TEMPLATE_IMPORT;
      if (currentTab === MAIN_HEADER_TABS.WORKFLOW || isOpeningTemplate) {
        if (workflowChanged || nodeViewNotInitialized || isOpeningTemplate) {
          this.startLoading();
          if (nodeViewNotInitialized) {
            const previousDirtyState = this.uiStore.stateIsDirty;
            this.resetWorkspace();
            this.uiStore.stateIsDirty = previousDirtyState;
          }
          await Promise.all([this.loadCredentials(), this.initView()]);
          this.stopLoading();
          if (this.blankRedirect) {
            this.blankRedirect = false;
          }
        }
        await this.checkAndInitDebugMode();
      }
      if (currentTab === MAIN_HEADER_TABS.EXECUTIONS) {
        workflowChanged = from.params.name !== to.params.name && !(to.params.name === "new" && from.params.name === void 0);
        if (workflowChanged) {
          this.uiStore.nodeViewInitialized = false;
        }
      }
    },
    activeNode() {
      this.createNodeActive = false;
    },
    containsTrigger(containsTrigger) {
      if (containsTrigger === false)
        this.canvasStore.setRecenteredCanvasAddButtonPosition(this.getNodeViewOffsetPosition);
    },
    nodeViewScale(newScale) {
      const elementRef = this.$refs.nodeView;
      if (elementRef) {
        elementRef.style.transform = `scale(${newScale})`;
      }
    }
  },
  async beforeRouteLeave(to, from, next) {
    if (getNodeViewTab(to) === MAIN_HEADER_TABS.EXECUTIONS || from.name === VIEWS.TEMPLATE_IMPORT || getNodeViewTab(to) === MAIN_HEADER_TABS.WORKFLOW && from.name === VIEWS.EXECUTION_DEBUG) {
      next();
      return;
    }
    if (this.uiStore.stateIsDirty && !this.readOnlyEnv) {
      const confirmModal = await this.confirm(
        this.$locale.baseText("generic.unsavedWork.confirmMessage.message"),
        {
          title: this.$locale.baseText("generic.unsavedWork.confirmMessage.headline"),
          type: "warning",
          confirmButtonText: this.$locale.baseText(
            "generic.unsavedWork.confirmMessage.confirmButtonText"
          ),
          cancelButtonText: this.$locale.baseText(
            "generic.unsavedWork.confirmMessage.cancelButtonText"
          ),
          showClose: true
        }
      );
      if (confirmModal === MODAL_CONFIRM) {
        this.workflowsStore.setWorkflowId(PLACEHOLDER_EMPTY_WORKFLOW_ID);
        const saved = await this.saveCurrentWorkflow({}, false);
        if (saved) {
          await this.settingsStore.fetchPromptsData();
        }
        this.uiStore.stateIsDirty = false;
        if (from.name === VIEWS.NEW_WORKFLOW) {
          await this.$router.replace(
            { name: VIEWS.WORKFLOW, params: { name: this.currentWorkflow } },
            () => {
              void this.$router.push(to);
            }
          );
        } else {
          next();
        }
      } else if (confirmModal === MODAL_CANCEL) {
        this.workflowsStore.setWorkflowId(PLACEHOLDER_EMPTY_WORKFLOW_ID);
        this.resetWorkspace();
        this.uiStore.stateIsDirty = false;
        next();
      }
    } else {
      next();
    }
  },
  computed: {
    ...mapStores(
      useCanvasStore,
      useTagsStore,
      useCredentialsStore,
      useNodeCreatorStore,
      useNodeTypesStore,
      useNDVStore,
      useRootStore,
      useSettingsStore,
      useTemplatesStore,
      useUIStore,
      useWorkflowsStore,
      useUsersStore,
      useNodeCreatorStore,
      useEnvironmentsStore,
      useWorkflowsEEStore,
      useHistoryStore,
      useExternalSecretsStore
    ),
    nativelyNumberSuffixedDefaults() {
      return this.nodeTypesStore.nativelyNumberSuffixedDefaults;
    },
    currentUser() {
      return this.usersStore.currentUser;
    },
    activeNode() {
      return this.ndvStore.activeNode;
    },
    executionWaitingForWebhook() {
      return this.workflowsStore.executionWaitingForWebhook;
    },
    isDemo() {
      return this.$route.name === VIEWS.DEMO;
    },
    showCanvasAddButton() {
      return this.loadingService === null && !this.containsTrigger && !this.isDemo && !this.readOnlyEnv;
    },
    lastSelectedNode() {
      return this.uiStore.getLastSelectedNode;
    },
    nodes() {
      return this.workflowsStore.allNodes;
    },
    nodesToRender() {
      return this.workflowsStore.allNodes.filter((node) => node.type !== STICKY_NODE_TYPE);
    },
    stickiesToRender() {
      return this.workflowsStore.allNodes.filter((node) => node.type === STICKY_NODE_TYPE);
    },
    runButtonText() {
      if (!this.workflowRunning) {
        return this.$locale.baseText("nodeView.runButtonText.executeWorkflow");
      }
      if (this.executionWaitingForWebhook) {
        return this.$locale.baseText("nodeView.runButtonText.waitingForTriggerEvent");
      }
      return this.$locale.baseText("nodeView.runButtonText.executingWorkflow");
    },
    workflowStyle() {
      const offsetPosition = this.uiStore.nodeViewOffsetPosition;
      return {
        left: offsetPosition[0] + "px",
        top: offsetPosition[1] + "px"
      };
    },
    canvasAddButtonStyle() {
      return {
        "pointer-events": this.createNodeActive ? "none" : "all"
      };
    },
    backgroundStyle() {
      return getBackgroundStyles(
        this.nodeViewScale,
        this.uiStore.nodeViewOffsetPosition,
        this.isExecutionPreview
      );
    },
    workflowClasses() {
      const returnClasses = [];
      if (this.ctrlKeyPressed || this.moveCanvasKeyPressed) {
        if (this.uiStore.nodeViewMoveInProgress) {
          returnClasses.push("move-in-process");
        } else {
          returnClasses.push("move-active");
        }
      }
      if (this.selectActive || this.ctrlKeyPressed || this.moveCanvasKeyPressed) {
        returnClasses.push("do-not-select");
      }
      if (this.connectionDragScope.type) {
        returnClasses.push("connection-drag-scope-active");
        returnClasses.push(`connection-drag-scope-active-type-${this.connectionDragScope.type}`);
        returnClasses.push(
          `connection-drag-scope-active-connection-${this.connectionDragScope.connection}`
        );
      }
      return returnClasses;
    },
    workflowExecution() {
      return this.workflowsStore.getWorkflowExecution;
    },
    workflowRunning() {
      return this.uiStore.isActionActive("workflowRunning");
    },
    currentWorkflow() {
      return this.$route.params.name || this.workflowsStore.workflowId;
    },
    workflowName() {
      return this.workflowsStore.workflowName;
    },
    allTriggersDisabled() {
      const disabledTriggerNodes = this.triggerNodes.filter((node) => node.disabled);
      return disabledTriggerNodes.length === this.triggerNodes.length;
    },
    triggerNodes() {
      return this.nodes.filter(
        (node) => node.type === START_NODE_TYPE || this.nodeTypesStore.isTriggerNode(node.type)
      );
    },
    containsTrigger() {
      return this.triggerNodes.length > 0;
    },
    containsChatNodes() {
      return !!this.nodes.find(
        (node) => node.type === MANUAL_CHAT_TRIGGER_NODE_TYPE && node.disabled !== true
      );
    },
    isExecutionDisabled() {
      return !this.containsTrigger || this.allTriggersDisabled;
    },
    getNodeViewOffsetPosition() {
      return this.uiStore.nodeViewOffsetPosition;
    },
    nodeViewScale() {
      return this.canvasStore.nodeViewScale;
    },
    instance() {
      return this.canvasStore.jsPlumbInstance;
    }
  },
  data() {
    return {
      GRID_SIZE,
      STICKY_NODE_TYPE,
      createNodeActive: false,
      lastClickPosition: [450, 450],
      ctrlKeyPressed: false,
      moveCanvasKeyPressed: false,
      stopExecutionInProgress: false,
      blankRedirect: false,
      credentialsUpdated: false,
      pullConnActiveNodeName: null,
      pullConnActive: false,
      dropPrevented: false,
      connectionDragScope: {
        type: null,
        connection: null
      },
      renamingActive: false,
      showStickyButton: false,
      isExecutionPreview: false,
      showTriggerMissingTooltip: false,
      workflowData: null,
      activeConnection: null,
      isProductionExecutionPreview: false,
      enterTimer: void 0,
      exitTimer: void 0,
      readOnlyNotification: null,
      // jsplumb automatically deletes all loose connections which is in turn recorded
      // in undo history as a user action.
      // This should prevent automatically removed connections from populating undo stack
      suspendRecordingDetachedConnections: false,
      NODE_CREATOR_OPEN_SOURCES,
      eventsAttached: false
    };
  },
  methods: {
    editAllowedCheck() {
      var _a;
      if ((_a = this.readOnlyNotification) == null ? void 0 : _a.visible) {
        return;
      }
      if (this.isReadOnlyRoute || this.readOnlyEnv) {
        this.readOnlyNotification = this.showMessage({
          title: this.$locale.baseText(
            this.readOnlyEnv ? `readOnlyEnv.showMessage.${this.isReadOnlyRoute ? "executions" : "workflows"}.title` : "readOnly.showMessage.executions.title"
          ),
          message: this.$locale.baseText(
            this.readOnlyEnv ? `readOnlyEnv.showMessage.${this.isReadOnlyRoute ? "executions" : "workflows"}.message` : "readOnly.showMessage.executions.message"
          ),
          type: "info",
          dangerouslyUseHTMLString: true
        });
        return false;
      }
      return true;
    },
    showTriggerMissingToltip(isVisible) {
      this.showTriggerMissingTooltip = isVisible;
    },
    onRunNode(nodeName, source) {
      const node = this.workflowsStore.getNodeByName(nodeName);
      const telemetryPayload = {
        node_type: node ? node.type : null,
        workflow_id: this.workflowsStore.workflowId,
        source: "canvas",
        session_id: this.ndvStore.sessionId
      };
      this.$telemetry.track("User clicked execute node button", telemetryPayload);
      void this.$externalHooks().run("nodeView.onRunNode", telemetryPayload);
      void this.runWorkflow({ destinationNode: nodeName, source });
    },
    async onOpenChat() {
      const telemetryPayload = {
        workflow_id: this.workflowsStore.workflowId
      };
      this.$telemetry.track("User clicked chat open button", telemetryPayload);
      void this.$externalHooks().run("nodeView.onOpenChat", telemetryPayload);
      this.uiStore.openModal(WORKFLOW_LM_CHAT_MODAL_KEY);
    },
    async onRunWorkflow() {
      void this.getWorkflowDataToSave().then((workflowData) => {
        const telemetryPayload = {
          workflow_id: this.workflowsStore.workflowId,
          node_graph_string: JSON.stringify(
            generateNodesGraph(workflowData, this.getNodeTypes()).nodeGraph
          )
        };
        this.$telemetry.track("User clicked execute workflow button", telemetryPayload);
        void this.$externalHooks().run("nodeView.onRunWorkflow", telemetryPayload);
      });
      await this.runWorkflow({});
    },
    onRunContainerClick() {
      if (this.containsTrigger && !this.allTriggersDisabled)
        return;
      const message = this.containsTrigger && this.allTriggersDisabled ? this.$locale.baseText("nodeView.addOrEnableTriggerNode") : this.$locale.baseText("nodeView.addATriggerNodeFirst");
      this.registerCustomAction({
        key: "showNodeCreator",
        action: () => this.showTriggerCreator(NODE_CREATOR_OPEN_SOURCES.NO_TRIGGER_EXECUTION_TOOLTIP)
      });
      const notice = this.showMessage({
        type: "info",
        title: this.$locale.baseText("nodeView.cantExecuteNoTrigger"),
        message,
        duration: 3e3,
        onClick: () => setTimeout(() => {
          if (this.createNodeActive)
            notice.close();
        }, 0),
        dangerouslyUseHTMLString: true
      });
    },
    clearExecutionData() {
      this.workflowsStore.workflowExecutionData = null;
      this.updateNodesExecutionIssues();
    },
    async onSaveKeyboardShortcut(e) {
      let saved = await this.saveCurrentWorkflow();
      if (saved) {
        await this.settingsStore.fetchPromptsData();
        if (this.$route.name === VIEWS.EXECUTION_DEBUG) {
          await this.$router.replace({
            name: VIEWS.WORKFLOW,
            params: { name: this.currentWorkflow }
          });
        }
      }
      if (this.activeNode) {
        if (e.target instanceof HTMLInputElement) {
          saved = e.target.readOnly;
        } else {
          saved = true;
        }
        if (saved) {
          this.showMessage({
            title: this.$locale.baseText("generic.workflowSaved"),
            type: "success"
          });
        }
      }
    },
    showTriggerCreator(source) {
      if (this.createNodeActive)
        return;
      this.nodeCreatorStore.setSelectedView(TRIGGER_NODE_CREATOR_VIEW);
      this.nodeCreatorStore.setShowScrim(true);
      this.onToggleNodeCreator({ source, createNodeActive: true });
    },
    async openExecution(executionId) {
      var _a, _b;
      this.startLoading();
      this.resetWorkspace();
      let data;
      try {
        data = await this.workflowsStore.getExecution(executionId);
      } catch (error) {
        this.showError(error, this.$locale.baseText("nodeView.showError.openExecution.title"));
        return;
      }
      if (data === void 0) {
        throw new Error(`Execution with id "${executionId}" could not be found!`);
      }
      this.workflowsStore.setWorkflowName({
        newName: data.workflowData.name,
        setStateDirty: false
      });
      this.workflowsStore.setWorkflowId(PLACEHOLDER_EMPTY_WORKFLOW_ID);
      this.workflowsStore.setWorkflowExecutionData(data);
      if (data.workflowData.pinData) {
        this.workflowsStore.setWorkflowPinData(data.workflowData.pinData);
      }
      if (data.workflowData.ownedBy) {
        this.workflowsEEStore.setWorkflowOwnedBy({
          workflowId: data.workflowData.id,
          ownedBy: data.workflowData.ownedBy
        });
      }
      if (data.workflowData.sharedWith) {
        this.workflowsEEStore.setWorkflowSharedWith({
          workflowId: data.workflowData.id,
          sharedWith: data.workflowData.sharedWith
        });
      }
      if (data.workflowData.usedCredentials) {
        this.workflowsStore.setUsedCredentials(data.workflowData.usedCredentials);
      }
      await this.addNodes(
        deepCopy(data.workflowData.nodes),
        deepCopy(data.workflowData.connections)
      );
      await this.$nextTick();
      this.canvasStore.zoomToFit();
      this.uiStore.stateIsDirty = false;
      void this.$externalHooks().run("execution.open", {
        workflowId: data.workflowData.id,
        workflowName: data.workflowData.name,
        executionId
      });
      this.$telemetry.track("User opened read-only execution", {
        workflow_id: data.workflowData.id,
        execution_mode: data.mode,
        execution_finished: data.finished
      });
      if (!data.finished && ((_b = (_a = data.data) == null ? void 0 : _a.resultData) == null ? void 0 : _b.error)) {
        let nodeErrorFound = false;
        if (data.data.resultData.runData) {
          const runData = data.data.resultData.runData;
          errorCheck:
            for (const nodeName of Object.keys(runData)) {
              for (const taskData of runData[nodeName]) {
                if (taskData.error) {
                  nodeErrorFound = true;
                  break errorCheck;
                }
              }
            }
        }
        if (!nodeErrorFound && data.data.resultData.error.stack) {
          console.error(`Execution ${executionId} error:`);
          console.error(data.data.resultData.error.stack);
          this.showMessage({
            title: this.$locale.baseText("nodeView.showError.workflowError"),
            message: data.data.resultData.error.message,
            type: "error",
            duration: 0
          });
        }
      }
      if (data.waitTill) {
        this.showMessage({
          title: this.$locale.baseText("nodeView.thisExecutionHasntFinishedYet"),
          message: `<a data-action="reload">${this.$locale.baseText(
            "nodeView.refresh"
          )}</a> ${this.$locale.baseText(
            "nodeView.toSeeTheLatestStatus"
          )}.<br/> <a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/" target="_blank">${this.$locale.baseText(
            "nodeView.moreInfo"
          )}</a>`,
          type: "warning",
          duration: 0
        });
      }
      this.stopLoading();
    },
    async importWorkflowExact(data) {
      if (!data.workflow.nodes || !data.workflow.connections) {
        throw new Error("Invalid workflow object");
      }
      this.resetWorkspace();
      data.workflow.nodes = getFixedNodesList(data.workflow.nodes);
      await this.addNodes(data.workflow.nodes, data.workflow.connections);
      if (data.workflow.pinData) {
        this.workflowsStore.setWorkflowPinData(data.workflow.pinData);
      }
      await this.$nextTick();
      this.canvasStore.zoomToFit();
    },
    async openWorkflowTemplate(templateId) {
      this.startLoading();
      this.setLoadingText(this.$locale.baseText("nodeView.loadingTemplate"));
      this.resetWorkspace();
      this.workflowsStore.currentWorkflowExecutions = [];
      this.workflowsStore.activeWorkflowExecution = null;
      let data;
      try {
        void this.$externalHooks().run("template.requested", { templateId });
        data = await this.templatesStore.getFixedWorkflowTemplate(templateId);
        if (!data) {
          throw new Error(
            this.$locale.baseText("nodeView.workflowTemplateWithIdCouldNotBeFound", {
              interpolate: { templateId }
            })
          );
        }
      } catch (error) {
        this.showError(error, this.$locale.baseText("nodeView.couldntImportWorkflow"));
        await this.$router.replace({ name: VIEWS.NEW_WORKFLOW });
        return;
      }
      this.blankRedirect = true;
      await this.$router.replace({ name: VIEWS.NEW_WORKFLOW, query: { templateId } });
      await this.addNodes(data.workflow.nodes, data.workflow.connections);
      this.workflowData = await this.workflowsStore.getNewWorkflowData(data.name) || {};
      await this.$nextTick();
      this.canvasStore.zoomToFit();
      this.uiStore.stateIsDirty = true;
      void this.$externalHooks().run("template.open", {
        templateId,
        templateName: data.name,
        workflow: data.workflow
      });
      this.stopLoading();
    },
    async openWorkflow(workflow) {
      this.startLoading();
      const selectedExecution = this.workflowsStore.activeWorkflowExecution;
      this.resetWorkspace();
      this.workflowsStore.addWorkflow(workflow);
      this.workflowsStore.setActive(workflow.active || false);
      this.workflowsStore.setWorkflowId(workflow.id);
      this.workflowsStore.setWorkflowName({ newName: workflow.name, setStateDirty: false });
      this.workflowsStore.setWorkflowSettings(workflow.settings || {});
      this.workflowsStore.setWorkflowPinData(workflow.pinData || {});
      this.workflowsStore.setWorkflowVersionId(workflow.versionId);
      if (workflow.ownedBy) {
        this.workflowsEEStore.setWorkflowOwnedBy({
          workflowId: workflow.id,
          ownedBy: workflow.ownedBy
        });
      }
      if (workflow.sharedWith) {
        this.workflowsEEStore.setWorkflowSharedWith({
          workflowId: workflow.id,
          sharedWith: workflow.sharedWith
        });
      }
      if (workflow.usedCredentials) {
        this.workflowsStore.setUsedCredentials(workflow.usedCredentials);
      }
      const tags = workflow.tags || [];
      const tagIds = tags.map((tag) => tag.id);
      this.workflowsStore.setWorkflowTagIds(tagIds || []);
      this.tagsStore.upsertTags(tags);
      await this.addNodes(workflow.nodes, workflow.connections);
      if (!this.credentialsUpdated) {
        this.uiStore.stateIsDirty = false;
      }
      this.canvasStore.zoomToFit();
      void this.$externalHooks().run("workflow.open", {
        workflowId: workflow.id,
        workflowName: workflow.name
      });
      if ((selectedExecution == null ? void 0 : selectedExecution.workflowId) !== workflow.id) {
        this.workflowsStore.activeWorkflowExecution = null;
        this.workflowsStore.currentWorkflowExecutions = [];
      } else {
        this.workflowsStore.activeWorkflowExecution = selectedExecution;
      }
      this.stopLoading();
    },
    touchTap(e) {
      if (this.isTouchDevice) {
        this.mouseDown(e);
      }
    },
    mouseDown(e) {
      this.lastClickPosition = this.getMousePositionWithinNodeView(e);
      if (e instanceof MouseEvent && e.button === 1) {
        this.moveCanvasKeyPressed = true;
      }
      this.mouseDownMouseSelect(e, this.moveCanvasKeyPressed);
      this.mouseDownMoveWorkflow(e, this.moveCanvasKeyPressed);
      this.createNodeActive = false;
    },
    mouseUp(e) {
      if (e.button === 1) {
        this.moveCanvasKeyPressed = false;
      }
      this.mouseUpMouseSelect(e);
      this.mouseUpMoveWorkflow(e);
    },
    keyUp(e) {
      if (e.key === this.controlKeyCode) {
        this.ctrlKeyPressed = false;
      }
      if (e.key === " ") {
        this.moveCanvasKeyPressed = false;
      }
    },
    async keyDown(e) {
      if (e.key === "s" && this.isCtrlKeyPressed(e)) {
        e.stopPropagation();
        e.preventDefault();
        if (this.isReadOnlyRoute || this.readOnlyEnv) {
          return;
        }
        void this.callDebounced("onSaveKeyboardShortcut", { debounceTime: 1e3 }, e);
        return;
      }
      const path = e.path || e.composedPath && e.composedPath();
      for (const element of path) {
        if (element.className && typeof element.className === "string" && element.className.includes("ignore-key-press")) {
          return;
        }
      }
      if (window.document.body.classList.contains("el-popup-parent--hidden")) {
        return;
      }
      if (e.key === "Escape") {
        this.createNodeActive = false;
        if (this.activeNode) {
          void this.$externalHooks().run("dataDisplay.nodeEditingFinished");
          this.ndvStore.activeNodeName = null;
        }
        return;
      }
      if (this.activeNode) {
        return;
      }
      if (e.key === "d") {
        void this.callDebounced("deactivateSelectedNode", { debounceTime: 350 });
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.stopPropagation();
        e.preventDefault();
        void this.callDebounced("deleteSelectedNodes", { debounceTime: 500 });
      } else if (e.key === "Tab") {
        this.onToggleNodeCreator({
          source: NODE_CREATOR_OPEN_SOURCES.TAB,
          createNodeActive: !this.createNodeActive && !this.isReadOnlyRoute && !this.readOnlyEnv
        });
      } else if (e.key === this.controlKeyCode) {
        this.ctrlKeyPressed = true;
      } else if (e.key === " ") {
        this.moveCanvasKeyPressed = true;
      } else if (e.key === "F2" && !this.isReadOnlyRoute && !this.readOnlyEnv) {
        const lastSelectedNode = this.lastSelectedNode;
        if (lastSelectedNode !== null && lastSelectedNode.type !== STICKY_NODE_TYPE) {
          void this.callDebounced(
            "renameNodePrompt",
            { debounceTime: 1500 },
            lastSelectedNode.name
          );
        }
      } else if (e.key === "a" && this.isCtrlKeyPressed(e)) {
        e.stopPropagation();
        e.preventDefault();
        void this.callDebounced("selectAllNodes", { debounceTime: 1e3 });
      } else if (e.key === "c" && this.isCtrlKeyPressed(e)) {
        void this.callDebounced("copySelectedNodes", { debounceTime: 1e3 });
      } else if (e.key === "x" && this.isCtrlKeyPressed(e)) {
        e.stopPropagation();
        e.preventDefault();
        void this.callDebounced("cutSelectedNodes", { debounceTime: 1e3 });
      } else if (e.key === "n" && this.isCtrlKeyPressed(e) && e.altKey) {
        e.stopPropagation();
        e.preventDefault();
        if (this.isDemo) {
          return;
        }
        if (this.$router.currentRoute.name === VIEWS.NEW_WORKFLOW) {
          nodeViewEventBus.emit("newWorkflow");
        } else {
          void this.$router.push({ name: VIEWS.NEW_WORKFLOW });
        }
        this.showMessage({
          title: this.$locale.baseText("nodeView.showMessage.keyDown.title"),
          type: "success"
        });
      } else if (e.key === "Enter") {
        const lastSelectedNode = this.lastSelectedNode;
        if (lastSelectedNode !== null) {
          if (lastSelectedNode.type === STICKY_NODE_TYPE && (this.isReadOnlyRoute || this.readOnlyEnv)) {
            return;
          }
          this.ndvStore.activeNodeName = lastSelectedNode.name;
        }
      } else if (e.key === "ArrowRight" && e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();
        void this.callDebounced("selectDownstreamNodes", { debounceTime: 1e3 });
      } else if (e.key === "ArrowRight") {
        const lastSelectedNode = this.lastSelectedNode;
        if (lastSelectedNode === null) {
          return;
        }
        const connections = this.workflowsStore.outgoingConnectionsByNodeName(
          lastSelectedNode.name
        );
        if (connections.main === void 0 || connections.main.length === 0) {
          return;
        }
        void this.callDebounced(
          "nodeSelectedByName",
          { debounceTime: 100 },
          connections.main[0][0].node,
          false,
          true
        );
      } else if (e.key === "ArrowLeft" && e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();
        void this.callDebounced("selectUpstreamNodes", { debounceTime: 1e3 });
      } else if (e.key === "ArrowLeft") {
        const lastSelectedNode = this.lastSelectedNode;
        if (lastSelectedNode === null) {
          return;
        }
        const workflow = this.getCurrentWorkflow();
        if (!workflow.connectionsByDestinationNode.hasOwnProperty(lastSelectedNode.name)) {
          return;
        }
        const connections = workflow.connectionsByDestinationNode[lastSelectedNode.name];
        if (connections.main === void 0 || connections.main.length === 0) {
          return;
        }
        void this.callDebounced(
          "nodeSelectedByName",
          { debounceTime: 100 },
          connections.main[0][0].node,
          false,
          true
        );
      } else if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const lastSelectedNode = this.lastSelectedNode;
        if (lastSelectedNode === null) {
          return;
        }
        const workflow = this.getCurrentWorkflow();
        if (!workflow.connectionsByDestinationNode.hasOwnProperty(lastSelectedNode.name)) {
          return;
        }
        const connections = workflow.connectionsByDestinationNode[lastSelectedNode.name];
        if (!Array.isArray(connections.main) || !connections.main.length) {
          return;
        }
        const parentNode = connections.main[0][0].node;
        const connectionsParent = this.workflowsStore.outgoingConnectionsByNodeName(parentNode);
        if (!Array.isArray(connectionsParent.main) || !connectionsParent.main.length) {
          return;
        }
        let siblingNode;
        let lastCheckedNodePosition = e.key === "ArrowUp" ? -99999999 : 99999999;
        let nextSelectNode = null;
        for (const ouputConnections of connectionsParent.main) {
          for (const ouputConnection of ouputConnections) {
            if (ouputConnection.node === lastSelectedNode.name) {
              continue;
            }
            siblingNode = this.workflowsStore.getNodeByName(ouputConnection.node);
            if (siblingNode) {
              if (e.key === "ArrowUp") {
                if (siblingNode.position[1] <= lastSelectedNode.position[1] && siblingNode.position[1] > lastCheckedNodePosition) {
                  nextSelectNode = siblingNode.name;
                  lastCheckedNodePosition = siblingNode.position[1];
                }
              } else {
                if (siblingNode.position[1] >= lastSelectedNode.position[1] && siblingNode.position[1] < lastCheckedNodePosition) {
                  nextSelectNode = siblingNode.name;
                  lastCheckedNodePosition = siblingNode.position[1];
                }
              }
            }
          }
        }
        if (nextSelectNode !== null) {
          void this.callDebounced(
            "nodeSelectedByName",
            { debounceTime: 100 },
            nextSelectNode,
            false,
            true
          );
        }
      }
    },
    deactivateSelectedNode() {
      if (!this.editAllowedCheck()) {
        return;
      }
      this.disableNodes(this.uiStore.getSelectedNodes, true);
    },
    deleteSelectedNodes() {
      const nodesToDelete = this.uiStore.getSelectedNodes.map((node) => {
        return node.name;
      });
      this.historyStore.startRecordingUndo();
      nodesToDelete.forEach((nodeName) => {
        this.removeNode(nodeName, true, false);
      });
      setTimeout(() => {
        this.historyStore.stopRecordingUndo();
      }, 200);
    },
    selectAllNodes() {
      this.nodes.forEach((node) => {
        this.nodeSelectedByName(node.name);
      });
    },
    selectUpstreamNodes() {
      const lastSelectedNode = this.lastSelectedNode;
      if (lastSelectedNode === null) {
        return;
      }
      this.deselectAllNodes();
      const workflow = this.getCurrentWorkflow();
      const checkNodes = this.getConnectedNodes("upstream", workflow, lastSelectedNode.name);
      for (const nodeName of checkNodes) {
        this.nodeSelectedByName(nodeName);
      }
      this.nodeSelectedByName(lastSelectedNode.name);
    },
    selectDownstreamNodes() {
      const lastSelectedNode = this.lastSelectedNode;
      if (lastSelectedNode === null) {
        return;
      }
      this.deselectAllNodes();
      const workflow = this.getCurrentWorkflow();
      const checkNodes = this.getConnectedNodes("downstream", workflow, lastSelectedNode.name);
      for (const nodeName of checkNodes) {
        this.nodeSelectedByName(nodeName);
      }
      this.nodeSelectedByName(lastSelectedNode.name);
    },
    pushDownstreamNodes(sourceNodeName, margin, recordHistory = false) {
      const sourceNode = this.workflowsStore.nodesByName[sourceNodeName];
      const workflow = this.getCurrentWorkflow();
      const checkNodes = this.getConnectedNodes("downstream", workflow, sourceNodeName);
      for (const nodeName of checkNodes) {
        const node = this.workflowsStore.nodesByName[nodeName];
        const oldPosition = node.position;
        if (node.position[0] < sourceNode.position[0]) {
          continue;
        }
        const updateInformation = {
          name: nodeName,
          properties: {
            position: [node.position[0] + margin, node.position[1]]
          }
        };
        this.workflowsStore.updateNodeProperties(updateInformation);
        this.onNodeMoved(node);
        if (recordHistory && oldPosition[0] !== updateInformation.properties.position[0] || oldPosition[1] !== updateInformation.properties.position[1]) {
          this.historyStore.pushCommandToUndo(
            new MoveNodeCommand(nodeName, oldPosition, updateInformation.properties.position),
            recordHistory
          );
        }
      }
    },
    cutSelectedNodes() {
      const deleteCopiedNodes = !this.isReadOnlyRoute && !this.readOnlyEnv;
      this.copySelectedNodes(deleteCopiedNodes);
      if (deleteCopiedNodes) {
        this.deleteSelectedNodes();
      }
    },
    copySelectedNodes(isCut) {
      void this.getSelectedNodesToSave().then((data) => {
        const workflowToCopy = {
          meta: {
            instanceId: this.rootStore.instanceId
          },
          ...data
        };
        this.removeForeignCredentialsFromWorkflow(
          workflowToCopy,
          this.credentialsStore.allCredentials
        );
        const nodeData = JSON.stringify(workflowToCopy, null, 2);
        this.copyToClipboard(nodeData);
        if (data.nodes.length > 0) {
          if (!isCut) {
            this.showMessage({
              title: "Copied!",
              message: "",
              type: "success"
            });
          }
          this.$telemetry.track("User copied nodes", {
            node_types: data.nodes.map((node) => node.type),
            workflow_id: this.workflowsStore.workflowId
          });
        }
      });
    },
    async stopExecution() {
      const executionId = this.workflowsStore.activeExecutionId;
      if (executionId === null) {
        return;
      }
      try {
        this.stopExecutionInProgress = true;
        await this.workflowsStore.stopCurrentExecution(executionId);
        this.showMessage({
          title: this.$locale.baseText("nodeView.showMessage.stopExecutionTry.title"),
          type: "success"
        });
      } catch (error) {
        const execution = await this.workflowsStore.getExecution(executionId);
        if (execution === void 0) {
          this.workflowsStore.finishActiveExecution({
            executionId,
            data: { finished: true, stoppedAt: /* @__PURE__ */ new Date() }
          });
          this.workflowsStore.executingNode.length = 0;
          this.uiStore.removeActiveAction("workflowRunning");
          this.titleSet(this.workflowsStore.workflowName, "IDLE");
          this.showMessage({
            title: this.$locale.baseText("nodeView.showMessage.stopExecutionCatch.unsaved.title"),
            message: this.$locale.baseText(
              "nodeView.showMessage.stopExecutionCatch.unsaved.message"
            ),
            type: "success"
          });
        } else if (execution == null ? void 0 : execution.finished) {
          const executedData = {
            data: execution.data,
            finished: execution.finished,
            mode: execution.mode,
            startedAt: execution.startedAt,
            stoppedAt: execution.stoppedAt
          };
          const pushData = {
            data: executedData,
            executionId,
            retryOf: execution.retryOf
          };
          this.workflowsStore.finishActiveExecution(pushData);
          this.titleSet(execution.workflowData.name, "IDLE");
          this.workflowsStore.executingNode.length = 0;
          this.workflowsStore.setWorkflowExecutionData(executedData);
          this.uiStore.removeActiveAction("workflowRunning");
          this.showMessage({
            title: this.$locale.baseText("nodeView.showMessage.stopExecutionCatch.title"),
            message: this.$locale.baseText("nodeView.showMessage.stopExecutionCatch.message"),
            type: "success"
          });
        } else {
          this.showError(error, this.$locale.baseText("nodeView.showError.stopExecution.title"));
        }
      }
      this.stopExecutionInProgress = false;
      void this.getWorkflowDataToSave().then((workflowData) => {
        const trackProps = {
          workflow_id: this.workflowsStore.workflowId,
          node_graph_string: JSON.stringify(
            generateNodesGraph(workflowData, this.getNodeTypes()).nodeGraph
          )
        };
        this.$telemetry.track("User clicked stop workflow execution", trackProps);
      });
    },
    async stopWaitingForWebhook() {
      try {
        await this.workflowsStore.removeTestWebhook(this.workflowsStore.workflowId);
      } catch (error) {
        this.showError(
          error,
          this.$locale.baseText("nodeView.showError.stopWaitingForWebhook.title")
        );
        return;
      }
    },
    /**
     * This method gets called when data got pasted into the window
     */
    async receivedCopyPasteData(plainTextData) {
      if (this.readOnlyEnv) {
        return;
      }
      const currentTab = getNodeViewTab(this.$route);
      if (currentTab === MAIN_HEADER_TABS.WORKFLOW) {
        let workflowData;
        if (!this.editAllowedCheck()) {
          return;
        }
        if (plainTextData.match(/^http[s]?:\/\/.*\.json$/i)) {
          if (!this.editAllowedCheck()) {
            return;
          }
          const importConfirm = await this.confirm(
            this.$locale.baseText("nodeView.confirmMessage.receivedCopyPasteData.message", {
              interpolate: { plainTextData }
            }),
            this.$locale.baseText("nodeView.confirmMessage.receivedCopyPasteData.headline"),
            {
              type: "warning",
              confirmButtonText: this.$locale.baseText(
                "nodeView.confirmMessage.receivedCopyPasteData.confirmButtonText"
              ),
              cancelButtonText: this.$locale.baseText(
                "nodeView.confirmMessage.receivedCopyPasteData.cancelButtonText"
              ),
              dangerouslyUseHTMLString: true
            }
          );
          if (importConfirm !== MODAL_CONFIRM) {
            return;
          }
          workflowData = await this.getWorkflowDataFromUrl(plainTextData);
          if (workflowData === void 0) {
            return;
          }
        } else {
          try {
            workflowData = JSON.parse(plainTextData);
            if (!this.editAllowedCheck()) {
              return;
            }
          } catch (e) {
            return;
          }
        }
        return this.importWorkflowData(workflowData, "paste", false);
      }
    },
    // Returns the workflow data from a given URL. If no data gets found or
    // data is invalid it returns undefined and displays an error message by itself.
    async getWorkflowDataFromUrl(url) {
      let workflowData;
      this.startLoading();
      try {
        workflowData = await this.workflowsStore.getWorkflowFromUrl(url);
      } catch (error) {
        this.stopLoading();
        this.showError(
          error,
          this.$locale.baseText("nodeView.showError.getWorkflowDataFromUrl.title")
        );
        return;
      }
      this.stopLoading();
      return workflowData;
    },
    // Imports the given workflow data into the current workflow
    async importWorkflowData(workflowData, source, importTags = true) {
      if (!workflowData.hasOwnProperty("nodes") || !workflowData.hasOwnProperty("connections")) {
        return;
      }
      try {
        const nodeIdMap = {};
        if (workflowData.nodes) {
          workflowData.nodes.forEach((node) => {
            if (node.webhookId && UPDATE_WEBHOOK_ID_NODE_TYPES.includes(node.type)) {
              const isDuplicate = Object.values(this.getCurrentWorkflow().nodes).some(
                (n) => n.webhookId === node.webhookId
              );
              if (isDuplicate) {
                node.webhookId = v4();
              }
            }
            if (node.id) {
              const newId = v4();
              nodeIdMap[newId] = node.id;
              node.id = newId;
            } else {
              node.id = v4();
            }
          });
        }
        this.removeUnknownCredentials(workflowData);
        const currInstanceId = this.rootStore.instanceId;
        const nodeGraph = JSON.stringify(
          generateNodesGraph(workflowData, this.getNodeTypes(), {
            nodeIdMap,
            sourceInstanceId: workflowData.meta && workflowData.meta.instanceId !== currInstanceId ? workflowData.meta.instanceId : ""
          }).nodeGraph
        );
        if (source === "paste") {
          this.$telemetry.track("User pasted nodes", {
            workflow_id: this.workflowsStore.workflowId,
            node_graph_string: nodeGraph
          });
        } else {
          this.$telemetry.track("User imported workflow", {
            source,
            workflow_id: this.workflowsStore.workflowId,
            node_graph_string: nodeGraph
          });
        }
        this.deselectAllNodes();
        this.updateNodePositions(
          workflowData,
          getNewNodePosition(this.nodes, this.lastClickPosition)
        );
        const data = await this.addNodesToWorkflow(workflowData);
        setTimeout(() => {
          data.nodes.forEach((node) => {
            this.nodeSelectedByName(node.name);
          });
        });
        const tagsEnabled = this.settingsStore.areTagsEnabled;
        if (importTags && tagsEnabled && Array.isArray(workflowData.tags)) {
          const allTags = await this.tagsStore.fetchAll();
          const tagNames = new Set(allTags.map((tag) => tag.name));
          const workflowTags = workflowData.tags;
          const notFound = workflowTags.filter((tag) => !tagNames.has(tag.name));
          const creatingTagPromises = [];
          for (const tag of notFound) {
            const creationPromise = this.tagsStore.create(tag.name).then((tag2) => {
              allTags.push(tag2);
              return tag2;
            });
            creatingTagPromises.push(creationPromise);
          }
          await Promise.all(creatingTagPromises);
          const tagIds = workflowTags.reduce((accu, imported) => {
            const tag = allTags.find((tag2) => tag2.name === imported.name);
            if (tag) {
              accu.push(tag.id);
            }
            return accu;
          }, []);
          this.workflowsStore.addWorkflowTagIds(tagIds);
        }
      } catch (error) {
        this.showError(error, this.$locale.baseText("nodeView.showError.importWorkflowData.title"));
      }
    },
    removeUnknownCredentials(workflow) {
      if (!(workflow == null ? void 0 : workflow.nodes))
        return;
      for (const node of workflow.nodes) {
        if (!node.credentials)
          continue;
        for (const [name, credential] of Object.entries(node.credentials)) {
          if (credential.id === null)
            continue;
          if (!this.credentialsStore.getCredentialById(credential.id)) {
            delete node.credentials[name];
          }
        }
      }
    },
    onDragOver(event) {
      event.preventDefault();
    },
    async onDrop(event) {
      if (!event.dataTransfer) {
        return;
      }
      const dropData = jsonParse(
        event.dataTransfer.getData(DRAG_EVENT_DATA_KEY)
      );
      if (dropData) {
        const mousePosition = this.getMousePositionWithinNodeView(event);
        const insertNodePosition = [
          mousePosition[0] - NODE_SIZE / 2 + GRID_SIZE,
          mousePosition[1] - NODE_SIZE / 2
        ];
        await this.onAddNodes(dropData, true, insertNodePosition);
        this.createNodeActive = false;
      }
    },
    nodeDeselectedByName(nodeName) {
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (node) {
        this.nodeDeselected(node);
      }
    },
    nodeSelectedByName(nodeName, setActive = false, deselectAllOthers) {
      if (deselectAllOthers === true) {
        this.deselectAllNodes();
      }
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (node) {
        this.nodeSelected(node);
        this.uiStore.lastSelectedNode = node.name;
        this.uiStore.lastSelectedNodeOutputIndex = null;
        this.uiStore.lastSelectedNodeEndpointUuid = null;
        this.canvasStore.lastSelectedConnection = null;
        this.canvasStore.newNodeInsertPosition = null;
        if (setActive) {
          this.ndvStore.activeNodeName = node.name;
        }
      }
    },
    showMaxNodeTypeError(nodeTypeData) {
      const maxNodes = nodeTypeData.maxNodes;
      this.showMessage({
        title: this.$locale.baseText("nodeView.showMessage.showMaxNodeTypeError.title"),
        message: this.$locale.baseText("nodeView.showMessage.showMaxNodeTypeError.message", {
          adjustToNumber: maxNodes,
          interpolate: { nodeTypeDataDisplayName: nodeTypeData.displayName }
        }),
        type: "error",
        duration: 0
      });
    },
    async getNewNodeWithDefaultCredential(nodeTypeData, overrides) {
      var _a, _b, _c, _d;
      let nodeVersion = nodeTypeData.defaultVersion;
      if (nodeVersion === void 0) {
        nodeVersion = Array.isArray(nodeTypeData.version) ? nodeTypeData.version.slice(-1)[0] : nodeTypeData.version;
      }
      const newNodeData = {
        id: v4(),
        name: overrides.name ?? nodeTypeData.defaults.name,
        type: nodeTypeData.name,
        typeVersion: nodeVersion,
        position: [0, 0],
        parameters: {}
      };
      const credentialPerType = (_a = nodeTypeData.credentials) == null ? void 0 : _a.map((type) => this.credentialsStore.getUsableCredentialByType(type.name)).flat();
      if (credentialPerType && credentialPerType.length === 1) {
        const defaultCredential = credentialPerType[0];
        const selectedCredentials = this.credentialsStore.getCredentialById(defaultCredential.id);
        const selected = { id: selectedCredentials.id, name: selectedCredentials.name };
        const credentials = {
          [defaultCredential.type]: selected
        };
        await this.loadNodesProperties(
          [newNodeData].map((node) => ({ name: node.type, version: node.typeVersion }))
        );
        const nodeType = this.nodeTypesStore.getNodeType(newNodeData.type, newNodeData.typeVersion);
        const nodeParameters = getNodeParameters(
          (nodeType == null ? void 0 : nodeType.properties) || [],
          {},
          true,
          false,
          newNodeData
        );
        if (nodeTypeData.credentials) {
          const authentication = nodeTypeData.credentials.find(
            (type) => type.name === defaultCredential.type
          );
          if ((_b = authentication == null ? void 0 : authentication.displayOptions) == null ? void 0 : _b.hide) {
            return newNodeData;
          }
          const authDisplayOptions = (_c = authentication == null ? void 0 : authentication.displayOptions) == null ? void 0 : _c.show;
          if (!authDisplayOptions) {
            newNodeData.credentials = credentials;
            return newNodeData;
          }
          if (Object.keys(authDisplayOptions).length === 1 && authDisplayOptions.authentication) {
            newNodeData.credentials = credentials;
            let parameters = {};
            for (const displayOption of Object.keys(authDisplayOptions)) {
              if (nodeParameters && !nodeParameters[displayOption]) {
                parameters = {};
                newNodeData.credentials = void 0;
                break;
              }
              const optionValue = (_d = authDisplayOptions[displayOption]) == null ? void 0 : _d[0];
              if (optionValue && typeof optionValue === "string") {
                parameters[displayOption] = optionValue;
              }
              newNodeData.parameters = {
                ...newNodeData.parameters,
                ...parameters
              };
            }
          }
        }
      }
      return newNodeData;
    },
    async injectNode(nodeTypeName, options = {}, showDetail = true, trackHistory = false, isAutoAdd = false) {
      var _a, _b;
      const nodeTypeData = this.nodeTypesStore.getNodeType(nodeTypeName);
      if (nodeTypeData === null) {
        this.showMessage({
          title: this.$locale.baseText("nodeView.showMessage.addNodeButton.title"),
          message: this.$locale.baseText("nodeView.showMessage.addNodeButton.message", {
            interpolate: { nodeTypeName }
          }),
          type: "error"
        });
        return;
      }
      if (nodeTypeData.maxNodes !== void 0 && this.getNodeTypeCount(nodeTypeName) >= nodeTypeData.maxNodes) {
        this.showMaxNodeTypeError(nodeTypeData);
        return;
      }
      const newNodeData = await this.getNewNodeWithDefaultCredential(nodeTypeData, {
        name: options.name
      });
      const lastSelectedNode = this.lastSelectedNode;
      if (options.position) {
        newNodeData.position = getNewNodePosition(
          this.canvasStore.getNodesWithPlaceholderNode(),
          options.position
        );
      } else if (lastSelectedNode) {
        const lastSelectedConnection = this.canvasStore.lastSelectedConnection;
        if (lastSelectedConnection) {
          const [diffX] = getConnectorLengths(lastSelectedConnection);
          if (diffX <= MAX_X_TO_PUSH_DOWNSTREAM_NODES) {
            this.pushDownstreamNodes(
              lastSelectedNode.name,
              PUSH_NODES_OFFSET,
              trackHistory
            );
          }
        }
        if (this.canvasStore.newNodeInsertPosition) {
          newNodeData.position = getNewNodePosition(this.nodes, [
            this.canvasStore.newNodeInsertPosition[0] + GRID_SIZE,
            this.canvasStore.newNodeInsertPosition[1] - NODE_SIZE / 2
          ]);
          this.canvasStore.newNodeInsertPosition = null;
        } else {
          let yOffset = 0;
          const workflow = this.getCurrentWorkflow();
          if (lastSelectedConnection) {
            const sourceNodeType = this.nodeTypesStore.getNodeType(
              lastSelectedNode.type,
              lastSelectedNode.typeVersion
            );
            if (sourceNodeType) {
              const offsets = [
                [-100, 100],
                [-140, 0, 140],
                [-240, -100, 100, 240]
              ];
              const sourceNodeOutputs = getNodeOutputs(
                workflow,
                lastSelectedNode,
                sourceNodeType
              );
              const sourceNodeOutputTypes = getConnectionTypes(sourceNodeOutputs);
              const sourceNodeOutputMainOutputs = sourceNodeOutputTypes.filter(
                (output) => output === NodeConnectionType.Main
              );
              if (sourceNodeOutputMainOutputs.length > 1) {
                const offset = offsets[sourceNodeOutputMainOutputs.length - 2];
                const sourceOutputIndex = lastSelectedConnection.__meta ? lastSelectedConnection.__meta.sourceOutputIndex : 0;
                yOffset = offset[sourceOutputIndex];
              }
            }
          }
          let outputs = [];
          try {
            outputs = getNodeOutputs(workflow, newNodeData, nodeTypeData);
          } catch (e) {
          }
          const outputTypes = getConnectionTypes(outputs);
          const lastSelectedNodeType = this.nodeTypesStore.getNodeType(
            lastSelectedNode.type,
            lastSelectedNode.typeVersion
          );
          if (outputTypes.length > 0 && outputTypes.every((outputName) => outputName !== NodeConnectionType.Main)) {
            const lastSelectedNodeWorkflow = workflow.getNode(lastSelectedNode.name);
            const lastSelectedInputs = getNodeInputs(
              workflow,
              lastSelectedNodeWorkflow,
              lastSelectedNodeType
            );
            const lastSelectedInputTypes = getConnectionTypes(lastSelectedInputs);
            const scopedConnectionIndex = (lastSelectedInputTypes || []).filter((input) => input !== NodeConnectionType.Main).findIndex((inputType) => outputs[0] === inputType);
            newNodeData.position = getNewNodePosition(
              this.nodes,
              [
                lastSelectedNode.position[0] + NODE_SIZE / (Math.max(((_a = lastSelectedNodeType == null ? void 0 : lastSelectedNodeType.inputs) == null ? void 0 : _a.length) ?? 1), 1) * scopedConnectionIndex,
                lastSelectedNode.position[1] + PUSH_NODES_OFFSET
              ],
              [100, 0]
            );
          } else {
            const inputs = getNodeInputs(
              workflow,
              lastSelectedNode,
              lastSelectedNodeType
            );
            const inputsTypes = getConnectionTypes(inputs);
            let pushOffset = PUSH_NODES_OFFSET;
            if (!!inputsTypes.find((input) => input !== NodeConnectionType.Main)) {
              pushOffset += 150;
            }
            newNodeData.position = getNewNodePosition(
              this.nodes,
              [lastSelectedNode.position[0] + pushOffset, lastSelectedNode.position[1] + yOffset],
              [100, 0]
            );
          }
        }
      } else {
        const position = this.nodeTypesStore.isTriggerNode(nodeTypeName) && !this.containsTrigger ? this.canvasStore.canvasAddButtonPosition : (
          // If no node is active find a free spot
          this.lastClickPosition
        );
        newNodeData.position = getNewNodePosition(this.nodes, position);
      }
      const localizedName = this.locale.localizeNodeName(newNodeData.name, newNodeData.type);
      newNodeData.name = this.uniqueNodeName(localizedName);
      if ((_b = nodeTypeData.webhooks) == null ? void 0 : _b.length) {
        newNodeData.webhookId = v4();
      }
      await this.addNodes([newNodeData], void 0, trackHistory);
      this.workflowsStore.setNodePristine(newNodeData.name, true);
      this.uiStore.stateIsDirty = true;
      if (nodeTypeName === STICKY_NODE_TYPE) {
        this.$telemetry.trackNodesPanel("nodeView.addSticky", {
          workflow_id: this.workflowsStore.workflowId
        });
      } else {
        void this.$externalHooks().run("nodeView.addNodeButton", { nodeTypeName });
        useSegment().trackAddedTrigger(nodeTypeName);
        const trackProperties = {
          node_type: nodeTypeName,
          is_auto_add: isAutoAdd,
          workflow_id: this.workflowsStore.workflowId,
          drag_and_drop: options.dragAndDrop
        };
        if (lastSelectedNode) {
          trackProperties.input_node_type = lastSelectedNode.type;
        }
        this.$telemetry.trackNodesPanel("nodeView.addNodeButton", trackProperties);
      }
      if (trackHistory) {
        this.deselectAllNodes();
        setTimeout(() => {
          this.nodeSelectedByName(
            newNodeData.name,
            showDetail && nodeTypeName !== STICKY_NODE_TYPE
          );
        });
      }
      return newNodeData;
    },
    getConnection(sourceNodeName, sourceNodeOutputIndex, targetNodeName, targetNodeOuputIndex, type) {
      const nodeConnections = this.workflowsStore.outgoingConnectionsByNodeName(sourceNodeName)[type];
      if (nodeConnections) {
        const connections = nodeConnections[sourceNodeOutputIndex];
        if (connections) {
          return connections.find(
            (connection) => connection.node === targetNodeName && connection.index === targetNodeOuputIndex
          );
        }
      }
      return void 0;
    },
    connectTwoNodes(sourceNodeName, sourceNodeOutputIndex, targetNodeName, targetNodeOutputIndex, type) {
      this.uiStore.stateIsDirty = true;
      const sourceNode = this.workflowsStore.getNodeByName(sourceNodeName);
      const targetNode = this.workflowsStore.getNodeByName(targetNodeName);
      if (sourceNode && targetNode && !this.checkNodeConnectionAllowed(sourceNode, targetNode, type)) {
        return;
      }
      if (this.getConnection(
        sourceNodeName,
        sourceNodeOutputIndex,
        targetNodeName,
        targetNodeOutputIndex,
        type
      )) {
        return;
      }
      const connectionData = [
        {
          node: sourceNodeName,
          type,
          index: sourceNodeOutputIndex
        },
        {
          node: targetNodeName,
          type,
          index: targetNodeOutputIndex
        }
      ];
      this.__addConnection(connectionData);
    },
    async addNode(nodeTypeName, options = {}, showDetail = true, trackHistory = false, isAutoAdd = false) {
      var _a;
      if (!this.editAllowedCheck()) {
        return;
      }
      const lastSelectedNode = this.lastSelectedNode;
      const lastSelectedNodeOutputIndex = this.uiStore.lastSelectedNodeOutputIndex;
      const lastSelectedNodeEndpointUuid = this.uiStore.lastSelectedNodeEndpointUuid;
      const lastSelectedConnection = this.canvasStore.lastSelectedConnection;
      this.historyStore.startRecordingUndo();
      const newNodeData = await this.injectNode(
        nodeTypeName,
        options,
        showDetail,
        trackHistory,
        isAutoAdd
      );
      if (!newNodeData) {
        return;
      }
      const outputIndex = lastSelectedNodeOutputIndex || 0;
      const targetEndpoint = lastSelectedNodeEndpointUuid || "";
      if (lastSelectedNodeEndpointUuid && !isAutoAdd) {
        const lastSelectedEndpoint = this.instance.getEndpoint(lastSelectedNodeEndpointUuid);
        if (lastSelectedEndpoint && this.checkNodeConnectionAllowed(
          lastSelectedNode,
          newNodeData,
          lastSelectedEndpoint.scope
        )) {
          const connectionType = lastSelectedEndpoint.scope;
          const newNodeElement = this.instance.getManagedElement(newNodeData.id);
          const newNodeConnections = this.instance.getEndpoints(newNodeElement);
          const viableConnection = newNodeConnections.find((conn) => {
            return conn.scope === connectionType && lastSelectedEndpoint.parameters.connection !== conn.parameters.connection;
          });
          (_a = this.instance) == null ? void 0 : _a.connect({
            uuids: [targetEndpoint, (viableConnection == null ? void 0 : viableConnection.uuid) || ""],
            detachable: !this.isReadOnlyRoute && !this.readOnlyEnv
          });
          this.historyStore.stopRecordingUndo();
          return;
        }
      }
      if (lastSelectedNode && !isAutoAdd) {
        await this.$nextTick();
        if (lastSelectedConnection == null ? void 0 : lastSelectedConnection.__meta) {
          this.__deleteJSPlumbConnection(lastSelectedConnection, trackHistory);
          const targetNodeName = lastSelectedConnection.__meta.targetNodeName;
          const targetOutputIndex = lastSelectedConnection.__meta.targetOutputIndex;
          this.connectTwoNodes(
            newNodeData.name,
            0,
            targetNodeName,
            targetOutputIndex,
            NodeConnectionType.Main
          );
        }
        this.connectTwoNodes(
          lastSelectedNode.name,
          outputIndex,
          newNodeData.name,
          0,
          NodeConnectionType.Main
        );
      }
      this.historyStore.stopRecordingUndo();
    },
    insertNodeAfterSelected(info) {
      var _a, _b, _c;
      const type = info.outputType || NodeConnectionType.Main;
      let filter;
      const sourceNode = this.workflowsStore.getNodeById(info.sourceId);
      if (!sourceNode) {
        return;
      }
      const workflow = this.getCurrentWorkflow();
      const nodeType = this.nodeTypesStore.getNodeType(sourceNode.type, sourceNode.typeVersion);
      if (nodeType) {
        const workflowNode = workflow.getNode(sourceNode.name);
        const inputs = getNodeInputs(workflow, workflowNode, nodeType);
        const filterFound = inputs.filter((input) => {
          if (typeof input === "string" || input.type !== info.outputType || !input.filter) {
            return false;
          }
          return true;
        });
        if (filterFound.length) {
          filter = filterFound[0].filter;
        }
      }
      this.uiStore.lastSelectedNode = sourceNode.name;
      this.uiStore.lastSelectedNodeEndpointUuid = info.endpointUuid ?? ((_b = (_a = info.connection) == null ? void 0 : _a.target.jtk) == null ? void 0 : _b.endpoint.uuid);
      this.uiStore.lastSelectedNodeOutputIndex = info.index;
      this.canvasStore.newNodeInsertPosition = null;
      if (info.connection) {
        this.canvasStore.lastSelectedConnection = info.connection;
      }
      this.onToggleNodeCreator({
        source: info.eventSource,
        createNodeActive: true,
        nodeCreatorView: info.nodeCreatorView
      });
      const isOutput = ((_c = info.connection) == null ? void 0 : _c.endpoints[0].parameters.connection) === "source";
      const isScopedConnection = type !== NodeConnectionType.Main && Object.values(NodeConnectionType).includes(type);
      if (isScopedConnection) {
        useViewStacks().gotoCompatibleConnectionView(type, isOutput, filter).catch((e) => {
        });
      }
    },
    onEventConnectionAbort(connection) {
      try {
        if (this.dropPrevented) {
          this.dropPrevented = false;
          return;
        }
        if (this.pullConnActiveNodeName) {
          const sourceNode = this.workflowsStore.getNodeById(connection.parameters.nodeId);
          if (sourceNode) {
            const sourceNodeName = sourceNode.name;
            const outputIndex = connection.parameters.index;
            this.connectTwoNodes(
              sourceNodeName,
              outputIndex,
              this.pullConnActiveNodeName,
              0,
              NodeConnectionType.Main
            );
            this.pullConnActiveNodeName = null;
            this.dropPrevented = true;
          }
          return;
        }
        this.insertNodeAfterSelected({
          sourceId: connection.parameters.nodeId,
          index: connection.parameters.index,
          eventSource: NODE_CREATOR_OPEN_SOURCES.NODE_CONNECTION_DROP,
          connection,
          outputType: connection.parameters.type
        });
      } catch (e) {
        console.error(e);
      }
    },
    checkNodeConnectionAllowed(sourceNode, targetNode, targetInfoType) {
      var _a;
      const targetNodeType = this.nodeTypesStore.getNodeType(
        targetNode.type,
        targetNode.typeVersion
      );
      if ((_a = targetNodeType == null ? void 0 : targetNodeType.inputs) == null ? void 0 : _a.length) {
        const workflow = this.getCurrentWorkflow();
        const workflowNode = workflow.getNode(targetNode.name);
        let inputs = [];
        if (targetNodeType) {
          inputs = getNodeInputs(workflow, workflowNode, targetNodeType);
        }
        for (const input of inputs || []) {
          if (typeof input === "string" || input.type !== targetInfoType || !input.filter) {
            continue;
          }
          if (input.filter.nodes.length) {
            if (!input.filter.nodes.includes(sourceNode.type)) {
              this.dropPrevented = true;
              this.showToast({
                title: this.$locale.baseText("nodeView.showError.nodeNodeCompatible.title"),
                message: this.$locale.baseText("nodeView.showError.nodeNodeCompatible.message", {
                  interpolate: { sourceNodeName: sourceNode.name, targetNodeName: targetNode.name }
                }),
                type: "error",
                duration: 5e3
              });
              return false;
            }
          }
        }
      }
      return true;
    },
    onInterceptBeforeDrop(info) {
      try {
        let sourceInfo;
        let targetInfo;
        if (info.connection.endpoints[0].parameters.connection === "target") {
          sourceInfo = info.dropEndpoint.parameters;
          targetInfo = info.connection.endpoints[0].parameters;
        } else {
          sourceInfo = info.connection.endpoints[0].parameters;
          targetInfo = info.dropEndpoint.parameters;
        }
        if (sourceInfo.type !== targetInfo.type || sourceInfo.connection === targetInfo.connection) {
          this.dropPrevented = true;
          return false;
        }
        const sourceNode = this.workflowsStore.getNodeById(sourceInfo.nodeId);
        const targetNode = this.workflowsStore.getNodeById(targetInfo.nodeId);
        const sourceNodeName = (sourceNode == null ? void 0 : sourceNode.name) || "";
        const targetNodeName = (targetNode == null ? void 0 : targetNode.name) || "";
        if (sourceNode && targetNode) {
          if (!this.checkNodeConnectionAllowed(sourceNode, targetNode, targetInfo.type)) {
            return false;
          }
        }
        if (this.getConnection(
          sourceNodeName,
          sourceInfo.index,
          targetNodeName,
          targetInfo.index,
          sourceInfo.type
        )) {
          this.dropPrevented = true;
          this.pullConnActiveNodeName = null;
          return false;
        }
        return true;
      } catch (e) {
        console.error(e);
        return true;
      }
    },
    onEventConnection(info) {
      var _a, _b;
      try {
        if (info.sourceEndpoint.parameters.connection === "target") {
          const tempEndpoint = info.sourceEndpoint;
          info.sourceEndpoint = info.targetEndpoint;
          info.targetEndpoint = tempEndpoint;
        }
        const sourceInfo = info.sourceEndpoint.parameters;
        const targetInfo = info.targetEndpoint.parameters;
        const sourceNodeName = (_a = this.workflowsStore.getNodeById(sourceInfo.nodeId)) == null ? void 0 : _a.name;
        const targetNodeName = (_b = this.workflowsStore.getNodeById(targetInfo.nodeId)) == null ? void 0 : _b.name;
        if (sourceNodeName && targetNodeName) {
          info.connection.__meta = {
            sourceNodeName,
            sourceOutputIndex: sourceInfo.index,
            targetNodeName,
            targetOutputIndex: targetInfo.index
          };
        }
        resetConnection(info.connection);
        moveBackInputLabelPosition(info.targetEndpoint);
        const connectionData = [
          {
            node: sourceNodeName,
            type: sourceInfo.type,
            index: sourceInfo.index
          },
          {
            node: targetNodeName,
            type: targetInfo.type,
            index: targetInfo.index
          }
        ];
        this.dropPrevented = true;
        this.workflowsStore.addConnection({ connection: connectionData });
        this.uiStore.stateIsDirty = true;
        if (!this.suspendRecordingDetachedConnections) {
          this.historyStore.pushCommandToUndo(new AddConnectionCommand(connectionData));
        }
        if (!this.isReadOnlyRoute && !this.readOnlyEnv) {
          hideOutputNameLabel(info.sourceEndpoint);
          addConnectionActionsOverlay(
            info.connection,
            () => {
              this.activeConnection = null;
              this.__deleteJSPlumbConnection(info.connection);
            },
            () => {
              this.insertNodeAfterSelected({
                sourceId: info.sourceEndpoint.parameters.nodeId,
                index: sourceInfo.index,
                connection: info.connection,
                eventSource: NODE_CREATOR_OPEN_SOURCES.NODE_CONNECTION_ACTION
              });
            }
          );
          setTimeout(() => {
            addConnectionTestData(
              info.source,
              info.target,
              "canvas" in info.connection.connector ? info.connection.connector.canvas : void 0
            );
          }, 0);
          const endpointArrow = getOverlay(
            info.connection,
            OVERLAY_ENDPOINT_ARROW_ID
          );
          if (sourceInfo.type !== NodeConnectionType.Main) {
            info.connection.setPaintStyle(
              getConnectorPaintStyleData(info.connection, info.sourceEndpoint.parameters.category)
            );
            endpointArrow == null ? void 0 : endpointArrow.setVisible(false);
          }
        }
        this.dropPrevented = false;
        void this.updateNodesInputIssues();
      } catch (e) {
        console.error(e);
      }
    },
    onDragMove() {
      var _a;
      (_a = this.instance) == null ? void 0 : _a.connections.forEach((connection) => {
        showOrHideItemsLabel(connection);
        showOrHideMidpointArrow(connection);
        Object.values(connection.overlays).forEach((overlay) => {
          var _a2;
          if (!overlay.canvas)
            return;
          (_a2 = this.instance) == null ? void 0 : _a2.repaint(overlay.canvas);
        });
      });
    },
    isConnectionActive(connection) {
      var _a, _b;
      if (!(connection == null ? void 0 : connection.id) || !((_a = this.activeConnection) == null ? void 0 : _a.id))
        return false;
      return ((_b = this.activeConnection) == null ? void 0 : _b.id) === connection.id;
    },
    onConnectionMouseOver(connection) {
      try {
        if (this.exitTimer !== void 0) {
          clearTimeout(this.exitTimer);
          this.exitTimer = void 0;
        }
        if (
          // eslint-disable-next-line no-constant-binary-expression
          this.isReadOnlyRoute ?? this.readOnlyEnv ?? this.enterTimer ?? !connection ?? this.isConnectionActive(connection)
        )
          return;
        this.enterTimer = setTimeout(() => {
          if (this.activeConnection && !this.isConnectionActive(connection)) {
            hideConnectionActions(this.activeConnection);
          }
          this.enterTimer = void 0;
          if (connection) {
            showConnectionActions(connection);
            this.activeConnection = connection;
          }
        }, 150);
      } catch (e) {
        console.error(e);
      }
    },
    onConnectionMouseOut(connection) {
      try {
        if (this.exitTimer)
          return;
        if (this.enterTimer) {
          clearTimeout(this.enterTimer);
          this.enterTimer = void 0;
        }
        if (
          // eslint-disable-next-line no-constant-binary-expression
          this.isReadOnlyRoute ?? this.readOnlyEnv ?? !connection ?? !this.isConnectionActive(connection)
        )
          return;
        this.exitTimer = setTimeout(() => {
          this.exitTimer = void 0;
          if (connection && this.isConnectionActive(connection)) {
            hideConnectionActions(this.activeConnection);
            this.activeConnection = null;
          }
        }, 500);
      } catch (e) {
        console.error(e);
      }
    },
    onConnectionMoved(info) {
      var _a, _b;
      try {
        resetInputLabelPosition(info.connection);
        const sourceInfo = info.connection.parameters;
        const targetInfo = info.originalEndpoint.parameters;
        const connectionInfo = [
          {
            node: ((_a = this.workflowsStore.getNodeById(sourceInfo.nodeId)) == null ? void 0 : _a.name) || "",
            type: sourceInfo.type,
            index: sourceInfo.index
          },
          {
            node: ((_b = this.workflowsStore.getNodeById(targetInfo.nodeId)) == null ? void 0 : _b.name) || "",
            type: targetInfo.type,
            index: targetInfo.index
          }
        ];
        this.__removeConnection(connectionInfo, false);
      } catch (e) {
        console.error(e);
      }
    },
    onEndpointMouseOver(endpoint, mouse) {
      if (!endpoint.isTarget || mouse.target !== endpoint.endpoint.canvas)
        return;
      this.instance.setHover(endpoint, true);
    },
    onEndpointMouseOut(endpoint) {
      if (!endpoint.isTarget)
        return;
      this.instance.setHover(endpoint, false);
    },
    async onConnectionDetached(info) {
      try {
        if (info.sourceEndpoint.parameters.connection === "target") {
          const tempEndpoint = info.sourceEndpoint;
          info.sourceEndpoint = info.targetEndpoint;
          info.targetEndpoint = tempEndpoint;
        }
        const connectionInfo = getConnectionInfo(info);
        resetInputLabelPosition(info.targetEndpoint);
        showOutputNameLabel(info.sourceEndpoint, info.connection);
        info.connection.removeOverlays();
        this.__removeConnectionByConnectionInfo(info, false, false);
        if (this.pullConnActiveNodeName) {
          this.historyStore.startRecordingUndo();
          const sourceNode = this.workflowsStore.getNodeById(info.connection.parameters.nodeId);
          const sourceNodeName = sourceNode.name;
          const outputIndex = info.connection.parameters.index;
          if (connectionInfo) {
            this.historyStore.pushCommandToUndo(new RemoveConnectionCommand(connectionInfo));
          }
          this.connectTwoNodes(
            sourceNodeName,
            outputIndex,
            this.pullConnActiveNodeName,
            0,
            NodeConnectionType.Main
          );
          this.pullConnActiveNodeName = null;
          await this.$nextTick();
          this.historyStore.stopRecordingUndo();
        } else if (!this.historyStore.bulkInProgress && !this.suspendRecordingDetachedConnections && connectionInfo) {
          const removeCommand = new RemoveConnectionCommand(connectionInfo, this);
          this.historyStore.pushCommandToUndo(removeCommand);
        }
        void this.updateNodesInputIssues();
      } catch (e) {
        console.error(e);
      }
    },
    onConnectionDrag(connection) {
      var _a;
      (_a = connection.overlays["midpoint-arrow"]) == null ? void 0 : _a.setVisible(false);
      try {
        this.pullConnActiveNodeName = null;
        this.pullConnActive = true;
        this.canvasStore.newNodeInsertPosition = null;
        resetConnection(connection);
        const nodes = [...document.querySelectorAll(".node-wrapper")];
        const onMouseMove = (e) => {
          if (!connection) {
            return;
          }
          const element = document.querySelector(".jtk-endpoint.jtk-drag-hover");
          if (element) {
            const endpoint = element.jtk.endpoint;
            showDropConnectionState(connection, endpoint);
            return;
          }
          const inputMargin = 24;
          const intersecting = nodes.find((element2) => {
            var _a2;
            const { top, left, right, bottom } = element2.getBoundingClientRect();
            const [x, y] = getMousePosition(e);
            if (top <= y && bottom >= y && left - inputMargin <= x && right >= x) {
              const nodeName = element2.dataset.name;
              const node = this.workflowsStore.getNodeByName(nodeName);
              if (node) {
                const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
                const workflow = this.getCurrentWorkflow();
                const workflowNode = workflow.getNode(nodeName);
                const inputs = getNodeInputs(workflow, workflowNode, nodeType);
                if (nodeType && inputs.length === 1) {
                  this.pullConnActiveNodeName = node.name;
                  const endpointUUID = this.getInputEndpointUUID(
                    nodeName,
                    connection.parameters.type,
                    0
                  );
                  if (endpointUUID) {
                    const endpoint = (_a2 = this.instance) == null ? void 0 : _a2.getEndpoint(endpointUUID);
                    showDropConnectionState(connection, endpoint);
                    return true;
                  }
                }
              }
            }
            return false;
          });
          if (!intersecting) {
            showPullConnectionState(connection);
            this.pullConnActiveNodeName = null;
          }
        };
        const onMouseUp = (e) => {
          this.pullConnActive = false;
          this.canvasStore.newNodeInsertPosition = this.getMousePositionWithinNodeView(e);
          resetConnectionAfterPull(connection);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
          this.connectionDragScope = {
            type: null,
            connection: null
          };
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onMouseMove);
        this.connectionDragScope = {
          type: connection.parameters.type,
          connection: connection.parameters.connection
        };
      } catch (e) {
        console.error(e);
      }
    },
    onConnectionDragAbortDetached(connection) {
      var _a;
      Object.values((_a = this.instance) == null ? void 0 : _a.endpointsByElement).flatMap((endpoints) => Object.values(endpoints)).filter((endpoint) => endpoint.endpoint.type === "N8nPlus").forEach((endpoint) => setTimeout(() => endpoint.instance.revalidate(endpoint.element), 0));
    },
    onPlusEndpointClick(endpoint) {
      if (endpoint == null ? void 0 : endpoint.__meta) {
        this.insertNodeAfterSelected({
          sourceId: endpoint.__meta.nodeId,
          index: endpoint.__meta.index,
          eventSource: NODE_CREATOR_OPEN_SOURCES.PLUS_ENDPOINT,
          outputType: endpoint.scope,
          endpointUuid: endpoint.uuid
        });
      }
    },
    onAddInputEndpointClick(endpoint) {
      if (endpoint == null ? void 0 : endpoint.__meta) {
        this.insertNodeAfterSelected({
          sourceId: endpoint.__meta.nodeId,
          index: endpoint.__meta.index,
          eventSource: NODE_CREATOR_OPEN_SOURCES.ADD_INPUT_ENDPOINT,
          nodeCreatorView: AI_NODE_CREATOR_VIEW,
          outputType: endpoint.scope,
          endpointUuid: endpoint.uuid
        });
      }
    },
    bindCanvasEvents() {
      if (this.eventsAttached)
        return;
      this.instance.bind(EVENT_CONNECTION_ABORT, this.onEventConnectionAbort);
      this.instance.bind(INTERCEPT_BEFORE_DROP, this.onInterceptBeforeDrop);
      this.instance.bind(EVENT_CONNECTION, this.onEventConnection);
      this.instance.bind(EVENT_DRAG_MOVE, this.onDragMove);
      this.instance.bind(EVENT_CONNECTION_MOUSEOVER, this.onConnectionMouseOver);
      this.instance.bind(EVENT_CONNECTION_MOUSEOUT, this.onConnectionMouseOut);
      this.instance.bind(EVENT_CONNECTION_MOVED, this.onConnectionMoved);
      this.instance.bind(EVENT_ENDPOINT_MOUSEOVER, this.onEndpointMouseOver);
      this.instance.bind(EVENT_ENDPOINT_MOUSEOUT, this.onEndpointMouseOut);
      this.instance.bind(EVENT_CONNECTION_DETACHED, this.onConnectionDetached);
      this.instance.bind(EVENT_CONNECTION_DRAG, this.onConnectionDrag);
      this.instance.bind(
        [EVENT_CONNECTION_DRAG, EVENT_CONNECTION_ABORT, EVENT_CONNECTION_DETACHED],
        this.onConnectionDragAbortDetached
      );
      this.instance.bind(EVENT_PLUS_ENDPOINT_CLICK, this.onPlusEndpointClick);
      this.instance.bind(EVENT_ADD_INPUT_ENDPOINT_CLICK, this.onAddInputEndpointClick);
      this.eventsAttached = true;
    },
    unbindCanvasEvents() {
      this.instance.unbind(EVENT_CONNECTION_ABORT, this.onEventConnectionAbort);
      this.instance.unbind(INTERCEPT_BEFORE_DROP, this.onInterceptBeforeDrop);
      this.instance.unbind(EVENT_CONNECTION, this.onEventConnection);
      this.instance.unbind(EVENT_DRAG_MOVE, this.onDragMove);
      this.instance.unbind(EVENT_CONNECTION_MOUSEOVER, this.onConnectionMouseOver);
      this.instance.unbind(EVENT_CONNECTION_MOUSEOUT, this.onConnectionMouseOut);
      this.instance.unbind(EVENT_CONNECTION_MOVED, this.onConnectionMoved);
      this.instance.unbind(EVENT_ENDPOINT_MOUSEOVER, this.onEndpointMouseOver);
      this.instance.unbind(EVENT_ENDPOINT_MOUSEOUT, this.onEndpointMouseOut);
      this.instance.unbind(EVENT_CONNECTION_DETACHED, this.onConnectionDetached);
      this.instance.unbind(EVENT_CONNECTION_DRAG, this.onConnectionDrag);
      this.instance.unbind(EVENT_CONNECTION_DRAG, this.onConnectionDragAbortDetached);
      this.instance.unbind(EVENT_CONNECTION_ABORT, this.onConnectionDragAbortDetached);
      this.instance.unbind(EVENT_CONNECTION_DETACHED, this.onConnectionDragAbortDetached);
      this.instance.unbind(EVENT_PLUS_ENDPOINT_CLICK, this.onPlusEndpointClick);
      this.instance.unbind(EVENT_ADD_INPUT_ENDPOINT_CLICK, this.onAddInputEndpointClick);
      this.eventsAttached = false;
    },
    unbindEndpointEventListeners(bind = true) {
      if (this.instance) {
        const elements = this.instance.getManagedElements();
        for (const element of Object.values(elements)) {
          const endpoints = element.endpoints;
          for (const endpoint of endpoints || []) {
            const endpointInstance = endpoint == null ? void 0 : endpoint.endpoint;
            if (endpointInstance && endpointInstance.type === N8nPlusEndpointType) {
              endpointInstance.unbindEvents();
            }
          }
        }
      }
      this.eventsAttached = false;
    },
    onBeforeUnload(e) {
      if (this.isDemo || window.preventNodeViewBeforeUnload) {
        return;
      } else if (this.uiStore.stateIsDirty) {
        const confirmationMessage = this.$locale.baseText(
          "nodeView.itLooksLikeYouHaveBeenEditingSomething"
        );
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      } else {
        this.startLoading(this.$locale.baseText("nodeView.redirecting"));
        return;
      }
    },
    async newWorkflow() {
      this.startLoading();
      this.resetWorkspace();
      this.workflowData = await this.workflowsStore.getNewWorkflowData();
      this.workflowsStore.currentWorkflowExecutions = [];
      this.workflowsStore.activeWorkflowExecution = null;
      this.uiStore.stateIsDirty = false;
      this.canvasStore.setZoomLevel(1, [0, 0]);
      await this.tryToAddWelcomeSticky();
      this.uiStore.nodeViewInitialized = true;
      this.historyStore.reset();
      this.workflowsStore.activeWorkflowExecution = null;
      this.stopLoading();
    },
    async tryToAddWelcomeSticky() {
      this.canvasStore.zoomToFit();
    },
    async initView() {
      var _a, _b;
      if (this.$route.params.action === "workflowSave") {
        this.uiStore.stateIsDirty = false;
        return;
      }
      if (this.blankRedirect) {
        this.blankRedirect = false;
      } else if (this.$route.name === VIEWS.TEMPLATE_IMPORT) {
        const templateId = this.$route.params.id;
        await this.openWorkflowTemplate(templateId);
      } else {
        if (this.uiStore.stateIsDirty && !this.readOnlyEnv) {
          const confirmModal = await this.confirm(
            this.$locale.baseText("generic.unsavedWork.confirmMessage.message"),
            {
              title: this.$locale.baseText("generic.unsavedWork.confirmMessage.headline"),
              type: "warning",
              confirmButtonText: this.$locale.baseText(
                "generic.unsavedWork.confirmMessage.confirmButtonText"
              ),
              cancelButtonText: this.$locale.baseText(
                "generic.unsavedWork.confirmMessage.cancelButtonText"
              ),
              showClose: true
            }
          );
          if (confirmModal === MODAL_CONFIRM) {
            const saved = await this.saveCurrentWorkflow();
            if (saved)
              await this.settingsStore.fetchPromptsData();
          } else if (confirmModal === MODAL_CLOSE) {
            return;
          }
        }
        let workflowId = null;
        if (this.$route.params.name) {
          workflowId = this.$route.params.name;
        }
        if (workflowId !== null) {
          let workflow = void 0;
          try {
            workflow = await this.workflowsStore.fetchWorkflow(workflowId);
          } catch (error) {
            this.showError(error, this.$locale.baseText("openWorkflow.workflowNotFoundError"));
            void this.$router.push({
              name: VIEWS.NEW_WORKFLOW
            });
          }
          if (workflow) {
            this.titleSet(workflow.name, "IDLE");
            await this.openWorkflow(workflow);
            await this.checkAndInitDebugMode();
            if ((_a = workflow.meta) == null ? void 0 : _a.onboardingId) {
              this.$telemetry.track(
                `User opened workflow from onboarding template with ID ${workflow.meta.onboardingId}`,
                {
                  workflow_id: workflow.id
                },
                {
                  withPostHog: true
                }
              );
            }
          }
        } else if (((_b = this.$route.meta) == null ? void 0 : _b.nodeView) === true) {
          await this.newWorkflow();
        }
      }
      this.historyStore.reset();
      this.uiStore.nodeViewInitialized = true;
      document.addEventListener("keydown", this.keyDown);
      document.addEventListener("keyup", this.keyUp);
      window.addEventListener("beforeunload", this.onBeforeUnload);
    },
    getOutputEndpointUUID(nodeName, connectionType, index) {
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (!node) {
        return null;
      }
      return getOutputEndpointUUID(node.id, connectionType, index);
    },
    getInputEndpointUUID(nodeName, connectionType, index) {
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (!node) {
        return null;
      }
      return getInputEndpointUUID(node.id, connectionType, index);
    },
    __addConnection(connection) {
      var _a;
      const outputUuid = this.getOutputEndpointUUID(
        connection[0].node,
        connection[0].type,
        connection[0].index
      );
      const inputUuid = this.getInputEndpointUUID(
        connection[1].node,
        connection[1].type,
        connection[1].index
      );
      if (!outputUuid || !inputUuid) {
        return;
      }
      const uuid2 = [outputUuid, inputUuid];
      (_a = this.instance) == null ? void 0 : _a.connect({
        uuids: uuid2,
        detachable: !this.isReadOnlyRoute && !this.readOnlyEnv
      });
      setTimeout(() => {
        this.addPinDataConnections(this.workflowsStore.pinData);
      });
    },
    __removeConnection(connection, removeVisualConnection = false) {
      var _a, _b;
      if (removeVisualConnection) {
        const sourceNode = this.workflowsStore.getNodeByName(connection[0].node);
        const targetNode = this.workflowsStore.getNodeByName(connection[1].node);
        if (!sourceNode || !targetNode) {
          return;
        }
        const sourceNodeType = this.nodeTypesStore.getNodeType(
          sourceNode.type,
          sourceNode.typeVersion
        );
        const sourceNodeOutput = ((_a = sourceNodeType == null ? void 0 : sourceNodeType.outputs) == null ? void 0 : _a[connection[0].index]) || NodeConnectionType.Main;
        const sourceNodeOutputName = typeof sourceNodeOutput === "string" ? sourceNodeOutput : sourceNodeOutput.name;
        const scope = getEndpointScope(sourceNodeOutputName);
        const connections = (_b = this.instance) == null ? void 0 : _b.getConnections({
          scope,
          source: sourceNode.id,
          target: targetNode.id
        });
        connections.forEach((connectionInstance) => {
          if (connectionInstance.__meta) {
            if (connectionInstance.__meta.sourceOutputIndex === connection[0].index && connectionInstance.__meta.targetOutputIndex === connection[1].index) {
              this.__deleteJSPlumbConnection(connectionInstance);
            }
          } else {
            this.__deleteJSPlumbConnection(connectionInstance);
          }
        });
      }
      this.workflowsStore.removeConnection({ connection });
    },
    __deleteJSPlumbConnection(connection, trackHistory = false) {
      var _a, _b, _c;
      connection.removeOverlays();
      this.pullConnActiveNodeName = null;
      (_a = this.instance) == null ? void 0 : _a.deleteConnection(connection);
      if (trackHistory && connection.__meta) {
        const connectionData = [
          {
            index: (_b = connection.__meta) == null ? void 0 : _b.sourceOutputIndex,
            node: connection.__meta.sourceNodeName,
            type: NodeConnectionType.Main
          },
          {
            index: (_c = connection.__meta) == null ? void 0 : _c.targetOutputIndex,
            node: connection.__meta.targetNodeName,
            type: NodeConnectionType.Main
          }
        ];
        const removeCommand = new RemoveConnectionCommand(connectionData, this);
        this.historyStore.pushCommandToUndo(removeCommand);
      }
    },
    __removeConnectionByConnectionInfo(info, removeVisualConnection = false, trackHistory = false) {
      const connectionInfo = getConnectionInfo(info);
      if (connectionInfo) {
        if (removeVisualConnection) {
          this.__deleteJSPlumbConnection(info.connection, trackHistory);
        } else if (trackHistory) {
          this.historyStore.pushCommandToUndo(new RemoveConnectionCommand(connectionInfo));
        }
        this.workflowsStore.removeConnection({ connection: connectionInfo });
      }
    },
    async duplicateNode(nodeName) {
      if (!this.editAllowedCheck()) {
        return;
      }
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (node) {
        const nodeTypeData = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
        if ((nodeTypeData == null ? void 0 : nodeTypeData.maxNodes) !== void 0 && this.getNodeTypeCount(node.type) >= nodeTypeData.maxNodes) {
          this.showMaxNodeTypeError(nodeTypeData);
          return;
        }
        const newNodeData = deepCopy(this.getNodeDataToSave(node));
        newNodeData.id = v4();
        const localizedName = this.locale.localizeNodeName(newNodeData.name, newNodeData.type);
        newNodeData.name = this.uniqueNodeName(localizedName);
        newNodeData.position = getNewNodePosition(
          this.nodes,
          [node.position[0], node.position[1] + 140],
          [0, 140]
        );
        if (newNodeData.webhookId) {
          newNodeData.webhookId = v4();
        }
        if (newNodeData.credentials && this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Sharing)) {
          const usedCredentials = this.workflowsStore.usedCredentials;
          newNodeData.credentials = Object.fromEntries(
            Object.entries(newNodeData.credentials).filter(([_, credential]) => {
              var _a;
              return credential.id && (!usedCredentials[credential.id] || ((_a = usedCredentials[credential.id]) == null ? void 0 : _a.currentUserHasAccess));
            })
          );
        }
        await this.addNodes([newNodeData], [], true);
        const pinDataForNode = this.workflowsStore.pinDataByNodeName(nodeName);
        if (pinDataForNode == null ? void 0 : pinDataForNode.length) {
          try {
            this.setPinData(newNodeData, pinDataForNode, "duplicate-node");
          } catch (error) {
            console.error(error);
          }
        }
        this.uiStore.stateIsDirty = true;
        this.deselectAllNodes();
        setTimeout(() => {
          this.nodeSelectedByName(newNodeData.name, false);
        });
        this.$telemetry.track("User duplicated node", {
          node_type: node.type,
          workflow_id: this.workflowsStore.workflowId
        });
      }
    },
    getJSPlumbConnection(sourceNodeName, sourceOutputIndex, targetNodeName, targetInputIndex, connectionType) {
      var _a, _b;
      const sourceNode = this.workflowsStore.getNodeByName(sourceNodeName);
      const targetNode = this.workflowsStore.getNodeByName(targetNodeName);
      if (!sourceNode || !targetNode) {
        return;
      }
      const sourceId = sourceNode.id;
      const targetId = targetNode.id;
      const sourceEndpoint = getOutputEndpointUUID(
        sourceId,
        connectionType,
        sourceOutputIndex
      );
      const targetEndpoint = getInputEndpointUUID(
        targetId,
        connectionType,
        targetInputIndex
      );
      const sourceNodeType = this.nodeTypesStore.getNodeType(
        sourceNode.type,
        sourceNode.typeVersion
      );
      const sourceNodeOutput = ((_a = sourceNodeType == null ? void 0 : sourceNodeType.outputs) == null ? void 0 : _a[sourceOutputIndex]) || NodeConnectionType.Main;
      const sourceNodeOutputName = typeof sourceNodeOutput === "string" ? sourceNodeOutput : sourceNodeOutput.name;
      const scope = getEndpointScope(sourceNodeOutputName);
      const connections = (_b = this.instance) == null ? void 0 : _b.getConnections({
        scope,
        source: sourceId,
        target: targetId
      });
      return connections.find((connection) => {
        const uuids = connection.getUuids();
        return uuids[0] === sourceEndpoint && uuids[1] === targetEndpoint;
      });
    },
    getJSPlumbEndpoints(nodeName) {
      var _a;
      const node = this.workflowsStore.getNodeByName(nodeName);
      const nodeEl = this.instance.getManagedElement(node == null ? void 0 : node.id);
      const endpoints = (_a = this.instance) == null ? void 0 : _a.getEndpoints(nodeEl);
      return endpoints;
    },
    getPlusEndpoint(nodeName, outputIndex) {
      const endpoints = this.getJSPlumbEndpoints(nodeName);
      return endpoints.find(
        (endpoint) => {
          var _a;
          return (
            // @ts-ignore
            endpoint.endpoint.type === "N8nPlus" && ((_a = endpoint == null ? void 0 : endpoint.__meta) == null ? void 0 : _a.index) === outputIndex
          );
        }
      );
    },
    getIncomingOutgoingConnections(nodeName) {
      var _a, _b;
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (node) {
        const outgoing = (_a = this.instance) == null ? void 0 : _a.getConnections({
          source: node.id
        });
        const incoming = (_b = this.instance) == null ? void 0 : _b.getConnections({
          target: node.id
        });
        return {
          incoming,
          outgoing
        };
      }
      return { incoming: [], outgoing: [] };
    },
    onNodeMoved(node) {
      const { incoming, outgoing } = this.getIncomingOutgoingConnections(node.name);
      [...incoming, ...outgoing].forEach((connection) => {
        showOrHideMidpointArrow(connection);
        showOrHideItemsLabel(connection);
      });
    },
    onNodeRun({
      name,
      data,
      waiting
    }) {
      var _a;
      const pinData2 = this.workflowsStore.getPinData;
      if (pinData2 == null ? void 0 : pinData2[name])
        return;
      const sourceNodeName = name;
      const sourceNode = this.workflowsStore.getNodeByName(sourceNodeName);
      const sourceId = sourceNode !== null ? sourceNode.id : "";
      if (data === null || data.length === 0 || waiting) {
        const outgoing = (_a = this.instance) == null ? void 0 : _a.getConnections({
          source: sourceId
        });
        outgoing.forEach((connection) => {
          resetConnection(connection);
        });
        const endpoints = this.getJSPlumbEndpoints(sourceNodeName);
        endpoints.forEach((endpoint) => {
          if (endpoint.endpoint.type === "N8nPlus") {
            endpoint.endpoint.clearSuccessOutput();
          }
        });
        return;
      }
      const allNodeConnections = this.workflowsStore.outgoingConnectionsByNodeName(sourceNodeName);
      const connectionType = Object.keys(allNodeConnections)[0];
      const nodeConnections = allNodeConnections[connectionType];
      const outputMap = getOutputSummary(
        data,
        nodeConnections || [],
        connectionType ?? NodeConnectionType.Main
      );
      Object.keys(outputMap).forEach((sourceOutputIndex) => {
        Object.keys(outputMap[sourceOutputIndex]).forEach((targetNodeName) => {
          Object.keys(outputMap[sourceOutputIndex][targetNodeName]).forEach(
            (targetInputIndex) => {
              if (targetNodeName) {
                const connection = this.getJSPlumbConnection(
                  sourceNodeName,
                  parseInt(sourceOutputIndex, 10),
                  targetNodeName,
                  parseInt(targetInputIndex, 10),
                  connectionType
                );
                if (connection) {
                  const output = outputMap[sourceOutputIndex][targetNodeName][targetInputIndex];
                  if (output.isArtificialRecoveredEventItem) {
                    recoveredConnection(connection);
                  } else if (!(output == null ? void 0 : output.total) && !output.isArtificialRecoveredEventItem) {
                    resetConnection(connection);
                  } else {
                    addConnectionOutputSuccess(connection, output);
                  }
                }
              }
              const endpoint = this.getPlusEndpoint(
                sourceNodeName,
                parseInt(sourceOutputIndex, 10)
              );
              if (endpoint == null ? void 0 : endpoint.endpoint) {
                const output = outputMap[sourceOutputIndex][NODE_OUTPUT_DEFAULT_KEY][0];
                if (output && output.total > 0) {
                  endpoint.endpoint.setSuccessOutput(
                    getRunItemsLabel(output)
                  );
                } else {
                  endpoint.endpoint.clearSuccessOutput();
                }
              }
            }
          );
        });
      });
    },
    removeNode(nodeName, trackHistory = false, trackBulk = true) {
      if (!this.editAllowedCheck()) {
        return;
      }
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (!node) {
        return;
      }
      if (trackHistory && trackBulk) {
        this.historyStore.startRecordingUndo();
      }
      const requiredNodeTypes = [];
      if (requiredNodeTypes.includes(node.type)) {
        let deleteAllowed = false;
        for (const checkNode of this.nodes) {
          if (checkNode.name === node.name) {
            continue;
          }
          if (requiredNodeTypes.includes(checkNode.type)) {
            deleteAllowed = true;
            break;
          }
        }
        if (!deleteAllowed) {
          return;
        }
      }
      if (node.type === STICKY_NODE_TYPE) {
        this.$telemetry.track("User deleted workflow note", {
          workflow_id: this.workflowsStore.workflowId,
          is_welcome_note: node.name === QUICKSTART_NOTE_NAME
        });
      } else {
        void this.$externalHooks().run("node.deleteNode", { node });
        this.$telemetry.track("User deleted node", {
          node_type: node.type,
          workflow_id: this.workflowsStore.workflowId
        });
      }
      let waitForNewConnection = false;
      const nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
      const workflow = this.getCurrentWorkflow();
      const workflowNode = workflow.getNode(node.name);
      let inputs = [];
      let outputs = [];
      if (nodeType) {
        inputs = getNodeInputs(workflow, workflowNode, nodeType);
        outputs = getNodeOutputs(workflow, workflowNode, nodeType);
      }
      if (outputs.length === 1 && inputs.length === 1) {
        const { incoming, outgoing } = this.getIncomingOutgoingConnections(node.name);
        if (incoming.length === 1 && outgoing.length === 1) {
          const conn1 = incoming[0];
          const conn2 = outgoing[0];
          if (conn1.__meta && conn2.__meta) {
            waitForNewConnection = true;
            const sourceNodeName = conn1.__meta.sourceNodeName;
            const sourceNodeOutputIndex = conn1.__meta.sourceOutputIndex;
            const targetNodeName = conn2.__meta.targetNodeName;
            const targetNodeOuputIndex = conn2.__meta.targetOutputIndex;
            setTimeout(() => {
              var _a;
              this.connectTwoNodes(
                sourceNodeName,
                sourceNodeOutputIndex,
                targetNodeName,
                targetNodeOuputIndex,
                NodeConnectionType.Main
              );
              if (waitForNewConnection) {
                (_a = this.instance) == null ? void 0 : _a.setSuspendDrawing(false, true);
                waitForNewConnection = false;
              }
            }, 100);
          }
        }
      }
      void nextTick(() => {
        var _a, _b, _c;
        (_a = this.instance) == null ? void 0 : _a.setSuspendDrawing(true);
        (((_b = this.instance) == null ? void 0 : _b.endpointsByElement[node.id]) || []).flat().forEach((endpoint) => {
          var _a2;
          return (_a2 = this.instance) == null ? void 0 : _a2.deleteEndpoint(endpoint);
        });
        this.workflowsStore.removeAllNodeConnection(node);
        this.workflowsStore.removeNode(node);
        this.workflowsStore.clearNodeExecutionData(node.name);
        if (!waitForNewConnection) {
          (_c = this.instance) == null ? void 0 : _c.setSuspendDrawing(false, true);
        }
        this.uiStore.removeNodeFromSelection(node);
        if (trackHistory) {
          this.historyStore.pushCommandToUndo(new RemoveNodeCommand(node));
        }
      });
      if (trackHistory && trackBulk) {
        const recordingTimeout = waitForNewConnection ? 100 : 0;
        setTimeout(() => {
          this.historyStore.stopRecordingUndo();
        }, recordingTimeout);
      }
    },
    async redrawNode(nodeName) {
      const tempName = "x____XXXX____x";
      await this.renameNode(nodeName, tempName);
      await this.renameNode(tempName, nodeName);
    },
    valueChanged(parameterData) {
      if (parameterData.name === "name" && parameterData.oldValue) {
        void this.renameNode(parameterData.oldValue, parameterData.value);
      }
    },
    async renameNodePrompt(currentName) {
      try {
        const promptResponsePromise = this.prompt(
          this.$locale.baseText("nodeView.prompt.newName") + ":",
          this.$locale.baseText("nodeView.prompt.renameNode") + `: ${currentName}`,
          {
            customClass: "rename-prompt",
            confirmButtonText: this.$locale.baseText("nodeView.prompt.rename"),
            cancelButtonText: this.$locale.baseText("nodeView.prompt.cancel"),
            inputErrorMessage: this.$locale.baseText("nodeView.prompt.invalidName"),
            inputValue: currentName
          }
        );
        await this.$nextTick();
        const nameInput = document.querySelector(".rename-prompt .el-input__inner");
        if (nameInput) {
          nameInput.focus();
          nameInput.select();
        }
        const promptResponse = await promptResponsePromise;
        if ((promptResponse == null ? void 0 : promptResponse.action) !== MODAL_CONFIRM)
          return;
        await this.renameNode(currentName, promptResponse.value, true);
      } catch (e) {
      }
    },
    async renameNode(currentName, newName, trackHistory = false) {
      if (currentName === newName) {
        return;
      }
      this.suspendRecordingDetachedConnections = true;
      if (trackHistory) {
        this.historyStore.startRecordingUndo();
      }
      const activeNodeName = this.activeNode && this.activeNode.name;
      const isActive = activeNodeName === currentName;
      if (isActive) {
        this.renamingActive = true;
      }
      newName = this.uniqueNodeName(newName);
      const workflow = this.getCurrentWorkflow(true);
      workflow.renameNode(currentName, newName);
      if (trackHistory) {
        this.historyStore.pushCommandToUndo(new RenameNodeCommand(currentName, newName));
      }
      this.workflowsStore.renameNodeSelectedAndExecution({ old: currentName, new: newName });
      this.deleteEveryEndpoint();
      this.workflowsStore.removeAllConnections({ setStateDirty: false });
      this.workflowsStore.removeAllNodes({ removePinData: false, setStateDirty: true });
      await this.$nextTick();
      await this.addNodes(Object.values(workflow.nodes), workflow.connectionsBySourceNode, false);
      this.deselectAllNodes();
      this.nodeSelectedByName(newName);
      if (isActive) {
        this.ndvStore.activeNodeName = newName;
        this.renamingActive = false;
      }
      if (trackHistory) {
        this.historyStore.stopRecordingUndo();
      }
      this.suspendRecordingDetachedConnections = false;
    },
    deleteEveryEndpoint() {
      var _a, _b;
      if (this.instance) {
        (_a = this.instance) == null ? void 0 : _a.reset();
        Object.values((_b = this.instance) == null ? void 0 : _b.endpointsByElement).flatMap((endpoint) => endpoint).forEach((endpoint) => endpoint.destroy());
        this.instance.deleteEveryConnection({ fireEvent: true });
      }
    },
    matchCredentials(node) {
      if (!node.credentials) {
        return;
      }
      Object.entries(node.credentials).forEach(
        ([nodeCredentialType, nodeCredentials]) => {
          const credentialOptions = this.credentialsStore.getCredentialsByType(nodeCredentialType);
          if (typeof nodeCredentials === "string") {
            nodeCredentials = {
              id: null,
              name: nodeCredentials
            };
            this.credentialsUpdated = true;
          }
          if (nodeCredentials.id) {
            const credentialsId = nodeCredentials.id.toString();
            const credentialsForId = credentialOptions.find(
              (optionData) => optionData.id === credentialsId
            );
            if (credentialsForId) {
              if (credentialsForId.name !== nodeCredentials.name || typeof nodeCredentials.id === "number") {
                node.credentials[nodeCredentialType] = {
                  id: credentialsForId.id,
                  name: credentialsForId.name
                };
                this.credentialsUpdated = true;
              }
              return;
            }
          }
          node.credentials[nodeCredentialType] = nodeCredentials;
          const credentialsForName = credentialOptions.filter(
            (optionData) => optionData.name === nodeCredentials.name
          );
          if (credentialsForName.length === 1) {
            node.credentials[nodeCredentialType].id = credentialsForName[0].id;
            this.credentialsUpdated = true;
          }
        }
      );
    },
    async addNodes(nodes, connections, trackHistory = false) {
      var _a, _b;
      if (!(nodes == null ? void 0 : nodes.length)) {
        return;
      }
      await this.loadNodesProperties(
        nodes.map((node) => ({ name: node.type, version: node.typeVersion }))
      );
      let nodeType;
      nodes.forEach((node) => {
        if (!node.id) {
          node.id = v4();
        }
        nodeType = this.nodeTypesStore.getNodeType(node.type, node.typeVersion);
        if (!node.hasOwnProperty("disabled")) {
          node.disabled = false;
        }
        if (!node.hasOwnProperty("parameters")) {
          node.parameters = {};
        }
        if (nodeType !== null) {
          let nodeParameters = null;
          try {
            nodeParameters = getNodeParameters(
              nodeType.properties,
              node.parameters,
              true,
              false,
              node
            );
          } catch (e) {
            console.error(
              this.$locale.baseText("nodeView.thereWasAProblemLoadingTheNodeParametersOfNode") + `: "${node.name}"`
            );
            console.error(e);
          }
          node.parameters = nodeParameters !== null ? nodeParameters : {};
          if (node.type === WEBHOOK_NODE_TYPE && node.parameters.path === "") {
            node.parameters.path = node.webhookId;
          }
        }
        this.matchCredentials(node);
        this.workflowsStore.addNode(node);
        if (trackHistory) {
          this.historyStore.pushCommandToUndo(new AddNodeCommand(node));
        }
      });
      await this.$nextTick();
      (_a = this.instance) == null ? void 0 : _a.setSuspendDrawing(true);
      if (connections !== void 0) {
        let connectionData;
        for (const sourceNode of Object.keys(connections)) {
          for (const type of Object.keys(connections[sourceNode])) {
            for (let sourceIndex = 0; sourceIndex < connections[sourceNode][type].length; sourceIndex++) {
              const outwardConnections = connections[sourceNode][type][sourceIndex];
              if (!outwardConnections) {
                continue;
              }
              outwardConnections.forEach((targetData) => {
                connectionData = [
                  {
                    node: sourceNode,
                    type,
                    index: sourceIndex
                  },
                  {
                    node: targetData.node,
                    type: targetData.type,
                    index: targetData.index
                  }
                ];
                this.__addConnection(connectionData);
              });
            }
          }
        }
      }
      void this.refreshNodeIssues();
      (_b = this.instance) == null ? void 0 : _b.setSuspendDrawing(false, true);
    },
    async addNodesToWorkflow(data) {
      const nodeNameTable = {};
      const newNodeNames = [];
      if (!data.nodes) {
        throw new Error(this.$locale.baseText("nodeView.noNodesGivenToAdd"));
      }
      const nodeTypesCount = this.getNodeTypesMaxCount();
      let oldName;
      let newName;
      const createNodes = [];
      await this.loadNodesProperties(
        data.nodes.map((node) => ({ name: node.type, version: node.typeVersion }))
      );
      data.nodes.forEach((node) => {
        if (nodeTypesCount[node.type] !== void 0) {
          if (nodeTypesCount[node.type].exist >= nodeTypesCount[node.type].max) {
            nodeNameTable[node.name] = nodeTypesCount[node.type].nodeNames[0];
            return;
          } else {
            nodeTypesCount[node.type].exist += 1;
          }
        }
        oldName = node.name;
        const localized = this.locale.localizeNodeName(node.name, node.type);
        newName = this.uniqueNodeName(localized, newNodeNames);
        newNodeNames.push(newName);
        nodeNameTable[oldName] = newName;
        createNodes.push(node);
      });
      const newConnections = {};
      const currentConnections = data.connections;
      const createNodeNames = createNodes.map((node) => node.name);
      let sourceNode, type, sourceIndex, connectionIndex, connectionData;
      for (sourceNode of Object.keys(currentConnections)) {
        if (!createNodeNames.includes(sourceNode)) {
          continue;
        }
        const connection = {};
        for (type of Object.keys(currentConnections[sourceNode])) {
          connection[type] = [];
          for (sourceIndex = 0; sourceIndex < currentConnections[sourceNode][type].length; sourceIndex++) {
            const nodeSourceConnections = [];
            if (currentConnections[sourceNode][type][sourceIndex]) {
              for (connectionIndex = 0; connectionIndex < currentConnections[sourceNode][type][sourceIndex].length; connectionIndex++) {
                connectionData = currentConnections[sourceNode][type][sourceIndex][connectionIndex];
                if (!createNodeNames.includes(connectionData.node)) {
                  continue;
                }
                nodeSourceConnections.push(connectionData);
              }
            }
            connection[type].push(nodeSourceConnections);
          }
        }
        newConnections[sourceNode] = connection;
      }
      const tempWorkflow = this.getWorkflow(createNodes, newConnections);
      for (oldName in nodeNameTable) {
        if (oldName === nodeNameTable[oldName]) {
          continue;
        }
        tempWorkflow.renameNode(oldName, nodeNameTable[oldName]);
      }
      if (data.pinData) {
        let pinDataSuccess = true;
        for (const nodeName of Object.keys(data.pinData)) {
          if (!pinDataSuccess) {
            this.showError(
              new Error(this.$locale.baseText("ndv.pinData.error.tooLarge.description")),
              this.$locale.baseText("ndv.pinData.error.tooLarge.title")
            );
            continue;
          }
          const node = tempWorkflow.nodes[nodeNameTable[nodeName]];
          try {
            this.setPinData(node, data.pinData[nodeName], "add-nodes");
            pinDataSuccess = true;
          } catch (error) {
            pinDataSuccess = false;
            console.error(error);
          }
        }
      }
      this.historyStore.startRecordingUndo();
      await this.addNodes(
        Object.values(tempWorkflow.nodes),
        tempWorkflow.connectionsBySourceNode,
        true
      );
      this.historyStore.stopRecordingUndo();
      this.uiStore.stateIsDirty = true;
      return {
        nodes: Object.values(tempWorkflow.nodes),
        connections: tempWorkflow.connectionsBySourceNode
      };
    },
    async getSelectedNodesToSave() {
      const data = {
        nodes: [],
        connections: {}
      };
      let nodeData;
      const exportNodeNames = [];
      for (const node of this.uiStore.getSelectedNodes) {
        nodeData = this.getNodeDataToSave(node);
        exportNodeNames.push(node.name);
        data.nodes.push(nodeData);
      }
      let connectionToKeep, connections, type, connectionIndex, sourceIndex, connectionData, typeConnections;
      data.nodes.forEach((node) => {
        connections = this.workflowsStore.outgoingConnectionsByNodeName(node.name);
        if (Object.keys(connections).length === 0) {
          return;
        }
        typeConnections = {};
        for (type of Object.keys(connections)) {
          for (sourceIndex = 0; sourceIndex < connections[type].length; sourceIndex++) {
            connectionToKeep = [];
            for (connectionIndex = 0; connectionIndex < connections[type][sourceIndex].length; connectionIndex++) {
              connectionData = connections[type][sourceIndex][connectionIndex];
              if (exportNodeNames.indexOf(connectionData.node) !== -1) {
                connectionToKeep.push(connectionData);
              }
            }
            if (connectionToKeep.length) {
              if (!typeConnections.hasOwnProperty(type)) {
                typeConnections[type] = [];
              }
              typeConnections[type][sourceIndex] = connectionToKeep;
            }
          }
        }
        if (Object.keys(typeConnections).length) {
          data.connections[node.name] = typeConnections;
        }
      });
      return data;
    },
    resetWorkspace() {
      this.workflowsStore.resetWorkflow();
      this.onToggleNodeCreator({ createNodeActive: false });
      this.nodeCreatorStore.setShowScrim(false);
      this.canvasStore.resetZoom();
      this.unbindEndpointEventListeners();
      this.deleteEveryEndpoint();
      if (this.executionWaitingForWebhook) {
        try {
          void this.workflowsStore.removeTestWebhook(this.workflowsStore.workflowId);
        } catch (error) {
        }
      }
      this.workflowsStore.resetState();
      this.uiStore.removeActiveAction("workflowRunning");
      this.uiStore.resetSelectedNodes();
      this.uiStore.nodeViewOffsetPosition = [0, 0];
      this.credentialsUpdated = false;
    },
    async loadActiveWorkflows() {
      await this.workflowsStore.fetchActiveWorkflows();
    },
    async loadNodeTypes() {
      await this.nodeTypesStore.getNodeTypes();
    },
    async loadCredentialTypes() {
      await this.credentialsStore.fetchCredentialTypes(true);
    },
    async loadCredentials() {
      await this.credentialsStore.fetchAllCredentials();
    },
    async loadVariables() {
      await this.environmentsStore.fetchAllVariables();
    },
    async loadSecrets() {
      await this.externalSecretsStore.fetchAllSecrets();
    },
    async loadNodesProperties(nodeInfos) {
      const allNodes = this.nodeTypesStore.allNodeTypes;
      const nodesToBeFetched = [];
      allNodes.forEach((node) => {
        const nodeVersions = Array.isArray(node.version) ? node.version : [node.version];
        if (!!nodeInfos.find((n) => n.name === node.name && nodeVersions.includes(n.version)) && !node.hasOwnProperty("properties")) {
          nodesToBeFetched.push({
            name: node.name,
            version: Array.isArray(node.version) ? node.version.slice(-1)[0] : node.version
          });
        }
      });
      if (nodesToBeFetched.length > 0) {
        this.startLoading();
        await this.nodeTypesStore.getNodesInformation(nodesToBeFetched);
        this.stopLoading();
      }
    },
    async onPostMessageReceived(message) {
      try {
        const json = JSON.parse(message.data);
        if (json && json.command === "openWorkflow") {
          try {
            await this.importWorkflowExact(json);
            this.isExecutionPreview = false;
          } catch (e) {
            if (window.top) {
              window.top.postMessage(
                JSON.stringify({
                  command: "error",
                  message: this.$locale.baseText("openWorkflow.workflowImportError")
                }),
                "*"
              );
            }
            this.showMessage({
              title: this.$locale.baseText("openWorkflow.workflowImportError"),
              message: e.message,
              type: "error"
            });
          }
        } else if (json && json.command === "openExecution") {
          try {
            this.isProductionExecutionPreview = json.executionMode !== "manual";
            await this.openExecution(json.executionId);
            this.isExecutionPreview = true;
          } catch (e) {
            if (window.top) {
              window.top.postMessage(
                JSON.stringify({
                  command: "error",
                  message: this.$locale.baseText("nodeView.showError.openExecution.title")
                }),
                "*"
              );
            }
            this.showMessage({
              title: this.$locale.baseText("nodeView.showError.openExecution.title"),
              message: e.message,
              type: "error"
            });
          }
        } else if ((json == null ? void 0 : json.command) === "setActiveExecution") {
          this.workflowsStore.activeWorkflowExecution = json.execution;
        }
      } catch (e) {
      }
    },
    async onImportWorkflowDataEvent(data) {
      await this.importWorkflowData(data.data, "file");
    },
    async onImportWorkflowUrlEvent(data) {
      const workflowData = await this.getWorkflowDataFromUrl(data.url);
      if (workflowData !== void 0) {
        await this.importWorkflowData(workflowData, "url");
      }
    },
    addPinDataConnections(pinData2) {
      Object.keys(pinData2).forEach((nodeName) => {
        var _a;
        const node = this.workflowsStore.getNodeByName(nodeName);
        if (!node) {
          return;
        }
        const connections = (_a = this.instance) == null ? void 0 : _a.getConnections({
          source: node.id
        });
        connections.forEach((connection) => {
          addConnectionOutputSuccess(connection, {
            total: pinData2[nodeName].length,
            iterations: 0
          });
        });
      });
    },
    removePinDataConnections(pinData2) {
      Object.keys(pinData2).forEach((nodeName) => {
        var _a;
        const node = this.workflowsStore.getNodeByName(nodeName);
        if (!node) {
          return;
        }
        const connections = (_a = this.instance) == null ? void 0 : _a.getConnections({
          source: node.id
        });
        this.instance.setSuspendDrawing(true);
        connections.forEach(resetConnection);
        this.instance.setSuspendDrawing(false, true);
      });
    },
    onToggleNodeCreator({ source, createNodeActive, nodeCreatorView }) {
      if (createNodeActive === this.createNodeActive)
        return;
      if (!nodeCreatorView) {
        nodeCreatorView = this.containsTrigger ? REGULAR_NODE_CREATOR_VIEW : TRIGGER_NODE_CREATOR_VIEW;
      }
      this.nodeCreatorStore.setSelectedView(nodeCreatorView);
      this.createNodeActive = createNodeActive;
      let mode;
      switch (this.nodeCreatorStore.selectedView) {
        case AI_NODE_CREATOR_VIEW:
          mode = "ai";
          break;
        case REGULAR_NODE_CREATOR_VIEW:
          mode = "regular";
          break;
        default:
          mode = "regular";
      }
      if (createNodeActive)
        this.nodeCreatorStore.setOpenSource(source);
      void this.$externalHooks().run("nodeView.createNodeActiveChanged", {
        source,
        mode,
        createNodeActive
      });
      this.$telemetry.trackNodesPanel("nodeView.createNodeActiveChanged", {
        source,
        mode,
        createNodeActive,
        workflow_id: this.workflowsStore.workflowId
      });
    },
    async onAddNodes({ nodes, connections }, dragAndDrop = false, position) {
      let currentPosition = position;
      for (const { type, isAutoAdd, name, openDetail, position: nodePosition } of nodes) {
        await this.addNode(
          type,
          { position: nodePosition ?? currentPosition, dragAndDrop, name },
          openDetail ?? false,
          true,
          isAutoAdd
        );
        const lastAddedNode = this.nodes[this.nodes.length - 1];
        currentPosition = [
          lastAddedNode.position[0] + NODE_SIZE * 2 + GRID_SIZE,
          lastAddedNode.position[1]
        ];
      }
      const newNodesOffset = this.nodes.length - nodes.length;
      for (const { from, to } of connections) {
        const fromNode = this.nodes[newNodesOffset + from.nodeIndex];
        const toNode = this.nodes[newNodesOffset + to.nodeIndex];
        this.connectTwoNodes(
          fromNode.name,
          from.outputIndex ?? 0,
          toNode.name,
          to.inputIndex ?? 0,
          NodeConnectionType.Main
        );
      }
    },
    async saveCurrentWorkflowExternal(callback) {
      await this.saveCurrentWorkflow();
      callback == null ? void 0 : callback();
    },
    setSuspendRecordingDetachedConnections(suspend) {
      this.suspendRecordingDetachedConnections = suspend;
    },
    onMoveNode({ nodeName, position }) {
      this.workflowsStore.updateNodeProperties({ name: nodeName, properties: { position } });
      const node = this.workflowsStore.getNodeByName(nodeName);
      setTimeout(() => {
        var _a;
        if (node) {
          (_a = this.instance) == null ? void 0 : _a.repaintEverything();
          this.onNodeMoved(node);
        }
      }, 0);
    },
    onRevertAddNode({ node }) {
      this.removeNode(node.name, false);
    },
    async onRevertRemoveNode({ node }) {
      const prevNode = this.workflowsStore.workflow.nodes.find((n) => n.id === node.id);
      if (prevNode) {
        return;
      }
      node.id = v4();
      await this.addNodes([node]);
    },
    onRevertAddConnection({ connection }) {
      this.suspendRecordingDetachedConnections = true;
      this.__removeConnection(connection, true);
      this.suspendRecordingDetachedConnections = false;
    },
    async onRevertRemoveConnection({ connection }) {
      this.suspendRecordingDetachedConnections = true;
      this.__addConnection(connection);
      this.suspendRecordingDetachedConnections = false;
    },
    async onRevertNameChange({ currentName, newName }) {
      await this.renameNode(newName, currentName);
    },
    onRevertEnableToggle({ nodeName, isDisabled }) {
      const node = this.workflowsStore.getNodeByName(nodeName);
      if (node) {
        this.disableNodes([node]);
      }
    },
    onPageShow(e) {
      if (e.persisted) {
        this.stopLoading();
      }
    },
    readOnlyEnvRouteCheck() {
      if (this.readOnlyEnv && [VIEWS.NEW_WORKFLOW, VIEWS.TEMPLATE_IMPORT].includes(this.$route.name)) {
        void this.$nextTick(async () => {
          this.resetWorkspace();
          this.uiStore.stateIsDirty = false;
          await this.$router.replace({ name: VIEWS.WORKFLOWS });
        });
      }
    },
    async checkAndInitDebugMode() {
      if (this.$route.name === VIEWS.EXECUTION_DEBUG) {
        this.titleSet(this.workflowName, "DEBUG");
        if (!this.workflowsStore.isInDebugMode) {
          await this.applyExecutionData(this.$route.params.executionId);
          this.workflowsStore.isInDebugMode = true;
        }
      }
    }
  },
  async onSourceControlPull() {
    let workflowId = null;
    if (this.$route.params.name) {
      workflowId = this.$route.params.name;
    }
    try {
      await Promise.all([this.loadCredentials(), this.loadVariables(), this.tagsStore.fetchAll()]);
      if (workflowId !== null && !this.uiStore.stateIsDirty) {
        const workflow = await this.workflowsStore.fetchWorkflow(workflowId);
        if (workflow) {
          this.titleSet(workflow.name, "IDLE");
          await this.openWorkflow(workflow);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  async mounted() {
    var _a;
    this.resetWorkspace();
    this.canvasStore.initInstance(this.$refs.nodeView);
    this.titleReset();
    window.addEventListener("message", this.onPostMessageReceived);
    this.startLoading();
    const loadPromises = [
      this.loadActiveWorkflows(),
      this.loadCredentials(),
      this.loadCredentialTypes(),
      this.loadVariables(),
      this.loadSecrets()
    ];
    if (this.nodeTypesStore.allNodeTypes.length === 0) {
      loadPromises.push(this.loadNodeTypes());
    }
    try {
      await Promise.all(loadPromises);
    } catch (error) {
      this.showError(
        error,
        this.$locale.baseText("nodeView.showError.mounted1.title"),
        this.$locale.baseText("nodeView.showError.mounted1.message") + ":"
      );
      return;
    }
    ready(async () => {
      try {
        try {
          this.bindCanvasEvents();
        } catch {
        }
        await this.initView();
        if (window.parent) {
          window.parent.postMessage(
            JSON.stringify({ command: "n8nReady", version: this.rootStore.versionCli }),
            "*"
          );
        }
      } catch (error) {
        this.showError(
          error,
          this.$locale.baseText("nodeView.showError.mounted2.title"),
          this.$locale.baseText("nodeView.showError.mounted2.message") + ":"
        );
      }
      this.stopLoading();
      setTimeout(() => {
        void this.usersStore.showPersonalizationSurvey();
        this.addPinDataConnections(this.workflowsStore.getPinData || {});
      }, 0);
    });
    void this.$externalHooks().run("nodeView.mount").catch((e) => {
    });
    if (((_a = this.currentUser) == null ? void 0 : _a.personalizationAnswers) !== null && this.settingsStore.onboardingCallPromptEnabled && this.currentUser && getAccountAge(this.currentUser) <= ONBOARDING_PROMPT_TIMEBOX) {
      const onboardingResponse = await this.uiStore.getNextOnboardingPrompt();
      const promptTimeout = onboardingResponse.toast_sequence_number === 1 ? FIRST_ONBOARDING_PROMPT_TIMEOUT : 1e3;
      if (onboardingResponse.title && onboardingResponse.description) {
        setTimeout(async () => {
          this.showToast({
            type: "info",
            title: onboardingResponse.title,
            message: onboardingResponse.description,
            duration: 0,
            customClass: "clickable",
            closeOnClick: true,
            onClick: () => {
              this.$telemetry.track("user clicked onboarding toast", {
                seq_num: onboardingResponse.toast_sequence_number,
                title: onboardingResponse.title,
                description: onboardingResponse.description
              });
              this.uiStore.openModal(ONBOARDING_CALL_SIGNUP_MODAL_KEY);
            }
          });
        }, promptTimeout);
      }
    }
    sourceControlEventBus.on("pull", this.onSourceControlPull);
    this.readOnlyEnvRouteCheck();
  },
  activated() {
    const openSideMenu = this.uiStore.addFirstStepOnLoad;
    if (openSideMenu) {
      this.showTriggerCreator(NODE_CREATOR_OPEN_SOURCES.TRIGGER_PLACEHOLDER_BUTTON);
    }
    this.uiStore.addFirstStepOnLoad = false;
    this.bindCanvasEvents();
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
    window.addEventListener("message", this.onPostMessageReceived);
    window.addEventListener("pageshow", this.onPageShow);
    nodeViewEventBus.on("newWorkflow", this.newWorkflow);
    nodeViewEventBus.on("importWorkflowData", this.onImportWorkflowDataEvent);
    nodeViewEventBus.on("importWorkflowUrl", this.onImportWorkflowUrlEvent);
    nodeViewEventBus.on("openChat", this.onOpenChat);
    historyBus.on("nodeMove", this.onMoveNode);
    historyBus.on("revertAddNode", this.onRevertAddNode);
    historyBus.on("revertRemoveNode", this.onRevertRemoveNode);
    historyBus.on("revertAddConnection", this.onRevertAddConnection);
    historyBus.on("revertRemoveConnection", this.onRevertRemoveConnection);
    historyBus.on("revertRenameNode", this.onRevertNameChange);
    historyBus.on("enableNodeToggle", this.onRevertEnableToggle);
    dataPinningEventBus.on("pin-data", this.addPinDataConnections);
    dataPinningEventBus.on("unpin-data", this.removePinDataConnections);
    nodeViewEventBus.on("saveWorkflow", this.saveCurrentWorkflowExternal);
    this.canvasStore.isDemo = this.isDemo;
  },
  deactivated() {
    this.unbindCanvasEvents();
    document.removeEventListener("keydown", this.keyDown);
    document.removeEventListener("keyup", this.keyUp);
    window.removeEventListener("message", this.onPostMessageReceived);
    window.removeEventListener("beforeunload", this.onBeforeUnload);
    window.removeEventListener("pageshow", this.onPageShow);
    nodeViewEventBus.off("newWorkflow", this.newWorkflow);
    nodeViewEventBus.off("importWorkflowData", this.onImportWorkflowDataEvent);
    nodeViewEventBus.off("importWorkflowUrl", this.onImportWorkflowUrlEvent);
    nodeViewEventBus.off("openChat", this.onOpenChat);
    historyBus.off("nodeMove", this.onMoveNode);
    historyBus.off("revertAddNode", this.onRevertAddNode);
    historyBus.off("revertRemoveNode", this.onRevertRemoveNode);
    historyBus.off("revertAddConnection", this.onRevertAddConnection);
    historyBus.off("revertRemoveConnection", this.onRevertRemoveConnection);
    historyBus.off("revertRenameNode", this.onRevertNameChange);
    historyBus.off("enableNodeToggle", this.onRevertEnableToggle);
    dataPinningEventBus.off("pin-data", this.addPinDataConnections);
    dataPinningEventBus.off("unpin-data", this.removePinDataConnections);
    nodeViewEventBus.off("saveWorkflow", this.saveCurrentWorkflowExternal);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.keyDown);
    document.removeEventListener("keyup", this.keyUp);
    this.unregisterCustomAction("showNodeCreator");
    this.resetWorkspace();
    this.instance.unbind();
    this.instance.destroy();
    this.uiStore.stateIsDirty = false;
    window.removeEventListener("message", this.onPostMessageReceived);
    nodeViewEventBus.off("newWorkflow", this.newWorkflow);
    nodeViewEventBus.off("importWorkflowData", this.onImportWorkflowDataEvent);
    nodeViewEventBus.off("importWorkflowUrl", this.onImportWorkflowUrlEvent);
    this.workflowsStore.setWorkflowId(PLACEHOLDER_EMPTY_WORKFLOW_ID);
    sourceControlEventBus.off("pull", this.onSourceControlPull);
  }
});
const NodeView_vue_vue_type_style_index_0_scoped_6d18e878_lang = "";
const NodeView_vue_vue_type_style_index_1_lang = "";
const content = "_content_8gnvh_5";
const shake = "_shake_8gnvh_13";
const style2 = {
  content,
  shake
};
const _withScopeId = (n) => (pushScopeId("data-v-6d18e878"), n = n(), popScopeId(), n);
const _hoisted_1 = ["textContent"];
const _hoisted_2 = {
  key: 0,
  class: "workflow-execute-wrapper"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_canvas_add_button = resolveComponent("canvas-add-button");
  const _component_node = resolveComponent("node");
  const _component_sticky = resolveComponent("sticky");
  const _component_node_details_view = resolveComponent("node-details-view");
  const _component_NodeCreation = resolveComponent("NodeCreation");
  const _component_CanvasControls = resolveComponent("CanvasControls");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _directive_touch = resolveDirective("touch");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style["content"])
  }, [
    createBaseVNode("div", {
      class: "node-view-root do-not-select",
      id: "node-view-root",
      "data-test-id": "node-view-root",
      onDragover: _cache[12] || (_cache[12] = (...args) => _ctx.onDragOver && _ctx.onDragOver(...args)),
      onDrop: _cache[13] || (_cache[13] = (...args) => _ctx.onDrop && _ctx.onDrop(...args))
    }, [
      withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass(["node-view-wrapper", _ctx.workflowClasses]),
        "data-test-id": "node-view-wrapper",
        onTouchstart: _cache[3] || (_cache[3] = (...args) => _ctx.mouseDown && _ctx.mouseDown(...args)),
        onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.mouseUp && _ctx.mouseUp(...args)),
        onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.mouseMoveNodeWorkflow && _ctx.mouseMoveNodeWorkflow(...args)),
        onMousedown: _cache[6] || (_cache[6] = (...args) => _ctx.mouseDown && _ctx.mouseDown(...args)),
        onMouseup: _cache[7] || (_cache[7] = (...args) => _ctx.mouseUp && _ctx.mouseUp(...args)),
        onWheel: _cache[8] || (_cache[8] = (...args) => _ctx.canvasStore.wheelScroll && _ctx.canvasStore.wheelScroll(...args))
      }, [
        createBaseVNode("div", {
          id: "node-view-background",
          class: "node-view-background",
          style: normalizeStyle(_ctx.backgroundStyle),
          "data-test-id": "node-view-background"
        }, null, 4),
        createBaseVNode("div", {
          id: "node-view",
          class: "node-view",
          style: normalizeStyle(_ctx.workflowStyle),
          ref: "nodeView",
          "data-test-id": "node-view"
        }, [
          withDirectives(createVNode(_component_canvas_add_button, {
            style: normalizeStyle(_ctx.canvasAddButtonStyle),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.showTriggerCreator(_ctx.NODE_CREATOR_OPEN_SOURCES.TRIGGER_PLACEHOLDER_BUTTON)),
            showTooltip: !_ctx.containsTrigger && _ctx.showTriggerMissingTooltip,
            position: _ctx.canvasStore.canvasAddButtonPosition,
            ref: "canvasAddButton",
            "onHook:mounted": _ctx.canvasStore.setRecenteredCanvasAddButtonPosition,
            "data-test-id": "canvas-add-button"
          }, null, 8, ["style", "showTooltip", "position", "onHook:mounted"]), [
            [vShow, _ctx.showCanvasAddButton]
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.nodesToRender, (nodeData) => {
            return openBlock(), createBlock(_component_node, {
              onDuplicateNode: _ctx.duplicateNode,
              onDeselectAllNodes: _ctx.deselectAllNodes,
              onDeselectNode: _ctx.nodeDeselectedByName,
              onNodeSelected: _ctx.nodeSelectedByName,
              onRemoveNode: _cache[1] || (_cache[1] = (name) => _ctx.removeNode(name, true)),
              onRunWorkflow: _ctx.onRunNode,
              onMoved: _ctx.onNodeMoved,
              onRun: _ctx.onNodeRun,
              key: `${nodeData.id}_node`,
              name: nodeData.name,
              isReadOnly: _ctx.isReadOnlyRoute || _ctx.readOnlyEnv,
              instance: _ctx.instance,
              isActive: !!_ctx.activeNode && _ctx.activeNode.name === nodeData.name,
              hideActions: _ctx.pullConnActive,
              isProductionExecutionPreview: _ctx.isProductionExecutionPreview
            }, {
              "custom-tooltip": withCtx(() => [
                createBaseVNode("span", {
                  textContent: toDisplayString(_ctx.$locale.baseText("nodeView.placeholderNode.addTriggerNodeBeforeExecuting"))
                }, null, 8, _hoisted_1)
              ]),
              _: 2
            }, 1032, ["onDuplicateNode", "onDeselectAllNodes", "onDeselectNode", "onNodeSelected", "onRunWorkflow", "onMoved", "onRun", "name", "isReadOnly", "instance", "isActive", "hideActions", "isProductionExecutionPreview"]);
          }), 128)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.stickiesToRender, (stickyData) => {
            return openBlock(), createBlock(_component_sticky, {
              onDeselectAllNodes: _ctx.deselectAllNodes,
              onDeselectNode: _ctx.nodeDeselectedByName,
              onNodeSelected: _ctx.nodeSelectedByName,
              onRemoveNode: _cache[2] || (_cache[2] = (name) => _ctx.removeNode(name, true)),
              key: `${stickyData.id}_sticky`,
              name: stickyData.name,
              isReadOnly: _ctx.isReadOnlyRoute || _ctx.readOnlyEnv,
              instance: _ctx.instance,
              isActive: !!_ctx.activeNode && _ctx.activeNode.name === stickyData.name,
              nodeViewScale: _ctx.nodeViewScale,
              gridSize: _ctx.GRID_SIZE,
              hideActions: _ctx.pullConnActive
            }, null, 8, ["onDeselectAllNodes", "onDeselectNode", "onNodeSelected", "name", "isReadOnly", "instance", "isActive", "nodeViewScale", "gridSize", "hideActions"]);
          }), 128))
        ], 4)
      ], 34)), [
        [_directive_touch, _ctx.touchTap, "tap"]
      ]),
      createVNode(_component_node_details_view, {
        readOnly: _ctx.isReadOnlyRoute || _ctx.readOnlyEnv,
        renaming: _ctx.renamingActive,
        isProductionExecutionPreview: _ctx.isProductionExecutionPreview,
        onRedrawNode: _ctx.redrawNode,
        onValueChanged: _ctx.valueChanged,
        onStopExecution: _ctx.stopExecution,
        onSaveKeyboardShortcut: _ctx.onSaveKeyboardShortcut
      }, null, 8, ["readOnly", "renaming", "isProductionExecutionPreview", "onRedrawNode", "onValueChanged", "onStopExecution", "onSaveKeyboardShortcut"]),
      (openBlock(), createBlock(Suspense, null, {
        default: withCtx(() => [
          !_ctx.isReadOnlyRoute && !_ctx.readOnlyEnv ? (openBlock(), createBlock(_component_NodeCreation, {
            key: 0,
            "create-node-active": _ctx.createNodeActive,
            "node-view-scale": _ctx.nodeViewScale,
            onToggleNodeCreator: _ctx.onToggleNodeCreator,
            onAddNodes: _ctx.onAddNodes
          }, null, 8, ["create-node-active", "node-view-scale", "onToggleNodeCreator", "onAddNodes"])) : createCommentVNode("", true)
        ]),
        _: 1
      })),
      (openBlock(), createBlock(Suspense, null, {
        default: withCtx(() => [
          createVNode(_component_CanvasControls)
        ]),
        _: 1
      })),
      !_ctx.isReadOnlyRoute && !_ctx.readOnlyEnv ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createBaseVNode("span", {
          onMouseenter: _cache[9] || (_cache[9] = ($event) => _ctx.showTriggerMissingToltip(true)),
          onMouseleave: _cache[10] || (_cache[10] = ($event) => _ctx.showTriggerMissingToltip(false)),
          onClick: _cache[11] || (_cache[11] = (...args) => _ctx.onRunContainerClick && _ctx.onRunContainerClick(...args))
        }, [
          createVNode(_component_n8n_button, {
            onClick: withModifiers(_ctx.onRunWorkflow, ["stop"]),
            loading: _ctx.workflowRunning,
            label: _ctx.runButtonText,
            title: _ctx.$locale.baseText("nodeView.executesTheWorkflowFromATriggerNode"),
            size: "large",
            icon: "play-circle",
            type: "primary",
            disabled: _ctx.isExecutionDisabled,
            "data-test-id": "execute-workflow-button"
          }, null, 8, ["onClick", "loading", "label", "title", "disabled"])
        ], 32),
        _ctx.containsChatNodes ? (openBlock(), createBlock(_component_n8n_button, {
          key: 0,
          onClick: withModifiers(_ctx.onOpenChat, ["stop"]),
          label: "Chat",
          size: "large",
          icon: "comment",
          type: "primary",
          "data-test-id": "workflow-chat-button"
        }, null, 8, ["onClick"])) : createCommentVNode("", true),
        _ctx.workflowRunning === true && !_ctx.executionWaitingForWebhook ? (openBlock(), createBlock(_component_n8n_icon_button, {
          key: 1,
          icon: "stop",
          size: "large",
          class: "stop-execution",
          type: "secondary",
          title: _ctx.stopExecutionInProgress ? _ctx.$locale.baseText("nodeView.stoppingCurrentExecution") : _ctx.$locale.baseText("nodeView.stopCurrentExecution"),
          loading: _ctx.stopExecutionInProgress,
          onClick: withModifiers(_ctx.stopExecution, ["stop"]),
          "data-test-id": "stop-execution-button"
        }, null, 8, ["title", "loading", "onClick"])) : createCommentVNode("", true),
        _ctx.workflowRunning === true && _ctx.executionWaitingForWebhook === true ? (openBlock(), createBlock(_component_n8n_icon_button, {
          key: 2,
          class: "stop-execution",
          icon: "stop",
          size: "large",
          title: _ctx.$locale.baseText("nodeView.stopWaitingForWebhookCall"),
          type: "secondary",
          onClick: withModifiers(_ctx.stopWaitingForWebhook, ["stop"]),
          "data-test-id": "stop-execution-waiting-for-webhook-button"
        }, null, 8, ["title", "onClick"])) : createCommentVNode("", true),
        !_ctx.isReadOnlyRoute && !_ctx.readOnlyEnv && _ctx.workflowExecution && !_ctx.workflowRunning && !_ctx.allTriggersDisabled ? (openBlock(), createBlock(_component_n8n_icon_button, {
          key: 3,
          title: _ctx.$locale.baseText("nodeView.deletesTheCurrentExecutionData"),
          icon: "trash",
          size: "large",
          onClick: withModifiers(_ctx.clearExecutionData, ["stop"]),
          "data-test-id": "clear-execution-data-button"
        }, null, 8, ["title", "onClick"])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ], 32)
  ], 2);
}
const cssModules = {
  "$style": style2
};
const NodeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules], ["__scopeId", "data-v-6d18e878"]]);
const NodeView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NodeView
}, Symbol.toStringTag, { value: "Module" }));
export {
  AIView as A,
  Draggable as D,
  NodeView$1 as N,
  RegularView as R,
  TriggerView as T,
  useKeyboardNavigation as a,
  AINodesView as b,
  pinData as p,
  useViewStacks as u
};
