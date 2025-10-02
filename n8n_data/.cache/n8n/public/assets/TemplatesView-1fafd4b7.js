import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, j as createBaseVNode, t as toDisplayString, q as createCommentVNode, g as renderSlot } from "./vendor-fd4bd18c.js";
import { B as VIEWS, _ as _export_sfc } from "./n8n-8ddd8349.js";
const _sfc_main$1 = defineComponent({
  name: "GoBackButton",
  data() {
    return {
      routeHasHistory: false
    };
  },
  methods: {
    navigateTo() {
      if (this.routeHasHistory)
        this.$router.go(-1);
      else
        void this.$router.push({ name: VIEWS.TEMPLATES });
    }
  },
  mounted() {
    window.history.state ? this.routeHasHistory = true : this.routeHasHistory = false;
  }
});
const wrapper = "_wrapper_8n8b4_5";
const icon = "_icon_8n8b4_10";
const text = "_text_8n8b4_11";
const style0$1 = {
  wrapper,
  icon,
  text
};
const _hoisted_1 = ["textContent"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.wrapper),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.navigateTo && _ctx.navigateTo(...args))
  }, [
    createVNode(_component_font_awesome_icon, {
      class: normalizeClass(_ctx.$style.icon),
      icon: "arrow-left"
    }, null, 8, ["class"]),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.text),
      textContent: toDisplayString(_ctx.$locale.baseText("template.buttons.goBackButton"))
    }, null, 10, _hoisted_1)
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const GoBackButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "TemplatesView",
  components: {
    GoBackButton
  },
  props: {
    goBackEnabled: {
      type: Boolean,
      default: false
    }
  }
});
const template = "_template_zfb12_5";
const container = "_container_zfb12_18";
const header = "_header_zfb12_22";
const goBack = "_goBack_zfb12_28";
const style0 = {
  template,
  container,
  header,
  goBack
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_GoBackButton = resolveComponent("GoBackButton");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.template)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.container)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.header)
      }, [
        _ctx.goBackEnabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.goBack)
        }, [
          createVNode(_component_GoBackButton)
        ], 2)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "header")
      ], 2),
      createBaseVNode("div", null, [
        renderSlot(_ctx.$slots, "content")
      ])
    ], 2)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const TemplatesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  TemplatesView as T
};
