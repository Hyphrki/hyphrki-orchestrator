import { d as defineComponent, aD as useRouter, r as ref, a as reactive, o as openBlock, b as createBlock } from "./vendor-fd4bd18c.js";
import { dJ as useSSOStore, p as i18n, B as VIEWS, gk as ElNotification } from "./n8n-8ddd8349.js";
import { A as AuthView } from "./AuthView-11fc56c0.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SamlOnboarding",
  setup(__props) {
    var _a, _b;
    const router = useRouter();
    const ssoStore = useSSOStore();
    const loading = ref(false);
    const FORM_CONFIG = reactive({
      title: i18n.baseText("auth.signup.setupYourAccount"),
      buttonText: i18n.baseText("auth.signup.finishAccountSetup"),
      inputs: [
        {
          name: "firstName",
          initialValue: (_a = ssoStore.userData) == null ? void 0 : _a.firstName,
          properties: {
            label: i18n.baseText("auth.firstName"),
            maxlength: 32,
            required: true,
            autocomplete: "given-name",
            capitalize: true
          }
        },
        {
          name: "lastName",
          initialValue: (_b = ssoStore.userData) == null ? void 0 : _b.lastName,
          properties: {
            label: i18n.baseText("auth.lastName"),
            maxlength: 32,
            required: true,
            autocomplete: "family-name",
            capitalize: true
          }
        }
      ]
    });
    const onSubmit = async (values) => {
      try {
        loading.value = true;
        await ssoStore.updateUser(values);
        await router.push({ name: VIEWS.HOMEPAGE });
      } catch (error) {
        loading.value = false;
        ElNotification.error({
          title: "Error",
          message: error.message,
          position: "bottom-right"
        });
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AuthView, {
        form: FORM_CONFIG,
        formLoading: loading.value,
        onSubmit
      }, null, 8, ["form", "formLoading"]);
    };
  }
});
export {
  _sfc_main as default
};
