import { d as defineComponent, r as ref, c as computed, N as onMounted, h as resolveComponent, o as openBlock, k as createElementBlock, g as renderSlot, j as createBaseVNode, t as toDisplayString, i as createVNode, f as withCtx, s as createTextVNode, b as createBlock, p as unref, q as createCommentVNode, n as normalizeClass, af as withModifiers, a3 as Fragment, ai as renderList, aL as useRoute, aD as useRouter, K as onBeforeMount, x as watchEffect, a7 as h } from "./vendor-fd4bd18c.js";
import { C as dateformat, am as useI18n, _ as _export_sfc, gp as get, x as useRootStore, y as useSettingsStore, H as useWorkflowsStore, gq as getNewWorkflow, u as useToast, n as useUIStore, B as VIEWS, dB as WORKFLOW_HISTORY_VERSION_RESTORE } from "./n8n-8ddd8349.js";
import { W as WorkflowPreview } from "./WorkflowPreview-124dbe98.js";
import { d as defineStore } from "./pinia-282957dc.js";
import { F as FileSaver_minExports } from "./file-saver-ccbe3603.js";
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
const _hoisted_1$2 = ["datetime"];
const _hoisted_2$2 = ["value"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowHistoryListItem",
  props: {
    item: {},
    index: {},
    actions: {},
    isActive: { type: Boolean }
  },
  emits: ["action", "preview", "mounted"],
  setup(__props, { emit }) {
    const props = __props;
    const i18n = useI18n();
    const actionsVisible2 = ref(false);
    const itemElement = ref(null);
    const authorElement = ref(null);
    const isAuthorElementTruncated = ref(false);
    const formattedCreatedAt = computed(() => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
      const [date, time] = dateformat(
        props.item.createdAt,
        `${props.item.createdAt.startsWith(currentYear) ? "" : "yyyy "}mmm d"#"HH:MM:ss`
      ).split("#");
      return i18n.baseText("workflowHistory.item.createdAt", { interpolate: { date, time } });
    });
    const authors = computed(() => {
      const allAuthors = props.item.authors.split(", ");
      let label2 = allAuthors[0];
      if (allAuthors.length > 1) {
        label2 = `${label2} + ${allAuthors.length - 1}`;
      }
      return {
        size: allAuthors.length,
        label: label2
      };
    });
    const idLabel = computed(
      () => i18n.baseText("workflowHistory.item.id", { interpolate: { id: props.item.versionId } })
    );
    const onAction = (action) => {
      emit("action", {
        action,
        id: props.item.versionId,
        data: { formattedCreatedAt: formattedCreatedAt.value }
      });
    };
    const onVisibleChange = (visible) => {
      actionsVisible2.value = visible;
    };
    const onItemClick = (event) => {
      emit("preview", { event, id: props.item.versionId });
    };
    onMounted(() => {
      var _a, _b, _c;
      emit("mounted", {
        index: props.index,
        offsetTop: ((_a = itemElement.value) == null ? void 0 : _a.offsetTop) ?? 0,
        isActive: props.isActive
      });
      isAuthorElementTruncated.value = ((_b = authorElement.value) == null ? void 0 : _b.scrollWidth) > ((_c = authorElement.value) == null ? void 0 : _c.clientWidth);
    });
    return (_ctx, _cache) => {
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_badge = resolveComponent("n8n-badge");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      return openBlock(), createElementBlock("li", {
        ref_key: "itemElement",
        ref: itemElement,
        "data-test-id": "workflow-history-list-item",
        class: normalizeClass({
          [_ctx.$style.item]: true,
          [_ctx.$style.active]: props.isActive,
          [_ctx.$style.actionsVisible]: actionsVisible2.value
        })
      }, [
        renderSlot(_ctx.$slots, "default", { formattedCreatedAt: formattedCreatedAt.value }, () => [
          createBaseVNode("p", { onClick: onItemClick }, [
            createBaseVNode("time", {
              datetime: _ctx.item.createdAt
            }, toDisplayString(formattedCreatedAt.value), 9, _hoisted_1$2),
            createVNode(_component_n8n_tooltip, {
              placement: "right-end",
              disabled: authors.value.size < 2 && !isAuthorElementTruncated.value
            }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(props.item.authors), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("span", {
                  ref_key: "authorElement",
                  ref: authorElement
                }, toDisplayString(authors.value.label), 513)
              ]),
              _: 1
            }, 8, ["disabled"]),
            createBaseVNode("data", {
              value: _ctx.item.versionId
            }, toDisplayString(idLabel.value), 9, _hoisted_2$2)
          ])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.tail)
        }, [
          props.index === 0 ? (openBlock(), createBlock(_component_n8n_badge, { key: 0 }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("workflowHistory.item.latest")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_n8n_action_toggle, {
            theme: "dark",
            class: normalizeClass(_ctx.$style.actions),
            actions: props.actions,
            placement: "bottom-end",
            onAction,
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"])),
            onVisibleChange
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "action-toggle-button")
            ]),
            _: 3
          }, 8, ["class", "actions"])
        ], 2)
      ], 2);
    };
  }
});
const item = "_item_1bawd_5";
const tail = "_tail_1bawd_37";
const active = "_active_1bawd_42";
const actionsVisible = "_actionsVisible_1bawd_49";
const actions = "_actions_1bawd_49";
const style0$3 = {
  item,
  tail,
  active,
  actionsVisible,
  actions
};
const cssModules$3 = {
  "$style": style0$3
};
const WorkflowHistoryListItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$3]]);
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
const _hoisted_2$1 = ["aria-label"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowHistoryList",
  props: {
    items: {},
    activeItem: {},
    actions: {},
    requestNumberOfItems: {},
    lastReceivedItemsLength: {},
    evaluatedPruneTime: {},
    shouldUpgrade: { type: Boolean },
    isListLoading: { type: Boolean }
  },
  emits: ["action", "preview", "loadMore", "upgrade"],
  setup(__props, { emit }) {
    const props = __props;
    const i18n = useI18n();
    const listElement = ref(null);
    const shouldAutoScroll = ref(true);
    const observer = ref(null);
    const getActions = (index) => index === 0 ? props.actions.filter((action) => action.value !== "restore") : props.actions;
    const observeElement = (element) => {
      observer.value = new IntersectionObserver(
        ([entry]) => {
          var _a, _b;
          if (entry.isIntersecting) {
            (_a = observer.value) == null ? void 0 : _a.unobserve(element);
            (_b = observer.value) == null ? void 0 : _b.disconnect();
            observer.value = null;
            emit("loadMore", { take: props.requestNumberOfItems, skip: props.items.length });
          }
        },
        {
          root: listElement.value,
          threshold: 0.01
        }
      );
      observer.value.observe(element);
    };
    const onAction = ({
      action,
      id,
      data
    }) => {
      shouldAutoScroll.value = false;
      emit("action", { action, id, data });
    };
    const onPreview = ({ event, id }) => {
      shouldAutoScroll.value = false;
      emit("preview", { event, id });
    };
    const onItemMounted = ({
      index,
      offsetTop,
      isActive
    }) => {
      var _a, _b;
      if (isActive && shouldAutoScroll.value) {
        shouldAutoScroll.value = false;
        (_a = listElement.value) == null ? void 0 : _a.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
      if (index === props.items.length - 1 && props.lastReceivedItemsLength === props.requestNumberOfItems) {
        observeElement((_b = listElement.value) == null ? void 0 : _b.children[index]);
      }
    };
    return (_ctx, _cache) => {
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_i18n_t = resolveComponent("i18n-t");
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass(_ctx.$style.list),
        ref_key: "listElement",
        ref: listElement,
        "data-test-id": "workflow-history-list"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(props.items, (item2, index) => {
          var _a;
          return openBlock(), createBlock(WorkflowHistoryListItem, {
            key: item2.versionId,
            index,
            item: item2,
            isActive: item2.versionId === ((_a = props.activeItem) == null ? void 0 : _a.versionId),
            actions: getActions(index),
            onAction,
            onPreview,
            onMounted: onItemMounted
          }, null, 8, ["index", "item", "isActive", "actions"]);
        }), 128)),
        !props.items.length && !props.isListLoading ? (openBlock(), createElementBlock("li", {
          key: 0,
          class: normalizeClass(_ctx.$style.empty)
        }, [
          createTextVNode(toDisplayString(unref(i18n).baseText("workflowHistory.empty")) + " ", 1),
          _hoisted_1$1,
          createTextVNode(" " + toDisplayString(unref(i18n).baseText("workflowHistory.hint")), 1)
        ], 2)) : createCommentVNode("", true),
        props.isListLoading ? (openBlock(), createElementBlock("li", {
          key: 1,
          class: normalizeClass(_ctx.$style.loader),
          role: "status",
          "aria-live": "polite",
          "aria-busy": "true",
          "aria-label": unref(i18n).baseText("generic.loading")
        }, [
          createVNode(_component_n8n_loading, {
            rows: 3,
            class: "mb-xs"
          }),
          createVNode(_component_n8n_loading, {
            rows: 3,
            class: "mb-xs"
          }),
          createVNode(_component_n8n_loading, {
            rows: 3,
            class: "mb-xs"
          })
        ], 10, _hoisted_2$1)) : createCommentVNode("", true),
        props.shouldUpgrade ? (openBlock(), createElementBlock("li", {
          key: 2,
          class: normalizeClass(_ctx.$style.retention)
        }, [
          createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("workflowHistory.limit", {
            interpolate: { evaluatedPruneTime: props.evaluatedPruneTime }
          })), 1),
          createVNode(_component_i18n_t, {
            keypath: "workflowHistory.upgrade",
            tag: "span"
          }, {
            link: withCtx(() => [
              createBaseVNode("a", {
                href: "#",
                onClick: _cache[0] || (_cache[0] = ($event) => emit("upgrade"))
              }, toDisplayString(unref(i18n).baseText("workflowHistory.upgrade.link")), 1)
            ]),
            _: 1
          })
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const list = "_list_1h1nd_5";
const empty = "_empty_1h1nd_14";
const loader = "_loader_1h1nd_27";
const retention = "_retention_1h1nd_31";
const style0$2 = {
  list,
  empty,
  loader,
  retention
};
const cssModules$2 = {
  "$style": style0$2
};
const WorkflowHistoryList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1 = ["datetime"];
const _hoisted_2 = ["value"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowHistoryContent",
  props: {
    workflow: {},
    workflowVersion: {},
    actions: {},
    isListLoading: { type: Boolean },
    isFirstItemShown: { type: Boolean }
  },
  emits: ["action"],
  setup(__props, { emit }) {
    const props = __props;
    const i18n = useI18n();
    const workflowVersionPreview = computed(() => {
      if (!props.workflowVersion || !props.workflow) {
        return;
      }
      const { pinData, ...workflow } = props.workflow;
      return {
        ...workflow,
        nodes: props.workflowVersion.nodes,
        connections: props.workflowVersion.connections
      };
    });
    const actions2 = computed(
      () => props.isFirstItemShown ? props.actions.filter((action) => action.value !== "restore") : props.actions
    );
    const onAction = ({
      action,
      id,
      data
    }) => {
      emit("action", { action, id, data });
    };
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_button = resolveComponent("n8n-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.content)
      }, [
        props.workflowVersion ? (openBlock(), createBlock(WorkflowPreview, {
          key: 0,
          workflow: workflowVersionPreview.value,
          loading: props.isListLoading,
          loaderType: "spinner"
        }, null, 8, ["workflow", "loading"])) : createCommentVNode("", true),
        createBaseVNode("ul", {
          class: normalizeClass(_ctx.$style.info)
        }, [
          props.workflowVersion ? (openBlock(), createBlock(WorkflowHistoryListItem, {
            key: 0,
            class: normalizeClass(_ctx.$style.card),
            index: -1,
            item: props.workflowVersion,
            isActive: false,
            actions: actions2.value,
            onAction
          }, {
            default: withCtx(({ formattedCreatedAt }) => [
              createBaseVNode("section", {
                class: normalizeClass(_ctx.$style.text)
              }, [
                createBaseVNode("p", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(_ctx.$style.label)
                  }, toDisplayString(unref(i18n).baseText("workflowHistory.content.title")) + ": ", 3),
                  createBaseVNode("time", {
                    datetime: props.workflowVersion.createdAt
                  }, toDisplayString(formattedCreatedAt), 9, _hoisted_1)
                ]),
                createBaseVNode("p", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(_ctx.$style.label)
                  }, toDisplayString(unref(i18n).baseText("workflowHistory.content.editedBy")) + ": ", 3),
                  createBaseVNode("span", null, toDisplayString(props.workflowVersion.authors), 1)
                ]),
                createBaseVNode("p", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(_ctx.$style.label)
                  }, toDisplayString(unref(i18n).baseText("workflowHistory.content.versionId")) + ": ", 3),
                  createBaseVNode("data", {
                    value: props.workflowVersion.versionId
                  }, toDisplayString(props.workflowVersion.versionId), 9, _hoisted_2)
                ])
              ], 2)
            ]),
            "action-toggle-button": withCtx(() => [
              createVNode(_component_n8n_button, {
                type: "tertiary",
                size: "large",
                "data-test-id": "action-toggle-button"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("workflowHistory.content.actions")) + " ", 1),
                  createVNode(_component_n8n_icon, {
                    class: "ml-3xs",
                    icon: "chevron-down",
                    size: "small"
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["class", "item", "actions"])) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});
const content = "_content_1xe4n_5";
const info = "_info_1xe4n_15";
const card = "_card_1xe4n_23";
const text = "_text_1xe4n_28";
const label = "_label_1xe4n_53";
const style0$1 = {
  content,
  info,
  card,
  text,
  label
};
const cssModules$1 = {
  "$style": style0$1
};
const WorkflowHistoryContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const getWorkflowHistory = async (context, workflowId, queryParams) => {
  const { data } = await get(
    context.baseUrl,
    `/workflow-history/workflow/${workflowId}`,
    queryParams
  );
  return data;
};
const getWorkflowVersion = async (context, workflowId, versionId) => {
  const { data } = await get(
    context.baseUrl,
    `/workflow-history/workflow/${workflowId}/version/${versionId}`
  );
  return data;
};
const useWorkflowHistoryStore = defineStore("workflowHistory", () => {
  const rootStore = useRootStore();
  const settingsStore = useSettingsStore();
  const workflowsStore = useWorkflowsStore();
  const licensePruneTime = computed(() => settingsStore.settings.workflowHistory.licensePruneTime);
  const pruneTime = computed(() => settingsStore.settings.workflowHistory.pruneTime);
  const evaluatedPruneTime = computed(() => Math.min(pruneTime.value, licensePruneTime.value));
  const shouldUpgrade = computed(
    () => licensePruneTime.value !== -1 && licensePruneTime.value === pruneTime.value
  );
  const getWorkflowHistory$1 = async (workflowId, queryParams) => getWorkflowHistory(rootStore.getRestApiContext, workflowId, queryParams);
  const getWorkflowVersion$1 = async (workflowId, versionId) => getWorkflowVersion(rootStore.getRestApiContext, workflowId, versionId);
  const downloadVersion = async (workflowId, workflowVersionId, data) => {
    const [workflow, workflowVersion] = await Promise.all([
      workflowsStore.fetchWorkflow(workflowId),
      getWorkflowVersion$1(workflowId, workflowVersionId)
    ]);
    const { connections, nodes } = workflowVersion;
    const blob = new Blob([JSON.stringify({ ...workflow, nodes, connections }, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    FileSaver_minExports.saveAs(blob, `${workflow.name}(${data.formattedCreatedAt}).json`);
  };
  const cloneIntoNewWorkflow = async (workflowId, workflowVersionId, data) => {
    const [workflow, workflowVersion] = await Promise.all([
      workflowsStore.fetchWorkflow(workflowId),
      getWorkflowVersion$1(workflowId, workflowVersionId)
    ]);
    const { connections, nodes } = workflowVersion;
    const { name } = workflow;
    const newWorkflow = await getNewWorkflow(
      rootStore.getRestApiContext,
      `${name} (${data.formattedCreatedAt})`
    );
    const newWorkflowData = {
      nodes,
      connections,
      name: newWorkflow.name
    };
    return workflowsStore.createNewWorkflow(newWorkflowData);
  };
  const restoreWorkflow = async (workflowId, workflowVersionId, shouldDeactivate) => {
    const workflowVersion = await getWorkflowVersion$1(workflowId, workflowVersionId);
    const { connections, nodes } = workflowVersion;
    const updateData = { connections, nodes };
    if (shouldDeactivate) {
      updateData.active = false;
    }
    return workflowsStore.updateWorkflow(workflowId, updateData, true).catch(async (error) => {
      if (error.httpStatusCode === 400 && error.message.includes("can not be activated")) {
        return workflowsStore.fetchWorkflow(workflowId);
      } else {
        throw new Error(error);
      }
    });
  };
  return {
    getWorkflowHistory: getWorkflowHistory$1,
    getWorkflowVersion: getWorkflowVersion$1,
    downloadVersion,
    cloneIntoNewWorkflow,
    restoreWorkflow,
    evaluatedPruneTime,
    shouldUpgrade
  };
});
var WorkflowHistoryVersionRestoreModalActions = /* @__PURE__ */ ((WorkflowHistoryVersionRestoreModalActions2) => {
  WorkflowHistoryVersionRestoreModalActions2["restore"] = "restore";
  WorkflowHistoryVersionRestoreModalActions2["deactivateAndRestore"] = "deactivateAndRestore";
  WorkflowHistoryVersionRestoreModalActions2["cancel"] = "cancel";
  return WorkflowHistoryVersionRestoreModalActions2;
})(WorkflowHistoryVersionRestoreModalActions || {});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowHistory",
  setup(__props) {
    const workflowHistoryActionTypes = [
      "restore",
      "clone",
      "open",
      "download"
    ];
    const WORKFLOW_HISTORY_ACTIONS = workflowHistoryActionTypes.reduce(
      (record, key) => ({ ...record, [key.toUpperCase()]: key }),
      {}
    );
    const route = useRoute();
    const router = useRouter();
    const i18n = useI18n();
    const toast = useToast();
    const workflowHistoryStore = useWorkflowHistoryStore();
    const uiStore = useUIStore();
    const workflowsStore = useWorkflowsStore();
    const canRender = ref(true);
    const isListLoading = ref(true);
    const requestNumberOfItems = ref(20);
    const lastReceivedItemsLength = ref(0);
    const editorRoute = computed(() => ({
      name: VIEWS.WORKFLOW,
      params: {
        name: route.params.workflowId
      }
    }));
    const activeWorkflow = ref(null);
    const workflowHistory = ref([]);
    const activeWorkflowVersion = ref(null);
    const actions2 = computed(
      () => workflowHistoryActionTypes.map((value) => ({
        label: i18n.baseText(`workflowHistory.item.actions.${value}`),
        disabled: false,
        value
      }))
    );
    const isFirstItemShown = computed(
      () => {
        var _a;
        return ((_a = workflowHistory.value[0]) == null ? void 0 : _a.versionId) === route.params.versionId;
      }
    );
    const evaluatedPruneTime = computed(() => Math.floor(workflowHistoryStore.evaluatedPruneTime / 24));
    const loadMore = async (queryParams) => {
      const history = await workflowHistoryStore.getWorkflowHistory(
        route.params.workflowId,
        queryParams
      );
      lastReceivedItemsLength.value = history.length;
      workflowHistory.value = workflowHistory.value.concat(history);
    };
    onBeforeMount(async () => {
      try {
        const [workflow] = await Promise.all([
          workflowsStore.fetchWorkflow(route.params.workflowId),
          loadMore({ take: requestNumberOfItems.value })
        ]);
        activeWorkflow.value = workflow;
        isListLoading.value = false;
        if (!route.params.versionId && workflowHistory.value.length) {
          await router.replace({
            name: VIEWS.WORKFLOW_HISTORY,
            params: {
              workflowId: route.params.workflowId,
              versionId: workflowHistory.value[0].versionId
            }
          });
        }
      } catch (error) {
        canRender.value = false;
        toast.showError(error, i18n.baseText("workflowHistory.title"));
      }
    });
    const openInNewTab = (id) => {
      const { href } = router.resolve({
        name: VIEWS.WORKFLOW_HISTORY,
        params: {
          workflowId: route.params.workflowId,
          versionId: id
        }
      });
      window.open(href, "_blank");
    };
    const openRestorationModal = async (isWorkflowActivated, formattedCreatedAt) => {
      return new Promise((resolve, reject) => {
        const buttons = [
          {
            text: i18n.baseText("workflowHistory.action.restore.modal.button.cancel"),
            type: "tertiary",
            action: () => {
              resolve(
                "cancel"
                /* cancel */
              );
            }
          }
        ];
        if (isWorkflowActivated) {
          buttons.push({
            text: i18n.baseText("workflowHistory.action.restore.modal.button.deactivateAndRestore"),
            type: "tertiary",
            action: () => {
              resolve(
                "deactivateAndRestore"
                /* deactivateAndRestore */
              );
            }
          });
        }
        buttons.push({
          text: i18n.baseText("workflowHistory.action.restore.modal.button.restore"),
          type: "primary",
          action: () => {
            resolve(
              "restore"
              /* restore */
            );
          }
        });
        try {
          uiStore.openModalWithData({
            name: WORKFLOW_HISTORY_VERSION_RESTORE,
            data: {
              beforeClose: () => {
                resolve(
                  "cancel"
                  /* cancel */
                );
              },
              isWorkflowActivated,
              formattedCreatedAt,
              buttons
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    };
    const cloneWorkflowVersion = async (id, data) => {
      const clonedWorkflow = await workflowHistoryStore.cloneIntoNewWorkflow(
        route.params.workflowId,
        id,
        data
      );
      const { href } = router.resolve({
        name: VIEWS.WORKFLOW,
        params: {
          name: clonedWorkflow.id
        }
      });
      toast.showMessage({
        title: i18n.baseText("workflowHistory.action.clone.success.title"),
        message: h(
          "a",
          { href, target: "_blank" },
          i18n.baseText("workflowHistory.action.clone.success.message")
        ),
        type: "success",
        duration: 1e4
      });
    };
    const restoreWorkflowVersion = async (id, data) => {
      const workflow = await workflowsStore.fetchWorkflow(route.params.workflowId);
      const modalAction = await openRestorationModal(workflow.active, data.formattedCreatedAt);
      if (modalAction === "cancel") {
        return;
      }
      activeWorkflow.value = await workflowHistoryStore.restoreWorkflow(
        route.params.workflowId,
        id,
        modalAction === "deactivateAndRestore"
        /* deactivateAndRestore */
      );
      const history = await workflowHistoryStore.getWorkflowHistory(route.params.workflowId, {
        take: 1
      });
      workflowHistory.value = history.concat(workflowHistory.value);
      toast.showMessage({
        title: i18n.baseText("workflowHistory.action.restore.success.title"),
        type: "success"
      });
    };
    const onAction = async ({
      action,
      id,
      data
    }) => {
      try {
        switch (action) {
          case WORKFLOW_HISTORY_ACTIONS.OPEN:
            openInNewTab(id);
            break;
          case WORKFLOW_HISTORY_ACTIONS.DOWNLOAD:
            await workflowHistoryStore.downloadVersion(route.params.workflowId, id, data);
            break;
          case WORKFLOW_HISTORY_ACTIONS.CLONE:
            await cloneWorkflowVersion(id, data);
            break;
          case WORKFLOW_HISTORY_ACTIONS.RESTORE:
            await restoreWorkflowVersion(id, data);
            break;
        }
      } catch (error) {
        toast.showError(
          error,
          i18n.baseText("workflowHistory.action.error.title", {
            interpolate: {
              action: i18n.baseText(`workflowHistory.item.actions.${action}`).toLowerCase()
            }
          })
        );
      }
    };
    const onPreview = async ({ event, id }) => {
      if (event.metaKey || event.ctrlKey) {
        openInNewTab(id);
      } else {
        await router.push({
          name: VIEWS.WORKFLOW_HISTORY,
          params: {
            workflowId: route.params.workflowId,
            versionId: id
          }
        });
      }
    };
    const onUpgrade = () => {
      void uiStore.goToUpgrade("workflow-history", "upgrade-workflow-history");
    };
    watchEffect(async () => {
      if (!route.params.versionId) {
        return;
      }
      try {
        activeWorkflowVersion.value = await workflowHistoryStore.getWorkflowVersion(
          route.params.workflowId,
          route.params.versionId
        );
      } catch (error) {
        toast.showError(
          new Error(`${error.message} "${route.params.versionId}"&nbsp;`),
          i18n.baseText("workflowHistory.title")
        );
      }
      try {
        activeWorkflow.value = await workflowsStore.fetchWorkflow(route.params.workflowId);
      } catch (error) {
        canRender.value = false;
        toast.showError(error, i18n.baseText("workflowHistory.title"));
      }
    });
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.view)
      }, [
        createVNode(_component_n8n_heading, {
          class: normalizeClass(_ctx.$style.header),
          tag: "h2",
          size: "medium"
        }, {
          default: withCtx(() => {
            var _a;
            return [
              createTextVNode(toDisplayString((_a = activeWorkflow.value) == null ? void 0 : _a.name), 1)
            ];
          }),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.corner)
        }, [
          createVNode(_component_n8n_heading, {
            tag: "h2",
            size: "medium",
            bold: ""
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("workflowHistory.title")), 1)
            ]),
            _: 1
          }),
          createVNode(_component_router_link, {
            to: editorRoute.value,
            "data-test-id": "workflow-history-close-button"
          }, {
            default: withCtx(() => [
              createVNode(_component_n8n_button, {
                type: "tertiary",
                icon: "times",
                size: "small",
                text: "",
                square: ""
              })
            ]),
            _: 1
          }, 8, ["to"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.listComponentWrapper)
        }, [
          canRender.value ? (openBlock(), createBlock(WorkflowHistoryList, {
            key: 0,
            items: workflowHistory.value,
            lastReceivedItemsLength: lastReceivedItemsLength.value,
            activeItem: activeWorkflowVersion.value,
            actions: actions2.value,
            requestNumberOfItems: requestNumberOfItems.value,
            shouldUpgrade: unref(workflowHistoryStore).shouldUpgrade,
            evaluatedPruneTime: evaluatedPruneTime.value,
            isListLoading: isListLoading.value,
            onAction,
            onPreview,
            onLoadMore: loadMore,
            onUpgrade
          }, null, 8, ["items", "lastReceivedItemsLength", "activeItem", "actions", "requestNumberOfItems", "shouldUpgrade", "evaluatedPruneTime", "isListLoading"])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.contentComponentWrapper)
        }, [
          canRender.value ? (openBlock(), createBlock(WorkflowHistoryContent, {
            key: 0,
            workflow: activeWorkflow.value,
            workflowVersion: activeWorkflowVersion.value,
            actions: actions2.value,
            isListLoading: isListLoading.value,
            isFirstItemShown: isFirstItemShown.value,
            onAction
          }, null, 8, ["workflow", "workflowVersion", "actions", "isListLoading", "isFirstItemShown"])) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});
const view = "_view_1ax7n_5";
const header = "_header_1ax7n_15";
const corner = "_corner_1ax7n_23";
const contentComponentWrapper = "_contentComponentWrapper_1ax7n_34";
const listComponentWrapper = "_listComponentWrapper_1ax7n_39";
const style0 = {
  view,
  header,
  corner,
  contentComponentWrapper,
  listComponentWrapper
};
const cssModules = {
  "$style": style0
};
const WorkflowHistory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowHistory as default
};
