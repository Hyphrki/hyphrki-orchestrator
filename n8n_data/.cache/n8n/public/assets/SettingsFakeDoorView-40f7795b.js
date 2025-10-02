import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock } from "./vendor-fd4bd18c.js";
import { F as FeatureComingSoon } from "./index-00f166b0.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { n as useUIStore, _ as _export_sfc } from "./n8n-8ddd8349.js";
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
import "./lodash-es-be629387.js";
import "./uuid-2dfcd766.js";
import "./luxon-63e8a0ed.js";
import "./esprima-next-b5fc8919.js";
import "./@vueuse/core-f4908be6.js";
import "./codemirror-lang-n8n-expression-5b146a0d.js";
import "./fast-json-stable-stringify-4acbec5d.js";
import "./timeago.js-527228bd.js";
import "./qrcode.vue-401ae704.js";
import "./vue3-touch-events-c30a9e21.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@fortawesome/free-solid-svg-icons-e786cea6.js";
import "./@fortawesome/free-regular-svg-icons-d7581360.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
import "./chart.js-b7590faa.js";
import "./flatted-551ad821.js";
import "./vue-i18n-86898575.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
const _sfc_main = defineComponent({
  name: "SettingsFakeDoorView",
  components: {
    FeatureComingSoon
  },
  props: {
    featureId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapStores(useUIStore),
    featureInfo() {
      return this.uiStore.getFakeDoorById(this.featureId);
    }
  },
  methods: {
    openLinkPage() {
      if (this.featureInfo) {
        window.open(this.featureInfo.linkURL, "_blank");
      }
    }
  }
});
const header = "_header_em75e_5";
const style0 = {
  header
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_feature_coming_soon = resolveComponent("feature-coming-soon");
  return openBlock(), createBlock(_component_feature_coming_soon, {
    featureId: _ctx.featureId,
    showTitle: ""
  }, null, 8, ["featureId"]);
}
const cssModules = {
  "$style": style0
};
const SettingsFakeDoorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsFakeDoorView as default
};
