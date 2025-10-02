import { A as AuthView } from "./AuthView-11fc56c0.js";
import { u as useToast, t as useUsersStore, y as useSettingsStore, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock } from "./vendor-fd4bd18c.js";
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
  name: "ForgotMyPasswordView",
  components: {
    AuthView
  },
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapStores(useSettingsStore, useUsersStore),
    formConfig() {
      const EMAIL_INPUTS = [
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
        }
      ];
      const NO_SMTP_INPUTS = [
        {
          name: "no-smtp-warning",
          properties: {
            label: this.$locale.baseText("forgotPassword.noSMTPToSendEmailWarning"),
            type: "info"
          }
        }
      ];
      const DEFAULT_FORM_CONFIG = {
        title: this.$locale.baseText("forgotPassword.recoverPassword"),
        redirectText: this.$locale.baseText("forgotPassword.returnToSignIn"),
        redirectLink: "/signin"
      };
      if (this.settingsStore.isSmtpSetup) {
        return {
          ...DEFAULT_FORM_CONFIG,
          buttonText: this.$locale.baseText("forgotPassword.getRecoveryLink"),
          inputs: EMAIL_INPUTS
        };
      }
      return {
        ...DEFAULT_FORM_CONFIG,
        inputs: NO_SMTP_INPUTS
      };
    }
  },
  methods: {
    async onSubmit(values) {
      try {
        this.loading = true;
        await this.usersStore.sendForgotPasswordEmail(values);
        this.showMessage({
          type: "success",
          title: this.$locale.baseText("forgotPassword.recoveryEmailSent"),
          message: this.$locale.baseText("forgotPassword.emailSentIfExists", {
            interpolate: { email: values.email }
          })
        });
      } catch (error) {
        let message = this.$locale.baseText("forgotPassword.smtpErrorContactAdministrator");
        if (error.httpStatusCode) {
          const { httpStatusCode: status } = error;
          if (status === 429) {
            message = this.$locale.baseText("forgotPassword.tooManyRequests");
          } else if (error.httpStatusCode === 422) {
            message = this.$locale.baseText(error.message);
          }
          this.showMessage({
            type: "error",
            title: this.$locale.baseText("forgotPassword.sendingEmailError"),
            message
          });
        }
      }
      this.loading = false;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AuthView = resolveComponent("AuthView");
  return openBlock(), createBlock(_component_AuthView, {
    form: _ctx.formConfig,
    formLoading: _ctx.loading,
    onSubmit: _ctx.onSubmit
  }, null, 8, ["form", "formLoading", "onSubmit"]);
}
const ForgotMyPasswordView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ForgotMyPasswordView as default
};
