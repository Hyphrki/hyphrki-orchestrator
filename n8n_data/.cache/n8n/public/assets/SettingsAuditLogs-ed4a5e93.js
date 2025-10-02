import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, p as unref, b as createBlock, j as createBaseVNode, n as normalizeClass } from "./vendor-fd4bd18c.js";
import { n as useUIStore, go as useAuditLogsStore, am as useI18n, _ as _export_sfc } from "./n8n-8ddd8349.js";
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
const _hoisted_1 = {
  key: 0,
  "data-test-id": "audit-logs-content-licensed"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsAuditLogs",
  setup(__props) {
    const locale = useI18n();
    const uiStore = useUIStore();
    const auditLogsStore = useAuditLogsStore();
    const goToUpgrade = () => {
      void uiStore.goToUpgrade("audit-logs", "upgrade-audit-logs");
    };
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_n8n_heading, {
          size: "2xlarge",
          tag: "h1"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(locale).baseText("settings.auditLogs.title")), 1)
          ]),
          _: 1
        }),
        unref(auditLogsStore).isEnterpriseAuditLogsFeatureEnabled ? (openBlock(), createElementBlock("div", _hoisted_1)) : (openBlock(), createBlock(_component_n8n_action_box, {
          key: 1,
          "data-test-id": "audit-logs-content-unlicensed",
          class: normalizeClass(_ctx.$style.actionBox),
          description: unref(locale).baseText("settings.auditLogs.actionBox.description"),
          buttonText: unref(locale).baseText("settings.auditLogs.actionBox.buttonText"),
          "onClick:button": goToUpgrade
        }, {
          heading: withCtx(() => [
            createBaseVNode("span", null, toDisplayString(unref(locale).baseText("settings.auditLogs.actionBox.title")), 1)
          ]),
          _: 1
        }, 8, ["class", "description", "buttonText"]))
      ]);
    };
  }
});
const actionBox = "_actionBox_wwwe5_5";
const style0 = {
  actionBox
};
const cssModules = {
  "$style": style0
};
const SettingsAuditLogs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  SettingsAuditLogs as default
};
