import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, a3 as Fragment, ai as renderList, i as createVNode, t as toDisplayString, q as createCommentVNode, f as withCtx, s as createTextVNode, b as createBlock, af as withModifiers, j as createBaseVNode } from "./vendor-fd4bd18c.js";
import { g as genericHelpers, N as NodeIcon, l as TimeAgo } from "./index-00f166b0.js";
import { ga as filterTemplateNodes, _ as _export_sfc, g9 as abbreviateNumber } from "./n8n-8ddd8349.js";
const _sfc_main$2 = defineComponent({
  name: "NodeList",
  mixins: [genericHelpers],
  props: {
    nodes: {
      type: Array
    },
    limit: {
      type: Number,
      default: 4
    },
    size: {
      type: String,
      default: "sm"
    }
  },
  components: {
    NodeIcon
  },
  computed: {
    filteredCoreNodes() {
      return filterTemplateNodes(this.nodes);
    },
    hiddenNodes() {
      return this.filteredCoreNodes.length - this.countNodesToBeSliced(this.filteredCoreNodes);
    },
    slicedNodes() {
      return this.filteredCoreNodes.slice(0, this.countNodesToBeSliced(this.filteredCoreNodes));
    }
  },
  methods: {
    countNodesToBeSliced(nodes2) {
      if (nodes2.length > this.limit) {
        return this.limit - 1;
      } else {
        return this.limit;
      }
    }
  }
});
const list = "_list_8cn7s_5";
const container = "_container_8cn7s_13";
const sm = "_sm_8cn7s_18";
const md = "_md_8cn7s_22";
const button$1 = "_button_8cn7s_26";
const buttonSm = "_buttonSm_8cn7s_40";
const buttonMd = "_buttonMd_8cn7s_47";
const style0$2 = {
  list,
  container,
  sm,
  md,
  button: button$1,
  buttonSm,
  buttonMd
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NodeIcon = resolveComponent("NodeIcon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.list)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.slicedNodes, (node) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([_ctx.$style.container, _ctx.$style[_ctx.size]]),
        key: node.name
      }, [
        createVNode(_component_NodeIcon, {
          nodeType: node,
          size: _ctx.size === "md" ? 24 : 18,
          showTooltip: true
        }, null, 8, ["nodeType", "size"])
      ], 2);
    }), 128)),
    _ctx.filteredCoreNodes.length > _ctx.limit + 1 ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([_ctx.$style.button, _ctx.size === "md" ? _ctx.$style.buttonMd : _ctx.$style.buttonSm])
    }, " +" + toDisplayString(_ctx.hiddenNodes), 3)) : createCommentVNode("", true)
  ], 2);
}
const cssModules$2 = {
  "$style": style0$2
};
const NodeList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__cssModules", cssModules$2]]);
const _sfc_main$1 = defineComponent({
  name: "TemplateCard",
  mixins: [genericHelpers],
  props: {
    lastItem: {
      type: Boolean,
      default: false
    },
    firstItem: {
      type: Boolean,
      default: false
    },
    workflow: {
      type: Object
    },
    useWorkflowButton: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    simpleView: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TimeAgo,
    NodeList
  },
  data() {
    return {
      nodesToBeShown: 5
    };
  },
  methods: {
    filterTemplateNodes,
    abbreviateNumber,
    countNodesToBeSliced(nodes2) {
      if (nodes2.length > this.nodesToBeShown) {
        return this.nodesToBeShown - 1;
      } else {
        return this.nodesToBeShown;
      }
    },
    onUseWorkflowClick(e) {
      this.$emit("useWorkflow", e);
    },
    onCardClick(e) {
      this.$emit("click", e);
    }
  }
});
const nodes$1 = "_nodes_akyr5_5";
const icon = "_icon_akyr5_12";
const card = "_card_akyr5_16";
const hideOnHover = "_hideOnHover_akyr5_28";
const buttonContainer = "_buttonContainer_akyr5_31";
const loaded = "_loaded_akyr5_42";
const first = "_first_akyr5_46";
const last = "_last_akyr5_52";
const content = "_content_akyr5_57";
const line = "_line_akyr5_62";
const loading = "_loading_akyr5_68";
const nodesContainer = "_nodesContainer_akyr5_73";
const style0$1 = {
  nodes: nodes$1,
  icon,
  card,
  hideOnHover,
  buttonContainer,
  loaded,
  first,
  last,
  content,
  line,
  loading,
  nodesContainer
};
const _hoisted_1$1 = { key: 1 };
const _hoisted_2$1 = { key: 0 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_TimeAgo = resolveComponent("TimeAgo");
  const _component_NodeList = resolveComponent("NodeList");
  const _component_n8n_button = resolveComponent("n8n-button");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      _ctx.$style.card,
      _ctx.lastItem && _ctx.$style.last,
      _ctx.firstItem && _ctx.$style.first,
      !_ctx.loading && _ctx.$style.loaded
    ]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCardClick && _ctx.onCardClick(...args))
  }, [
    _ctx.loading ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.loading)
    }, [
      createVNode(_component_n8n_loading, {
        rows: 2,
        shrinkLast: false,
        loading: _ctx.loading
      }, null, 8, ["loading"])
    ], 2)) : (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(_component_n8n_heading, {
        bold: true,
        size: "small"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.workflow.name), 1)
        ]),
        _: 1
      }),
      !_ctx.simpleView ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.content)
      }, [
        _ctx.workflow.totalViews ? (openBlock(), createElementBlock("span", _hoisted_2$1, [
          createVNode(_component_n8n_text, {
            size: "small",
            color: "text-light"
          }, {
            default: withCtx(() => [
              createVNode(_component_font_awesome_icon, { icon: "eye" }),
              createTextVNode(" " + toDisplayString(_ctx.abbreviateNumber(_ctx.workflow.totalViews)), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        _ctx.workflow.totalViews ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.$style.line),
          textContent: "|"
        }, null, 2)) : createCommentVNode("", true),
        createVNode(_component_n8n_text, {
          size: "small",
          color: "text-light"
        }, {
          default: withCtx(() => [
            createVNode(_component_TimeAgo, {
              date: _ctx.workflow.createdAt
            }, null, 8, ["date"])
          ]),
          _: 1
        }),
        _ctx.workflow.user ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(_ctx.$style.line),
          textContent: "|"
        }, null, 2)) : createCommentVNode("", true),
        _ctx.workflow.user ? (openBlock(), createBlock(_component_n8n_text, {
          key: 3,
          size: "small",
          color: "text-light"
        }, {
          default: withCtx(() => [
            createTextVNode("By " + toDisplayString(_ctx.workflow.user.username), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true)
    ])),
    !_ctx.loading ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: normalizeClass([_ctx.$style.nodesContainer, _ctx.useWorkflowButton && _ctx.$style.hideOnHover])
    }, [
      _ctx.workflow.nodes ? (openBlock(), createBlock(_component_NodeList, {
        key: 0,
        nodes: _ctx.workflow.nodes,
        limit: _ctx.nodesToBeShown,
        size: "md"
      }, null, 8, ["nodes", "limit"])) : createCommentVNode("", true)
    ], 2)) : createCommentVNode("", true),
    _ctx.useWorkflowButton ? (openBlock(), createElementBlock("div", {
      key: 3,
      class: normalizeClass(_ctx.$style.buttonContainer)
    }, [
      _ctx.useWorkflowButton ? (openBlock(), createBlock(_component_n8n_button, {
        key: 0,
        outline: "",
        label: "Use workflow",
        onClick: withModifiers(_ctx.onUseWorkflowClick, ["stop"])
      }, null, 8, ["onClick"])) : createCommentVNode("", true)
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const TemplateCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "TemplateList",
  mixins: [genericHelpers],
  props: {
    infiniteScrollEnabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean
    },
    useWorkflowButton: {
      type: Boolean,
      default: false
    },
    workflows: {
      type: Array
    },
    totalWorkflows: {
      type: Number
    },
    simpleView: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.infiniteScrollEnabled) {
      const content2 = document.getElementById("content");
      if (content2) {
        content2.addEventListener("scroll", this.onScroll);
      }
    }
  },
  beforeUnmount() {
    const content2 = document.getElementById("content");
    if (content2) {
      content2.removeEventListener("scroll", this.onScroll);
    }
  },
  components: {
    TemplateCard
  },
  methods: {
    onScroll() {
      const loaderRef = this.$refs.loader;
      if (!loaderRef || this.loading) {
        return;
      }
      const rect = loaderRef.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      if (inView) {
        this.$emit("loadMore");
      }
    },
    onCardClick(event, id) {
      this.$emit("openTemplate", { event, id });
    },
    onUseWorkflow(event, id) {
      this.$emit("useWorkflow", { event, id });
    }
  }
});
const header = "_header_cr9gx_5";
const workflowButton = "_workflowButton_cr9gx_9";
const button = "_button_cr9gx_9";
const nodes = "_nodes_cr9gx_12";
const style0 = {
  header,
  workflowButton,
  button,
  nodes
};
const _hoisted_1 = ["textContent"];
const _hoisted_2 = {
  key: 0,
  ref: "loader"
};
const _hoisted_3 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_TemplateCard = resolveComponent("TemplateCard");
  return _ctx.loading || _ctx.workflows.length ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass(_ctx.$style.list)
  }, [
    !_ctx.simpleView ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.header)
    }, [
      createVNode(_component_n8n_heading, {
        bold: true,
        size: "medium",
        color: "text-light"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("templates.workflows")) + " ", 1),
          !_ctx.loading && _ctx.totalWorkflows ? (openBlock(), createElementBlock("span", {
            key: 0,
            textContent: toDisplayString(`(${_ctx.totalWorkflows})`)
          }, null, 8, _hoisted_1)) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ], 2)) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.container)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.workflows, (workflow, index) => {
        return openBlock(), createBlock(_component_TemplateCard, {
          key: workflow.id,
          workflow,
          firstItem: index === 0,
          "simple-view": _ctx.simpleView,
          lastItem: index === _ctx.workflows.length - 1 && !_ctx.loading,
          useWorkflowButton: _ctx.useWorkflowButton,
          onClick: (e) => _ctx.onCardClick(e, workflow.id),
          onUseWorkflow: (e) => _ctx.onUseWorkflow(e, workflow.id)
        }, null, 8, ["workflow", "firstItem", "simple-view", "lastItem", "useWorkflowButton", "onClick", "onUseWorkflow"]);
      }), 128)),
      _ctx.infiniteScrollEnabled ? (openBlock(), createElementBlock("div", _hoisted_2, null, 512)) : createCommentVNode("", true),
      _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_3, [
        (openBlock(), createElementBlock(Fragment, null, renderList(4, (n) => {
          return createVNode(_component_TemplateCard, {
            key: "index-" + n,
            loading: true,
            firstItem: _ctx.workflows.length === 0 && n === 1,
            lastItem: n === 4
          }, null, 8, ["firstItem", "lastItem"]);
        }), 64))
      ])) : createCommentVNode("", true)
    ], 2)
  ], 2)) : createCommentVNode("", true);
}
const cssModules = {
  "$style": style0
};
const TemplateList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  NodeList as N,
  TemplateList as T
};
