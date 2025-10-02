import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, f as withCtx, j as createBaseVNode, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode, aB as pushScopeId, aC as popScopeId, a3 as Fragment, ai as renderList } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { e as executionHelpers } from "./executionsHelpers-fe945104.js";
import { B as VIEWS, _ as _export_sfc, H as useWorkflowsStore, n as useUIStore, u as useToast, $ as useMessage, y as useSettingsStore, G as useNodeTypesStore, bp as useTagsStore, a4 as PLACEHOLDER_EMPTY_WORKFLOW_ID, fi as getNodeViewTab, dY as MAIN_HEADER_TABS, a9 as MODAL_CONFIRM, fj as MODAL_CANCEL, fZ as NO_NETWORK_ERROR_CODE, a7 as getNodeParameters, a3 as WEBHOOK_NODE_TYPE } from "./n8n-8ddd8349.js";
import { E as ExecutionTime, a as ExecutionFilter } from "./ExecutionFilter-0922a47f.js";
import { E as ExecutionsInfoAccordion } from "./ExecutionsInfoAccordion-ff562257.js";
import { v as v4 } from "./uuid-2dfcd766.js";
import { z as range } from "./lodash-es-be629387.js";
import { d as debounceHelper, w as workflowHelpers, k as executionFilterToQueryFilter } from "./index-00f166b0.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./@vueuse/core-f4908be6.js";
import "./vue-i18n-86898575.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
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
const _sfc_main$2 = defineComponent({
  name: "execution-card",
  mixins: [executionHelpers],
  components: {
    ExecutionTime
  },
  data() {
    return {
      VIEWS
    };
  },
  props: {
    execution: {
      type: Object,
      required: true
    },
    highlight: {
      type: Boolean,
      default: false
    },
    showGap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    retryExecutionActions() {
      return [
        {
          id: "current-workflow",
          label: this.$locale.baseText("executionsList.retryWithCurrentlySavedWorkflow")
        },
        {
          id: "original-workflow",
          label: this.$locale.baseText("executionsList.retryWithOriginalWorkflow")
        }
      ];
    },
    executionUIDetails() {
      return this.getExecutionUIDetails(this.execution);
    },
    isActive() {
      return this.execution.id === this.$route.params.executionId;
    }
  },
  methods: {
    onRetryMenuItemSelect(action) {
      this.$emit("retryExecution", { execution: this.execution, command: action });
    }
  }
});
const executionCard = "_executionCard_12y8i_5";
const active = "_active_12y8i_10";
const executionStatus = "_executionStatus_12y8i_13";
const executionLink = "_executionLink_12y8i_16";
const running = "_running_12y8i_19";
const spinner = "_spinner_12y8i_19";
const statusLabel = "_statusLabel_12y8i_26";
const success = "_success_12y8i_30";
const waiting = "_waiting_12y8i_33";
const error = "_error_12y8i_39";
const unknown = "_unknown_12y8i_45";
const icon = "_icon_12y8i_61";
const icons = "_icons_12y8i_66";
const retry = "_retry_12y8i_74";
const manual = "_manual_12y8i_77";
const showGap = "_showGap_12y8i_85";
const style0$2 = {
  executionCard,
  active,
  executionStatus,
  executionLink,
  running,
  spinner,
  statusLabel,
  success,
  waiting,
  error,
  unknown,
  icon,
  icons,
  retry,
  manual,
  showGap
};
const _hoisted_1$1 = { key: 0 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_spinner = resolveComponent("n8n-spinner");
  const _component_execution_time = resolveComponent("execution-time");
  const _component_n8n_action_dropdown = resolveComponent("n8n-action-dropdown");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      ["execution-card"]: true,
      [_ctx.$style.executionCard]: true,
      [_ctx.$style.active]: _ctx.isActive,
      [_ctx.$style[_ctx.executionUIDetails.name]]: true,
      [_ctx.$style.highlight]: _ctx.highlight,
      [_ctx.$style.showGap]: _ctx.showGap
    })
  }, [
    createVNode(_component_router_link, {
      class: normalizeClass(_ctx.$style.executionLink),
      to: {
        name: _ctx.VIEWS.EXECUTION_PREVIEW,
        params: { name: _ctx.currentWorkflow, executionId: _ctx.execution.id }
      },
      "data-test-execution-status": _ctx.executionUIDetails.name
    }, {
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.description)
        }, [
          createVNode(_component_n8n_text, {
            color: "text-dark",
            bold: true,
            size: "medium",
            "data-test-id": "execution-time"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.executionUIDetails.startTime), 1)
            ]),
            _: 1
          }),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.executionStatus)
          }, [
            _ctx.executionUIDetails.name === "running" ? (openBlock(), createBlock(_component_n8n_spinner, {
              key: 0,
              size: "small",
              class: normalizeClass([_ctx.$style.spinner, "mr-4xs"])
            }, null, 8, ["class"])) : createCommentVNode("", true),
            createVNode(_component_n8n_text, {
              class: normalizeClass(_ctx.$style.statusLabel),
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.executionUIDetails.label), 1)
              ]),
              _: 1
            }, 8, ["class"]),
            createTextVNode(" " + toDisplayString(" ") + " "),
            _ctx.executionUIDetails.name === "running" ? (openBlock(), createBlock(_component_n8n_text, {
              key: 1,
              color: _ctx.isActive ? "text-dark" : "text-base",
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.runningTimeRunning")) + " ", 1),
                createVNode(_component_execution_time, {
                  "start-time": _ctx.execution.startedAt
                }, null, 8, ["start-time"])
              ]),
              _: 1
            }, 8, ["color"])) : _ctx.executionUIDetails.runningTime !== "" ? (openBlock(), createBlock(_component_n8n_text, {
              key: 2,
              color: _ctx.isActive ? "text-dark" : "text-base",
              size: "small"
            }, {
              default: withCtx(() => {
                var _a;
                return [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.runningTimeFinished", {
                    interpolate: { time: (_a = _ctx.executionUIDetails) == null ? void 0 : _a.runningTime }
                  })), 1)
                ];
              }),
              _: 1
            }, 8, ["color"])) : createCommentVNode("", true)
          ], 2),
          _ctx.execution.mode === "retry" ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
            createVNode(_component_n8n_text, {
              color: _ctx.isActive ? "text-dark" : "text-base",
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("executionDetails.retry")) + " #" + toDisplayString(_ctx.execution.retryOf), 1)
              ]),
              _: 1
            }, 8, ["color"])
          ])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.icons)
        }, [
          _ctx.executionUIDetails.name === "error" ? (openBlock(), createBlock(_component_n8n_action_dropdown, {
            key: 0,
            class: normalizeClass([_ctx.$style.icon, _ctx.$style.retry]),
            items: _ctx.retryExecutionActions,
            activatorIcon: "redo",
            "data-test-id": "retry-execution-button",
            onSelect: _ctx.onRetryMenuItemSelect
          }, null, 8, ["class", "items", "onSelect"])) : createCommentVNode("", true),
          _ctx.execution.mode === "manual" ? (openBlock(), createBlock(_component_n8n_tooltip, {
            key: 1,
            placement: "top"
          }, {
            content: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("executionsList.test")), 1)
            ]),
            default: withCtx(() => [
              _ctx.execution.mode === "manual" ? (openBlock(), createBlock(_component_font_awesome_icon, {
                key: 0,
                class: normalizeClass([_ctx.$style.icon, _ctx.$style.manual]),
                icon: "flask"
              }, null, 8, ["class"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], 2)
      ]),
      _: 1
    }, 8, ["class", "to", "data-test-execution-status"])
  ], 2);
}
const cssModules$2 = {
  "$style": style0$2
};
const ExecutionCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__cssModules", cssModules$2]]);
const _sfc_main$1 = defineComponent({
  name: "executions-sidebar",
  components: {
    ExecutionCard,
    ExecutionsInfoAccordion,
    ExecutionFilter
  },
  props: {
    autoRefresh: {
      type: Boolean,
      default: false
    },
    executions: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    loadingMore: {
      type: Boolean,
      default: false
    },
    temporaryExecution: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      VIEWS,
      filter: {}
    };
  },
  computed: {
    ...mapStores(useUIStore, useWorkflowsStore)
  },
  watch: {
    $route(to, from) {
      if (from.name === VIEWS.EXECUTION_PREVIEW && to.name === VIEWS.EXECUTION_HOME) {
        this.$router.go(-1);
      }
    },
    "workflowsStore.activeWorkflowExecution"() {
      this.checkListSize();
      this.scrollToActiveCard();
    }
  },
  mounted() {
    this.checkListSize();
    this.scrollToActiveCard();
  },
  methods: {
    loadMore(limit = 20) {
      if (!this.loading) {
        const executionsListRef = this.$refs.executionList;
        if (executionsListRef) {
          const diff = executionsListRef.offsetHeight - (executionsListRef.scrollHeight - executionsListRef.scrollTop);
          if (diff > -10 && diff < 10) {
            this.$emit("loadMore", limit);
          }
        }
      }
    },
    onRetryExecution(payload) {
      this.$emit("retryExecution", payload);
    },
    onRefresh() {
      this.$emit("refresh");
    },
    onFilterChanged(filter) {
      this.$emit("filterUpdated", filter);
    },
    reloadExecutions() {
      this.$emit("reloadExecutions");
    },
    checkListSize() {
      var _a;
      const sidebarContainerRef = this.$refs.container;
      const currentExecutionCardRefs = this.$refs[`execution-${(_a = this.workflowsStore.activeWorkflowExecution) == null ? void 0 : _a.id}`];
      if (sidebarContainerRef && (currentExecutionCardRefs == null ? void 0 : currentExecutionCardRefs.length)) {
        const cardElement = currentExecutionCardRefs[0].$el;
        const listCapacity = Math.ceil(sidebarContainerRef.clientHeight / cardElement.clientHeight);
        if (listCapacity > this.executions.length) {
          this.$emit("loadMore", listCapacity - this.executions.length);
        }
      }
    },
    scrollToActiveCard() {
      var _a;
      const executionsListRef = this.$refs.executionList;
      const currentExecutionCardRefs = this.$refs[`execution-${(_a = this.workflowsStore.activeWorkflowExecution) == null ? void 0 : _a.id}`];
      if (executionsListRef && (currentExecutionCardRefs == null ? void 0 : currentExecutionCardRefs.length) && this.workflowsStore.activeWorkflowExecution) {
        const cardElement = currentExecutionCardRefs[0].$el;
        const cardRect = cardElement.getBoundingClientRect();
        const LIST_HEADER_OFFSET = 200;
        if (cardRect.top > executionsListRef.offsetHeight) {
          executionsListRef.scrollTo({ top: cardRect.top - LIST_HEADER_OFFSET });
        }
      }
    }
  }
});
const container$1 = "_container_iuzt7_5";
const heading = "_heading_iuzt7_16";
const controls = "_controls_iuzt7_23";
const executionList = "_executionList_iuzt7_35";
const infoAccordion = "_infoAccordion_iuzt7_53";
const noResultsContainer = "_noResultsContainer_iuzt7_65";
const style0$1 = {
  container: container$1,
  heading,
  controls,
  executionList,
  infoAccordion,
  noResultsContainer
};
const ExecutionsSidebar_vue_vue_type_style_index_1_scoped_2a9b4e57_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-2a9b4e57"), n = n(), popScopeId(), n);
const _hoisted_1 = {
  key: 0,
  class: "mr-l"
};
const _hoisted_2 = {
  key: 3,
  class: "mr-m"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_execution_filter = resolveComponent("execution-filter");
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_execution_card = resolveComponent("execution-card");
  const _component_executions_info_accordion = resolveComponent("executions-info-accordion");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["executions-sidebar", _ctx.$style.container]),
    ref: "container",
    "data-test-id": "executions-sidebar"
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.heading)
    }, [
      createVNode(_component_n8n_heading, {
        tag: "h2",
        size: "medium",
        color: "text-dark"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("generic.executions")), 1)
        ]),
        _: 1
      })
    ], 2),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.controls)
    }, [
      createVNode(_component_el_checkbox, {
        modelValue: _ctx.autoRefresh,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:autoRefresh", $event)),
        "data-test-id": "auto-refresh-checkbox"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsList.autoRefresh")), 1)
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(_component_execution_filter, {
        "popover-placement": "left-start",
        onFilterChanged: _ctx.onFilterChanged
      }, null, 8, ["onFilterChanged"])
    ], 2),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.executionList),
      ref: "executionList",
      "data-test-id": "current-executions-list",
      onScroll: _cache[1] || (_cache[1] = ($event) => _ctx.loadMore(20))
    }, [
      _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n8n_loading, { variant: "rect" })
      ])) : createCommentVNode("", true),
      !_ctx.loading && _ctx.executions.length === 0 ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.noResultsContainer)
      }, [
        createVNode(_component_n8n_text, {
          color: "text-base",
          size: "medium",
          align: "center"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.noResults")), 1)
          ]),
          _: 1
        })
      ], 2)) : _ctx.temporaryExecution ? (openBlock(), createBlock(_component_execution_card, {
        key: 2,
        execution: _ctx.temporaryExecution,
        ref: `execution-${_ctx.temporaryExecution.id}`,
        "data-test-id": `execution-details-${_ctx.temporaryExecution.id}`,
        showGap: true,
        onRetryExecution: _ctx.onRetryExecution
      }, null, 8, ["execution", "data-test-id", "onRetryExecution"])) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.executions, (execution) => {
        return openBlock(), createBlock(_component_execution_card, {
          key: execution.id,
          execution,
          ref_for: true,
          ref: `execution-${execution.id}`,
          "data-test-id": `execution-details-${execution.id}`,
          onRetryExecution: _ctx.onRetryExecution
        }, null, 8, ["execution", "data-test-id", "onRetryExecution"]);
      }), 128)),
      _ctx.loadingMore ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(_component_n8n_loading, {
          variant: "p",
          rows: 1
        })
      ])) : createCommentVNode("", true)
    ], 34),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.infoAccordion)
    }, [
      createVNode(_component_executions_info_accordion, { initiallyExpanded: false })
    ], 2)
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const ExecutionsSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1], ["__scopeId", "data-v-2a9b4e57"]]);
const MAX_LOADING_ATTEMPTS = 5;
const LOAD_MORE_PAGE_SIZE = 100;
const _sfc_main = defineComponent({
  name: "executions-list",
  mixins: [executionHelpers, debounceHelper, workflowHelpers],
  components: {
    ExecutionsSidebar
  },
  data() {
    return {
      loading: false,
      loadingMore: false,
      filter: {},
      temporaryExecution: null,
      autoRefresh: false,
      autoRefreshTimeout: void 0
    };
  },
  setup() {
    return {
      ...useToast(),
      ...useMessage()
    };
  },
  computed: {
    ...mapStores(useTagsStore, useNodeTypesStore, useSettingsStore, useUIStore, useWorkflowsStore),
    hidePreview() {
      const activeNotPresent = this.filterApplied && !this.executions.find((ex) => {
        var _a;
        return ex.id === ((_a = this.activeExecution) == null ? void 0 : _a.id);
      });
      return this.loading || !this.executions.length || activeNotPresent;
    },
    filterApplied() {
      return this.filter.status !== "all";
    },
    workflowDataNotLoaded() {
      return this.workflowsStore.workflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID && this.workflowsStore.workflowName === "";
    },
    loadedFinishedExecutionsCount() {
      return this.workflowsStore.getAllLoadedFinishedExecutions.length;
    },
    totalFinishedExecutionsCount() {
      return this.workflowsStore.getTotalFinishedExecutionsCount;
    },
    requestFilter() {
      return executionFilterToQueryFilter({
        ...this.filter,
        workflowId: this.currentWorkflow
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.name) {
        const workflowChanged = from.params.name !== to.params.name;
        void this.initView(workflowChanged);
      }
      if (to.params.executionId) {
        const execution = this.workflowsStore.getExecutionDataById(to.params.executionId);
        if (execution) {
          this.workflowsStore.activeWorkflowExecution = execution;
        }
      }
    }
  },
  async beforeRouteLeave(to, from, next) {
    this.stopAutoRefreshInterval();
    if (getNodeViewTab(to) === MAIN_HEADER_TABS.WORKFLOW) {
      next();
      return;
    }
    if (this.uiStore.stateIsDirty) {
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
        const saved = await this.saveCurrentWorkflow({}, false);
        if (saved) {
          await this.settingsStore.fetchPromptsData();
        }
        this.uiStore.stateIsDirty = false;
        next();
      } else if (confirmModal === MODAL_CANCEL) {
        this.uiStore.stateIsDirty = false;
        next();
      }
    } else {
      next();
    }
  },
  async mounted() {
    this.loading = true;
    const workflowUpdated = this.$route.params.name !== this.workflowsStore.workflowId;
    const onNewWorkflow = this.$route.params.name === "new" && this.workflowsStore.workflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID;
    const shouldUpdate = workflowUpdated && !onNewWorkflow;
    await this.initView(shouldUpdate);
    if (!shouldUpdate) {
      if (this.workflowsStore.currentWorkflowExecutions.length > 0) {
        const workflowExecutions = await this.loadExecutions();
        this.workflowsStore.addToCurrentExecutions(workflowExecutions);
        await this.setActiveExecution();
      } else {
        await this.setExecutions();
      }
    }
    this.autoRefresh = this.uiStore.executionSidebarAutoRefresh;
    void this.startAutoRefreshInterval();
    document.addEventListener("visibilitychange", this.onDocumentVisibilityChange);
    this.loading = false;
  },
  beforeUnmount() {
    this.stopAutoRefreshInterval();
    document.removeEventListener("visibilitychange", this.onDocumentVisibilityChange);
  },
  methods: {
    async initView(loadWorkflow) {
      if (loadWorkflow) {
        if (this.nodeTypesStore.allNodeTypes.length === 0) {
          await this.nodeTypesStore.getNodeTypes();
        }
        await this.openWorkflow(this.$route.params.name);
        this.uiStore.nodeViewInitialized = false;
        if (this.workflowsStore.currentWorkflowExecutions.length === 0) {
          await this.setExecutions();
        }
        if (this.activeExecution) {
          this.$router.push({
            name: VIEWS.EXECUTION_PREVIEW,
            params: { name: this.currentWorkflow, executionId: this.activeExecution.id }
          }).catch(() => {
          });
        }
      }
    },
    async onLoadMore() {
      if (!this.loadingMore) {
        await this.callDebounced("loadMore", { debounceTime: 1e3 });
      }
    },
    async loadMore(limit = 20) {
      var _a;
      if (this.filter.status === "running" || this.loadedFinishedExecutionsCount >= this.totalFinishedExecutionsCount) {
        return;
      }
      this.loadingMore = true;
      let lastId;
      if (this.executions.length !== 0) {
        const lastItem = this.executions.slice(-1)[0];
        lastId = lastItem.id;
      }
      let data;
      try {
        data = await this.workflowsStore.getPastExecutions(this.requestFilter, limit, lastId);
      } catch (error2) {
        this.loadingMore = false;
        this.showError(error2, this.$locale.baseText("executionsList.showError.loadMore.title"));
        return;
      }
      data.results = data.results.map((execution) => {
        return { ...execution, mode: execution.mode };
      });
      const currentExecutions = [...this.executions];
      for (const newExecution of data.results) {
        if (currentExecutions.find((ex) => ex.id === newExecution.id) === void 0) {
          currentExecutions.push(newExecution);
        }
        if (newExecution.id === ((_a = this.temporaryExecution) == null ? void 0 : _a.id)) {
          this.temporaryExecution = null;
        }
      }
      this.workflowsStore.currentWorkflowExecutions = currentExecutions;
      this.loadingMore = false;
    },
    async onDeleteCurrentExecution() {
      var _a;
      this.loading = true;
      try {
        const executionIndex = this.executions.findIndex(
          (execution) => execution.id === this.$route.params.executionId
        );
        const nextExecution = this.executions[executionIndex + 1] || this.executions[executionIndex - 1] || this.executions[0];
        await this.workflowsStore.deleteExecutions({ ids: [this.$route.params.executionId] });
        if (((_a = this.temporaryExecution) == null ? void 0 : _a.id) === this.$route.params.executionId) {
          this.temporaryExecution = null;
        }
        if (this.executions.length > 0) {
          await this.$router.push({
            name: VIEWS.EXECUTION_PREVIEW,
            params: { name: this.currentWorkflow, executionId: nextExecution.id }
          }).catch(() => {
          });
          this.workflowsStore.activeWorkflowExecution = nextExecution;
        } else {
          this.workflowsStore.activeWorkflowExecution = null;
          await this.$router.push({
            name: VIEWS.EXECUTION_HOME,
            params: { name: this.currentWorkflow }
          });
        }
        await this.setExecutions();
      } catch (error2) {
        this.loading = false;
        this.showError(
          error2,
          this.$locale.baseText("executionsList.showError.handleDeleteSelected.title")
        );
        return;
      }
      this.loading = false;
      this.showMessage({
        title: this.$locale.baseText("executionsList.showMessage.handleDeleteSelected.title"),
        type: "success"
      });
    },
    async onStopExecution() {
      const activeExecutionId = this.$route.params.executionId;
      try {
        await this.workflowsStore.stopCurrentExecution(activeExecutionId);
        this.showMessage({
          title: this.$locale.baseText("executionsList.showMessage.stopExecution.title"),
          message: this.$locale.baseText("executionsList.showMessage.stopExecution.message", {
            interpolate: { activeExecutionId }
          }),
          type: "success"
        });
        await this.loadAutoRefresh();
      } catch (error2) {
        this.showError(
          error2,
          this.$locale.baseText("executionsList.showError.stopExecution.title")
        );
      }
    },
    async onFilterUpdated(filter) {
      this.filter = filter;
      await this.setExecutions();
    },
    async setExecutions() {
      this.workflowsStore.currentWorkflowExecutions = await this.loadExecutions();
      await this.setActiveExecution();
    },
    async startAutoRefreshInterval() {
      if (this.autoRefresh) {
        await this.loadAutoRefresh();
        this.stopAutoRefreshInterval();
        this.autoRefreshTimeout = setTimeout(() => {
          void this.startAutoRefreshInterval();
        }, 4e3);
      }
    },
    stopAutoRefreshInterval() {
      if (this.autoRefreshTimeout) {
        clearTimeout(this.autoRefreshTimeout);
        this.autoRefreshTimeout = void 0;
      }
    },
    onAutoRefreshToggle(value) {
      this.autoRefresh = value;
      this.uiStore.executionSidebarAutoRefresh = this.autoRefresh;
      this.stopAutoRefreshInterval();
      void this.startAutoRefreshInterval();
    },
    onDocumentVisibilityChange() {
      if (document.visibilityState === "hidden") {
        void this.stopAutoRefreshInterval();
      } else {
        void this.startAutoRefreshInterval();
      }
    },
    async loadAutoRefresh() {
      var _a;
      const fetchedExecutions = await this.loadExecutions();
      let existingExecutions = [...this.executions];
      const alreadyPresentExecutionIds = existingExecutions.map((exec) => parseInt(exec.id, 10));
      let lastId = 0;
      const gaps = [];
      let updatedActiveExecution = null;
      for (let i = fetchedExecutions.length - 1; i >= 0; i--) {
        const currentItem = fetchedExecutions[i];
        const currentId = parseInt(currentItem.id, 10);
        if (lastId !== 0 && !isNaN(currentId)) {
          if (currentId - lastId > 1) {
            const range$1 = range(lastId + 1, currentId);
            gaps.push(...range$1);
          }
        }
        lastId = parseInt(currentItem.id, 10) || 0;
        const executionIndex = alreadyPresentExecutionIds.indexOf(currentId);
        if (executionIndex !== -1) {
          const existingExecution = existingExecutions.find((ex) => ex.id === currentItem.id);
          const existingStillRunning = existingExecution && existingExecution.finished === false || (existingExecution == null ? void 0 : existingExecution.stoppedAt) === void 0;
          const currentFinished = currentItem.finished === true || currentItem.stoppedAt !== void 0;
          if (existingStillRunning && currentFinished) {
            existingExecutions[executionIndex] = currentItem;
            if (currentItem.id === ((_a = this.activeExecution) == null ? void 0 : _a.id)) {
              updatedActiveExecution = currentItem;
            }
          }
          continue;
        }
        let j;
        for (j = existingExecutions.length - 1; j >= 0; j--) {
          if (currentId < parseInt(existingExecutions[j].id, 10)) {
            existingExecutions.splice(j + 1, 0, currentItem);
            break;
          }
        }
        if (j === -1) {
          existingExecutions.unshift(currentItem);
        }
      }
      existingExecutions = existingExecutions.filter(
        (execution) => !gaps.includes(parseInt(execution.id, 10)) && lastId >= parseInt(execution.id, 10)
      );
      this.workflowsStore.currentWorkflowExecutions = existingExecutions;
      if (updatedActiveExecution !== null) {
        this.workflowsStore.activeWorkflowExecution = updatedActiveExecution;
      } else {
        const activeInList = existingExecutions.some((ex) => {
          var _a2;
          return ex.id === ((_a2 = this.activeExecution) == null ? void 0 : _a2.id);
        });
        if (!activeInList && this.executions.length > 0 && !this.temporaryExecution) {
          this.$router.push({
            name: VIEWS.EXECUTION_PREVIEW,
            params: { name: this.currentWorkflow, executionId: this.executions[0].id }
          }).catch(() => {
          });
        } else if (this.executions.length === 0) {
          this.$router.push({ name: VIEWS.EXECUTION_HOME }).catch(() => {
          });
          this.workflowsStore.activeWorkflowExecution = null;
        }
      }
    },
    async loadExecutions() {
      if (!this.currentWorkflow) {
        return [];
      }
      try {
        return await this.workflowsStore.loadCurrentWorkflowExecutions(this.requestFilter);
      } catch (error2) {
        if (error2.errorCode === NO_NETWORK_ERROR_CODE) {
          this.showMessage(
            {
              title: this.$locale.baseText("executionsList.showError.refreshData.title"),
              message: error2.message,
              type: "error",
              duration: 3500
            },
            false
          );
        } else {
          this.showError(
            error2,
            this.$locale.baseText("executionsList.showError.refreshData.title")
          );
        }
        return [];
      }
    },
    async setActiveExecution() {
      const activeExecutionId = this.$route.params.executionId;
      if (activeExecutionId) {
        const execution = this.workflowsStore.getExecutionDataById(activeExecutionId);
        if (execution) {
          this.workflowsStore.activeWorkflowExecution = execution;
        } else {
          await this.tryToFindExecution(activeExecutionId);
        }
      }
      if (this.workflowsStore.activeWorkflowExecution === null && this.executions.length > 0 && !this.temporaryExecution) {
        this.workflowsStore.activeWorkflowExecution = this.executions[0];
        if (this.$route.name === VIEWS.EXECUTION_HOME) {
          this.$router.push({
            name: VIEWS.EXECUTION_PREVIEW,
            params: { name: this.currentWorkflow, executionId: this.executions[0].id }
          }).catch(() => {
          });
        }
      }
    },
    async tryToFindExecution(executionId, attemptCount = 0) {
      if (attemptCount === 0) {
        const existingExecution = await this.workflowsStore.fetchExecutionDataById(executionId);
        if (!existingExecution) {
          this.workflowsStore.activeWorkflowExecution = null;
          this.showError(
            new Error(
              this.$locale.baseText("executionView.notFound.message", {
                interpolate: { executionId }
              })
            ),
            this.$locale.baseText("nodeView.showError.openExecution.title")
          );
          return;
        } else {
          this.temporaryExecution = existingExecution;
        }
      }
      if (attemptCount >= MAX_LOADING_ATTEMPTS) {
        if (this.temporaryExecution) {
          this.workflowsStore.activeWorkflowExecution = this.temporaryExecution;
          return;
        }
        this.workflowsStore.activeWorkflowExecution = null;
        return;
      }
      await this.loadMore(LOAD_MORE_PAGE_SIZE);
      const execution = this.workflowsStore.getExecutionDataById(executionId);
      if (!execution) {
        await this.$nextTick();
        await this.tryToFindExecution(executionId, attemptCount + 1);
      } else {
        this.workflowsStore.activeWorkflowExecution = execution;
        this.temporaryExecution = null;
        return;
      }
    },
    async openWorkflow(workflowId) {
      await this.loadActiveWorkflows();
      let data;
      try {
        data = await this.workflowsStore.fetchWorkflow(workflowId);
      } catch (error2) {
        this.showError(error2, this.$locale.baseText("nodeView.showError.openWorkflow.title"));
        return;
      }
      if (data === void 0) {
        throw new Error(
          this.$locale.baseText("nodeView.workflowWithIdCouldNotBeFound", {
            interpolate: { workflowId }
          })
        );
      }
      await this.addNodes(data.nodes, data.connections);
      this.workflowsStore.setActive(data.active || false);
      this.workflowsStore.setWorkflowId(workflowId);
      this.workflowsStore.setWorkflowName({ newName: data.name, setStateDirty: false });
      this.workflowsStore.setWorkflowSettings(data.settings || {});
      this.workflowsStore.setWorkflowPinData(data.pinData || {});
      const tags = data.tags || [];
      const tagIds = tags.map((tag) => tag.id);
      this.workflowsStore.setWorkflowTagIds(tagIds || []);
      this.workflowsStore.setWorkflowVersionId(data.versionId);
      this.tagsStore.upsertTags(tags);
      void this.$externalHooks().run("workflow.open", { workflowId, workflowName: data.name });
      this.uiStore.stateIsDirty = false;
    },
    async addNodes(nodes, connections) {
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
        this.workflowsStore.addNode(node);
      });
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
                this.workflowsStore.addConnection({
                  connection: connectionData,
                  setStateDirty: false
                });
              });
            }
          }
        }
      }
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
        await this.nodeTypesStore.getNodesInformation(nodesToBeFetched);
      }
    },
    async loadActiveWorkflows() {
      await this.workflowsStore.fetchActiveWorkflows();
    },
    async onRetryExecution(payload) {
      const loadWorkflow = payload.command === "current-workflow";
      this.showMessage({
        title: this.$locale.baseText("executionDetails.runningMessage"),
        type: "info",
        duration: 2e3
      });
      await this.retryExecution(payload.execution, loadWorkflow);
      await this.loadAutoRefresh();
      this.$telemetry.track("User clicked retry execution button", {
        workflow_id: this.workflowsStore.workflowId,
        execution_id: payload.execution.id,
        retry_type: loadWorkflow ? "current" : "original"
      });
    },
    async retryExecution(execution, loadWorkflow) {
      try {
        const retrySuccessful = await this.workflowsStore.retryExecution(
          execution.id,
          loadWorkflow
        );
        if (retrySuccessful) {
          this.showMessage({
            title: this.$locale.baseText("executionsList.showMessage.retrySuccessfulTrue.title"),
            type: "success"
          });
        } else {
          this.showMessage({
            title: this.$locale.baseText("executionsList.showMessage.retrySuccessfulFalse.title"),
            type: "error"
          });
        }
      } catch (error2) {
        this.showError(
          error2,
          this.$locale.baseText("executionsList.showError.retryExecution.title")
        );
      }
    }
  }
});
const container = "_container_1e18q_5";
const content = "_content_1e18q_11";
const style0 = {
  container,
  content
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_executions_sidebar = resolveComponent("executions-sidebar");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createVNode(_component_executions_sidebar, {
      executions: _ctx.executions,
      loading: _ctx.loading && !_ctx.executions.length,
      loadingMore: _ctx.loadingMore,
      temporaryExecution: _ctx.temporaryExecution,
      "auto-refresh": _ctx.autoRefresh,
      "onUpdate:autoRefresh": _ctx.onAutoRefreshToggle,
      onReloadExecutions: _ctx.setExecutions,
      onFilterUpdated: _ctx.onFilterUpdated,
      onLoadMore: _ctx.onLoadMore,
      onRetryExecution: _ctx.onRetryExecution
    }, null, 8, ["executions", "loading", "loadingMore", "temporaryExecution", "auto-refresh", "onUpdate:autoRefresh", "onReloadExecutions", "onFilterUpdated", "onLoadMore", "onRetryExecution"]),
    !_ctx.hidePreview ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.content)
    }, [
      createVNode(_component_router_view, {
        name: "executionPreview",
        onDeleteCurrentExecution: _ctx.onDeleteCurrentExecution,
        onRetryExecution: _ctx.onRetryExecution,
        onStopExecution: _ctx.onStopExecution
      }, null, 8, ["onDeleteCurrentExecution", "onRetryExecution", "onStopExecution"])
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const ExecutionsList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  ExecutionsList as default
};
