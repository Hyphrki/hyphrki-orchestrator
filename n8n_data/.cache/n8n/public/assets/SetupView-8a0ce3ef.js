import { A as AuthView } from "./AuthView-11fc56c0.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock } from "./vendor-fd4bd18c.js";
import { u as useToast, t as useUsersStore, n as useUIStore, y as useSettingsStore, B as VIEWS, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
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
  name: "SetupView",
  components: {
    AuthView
  },
  setup() {
    return useToast();
  },
  data() {
    const FORM_CONFIG = {
      title: this.$locale.baseText("auth.setup.setupOwner"),
      buttonText: this.$locale.baseText("auth.setup.next"),
      inputs: [
        {
          name: "email",
          properties: {
            label: this.$locale.baseText("auth.email"),
            type: "email",
            required: true,
            validationRules: [{ name: "VALID_EMAIL" }],
            autocomplete: "email",
            capitalize: true
          }
        },
        {
          name: "firstName",
          properties: {
            label: this.$locale.baseText("auth.firstName"),
            maxlength: 32,
            required: true,
            autocomplete: "given-name",
            capitalize: true
          }
        },
        {
          name: "lastName",
          properties: {
            label: this.$locale.baseText("auth.lastName"),
            maxlength: 32,
            required: true,
            autocomplete: "family-name",
            capitalize: true
          }
        },
        {
          name: "password",
          properties: {
            label: this.$locale.baseText("auth.password"),
            type: "password",
            required: true,
            validationRules: [{ name: "DEFAULT_PASSWORD_RULES" }],
            infoText: this.$locale.baseText("auth.defaultPasswordRequirements"),
            autocomplete: "new-password",
            capitalize: true
          }
        },
        {
          name: "agree",
          properties: {
            label: this.$locale.baseText("auth.agreement.label"),
            type: "checkbox"
          }
        }
      ]
    };
    return {
      FORM_CONFIG,
      loading: false
    };
  },
  computed: {
    ...mapStores(useSettingsStore, useUIStore, useUsersStore)
  },
  methods: {
    async onSubmit(values) {
      try {
        const forceRedirectedHere = this.settingsStore.showSetupPage;
        this.loading = true;
        await this.usersStore.createOwner(
          values
        );
        if (values.agree === true) {
          try {
            await this.uiStore.submitContactEmail(values.email.toString(), values.agree);
          } catch {
          }
        }
        if (forceRedirectedHere) {
          await this.$router.push({ name: VIEWS.NEW_WORKFLOW });
        } else {
          await this.$router.push({ name: VIEWS.USERS_SETTINGS });
        }
      } catch (error) {
        this.showError(error, this.$locale.baseText("auth.setup.settingUpOwnerError"));
      }
      this.loading = false;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AuthView = resolveComponent("AuthView");
  return openBlock(), createBlock(_component_AuthView, {
    form: _ctx.FORM_CONFIG,
    formLoading: _ctx.loading,
    "data-test-id": "setup-form",
    onSubmit: _ctx.onSubmit
  }, null, 8, ["form", "formLoading", "onSubmit"]);
}
const SetupView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SetupView as default
};
