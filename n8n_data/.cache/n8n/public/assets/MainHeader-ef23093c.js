import { d as defineComponent, o as openBlock, k as createElementBlock, g as renderSlot, aB as pushScopeId, aC as popScopeId, h as resolveComponent, b as createBlock, a9 as normalizeStyle, f as withCtx, j as createBaseVNode, a3 as Fragment, ai as renderList, n as normalizeClass, s as createTextVNode, t as toDisplayString, i as createVNode, aw as resolveDirective, ac as withDirectives, aj as withKeys, af as withModifiers, q as createCommentVNode, ad as vShow } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { p as pushConnection } from "./pushConnection-1f69f62d.js";
import { dS as shorten, _ as _export_sfc, w as createEventBus, bp as useTagsStore, v as getBannerRowHeight, n as useUIStore, dT as BREAKPOINT_SM, dU as BREAKPOINT_XL, dV as BREAKPOINT_LG, dW as BREAKPOINT_MD, cO as useTitleChange, u as useToast, $ as useMessage, bs as MAX_WORKFLOW_NAME_LENGTH, aa as EnterpriseEditionFeature, z as useSourceControlStore, t as useUsersStore, H as useWorkflowsStore, bg as useUsageStore, y as useSettingsStore, x as useRootStore, a4 as PLACEHOLDER_EMPTY_WORKFLOW_ID, B as VIEWS, a2 as getWorkflowPermissions, dX as WORKFLOW_MENU_ACTIONS, dd as WORKFLOW_SHARE_MODAL_KEY, de as nodeViewEventBus, a9 as MODAL_CONFIRM, c$ as WORKFLOW_SETTINGS_MODAL_KEY, dt as SOURCE_CONTROL_PUSH_MODAL_KEY, dz as DUPLICATE_MODAL_KEY, dY as MAIN_HEADER_TABS, W as useNDVStore, S as STICKY_NODE_TYPE } from "./n8n-8ddd8349.js";
import { d as debounce } from "./lodash-es-be629387.js";
import { P as PushConnectionTracker } from "./PushConnectionTracker-dab23948.js";
import { W as WorkflowActivator } from "./WorkflowActivator-e755335a.js";
import { g as genericHelpers, d as debounceHelper, w as workflowHelpers, S as SaveButton, T as TagsDropdown } from "./index-00f166b0.js";
import { F as FileSaver_minExports } from "./file-saver-ccbe3603.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
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
import "./workflowActivate-7e113acb.js";
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
const DEFAULT_WORKFLOW_NAME_LIMIT = 25;
const WORKFLOW_NAME_END_COUNT_TO_KEEP = 4;
const _sfc_main$b = defineComponent({
  name: "ShortenName",
  props: ["name", "limit", "testId"],
  computed: {
    shortenedName() {
      return shorten(
        this.name,
        this.limit || DEFAULT_WORKFLOW_NAME_LIMIT,
        WORKFLOW_NAME_END_COUNT_TO_KEEP
      );
    }
  }
});
const _hoisted_1$9 = ["title", "data-test-id"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", {
    title: _ctx.name,
    "data-test-id": _ctx.testId
  }, [
    renderSlot(_ctx.$slots, "default", { shortenedName: _ctx.shortenedName })
  ], 8, _hoisted_1$9);
}
const ShortenName = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
const _sfc_main$a = defineComponent({
  name: "IntersectionObserver",
  props: {
    threshold: {
      type: Number,
      default: 0
    },
    enabled: {
      type: Boolean,
      default: false
    },
    eventBus: {
      type: Object,
      default: () => createEventBus()
    }
  },
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    if (!this.enabled) {
      return;
    }
    const options = {
      root: this.$refs.root,
      rootMargin: "0px",
      threshold: this.threshold
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        this.$emit("observed", {
          el: target,
          isIntersecting
        });
      });
    }, options);
    this.observer = observer;
    this.eventBus.on("observe", (observed) => {
      if (observed) {
        observer.observe(observed);
      }
    });
    this.eventBus.on("unobserve", (observed) => {
      observer.unobserve(observed);
    });
  },
  beforeUnmount() {
    if (this.enabled) {
      this.observer.disconnect();
    }
  }
});
const _hoisted_1$8 = { ref: "root" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    renderSlot(_ctx.$slots, "default")
  ], 512);
}
const IntersectionObserver$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const _sfc_main$9 = defineComponent({
  name: "IntersectionObserved",
  props: {
    enabled: {
      type: Boolean,
      default: false
    },
    eventBus: {
      type: Object,
      default: () => createEventBus()
    }
  },
  async mounted() {
    if (!this.enabled) {
      return;
    }
    await this.$nextTick();
    this.eventBus.emit("observe", this.$refs.observed);
  },
  beforeUnmount() {
    if (this.enabled) {
      this.eventBus.emit("unobserve", this.$refs.observed);
    }
  }
});
const _hoisted_1$7 = { ref: "observed" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1$7, [
    renderSlot(_ctx.$slots, "default")
  ], 512);
}
const IntersectionObserved = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const DEFAULT_MAX_TAGS_LIMIT = 20;
const _sfc_main$8 = defineComponent({
  name: "TagsContainer",
  components: { IntersectionObserver: IntersectionObserver$1, IntersectionObserved },
  props: ["tagIds", "limit", "clickable", "responsive", "hoverable"],
  data() {
    return {
      maxWidth: 320,
      intersectionEventBus: createEventBus(),
      visibility: {},
      debouncedSetMaxWidth: () => {
      }
    };
  },
  created() {
    this.debouncedSetMaxWidth = debounce(this.setMaxWidth, 100);
  },
  mounted() {
    this.setMaxWidth();
    window.addEventListener("resize", this.debouncedSetMaxWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.debouncedSetMaxWidth);
  },
  computed: {
    ...mapStores(useTagsStore),
    style() {
      return {
        "max-width": `${this.maxWidth}px`
      };
    },
    tags() {
      const tags = this.tagIds.map((tagId) => this.tagsStore.getTagById(tagId)).filter(Boolean);
      const limit = this.limit || DEFAULT_MAX_TAGS_LIMIT;
      let toDisplay = limit ? tags.slice(0, limit) : tags;
      toDisplay = toDisplay.map((tag) => ({
        ...tag,
        hidden: this.responsive && !this.visibility[tag.id]
      }));
      let visibleCount = toDisplay.length;
      if (this.responsive) {
        visibleCount = Object.values(this.visibility).reduce(
          (accu, val) => val ? accu + 1 : accu,
          0
        );
      }
      if (visibleCount < tags.length) {
        const hidden = tags.slice(visibleCount);
        const hiddenTitle = hidden.reduce((accu, tag) => {
          return accu ? `${accu}, ${tag.name}` : tag.name;
        }, "");
        const countTag = {
          id: "count",
          name: `+${hidden.length}`,
          title: hiddenTitle,
          isCount: true
        };
        toDisplay.splice(visibleCount, 0, countTag);
      }
      return toDisplay;
    }
  },
  methods: {
    setMaxWidth() {
      const container2 = this.$refs.tagsContainer.$el;
      const parent = container2.parentNode;
      if (parent) {
        this.maxWidth = 0;
        void this.$nextTick(() => {
          this.maxWidth = parent.clientWidth;
        });
      }
    },
    onObserved({ el, isIntersecting }) {
      if (el.dataset.id) {
        this.visibility = { ...this.visibility, [el.dataset.id]: isIntersecting };
      }
    },
    onClick(e, tag) {
      if (this.clickable) {
        e.stopPropagation();
      }
      if (!tag.hidden) {
        this.$emit("click", tag.id);
      }
    }
  }
});
const TagsContainer_vue_vue_type_style_index_0_scoped_2032010a_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-2032010a"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "tags" };
const _hoisted_2$1 = ["onClick"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = resolveComponent("el-tag");
  const _component_IntersectionObserved = resolveComponent("IntersectionObserved");
  const _component_IntersectionObserver = resolveComponent("IntersectionObserver");
  return openBlock(), createBlock(_component_IntersectionObserver, {
    threshold: 1,
    onObserved: _ctx.onObserved,
    class: "tags-container",
    style: normalizeStyle(_ctx.style),
    enabled: _ctx.responsive,
    "event-bus": _ctx.intersectionEventBus,
    ref: "tagsContainer"
  }, {
    default: withCtx(() => [
      createBaseVNode("span", _hoisted_1$6, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tags, (tag) => {
          return openBlock(), createElementBlock("span", {
            key: tag.id,
            class: normalizeClass({ clickable: !tag.hidden }),
            onClick: (e) => _ctx.onClick(e, tag)
          }, [
            tag.isCount ? (openBlock(), createBlock(_component_el_tag, {
              key: 0,
              title: tag.title,
              type: "info",
              size: "small",
              class: "count-container",
              "disable-transitions": true
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(tag.name), 1)
              ]),
              _: 2
            }, 1032, ["title"])) : (openBlock(), createBlock(_component_IntersectionObserved, {
              key: 1,
              class: normalizeClass({ hidden: tag.hidden }),
              "data-id": tag.id,
              enabled: _ctx.responsive,
              "event-bus": _ctx.intersectionEventBus
            }, {
              default: withCtx(() => [
                createVNode(_component_el_tag, {
                  title: tag.name,
                  type: "info",
                  size: "small",
                  class: normalizeClass({ hoverable: _ctx.hoverable }),
                  "disable-transitions": true
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(tag.name), 1)
                  ]),
                  _: 2
                }, 1032, ["title", "class"])
              ]),
              _: 2
            }, 1032, ["class", "data-id", "enabled", "event-bus"]))
          ], 10, _hoisted_2$1);
        }), 128))
      ])
    ]),
    _: 1
  }, 8, ["onObserved", "style", "enabled", "event-bus"]);
}
const TagsContainer = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-2032010a"]]);
const _sfc_main$7 = defineComponent({
  name: "ExpandableInputBase",
  props: ["modelValue", "placeholder", "staticSize"],
  computed: {
    hiddenValue() {
      let value = this.modelValue.replace(/\s/g, ".");
      if (!value) {
        value = this.placeholder;
      }
      return `${value}`;
    }
  }
});
const ExpandableInputBase_vue_vue_type_style_index_0_scoped_e0207138_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-e0207138"), n = n(), popScopeId(), n);
const _hoisted_1$5 = ["data-value"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({ "el-input": true, "static-size": _ctx.staticSize }),
    "data-value": _ctx.hiddenValue
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 10, _hoisted_1$5);
}
const ExpandableInputBase = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-e0207138"]]);
const _sfc_main$6 = defineComponent({
  name: "ExpandableInputEdit",
  components: { ExpandableInputBase },
  props: {
    modelValue: {},
    placeholder: {},
    maxlength: {},
    autofocus: {},
    eventBus: {
      type: Object
    }
  },
  mounted() {
    var _a;
    if (this.autofocus && this.$refs.input) {
      this.focus();
    }
    (_a = this.eventBus) == null ? void 0 : _a.on("focus", this.focus);
  },
  beforeUnmount() {
    var _a;
    (_a = this.eventBus) == null ? void 0 : _a.off("focus", this.focus);
  },
  methods: {
    focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },
    onInput() {
      this.$emit("update:modelValue", this.$refs.input.value);
    },
    onEnter() {
      this.$emit("enter", this.$refs.input.value);
    },
    onClickOutside(e) {
      if (e.type === "click") {
        this.$emit("blur", this.$refs.input.value);
      }
    },
    onEscape() {
      this.$emit("esc");
    }
  }
});
const _hoisted_1$4 = ["value", "placeholder", "maxlength"];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ExpandableInputBase = resolveComponent("ExpandableInputBase");
  const _directive_on_click_outside = resolveDirective("on-click-outside");
  return openBlock(), createBlock(_component_ExpandableInputBase, {
    modelValue: _ctx.modelValue,
    placeholder: _ctx.placeholder
  }, {
    default: withCtx(() => [
      withDirectives(createBaseVNode("input", {
        class: "el-input__inner",
        value: _ctx.modelValue,
        placeholder: _ctx.placeholder,
        maxlength: _ctx.maxlength,
        onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
        onKeydown: [
          _cache[1] || (_cache[1] = withKeys((...args) => _ctx.onEnter && _ctx.onEnter(...args), ["enter"])),
          _cache[2] || (_cache[2] = withKeys((...args) => _ctx.onEscape && _ctx.onEscape(...args), ["esc"]))
        ],
        ref: "input",
        size: "4"
      }, null, 40, _hoisted_1$4), [
        [_directive_on_click_outside, _ctx.onClickOutside]
      ])
    ]),
    _: 1
  }, 8, ["modelValue", "placeholder"]);
}
const ExpandableInputEdit = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = defineComponent({
  name: "ExpandableInputPreview",
  components: { ExpandableInputBase },
  props: ["modelValue"]
});
const ExpandableInputPreview_vue_vue_type_style_index_0_scoped_b3d8dcdb_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-b3d8dcdb"), n = n(), popScopeId(), n);
const _hoisted_1$3 = ["value"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ExpandableInputBase = resolveComponent("ExpandableInputBase");
  return openBlock(), createBlock(_component_ExpandableInputBase, {
    modelValue: _ctx.modelValue,
    staticSize: true
  }, {
    default: withCtx(() => [
      createBaseVNode("input", {
        class: normalizeClass({ "el-input__inner": true, clickable: true }),
        value: _ctx.modelValue,
        disabled: true,
        size: "4"
      }, null, 8, _hoisted_1$3)
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const ExpandableInputPreview = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-b3d8dcdb"]]);
const _sfc_main$4 = defineComponent({
  name: "InlineTextEdit",
  components: { ExpandableInputEdit, ExpandableInputPreview },
  props: {
    isEditEnabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
      default: 0
    },
    previewValue: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDisabled: this.disabled,
      newValue: "",
      escPressed: false,
      inputBus: createEventBus()
    };
  },
  methods: {
    onInput(newValue) {
      if (this.disabled) {
        return;
      }
      this.newValue = newValue;
    },
    onClick() {
      if (this.disabled) {
        return;
      }
      this.newValue = this.modelValue;
      this.$emit("toggle");
    },
    onBlur() {
      if (this.disabled) {
        return;
      }
      if (!this.escPressed) {
        this.submit();
      }
      this.escPressed = false;
    },
    submit() {
      if (this.disabled) {
        return;
      }
      const onSubmit = (updated) => {
        this.isDisabled = false;
        if (!updated) {
          this.inputBus.emit("focus");
        }
      };
      this.isDisabled = true;
      this.$emit("submit", { name: this.newValue, onSubmit });
    },
    onEscape() {
      if (this.disabled) {
        return;
      }
      this.escPressed = true;
      this.$emit("toggle");
    }
  },
  watch: {
    disabled(value) {
      this.isDisabled = value;
    }
  }
});
const InlineTextEdit_vue_vue_type_style_index_0_scoped_8d13aaa6_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-8d13aaa6"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { key: 0 };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ExpandableInputEdit = resolveComponent("ExpandableInputEdit");
  const _component_ExpandableInputPreview = resolveComponent("ExpandableInputPreview");
  return openBlock(), createElementBlock("span", {
    onKeydown: _cache[1] || (_cache[1] = withModifiers(() => {
    }, ["stop"])),
    class: "inline-edit"
  }, [
    _ctx.isEditEnabled && !_ctx.isDisabled ? (openBlock(), createElementBlock("span", _hoisted_1$2, [
      createVNode(_component_ExpandableInputEdit, {
        placeholder: _ctx.placeholder,
        modelValue: _ctx.newValue,
        maxlength: _ctx.maxLength,
        autofocus: true,
        eventBus: _ctx.inputBus,
        "onUpdate:modelValue": _ctx.onInput,
        onEsc: _ctx.onEscape,
        onBlur: _ctx.onBlur,
        onEnter: _ctx.submit
      }, null, 8, ["placeholder", "modelValue", "maxlength", "eventBus", "onUpdate:modelValue", "onEsc", "onBlur", "onEnter"])
    ])) : (openBlock(), createElementBlock("span", {
      key: 1,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      class: "preview"
    }, [
      createVNode(_component_ExpandableInputPreview, {
        modelValue: _ctx.previewValue || _ctx.modelValue
      }, null, 8, ["modelValue"])
    ]))
  ], 32);
}
const InlineTextEdit = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-8d13aaa6"]]);
const _sfc_main$3 = defineComponent({
  name: "BreakpointsObserver",
  mixins: [genericHelpers, debounceHelper],
  props: ["valueXS", "valueXL", "valueLG", "valueMD", "valueSM", "valueDefault"],
  data() {
    return {
      width: window.innerWidth
    };
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      void this.callDebounced("onResizeEnd", { debounceTime: 50 });
    },
    async onResizeEnd() {
      this.width = window.innerWidth;
      await this.$nextTick();
      const bannerHeight = await getBannerRowHeight();
      useUIStore().updateBannersHeight(bannerHeight);
    }
  },
  computed: {
    bp() {
      if (this.width < BREAKPOINT_SM) {
        return "XS";
      }
      if (this.width >= BREAKPOINT_XL) {
        return "XL";
      }
      if (this.width >= BREAKPOINT_LG) {
        return "LG";
      }
      if (this.width >= BREAKPOINT_MD) {
        return "MD";
      }
      return "SM";
    },
    value() {
      if (this.valueXS !== void 0 && this.width < BREAKPOINT_SM) {
        return this.valueXS;
      }
      if (this.valueXL !== void 0 && this.width >= BREAKPOINT_XL) {
        return this.valueXL;
      }
      if (this.valueLG !== void 0 && this.width >= BREAKPOINT_LG) {
        return this.valueLG;
      }
      if (this.valueMD !== void 0 && this.width >= BREAKPOINT_MD) {
        return this.valueMD;
      }
      if (this.valueSM !== void 0) {
        return this.valueSM;
      }
      return this.valueDefault;
    }
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, [
    renderSlot(_ctx.$slots, "default", {
      bp: _ctx.bp,
      value: _ctx.value
    })
  ]);
}
const BreakpointsObserver = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const hasChanged = (prev, curr) => {
  if (prev.length !== curr.length) {
    return true;
  }
  const set = new Set(prev);
  return curr.reduce((accu, val) => accu || !set.has(val), false);
};
const _sfc_main$2 = defineComponent({
  name: "WorkflowDetails",
  mixins: [workflowHelpers, genericHelpers],
  components: {
    TagsContainer,
    PushConnectionTracker,
    ShortenName,
    WorkflowActivator,
    SaveButton,
    TagsDropdown,
    InlineTextEdit,
    BreakpointsObserver
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      ...useTitleChange(),
      ...useToast(),
      ...useMessage()
    };
  },
  data() {
    return {
      isTagsEditEnabled: false,
      isNameEditEnabled: false,
      appliedTagIds: [],
      tagsEditBus: createEventBus(),
      MAX_WORKFLOW_NAME_LENGTH,
      tagsSaving: false,
      eventBus: createEventBus(),
      EnterpriseEditionFeature
    };
  },
  computed: {
    ...mapStores(
      useTagsStore,
      useRootStore,
      useSettingsStore,
      useUIStore,
      useUsageStore,
      useWorkflowsStore,
      useUsersStore,
      useSourceControlStore
    ),
    currentUser() {
      return this.usersStore.currentUser;
    },
    contextBasedTranslationKeys() {
      return this.uiStore.contextBasedTranslationKeys;
    },
    isWorkflowActive() {
      return this.workflowsStore.isWorkflowActive;
    },
    workflowName() {
      return this.workflowsStore.workflowName;
    },
    isDirty() {
      return this.uiStore.stateIsDirty;
    },
    readOnlyEnv() {
      return this.sourceControlStore.preferences.branchReadOnly;
    },
    currentWorkflowTagIds() {
      return this.workflowsStore.workflowTags;
    },
    isNewWorkflow() {
      return !this.currentWorkflowId || this.currentWorkflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID || this.currentWorkflowId === "new";
    },
    isWorkflowSaving() {
      return this.uiStore.isActionActive("workflowSaving");
    },
    workflow() {
      return this.workflowsStore.workflow;
    },
    currentWorkflowId() {
      return this.workflowsStore.workflowId;
    },
    onWorkflowPage() {
      return this.$route.meta && (this.$route.meta.nodeView || this.$route.meta.keepWorkflowAlive === true);
    },
    onExecutionsTab() {
      return [
        VIEWS.EXECUTION_HOME.toString(),
        VIEWS.WORKFLOW_EXECUTIONS.toString(),
        VIEWS.EXECUTION_PREVIEW
      ].includes(this.$route.name || "");
    },
    workflowPermissions() {
      return getWorkflowPermissions(this.usersStore.currentUser, this.workflow);
    },
    workflowMenuItems() {
      const actions = [
        {
          id: WORKFLOW_MENU_ACTIONS.DOWNLOAD,
          label: this.$locale.baseText("menuActions.download"),
          disabled: !this.onWorkflowPage
        }
      ];
      if (!this.readOnly) {
        actions.unshift({
          id: WORKFLOW_MENU_ACTIONS.DUPLICATE,
          label: this.$locale.baseText("menuActions.duplicate"),
          disabled: !this.onWorkflowPage || !this.currentWorkflowId
        });
        actions.push(
          {
            id: WORKFLOW_MENU_ACTIONS.IMPORT_FROM_URL,
            label: this.$locale.baseText("menuActions.importFromUrl"),
            disabled: !this.onWorkflowPage || this.onExecutionsTab
          },
          {
            id: WORKFLOW_MENU_ACTIONS.IMPORT_FROM_FILE,
            label: this.$locale.baseText("menuActions.importFromFile"),
            disabled: !this.onWorkflowPage || this.onExecutionsTab
          }
        );
      }
      actions.push({
        id: WORKFLOW_MENU_ACTIONS.PUSH,
        label: this.$locale.baseText("menuActions.push"),
        disabled: !this.sourceControlStore.isEnterpriseSourceControlEnabled || !this.onWorkflowPage || this.onExecutionsTab || this.readOnlyEnv
      });
      actions.push({
        id: WORKFLOW_MENU_ACTIONS.SETTINGS,
        label: this.$locale.baseText("generic.settings"),
        disabled: !this.onWorkflowPage || this.isNewWorkflow
      });
      if (this.workflowPermissions.delete && !this.readOnly) {
        actions.push({
          id: WORKFLOW_MENU_ACTIONS.DELETE,
          label: this.$locale.baseText("menuActions.delete"),
          disabled: !this.onWorkflowPage || this.isNewWorkflow,
          customClass: this.$style.deleteItem,
          divided: true
        });
      }
      return actions;
    },
    isWorkflowHistoryFeatureEnabled() {
      return this.settingsStore.isEnterpriseFeatureEnabled(
        EnterpriseEditionFeature.WorkflowHistory
      );
    },
    workflowHistoryRoute() {
      return {
        name: VIEWS.WORKFLOW_HISTORY,
        params: {
          workflowId: this.currentWorkflowId
        }
      };
    },
    isWorkflowHistoryButtonDisabled() {
      return this.workflowsStore.isNewWorkflow;
    }
  },
  methods: {
    async onSaveButtonClick() {
      let currentId = void 0;
      if (this.currentWorkflowId !== PLACEHOLDER_EMPTY_WORKFLOW_ID) {
        currentId = this.currentWorkflowId;
      } else if (this.$route.params.name && this.$route.params.name !== "new") {
        currentId = this.$route.params.name;
      }
      const saved = await this.saveCurrentWorkflow({
        id: currentId,
        name: this.workflowName,
        tags: this.currentWorkflowTagIds
      });
      if (saved) {
        await this.settingsStore.fetchPromptsData();
        if (this.$route.name === VIEWS.EXECUTION_DEBUG) {
          await this.$router.replace({
            name: VIEWS.WORKFLOW,
            params: { name: this.currentWorkflowId }
          });
        }
      }
    },
    onShareButtonClick() {
      var _a;
      this.uiStore.openModalWithData({
        name: WORKFLOW_SHARE_MODAL_KEY,
        data: { id: this.currentWorkflowId }
      });
      this.$telemetry.track("User opened sharing modal", {
        workflow_id: this.currentWorkflowId,
        user_id_sharer: (_a = this.currentUser) == null ? void 0 : _a.id,
        sub_view: this.$route.name === VIEWS.WORKFLOWS ? "Workflows listing" : "Workflow editor"
      });
    },
    onTagsEditEnable() {
      this.appliedTagIds = this.currentWorkflowTagIds;
      this.isTagsEditEnabled = true;
      setTimeout(() => {
        this.isNameEditEnabled = false;
        this.tagsEditBus.emit("focus");
      }, 0);
    },
    async onTagsBlur() {
      const current = this.currentWorkflowTagIds;
      const tags = this.appliedTagIds;
      if (!hasChanged(current, tags)) {
        this.isTagsEditEnabled = false;
        return;
      }
      if (this.tagsSaving) {
        return;
      }
      this.tagsSaving = true;
      const saved = await this.saveCurrentWorkflow({ tags });
      this.$telemetry.track("User edited workflow tags", {
        workflow_id: this.currentWorkflowId,
        new_tag_count: tags.length
      });
      this.tagsSaving = false;
      if (saved) {
        this.isTagsEditEnabled = false;
      }
    },
    onTagsEditEsc() {
      this.isTagsEditEnabled = false;
    },
    onNameToggle() {
      this.isNameEditEnabled = !this.isNameEditEnabled;
      if (this.isNameEditEnabled) {
        if (this.isTagsEditEnabled) {
          void this.onTagsBlur();
        }
        this.isTagsEditEnabled = false;
      }
    },
    async onNameSubmit({
      name,
      onSubmit: cb
    }) {
      const newName = name.trim();
      if (!newName) {
        this.showMessage({
          title: this.$locale.baseText("workflowDetails.showMessage.title"),
          message: this.$locale.baseText("workflowDetails.showMessage.message"),
          type: "error"
        });
        cb(false);
        return;
      }
      if (newName === this.workflowName) {
        this.isNameEditEnabled = false;
        cb(true);
        return;
      }
      const saved = await this.saveCurrentWorkflow({ name });
      if (saved) {
        this.isNameEditEnabled = false;
      }
      cb(saved);
    },
    async handleFileImport() {
      const inputRef = this.$refs.importFile;
      if ((inputRef == null ? void 0 : inputRef.files) && inputRef.files.length !== 0) {
        const reader = new FileReader();
        reader.onload = () => {
          let workflowData;
          try {
            workflowData = JSON.parse(reader.result);
          } catch (error) {
            this.showMessage({
              title: this.$locale.baseText("mainSidebar.showMessage.handleFileImport.title"),
              message: this.$locale.baseText("mainSidebar.showMessage.handleFileImport.message"),
              type: "error"
            });
            return;
          } finally {
            reader.onload = void 0;
            inputRef.value = null;
          }
          nodeViewEventBus.emit("importWorkflowData", { data: workflowData });
        };
        reader.readAsText(inputRef.files[0]);
      }
    },
    async onWorkflowMenuSelect(action) {
      switch (action) {
        case WORKFLOW_MENU_ACTIONS.DUPLICATE: {
          this.uiStore.openModalWithData({
            name: DUPLICATE_MODAL_KEY,
            data: {
              id: this.workflowsStore.workflowId,
              name: this.workflowsStore.workflowName,
              tags: this.workflowsStore.workflowTags
            }
          });
          break;
        }
        case WORKFLOW_MENU_ACTIONS.DOWNLOAD: {
          const workflowData = await this.getWorkflowDataToSave();
          const { tags, ...data } = workflowData;
          const exportData = {
            ...data,
            meta: {
              instanceId: this.rootStore.instanceId
            },
            tags: (tags || []).map((tagId) => {
              const { usageCount, ...tag } = this.tagsStore.getTagById(tagId);
              return tag;
            })
          };
          const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: "application/json;charset=utf-8"
          });
          let workflowName = this.workflowName || "unsaved_workflow";
          workflowName = workflowName.replace(/[^a-z0-9]/gi, "_");
          this.$telemetry.track("User exported workflow", { workflow_id: workflowData.id });
          FileSaver_minExports.saveAs(blob, workflowName + ".json");
          break;
        }
        case WORKFLOW_MENU_ACTIONS.IMPORT_FROM_URL: {
          try {
            const promptResponse = await this.prompt(
              this.$locale.baseText("mainSidebar.prompt.workflowUrl") + ":",
              this.$locale.baseText("mainSidebar.prompt.importWorkflowFromUrl") + ":",
              {
                confirmButtonText: this.$locale.baseText("mainSidebar.prompt.import"),
                cancelButtonText: this.$locale.baseText("mainSidebar.prompt.cancel"),
                inputErrorMessage: this.$locale.baseText("mainSidebar.prompt.invalidUrl"),
                inputPattern: /^http[s]?:\/\/.*\.json$/i
              }
            );
            nodeViewEventBus.emit("importWorkflowUrl", { url: promptResponse.value });
          } catch (e) {
          }
          break;
        }
        case WORKFLOW_MENU_ACTIONS.IMPORT_FROM_FILE: {
          this.$refs.importFile.click();
          break;
        }
        case WORKFLOW_MENU_ACTIONS.PUSH: {
          this.startLoading();
          try {
            await this.onSaveButtonClick();
            const status = await this.sourceControlStore.getAggregatedStatus();
            this.uiStore.openModalWithData({
              name: SOURCE_CONTROL_PUSH_MODAL_KEY,
              data: { eventBus: this.eventBus, status }
            });
          } catch (error) {
            this.showError(error, this.$locale.baseText("error"));
          } finally {
            this.stopLoading();
          }
          break;
        }
        case WORKFLOW_MENU_ACTIONS.SETTINGS: {
          this.uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
          break;
        }
        case WORKFLOW_MENU_ACTIONS.DELETE: {
          const deleteConfirmed = await this.confirm(
            this.$locale.baseText("mainSidebar.confirmMessage.workflowDelete.message", {
              interpolate: { workflowName: this.workflowName }
            }),
            this.$locale.baseText("mainSidebar.confirmMessage.workflowDelete.headline"),
            {
              type: "warning",
              confirmButtonText: this.$locale.baseText(
                "mainSidebar.confirmMessage.workflowDelete.confirmButtonText"
              ),
              cancelButtonText: this.$locale.baseText(
                "mainSidebar.confirmMessage.workflowDelete.cancelButtonText"
              )
            }
          );
          if (deleteConfirmed !== MODAL_CONFIRM) {
            return;
          }
          try {
            await this.workflowsStore.deleteWorkflow(this.currentWorkflowId);
          } catch (error) {
            this.showError(error, this.$locale.baseText("generic.deleteWorkflowError"));
            return;
          }
          this.uiStore.stateIsDirty = false;
          this.titleReset();
          this.showMessage({
            title: this.$locale.baseText("mainSidebar.showMessage.handleSelect1.title"),
            type: "success"
          });
          await this.$router.push({ name: VIEWS.NEW_WORKFLOW });
          break;
        }
        default:
          break;
      }
    },
    goToUpgrade() {
      void this.uiStore.goToUpgrade("workflow_sharing", "upgrade-workflow-sharing");
    }
  },
  watch: {
    currentWorkflowId() {
      this.isTagsEditEnabled = false;
      this.isNameEditEnabled = false;
    }
  }
});
const WorkflowDetails_vue_vue_type_style_index_0_scoped_3bf66fc6_lang = "";
const workflowMenuContainer = "_workflowMenuContainer_1siu2_5";
const hiddenInput = "_hiddenInput_1siu2_9";
const deleteItem = "_deleteItem_1siu2_13";
const disabledShareButton = "_disabledShareButton_1siu2_17";
const workflowHistoryButton = "_workflowHistoryButton_1siu2_21";
const style1 = {
  workflowMenuContainer,
  hiddenInput,
  deleteItem,
  disabledShareButton,
  workflowHistoryButton
};
const _withScopeId = (n) => (pushScopeId("data-v-3bf66fc6"), n = n(), popScopeId(), n);
const _hoisted_1$1 = {
  key: 0,
  class: "container"
};
const _hoisted_2 = {
  key: 0,
  class: "tags",
  "data-test-id": "workflow-tags-container"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 1,
  class: "tags"
};
const _hoisted_5 = { class: "activator" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_InlineTextEdit = resolveComponent("InlineTextEdit");
  const _component_ShortenName = resolveComponent("ShortenName");
  const _component_BreakpointsObserver = resolveComponent("BreakpointsObserver");
  const _component_TagsDropdown = resolveComponent("TagsDropdown");
  const _component_TagsContainer = resolveComponent("TagsContainer");
  const _component_WorkflowActivator = resolveComponent("WorkflowActivator");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_i18n_t = resolveComponent("i18n-t");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_enterprise_edition = resolveComponent("enterprise-edition");
  const _component_SaveButton = resolveComponent("SaveButton");
  const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
  const _component_router_link = resolveComponent("router-link");
  const _component_n8n_action_dropdown = resolveComponent("n8n-action-dropdown");
  const _component_PushConnectionTracker = resolveComponent("PushConnectionTracker");
  return _ctx.workflowName ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(_component_BreakpointsObserver, {
      valueXS: 15,
      valueSM: 25,
      valueMD: 50,
      class: "name-container"
    }, {
      default: withCtx(({ value }) => [
        createVNode(_component_ShortenName, {
          name: _ctx.workflowName,
          limit: value,
          custom: true,
          testId: "workflow-name-input"
        }, {
          default: withCtx(({ shortenedName }) => [
            createVNode(_component_InlineTextEdit, {
              modelValue: _ctx.workflowName,
              previewValue: shortenedName,
              isEditEnabled: _ctx.isNameEditEnabled,
              maxLength: _ctx.MAX_WORKFLOW_NAME_LENGTH,
              disabled: _ctx.readOnly,
              onToggle: _ctx.onNameToggle,
              onSubmit: _ctx.onNameSubmit,
              placeholder: "Enter workflow name",
              class: "name"
            }, null, 8, ["modelValue", "previewValue", "isEditEnabled", "maxLength", "disabled", "onToggle", "onSubmit"])
          ]),
          _: 2
        }, 1032, ["name", "limit"])
      ]),
      _: 1
    }),
    _ctx.settingsStore.areTagsEnabled ? (openBlock(), createElementBlock("span", _hoisted_2, [
      _ctx.isTagsEditEnabled && !_ctx.readOnly ? (openBlock(), createBlock(_component_TagsDropdown, {
        key: 0,
        modelValue: _ctx.appliedTagIds,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.appliedTagIds = $event),
        createEnabled: true,
        eventBus: _ctx.tagsEditBus,
        placeholder: _ctx.$locale.baseText("workflowDetails.chooseOrCreateATag"),
        ref: "dropdown",
        class: "tags-edit",
        "data-test-id": "workflow-tags-dropdown",
        onBlur: _ctx.onTagsBlur,
        onEsc: _ctx.onTagsEditEsc
      }, null, 8, ["modelValue", "eventBus", "placeholder", "onBlur", "onEsc"])) : _ctx.currentWorkflowTagIds.length === 0 && !_ctx.readOnly ? (openBlock(), createElementBlock("div", _hoisted_3, [
        createBaseVNode("span", {
          class: "add-tag clickable",
          "data-test-id": "new-tag-link",
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onTagsEditEnable && _ctx.onTagsEditEnable(...args))
        }, " + " + toDisplayString(_ctx.$locale.baseText("workflowDetails.addTag")), 1)
      ])) : (openBlock(), createBlock(_component_TagsContainer, {
        tagIds: _ctx.currentWorkflowTagIds,
        clickable: true,
        responsive: true,
        key: _ctx.currentWorkflowId,
        onClick: _ctx.onTagsEditEnable,
        "data-test-id": "workflow-tags"
      }, null, 8, ["tagIds", "onClick"]))
    ])) : (openBlock(), createElementBlock("span", _hoisted_4)),
    createVNode(_component_PushConnectionTracker, { class: "actions" }, {
      default: withCtx(() => [
        createBaseVNode("span", _hoisted_5, [
          createVNode(_component_WorkflowActivator, {
            "workflow-active": _ctx.isWorkflowActive,
            "workflow-id": _ctx.currentWorkflowId
          }, null, 8, ["workflow-active", "workflow-id"])
        ]),
        createVNode(_component_enterprise_edition, {
          features: [_ctx.EnterpriseEditionFeature.Sharing]
        }, {
          fallback: withCtx(() => [
            createVNode(_component_n8n_tooltip, null, {
              content: withCtx(() => [
                createVNode(_component_i18n_t, {
                  keypath: _ctx.contextBasedTranslationKeys.workflows.sharing.unavailable.description.tooltip,
                  tag: "span"
                }, {
                  action: withCtx(() => [
                    createBaseVNode("a", {
                      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.goToUpgrade && _ctx.goToUpgrade(...args))
                    }, toDisplayString(_ctx.$locale.baseText(
                      _ctx.contextBasedTranslationKeys.workflows.sharing.unavailable.button
                    )), 1)
                  ]),
                  _: 1
                }, 8, ["keypath"])
              ]),
              default: withCtx(() => [
                createVNode(_component_n8n_button, {
                  type: "secondary",
                  class: normalizeClass(["mr-2xs", _ctx.$style.disabledShareButton])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$locale.baseText("workflowDetails.share")), 1)
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_n8n_button, {
              type: "secondary",
              class: "mr-2xs",
              onClick: _ctx.onShareButtonClick,
              "data-test-id": "workflow-share-button"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("workflowDetails.share")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        }, 8, ["features"]),
        createVNode(_component_SaveButton, {
          type: "primary",
          saved: !this.isDirty && !this.isNewWorkflow,
          disabled: _ctx.isWorkflowSaving || _ctx.readOnly,
          "data-test-id": "workflow-save-button",
          onClick: _ctx.onSaveButtonClick
        }, null, 8, ["saved", "disabled", "onClick"]),
        _ctx.isWorkflowHistoryFeatureEnabled ? (openBlock(), createBlock(_component_router_link, {
          key: 0,
          to: _ctx.workflowHistoryRoute,
          class: normalizeClass(_ctx.$style.workflowHistoryButton)
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_icon_button, {
              disabled: _ctx.isWorkflowHistoryButtonDisabled,
              "data-test-id": "workflow-history-button",
              type: "tertiary",
              icon: "history",
              size: "medium",
              text: ""
            }, null, 8, ["disabled"])
          ]),
          _: 1
        }, 8, ["to", "class"])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.workflowMenuContainer)
        }, [
          createBaseVNode("input", {
            class: normalizeClass(_ctx.$style.hiddenInput),
            type: "file",
            ref: "importFile",
            "data-test-id": "workflow-import-input",
            onChange: _cache[3] || (_cache[3] = ($event) => _ctx.handleFileImport())
          }, null, 34),
          createVNode(_component_n8n_action_dropdown, {
            items: _ctx.workflowMenuItems,
            "data-test-id": "workflow-menu",
            onSelect: _ctx.onWorkflowMenuSelect
          }, null, 8, ["items", "onSelect"])
        ], 2)
      ]),
      _: 1
    })
  ])) : createCommentVNode("", true);
}
const cssModules$1 = {
  "$style": style1
};
const WorkflowDetails = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__cssModules", cssModules$1], ["__scopeId", "data-v-3bf66fc6"]]);
const _sfc_main$1 = defineComponent({
  name: "tab-bar",
  data() {
    return {
      MAIN_HEADER_TABS
    };
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      default: MAIN_HEADER_TABS.WORKFLOW
    }
  },
  computed: {
    ...mapStores(useUIStore),
    mainSidebarCollapsed() {
      return this.uiStore.sidebarMenuCollapsed;
    }
  },
  methods: {
    onSelect(tab, event) {
      this.$emit("select", tab, event);
    }
  }
});
const container = "_container_1o2mz_5";
const style0 = {
  container
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_radio_buttons = resolveComponent("n8n-radio-buttons");
  return _ctx.items ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass({
      [_ctx.$style.container]: true,
      ["tab-bar-container"]: true,
      [_ctx.$style.menuCollapsed]: _ctx.mainSidebarCollapsed
    })
  }, [
    createVNode(_component_n8n_radio_buttons, {
      modelValue: _ctx.activeTab,
      options: _ctx.items,
      "onUpdate:modelValue": _ctx.onSelect
    }, null, 8, ["modelValue", "options", "onUpdate:modelValue"])
  ], 2)) : createCommentVNode("", true);
}
const cssModules = {
  "$style": style0
};
const TabBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules]]);
const _sfc_main = defineComponent({
  name: "MainHeader",
  components: {
    WorkflowDetails,
    TabBar
  },
  mixins: [pushConnection, workflowHelpers],
  setup(props) {
    var _a, _b, _c, _d;
    return {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = pushConnection).setup) == null ? void 0 : _b.call(_a, props),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_d = (_c = workflowHelpers).setup) == null ? void 0 : _d.call(_c, props)
    };
  },
  data() {
    return {
      activeHeaderTab: MAIN_HEADER_TABS.WORKFLOW,
      workflowToReturnTo: "",
      dirtyState: false
    };
  },
  computed: {
    ...mapStores(useNDVStore, useUIStore, useSourceControlStore),
    tabBarItems() {
      return [
        { value: MAIN_HEADER_TABS.WORKFLOW, label: this.$locale.baseText("generic.editor") },
        { value: MAIN_HEADER_TABS.EXECUTIONS, label: this.$locale.baseText("generic.executions") }
      ];
    },
    activeNode() {
      return this.ndvStore.activeNode;
    },
    hideMenuBar() {
      return Boolean(this.activeNode && this.activeNode.type !== STICKY_NODE_TYPE);
    },
    workflowName() {
      return this.workflowsStore.workflowName;
    },
    currentWorkflow() {
      return this.$route.params.name || this.workflowsStore.workflowId;
    },
    onWorkflowPage() {
      return this.$route.meta && (this.$route.meta.nodeView || this.$route.meta.keepWorkflowAlive === true);
    },
    activeExecution() {
      return this.workflowsStore.activeWorkflowExecution;
    },
    readOnly() {
      return this.sourceControlStore.preferences.branchReadOnly;
    }
  },
  mounted() {
    this.dirtyState = this.uiStore.stateIsDirty;
    this.syncTabsWithRoute(this.$route);
    this.pushConnect();
  },
  beforeUnmount() {
    this.pushDisconnect();
  },
  watch: {
    $route(to, from) {
      this.syncTabsWithRoute(to);
    }
  },
  methods: {
    syncTabsWithRoute(route) {
      if (route.name === VIEWS.EXECUTION_HOME || route.name === VIEWS.WORKFLOW_EXECUTIONS || route.name === VIEWS.EXECUTION_PREVIEW) {
        this.activeHeaderTab = MAIN_HEADER_TABS.EXECUTIONS;
      } else if (route.name === VIEWS.WORKFLOW || route.name === VIEWS.NEW_WORKFLOW || route.name === VIEWS.EXECUTION_DEBUG) {
        this.activeHeaderTab = MAIN_HEADER_TABS.WORKFLOW;
      }
      const workflowName = route.params.name;
      if (workflowName !== "new") {
        this.workflowToReturnTo = workflowName;
      }
    },
    onTabSelected(tab, event) {
      switch (tab) {
        case MAIN_HEADER_TABS.WORKFLOW:
          if (!["", "new", PLACEHOLDER_EMPTY_WORKFLOW_ID].includes(this.workflowToReturnTo)) {
            if (this.$route.name !== VIEWS.WORKFLOW) {
              void this.$router.push({
                name: VIEWS.WORKFLOW,
                params: { name: this.workflowToReturnTo }
              });
            }
          } else {
            if (this.$route.name !== VIEWS.NEW_WORKFLOW) {
              void this.$router.push({ name: VIEWS.NEW_WORKFLOW });
              this.uiStore.stateIsDirty = this.dirtyState;
            }
          }
          this.activeHeaderTab = MAIN_HEADER_TABS.WORKFLOW;
          break;
        case MAIN_HEADER_TABS.EXECUTIONS:
          this.dirtyState = this.uiStore.stateIsDirty;
          this.workflowToReturnTo = this.currentWorkflow;
          const routeWorkflowId = this.currentWorkflow === PLACEHOLDER_EMPTY_WORKFLOW_ID ? "new" : this.currentWorkflow;
          if (this.activeExecution) {
            this.$router.push({
              name: VIEWS.EXECUTION_PREVIEW,
              params: { name: routeWorkflowId, executionId: this.activeExecution.id }
            }).catch(() => {
            });
          } else {
            void this.$router.push({
              name: VIEWS.EXECUTION_HOME,
              params: { name: routeWorkflowId }
            });
          }
          this.activeHeaderTab = MAIN_HEADER_TABS.EXECUTIONS;
          break;
        default:
          break;
      }
    }
  }
});
const MainHeader_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "top-menu" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_WorkflowDetails = resolveComponent("WorkflowDetails");
  const _component_tab_bar = resolveComponent("tab-bar");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", {
      class: normalizeClass({ "main-header": true, expanded: !this.uiStore.sidebarMenuCollapsed })
    }, [
      withDirectives(createBaseVNode("div", _hoisted_1, [
        createVNode(_component_WorkflowDetails, { readOnly: _ctx.readOnly }, null, 8, ["readOnly"]),
        _ctx.onWorkflowPage ? (openBlock(), createBlock(_component_tab_bar, {
          key: 0,
          items: _ctx.tabBarItems,
          activeTab: _ctx.activeHeaderTab,
          onSelect: _ctx.onTabSelected
        }, null, 8, ["items", "activeTab", "onSelect"])) : createCommentVNode("", true)
      ], 512), [
        [vShow, !_ctx.hideMenuBar]
      ])
    ], 2)
  ]);
}
const MainHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MainHeader as default
};
