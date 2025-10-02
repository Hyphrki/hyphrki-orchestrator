import { eP as useNodeCreatorStore, a3 as WEBHOOK_NODE_TYPE, f3 as SCHEDULE_TRIGGER_NODE_TYPE, fd as transformNodeType, ff as sortNodeCreateElements, H as useWorkflowsStore, G as useNodeTypesStore, f0 as TRIGGER_NODE_CREATOR_VIEW, S as STICKY_NODE_TYPE, fm as NODE_CREATOR_OPEN_SOURCES, e8 as MANUAL_TRIGGER_NODE_TYPE, ac as SPLIT_IN_BATCHES_NODE_TYPE, eJ as NO_OP_NODE_TYPE, p as i18n, l as runExternalHook, cT as __vitePreload, n as useUIStore, gt as getMidCanvasPosition, gu as DEFAULT_STICKY_WIDTH, gv as DEFAULT_STICKY_HEIGHT, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { J as getCurrentInstance, c as computed, d as defineComponent, aI as defineAsyncComponent, a as reactive, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, q as createCommentVNode, b as createBlock, f as withCtx, p as unref, aK as Suspense } from "./vendor-fd4bd18c.js";
const useActions = () => {
  const nodeCreatorStore = useNodeCreatorStore();
  const instance = getCurrentInstance();
  const actionsCategoryLocales = computed(() => {
    return {
      actions: (instance == null ? void 0 : instance.proxy.$locale.baseText("nodeCreator.actionsCategory.actions")) ?? "",
      triggers: (instance == null ? void 0 : instance.proxy.$locale.baseText("nodeCreator.actionsCategory.triggers")) ?? ""
    };
  });
  function getPlaceholderTriggerActions(subcategory) {
    const nodes = [WEBHOOK_NODE_TYPE, SCHEDULE_TRIGGER_NODE_TYPE];
    const matchedNodeTypes = nodeCreatorStore.mergedNodes.filter((node) => nodes.some((n) => n === node.name)).map((node) => {
      const transformed = transformNodeType(node, subcategory, "action");
      if (transformed.type === "action") {
        const nameBase = node.name.replace("n8n-nodes-base.", "");
        const localeKey = `nodeCreator.actionsPlaceholderNode.${nameBase}`;
        const overwriteLocale = instance == null ? void 0 : instance.proxy.$locale.baseText(localeKey);
        if (overwriteLocale !== localeKey) {
          transformed.properties.displayName = overwriteLocale;
        }
      }
      return transformed;
    });
    return matchedNodeTypes;
  }
  function filterActionsCategory(items, category) {
    return items.filter(
      (item) => item.type === "action" && item.properties.codex.categories.includes(category)
    );
  }
  function injectActionsLabels(items) {
    var _a, _b, _c, _d;
    const extendedActions = sortNodeCreateElements([...items]);
    const labelsSet = /* @__PURE__ */ new Set();
    for (const action of extendedActions) {
      if (action.type !== "action")
        continue;
      const label = (_b = (_a = action.properties) == null ? void 0 : _a.codex) == null ? void 0 : _b.label;
      labelsSet.add(label);
    }
    if (labelsSet.size <= 1)
      return extendedActions;
    const firstIndexMap = /* @__PURE__ */ new Map();
    for (let i = 0; i < extendedActions.length; i++) {
      const action = extendedActions[i];
      if (action.type !== "action")
        continue;
      const label = (_d = (_c = action.properties) == null ? void 0 : _c.codex) == null ? void 0 : _d.label;
      if (!firstIndexMap.has(label)) {
        firstIndexMap.set(label, i);
      }
    }
    let insertedLabels = 0;
    for (const label of labelsSet) {
      const newLabel = {
        uuid: label,
        type: "label",
        key: label,
        subcategory: extendedActions[0].key,
        properties: {
          key: label
        }
      };
      const insertIndex = firstIndexMap.get(label) + insertedLabels;
      extendedActions.splice(insertIndex, 0, newLabel);
      insertedLabels++;
    }
    return extendedActions;
  }
  function parseCategoryActions(actions, category, withLabels = true) {
    const filteredActions = filterActionsCategory(actions, category);
    if (withLabels)
      return injectActionsLabels(filteredActions);
    return filteredActions;
  }
  function getActionData(actionItem) {
    const displayOptions = actionItem.displayOptions;
    const displayConditions = Object.keys((displayOptions == null ? void 0 : displayOptions.show) || {}).reduce(
      (acc, showCondition) => {
        var _a, _b;
        acc[showCondition] = (_b = (_a = displayOptions == null ? void 0 : displayOptions.show) == null ? void 0 : _a[showCondition]) == null ? void 0 : _b[0];
        return acc;
      },
      {}
    );
    return {
      name: actionItem.displayName,
      key: actionItem.name,
      value: { ...actionItem.values, ...displayConditions }
    };
  }
  function shouldPrependManualTrigger(addedNodes) {
    const { selectedView, openSource } = useNodeCreatorStore();
    const { workflowTriggerNodes } = useWorkflowsStore();
    const hasTrigger = addedNodes.some((node) => useNodeTypesStore().isTriggerNode(node.type));
    const workflowContainsTrigger = workflowTriggerNodes.length > 0;
    const isTriggerPanel = selectedView === TRIGGER_NODE_CREATOR_VIEW;
    const onlyStickyNodes = addedNodes.every((node) => node.type === STICKY_NODE_TYPE);
    const singleNodeOpenSources = [
      NODE_CREATOR_OPEN_SOURCES.PLUS_ENDPOINT,
      NODE_CREATOR_OPEN_SOURCES.NODE_CONNECTION_ACTION,
      NODE_CREATOR_OPEN_SOURCES.NODE_CONNECTION_DROP
    ];
    const isSingleNodeOpenSource = singleNodeOpenSources.includes(openSource);
    return !isSingleNodeOpenSource && !hasTrigger && !workflowContainsTrigger && isTriggerPanel && !onlyStickyNodes;
  }
  function getAddedNodesAndConnections(addedNodes) {
    if (addedNodes.length === 0) {
      return { nodes: [], connections: [] };
    }
    const nodes = [];
    const connections = [];
    const nodeToAutoOpen = addedNodes.find((node) => node.type !== MANUAL_TRIGGER_NODE_TYPE);
    if (nodeToAutoOpen) {
      nodeToAutoOpen.openDetail = true;
    }
    if (shouldPrependManualTrigger(addedNodes)) {
      addedNodes.unshift({ type: MANUAL_TRIGGER_NODE_TYPE, isAutoAdd: true });
      connections.push({
        from: { nodeIndex: 0 },
        to: { nodeIndex: 1 }
      });
    }
    addedNodes.forEach((node, index) => {
      nodes.push(node);
      switch (node.type) {
        case SPLIT_IN_BATCHES_NODE_TYPE: {
          const splitInBatchesIndex = index;
          const noOpIndex = splitInBatchesIndex + 1;
          nodes.push({
            type: NO_OP_NODE_TYPE,
            isAutoAdd: true,
            name: i18n.baseText("nodeView.replaceMe")
          });
          connections.push(
            {
              from: { nodeIndex: splitInBatchesIndex, outputIndex: 1 },
              to: { nodeIndex: noOpIndex }
            },
            {
              from: { nodeIndex: noOpIndex },
              to: { nodeIndex: splitInBatchesIndex }
            }
          );
          break;
        }
      }
    });
    return { nodes, connections };
  }
  function setAddedNodeActionParameters(action, telemetry, rootView = "") {
    const { $onAction: onWorkflowStoreAction } = useWorkflowsStore();
    const storeWatcher = onWorkflowStoreAction(
      ({ name, after, store: { setLastNodeParameters }, args }) => {
        if (name !== "addNode" || args[0].type !== action.key)
          return;
        after(() => {
          setLastNodeParameters(action);
          if (telemetry)
            trackActionSelected(action, telemetry, rootView);
          storeWatcher();
        });
      }
    );
    return storeWatcher;
  }
  function trackActionSelected(action, telemetry, rootView) {
    const payload = {
      node_type: action.key,
      action: action.name,
      source_mode: rootView.toLowerCase(),
      resource: action.value.resource || ""
    };
    void runExternalHook("nodeCreateList.addAction", payload);
    telemetry == null ? void 0 : telemetry.trackNodesPanel("nodeCreateList.addAction", payload);
  }
  return {
    actionsCategoryLocales,
    getPlaceholderTriggerActions,
    parseCategoryActions,
    getAddedNodesAndConnections,
    getActionData,
    setAddedNodeActionParameters
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NodeCreation",
  props: {
    nodeViewScale: {},
    createNodeActive: { type: Boolean, default: false }
  },
  emits: ["addNodes", "toggleNodeCreator"],
  setup(__props, { emit }) {
    const props = __props;
    const NodeCreator = defineAsyncComponent(
      async () => __vitePreload(() => import("./NodeCreator-e65c93cc.js"), true ? ["assets/NodeCreator-e65c93cc.js","assets/vendor-fd4bd18c.js","assets/n8n-8ddd8349.js","assets/flatted-551ad821.js","assets/esprima-next-b5fc8919.js","assets/luxon-63e8a0ed.js","assets/pinia-282957dc.js","assets/lodash-es-be629387.js","assets/@vueuse/core-f4908be6.js","assets/uuid-2dfcd766.js","assets/vue-i18n-86898575.js","assets/@fortawesome/vue-fontawesome-04873987.js","assets/@fortawesome/fontawesome-svg-core-6d4d86d8.js","assets/@jsplumb/util-1214d169.js","assets/@jsplumb/core-defb43f2.js","assets/@jsplumb/common-6db23379.js","assets/@jsplumb/connector-bezier-4c31eaae.js","assets/@jsplumb/browser-ui-21fcaa55.js","assets/n8n-9a260305.css","assets/NodeView-413a24e1.js","assets/index-00f166b0.js","assets/prettier-ee8b90a8.js","assets/codemirror-lang-html-n8n-1744db69.js","assets/@n8n/codemirror-lang-sql-71393e13.js","assets/@lezer/common-ff1769bd.js","assets/codemirror-lang-n8n-expression-5b146a0d.js","assets/fast-json-stable-stringify-4acbec5d.js","assets/timeago.js-527228bd.js","assets/qrcode.vue-401ae704.js","assets/vue3-touch-events-c30a9e21.js","assets/@fortawesome/free-solid-svg-icons-e786cea6.js","assets/@fortawesome/free-regular-svg-icons-d7581360.js","assets/chart.js-b7590faa.js","assets/index-ef6ecd1d.css","assets/file-saver-ccbe3603.js","assets/vue-json-pretty-1f49a504.js","assets/RunDataAi-1d763057.js","assets/vue-markdown-render-1dc15361.js","assets/RunDataAi-eaec1b12.css","assets/workflowActivate-7e113acb.js","assets/NodeView-5af9d965.css","assets/NodeCreator-48c319d5.css"] : void 0)
    );
    const state = reactive({
      showStickyButton: false
    });
    const uiStore = useUIStore();
    const { getAddedNodesAndConnections } = useActions();
    function onCreateMenuHoverIn(mouseinEvent) {
      const buttonsWrapper = mouseinEvent.target;
      state.showStickyButton = true;
      const moveCallback = (mousemoveEvent) => {
        if (buttonsWrapper) {
          const wrapperBounds = buttonsWrapper.getBoundingClientRect();
          const wrapperH = wrapperBounds.height;
          const wrapperW = wrapperBounds.width;
          const wrapperLeftNear = wrapperBounds.left;
          const wrapperLeftFar = wrapperLeftNear + wrapperW;
          const wrapperTopNear = wrapperBounds.top;
          const wrapperTopFar = wrapperTopNear + wrapperH;
          const inside = mousemoveEvent.pageX > wrapperLeftNear && mousemoveEvent.pageX < wrapperLeftFar && mousemoveEvent.pageY > wrapperTopNear && mousemoveEvent.pageY < wrapperTopFar;
          if (!inside) {
            state.showStickyButton = false;
            document.removeEventListener("mousemove", moveCallback, false);
          }
        }
      };
      document.addEventListener("mousemove", moveCallback, false);
    }
    function openNodeCreator() {
      emit("toggleNodeCreator", {
        source: NODE_CREATOR_OPEN_SOURCES.ADD_NODE_BUTTON,
        createNodeActive: true
      });
    }
    function addStickyNote() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
      const offset = [...uiStore.nodeViewOffsetPosition];
      const position = getMidCanvasPosition(props.nodeViewScale, offset);
      position[0] -= DEFAULT_STICKY_WIDTH / 2;
      position[1] -= DEFAULT_STICKY_HEIGHT / 2;
      emit("addNodes", getAddedNodesAndConnections([{ type: STICKY_NODE_TYPE, position }]));
    }
    function closeNodeCreator() {
      emit("toggleNodeCreator", { createNodeActive: false });
    }
    function nodeTypeSelected(nodeTypes) {
      emit("addNodes", getAddedNodesAndConnections(nodeTypes.map((type) => ({ type }))));
      closeNodeCreator();
    }
    return (_ctx, _cache) => {
      const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
      return openBlock(), createElementBlock("div", null, [
        !_ctx.createNodeActive ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([_ctx.$style.nodeButtonsWrapper, state.showStickyButton ? _ctx.$style.noEvents : ""]),
          onMouseenter: onCreateMenuHoverIn
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.nodeCreatorButton),
            "data-test-id": "node-creator-plus-button"
          }, [
            createVNode(_component_n8n_icon_button, {
              size: "xlarge",
              icon: "plus",
              type: "tertiary",
              class: normalizeClass(_ctx.$style.nodeCreatorPlus),
              onClick: openNodeCreator,
              title: _ctx.$locale.baseText("nodeView.addNode")
            }, null, 8, ["class", "title"]),
            createBaseVNode("div", {
              class: normalizeClass([_ctx.$style.addStickyButton, state.showStickyButton ? _ctx.$style.visibleButton : ""]),
              onClick: addStickyNote,
              "data-test-id": "add-sticky-button"
            }, [
              createVNode(_component_n8n_icon_button, {
                type: "tertiary",
                icon: ["far", "note-sticky"],
                title: _ctx.$locale.baseText("nodeView.addSticky")
              }, null, 8, ["title"])
            ], 2)
          ], 2)
        ], 34)) : createCommentVNode("", true),
        (openBlock(), createBlock(Suspense, null, {
          default: withCtx(() => [
            createVNode(unref(NodeCreator), {
              active: _ctx.createNodeActive,
              onNodeTypeSelected: nodeTypeSelected,
              onCloseNodeCreator: closeNodeCreator
            }, null, 8, ["active"])
          ]),
          _: 1
        }))
      ]);
    };
  }
});
const nodeButtonsWrapper = "_nodeButtonsWrapper_zpked_5";
const addStickyButton = "_addStickyButton_zpked_14";
const visibleButton = "_visibleButton_zpked_21";
const noEvents = "_noEvents_zpked_26";
const nodeCreatorButton = "_nodeCreatorButton_zpked_30";
const nodeCreatorPlus = "_nodeCreatorPlus_zpked_47";
const style0 = {
  nodeButtonsWrapper,
  addStickyButton,
  visibleButton,
  noEvents,
  nodeCreatorButton,
  nodeCreatorPlus
};
const cssModules = {
  "$style": style0
};
const NodeCreation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
const NodeCreation$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NodeCreation
}, Symbol.toStringTag, { value: "Module" }));
export {
  NodeCreation$1 as N,
  useActions as u
};
