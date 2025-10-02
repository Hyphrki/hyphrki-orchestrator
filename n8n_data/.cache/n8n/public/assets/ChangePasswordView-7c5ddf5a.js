import { A as AuthView } from "./AuthView-11fc56c0.js";
import { u as useToast, t as useUsersStore, db as MFA_AUTHENTICATION_TOKEN_INPUT_MAX_LENGTH, B as VIEWS, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, q as createCommentVNode } from "./vendor-fd4bd18c.js";
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
  name: "ChangePasswordView",
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
      password: "",
      loading: false,
      config: null
    };
  },
  computed: {
    ...mapStores(useUsersStore)
  },
  async mounted() {
    const form = {
      title: this.$locale.baseText("auth.changePassword"),
      buttonText: this.$locale.baseText("auth.changePassword"),
      redirectText: this.$locale.baseText("auth.signin"),
      redirectLink: "/signin",
      inputs: [
        {
          name: "password",
          properties: {
            label: this.$locale.baseText("auth.newPassword"),
            type: "password",
            required: true,
            validationRules: [{ name: "DEFAULT_PASSWORD_RULES" }],
            infoText: this.$locale.baseText("auth.defaultPasswordRequirements"),
            autocomplete: "new-password",
            capitalize: true
          }
        },
        {
          name: "password2",
          properties: {
            label: this.$locale.baseText("auth.changePassword.reenterNewPassword"),
            type: "password",
            required: true,
            validators: {
              TWO_PASSWORDS_MATCH: {
                validate: this.passwordsMatch
              }
            },
            validationRules: [{ name: "TWO_PASSWORDS_MATCH" }],
            autocomplete: "new-password",
            capitalize: true
          }
        }
      ]
    };
    const token = this.getResetToken();
    const mfaEnabled = this.getMfaEnabled();
    if (mfaEnabled) {
      form.inputs.push({
        name: "mfaToken",
        initialValue: "",
        properties: {
          required: true,
          label: this.$locale.baseText("mfa.code.input.label"),
          placeholder: this.$locale.baseText("mfa.code.input.placeholder"),
          maxlength: MFA_AUTHENTICATION_TOKEN_INPUT_MAX_LENGTH,
          capitalize: true,
          validateOnBlur: true
        }
      });
    }
    this.config = form;
    try {
      if (!token) {
        throw new Error(this.$locale.baseText("auth.changePassword.missingTokenError"));
      }
      await this.usersStore.validatePasswordToken({ token });
    } catch (e) {
      this.showError(e, this.$locale.baseText("auth.changePassword.tokenValidationError"));
      void this.$router.replace({ name: VIEWS.SIGNIN });
    }
  },
  methods: {
    passwordsMatch(value) {
      if (typeof value !== "string") {
        return false;
      }
      if (value !== this.password) {
        return {
          messageKey: "auth.changePassword.passwordsMustMatchError"
        };
      }
      return false;
    },
    onInput(e) {
      if (e.name === "password") {
        this.password = e.value;
      }
    },
    getResetToken() {
      return !this.$route.query.token || typeof this.$route.query.token !== "string" ? null : this.$route.query.token;
    },
    getMfaEnabled() {
      if (!this.$route.query.mfaEnabled)
        return null;
      return this.$route.query.mfaEnabled === "true" ? true : false;
    },
    async onSubmit(values) {
      try {
        this.loading = true;
        const token = this.getResetToken();
        if (token) {
          const changePasswordParameters = {
            token,
            password: this.password,
            ...values.mfaToken && { mfaToken: values.mfaToken }
          };
          await this.usersStore.changePassword(changePasswordParameters);
          this.showMessage({
            type: "success",
            title: this.$locale.baseText("auth.changePassword.passwordUpdated"),
            message: this.$locale.baseText("auth.changePassword.passwordUpdatedMessage")
          });
          await this.$router.push({ name: VIEWS.SIGNIN });
        } else {
          this.showError(
            new Error(this.$locale.baseText("auth.validation.missingParameters")),
            this.$locale.baseText("auth.changePassword.error")
          );
        }
      } catch (error) {
        this.showError(error, this.$locale.baseText("auth.changePassword.error"));
      }
      this.loading = false;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AuthView = resolveComponent("AuthView");
  return _ctx.config ? (openBlock(), createBlock(_component_AuthView, {
    key: 0,
    form: _ctx.config,
    formLoading: _ctx.loading,
    onSubmit: _ctx.onSubmit,
    onUpdate: _ctx.onInput
  }, null, 8, ["form", "formLoading", "onSubmit", "onUpdate"])) : createCommentVNode("", true);
}
const ChangePasswordView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ChangePasswordView as default
};
