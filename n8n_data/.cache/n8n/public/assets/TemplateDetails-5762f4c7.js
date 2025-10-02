import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, g as renderSlot, b as createBlock, a3 as Fragment, ai as renderList, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { _ as _export_sfc, a0 as useTemplatesStore, g9 as abbreviateNumber, ga as filterTemplateNodes } from "./n8n-8ddd8349.js";
import { N as NodeIcon, l as TimeAgo } from "./index-00f166b0.js";
import { m as mapStores } from "./pinia-282957dc.js";
const _sfc_main$1 = defineComponent({
  name: "TemplateDetailsBlock",
  props: {
    title: {
      type: String
    }
  }
});
const block = "_block_phs27_5";
const header = "_header_phs27_9";
const content = "_content_phs27_14";
const style0$1 = {
  block,
  header,
  content
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.block)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      createVNode(_component_n8n_heading, {
        tag: "h3",
        size: "small",
        color: "text-base"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ]),
        _: 1
      })
    ], 2),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.content)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const TemplateDetailsBlock = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "TemplateDetails",
  props: {
    blockTitle: {
      type: String
    },
    loading: {
      type: Boolean
    },
    template: {
      type: Object
    }
  },
  components: {
    NodeIcon,
    TemplateDetailsBlock,
    TimeAgo
  },
  computed: {
    ...mapStores(useTemplatesStore)
  },
  methods: {
    abbreviateNumber,
    filterTemplateNodes,
    redirectToCategory(id) {
      this.templatesStore.resetSessionId();
      void this.$router.push(`/templates?categories=${id}`);
    },
    redirectToSearchPage(node) {
      this.templatesStore.resetSessionId();
      void this.$router.push(`/templates?search=${node.displayName}`);
    }
  }
});
const icons = "_icons_1f0ax_5";
const icon = "_icon_1f0ax_5";
const text = "_text_1f0ax_16";
const style0 = {
  icons,
  icon,
  text
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_NodeIcon = resolveComponent("NodeIcon");
  const _component_template_details_block = resolveComponent("template-details-block");
  const _component_n8n_tags = resolveComponent("n8n-tags");
  const _component_TimeAgo = resolveComponent("TimeAgo");
  const _component_n8n_text = resolveComponent("n8n-text");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_n8n_loading, {
      loading: _ctx.loading,
      rows: 5,
      variant: "p"
    }, null, 8, ["loading"]),
    !_ctx.loading && _ctx.template.nodes.length > 0 ? (openBlock(), createBlock(_component_template_details_block, {
      key: 0,
      title: _ctx.blockTitle
    }, {
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.icons)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filterTemplateNodes(_ctx.template.nodes), (node) => {
            return openBlock(), createElementBlock("div", {
              key: node.name,
              class: normalizeClass(_ctx.$style.icon)
            }, [
              createVNode(_component_NodeIcon, {
                nodeType: node,
                size: 24,
                showTooltip: true,
                onClick: ($event) => _ctx.redirectToSearchPage(node)
              }, null, 8, ["nodeType", "onClick"])
            ], 2);
          }), 128))
        ], 2)
      ]),
      _: 1
    }, 8, ["title"])) : createCommentVNode("", true),
    !_ctx.loading && ((_a = _ctx.template) == null ? void 0 : _a.categories.length) > 0 ? (openBlock(), createBlock(_component_template_details_block, {
      key: 1,
      title: _ctx.$locale.baseText("template.details.categories")
    }, {
      default: withCtx(() => [
        createVNode(_component_n8n_tags, {
          tags: _ctx.template.categories,
          "onClick:tag": _ctx.redirectToCategory
        }, null, 8, ["tags", "onClick:tag"])
      ]),
      _: 1
    }, 8, ["title"])) : createCommentVNode("", true),
    !_ctx.loading ? (openBlock(), createBlock(_component_template_details_block, {
      key: 2,
      title: _ctx.$locale.baseText("template.details.details")
    }, {
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.text)
        }, [
          createVNode(_component_n8n_text, {
            size: "small",
            color: "text-base"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("template.details.created")) + " ", 1),
              createVNode(_component_TimeAgo, {
                date: _ctx.template.createdAt
              }, null, 8, ["date"]),
              createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("template.details.by")) + " " + toDisplayString(_ctx.template.user ? _ctx.template.user.username : "n8n team"), 1)
            ]),
            _: 1
          })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.text)
        }, [
          _ctx.template.totalViews !== 0 ? (openBlock(), createBlock(_component_n8n_text, {
            key: 0,
            size: "small",
            color: "text-base"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("template.details.viewed")) + " " + toDisplayString(_ctx.abbreviateNumber(_ctx.template.totalViews)) + " " + toDisplayString(_ctx.$locale.baseText("template.details.times")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], 2)
      ]),
      _: 1
    }, 8, ["title"])) : createCommentVNode("", true)
  ]);
}
const cssModules = {
  "$style": style0
};
const TemplateDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  TemplateDetails as T
};
