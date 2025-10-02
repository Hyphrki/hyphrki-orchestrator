import { d as defineComponent, j as createBaseVNode, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, ac as withDirectives, ad as vShow, q as createCommentVNode, a3 as Fragment, ai as renderList, af as withModifiers } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { E as ExecutionTime, a as ExecutionFilter } from "./ExecutionFilter-0922a47f.js";
import { e as externalHooks, g as genericHelpers, k as executionFilterToQueryFilter } from "./index-00f166b0.js";
import { u as useToast, $ as useMessage, g8 as setPageTitle, H as useWorkflowsStore, n as useUIStore, B as VIEWS, a9 as MODAL_CONFIRM, cN as isEmpty, eL as WAIT_TIME_UNLIMITED, am as useI18n, ar as useTelemetry, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { e as executionHelpers } from "./executionsHelpers-fe945104.js";
import { z as range } from "./lodash-es-be629387.js";
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
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
const _sfc_main$1 = defineComponent({
  name: "ExecutionsList",
  mixins: [externalHooks, genericHelpers, executionHelpers],
  components: {
    ExecutionTime,
    ExecutionFilter
  },
  props: {
    autoRefreshEnabled: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const i18n = useI18n();
    const telemetry = useTelemetry();
    return {
      i18n,
      telemetry,
      ...useToast(),
      ...useMessage()
    };
  },
  data() {
    return {
      isMounting: true,
      finishedExecutions: [],
      finishedExecutionsCount: 0,
      finishedExecutionsCountEstimated: false,
      allVisibleSelected: false,
      allExistingSelected: false,
      autoRefresh: this.autoRefreshEnabled,
      autoRefreshTimeout: void 0,
      filter: {},
      isDataLoading: false,
      requestItemsPerRequest: 10,
      selectedItems: {},
      stoppingExecutions: [],
      workflows: []
    };
  },
  mounted() {
    setPageTitle(`n8n - ${this.pageTitle}`);
    void this.handleAutoRefreshToggle();
    document.addEventListener("visibilitychange", this.onDocumentVisibilityChange);
  },
  async created() {
    await this.loadWorkflows();
    void this.$externalHooks().run("executionsList.openDialog");
    this.telemetry.track("User opened Executions log", {
      workflow_id: this.workflowsStore.workflowId
    });
  },
  beforeUnmount() {
    this.stopAutoRefreshInterval();
    document.removeEventListener("visibilitychange", this.onDocumentVisibilityChange);
  },
  computed: {
    ...mapStores(useUIStore, useWorkflowsStore),
    activeExecutions() {
      return this.workflowsStore.activeExecutions;
    },
    combinedExecutions() {
      const returnData = [];
      if (["all", "running"].includes(this.filter.status)) {
        returnData.push(...this.activeExecutions);
      }
      if (["all", "error", "success", "waiting"].includes(this.filter.status)) {
        returnData.push(...this.finishedExecutions);
      }
      return returnData.filter(
        (execution) => this.filter.workflowId === "all" || execution.workflowId === this.filter.workflowId
      );
    },
    numSelected() {
      if (this.allExistingSelected) {
        return this.finishedExecutionsCount;
      }
      return Object.keys(this.selectedItems).length;
    },
    workflowFilterCurrent() {
      const filter = {};
      if (this.filter.workflowId !== "all") {
        filter.workflowId = this.filter.workflowId;
      }
      return filter;
    },
    workflowFilterPast() {
      return executionFilterToQueryFilter(this.filter);
    },
    pageTitle() {
      return this.i18n.baseText("executionsList.workflowExecutions");
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeModal");
    },
    displayExecution(execution) {
      const route = this.$router.resolve({
        name: VIEWS.EXECUTION_PREVIEW,
        params: { name: execution.workflowId, executionId: execution.id }
      });
      window.open(route.href, "_blank");
    },
    async handleAutoRefreshToggle() {
      this.stopAutoRefreshInterval();
      void this.startAutoRefreshInterval();
    },
    handleCheckAllExistingChange() {
      this.allExistingSelected = !this.allExistingSelected;
      this.allVisibleSelected = !this.allExistingSelected;
      this.handleCheckAllVisibleChange();
    },
    handleCheckAllVisibleChange() {
      this.allVisibleSelected = !this.allVisibleSelected;
      if (!this.allVisibleSelected) {
        this.allExistingSelected = false;
        this.selectedItems = {};
      } else {
        this.selectAllVisibleExecutions();
      }
    },
    handleCheckboxChanged(executionId) {
      if (this.selectedItems[executionId]) {
        const { [executionId]: removedSelectedItem, ...remainingSelectedItems } = this.selectedItems;
        this.selectedItems = remainingSelectedItems;
      } else {
        this.selectedItems = {
          ...this.selectedItems,
          [executionId]: true
        };
      }
      this.allVisibleSelected = Object.keys(this.selectedItems).length === this.combinedExecutions.length;
      this.allExistingSelected = Object.keys(this.selectedItems).length === this.finishedExecutionsCount;
    },
    async handleDeleteSelected() {
      const deleteExecutions = await this.confirm(
        this.i18n.baseText("executionsList.confirmMessage.message", {
          interpolate: { numSelected: this.numSelected.toString() }
        }),
        this.i18n.baseText("executionsList.confirmMessage.headline"),
        {
          type: "warning",
          confirmButtonText: this.i18n.baseText("executionsList.confirmMessage.confirmButtonText"),
          cancelButtonText: this.i18n.baseText("executionsList.confirmMessage.cancelButtonText")
        }
      );
      if (deleteExecutions !== MODAL_CONFIRM) {
        return;
      }
      this.isDataLoading = true;
      const sendData = {};
      if (this.allExistingSelected) {
        sendData.deleteBefore = this.finishedExecutions[0].startedAt;
      } else {
        sendData.ids = Object.keys(this.selectedItems);
      }
      sendData.filters = this.workflowFilterPast;
      try {
        await this.workflowsStore.deleteExecutions(sendData);
      } catch (error) {
        this.isDataLoading = false;
        this.showError(
          error,
          this.i18n.baseText("executionsList.showError.handleDeleteSelected.title")
        );
        return;
      }
      this.isDataLoading = false;
      this.showMessage({
        title: this.i18n.baseText("executionsList.showMessage.handleDeleteSelected.title"),
        type: "success"
      });
      this.handleClearSelection();
      await this.refreshData();
    },
    handleClearSelection() {
      this.allVisibleSelected = false;
      this.allExistingSelected = false;
      this.selectedItems = {};
    },
    async onFilterChanged(filter) {
      this.filter = filter;
      await this.refreshData();
      this.handleClearSelection();
      this.isMounting = false;
    },
    async handleActionItemClick(commandData) {
      if (["currentlySaved", "original"].includes(commandData.command)) {
        let loadWorkflow = false;
        if (commandData.command === "currentlySaved") {
          loadWorkflow = true;
        }
        await this.retryExecution(commandData.execution, loadWorkflow);
        this.telemetry.track("User clicked retry execution button", {
          workflow_id: this.workflowsStore.workflowId,
          execution_id: commandData.execution.id,
          retry_type: loadWorkflow ? "current" : "original"
        });
      }
      if (commandData.command === "delete") {
        await this.deleteExecution(commandData.execution);
      }
    },
    getWorkflowName(workflowId) {
      var _a;
      return (_a = this.workflows.find((data) => data.id === workflowId)) == null ? void 0 : _a.name;
    },
    async loadActiveExecutions() {
      const activeExecutions = isEmpty(this.workflowFilterCurrent.metadata) ? await this.workflowsStore.getCurrentExecutions(this.workflowFilterCurrent) : [];
      for (const activeExecution of activeExecutions) {
        if (activeExecution.workflowId && !activeExecution.workflowName) {
          activeExecution.workflowName = this.getWorkflowName(activeExecution.workflowId);
        }
      }
      this.workflowsStore.activeExecutions = activeExecutions;
      this.workflowsStore.addToCurrentExecutions(activeExecutions);
    },
    async loadAutoRefresh() {
      const filter = this.workflowFilterPast;
      const promises = [this.workflowsStore.getPastExecutions(filter, this.requestItemsPerRequest)];
      if (isEmpty(filter.metadata)) {
        promises.push(this.workflowsStore.getCurrentExecutions({}));
      }
      const results = await Promise.all(promises);
      for (const activeExecution of results[1]) {
        if (activeExecution.workflowId !== void 0 && activeExecution.workflowName === void 0) {
          activeExecution.workflowName = this.getWorkflowName(activeExecution.workflowId);
        }
      }
      this.workflowsStore.activeExecutions = results[1];
      const alreadyPresentExecutions = [...this.finishedExecutions];
      const alreadyPresentExecutionIds = alreadyPresentExecutions.map(
        (exec) => parseInt(exec.id, 10)
      );
      let lastId = 0;
      const gaps = [];
      const pastExecutions = results[0] || { results: [], count: 0, estimated: false };
      for (let i = pastExecutions.results.length - 1; i >= 0; i--) {
        const currentItem = pastExecutions.results[i];
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
          if (alreadyPresentExecutions[executionIndex].finished === false && currentItem.finished === true) {
            alreadyPresentExecutions[executionIndex] = currentItem;
          }
          continue;
        }
        let j;
        for (j = alreadyPresentExecutions.length - 1; j >= 0; j--) {
          if (currentId < parseInt(alreadyPresentExecutions[j].id, 10)) {
            alreadyPresentExecutions.splice(j + 1, 0, currentItem);
            break;
          }
        }
        if (j === -1) {
          alreadyPresentExecutions.unshift(currentItem);
        }
      }
      const alreadyPresentExecutionsFiltered = alreadyPresentExecutions.filter(
        (execution) => !gaps.includes(parseInt(execution.id, 10)) && lastId >= parseInt(execution.id, 10)
      );
      this.finishedExecutionsCount = pastExecutions.count;
      this.finishedExecutionsCountEstimated = pastExecutions.estimated;
      this.finishedExecutions = alreadyPresentExecutionsFiltered;
      this.workflowsStore.addToCurrentExecutions(alreadyPresentExecutionsFiltered);
      this.adjustSelectionAfterMoreItemsLoaded();
    },
    async loadFinishedExecutions() {
      if (this.filter.status === "running") {
        this.finishedExecutions = [];
        this.finishedExecutionsCount = 0;
        this.finishedExecutionsCountEstimated = false;
        return;
      }
      const data = await this.workflowsStore.getPastExecutions(
        this.workflowFilterPast,
        this.requestItemsPerRequest
      );
      this.finishedExecutions = data.results;
      this.finishedExecutionsCount = data.count;
      this.finishedExecutionsCountEstimated = data.estimated;
      this.workflowsStore.addToCurrentExecutions(data.results);
      if (this.finishedExecutions.length === 0) {
        this.handleClearSelection();
      }
    },
    async loadMore() {
      if (this.filter.status === "running") {
        return;
      }
      this.isDataLoading = true;
      const filter = this.workflowFilterPast;
      let lastId;
      if (this.finishedExecutions.length !== 0) {
        const lastItem = this.finishedExecutions.slice(-1)[0];
        lastId = lastItem.id;
      }
      let data;
      try {
        data = await this.workflowsStore.getPastExecutions(
          filter,
          this.requestItemsPerRequest,
          lastId
        );
      } catch (error) {
        this.isDataLoading = false;
        this.showError(error, this.i18n.baseText("executionsList.showError.loadMore.title"));
        return;
      }
      data.results = data.results.map((execution) => {
        return { ...execution, mode: execution.mode };
      });
      this.finishedExecutions.push(...data.results);
      this.finishedExecutionsCount = data.count;
      this.finishedExecutionsCountEstimated = data.estimated;
      this.isDataLoading = false;
      this.workflowsStore.addToCurrentExecutions(data.results);
      this.adjustSelectionAfterMoreItemsLoaded();
    },
    async loadWorkflows() {
      try {
        const workflows = await this.workflowsStore.fetchAllWorkflows();
        workflows.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        workflows.unshift({
          id: "all",
          name: this.i18n.baseText("executionsList.allWorkflows")
        });
        this.workflows = workflows;
      } catch (error) {
        this.showError(error, this.i18n.baseText("executionsList.showError.loadWorkflows.title"));
      }
    },
    async retryExecution(execution, loadWorkflow) {
      this.isDataLoading = true;
      try {
        const retrySuccessful = await this.workflowsStore.retryExecution(
          execution.id,
          loadWorkflow
        );
        if (retrySuccessful) {
          this.showMessage({
            title: this.i18n.baseText("executionsList.showMessage.retrySuccessfulTrue.title"),
            type: "success"
          });
        } else {
          this.showMessage({
            title: this.i18n.baseText("executionsList.showMessage.retrySuccessfulFalse.title"),
            type: "error"
          });
        }
        this.isDataLoading = false;
      } catch (error) {
        this.showError(error, this.i18n.baseText("executionsList.showError.retryExecution.title"));
        this.isDataLoading = false;
      }
    },
    async refreshData() {
      this.isDataLoading = true;
      try {
        await Promise.all([this.loadActiveExecutions(), this.loadFinishedExecutions()]);
      } catch (error) {
        this.showError(error, this.i18n.baseText("executionsList.showError.refreshData.title"));
      }
      this.isDataLoading = false;
    },
    getStatus(execution) {
      if (execution.status) {
        return execution.status;
      } else {
        let status2 = "unknown";
        if (execution.waitTill) {
          status2 = "waiting";
        } else if (execution.stoppedAt === void 0) {
          status2 = "running";
        } else if (execution.finished) {
          status2 = "success";
        } else if (execution.stoppedAt !== null) {
          status2 = "failed";
        } else {
          status2 = "unknown";
        }
        return status2;
      }
    },
    getRowClass(execution) {
      return [this.$style.execRow, this.$style[this.getStatus(execution)]].join(" ");
    },
    getStatusText(entry) {
      const status2 = this.getStatus(entry);
      let text = "";
      if (status2 === "waiting") {
        text = this.i18n.baseText("executionsList.waiting");
      } else if (status2 === "canceled") {
        text = this.i18n.baseText("executionsList.canceled");
      } else if (status2 === "crashed") {
        text = this.i18n.baseText("executionsList.error");
      } else if (status2 === "new") {
        text = this.i18n.baseText("executionsList.running");
      } else if (status2 === "running") {
        text = this.i18n.baseText("executionsList.running");
      } else if (status2 === "success") {
        text = this.i18n.baseText("executionsList.succeeded");
      } else if (status2 === "failed") {
        text = this.i18n.baseText("executionsList.error");
      } else {
        text = this.i18n.baseText("executionsList.unknown");
      }
      return text;
    },
    getStatusTextTranslationPath(entry) {
      const status2 = this.getStatus(entry);
      let path = "";
      if (status2 === "waiting") {
        path = "executionsList.statusWaiting";
      } else if (status2 === "canceled") {
        path = "executionsList.statusCanceled";
      } else if (["crashed", "failed", "success"].includes(status2)) {
        if (!entry.stoppedAt) {
          path = "executionsList.statusTextWithoutTime";
        } else {
          path = "executionsList.statusText";
        }
      } else if (status2 === "new") {
        path = "executionsList.statusRunning";
      } else if (status2 === "running") {
        path = "executionsList.statusRunning";
      } else {
        path = "executionsList.statusUnknown";
      }
      return path;
    },
    getStatusTooltipText(entry) {
      const status2 = this.getStatus(entry);
      let text = "";
      if (status2 === "waiting" && this.isWaitTillIndefinite(entry)) {
        text = this.i18n.baseText(
          "executionsList.statusTooltipText.theWorkflowIsWaitingIndefinitely"
        );
      }
      return text;
    },
    async stopExecution(activeExecutionId) {
      try {
        this.stoppingExecutions.push(activeExecutionId);
        await this.workflowsStore.stopCurrentExecution(activeExecutionId);
        const index = this.stoppingExecutions.indexOf(activeExecutionId);
        this.stoppingExecutions.splice(index, 1);
        this.showMessage({
          title: this.i18n.baseText("executionsList.showMessage.stopExecution.title"),
          message: this.i18n.baseText("executionsList.showMessage.stopExecution.message", {
            interpolate: { activeExecutionId }
          }),
          type: "success"
        });
        await this.refreshData();
      } catch (error) {
        this.showError(error, this.i18n.baseText("executionsList.showError.stopExecution.title"));
      }
    },
    isExecutionRetriable(execution) {
      return execution.stoppedAt !== void 0 && !execution.finished && execution.retryOf === void 0 && execution.retrySuccessId === void 0 && !execution.waitTill;
    },
    async deleteExecution(execution) {
      this.isDataLoading = true;
      try {
        await this.workflowsStore.deleteExecutions({ ids: [execution.id] });
        await this.refreshData();
        if (this.allVisibleSelected) {
          this.selectedItems = {};
          this.selectAllVisibleExecutions();
        }
      } catch (error) {
        this.showError(
          error,
          this.i18n.baseText("executionsList.showError.handleDeleteSelected.title")
        );
      }
      this.isDataLoading = true;
    },
    isWaitTillIndefinite(execution) {
      if (!execution.waitTill) {
        return false;
      }
      return new Date(execution.waitTill).toISOString() === WAIT_TIME_UNLIMITED;
    },
    isRunning(execution) {
      return this.getStatus(execution) === "running";
    },
    selectAllVisibleExecutions() {
      this.combinedExecutions.forEach((execution) => {
        this.selectedItems = { ...this.selectedItems, [execution.id]: true };
      });
    },
    adjustSelectionAfterMoreItemsLoaded() {
      if (this.allExistingSelected) {
        this.allVisibleSelected = true;
        this.selectAllVisibleExecutions();
      }
    },
    async startAutoRefreshInterval() {
      if (this.autoRefresh) {
        await this.loadAutoRefresh();
        this.autoRefreshTimeout = setTimeout(() => {
          void this.startAutoRefreshInterval();
        }, 4 * 1e3);
      }
    },
    stopAutoRefreshInterval() {
      if (this.autoRefreshTimeout) {
        clearTimeout(this.autoRefreshTimeout);
        this.autoRefreshTimeout = void 0;
      }
    },
    onDocumentVisibilityChange() {
      if (document.visibilityState === "hidden") {
        this.stopAutoRefreshInterval();
      } else {
        void this.startAutoRefreshInterval();
      }
    }
  }
});
const execListWrapper = "_execListWrapper_1h4m6_5";
const execList = "_execList_1h4m6_5";
const execListHeader = "_execListHeader_1h4m6_26";
const execListHeaderControls = "_execListHeaderControls_1h4m6_33";
const selectionOptions = "_selectionOptions_1h4m6_39";
const statusColumn = "_statusColumn_1h4m6_57";
const spinner = "_spinner_1h4m6_62";
const status = "_status_1h4m6_57";
const crashed = "_crashed_1h4m6_72";
const failed = "_failed_1h4m6_72";
const waiting = "_waiting_1h4m6_75";
const success = "_success_1h4m6_78";
const running = "_running_1h4m6_81";
const unknown = "_unknown_1h4m6_84";
const buttonCell = "_buttonCell_1h4m6_88";
const execRow = "_execRow_1h4m6_95";
const execTable = "_execTable_1h4m6_99";
const loadMore = "_loadMore_1h4m6_182";
const loadedAll = "_loadedAll_1h4m6_188";
const actions = "_actions_1h4m6_195";
const deleteOnly = "_deleteOnly_1h4m6_195";
const retryAction = "_retryAction_1h4m6_199";
const deleteAction = "_deleteAction_1h4m6_199";
const selectAll = "_selectAll_1h4m6_203";
const filterLoader = "_filterLoader_1h4m6_209";
const tableLoader = "_tableLoader_1h4m6_214";
const link = "_link_1h4m6_220";
const style0 = {
  execListWrapper,
  execList,
  execListHeader,
  execListHeaderControls,
  selectionOptions,
  statusColumn,
  spinner,
  status,
  crashed,
  failed,
  waiting,
  success,
  "new": "_new_1h4m6_81",
  running,
  unknown,
  buttonCell,
  execRow,
  execTable,
  loadMore,
  loadedAll,
  actions,
  deleteOnly,
  retryAction,
  deleteAction,
  selectAll,
  filterLoader,
  tableLoader,
  link
};
const _hoisted_1 = { key: 1 };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("th", null, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("th", null, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("th", null, null, -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("th", null, null, -1);
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { key: 0 };
const _hoisted_10 = { key: 1 };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_12 = { key: 2 };
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_14 = { class: "retry-button" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_execution_filter = resolveComponent("execution-filter");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_execution_time = resolveComponent("execution-time");
  const _component_i18n_t = resolveComponent("i18n-t");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.execListWrapper)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.execList)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.execListHeader)
      }, [
        createVNode(_component_n8n_heading, {
          tag: "h1",
          size: "2xlarge"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(this.pageTitle), 1)
          ]),
          _: 1
        }),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.execListHeaderControls)
        }, [
          _ctx.isMounting ? (openBlock(), createBlock(_component_n8n_loading, {
            key: 0,
            class: normalizeClass(_ctx.$style.filterLoader),
            variant: "custom"
          }, null, 8, ["class"])) : (openBlock(), createBlock(_component_el_checkbox, {
            key: 1,
            class: "mr-xl",
            modelValue: _ctx.autoRefresh,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => _ctx.autoRefresh = $event),
              _ctx.handleAutoRefreshToggle
            ],
            "data-test-id": "execution-auto-refresh-checkbox"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.i18n.baseText("executionsList.autoRefresh")), 1)
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"])),
          withDirectives(createVNode(_component_execution_filter, {
            workflows: _ctx.workflows,
            onFilterChanged: _ctx.onFilterChanged
          }, null, 8, ["workflows", "onFilterChanged"]), [
            [vShow, !_ctx.isMounting]
          ])
        ], 2)
      ], 2),
      _ctx.allVisibleSelected && _ctx.finishedExecutionsCount > 0 ? (openBlock(), createBlock(_component_el_checkbox, {
        key: 0,
        class: normalizeClass(_ctx.$style.selectAll),
        label: _ctx.i18n.baseText("executionsList.selectAll", {
          adjustToNumber: _ctx.finishedExecutionsCount,
          interpolate: { executionNum: _ctx.finishedExecutionsCount }
        }),
        modelValue: _ctx.allExistingSelected,
        "onUpdate:modelValue": _ctx.handleCheckAllExistingChange,
        "data-test-id": "select-all-executions-checkbox"
      }, null, 8, ["class", "label", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
      _ctx.isMounting ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n8n_loading, {
          class: normalizeClass(_ctx.$style.tableLoader),
          variant: "custom"
        }, null, 8, ["class"]),
        createVNode(_component_n8n_loading, {
          class: normalizeClass(_ctx.$style.tableLoader),
          variant: "custom"
        }, null, 8, ["class"]),
        createVNode(_component_n8n_loading, {
          class: normalizeClass(_ctx.$style.tableLoader),
          variant: "custom"
        }, null, 8, ["class"])
      ])) : (openBlock(), createElementBlock("table", {
        key: 2,
        class: normalizeClass(_ctx.$style.execTable)
      }, [
        createBaseVNode("thead", null, [
          createBaseVNode("tr", null, [
            createBaseVNode("th", null, [
              createVNode(_component_el_checkbox, {
                modelValue: _ctx.allVisibleSelected,
                "onUpdate:modelValue": _ctx.handleCheckAllVisibleChange,
                disabled: _ctx.finishedExecutionsCount < 1,
                label: "",
                "data-test-id": "select-visible-executions-checkbox"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
            ]),
            createBaseVNode("th", null, toDisplayString(_ctx.i18n.baseText("executionsList.name")), 1),
            createBaseVNode("th", null, toDisplayString(_ctx.i18n.baseText("executionsList.startedAt")), 1),
            createBaseVNode("th", null, toDisplayString(_ctx.i18n.baseText("executionsList.status")), 1),
            createBaseVNode("th", null, toDisplayString(_ctx.i18n.baseText("executionsList.id")), 1),
            _hoisted_2,
            _hoisted_3,
            _hoisted_4,
            _hoisted_5
          ])
        ]),
        createBaseVNode("tbody", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.combinedExecutions, (execution) => {
            return openBlock(), createElementBlock("tr", {
              key: execution.id,
              class: normalizeClass(_ctx.getRowClass(execution))
            }, [
              createBaseVNode("td", null, [
                execution.stoppedAt !== void 0 && execution.id ? (openBlock(), createBlock(_component_el_checkbox, {
                  key: 0,
                  modelValue: _ctx.selectedItems[execution.id] || _ctx.allExistingSelected,
                  "onUpdate:modelValue": ($event) => _ctx.handleCheckboxChanged(execution.id),
                  label: "",
                  "data-test-id": "select-execution-checkbox"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("span", {
                  onClick: withModifiers(($event) => _ctx.displayExecution(execution), ["stop"])
                }, [
                  createBaseVNode("a", {
                    href: "#",
                    class: normalizeClass(_ctx.$style.link)
                  }, toDisplayString(execution.workflowName || _ctx.i18n.baseText("executionsList.unsavedWorkflow")), 3)
                ], 8, _hoisted_6)
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("span", null, toDisplayString(_ctx.formatDate(execution.startedAt)), 1)
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.statusColumn)
                }, [
                  _ctx.isRunning(execution) ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(_ctx.$style.spinner)
                  }, [
                    createVNode(_component_font_awesome_icon, {
                      icon: "spinner",
                      spin: ""
                    })
                  ], 2)) : createCommentVNode("", true),
                  !_ctx.isWaitTillIndefinite(execution) ? (openBlock(), createBlock(_component_i18n_t, {
                    key: 1,
                    tag: "span",
                    keypath: _ctx.getStatusTextTranslationPath(execution)
                  }, {
                    status: withCtx(() => [
                      createBaseVNode("span", {
                        class: normalizeClass(_ctx.$style.status)
                      }, toDisplayString(_ctx.getStatusText(execution)), 3)
                    ]),
                    time: withCtx(() => [
                      execution.waitTill ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(_ctx.formatDate(execution.waitTill)), 1)) : execution.stoppedAt !== null && execution.stoppedAt !== void 0 ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(_ctx.displayTimer(
                        new Date(execution.stoppedAt).getTime() - new Date(execution.startedAt).getTime(),
                        true
                      )), 1)) : (openBlock(), createBlock(_component_execution_time, {
                        key: 2,
                        "start-time": execution.startedAt
                      }, null, 8, ["start-time"]))
                    ]),
                    _: 2
                  }, 1032, ["keypath"])) : (openBlock(), createBlock(_component_n8n_tooltip, {
                    key: 2,
                    placement: "top"
                  }, {
                    content: withCtx(() => [
                      createBaseVNode("span", null, toDisplayString(_ctx.getStatusTooltipText(execution)), 1)
                    ]),
                    default: withCtx(() => [
                      createBaseVNode("span", {
                        class: normalizeClass(_ctx.$style.status)
                      }, toDisplayString(_ctx.getStatusText(execution)), 3)
                    ]),
                    _: 2
                  }, 1024))
                ], 2)
              ]),
              createBaseVNode("td", null, [
                execution.id ? (openBlock(), createElementBlock("span", _hoisted_9, "#" + toDisplayString(execution.id), 1)) : createCommentVNode("", true),
                execution.retryOf ? (openBlock(), createElementBlock("span", _hoisted_10, [
                  _hoisted_11,
                  createBaseVNode("small", null, " (" + toDisplayString(_ctx.i18n.baseText("executionsList.retryOf")) + " #" + toDisplayString(execution.retryOf) + ") ", 1)
                ])) : execution.retrySuccessId ? (openBlock(), createElementBlock("span", _hoisted_12, [
                  _hoisted_13,
                  createBaseVNode("small", null, " (" + toDisplayString(_ctx.i18n.baseText("executionsList.successRetry")) + " #" + toDisplayString(execution.retrySuccessId) + ") ", 1)
                ])) : createCommentVNode("", true)
              ]),
              createBaseVNode("td", null, [
                execution.mode === "manual" ? (openBlock(), createBlock(_component_n8n_tooltip, {
                  key: 0,
                  placement: "top"
                }, {
                  content: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(_ctx.i18n.baseText("executionsList.test")), 1)
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_font_awesome_icon, { icon: "flask" })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.buttonCell)
                }, [
                  execution.stoppedAt !== void 0 && execution.id ? (openBlock(), createBlock(_component_n8n_button, {
                    key: 0,
                    size: "small",
                    outline: "",
                    label: _ctx.i18n.baseText("executionsList.view"),
                    onClick: withModifiers(($event) => _ctx.displayExecution(execution), ["stop"])
                  }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
                ], 2)
              ]),
              createBaseVNode("td", null, [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.buttonCell)
                }, [
                  execution.stoppedAt === void 0 || execution.waitTill ? (openBlock(), createBlock(_component_n8n_button, {
                    key: 0,
                    size: "small",
                    outline: "",
                    label: _ctx.i18n.baseText("executionsList.stop"),
                    onClick: withModifiers(($event) => _ctx.stopExecution(execution.id), ["stop"]),
                    loading: _ctx.stoppingExecutions.includes(execution.id)
                  }, null, 8, ["label", "onClick", "loading"])) : createCommentVNode("", true)
                ], 2)
              ]),
              createBaseVNode("td", null, [
                !_ctx.isRunning(execution) ? (openBlock(), createBlock(_component_el_dropdown, {
                  key: 0,
                  trigger: "click",
                  onCommand: _ctx.handleActionItemClick
                }, {
                  dropdown: withCtx(() => [
                    createVNode(_component_el_dropdown_menu, {
                      class: normalizeClass({
                        [_ctx.$style.actions]: true,
                        [_ctx.$style.deleteOnly]: !_ctx.isExecutionRetriable(execution)
                      })
                    }, {
                      default: withCtx(() => [
                        _ctx.isExecutionRetriable(execution) ? (openBlock(), createBlock(_component_el_dropdown_item, {
                          key: 0,
                          class: normalizeClass(_ctx.$style.retryAction),
                          command: { command: "currentlySaved", execution }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.i18n.baseText("executionsList.retryWithCurrentlySavedWorkflow")), 1)
                          ]),
                          _: 2
                        }, 1032, ["class", "command"])) : createCommentVNode("", true),
                        _ctx.isExecutionRetriable(execution) ? (openBlock(), createBlock(_component_el_dropdown_item, {
                          key: 1,
                          class: normalizeClass(_ctx.$style.retryAction),
                          command: { command: "original", execution }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.i18n.baseText("executionsList.retryWithOriginalWorkflow")), 1)
                          ]),
                          _: 2
                        }, 1032, ["class", "command"])) : createCommentVNode("", true),
                        createVNode(_component_el_dropdown_item, {
                          class: normalizeClass(_ctx.$style.deleteAction),
                          command: { command: "delete", execution }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.i18n.baseText("generic.delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["class", "command"])
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  default: withCtx(() => [
                    createBaseVNode("span", _hoisted_14, [
                      createVNode(_component_n8n_icon_button, {
                        text: "",
                        type: "tertiary",
                        size: "mini",
                        title: _ctx.i18n.baseText("executionsList.retryExecution"),
                        icon: "ellipsis-v"
                      }, null, 8, ["title"])
                    ])
                  ]),
                  _: 2
                }, 1032, ["onCommand"])) : createCommentVNode("", true)
              ])
            ], 2);
          }), 128))
        ])
      ], 2)),
      !_ctx.combinedExecutions.length && !_ctx.isMounting && !_ctx.isDataLoading ? (openBlock(), createElementBlock("div", {
        key: 3,
        class: normalizeClass(_ctx.$style.loadedAll),
        "data-test-id": "execution-list-empty"
      }, toDisplayString(_ctx.i18n.baseText("executionsList.empty")), 3)) : _ctx.finishedExecutionsCount > _ctx.finishedExecutions.length || _ctx.finishedExecutionsCountEstimated ? (openBlock(), createElementBlock("div", {
        key: 4,
        class: normalizeClass(_ctx.$style.loadMore)
      }, [
        createVNode(_component_n8n_button, {
          icon: "sync",
          title: _ctx.i18n.baseText("executionsList.loadMore"),
          label: _ctx.i18n.baseText("executionsList.loadMore"),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.loadMore()),
          loading: _ctx.isDataLoading,
          "data-test-id": "load-more-button"
        }, null, 8, ["title", "label", "loading"])
      ], 2)) : !_ctx.isMounting && !_ctx.isDataLoading ? (openBlock(), createElementBlock("div", {
        key: 5,
        class: normalizeClass(_ctx.$style.loadedAll),
        "data-test-id": "execution-all-loaded"
      }, toDisplayString(_ctx.i18n.baseText("executionsList.loadedAll")), 3)) : createCommentVNode("", true)
    ], 2),
    _ctx.numSelected > 0 ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.selectionOptions),
      "data-test-id": "selected-executions-info"
    }, [
      createBaseVNode("span", null, toDisplayString(_ctx.i18n.baseText("executionsList.selected", {
        adjustToNumber: _ctx.numSelected,
        interpolate: { numSelected: _ctx.numSelected }
      })), 1),
      createVNode(_component_n8n_button, {
        label: _ctx.i18n.baseText("generic.delete"),
        type: "tertiary",
        onClick: _ctx.handleDeleteSelected,
        "data-test-id": "delete-selected-button"
      }, null, 8, ["label", "onClick"]),
      createVNode(_component_n8n_button, {
        label: _ctx.i18n.baseText("executionsList.clearSelection"),
        type: "tertiary",
        onClick: _ctx.handleClearSelection,
        "data-test-id": "clear-selection-button"
      }, null, 8, ["label", "onClick"])
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const ExecutionsList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules]]);
const _sfc_main = defineComponent({
  name: "ExecutionsView",
  components: {
    ExecutionsList
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ExecutionsList = resolveComponent("ExecutionsList");
  return openBlock(), createBlock(_component_ExecutionsList);
}
const ExecutionsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ExecutionsView as default
};
