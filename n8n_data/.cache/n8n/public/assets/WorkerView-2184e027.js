import { d as defineComponent, r as ref, h as resolveComponent, o as openBlock, k as createElementBlock, j as createBaseVNode, i as createVNode, f as withCtx, g as renderSlot, n as normalizeClass, q as createCommentVNode, b as createBlock, s as createTextVNode, t as toDisplayString, a3 as Fragment, ai as renderList, p as unref, c as computed, N as onMounted, M as onBeforeUnmount } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { e as externalHooks, g as genericHelpers } from "./index-00f166b0.js";
import { P as PushConnectionTracker } from "./PushConnectionTracker-dab23948.js";
import { e as executionHelpers } from "./executionsHelpers-fe945104.js";
import { _ as _export_sfc, am as useI18n, gg as useCopyToClipboard, u as useToast, g8 as setPageTitle, n as useUIStore, y as useSettingsStore } from "./n8n-8ddd8349.js";
import { u as useOrchestrationStore, W as WORKER_HISTORY_LENGTH, p as pushConnection } from "./pushConnection-1f69f62d.js";
import { C as Chart } from "./vue-chartjs-483b71fc.js";
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
function averageWorkerLoadFromLoads(loads) {
  return loads.reduce((prev, curr) => prev + curr, 0) / loads.length;
}
function averageWorkerLoadFromLoadsAsString(loads) {
  return averageWorkerLoadFromLoads(loads).toFixed(2);
}
function memAsGb(mem) {
  return mem / 1024 / 1024 / 1024;
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "WorkerAccordion.ee",
  props: {
    icon: {
      type: String,
      default: "tasks"
    },
    iconColor: {
      type: String,
      default: "black"
    },
    initialExpanded: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const expanded2 = ref(props.initialExpanded);
    function toggle() {
      expanded2.value = !expanded2.value;
    }
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_text = resolveComponent("n8n-text");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["accordion", _ctx.$style.container])
      }, [
        createBaseVNode("div", {
          class: normalizeClass({ [_ctx.$style.header]: true, [_ctx.$style.expanded]: expanded2.value }),
          onClick: toggle
        }, [
          createVNode(_component_n8n_icon, {
            icon: __props.icon,
            color: __props.iconColor,
            size: "small",
            class: "mr-2xs"
          }, null, 8, ["icon", "color"]),
          createVNode(_component_n8n_text, {
            class: normalizeClass(_ctx.$style.headerText),
            color: "text-base",
            size: "small",
            align: "left",
            bold: ""
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "title")
            ]),
            _: 3
          }, 8, ["class"]),
          createVNode(_component_n8n_icon, {
            icon: expanded2.value ? "chevron-up" : "chevron-down",
            bold: ""
          }, null, 8, ["icon"])
        ], 2),
        expanded2.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass({ [_ctx.$style.description]: true, [_ctx.$style.collapsed]: !expanded2.value })
        }, [
          renderSlot(_ctx.$slots, "content")
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const container$1 = "_container_jb2mu_5";
const header = "_header_jb2mu_9";
const headerText = "_headerText_jb2mu_15";
const expanded = "_expanded_jb2mu_19";
const description = "_description_jb2mu_23";
const style0$6 = {
  container: container$1,
  header,
  headerText,
  expanded,
  description
};
const cssModules$6 = {
  "$style": style0$6
};
const WorkerAccordion = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__cssModules", cssModules$6]]);
const _hoisted_1$3 = ["href"];
const _hoisted_2$1 = ["href"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "WorkerJobAccordion.ee",
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    function runningSince(started) {
      let seconds = Math.floor(((/* @__PURE__ */ new Date()).getTime() - started.getTime()) / 1e3);
      const hrs = Math.floor(seconds / 3600);
      seconds -= hrs * 3600;
      const mnts = Math.floor(seconds / 60);
      seconds -= mnts * 60;
      return `${hrs}h ${mnts}m ${Math.floor(seconds)}s`;
    }
    return (_ctx, _cache) => {
      const _component_n8n_text = resolveComponent("n8n-text");
      return openBlock(), createBlock(WorkerAccordion, {
        icon: "tasks",
        "icon-color": "black",
        "initial-expanded": true
      }, {
        title: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("workerList.item.jobListTitle")) + " (" + toDisplayString(_ctx.items.length) + ") ", 1)
        ]),
        content: withCtx(() => [
          props.items.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.accordionItems)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.executionId,
                class: normalizeClass(_ctx.$style.accordionItem)
              }, [
                createBaseVNode("a", {
                  href: "/workflow/" + item.workflowId + "/executions/" + item.executionId
                }, " Execution " + toDisplayString(item.executionId) + " - " + toDisplayString(item.workflowName), 9, _hoisted_1$3),
                createVNode(_component_n8n_text, {
                  color: "text-base",
                  size: "small",
                  align: "left"
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createTextVNode(" | Started at: " + toDisplayString((_a = new Date(item.startedAt)) == null ? void 0 : _a.toLocaleTimeString()) + " | Running for " + toDisplayString(runningSince(new Date(item.startedAt))) + " " + toDisplayString(item.retryOf ? `| Retry of: ${item.retryOf}` : "") + " | ", 1)
                    ];
                  }),
                  _: 2
                }, 1024),
                createBaseVNode("a", {
                  target: "_blank",
                  href: "/workflow/" + item.workflowId
                }, " (Open workflow)", 8, _hoisted_2$1)
              ], 2);
            }), 128))
          ], 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.$style.accordionItems)
          }, [
            createBaseVNode("span", {
              class: normalizeClass(_ctx.$style.empty)
            }, toDisplayString(_ctx.$locale.baseText("workerList.item.jobList.empty")), 3)
          ], 2))
        ]),
        _: 1
      });
    };
  }
});
const accordionItems$2 = "_accordionItems_lupqv_5";
const accordionItem$2 = "_accordionItem_lupqv_5";
const empty = "_empty_lupqv_18";
const style0$5 = {
  accordionItems: accordionItems$2,
  accordionItem: accordionItem$2,
  empty
};
const cssModules$5 = {
  "$style": style0$5
};
const WorkerJobAccordion = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__cssModules", cssModules$5]]);
const _hoisted_1$2 = ["onClick"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "WorkerNetAccordion.ee",
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    const i18n = useI18n();
    function copyToClipboard(content) {
      const copyToClipboardFn = useCopyToClipboard();
      const { showMessage } = useToast();
      try {
        copyToClipboardFn(content);
        showMessage({
          title: i18n.baseText("workerList.item.copyAddressToClipboard"),
          type: "success"
        });
      } catch {
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(WorkerAccordion, {
        icon: "tasks",
        "icon-color": "black",
        "initial-expanded": false
      }, {
        title: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("workerList.item.netListTitle")) + " (" + toDisplayString(_ctx.items.length) + ") ", 1)
        ]),
        content: withCtx(() => [
          props.items.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.accordionItems)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.address,
                class: normalizeClass(_ctx.$style.accordionItem),
                onClick: ($event) => copyToClipboard(item.address)
              }, [
                createTextVNode(toDisplayString(item.family) + ": ", 1),
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style.clickable)
                }, toDisplayString(item.address), 3),
                createTextVNode(" " + toDisplayString(item.internal ? "(internal)" : ""), 1)
              ], 10, _hoisted_1$2);
            }), 128))
          ], 2)) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
const accordionItems$1 = "_accordionItems_v7u0l_5";
const accordionItem$1 = "_accordionItem_v7u0l_5";
const clickable = "_clickable_v7u0l_19";
const style0$4 = {
  accordionItems: accordionItems$1,
  accordionItem: accordionItem$1,
  clickable
};
const cssModules$4 = {
  "$style": style0$4
};
const WorkerNetAccordion = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__cssModules", cssModules$4]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WorkerChartsAccordion.ee",
  props: {
    workerId: {}
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const blankDataSet = (label, color, prefill = 0) => ({
      datasets: [
        {
          label,
          backgroundColor: color,
          data: prefill ? Array(Math.min(WORKER_HISTORY_LENGTH, prefill)).fill(0) : []
        }
      ],
      labels: Array(Math.min(WORKER_HISTORY_LENGTH, prefill)).fill("")
    });
    const orchestrationStore = useOrchestrationStore();
    const chartRefJobs = ref(void 0);
    const chartRefCPU = ref(void 0);
    const chartRefMemory = ref(void 0);
    const optionsBase = () => ({
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          min: 0,
          suggestedMax: 5
        }
      }
      // uncomment to disable animation
      // animation: {
      // 	duration: 0,
      // },
    });
    const optionsJobs = optionsBase();
    const optionsCPU = optionsBase();
    if ((_a = optionsCPU.scales) == null ? void 0 : _a.y)
      optionsCPU.scales.y.suggestedMax = 100;
    const maxMemory = memAsGb((_b = orchestrationStore.workers[props.workerId]) == null ? void 0 : _b.totalMem) ?? 1;
    const optionsMemory = optionsBase();
    if ((_c = optionsMemory.scales) == null ? void 0 : _c.y)
      optionsMemory.scales.y.suggestedMax = maxMemory;
    const dataJobs = ref(
      blankDataSet("Job Count", "rgb(255, 111, 92)", WORKER_HISTORY_LENGTH)
    );
    const dataCPU = ref(
      blankDataSet("Processor Usage", "rgb(19, 205, 103)", WORKER_HISTORY_LENGTH)
    );
    const dataMemory = ref(
      blankDataSet("Memory Usage", "rgb(244, 216, 174)", WORKER_HISTORY_LENGTH)
    );
    orchestrationStore.$onAction(({ name, store }) => {
      var _a2, _b2;
      if (name === "updateWorkerStatus") {
        const prefillCount = WORKER_HISTORY_LENGTH - (((_a2 = store.workersHistory[props.workerId]) == null ? void 0 : _a2.length) ?? 0);
        const newDataJobs = blankDataSet("Job Count", "rgb(255, 111, 92)", prefillCount);
        const newDataCPU = blankDataSet(
          "Processor Usage",
          "rgb(19, 205, 103)",
          prefillCount
        );
        const newDataMemory = blankDataSet(
          "Memory Usage",
          "rgb(244, 216, 174)",
          prefillCount
        );
        (_b2 = store.workersHistory[props.workerId]) == null ? void 0 : _b2.forEach((item) => {
          var _a3;
          newDataJobs.datasets[0].data.push(item.data.runningJobsSummary.length);
          (_a3 = newDataJobs.labels) == null ? void 0 : _a3.push(new Date(item.timestamp).toLocaleTimeString());
          newDataCPU.datasets[0].data.push(averageWorkerLoadFromLoads(item.data.loadAvg));
          newDataCPU.labels = newDataJobs.labels;
          newDataMemory.datasets[0].data.push(maxMemory - memAsGb(item.data.freeMem));
          newDataMemory.labels = newDataJobs.labels;
        });
        dataJobs.value = newDataJobs;
        dataCPU.value = newDataCPU;
        dataMemory.value = newDataMemory;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(WorkerAccordion, {
        icon: "tasks",
        "icon-color": "black",
        "initial-expanded": false
      }, {
        title: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("workerList.item.chartsTitle")), 1)
        ]),
        content: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.charts)
          }, [
            createVNode(unref(Chart), {
              ref_key: "chartRefJobs",
              ref: chartRefJobs,
              type: "line",
              data: dataJobs.value,
              options: unref(optionsJobs),
              class: normalizeClass(_ctx.$style.chart)
            }, null, 8, ["data", "options", "class"]),
            createVNode(unref(Chart), {
              ref_key: "chartRefCPU",
              ref: chartRefCPU,
              type: "line",
              data: dataCPU.value,
              options: unref(optionsCPU),
              class: normalizeClass(_ctx.$style.chart)
            }, null, 8, ["data", "options", "class"]),
            createVNode(unref(Chart), {
              ref_key: "chartRefMemory",
              ref: chartRefMemory,
              type: "line",
              data: dataMemory.value,
              options: unref(optionsMemory),
              class: normalizeClass(_ctx.$style.chart)
            }, null, 8, ["data", "options", "class"])
          ], 2)
        ]),
        _: 1
      });
    };
  }
});
const accordionItems = "_accordionItems_1k0p0_5";
const accordionItem = "_accordionItem_1k0p0_5";
const charts = "_charts_1k0p0_18";
const chart = "_chart_1k0p0_18";
const style0$3 = {
  accordionItems,
  accordionItem,
  charts,
  chart
};
const cssModules$3 = {
  "$style": style0$3
};
const WorkerChartsAccordion = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$3]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WorkerCard.ee",
  props: {
    workerId: {}
  },
  setup(__props) {
    const props = __props;
    let interval;
    const orchestrationStore = useOrchestrationStore();
    const secondsSinceLastUpdateString = ref("0");
    const stale2 = ref(false);
    const worker = computed(() => {
      return orchestrationStore.getWorkerStatus(props.workerId);
    });
    const sortedWorkerInterfaces = computed(
      () => {
        var _a;
        return ((_a = worker.value) == null ? void 0 : _a.interfaces.toSorted((a, b) => a.family.localeCompare(b.family))) ?? [];
      }
    );
    function upTime(seconds) {
      const days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      const hrs = Math.floor(seconds / 3600);
      seconds -= hrs * 3600;
      const mnts = Math.floor(seconds / 60);
      seconds -= mnts * 60;
      return `${days}d ${hrs}h ${mnts}m ${Math.floor(seconds)}s`;
    }
    onMounted(() => {
      interval = setInterval(() => {
        const lastUpdated = orchestrationStore.getWorkerLastUpdated(props.workerId);
        if (!lastUpdated) {
          return;
        }
        const secondsSinceLastUpdate = Math.ceil((Date.now() - lastUpdated) / 1e3);
        stale2.value = secondsSinceLastUpdate > 10;
        secondsSinceLastUpdateString.value = secondsSinceLastUpdate.toFixed(0);
      }, 500);
    });
    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_card = resolveComponent("n8n-card");
      return worker.value ? (openBlock(), createBlock(_component_n8n_card, {
        key: 0,
        class: normalizeClass(_ctx.$style.cardLink)
      }, {
        header: withCtx(() => [
          createVNode(_component_n8n_heading, {
            tag: "h2",
            bold: "",
            class: normalizeClass(stale2.value ? [_ctx.$style.cardHeading, _ctx.$style.stale] : [_ctx.$style.cardHeading]),
            "data-test-id": "worker-card-name"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(worker.value.workerId) + " (" + toDisplayString(worker.value.hostname) + ") | Average Load: " + toDisplayString(unref(averageWorkerLoadFromLoadsAsString)(worker.value.loadAvg ?? [0])) + " | Free Memory: " + toDisplayString(unref(memAsGb)(worker.value.freeMem).toFixed(2)) + "GB / " + toDisplayString(unref(memAsGb)(worker.value.totalMem).toFixed(2)) + "GB " + toDisplayString(stale2.value ? " (stale)" : ""), 1)
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        append: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardActions),
            ref: "cardActions"
          }, null, 2)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardDescription)
          }, [
            createVNode(_component_n8n_text, {
              color: "text-light",
              size: "small",
              class: normalizeClass(_ctx.$style.container)
            }, {
              default: withCtx(() => [
                createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("workerList.item.lastUpdated")) + " " + toDisplayString(secondsSinceLastUpdateString.value) + "s ago | Architecture: " + toDisplayString(worker.value.arch) + " | Platform: " + toDisplayString(worker.value.platform) + " | n8n-Version: " + toDisplayString(worker.value.version) + " | Uptime: " + toDisplayString(upTime(worker.value.uptime)), 1),
                createVNode(WorkerJobAccordion, {
                  items: worker.value.runningJobsSummary
                }, null, 8, ["items"]),
                createVNode(WorkerNetAccordion, { items: sortedWorkerInterfaces.value }, null, 8, ["items"]),
                createVNode(WorkerChartsAccordion, {
                  "worker-id": worker.value.workerId
                }, null, 8, ["worker-id"])
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ]),
        _: 1
      }, 8, ["class"])) : createCommentVNode("", true);
    };
  }
});
const container = "_container_124hj_5";
const cardLink = "_cardLink_124hj_9";
const cardHeading = "_cardHeading_124hj_19";
const stale = "_stale_124hj_25";
const cardDescription = "_cardDescription_124hj_29";
const cardActions = "_cardActions_124hj_36";
const style0$2 = {
  container,
  cardLink,
  cardHeading,
  stale,
  cardDescription,
  cardActions
};
const cssModules$2 = {
  "$style": style0$2
};
const WorkerCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _sfc_main$1 = defineComponent({
  name: "WorkerList",
  mixins: [pushConnection, externalHooks, genericHelpers, executionHelpers],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/naming-convention
  components: { PushConnectionTracker, WorkerCard },
  props: {
    autoRefreshEnabled: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const i18n = useI18n();
    return {
      i18n,
      ...useToast()
    };
  },
  data() {
    return {
      isMounting: true
    };
  },
  mounted() {
    setPageTitle(`n8n - ${this.pageTitle}`);
    this.isMounting = false;
  },
  beforeMount() {
    if (window.Cypress !== void 0) {
      return;
    }
    this.pushConnect();
    this.orchestrationManagerStore.startWorkerStatusPolling();
  },
  beforeUnmount() {
    if (window.Cypress !== void 0) {
      return;
    }
    this.orchestrationManagerStore.stopWorkerStatusPolling();
    this.pushDisconnect();
  },
  computed: {
    ...mapStores(useUIStore, useOrchestrationStore),
    combinedWorkers() {
      const returnData = [];
      for (const workerId in this.orchestrationManagerStore.workers) {
        returnData.push(this.orchestrationManagerStore.workers[workerId]);
      }
      return returnData;
    },
    workerIds() {
      return Object.keys(this.orchestrationManagerStore.workers);
    },
    pageTitle() {
      return this.i18n.baseText("workerList.pageTitle");
    }
  },
  methods: {
    averageLoadAvg(loads) {
      return (loads.reduce((prev, curr) => prev + curr, 0) / loads.length).toFixed(2);
    },
    getStatus(payload) {
      if (payload.runningJobsSummary.length > 0) {
        return "running";
      } else {
        return "success";
      }
    },
    getRowClass(payload) {
      return [this.$style.execRow, this.$style[this.getStatus(payload)]].join(" ");
    }
  }
});
const workerListHeader = "_workerListHeader_q7mrl_5";
const card = "_card_q7mrl_12";
const tableLoader = "_tableLoader_q7mrl_16";
const style0$1 = {
  workerListHeader,
  card,
  tableLoader
};
const _hoisted_1$1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PushConnectionTracker = resolveComponent("PushConnectionTracker");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_WorkerCard = resolveComponent("WorkerCard");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_PushConnectionTracker, { class: "actions" }),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.workerListHeader)
    }, [
      createVNode(_component_n8n_heading, {
        tag: "h1",
        size: "2xlarge"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.pageTitle), 1)
        ]),
        _: 1
      })
    ], 2),
    _ctx.isMounting ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(_component_n8n_loading, {
        class: normalizeClass(_ctx.$style.tableLoader),
        variant: "custom"
      }, null, 8, ["class"])
    ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
      _ctx.workerIds.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(_ctx.$locale.baseText("workerList.empty")), 1)) : (openBlock(), createElementBlock("div", _hoisted_4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.workerIds, (workerId) => {
          return openBlock(), createElementBlock("div", {
            key: workerId,
            class: normalizeClass(_ctx.$style.card)
          }, [
            createVNode(_component_WorkerCard, {
              workerId,
              "data-test-id": "worker-card"
            }, null, 8, ["workerId"])
          ], 2);
        }), 128))
      ]))
    ]))
  ]);
}
const cssModules$1 = {
  "$style": style0$1
};
const WorkerList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__cssModules", cssModules$1]]);
const _hoisted_1 = ["href"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkerView",
  setup(__props) {
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const goToUpgrade = () => {
      void uiStore.goToUpgrade("source-control", "upgrade-source-control");
    };
    return (_ctx, _cache) => {
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.workerListWrapper)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.workerList)
        }, [
          unref(settingsStore).isQueueModeEnabled && unref(settingsStore).isWorkerViewAvailable ? (openBlock(), createBlock(WorkerList, {
            key: 0,
            "data-test-id": "worker-view-licensed"
          })) : (openBlock(), createBlock(_component_n8n_action_box, {
            key: 1,
            "data-test-id": "worker-view-unlicensed",
            class: normalizeClass(_ctx.$style.actionBox),
            description: _ctx.$locale.baseText("workerList.actionBox.description"),
            buttonText: _ctx.$locale.baseText("workerList.actionBox.buttonText"),
            "onClick:button": goToUpgrade
          }, {
            heading: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("workerList.actionBox.title")), 1)
            ]),
            description: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("workerList.actionBox.description")) + " ", 1),
              createBaseVNode("a", {
                href: _ctx.$locale.baseText("workerList.docs.url"),
                target: "_blank"
              }, toDisplayString(_ctx.$locale.baseText("workerList.actionBox.description.link")), 9, _hoisted_1)
            ]),
            _: 1
          }, 8, ["class", "description", "buttonText"]))
        ], 2)
      ], 2);
    };
  }
});
const workerListWrapper = "_workerListWrapper_1lurr_5";
const workerList = "_workerList_1lurr_5";
const actionBox = "_actionBox_1lurr_26";
const style0 = {
  workerListWrapper,
  workerList,
  actionBox
};
const cssModules = {
  "$style": style0
};
const WorkerView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkerView as default
};
