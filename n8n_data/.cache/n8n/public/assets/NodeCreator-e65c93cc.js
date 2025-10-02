import { d as defineComponent, o as openBlock, b as createBlock, ab as Transition, f as withCtx, g as renderSlot, a as reactive, N as onMounted, M as onBeforeUnmount, H as toRefs, h as resolveComponent, k as createElementBlock, j as createBaseVNode, i as createVNode, n as normalizeClass, q as createCommentVNode, r as ref, c as computed, ak as createSlots, p as unref, ac as withDirectives, ad as vShow, af as withModifiers, a9 as normalizeStyle, m as mergeProps, t as toDisplayString, J as getCurrentInstance, O as onUnmounted, w as watch, a3 as Fragment, ai as renderList, am as normalizeProps, at as guardReactiveProps, a7 as h, Z as createStaticVNode, s as createTextVNode } from "./vendor-fd4bd18c.js";
import { _ as _export_sfc, p as i18n, J as CUSTOM_API_CALL_KEY, Z as HTTP_REQUEST_NODE_TYPE, gA as getCredentialOnlyNodeType, dF as useExternalHooks, eP as useNodeCreatorStore, f1 as DEFAULT_SUBCATEGORY, aU as CREDENTIAL_ONLY_NODE_PREFIX, bc as isCommunityPackageName, c_ as getConnectionTypes, P as NodeConnectionType, aH as COMMUNITY_NODES_INSTALLATION_DOCS_URL, am as useI18n, ar as useTelemetry, fr as DRAG_EVENT_DATA_KEY, fq as getNewNodePosition, fu as NODE_SIZE, a3 as WEBHOOK_NODE_TYPE, H as useWorkflowsStore, t as useUsersStore, f0 as TRIGGER_NODE_CREATOR_VIEW, f7 as REGULAR_NODE_CREATOR_VIEW, l as runExternalHook, gB as REQUEST_NODE_FORM_URL, x as useRootStore, fd as transformNodeType, eQ as AI_NODE_CREATOR_VIEW, eR as AI_OTHERS_NODE_CREATOR_VIEW, n as useUIStore, D as useCredentialsStore, G as useNodeTypesStore } from "./n8n-8ddd8349.js";
import { u as useViewStacks, a as useKeyboardNavigation, T as TriggerView, R as RegularView, A as AIView, b as AINodesView } from "./NodeView-413a24e1.js";
import { m as memoize, B as startCase, C as camelCase } from "./lodash-es-be629387.js";
import { u as useActions } from "./NodeCreation-791ef879.js";
import { N as NodeIcon } from "./index-00f166b0.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./pinia-282957dc.js";
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
import "./vue-json-pretty-1f49a504.js";
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
const _sfc_main$f = defineComponent({
  name: "SlideTransition"
});
const SlideTransition_vue_vue_type_style_index_0_scoped_88e2114c_lang = "";
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "slide" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]),
    _: 3
  });
}
const SlideTransition = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$1], ["__scopeId", "data-v-88e2114c"]]);
const PLACEHOLDER_RECOMMENDED_ACTION_KEY = "placeholder_recommended";
function translate(...args) {
  return i18n.baseText(...args);
}
const cachedBaseText = memoize(translate, (...args) => JSON.stringify(args));
const customNodeActionsParsers = {
  ["n8n-nodes-base.hubspotTrigger"]: (matchedProperty, nodeTypeDescription) => {
    var _a, _b, _c;
    const collection = (_a = matchedProperty == null ? void 0 : matchedProperty.options) == null ? void 0 : _a[0];
    return (_c = (_b = collection == null ? void 0 : collection.values[0]) == null ? void 0 : _b.options) == null ? void 0 : _c.map(
      (categoryItem) => ({
        ...getNodeTypeBase(nodeTypeDescription),
        actionKey: categoryItem.value,
        displayName: cachedBaseText("nodeCreator.actionsCategory.onEvent", {
          interpolate: { event: startCase(categoryItem.name) }
        }),
        description: categoryItem.description || "",
        displayOptions: matchedProperty.displayOptions,
        values: { eventsUi: { eventValues: [{ name: categoryItem.value }] } }
      })
    );
  }
};
function getNodeTypeBase(nodeTypeDescription, label2) {
  const isTrigger = nodeTypeDescription.group.includes("trigger");
  const category2 = isTrigger ? cachedBaseText("nodeCreator.actionsCategory.triggers") : cachedBaseText("nodeCreator.actionsCategory.actions");
  return {
    name: nodeTypeDescription.name,
    group: nodeTypeDescription.group,
    codex: {
      label: label2 || "",
      categories: [category2]
    },
    iconUrl: nodeTypeDescription.iconUrl,
    outputs: nodeTypeDescription.outputs,
    icon: nodeTypeDescription.icon,
    defaults: nodeTypeDescription.defaults
  };
}
function operationsCategory(nodeTypeDescription) {
  if (!!nodeTypeDescription.properties.find((property) => property.name === "resource"))
    return [];
  const matchedProperty = nodeTypeDescription.properties.find(
    (property) => {
      var _a;
      return ((_a = property.name) == null ? void 0 : _a.toLowerCase()) === "operation";
    }
  );
  if (!(matchedProperty == null ? void 0 : matchedProperty.options))
    return [];
  const filteredOutItems = matchedProperty.options.filter(
    (categoryItem) => !["*", "", " "].includes(categoryItem.name)
  );
  const items2 = filteredOutItems.map((item) => ({
    ...getNodeTypeBase(nodeTypeDescription),
    actionKey: item.value,
    displayName: item.action ?? startCase(item.name),
    description: item.description ?? "",
    displayOptions: matchedProperty.displayOptions,
    values: {
      [matchedProperty.name]: matchedProperty.type === "multiOptions" ? [item.value] : item.value
    }
  }));
  if (items2.length === 0)
    return [];
  return items2;
}
function triggersCategory(nodeTypeDescription) {
  var _a, _b;
  const matchingKeys = ["event", "events", "trigger on"];
  const isTrigger = (_a = nodeTypeDescription.displayName) == null ? void 0 : _a.toLowerCase().includes("trigger");
  const matchedProperty = nodeTypeDescription.properties.find(
    (property) => {
      var _a2;
      return matchingKeys.includes((_a2 = property.displayName) == null ? void 0 : _a2.toLowerCase());
    }
  );
  if (!isTrigger)
    return [];
  if (!(matchedProperty == null ? void 0 : matchedProperty.options)) {
    return [
      {
        ...getNodeTypeBase(nodeTypeDescription),
        actionKey: PLACEHOLDER_RECOMMENDED_ACTION_KEY,
        displayName: cachedBaseText("nodeCreator.actionsCategory.onNewEvent", {
          interpolate: { event: nodeTypeDescription.displayName.replace("Trigger", "").trimEnd() }
        }),
        description: ""
      }
    ];
  }
  const filteredOutItems = matchedProperty.options.filter(
    (categoryItem) => !["*", "", " "].includes(categoryItem.name)
  );
  const customParsedItem = (_b = customNodeActionsParsers[nodeTypeDescription.name]) == null ? void 0 : _b.call(
    customNodeActionsParsers,
    matchedProperty,
    nodeTypeDescription
  );
  const items2 = customParsedItem ?? filteredOutItems.map((categoryItem) => ({
    ...getNodeTypeBase(nodeTypeDescription),
    actionKey: categoryItem.value,
    displayName: categoryItem.action ?? cachedBaseText("nodeCreator.actionsCategory.onEvent", {
      interpolate: { event: startCase(categoryItem.name) }
    }),
    description: categoryItem.description || "",
    displayOptions: matchedProperty.displayOptions,
    values: {
      [matchedProperty.name]: matchedProperty.type === "multiOptions" ? [categoryItem.value] : categoryItem.value
    }
  }));
  return items2;
}
function resourceCategories(nodeTypeDescription) {
  const transformedNodes = [];
  const matchedProperties = nodeTypeDescription.properties.filter(
    (property) => {
      var _a;
      return ((_a = property.displayName) == null ? void 0 : _a.toLowerCase()) === "resource";
    }
  );
  matchedProperties.forEach((property) => {
    (property.options || []).filter((option) => option.value !== CUSTOM_API_CALL_KEY).forEach((resourceOption, i, options) => {
      const isSingleResource = options.length === 1;
      const operations = nodeTypeDescription.properties.find((operation) => {
        var _a, _b, _c, _d, _e;
        const isOperation = operation.name === "operation";
        const isMatchingResource = ((_c = (_b = (_a = operation.displayOptions) == null ? void 0 : _a.show) == null ? void 0 : _b.resource) == null ? void 0 : _c.includes(resourceOption.value)) || isSingleResource;
        const operationVersions = (_e = (_d = operation.displayOptions) == null ? void 0 : _d.show) == null ? void 0 : _e["@version"];
        const nodeTypeVersions = Array.isArray(nodeTypeDescription.version) ? nodeTypeDescription.version : [nodeTypeDescription.version];
        const isMatchingVersion = operationVersions ? operationVersions.some((version) => nodeTypeVersions.includes(version)) : true;
        return isOperation && isMatchingResource && isMatchingVersion;
      });
      if (!(operations == null ? void 0 : operations.options))
        return;
      const items2 = (operations.options || []).map(
        (operationOption) => {
          var _a;
          const displayName = operationOption.action ?? `${resourceOption.name} ${startCase(operationOption.name)}`;
          const displayOptions = isSingleResource ? { show: { resource: [(_a = options[0]) == null ? void 0 : _a.value] } } : operations == null ? void 0 : operations.displayOptions;
          return {
            ...getNodeTypeBase(
              nodeTypeDescription,
              `${resourceOption.name} ${cachedBaseText("nodeCreator.actionsCategory.actions")}`
            ),
            actionKey: operationOption.value,
            description: (operationOption == null ? void 0 : operationOption.description) ?? "",
            displayOptions,
            values: {
              operation: (operations == null ? void 0 : operations.type) === "multiOptions" ? [operationOption.value] : operationOption.value
            },
            displayName,
            group: ["trigger"]
          };
        }
      );
      transformedNodes.push(...items2);
    });
  });
  return transformedNodes;
}
function useActionsGenerator() {
  function generateNodeActions(node) {
    if (!node)
      return [];
    return [...triggersCategory(node), ...operationsCategory(node), ...resourceCategories(node)];
  }
  function filterActions(actions) {
    if (actions.length <= 1)
      return [];
    return actions.filter(
      (action2, _, arr) => {
        const isApiCall = action2.actionKey === CUSTOM_API_CALL_KEY;
        if (isApiCall)
          return false;
        const isPlaceholderTriggerAction = action2.actionKey === PLACEHOLDER_RECOMMENDED_ACTION_KEY;
        return !isPlaceholderTriggerAction || isPlaceholderTriggerAction && arr.length > 1;
      }
    );
  }
  function getSimplifiedNodeType(node) {
    const {
      displayName,
      defaults,
      description,
      name: name2,
      group,
      icon: icon2,
      iconUrl,
      badgeIconUrl,
      outputs,
      codex
    } = node;
    return {
      displayName,
      defaults,
      description,
      name: name2,
      group,
      icon: icon2,
      iconUrl,
      badgeIconUrl,
      outputs,
      codex
    };
  }
  function generateMergedNodesAndActions(nodeTypes, httpOnlyCredentials) {
    const visibleNodeTypes = [...nodeTypes];
    const actions = {};
    const mergedNodes = [];
    visibleNodeTypes.filter((node) => !node.group.includes("trigger")).forEach((app) => {
      const appActions = generateNodeActions(app);
      actions[app.name] = appActions;
      if (app.name === HTTP_REQUEST_NODE_TYPE) {
        const credentialOnlyNodes = httpOnlyCredentials.map(
          (credentialType) => getSimplifiedNodeType(getCredentialOnlyNodeType(app, credentialType))
        );
        mergedNodes.push(...credentialOnlyNodes);
      }
      mergedNodes.push(getSimplifiedNodeType(app));
    });
    visibleNodeTypes.filter((node) => node.group.includes("trigger")).forEach((trigger) => {
      const normalizedName = trigger.name.replace("Trigger", "");
      const triggerActions = generateNodeActions(trigger);
      const appActions = (actions == null ? void 0 : actions[normalizedName]) || [];
      const app = mergedNodes.find((node) => node.name === normalizedName);
      if (app && (appActions == null ? void 0 : appActions.length) > 0) {
        const mergedActions = filterActions([...appActions, ...triggerActions]);
        actions[normalizedName] = mergedActions;
        app.description = trigger.description;
      } else {
        actions[trigger.name] = filterActions(triggerActions);
        mergedNodes.push(getSimplifiedNodeType(trigger));
      }
    });
    return {
      actions,
      mergedNodes
    };
  }
  return {
    generateMergedNodesAndActions
  };
}
const _hoisted_1$9 = ["placeholder", "value"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  props: {
    placeholder: { default: "" },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit }) {
    const state = reactive({
      inputRef: null
    });
    const externalHooks = useExternalHooks();
    function focus() {
      var _a;
      (_a = state.inputRef) == null ? void 0 : _a.focus();
    }
    function onInput(event) {
      const input = event.target;
      emit("update:modelValue", input.value);
    }
    function clear2() {
      emit("update:modelValue", "");
    }
    onMounted(() => {
      void externalHooks.run("nodeCreatorSearchBar.mount", { inputRef: state.inputRef });
      setTimeout(focus, 0);
    });
    onBeforeUnmount(() => {
      var _a;
      (_a = state.inputRef) == null ? void 0 : _a.remove();
    });
    const { inputRef } = toRefs(state);
    __expose({
      focus
    });
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.searchContainer),
        "data-test-id": "search-bar"
      }, [
        createBaseVNode("div", {
          class: normalizeClass({ [_ctx.$style.prefix]: true, [_ctx.$style.active]: _ctx.modelValue.length > 0 })
        }, [
          createVNode(_component_font_awesome_icon, {
            icon: "search",
            size: "sm"
          })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.text)
        }, [
          createBaseVNode("input", {
            placeholder: _ctx.placeholder,
            value: _ctx.modelValue,
            class: normalizeClass(_ctx.$style.input),
            ref_key: "inputRef",
            ref: inputRef,
            autofocus: "",
            "data-test-id": "node-creator-search-bar",
            tabindex: "0",
            onInput
          }, null, 42, _hoisted_1$9)
        ], 2),
        _ctx.modelValue.length > 0 ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.suffix),
          onClick: clear2
        }, [
          createBaseVNode("button", {
            class: normalizeClass([_ctx.$style.clear, _ctx.$style.clickable])
          }, [
            createVNode(_component_font_awesome_icon, { icon: "times-circle" })
          ], 2)
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const searchContainer = "_searchContainer_1wh9v_5";
const prefix = "_prefix_1wh9v_21";
const active$3 = "_active_1wh9v_26";
const text = "_text_1wh9v_30";
const suffix = "_suffix_1wh9v_46";
const clear = "_clear_1wh9v_52";
const style0$d = {
  searchContainer,
  prefix,
  active: active$3,
  text,
  suffix,
  clear
};
const cssModules$d = {
  "$style": style0$d
};
const SearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__cssModules", cssModules$d]]);
const _hoisted_1$8 = ["innerHTML"];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "NodeItem",
  props: {
    nodeType: {},
    subcategory: {},
    active: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const i18n2 = useI18n();
    const telemetry = useTelemetry();
    const { actions } = useNodeCreatorStore();
    const { getAddedNodesAndConnections } = useActions();
    const dragging = ref(false);
    const draggablePosition = ref({ x: -100, y: -100 });
    const draggableDataTransfer2 = ref(null);
    const description = computed(() => {
      if (props.subcategory === DEFAULT_SUBCATEGORY && !props.nodeType.name.startsWith(CREDENTIAL_ONLY_NODE_PREFIX)) {
        return "";
      }
      return i18n2.headerText({
        key: `headers.${shortNodeType.value}.description`,
        fallback: props.nodeType.description
      });
    });
    const showActionArrow = computed(() => hasActions.value);
    const dataTestId = computed(
      () => hasActions.value ? "node-creator-action-item" : "node-creator-node-item"
    );
    const hasActions = computed(() => {
      return nodeActions.value.length > 1;
    });
    const nodeActions = computed(() => {
      const nodeActions2 = actions[props.nodeType.name] || [];
      return nodeActions2;
    });
    const shortNodeType = computed(() => i18n2.shortNodeType(props.nodeType.name) || "");
    const draggableStyle = computed(() => ({
      top: `${draggablePosition.value.y}px`,
      left: `${draggablePosition.value.x}px`
    }));
    const isCommunityNode = computed(() => isCommunityPackageName(props.nodeType.name));
    const displayName = computed(() => {
      const displayName2 = props.nodeType.displayName.trimEnd();
      return i18n2.headerText({
        key: `headers.${shortNodeType.value}.displayName`,
        fallback: hasActions.value ? displayName2.replace("Trigger", "") : displayName2
      });
    });
    const isSubNode = computed(() => {
      if (!props.nodeType.outputs || typeof props.nodeType.outputs === "string") {
        return false;
      }
      const outputTypes = getConnectionTypes(props.nodeType.outputs);
      return outputTypes ? outputTypes.filter((output) => output !== NodeConnectionType.Main).length > 0 : false;
    });
    const isTrigger = computed(() => {
      return props.nodeType.group.includes("trigger") && !hasActions.value;
    });
    function onDragStart(event) {
      document.body.addEventListener("dragover", onDragOver);
      const { pageX: x, pageY: y } = event;
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";
        event.dataTransfer.setDragImage(draggableDataTransfer2.value, 0, 0);
        event.dataTransfer.setData(
          DRAG_EVENT_DATA_KEY,
          JSON.stringify(getAddedNodesAndConnections([{ type: props.nodeType.name }]))
        );
      }
      dragging.value = true;
      draggablePosition.value = { x, y };
    }
    function onDragOver(event) {
      if (!dragging.value || event.pageX === 0 && event.pageY === 0) {
        return;
      }
      const [x, y] = getNewNodePosition([], [event.pageX - NODE_SIZE / 2, event.pageY - NODE_SIZE / 2]);
      draggablePosition.value = { x, y };
    }
    function onDragEnd(event) {
      document.body.removeEventListener("dragover", onDragOver);
      dragging.value = false;
      setTimeout(() => {
        draggablePosition.value = { x: -100, y: -100 };
      }, 300);
    }
    function onCommunityNodeTooltipClick(event) {
      if (event.target.localName === "a") {
        telemetry.track("user clicked cnr docs link", { source: "nodes panel node" });
      }
    }
    return (_ctx, _cache) => {
      const _component_n8n_node_creator_node = resolveComponent("n8n-node-creator-node");
      return openBlock(), createBlock(_component_n8n_node_creator_node, {
        draggable: !showActionArrow.value,
        onDragstart: onDragStart,
        onDragend: onDragEnd,
        class: normalizeClass(_ctx.$style.nodeItem),
        description: description.value,
        title: displayName.value,
        "show-action-arrow": showActionArrow.value,
        "is-trigger": isTrigger.value,
        "data-test-id": dataTestId.value
      }, createSlots({
        icon: withCtx(() => [
          isSubNode.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.subNodeBackground)
          }, null, 2)) : createCommentVNode("", true),
          createVNode(NodeIcon, {
            class: normalizeClass(_ctx.$style.nodeIcon),
            nodeType: _ctx.nodeType
          }, null, 8, ["class", "nodeType"])
        ]),
        dragContent: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.draggableDataTransfer),
            ref_key: "draggableDataTransfer",
            ref: draggableDataTransfer2
          }, null, 2),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.draggable),
            style: normalizeStyle(draggableStyle.value)
          }, [
            createVNode(NodeIcon, {
              nodeType: _ctx.nodeType,
              onClickCapture: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"])),
              size: 40,
              shrink: false
            }, null, 8, ["nodeType"])
          ], 6), [
            [vShow, dragging.value]
          ])
        ]),
        _: 2
      }, [
        isCommunityNode.value ? {
          name: "tooltip",
          fn: withCtx(() => [
            createBaseVNode("p", {
              class: normalizeClass(_ctx.$style.communityNodeIcon),
              innerHTML: unref(i18n2).baseText("generic.communityNode.tooltip", {
                interpolate: {
                  packageName: _ctx.nodeType.name.split(".")[0],
                  docURL: unref(COMMUNITY_NODES_INSTALLATION_DOCS_URL)
                }
              }),
              onClick: onCommunityNodeTooltipClick
            }, null, 10, _hoisted_1$8)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["draggable", "class", "description", "title", "show-action-arrow", "is-trigger", "data-test-id"]);
    };
  }
});
const nodeItem = "_nodeItem_da0t4_5";
const nodeIcon$2 = "_nodeIcon_da0t4_13";
const subNodeBackground = "_subNodeBackground_da0t4_17";
const communityNodeIcon = "_communityNodeIcon_da0t4_27";
const draggable$1 = "_draggable_da0t4_31";
const draggableDataTransfer$1 = "_draggableDataTransfer_da0t4_45";
const style0$c = {
  nodeItem,
  nodeIcon: nodeIcon$2,
  subNodeBackground,
  communityNodeIcon,
  draggable: draggable$1,
  draggableDataTransfer: draggableDataTransfer$1
};
const cssModules$c = {
  "$style": style0$c
};
const NodeItem = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__cssModules", cssModules$c]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "SubcategoryItem",
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const i18n2 = useI18n();
    const subcategoryName = computed(() => camelCase(props.item.subcategory || props.item.title));
    return (_ctx, _cache) => {
      const _component_n8n_node_icon = resolveComponent("n8n-node-icon");
      const _component_n8n_node_creator_node = resolveComponent("n8n-node-creator-node");
      return openBlock(), createBlock(_component_n8n_node_creator_node, {
        class: normalizeClass(_ctx.$style.subCategory),
        title: unref(i18n2).baseText(`nodeCreator.subcategoryNames.${subcategoryName.value}`),
        isTrigger: false,
        description: unref(i18n2).baseText(`nodeCreator.subcategoryDescriptions.${subcategoryName.value}`),
        showActionArrow: true
      }, {
        icon: withCtx(() => [
          createVNode(_component_n8n_node_icon, mergeProps({
            type: "icon",
            name: _ctx.item.icon,
            circle: false,
            showTooltip: false
          }, _ctx.item.iconProps), null, 16, ["name"])
        ]),
        _: 1
      }, 8, ["class", "title", "description"]);
    };
  }
});
const subCategory = "_subCategory_1js79_5";
const style0$b = {
  subCategory
};
const cssModules$b = {
  "$style": style0$b
};
const SubcategoryItem = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__cssModules", cssModules$b]]);
const _hoisted_1$7 = ["textContent"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "LabelItem",
  props: {
    item: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.label)
      }, [
        createBaseVNode("span", {
          class: normalizeClass(_ctx.$style.name),
          textContent: toDisplayString(_ctx.item.key)
        }, null, 10, _hoisted_1$7)
      ], 2);
    };
  }
});
const label$1 = "_label_92wv5_5";
const style0$a = {
  label: label$1
};
const cssModules$a = {
  "$style": style0$a
};
const LabelItem = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__cssModules", cssModules$a]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ActionItem",
  props: {
    nodeType: {},
    action: {}
  },
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const telemetry = instance == null ? void 0 : instance.proxy.$telemetry;
    const { getActionData, getAddedNodesAndConnections, setAddedNodeActionParameters } = useActions();
    const { activeViewStack } = useViewStacks();
    const state = reactive({
      dragging: false,
      draggablePosition: {
        x: -100,
        y: -100
      },
      storeWatcher: null,
      draggableDataTransfer: null
    });
    const draggableStyle = computed(() => ({
      top: `${state.draggablePosition.y}px`,
      left: `${state.draggablePosition.x}px`
    }));
    const actionData = computed(() => getActionData(props.action));
    const isTriggerAction = (action2) => {
      var _a;
      return ((_a = action2.name) == null ? void 0 : _a.toLowerCase().includes("trigger")) || action2.name === WEBHOOK_NODE_TYPE;
    };
    function onDragStart(event) {
      document.body.addEventListener("dragover", onDragOver);
      const { pageX: x, pageY: y } = event;
      if (event.dataTransfer && actionData.value.key) {
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";
        event.dataTransfer.setDragImage(state.draggableDataTransfer, 0, 0);
        event.dataTransfer.setData(
          DRAG_EVENT_DATA_KEY,
          JSON.stringify(getAddedNodesAndConnections([{ type: actionData.value.key }]))
        );
        if (telemetry) {
          state.storeWatcher = setAddedNodeActionParameters(
            actionData.value,
            telemetry,
            activeViewStack.rootView
          );
        }
        document.body.addEventListener("dragend", onDragEnd);
      }
      state.dragging = true;
      state.draggablePosition = { x, y };
    }
    function onDragOver(event) {
      if (!state.dragging || event.pageX === 0 && event.pageY === 0) {
        return;
      }
      const [x, y] = getNewNodePosition([], [event.pageX - NODE_SIZE / 2, event.pageY - NODE_SIZE / 2]);
      state.draggablePosition = { x, y };
    }
    function onDragEnd(event) {
      if (state.storeWatcher)
        state.storeWatcher();
      document.body.removeEventListener("dragend", onDragEnd);
      document.body.removeEventListener("dragover", onDragOver);
      state.dragging = false;
      setTimeout(() => {
        state.draggablePosition = { x: -100, y: -100 };
      }, 300);
    }
    const { draggableDataTransfer: draggableDataTransfer2, dragging } = toRefs(state);
    return (_ctx, _cache) => {
      const _component_n8n_node_creator_node = resolveComponent("n8n-node-creator-node");
      return openBlock(), createBlock(_component_n8n_node_creator_node, {
        onDragstart: onDragStart,
        onDragend: onDragEnd,
        draggable: "",
        class: normalizeClass(_ctx.$style.action),
        title: _ctx.action.displayName,
        isTrigger: isTriggerAction(_ctx.action),
        "data-keyboard-nav": "true"
      }, {
        dragContent: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.draggableDataTransfer),
            ref_key: "draggableDataTransfer",
            ref: draggableDataTransfer2
          }, null, 2),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.draggable),
            style: normalizeStyle(draggableStyle.value)
          }, [
            createVNode(NodeIcon, {
              nodeType: _ctx.nodeType,
              onClickCapture: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"])),
              size: 40,
              shrink: false
            }, null, 8, ["nodeType"])
          ], 6), [
            [vShow, unref(dragging)]
          ])
        ]),
        icon: withCtx(() => [
          createVNode(NodeIcon, { nodeType: _ctx.action }, null, 8, ["nodeType"])
        ]),
        _: 1
      }, 8, ["class", "title", "isTrigger"]);
    };
  }
});
const action$1 = "_action_vsx3h_5";
const nodeIcon$1 = "_nodeIcon_vsx3h_17";
const draggable = "_draggable_vsx3h_21";
const draggableDataTransfer = "_draggableDataTransfer_vsx3h_35";
const style0$9 = {
  action: action$1,
  nodeIcon: nodeIcon$1,
  draggable,
  draggableDataTransfer
};
const cssModules$9 = {
  "$style": style0$9
};
const ActionItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__cssModules", cssModules$9]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ViewItem",
  props: {
    view: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n8n_node_icon = resolveComponent("n8n-node-icon");
      const _component_n8n_node_creator_node = resolveComponent("n8n-node-creator-node");
      return openBlock(), createBlock(_component_n8n_node_creator_node, {
        class: normalizeClass(_ctx.$style.view),
        title: _ctx.view.title,
        isTrigger: false,
        description: _ctx.view.description,
        showActionArrow: true
      }, {
        icon: withCtx(() => [
          createVNode(_component_n8n_node_icon, {
            type: "icon",
            name: _ctx.view.icon,
            circle: false,
            showTooltip: false
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["class", "title", "description"]);
    };
  }
});
const view$1 = "_view_5t09j_5";
const style0$8 = {
  view: view$1
};
const cssModules$8 = {
  "$style": style0$8
};
const ViewItem = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__cssModules", cssModules$8]]);
const _hoisted_1$6 = ["data-keyboard-nav-type", "data-keyboard-nav-id", "onClick"];
const _hoisted_2$5 = { key: 0 };
const LAZY_LOAD_THRESHOLD = 20;
const LAZY_LOAD_ITEMS_PER_TICK = 5;
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ItemsRenderer",
  props: {
    elements: { default: () => [] },
    activeIndex: {},
    disabled: { type: Boolean },
    lazyRender: { type: Boolean, default: true }
  },
  emits: ["selected", "dragstart", "dragend"],
  setup(__props, { emit }) {
    const props = __props;
    const renderedItems2 = ref([]);
    const renderAnimationRequest = ref(0);
    const activeItemId = computed(() => {
      var _a;
      return (_a = useKeyboardNavigation()) == null ? void 0 : _a.activeItemId;
    });
    function renderItems() {
      if (props.elements.length <= LAZY_LOAD_THRESHOLD || !props.lazyRender) {
        renderedItems2.value = props.elements;
        return;
      }
      if (renderedItems2.value.length < props.elements.length) {
        renderedItems2.value.push(
          ...props.elements.slice(
            renderedItems2.value.length,
            renderedItems2.value.length + LAZY_LOAD_ITEMS_PER_TICK
          )
        );
        renderAnimationRequest.value = window.requestAnimationFrame(renderItems);
      }
    }
    function wrappedEmit(event, element, $e) {
      if (props.disabled)
        return;
      emit(event, element, $e);
    }
    function beforeEnter(el) {
      el.style.height = "0";
    }
    function enter(el) {
      el.style.height = `${el.scrollHeight}px`;
    }
    function beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`;
    }
    function leave(el) {
      el.style.height = "0";
    }
    onMounted(() => {
      renderItems();
    });
    onUnmounted(() => {
      window.cancelAnimationFrame(renderAnimationRequest.value);
      renderedItems2.value = [];
    });
    watch(
      () => props.elements,
      () => {
        window.cancelAnimationFrame(renderAnimationRequest.value);
        renderedItems2.value = [];
        renderItems();
      }
    );
    return (_ctx, _cache) => {
      const _component_n8n_loading = resolveComponent("n8n-loading");
      return _ctx.elements.length > 0 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.itemsRenderer),
        name: "accordion",
        onBeforeEnter: beforeEnter,
        onEnter: enter,
        onBeforeLeave: beforeLeave,
        onLeave: leave
      }, [
        renderSlot(_ctx.$slots, "default"),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.elements, (item) => {
          return openBlock(), createElementBlock("div", {
            key: item.uuid,
            "data-test-id": "item-iterator-item",
            class: normalizeClass({
              clickable: !_ctx.disabled,
              [_ctx.$style.active]: activeItemId.value === item.uuid,
              [_ctx.$style.iteratorItem]: true,
              [_ctx.$style[item.type]]: true
            }),
            ref_for: true,
            ref: "iteratorItems",
            "data-keyboard-nav-type": item.type !== "label" ? item.type : void 0,
            "data-keyboard-nav-id": item.uuid,
            onClick: ($event) => wrappedEmit("selected", item)
          }, [
            renderedItems2.value.includes(item) ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
              item.type === "label" ? (openBlock(), createBlock(LabelItem, {
                key: 0,
                item
              }, null, 8, ["item"])) : createCommentVNode("", true),
              item.type === "subcategory" ? (openBlock(), createBlock(SubcategoryItem, {
                key: 1,
                item: item.properties
              }, null, 8, ["item"])) : createCommentVNode("", true),
              item.type === "node" ? (openBlock(), createBlock(NodeItem, {
                key: 2,
                nodeType: item.properties,
                active: true,
                subcategory: item.subcategory
              }, null, 8, ["nodeType", "subcategory"])) : createCommentVNode("", true),
              item.type === "action" ? (openBlock(), createBlock(ActionItem, {
                key: 3,
                nodeType: item.properties,
                action: item.properties,
                active: true
              }, null, 8, ["nodeType", "action"])) : item.type === "view" ? (openBlock(), createBlock(ViewItem, {
                key: 4,
                view: item.properties,
                class: normalizeClass(_ctx.$style.viewItem)
              }, null, 8, ["view", "class"])) : createCommentVNode("", true)
            ])) : (openBlock(), createBlock(_component_n8n_loading, {
              key: 1,
              loading: true,
              rows: 1,
              variant: "p",
              class: normalizeClass(_ctx.$style.itemSkeleton)
            }, null, 8, ["class"]))
          ], 10, _hoisted_1$6);
        }), 128))
      ], 34)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.empty)
      }, [
        renderSlot(_ctx.$slots, "empty")
      ], 2));
    };
  }
});
const itemSkeleton = "_itemSkeleton_mfosb_5";
const iteratorItem = "_iteratorItem_mfosb_9";
const label = "_label_mfosb_21";
const category$1 = "_category_mfosb_21";
const active$2 = "_active_mfosb_24";
const empty = "_empty_mfosb_28";
const itemsRenderer = "_itemsRenderer_mfosb_32";
const view = "_view_mfosb_41";
const style0$7 = {
  itemSkeleton,
  iteratorItem,
  label,
  category: category$1,
  active: active$2,
  empty,
  itemsRenderer,
  view
};
const cssModules$7 = {
  "$style": style0$7
};
const ItemsRenderer = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__cssModules", cssModules$7]]);
const _hoisted_1$5 = ["textContent"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CategoryItem",
  props: {
    expanded: { type: Boolean, default: true },
    active: { type: Boolean },
    count: {},
    name: {},
    isTrigger: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const categoryName = computed(() => {
      const itemsCount = props.count || 0;
      return itemsCount > 0 ? `${props.name} (${itemsCount})` : props.name;
    });
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      return openBlock(), createElementBlock("div", mergeProps({
        class: _ctx.$style.categoryWrapper
      }, _ctx.$attrs, {
        "data-keyboard-nav": "true",
        "data-test-id": "node-creator-category-item"
      }), [
        createBaseVNode("div", {
          class: normalizeClass({ [_ctx.$style.category]: true, [_ctx.$style.active]: _ctx.active })
        }, [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.name)
          }, [
            createBaseVNode("span", {
              textContent: toDisplayString(categoryName.value)
            }, null, 8, _hoisted_1$5),
            _ctx.isTrigger ? (openBlock(), createBlock(_component_font_awesome_icon, {
              key: 0,
              icon: "bolt",
              size: "xs",
              class: normalizeClass(_ctx.$style.triggerIcon)
            }, null, 8, ["class"])) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "default")
          ], 2),
          _ctx.expanded ? (openBlock(), createBlock(_component_font_awesome_icon, {
            key: 0,
            icon: "chevron-down",
            class: normalizeClass(_ctx.$style.arrow)
          }, null, 8, ["class"])) : (openBlock(), createBlock(_component_font_awesome_icon, {
            key: 1,
            class: normalizeClass(_ctx.$style.arrow),
            icon: "chevron-up"
          }, null, 8, ["class"]))
        ], 2)
      ], 16);
    };
  }
});
const triggerIcon = "_triggerIcon_jzfdi_5";
const category = "_category_jzfdi_10";
const active$1 = "_active_jzfdi_31";
const name = "_name_jzfdi_35";
const arrow = "_arrow_jzfdi_40";
const style0$6 = {
  triggerIcon,
  category,
  active: active$1,
  name,
  arrow
};
const cssModules$6 = {
  "$style": style0$6
};
const CategoryItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__cssModules", cssModules$6]]);
const _hoisted_1$4 = ["data-category-collapsed"];
const _hoisted_2$4 = ["innerHTML"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CategorizedItemsRenderer",
  props: {
    elements: { default: () => [] },
    category: {},
    disabled: { type: Boolean },
    activeIndex: {},
    isTriggerCategory: { type: Boolean },
    mouseOverTooltip: {},
    expanded: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const { popViewStack } = useViewStacks();
    const { registerKeyHook } = useKeyboardNavigation();
    const { workflowId } = useWorkflowsStore();
    const activeItemId = computed(() => {
      var _a;
      return (_a = useKeyboardNavigation()) == null ? void 0 : _a.activeItemId;
    });
    const actionCount = computed(() => props.elements.filter(({ type }) => type === "action").length);
    const expanded = ref(props.expanded ?? false);
    function toggleExpanded() {
      setExpanded(!expanded.value);
    }
    function setExpanded(isExpanded) {
      expanded.value = isExpanded;
      if (expanded.value) {
        instance == null ? void 0 : instance.proxy.$telemetry.trackNodesPanel("nodeCreateList.onCategoryExpanded", {
          category_name: props.category,
          workflow_id: workflowId
        });
      }
    }
    function arrowRight() {
      if (expanded.value)
        return;
      setExpanded(true);
    }
    function arrowLeft() {
      if (!expanded.value) {
        popViewStack();
        return;
      }
      setExpanded(false);
    }
    watch(
      () => props.elements,
      () => {
        setExpanded(true);
      }
    );
    registerKeyHook(`CategoryRight_${props.category}`, {
      keyboardKeys: ["ArrowRight"],
      condition: (type, activeItemId2) => type === "category" && props.category === activeItemId2,
      handler: arrowRight
    });
    registerKeyHook(`CategoryToggle_${props.category}`, {
      keyboardKeys: ["Enter"],
      condition: (type, activeItemId2) => type === "category" && props.category === activeItemId2,
      handler: toggleExpanded
    });
    registerKeyHook(`CategoryLeft_${props.category}`, {
      keyboardKeys: ["ArrowLeft"],
      condition: (type, activeItemId2) => type === "category" && props.category === activeItemId2,
      handler: arrowLeft
    });
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.categorizedItemsRenderer),
        "data-category-collapsed": !expanded.value
      }, [
        createVNode(CategoryItem, {
          class: normalizeClass(_ctx.$style.categoryItem),
          name: _ctx.category,
          disabled: _ctx.disabled,
          active: activeItemId.value === _ctx.category,
          count: actionCount.value,
          expanded: expanded.value,
          isTrigger: _ctx.isTriggerCategory,
          "data-keyboard-nav-type": "category",
          "data-keyboard-nav-id": _ctx.category,
          onClick: toggleExpanded
        }, {
          default: withCtx(() => [
            _ctx.mouseOverTooltip ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(_ctx.$style.mouseOverTooltip)
            }, [
              createVNode(_component_n8n_tooltip, {
                placement: "top",
                "popper-class": _ctx.$style.tooltipPopper
              }, {
                content: withCtx(() => [
                  createBaseVNode("div", { innerHTML: _ctx.mouseOverTooltip }, null, 8, _hoisted_2$4)
                ]),
                default: withCtx(() => [
                  createVNode(_component_n8n_icon, {
                    icon: "question-circle",
                    size: "small"
                  })
                ]),
                _: 1
              }, 8, ["popper-class"])
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class", "name", "disabled", "active", "count", "expanded", "isTrigger", "data-keyboard-nav-id"]),
        expanded.value && actionCount.value > 0 && _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.contentSlot)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)) : createCommentVNode("", true),
        expanded.value ? (openBlock(), createBlock(ItemsRenderer, mergeProps({ key: 1 }, _ctx.$attrs, {
          elements: _ctx.elements,
          isTrigger: _ctx.isTriggerCategory
        }), {
          default: withCtx(() => []),
          empty: withCtx(() => [
            renderSlot(_ctx.$slots, "empty", normalizeProps(guardReactiveProps({ elements: _ctx.elements })))
          ]),
          _: 3
        }, 16, ["elements", "isTrigger"])) : createCommentVNode("", true)
      ], 10, _hoisted_1$4);
    };
  }
});
const mouseOverTooltip = "_mouseOverTooltip_omnnb_5";
const categorizedItemsRenderer = "_categorizedItemsRenderer_omnnb_13";
const tooltipPopper = "_tooltipPopper_omnnb_17";
const contentSlot = "_contentSlot_omnnb_21";
const style0$5 = {
  mouseOverTooltip,
  categorizedItemsRenderer,
  tooltipPopper,
  contentSlot
};
const cssModules$5 = {
  "$style": style0$5
};
const CategorizedItemsRenderer = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__cssModules", cssModules$5]]);
const _hoisted_1$3 = ["innerHTML"];
const _hoisted_2$3 = ["innerHTML"];
const _hoisted_3 = ["innerHTML"];
const _hoisted_4$1 = ["innerHTML"];
const _hoisted_5 = ["onClick", "innerHTML"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ActionsMode",
  emits: {
    nodeTypeSelected: (nodeTypes) => true
  },
  setup(__props, { emit }) {
    const instance = getCurrentInstance();
    const telemetry = instance == null ? void 0 : instance.proxy.$telemetry;
    const { userActivated } = useUsersStore();
    const { popViewStack, updateCurrentViewStack } = useViewStacks();
    const { registerKeyHook } = useKeyboardNavigation();
    const {
      getNodeTypesWithManualTrigger,
      setAddedNodeActionParameters,
      getActionData,
      getPlaceholderTriggerActions,
      parseCategoryActions,
      actionsCategoryLocales
    } = useActions();
    const parsedTriggerActions = computed(
      () => parseActions(actions.value, actionsCategoryLocales.value.triggers, false)
    );
    const parsedActionActions = computed(
      () => parseActions(actions.value, actionsCategoryLocales.value.actions, !search.value)
    );
    const parsedTriggerActionsBaseline = computed(
      () => parseActions(
        useViewStacks().activeViewStack.baselineItems || [],
        actionsCategoryLocales.value.triggers,
        false
      )
    );
    const parsedActionActionsBaseline = computed(
      () => parseActions(
        useViewStacks().activeViewStack.baselineItems || [],
        actionsCategoryLocales.value.actions,
        !search.value
      )
    );
    const triggerCategoryName = computed(
      () => parsedTriggerActions.value.length || search.value ? actionsCategoryLocales.value.triggers : `${actionsCategoryLocales.value.triggers} (${placeholderTriggerActions.length})`
    );
    const actions = computed(() => {
      return (useViewStacks().activeViewStack.items || []).filter(
        (p) => p.properties.actionKey !== CUSTOM_API_CALL_KEY
      );
    });
    const search = computed(() => useViewStacks().activeViewStack.search);
    const subcategory = computed(() => useViewStacks().activeViewStack.subcategory);
    const rootView = computed(() => useViewStacks().activeViewStack.rootView);
    const placeholderTriggerActions = getPlaceholderTriggerActions(subcategory.value || "");
    const hasNoTriggerActions = computed(
      () => parseCategoryActions(
        useViewStacks().activeViewStack.baselineItems || [],
        actionsCategoryLocales.value.triggers,
        !search.value
      ).length === 0
    );
    const containsAPIAction = computed(() => {
      const actions2 = useViewStacks().activeViewStack.baselineItems || [];
      const result = actions2.some((p) => {
        return (p.properties.actionKey ?? "") === CUSTOM_API_CALL_KEY;
      });
      return result;
    });
    const isTriggerRootView = computed(() => rootView.value === TRIGGER_NODE_CREATOR_VIEW);
    registerKeyHook("ActionsKeyRight", {
      keyboardKeys: ["ArrowRight", "Enter"],
      condition: (type) => type === "action",
      handler: onKeySelect
    });
    registerKeyHook("ActionsKeyLeft", {
      keyboardKeys: ["ArrowLeft"],
      condition: (type) => type === "action",
      handler: arrowLeft
    });
    function parseActions(base, locale, withLabels = false) {
      return parseCategoryActions(base, locale, withLabels);
    }
    function arrowLeft() {
      popViewStack();
    }
    function onKeySelect(activeItemId) {
      const mergedActions = [...actions.value, ...placeholderTriggerActions];
      const activeAction = mergedActions.find((a) => a.uuid === activeItemId);
      if (activeAction)
        onSelected(activeAction);
    }
    function onSelected(actionCreateElement) {
      const actionData = getActionData(actionCreateElement.properties);
      const isPlaceholderTriggerAction = placeholderTriggerActions.some(
        (p) => p.key === actionCreateElement.key
      );
      if (isPlaceholderTriggerAction && isTriggerRootView.value) {
        const actionNode = actions.value[0].key;
        emit("nodeTypeSelected", [actionData.key, actionNode]);
      } else {
        emit("nodeTypeSelected", [actionData.key]);
      }
      if (telemetry)
        setAddedNodeActionParameters(actionData, telemetry, rootView.value);
    }
    function trackActionsView() {
      var _a, _b, _c;
      const activeViewStack = useViewStacks().activeViewStack;
      const trigger_action_count = (_a = activeViewStack.baselineItems || []) == null ? void 0 : _a.filter(
        (action2) => action2.key.toLowerCase().includes("trigger")
      ).length;
      const appIdentifier = [...actions.value, ...placeholderTriggerActions][0].key;
      const trackingPayload = {
        app_identifier: appIdentifier,
        actions: (_b = activeViewStack.baselineItems || []) == null ? void 0 : _b.map(
          (action2) => action2.properties.displayName
        ),
        regular_action_count: ((_c = activeViewStack.baselineItems || []) == null ? void 0 : _c.length) - trigger_action_count,
        trigger_action_count
      };
      void runExternalHook("nodeCreateList.onViewActions", trackingPayload);
      telemetry == null ? void 0 : telemetry.trackNodesPanel("nodeCreateList.onViewActions", trackingPayload);
    }
    function resetSearch2() {
      updateCurrentViewStack({ search: "" });
    }
    function addHttpNode() {
      const updateData = {
        name: "",
        key: HTTP_REQUEST_NODE_TYPE,
        value: {
          authentication: "predefinedCredentialType"
        }
      };
      emit("nodeTypeSelected", [HTTP_REQUEST_NODE_TYPE]);
      if (telemetry)
        setAddedNodeActionParameters(updateData);
      const app_identifier = actions.value[0].key;
      void runExternalHook("nodeCreateList.onActionsCustmAPIClicked", {
        app_identifier
      });
      telemetry == null ? void 0 : telemetry.trackNodesPanel("nodeCreateList.onActionsCustmAPIClicked", { app_identifier });
    }
    const OrderSwitcher = defineComponent({
      props: {
        rootView: {
          type: String
        }
      },
      setup(props, { slots }) {
        return () => {
          var _a, _b, _c, _d;
          return h(
            "div",
            {},
            props.rootView === REGULAR_NODE_CREATOR_VIEW ? [(_a = slots.actions) == null ? void 0 : _a.call(slots), (_b = slots.triggers) == null ? void 0 : _b.call(slots)] : [(_c = slots.triggers) == null ? void 0 : _c.call(slots), (_d = slots.actions) == null ? void 0 : _d.call(slots)]
          );
        };
      }
    });
    onMounted(() => {
      trackActionsView();
    });
    return (_ctx, _cache) => {
      const _component_n8n_callout = resolveComponent("n8n-callout");
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createVNode(unref(OrderSwitcher), { rootView: rootView.value }, createSlots({ _: 2 }, [
          isTriggerRootView.value || parsedTriggerActionsBaseline.value.length !== 0 ? {
            name: "triggers",
            fn: withCtx(() => [
              createVNode(CategorizedItemsRenderer, {
                elements: parsedTriggerActions.value,
                category: triggerCategoryName.value,
                mouseOverTooltip: _ctx.$locale.baseText("nodeCreator.actionsTooltip.triggersStartWorkflow"),
                isTriggerCategory: "",
                expanded: isTriggerRootView.value || parsedActionActions.value.length === 0,
                onSelected
              }, createSlots({ _: 2 }, [
                hasNoTriggerActions.value ? {
                  name: "empty",
                  fn: withCtx(() => [
                    hasNoTriggerActions.value ? (openBlock(), createBlock(_component_n8n_callout, {
                      key: 0,
                      theme: "info",
                      iconless: "",
                      slim: "",
                      "data-test-id": "actions-panel-no-triggers-callout"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("span", {
                          innerHTML: _ctx.$locale.baseText("nodeCreator.actionsCallout.noTriggerItems", {
                            interpolate: { nodeName: subcategory.value }
                          })
                        }, null, 8, _hoisted_1$3)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(ItemsRenderer, {
                      onSelected,
                      elements: unref(placeholderTriggerActions)
                    }, null, 8, ["elements"])
                  ]),
                  key: "0"
                } : {
                  name: "empty",
                  fn: withCtx(() => [
                    createBaseVNode("p", {
                      class: normalizeClass(_ctx.$style.resetSearch),
                      innerHTML: _ctx.$locale.baseText("nodeCreator.actionsCategory.noMatchingTriggers"),
                      onClick: resetSearch2
                    }, null, 10, ["innerHTML"])
                  ]),
                  key: "1"
                }
              ]), 1032, ["elements", "category", "mouseOverTooltip", "expanded"])
            ]),
            key: "0"
          } : void 0,
          !isTriggerRootView.value || parsedActionActionsBaseline.value.length !== 0 ? {
            name: "actions",
            fn: withCtx(() => [
              createVNode(CategorizedItemsRenderer, {
                elements: parsedActionActions.value,
                category: unref(actionsCategoryLocales).actions,
                mouseOverTooltip: _ctx.$locale.baseText("nodeCreator.actionsTooltip.actionsPerformStep"),
                expanded: !isTriggerRootView.value || parsedTriggerActions.value.length === 0,
                onSelected
              }, {
                empty: withCtx(() => [
                  !search.value ? (openBlock(), createBlock(_component_n8n_info_tip, {
                    key: 0,
                    theme: "info",
                    type: "note",
                    class: normalizeClass(_ctx.$style.actionsEmpty)
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", {
                        innerHTML: _ctx.$locale.baseText("nodeCreator.actionsCallout.noActionItems", {
                          interpolate: { nodeName: subcategory.value }
                        })
                      }, null, 8, _hoisted_3)
                    ]),
                    _: 1
                  }, 8, ["class"])) : (openBlock(), createElementBlock("p", {
                    key: 1,
                    class: normalizeClass(_ctx.$style.resetSearch),
                    innerHTML: _ctx.$locale.baseText("nodeCreator.actionsCategory.noMatchingActions"),
                    onClick: resetSearch2,
                    "data-test-id": "actions-panel-no-matching-actions"
                  }, null, 10, _hoisted_4$1))
                ]),
                default: withCtx(() => [
                  !unref(userActivated) && isTriggerRootView.value ? (openBlock(), createBlock(_component_n8n_callout, {
                    key: 0,
                    theme: "info",
                    iconless: "",
                    slim: "",
                    "data-test-id": "actions-panel-activation-callout"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", {
                        innerHTML: _ctx.$locale.baseText("nodeCreator.actionsCallout.triggersStartWorkflow")
                      }, null, 8, _hoisted_2$3)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["elements", "category", "mouseOverTooltip", "expanded"])
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["rootView"]),
        containsAPIAction.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.apiHint)
        }, [
          createBaseVNode("span", {
            onClick: withModifiers(addHttpNode, ["prevent"]),
            innerHTML: _ctx.$locale.baseText("nodeCreator.actionsList.apiCall", {
              interpolate: { node: subcategory.value }
            })
          }, null, 8, _hoisted_5)
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const container = "_container_1tz2w_5";
const resetSearch = "_resetSearch_1tz2w_11";
const actionsEmpty = "_actionsEmpty_1tz2w_25";
const apiHint = "_apiHint_1tz2w_33";
const style0$4 = {
  container,
  resetSearch,
  actionsEmpty,
  apiHint
};
const cssModules$4 = {
  "$style": style0$4
};
const ActionsRenderer = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__cssModules", cssModules$4]]);
const _sfc_main$4 = {};
const _hoisted_1$2 = {
  width: "75px",
  height: "75px",
  viewBox: "0 0 75 75",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink"
};
const _hoisted_2$2 = /* @__PURE__ */ createStaticVNode('<title>no-nodes-keyart</title><g id="Nodes-panel-prototype-V2.1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="nodes-panel-(component)" transform="translate(-2085.000000, -352.000000)"><g id="nodes_panel" transform="translate(1880.000000, 151.000000)"><g id="Panel" transform="translate(50.000000, 0.000000)"><g id="Group-3" transform="translate(105.000000, 171.000000)"><g id="no-nodes-keyart" transform="translate(50.000000, 30.000000)"><rect id="Rectangle" x="0" y="0" width="75" height="75"></rect><g id="Group" transform="translate(6.562500, 8.164062)" fill="#C4C8D1" fill-rule="nonzero"><polygon id="Rectangle" transform="translate(49.192016, 45.302553) rotate(-45.000000) translate(-49.192016, -45.302553) " points="44.5045606 32.0526802 53.8794707 32.0526802 53.8794707 58.5524261 44.5045606 58.5524261"></polygon><path d="M48.125,23.0859375 C54.15625,23.0859375 59.0625,18.1796875 59.0625,12.1484375 C59.0625,10.3359375 58.5625,8.6484375 57.78125,7.1484375 L49.34375,15.5859375 L44.6875,10.9296875 L53.125,2.4921875 C51.625,1.7109375 49.9375,1.2109375 48.125,1.2109375 C42.09375,1.2109375 37.1875,6.1171875 37.1875,12.1484375 C37.1875,13.4296875 37.4375,14.6484375 37.84375,15.7734375 L32.0625,21.5546875 L26.5,15.9921875 L28.71875,13.7734375 L24.3125,9.3671875 L30.9375,2.7421875 C27.28125,-0.9140625 21.34375,-0.9140625 17.6875,2.7421875 L6.625,13.8046875 L11.03125,18.2109375 L2.21875,18.2109375 L1.38777878e-15,20.4296875 L11.0625,31.4921875 L13.28125,29.2734375 L13.28125,20.4296875 L17.6875,24.8359375 L19.90625,22.6171875 L25.46875,28.1796875 L2.3125,51.3359375 L8.9375,57.9609375 L44.5,22.4296875 C45.625,22.8359375 46.84375,23.0859375 48.125,23.0859375 Z" id="Path"></path></g></g></g></g></g></g></g>', 2);
const _hoisted_4 = [
  _hoisted_2$2
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_4);
}
const NoResultsIcon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
const _hoisted_1$1 = ["textContent"];
const _hoisted_2$1 = ["textContent"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NoResults",
  props: {
    showIcon: { type: Boolean },
    showRequest: { type: Boolean },
    rootView: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ [_ctx.$style.noResults]: true, [_ctx.$style.iconless]: !_ctx.showIcon }),
        "data-test-id": "node-creator-no-results"
      }, [
        _ctx.showIcon ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.icon)
        }, [
          createVNode(NoResultsIcon)
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.title)
        }, [
          renderSlot(_ctx.$slots, "title"),
          createBaseVNode("p", {
            textContent: toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.weDidntMakeThatYet"))
          }, null, 8, _hoisted_1$1),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.action)
          }, [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.dontWorryYouCanProbablyDoItWithThe")) + " ", 1),
            _ctx.rootView === unref(REGULAR_NODE_CREATOR_VIEW) ? (openBlock(), createBlock(_component_n8n_link, {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("addHttpNode"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.httpRequest")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            _ctx.rootView === unref(TRIGGER_NODE_CREATOR_VIEW) ? (openBlock(), createBlock(_component_n8n_link, {
              key: 1,
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("addWebhookNode"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.webhook")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.node")), 1)
          ], 2)
        ], 2),
        _ctx.showRequest ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.$style.request)
        }, [
          createBaseVNode("p", {
            textContent: toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.wantUsToMakeItFaster"))
          }, null, 8, _hoisted_2$1),
          createBaseVNode("div", null, [
            createVNode(_component_n8n_link, { to: unref(REQUEST_NODE_FORM_URL) }, {
              default: withCtx(() => [
                createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("nodeCreator.noResults.requestTheNode")), 1),
                createTextVNode("  "),
                createBaseVNode("span", null, [
                  createVNode(_component_font_awesome_icon, {
                    class: normalizeClass(_ctx.$style.external),
                    icon: "external-link-alt",
                    title: _ctx.$locale.baseText("nodeCreator.noResults.requestTheNode")
                  }, null, 8, ["class", "title"])
                ])
              ]),
              _: 1
            }, 8, ["to"])
          ])
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const noResults = "_noResults_1jje6_5";
const title$1 = "_title_1jje6_18";
const action = "_action_1jje6_27";
const request = "_request_1jje6_28";
const icon = "_icon_1jje6_44";
const external = "_external_1jje6_50";
const style0$3 = {
  noResults,
  title: title$1,
  action,
  request,
  icon,
  external
};
const cssModules$3 = {
  "$style": style0$3
};
const NoResults = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$3]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NodesMode",
  emits: {
    nodeTypeSelected: (nodeTypes) => true
  },
  setup(__props, { emit }) {
    const i18n2 = useI18n();
    const telemetry = useTelemetry();
    const { mergedNodes, actions } = useNodeCreatorStore();
    const { baseUrl } = useRootStore();
    const { pushViewStack, popViewStack } = useViewStacks();
    const { registerKeyHook } = useKeyboardNavigation();
    const activeViewStack = computed(() => useViewStacks().activeViewStack);
    const globalSearchItemsDiff = computed(() => useViewStacks().globalSearchItemsDiff);
    function selectNodeType(nodeTypes) {
      emit("nodeTypeSelected", nodeTypes);
    }
    function onSelected(item) {
      var _a, _b;
      if (item.type === "subcategory") {
        const subcategoryKey = camelCase(item.properties.title);
        const title2 = i18n2.baseText(`nodeCreator.subcategoryNames.${subcategoryKey}`);
        pushViewStack({
          subcategory: item.key,
          title: title2,
          mode: "nodes",
          ...item.properties.icon ? {
            nodeIcon: {
              icon: item.properties.icon,
              iconType: "icon"
            }
          } : {},
          ...item.properties.panelClass ? { panelClass: item.properties.panelClass } : {},
          rootView: activeViewStack.value.rootView,
          forceIncludeNodes: item.properties.forceIncludeNodes,
          baseFilter: baseSubcategoriesFilter,
          itemsMapper: subcategoriesMapper
        });
        telemetry.trackNodesPanel("nodeCreateList.onSubcategorySelected", {
          subcategory: item.key
        });
      }
      if (item.type === "node") {
        const nodeActions = (actions == null ? void 0 : actions[item.key]) || [];
        if (nodeActions.length <= 1) {
          selectNodeType([item.key]);
          return;
        }
        const icon2 = item.properties.iconUrl ? `${baseUrl}${item.properties.iconUrl}` : (_a = item.properties.icon) == null ? void 0 : _a.split(":")[1];
        const transformedActions = nodeActions == null ? void 0 : nodeActions.map(
          (a) => transformNodeType(a, item.properties.displayName, "action")
        );
        pushViewStack({
          subcategory: item.properties.displayName,
          title: item.properties.displayName,
          nodeIcon: {
            color: ((_b = item.properties.defaults) == null ? void 0 : _b.color) || "",
            icon: icon2,
            iconType: item.properties.iconUrl ? "file" : "icon"
          },
          rootView: activeViewStack.value.rootView,
          hasSearch: true,
          mode: "actions",
          items: transformedActions
        });
      }
      if (item.type === "view") {
        const views = {
          [TRIGGER_NODE_CREATOR_VIEW]: TriggerView,
          [REGULAR_NODE_CREATOR_VIEW]: RegularView,
          [AI_NODE_CREATOR_VIEW]: AIView,
          [AI_OTHERS_NODE_CREATOR_VIEW]: AINodesView
        };
        const itemKey = item.key;
        const matchedView = views[itemKey];
        if (!matchedView) {
          console.warn(`No view found for ${itemKey}`);
          return;
        }
        const view2 = matchedView(mergedNodes);
        pushViewStack({
          title: view2.title,
          subtitle: (view2 == null ? void 0 : view2.subtitle) ?? "",
          info: (view2 == null ? void 0 : view2.info) ?? "",
          items: view2.items,
          hasSearch: true,
          rootView: view2.value,
          mode: "nodes",
          // Root search should include all nodes
          searchItems: mergedNodes
        });
      }
    }
    function subcategoriesMapper(item) {
      var _a, _b;
      if (item.type !== "node")
        return item;
      const hasTriggerGroup = item.properties.group.includes("trigger");
      const nodeActions = (actions == null ? void 0 : actions[item.key]) || [];
      const hasActions = nodeActions.length > 0;
      if (hasTriggerGroup && hasActions) {
        if ((_a = item.properties) == null ? void 0 : _a.codex) {
          item.properties.codex.alias = [
            ...((_b = item.properties.codex) == null ? void 0 : _b.alias) || [],
            item.properties.displayName
          ];
        }
        item.properties.displayName = item.properties.displayName.replace(" Trigger", "");
      }
      return item;
    }
    function baseSubcategoriesFilter(item) {
      if (item.type !== "node")
        return false;
      const hasTriggerGroup = item.properties.group.includes("trigger");
      const nodeActions = (actions == null ? void 0 : actions[item.key]) || [];
      const hasActions = nodeActions.length > 0;
      const isTriggerRootView = activeViewStack.value.rootView === TRIGGER_NODE_CREATOR_VIEW;
      if (isTriggerRootView) {
        return hasActions || hasTriggerGroup;
      }
      return hasActions || !hasTriggerGroup;
    }
    function arrowLeft() {
      popViewStack();
    }
    function onKeySelect(activeItemId) {
      const mergedItems = [
        ...activeViewStack.value.items || [],
        ...globalSearchItemsDiff.value || []
      ];
      const item = mergedItems.find((i) => i.uuid === activeItemId);
      if (!item)
        return;
      onSelected(item);
    }
    registerKeyHook("MainViewArrowRight", {
      keyboardKeys: ["ArrowRight", "Enter"],
      condition: (type) => ["subcategory", "node", "view"].includes(type),
      handler: onKeySelect
    });
    registerKeyHook("MainViewArrowLeft", {
      keyboardKeys: ["ArrowLeft"],
      condition: (type) => ["subcategory", "node", "view"].includes(type),
      handler: arrowLeft
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", null, [
        createVNode(ItemsRenderer, {
          elements: activeViewStack.value.items,
          onSelected,
          class: normalizeClass(_ctx.$style.items)
        }, createSlots({ _: 2 }, [
          (activeViewStack.value.items || []).length === 0 && globalSearchItemsDiff.value.length === 0 ? {
            name: "empty",
            fn: withCtx(() => [
              createVNode(NoResults, {
                rootView: activeViewStack.value.rootView,
                showIcon: "",
                showRequest: "",
                onAddWebhookNode: _cache[0] || (_cache[0] = ($event) => selectNodeType([unref(WEBHOOK_NODE_TYPE)])),
                onAddHttpNode: _cache[1] || (_cache[1] = ($event) => selectNodeType([unref(HTTP_REQUEST_NODE_TYPE)]))
              }, null, 8, ["rootView"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["elements", "class"]),
        globalSearchItemsDiff.value.length > 0 ? (openBlock(), createBlock(CategorizedItemsRenderer, {
          key: 0,
          elements: globalSearchItemsDiff.value,
          category: _ctx.$locale.baseText("nodeCreator.categoryNames.otherCategories"),
          onSelected
        }, null, 8, ["elements", "category"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const items = "_items_1t7lf_5";
const style0$2 = {
  items
};
const cssModules$2 = {
  "$style": style0$2
};
const NodesRenderer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1 = ["textContent"];
const _hoisted_2 = ["textContent"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NodesListPanel",
  setup(__props) {
    const i18n2 = useI18n();
    const { mergedNodes } = useNodeCreatorStore();
    const { pushViewStack, popViewStack, updateCurrentViewStack } = useViewStacks();
    const { setActiveItemIndex, attachKeydownEvent, detachKeydownEvent } = useKeyboardNavigation();
    const activeViewStack = computed(() => useViewStacks().activeViewStack);
    const viewStacks = computed(() => useViewStacks().viewStacks);
    const isActionsMode = computed(() => useViewStacks().activeViewStackMode === "actions");
    const searchPlaceholder = computed(
      () => isActionsMode.value ? i18n2.baseText("nodeCreator.actionsCategory.searchActions", {
        interpolate: { node: activeViewStack.value.title }
      }) : i18n2.baseText("nodeCreator.searchBar.searchNodes")
    );
    const nodeCreatorView = computed(() => useNodeCreatorStore().selectedView);
    function onSearch(value) {
      if (activeViewStack.value.uuid) {
        updateCurrentViewStack({ search: value });
        void setActiveItemIndex(activeViewStack.value.activeIndex ?? 0);
      }
    }
    function onTransitionEnd() {
      const newStackIndex = activeViewStack.value.mode === "actions" ? 1 : 0;
      void setActiveItemIndex(activeViewStack.value.activeIndex || 0 || newStackIndex);
    }
    onMounted(() => {
      attachKeydownEvent();
      void setActiveItemIndex(activeViewStack.value.activeIndex ?? 0);
    });
    onUnmounted(() => {
      detachKeydownEvent();
    });
    watch(
      () => nodeCreatorView.value,
      (selectedView) => {
        const views = {
          [TRIGGER_NODE_CREATOR_VIEW]: TriggerView,
          [REGULAR_NODE_CREATOR_VIEW]: RegularView,
          [AI_NODE_CREATOR_VIEW]: AIView,
          [AI_OTHERS_NODE_CREATOR_VIEW]: AINodesView
        };
        const itemKey = selectedView;
        const matchedView = views[itemKey];
        if (!matchedView) {
          console.warn(`No view found for ${itemKey}`);
          return;
        }
        const view2 = matchedView(mergedNodes);
        pushViewStack({
          title: view2.title,
          subtitle: (view2 == null ? void 0 : view2.subtitle) ?? "",
          items: view2.items,
          info: view2.info,
          hasSearch: true,
          mode: "nodes",
          rootView: selectedView,
          // Root search should include all nodes
          searchItems: mergedNodes
        });
      },
      { immediate: true }
    );
    function onBackButton() {
      popViewStack();
    }
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_n8n_node_icon = resolveComponent("n8n-node-icon");
      const _component_n8n_notice = resolveComponent("n8n-notice");
      return viewStacks.value.length > 0 ? (openBlock(), createBlock(Transition, {
        key: 0,
        name: `panel-slide-${activeViewStack.value.transitionDirection}`,
        onAfterLeave: onTransitionEnd
      }, {
        default: withCtx(() => [
          (openBlock(), createElementBlock("aside", {
            class: normalizeClass([_ctx.$style.nodesListPanel, activeViewStack.value.panelClass]),
            onKeydownCapture: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"])),
            key: `${activeViewStack.value.uuid}`
          }, [
            createBaseVNode("header", {
              class: normalizeClass({
                [_ctx.$style.header]: true,
                [_ctx.$style.hasBg]: !activeViewStack.value.subtitle,
                "nodes-list-panel-header": true
              }),
              "data-test-id": "nodes-list-header"
            }, [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.top)
              }, [
                viewStacks.value.length > 1 && !activeViewStack.value.preventBack ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: normalizeClass(_ctx.$style.backButton),
                  onClick: onBackButton
                }, [
                  createVNode(_component_font_awesome_icon, {
                    class: normalizeClass(_ctx.$style.backButtonIcon),
                    icon: "arrow-left",
                    size: "2x"
                  }, null, 8, ["class"])
                ], 2)) : createCommentVNode("", true),
                activeViewStack.value.nodeIcon ? (openBlock(), createBlock(_component_n8n_node_icon, {
                  key: 1,
                  class: normalizeClass(_ctx.$style.nodeIcon),
                  type: activeViewStack.value.nodeIcon.iconType || "unknown",
                  src: activeViewStack.value.nodeIcon.icon,
                  name: activeViewStack.value.nodeIcon.icon,
                  color: activeViewStack.value.nodeIcon.color,
                  circle: false,
                  showTooltip: false,
                  size: 20
                }, null, 8, ["class", "type", "src", "name", "color"])) : createCommentVNode("", true),
                activeViewStack.value.title ? (openBlock(), createElementBlock("p", {
                  key: 2,
                  class: normalizeClass(_ctx.$style.title),
                  textContent: toDisplayString(activeViewStack.value.title)
                }, null, 10, _hoisted_1)) : createCommentVNode("", true)
              ], 2),
              activeViewStack.value.subtitle ? (openBlock(), createElementBlock("p", {
                key: 0,
                class: normalizeClass({ [_ctx.$style.subtitle]: true, [_ctx.$style.offsetSubtitle]: viewStacks.value.length > 1 }),
                textContent: toDisplayString(activeViewStack.value.subtitle)
              }, null, 10, _hoisted_2)) : createCommentVNode("", true)
            ], 2),
            activeViewStack.value.hasSearch ? (openBlock(), createBlock(SearchBar, {
              key: 0,
              class: normalizeClass(_ctx.$style.searchBar),
              placeholder: searchPlaceholder.value ? searchPlaceholder.value : _ctx.$locale.baseText("nodeCreator.searchBar.searchNodes"),
              modelValue: activeViewStack.value.search,
              "onUpdate:modelValue": onSearch
            }, null, 8, ["class", "placeholder", "modelValue"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.renderedItems)
            }, [
              activeViewStack.value.info && !activeViewStack.value.search ? (openBlock(), createBlock(_component_n8n_notice, {
                key: 0,
                class: normalizeClass(_ctx.$style.info),
                content: activeViewStack.value.info,
                theme: "info"
              }, null, 8, ["class", "content"])) : createCommentVNode("", true),
              isActionsMode.value && activeViewStack.value.subcategory ? (openBlock(), createBlock(ActionsRenderer, normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)), null, 16)) : (openBlock(), createBlock(NodesRenderer, mergeProps({
                key: 2,
                rootView: nodeCreatorView.value
              }, _ctx.$attrs), null, 16, ["rootView"]))
            ], 2)
          ], 34))
        ]),
        _: 1
      }, 8, ["name"])) : createCommentVNode("", true);
    };
  }
});
const info = "_info_tt5pd_27";
const backButton = "_backButton_tt5pd_31";
const backButtonIcon = "_backButtonIcon_tt5pd_38";
const nodeIcon = "_nodeIcon_tt5pd_44";
const renderedItems = "_renderedItems_tt5pd_49";
const searchBar = "_searchBar_tt5pd_61";
const nodesListPanel = "_nodesListPanel_tt5pd_65";
const footer = "_footer_tt5pd_83";
const top = "_top_tt5pd_94";
const header = "_header_tt5pd_99";
const hasBg = "_hasBg_tt5pd_105";
const title = "_title_tt5pd_110";
const subtitle = "_subtitle_tt5pd_120";
const offsetSubtitle = "_offsetSubtitle_tt5pd_128";
const style0$1 = {
  info,
  backButton,
  backButtonIcon,
  nodeIcon,
  renderedItems,
  searchBar,
  nodesListPanel,
  footer,
  top,
  header,
  hasBg,
  title,
  subtitle,
  offsetSubtitle
};
const NodesListPanel_vue_vue_type_style_index_1_lang = "";
const cssModules$1 = {
  "$style": style0$1
};
const NodesListPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NodeCreator",
  props: {
    active: { type: Boolean },
    onNodeTypeSelected: { type: Function }
  },
  emits: ["closeNodeCreator", "nodeTypeSelected"],
  setup(__props, { emit }) {
    const props = __props;
    const { resetViewStacks } = useViewStacks();
    const { registerKeyHook } = useKeyboardNavigation();
    const uiStore = useUIStore();
    const { setShowScrim, setActions, setMergeNodes } = useNodeCreatorStore();
    const { generateMergedNodesAndActions } = useActionsGenerator();
    const state = reactive({
      nodeCreator: null,
      mousedownInsideEvent: null
    });
    const showScrim = computed(() => useNodeCreatorStore().showScrim);
    const viewStacksLength = computed(() => useViewStacks().viewStacks.length);
    const nodeCreatorInlineStyle = computed(() => {
      return { top: `${uiStore.bannersHeight + uiStore.headerHeight}px` };
    });
    function onMouseUpOutside() {
      var _a;
      if (state.mousedownInsideEvent) {
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true
        });
        (_a = state.mousedownInsideEvent.target) == null ? void 0 : _a.dispatchEvent(clickEvent);
        state.mousedownInsideEvent = null;
        unBindOnMouseUpOutside();
      }
    }
    function unBindOnMouseUpOutside() {
      document.removeEventListener("mouseup", onMouseUpOutside);
      document.removeEventListener("touchstart", onMouseUpOutside);
    }
    function onMouseUp() {
      state.mousedownInsideEvent = null;
      unBindOnMouseUpOutside();
    }
    function onMouseDown(event) {
      state.mousedownInsideEvent = event;
      document.addEventListener("mouseup", onMouseUpOutside);
      document.addEventListener("touchstart", onMouseUpOutside);
    }
    function onDragOver(event) {
      event.preventDefault();
    }
    function onDrop(event) {
      if (!event.dataTransfer) {
        return;
      }
      const dragData = event.dataTransfer.getData(DRAG_EVENT_DATA_KEY);
      const nodeCreatorBoundingRect = state.nodeCreator.getBoundingClientRect();
      if (dragData && event.pageX >= nodeCreatorBoundingRect.x && event.pageY >= nodeCreatorBoundingRect.y) {
        event.stopPropagation();
      }
    }
    watch(
      () => props.active,
      (isActive) => {
        if (!isActive) {
          setShowScrim(false);
          resetViewStacks();
        }
      }
    );
    watch(viewStacksLength, (viewStacksLength2) => {
      if (viewStacksLength2 === 0) {
        emit("closeNodeCreator");
        setShowScrim(false);
      }
    });
    registerKeyHook("NodeCreatorCloseEscape", {
      keyboardKeys: ["Escape"],
      handler: () => emit("closeNodeCreator")
    });
    registerKeyHook("NodeCreatorCloseTab", {
      keyboardKeys: ["Tab"],
      handler: () => emit("closeNodeCreator")
    });
    watch(
      () => ({
        httpOnlyCredentials: useCredentialsStore().httpOnlyCredentialTypes,
        nodeTypes: useNodeTypesStore().visibleNodeTypes
      }),
      ({ nodeTypes, httpOnlyCredentials }) => {
        const { actions, mergedNodes } = generateMergedNodesAndActions(nodeTypes, httpOnlyCredentials);
        setActions(actions);
        setMergeNodes(mergedNodes);
      },
      { immediate: true }
    );
    const { nodeCreator: nodeCreator2 } = toRefs(state);
    onBeforeUnmount(() => {
      unBindOnMouseUpOutside();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("aside", {
          class: normalizeClass({ [_ctx.$style.nodeCreatorScrim]: true, [_ctx.$style.active]: showScrim.value })
        }, null, 2),
        createVNode(SlideTransition, null, {
          default: withCtx(() => [
            _ctx.active ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.nodeCreator),
              style: normalizeStyle(nodeCreatorInlineStyle.value),
              ref_key: "nodeCreator",
              ref: nodeCreator2,
              onDragover: onDragOver,
              onDrop,
              onMousedown: onMouseDown,
              onMouseup: onMouseUp,
              "data-test-id": "node-creator"
            }, [
              createVNode(NodesListPanel, { onNodeTypeSelected: _ctx.onNodeTypeSelected }, null, 8, ["onNodeTypeSelected"])
            ], 38)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const nodeCreator = "_nodeCreator_cvzgl_9";
const nodeCreatorScrim = "_nodeCreatorScrim_cvzgl_20";
const active = "_active_cvzgl_32";
const style0 = {
  nodeCreator,
  nodeCreatorScrim,
  active
};
const cssModules = {
  "$style": style0
};
const NodeCreator = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  NodeCreator as default
};
