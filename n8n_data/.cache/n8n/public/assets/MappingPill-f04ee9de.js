import { d as defineComponent, o as openBlock, k as createElementBlock, n as normalizeClass } from "./vendor-fd4bd18c.js";
import { _ as _export_sfc } from "./n8n-8ddd8349.js";
const _hoisted_1 = ["innerHTML"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MappingPill",
  props: {
    html: {},
    canDrop: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([_ctx.$style.dragPill, _ctx.canDrop ? _ctx.$style.droppablePill : _ctx.$style.defaultPill]),
        innerHTML: _ctx.html
      }, null, 10, _hoisted_1);
    };
  }
});
const dragPill = "_dragPill_1au98_5";
const droppablePill = "_droppablePill_1au98_23";
const defaultPill = "_defaultPill_1au98_30";
const style0 = {
  dragPill,
  droppablePill,
  defaultPill
};
const cssModules = {
  "$style": style0
};
const MappingPill = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  MappingPill as M
};
