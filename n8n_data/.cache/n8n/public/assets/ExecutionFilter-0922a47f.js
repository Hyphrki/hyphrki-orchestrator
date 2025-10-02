import { d as defineComponent, o as openBlock, k as createElementBlock, t as toDisplayString, r as ref, c as computed, a as reactive, K as onBeforeMount, h as resolveComponent, b as createBlock, f as withCtx, i as createVNode, s as createTextVNode, q as createCommentVNode, p as unref, j as createBaseVNode, a3 as Fragment, ai as renderList, n as normalizeClass, af as withModifiers, aB as pushScopeId, aC as popScopeId } from "./vendor-fd4bd18c.js";
import { g as genericHelpers, T as TagsDropdown } from "./index-00f166b0.js";
import { _ as _export_sfc, gb as _root, g as getDefaultExportFromCjs, gc as isObject_1, gd as isSymbol_1, y as useSettingsStore, bg as useUsageStore, n as useUIStore, aa as EnterpriseEditionFeature, ge as getObjectKeys, p as i18n, cN as isEmpty, ar as useTelemetry } from "./n8n-8ddd8349.js";
const _sfc_main$1 = defineComponent({
  name: "ExecutionTime",
  mixins: [genericHelpers],
  props: ["startTime"],
  computed: {
    time() {
      if (!this.startTime) {
        return "...";
      }
      const msPassed = this.nowTime - new Date(this.startTime).getTime();
      return this.displayTimer(msPassed);
    }
  },
  data() {
    return {
      nowTime: -1,
      intervalTimer: null
    };
  },
  mounted() {
    this.setNow();
    this.intervalTimer = setInterval(() => {
      this.setNow();
    }, 1e3);
  },
  beforeUnmount() {
    if (this.intervalTimer !== null) {
      clearInterval(this.intervalTimer);
    }
  },
  methods: {
    setNow() {
      this.nowTime = (/* @__PURE__ */ new Date()).getTime();
    }
  }
});
const ExecutionTime_vue_vue_type_style_index_0_lang = "";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, toDisplayString(_ctx.time), 1);
}
const ExecutionTime = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
var root = _root;
var now$1 = function() {
  return root.Date.now();
};
var now_1 = now$1;
const now$2 = /* @__PURE__ */ getDefaultExportFromCjs(now_1);
var reWhitespace = /\s/;
function trimmedEndIndex$1(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var _trimmedEndIndex = trimmedEndIndex$1;
const _trimmedEndIndex$1 = /* @__PURE__ */ getDefaultExportFromCjs(_trimmedEndIndex);
var trimmedEndIndex = _trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim$1(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim = baseTrim$1;
const _baseTrim$1 = /* @__PURE__ */ getDefaultExportFromCjs(_baseTrim);
var baseTrim = _baseTrim, isObject$1 = isObject_1, isSymbol = isSymbol_1;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber$1(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$1(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$1;
const toNumber$2 = /* @__PURE__ */ getDefaultExportFromCjs(toNumber_1);
var isObject = isObject_1, now = now_1, toNumber = toNumber_1;
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_1 = debounce;
const debounce$1 = /* @__PURE__ */ getDefaultExportFromCjs(debounce_1);
const _withScopeId = (n) => (pushScopeId("data-v-ec1365f5"), n = n(), popScopeId(), n);
const _hoisted_1 = { "data-test-id": "execution-filter-form" };
const _hoisted_2 = { for: "execution-filter-workflows" };
const _hoisted_3 = { for: "execution-filter-tags" };
const _hoisted_4 = { for: "execution-filter-status" };
const _hoisted_5 = { for: "execution-filter-start-date" };
const _hoisted_6 = {
  target: "_blank",
  href: "https://docs.n8n.io/workflows/executions/custom-executions-data/"
};
const _hoisted_7 = { for: "execution-filter-saved-data-key" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { for: "execution-filter-saved-data-value" };
const _hoisted_10 = ["onClick"];
const DATE_TIME_MASK = "YYYY-MM-DD HH:mm";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExecutionFilter",
  props: {
    workflows: {},
    popoverPlacement: { default: "bottom" },
    teleported: { type: Boolean, default: true }
  },
  emits: ["filterChanged"],
  setup(__props, { emit }) {
    const props = __props;
    const settingsStore = useSettingsStore();
    const usageStore = useUsageStore();
    const uiStore = useUIStore();
    const telemetry = useTelemetry();
    const debouncedEmit = debounce$1(emit, 500);
    const isCustomDataFilterTracked = ref(false);
    const isAdvancedExecutionFilterEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.AdvancedExecutionFilters)
    );
    const showTags = computed(() => false);
    const getDefaultFilter = () => ({
      status: "all",
      workflowId: "all",
      tags: [],
      startDate: "",
      endDate: "",
      metadata: [{ key: "", value: "" }]
    });
    const filter = reactive(getDefaultFilter());
    const vModel = reactive(
      getObjectKeys(filter).reduce(
        (acc, key) => {
          acc[key] = computed({
            get() {
              return filter[key];
            },
            set(value) {
              filter[key] = value;
              emit("filterChanged", filter);
            }
          });
          return acc;
        },
        {}
      )
    );
    const statuses = computed(() => [
      { id: "all", name: i18n.baseText("executionsList.anyStatus") },
      { id: "error", name: i18n.baseText("executionsList.error") },
      { id: "canceled", name: i18n.baseText("executionsList.canceled") },
      { id: "running", name: i18n.baseText("executionsList.running") },
      { id: "success", name: i18n.baseText("executionsList.success") },
      { id: "waiting", name: i18n.baseText("executionsList.waiting") }
    ]);
    const countSelectedFilterProps = computed(() => {
      let count = 0;
      if (filter.status !== "all") {
        count++;
      }
      if (filter.workflowId !== "all") {
        count++;
      }
      if (!isEmpty(filter.tags)) {
        count++;
      }
      if (!isEmpty(filter.metadata)) {
        count++;
      }
      if (!!filter.startDate) {
        count++;
      }
      if (!!filter.endDate) {
        count++;
      }
      return count;
    });
    const onFilterMetaChange = (index, prop, value) => {
      if (!filter.metadata[index]) {
        filter.metadata[index] = {
          key: "",
          value: ""
        };
      }
      filter.metadata[index][prop] = value;
      if (!isCustomDataFilterTracked.value) {
        telemetry.track("User filtered executions with custom data");
        isCustomDataFilterTracked.value = true;
      }
      debouncedEmit("filterChanged", filter);
    };
    const onTagsChange = (tags) => {
      filter.tags = tags;
      emit("filterChanged", filter);
    };
    const onFilterReset = () => {
      Object.assign(filter, getDefaultFilter());
      emit("filterChanged", filter);
    };
    const goToUpgrade = () => {
      void uiStore.goToUpgrade("custom-data-filter", "upgrade-custom-data-filter");
    };
    onBeforeMount(() => {
      isCustomDataFilterTracked.value = false;
      emit("filterChanged", filter);
    });
    return (_ctx, _cache) => {
      const _component_n8n_badge = resolveComponent("n8n-badge");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_option = resolveComponent("n8n-option");
      const _component_n8n_select = resolveComponent("n8n-select");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_input = resolveComponent("n8n-input");
      const _component_n8n_popover = resolveComponent("n8n-popover");
      return openBlock(), createBlock(_component_n8n_popover, {
        trigger: "click",
        placement: _ctx.popoverPlacement,
        width: "440"
      }, {
        reference: withCtx(() => [
          createVNode(_component_n8n_button, {
            icon: "filter",
            type: "tertiary",
            active: !!countSelectedFilterProps.value,
            "data-test-id": "executions-filter-button"
          }, {
            default: withCtx(() => [
              !!countSelectedFilterProps.value ? (openBlock(), createBlock(_component_n8n_badge, {
                key: 0,
                theme: "primary",
                class: "mr-4xs",
                "data-test-id": "execution-filter-badge"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(countSelectedFilterProps.value), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(unref(i18n).baseText("executionsList.filters")), 1)
            ]),
            _: 1
          }, 8, ["active"])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            _ctx.workflows && _ctx.workflows.length > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.group)
            }, [
              createBaseVNode("label", _hoisted_2, toDisplayString(unref(i18n).baseText("workflows.heading")), 1),
              createVNode(_component_n8n_select, {
                id: "execution-filter-workflows",
                modelValue: vModel.workflowId,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vModel.workflowId = $event),
                placeholder: unref(i18n).baseText("executionsFilter.selectWorkflow"),
                filterable: "",
                "data-test-id": "executions-filter-workflows-select",
                teleported: _ctx.teleported
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(props.workflows, (item, idx) => {
                      return openBlock(), createBlock(_component_n8n_option, {
                        key: idx,
                        label: item.name,
                        value: item.id
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ])
                ]),
                _: 1
              }, 8, ["modelValue", "placeholder", "teleported"])
            ], 2)) : createCommentVNode("", true),
            showTags.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.$style.group)
            }, [
              createBaseVNode("label", _hoisted_3, toDisplayString(unref(i18n).baseText("workflows.filters.tags")), 1),
              createVNode(TagsDropdown, {
                id: "execution-filter-tags",
                placeholder: unref(i18n).baseText("workflowOpen.filterWorkflows"),
                modelValue: filter.tags,
                createEnabled: false,
                "onUpdate:modelValue": onTagsChange,
                "data-test-id": "executions-filter-tags-select"
              }, null, 8, ["placeholder", "modelValue"])
            ], 2)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.group)
            }, [
              createBaseVNode("label", _hoisted_4, toDisplayString(unref(i18n).baseText("executionsList.status")), 1),
              createVNode(_component_n8n_select, {
                id: "execution-filter-status",
                modelValue: vModel.status,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vModel.status = $event),
                placeholder: unref(i18n).baseText("executionsFilter.selectStatus"),
                filterable: "",
                "data-test-id": "executions-filter-status-select",
                teleported: _ctx.teleported
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(statuses.value, (item, idx) => {
                    return openBlock(), createBlock(_component_n8n_option, {
                      key: idx,
                      label: item.name,
                      value: item.id
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "placeholder", "teleported"])
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.group)
            }, [
              createBaseVNode("label", _hoisted_5, toDisplayString(unref(i18n).baseText("executionsFilter.start")), 1),
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.dates)
              }, [
                createVNode(_component_el_date_picker, {
                  id: "execution-filter-start-date",
                  type: "datetime",
                  teleported: false,
                  modelValue: vModel.startDate,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vModel.startDate = $event),
                  format: DATE_TIME_MASK,
                  placeholder: unref(i18n).baseText("executionsFilter.startDate"),
                  "data-test-id": "executions-filter-start-date-picker"
                }, null, 8, ["modelValue", "placeholder"]),
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style.divider)
                }, "to", 2),
                createVNode(_component_el_date_picker, {
                  id: "execution-filter-end-date",
                  type: "datetime",
                  teleported: false,
                  modelValue: vModel.endDate,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vModel.endDate = $event),
                  format: DATE_TIME_MASK,
                  placeholder: unref(i18n).baseText("executionsFilter.endDate"),
                  "data-test-id": "executions-filter-end-date-picker"
                }, null, 8, ["modelValue", "placeholder"])
              ], 2)
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.group)
            }, [
              createVNode(_component_n8n_tooltip, { placement: "right" }, {
                content: withCtx(() => [
                  createVNode(_component_i18n_t, {
                    tag: "span",
                    keypath: "executionsFilter.customData.docsTooltip"
                  }, {
                    link: withCtx(() => [
                      createBaseVNode("a", _hoisted_6, toDisplayString(unref(i18n).baseText("executionsFilter.customData.docsTooltip.link")), 1)
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createBaseVNode("span", {
                    class: normalizeClass(_ctx.$style.label)
                  }, [
                    createTextVNode(toDisplayString(unref(i18n).baseText("executionsFilter.savedData")) + " ", 1),
                    createVNode(_component_n8n_icon, {
                      class: normalizeClass(_ctx.$style.tooltipIcon),
                      icon: "question-circle",
                      size: "small"
                    }, null, 8, ["class"])
                  ], 2)
                ]),
                _: 1
              }),
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.subGroup)
              }, [
                createBaseVNode("label", _hoisted_7, toDisplayString(unref(i18n).baseText("executionsFilter.savedDataKey")), 1),
                createVNode(_component_n8n_tooltip, {
                  disabled: isAdvancedExecutionFilterEnabled.value,
                  placement: "top"
                }, {
                  content: withCtx(() => [
                    createVNode(_component_i18n_t, {
                      tag: "span",
                      keypath: "executionsFilter.customData.inputTooltip"
                    }, {
                      link: withCtx(() => [
                        createBaseVNode("a", {
                          href: "#",
                          onClick: withModifiers(goToUpgrade, ["prevent"]),
                          "data-test-id": "executions-filter-view-plans-link"
                        }, toDisplayString(unref(i18n).baseText("executionsFilter.customData.inputTooltip.link")), 9, _hoisted_8)
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(_component_n8n_input, {
                        id: "execution-filter-saved-data-key",
                        name: "execution-filter-saved-data-key",
                        type: "text",
                        disabled: !isAdvancedExecutionFilterEnabled.value,
                        placeholder: unref(i18n).baseText("executionsFilter.savedDataKeyPlaceholder"),
                        modelValue: (_a = filter.metadata[0]) == null ? void 0 : _a.key,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => onFilterMetaChange(0, "key", $event)),
                        "data-test-id": "execution-filter-saved-data-key-input"
                      }, null, 8, ["disabled", "placeholder", "modelValue"])
                    ];
                  }),
                  _: 1
                }, 8, ["disabled"]),
                createBaseVNode("label", _hoisted_9, toDisplayString(unref(i18n).baseText("executionsFilter.savedDataValue")), 1),
                createVNode(_component_n8n_tooltip, {
                  disabled: isAdvancedExecutionFilterEnabled.value,
                  placement: "top"
                }, {
                  content: withCtx(() => [
                    createVNode(_component_i18n_t, {
                      tag: "span",
                      keypath: "executionsFilter.customData.inputTooltip"
                    }, {
                      link: withCtx(() => [
                        createBaseVNode("a", {
                          href: "#",
                          onClick: withModifiers(goToUpgrade, ["prevent"])
                        }, toDisplayString(unref(i18n).baseText("executionsFilter.customData.inputTooltip.link")), 9, _hoisted_10)
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => {
                    var _a;
                    return [
                      createVNode(_component_n8n_input, {
                        id: "execution-filter-saved-data-value",
                        name: "execution-filter-saved-data-value",
                        type: "text",
                        disabled: !isAdvancedExecutionFilterEnabled.value,
                        placeholder: unref(i18n).baseText("executionsFilter.savedDataValuePlaceholder"),
                        modelValue: (_a = filter.metadata[0]) == null ? void 0 : _a.value,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => onFilterMetaChange(0, "value", $event)),
                        "data-test-id": "execution-filter-saved-data-value-input"
                      }, null, 8, ["disabled", "placeholder", "modelValue"])
                    ];
                  }),
                  _: 1
                }, 8, ["disabled"])
              ], 2)
            ], 2),
            !!countSelectedFilterProps.value ? (openBlock(), createBlock(_component_n8n_button, {
              key: 2,
              class: normalizeClass(_ctx.$style.resetBtn),
              onClick: onFilterReset,
              size: "large",
              text: "",
              "data-test-id": "executions-filter-reset-button"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("executionsFilter.reset")), 1)
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["placement"]);
    };
  }
});
const group = "_group_1153r_5";
const label = "_label_1153r_6";
const subGroup = "_subGroup_1153r_12";
const dates = "_dates_1153r_21";
const divider = "_divider_1153r_29";
const resetBtn = "_resetBtn_1153r_34";
const tooltipIcon = "_tooltipIcon_1153r_39";
const style0 = {
  group,
  label,
  subGroup,
  dates,
  divider,
  resetBtn,
  tooltipIcon
};
const ExecutionFilter_vue_vue_type_style_index_1_scoped_ec1365f5_lang = "";
const cssModules = {
  "$style": style0
};
const ExecutionFilter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__scopeId", "data-v-ec1365f5"]]);
export {
  ExecutionTime as E,
  ExecutionFilter as a
};
