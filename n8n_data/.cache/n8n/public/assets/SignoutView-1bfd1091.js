import { u as useToast, t as useUsersStore, B as VIEWS, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { d as defineComponent, o as openBlock, k as createElementBlock } from "./vendor-fd4bd18c.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
import "./luxon-63e8a0ed.js";
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
  name: "SignoutView",
  setup() {
    return {
      ...useToast()
    };
  },
  computed: {
    ...mapStores(useUsersStore)
  },
  methods: {
    async logout() {
      try {
        await this.usersStore.logout();
        void this.$router.replace({ name: VIEWS.SIGNIN });
      } catch (e) {
        this.showError(e, this.$locale.baseText("auth.signout.error"));
      }
    }
  },
  mounted() {
    void this.logout();
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div");
}
const SignoutView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SignoutView as default
};
