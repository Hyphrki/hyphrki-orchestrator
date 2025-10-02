import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, j as createBaseVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { _ as _export_sfc } from "./n8n-8ddd8349.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
import "./pinia-282957dc.js";
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
const _sfc_main = defineComponent({
  name: "ErrorView",
  props: {
    messageKey: {
      type: String,
      required: true
    },
    errorCode: {
      type: Number
    },
    redirectTextKey: {
      type: String
    },
    redirectPage: {
      type: String
    }
  },
  methods: {
    onButtonClick() {
      void this.$router.push({ name: this.redirectPage });
    }
  }
});
const container = "_container_czzk4_5";
const icon = "_icon_czzk4_14";
const message = "_message_czzk4_21";
const style0 = {
  container,
  icon,
  message
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_button = resolveComponent("n8n-button");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createVNode(_component_font_awesome_icon, {
      icon: "exclamation-triangle",
      class: normalizeClass(_ctx.$style.icon)
    }, null, 8, ["class"]),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.message)
    }, [
      createBaseVNode("div", null, [
        createVNode(_component_n8n_heading, { size: "2xlarge" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText(_ctx.messageKey)), 1)
          ]),
          _: 1
        })
      ]),
      createBaseVNode("div", null, [
        _ctx.errorCode ? (openBlock(), createBlock(_component_n8n_text, {
          key: 0,
          size: "large"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.errorCode) + " " + toDisplayString(_ctx.$locale.baseText("error")), 1)
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ])
    ], 2),
    createVNode(_component_n8n_button, {
      label: _ctx.$locale.baseText(_ctx.redirectTextKey),
      onClick: _ctx.onButtonClick
    }, null, 8, ["label", "onClick"])
  ], 2);
}
const cssModules = {
  "$style": style0
};
const ErrorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  ErrorView as default
};
