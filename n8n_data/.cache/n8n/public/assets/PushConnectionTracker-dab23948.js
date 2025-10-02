import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, i as createVNode, f as withCtx, j as createBaseVNode, s as createTextVNode, t as toDisplayString, g as renderSlot } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { x as useRootStore, _ as _export_sfc } from "./n8n-8ddd8349.js";
const _sfc_main = defineComponent({
  name: "PushConnectionTracker",
  computed: {
    ...mapStores(useRootStore)
  }
});
const _hoisted_1 = {
  key: 0,
  class: "push-connection-lost primary-color"
};
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  return openBlock(), createElementBlock("span", null, [
    !_ctx.rootStore.pushConnectionActive ? (openBlock(), createElementBlock("div", _hoisted_1, [
      createVNode(_component_n8n_tooltip, { placement: "bottom-end" }, {
        content: withCtx(() => [
          createBaseVNode("div", {
            innerHTML: _ctx.$locale.baseText("pushConnectionTracker.cannotConnectToServer")
          }, null, 8, _hoisted_2)
        ]),
        default: withCtx(() => [
          createBaseVNode("span", null, [
            createVNode(_component_font_awesome_icon, { icon: "exclamation-triangle" }),
            createTextVNode("  " + toDisplayString(_ctx.$locale.baseText("pushConnectionTracker.connectionLost")), 1)
          ])
        ]),
        _: 1
      })
    ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
  ]);
}
const PushConnectionTracker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PushConnectionTracker as P
};
