import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { L as Logo, A as AuthView } from "./AuthView-11fc56c0.js";
import { g as genericHelpers } from "./index-00f166b0.js";
import { u as useToast, d9 as mfaEventBus, t as useUsersStore, db as MFA_AUTHENTICATION_TOKEN_INPUT_MAX_LENGTH, g6 as MFA_AUTHENTICATION_RECOVERY_CODE_INPUT_MAX_LENGTH, _ as _export_sfc, q as useCloudPlanStore, n as useUIStore, y as useSettingsStore, B as VIEWS, g7 as MFA_AUTHENTICATION_REQUIRED_ERROR_CODE } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
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
const FORM = {
  MFA_TOKEN: "MFA_TOKEN",
  MFA_RECOVERY_CODE: "MFA_RECOVERY_CODE"
};
const _sfc_main$1 = defineComponent({
  name: "MfaView",
  mixins: [genericHelpers],
  components: {
    Logo
  },
  props: {
    reportError: Boolean
  },
  async mounted() {
    this.formInputs = [this.mfaTokenFieldWithDefaults()];
  },
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      hasAnyChanges: false,
      formBus: mfaEventBus,
      formInputs: null,
      showRecoveryCodeForm: false,
      verifyingMfaToken: false,
      formError: ""
    };
  },
  computed: {
    ...mapStores(useUsersStore)
  },
  methods: {
    onRecoveryCodeClick() {
      this.formError = "";
      this.showRecoveryCodeForm = true;
      this.hasAnyChanges = false;
      this.formInputs = [this.mfaRecoveryCodeFieldWithDefaults()];
      this.$emit("onFormChanged", FORM.MFA_RECOVERY_CODE);
    },
    onBackClick() {
      if (!this.showRecoveryCodeForm) {
        this.$emit("onBackClick", FORM.MFA_TOKEN);
        return;
      }
      this.showRecoveryCodeForm = false;
      this.hasAnyChanges = true;
      this.formInputs = [this.mfaTokenFieldWithDefaults()];
      this.$emit("onBackClick", FORM.MFA_RECOVERY_CODE);
    },
    onInput({ target: { value, name } }) {
      const isSubmittingMfaToken = name === "token";
      const inputValidLength = isSubmittingMfaToken ? MFA_AUTHENTICATION_TOKEN_INPUT_MAX_LENGTH : MFA_AUTHENTICATION_RECOVERY_CODE_INPUT_MAX_LENGTH;
      if (value.length !== inputValidLength) {
        this.hasAnyChanges = false;
        return;
      }
      this.verifyingMfaToken = true;
      this.hasAnyChanges = true;
      this.onSubmit({ token: value, recoveryCode: value }).catch(() => {
      }).finally(() => this.verifyingMfaToken = false);
    },
    async onSubmit(form) {
      this.formError = !this.showRecoveryCodeForm ? this.$locale.baseText("mfa.code.invalid") : this.$locale.baseText("mfa.recovery.invalid");
      this.$emit("submit", form);
    },
    onSaveClick() {
      this.formBus.emit("submit");
    },
    mfaTokenFieldWithDefaults() {
      return this.formField(
        "token",
        this.$locale.baseText("mfa.code.input.label"),
        this.$locale.baseText("mfa.code.input.placeholder"),
        MFA_AUTHENTICATION_TOKEN_INPUT_MAX_LENGTH
      );
    },
    mfaRecoveryCodeFieldWithDefaults() {
      return this.formField(
        "recoveryCode",
        this.$locale.baseText("mfa.recovery.input.label"),
        this.$locale.baseText("mfa.recovery.input.placeholder"),
        MFA_AUTHENTICATION_RECOVERY_CODE_INPUT_MAX_LENGTH
      );
    },
    formField(name, label, placeholder, maxlength, focus = true) {
      return {
        name,
        initialValue: "",
        properties: {
          label,
          placeholder,
          maxlength,
          capitalize: true,
          validateOnBlur: false,
          focusInitially: focus
        }
      };
    }
  }
});
const container = "_container_1995o_9";
const logoContainer = "_logoContainer_1995o_20";
const formContainer = "_formContainer_1995o_25";
const headerContainer = "_headerContainer_1995o_29";
const formError = "_formError_1995o_34";
const recoveryCodeLink = "_recoveryCodeLink_1995o_38";
const infoBox = "_infoBox_1995o_42";
const style0 = {
  container,
  logoContainer,
  formContainer,
  headerContainer,
  formError,
  recoveryCodeLink,
  infoBox
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Logo = resolveComponent("Logo");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_form_inputs = resolveComponent("n8n-form-inputs");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_card = resolveComponent("n8n-card");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.logoContainer)
    }, [
      createVNode(_component_Logo)
    ], 2),
    createVNode(_component_n8n_card, null, {
      default: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.headerContainer)
        }, [
          createVNode(_component_n8n_heading, {
            size: "xlarge",
            color: "text-dark"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.showRecoveryCodeForm ? _ctx.$locale.baseText("mfa.recovery.modal.title") : _ctx.$locale.baseText("mfa.code.modal.title")), 1)
            ]),
            _: 1
          })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass([_ctx.$style.formContainer, _ctx.reportError ? _ctx.$style.formError : ""])
        }, [
          _ctx.formInputs ? (openBlock(), createBlock(_component_n8n_form_inputs, {
            key: 0,
            "data-test-id": "mfa-login-form",
            inputs: _ctx.formInputs,
            eventBus: _ctx.formBus,
            onInput: _ctx.onInput,
            onSubmit: _ctx.onSubmit
          }, null, 8, ["inputs", "eventBus", "onInput", "onSubmit"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.infoBox)
          }, [
            !_ctx.showRecoveryCodeForm && !_ctx.reportError ? (openBlock(), createBlock(_component_n8n_text, {
              key: 0,
              size: "small",
              color: "text-base",
              bold: false
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("mfa.code.input.info")) + " ", 1),
                createBaseVNode("a", {
                  "data-test-id": "mfa-enter-recovery-code-button",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onRecoveryCodeClick && _ctx.onRecoveryCodeClick(...args))
                }, toDisplayString(_ctx.$locale.baseText("mfa.code.input.info.action")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            _ctx.reportError ? (openBlock(), createBlock(_component_n8n_text, {
              key: 1,
              color: "danger",
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.formError) + " ", 1),
                !_ctx.showRecoveryCodeForm ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onRecoveryCodeClick && _ctx.onRecoveryCodeClick(...args)),
                  class: normalizeClass(_ctx.$style.recoveryCodeLink)
                }, toDisplayString(_ctx.$locale.baseText("mfa.recovery.input.info.action")), 3)) : createCommentVNode("", true)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ], 2)
        ], 2),
        createBaseVNode("div", null, [
          createVNode(_component_n8n_button, {
            float: "right",
            loading: _ctx.verifyingMfaToken,
            label: _ctx.showRecoveryCodeForm ? _ctx.$locale.baseText("mfa.recovery.button.verify") : _ctx.$locale.baseText("mfa.code.button.continue"),
            size: "large",
            disabled: !_ctx.hasAnyChanges,
            onClick: _ctx.onSaveClick
          }, null, 8, ["loading", "label", "disabled", "onClick"]),
          createVNode(_component_n8n_button, {
            float: "left",
            label: _ctx.$locale.baseText("mfa.button.back"),
            size: "large",
            type: "tertiary",
            onClick: _ctx.onBackClick
          }, null, 8, ["label", "onClick"])
        ])
      ]),
      _: 1
    })
  ], 2);
}
const cssModules = {
  "$style": style0
};
const MfaView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules]]);
const _sfc_main = defineComponent({
  name: "SigninView",
  mixins: [genericHelpers],
  components: {
    AuthView,
    MfaView
  },
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      FORM_CONFIG: {},
      loading: false,
      showMfaView: false,
      email: "",
      password: "",
      reportError: false
    };
  },
  computed: {
    ...mapStores(useUsersStore, useSettingsStore, useUIStore, useCloudPlanStore),
    userHasMfaEnabled() {
      var _a;
      return !!((_a = this.usersStore.currentUser) == null ? void 0 : _a.mfaEnabled);
    }
  },
  mounted() {
    let emailLabel = this.$locale.baseText("auth.email");
    const ldapLoginLabel = this.settingsStore.ldapLoginLabel;
    const isLdapLoginEnabled = this.settingsStore.isLdapLoginEnabled;
    if (isLdapLoginEnabled && ldapLoginLabel) {
      emailLabel = ldapLoginLabel;
    }
    this.FORM_CONFIG = {
      title: this.$locale.baseText("auth.signin"),
      buttonText: this.$locale.baseText("auth.signin"),
      redirectText: this.$locale.baseText("forgotPassword"),
      inputs: [
        {
          name: "email",
          properties: {
            label: emailLabel,
            type: "email",
            required: true,
            ...!isLdapLoginEnabled && { validationRules: [{ name: "VALID_EMAIL" }] },
            showRequiredAsterisk: false,
            validateOnBlur: false,
            autocomplete: "email",
            capitalize: true
          }
        },
        {
          name: "password",
          properties: {
            label: this.$locale.baseText("auth.password"),
            type: "password",
            required: true,
            showRequiredAsterisk: false,
            validateOnBlur: false,
            autocomplete: "current-password",
            capitalize: true
          }
        }
      ]
    };
    if (!this.settingsStore.isDesktopDeployment) {
      this.FORM_CONFIG.redirectLink = "/forgot-password";
    }
  },
  methods: {
    async onMFASubmitted(form) {
      await this.login({
        email: this.email,
        password: this.password,
        token: form.token,
        recoveryCode: form.recoveryCode
      });
    },
    async onEmailPasswordSubmitted(form) {
      await this.login(form);
    },
    async login(form) {
      try {
        this.loading = true;
        await this.usersStore.loginWithCreds({
          email: form.email,
          password: form.password,
          mfaToken: form.token,
          mfaRecoveryCode: form.recoveryCode
        });
        this.loading = false;
        await this.cloudPlanStore.checkForCloudPlanData();
        await this.settingsStore.getSettings();
        this.clearAllStickyNotifications();
        this.checkRecoveryCodesLeft();
        this.$telemetry.track("User attempted to login", {
          result: this.showMfaView ? "mfa_success" : "success"
        });
        if (this.isRedirectSafe()) {
          const redirect = this.getRedirectQueryParameter();
          void this.$router.push(redirect);
          return;
        }
        await this.$router.push({ name: VIEWS.HOMEPAGE });
      } catch (error) {
        if (error.errorCode === MFA_AUTHENTICATION_REQUIRED_ERROR_CODE) {
          this.showMfaView = true;
          this.cacheCredentials(form);
          return;
        }
        this.$telemetry.track("User attempted to login", {
          result: this.showMfaView ? "mfa_token_rejected" : "credentials_error"
        });
        if (!this.showMfaView) {
          this.showError(error, this.$locale.baseText("auth.signin.error"));
          this.loading = false;
          return;
        }
        this.reportError = true;
      }
    },
    onBackClick(fromForm) {
      this.reportError = false;
      if (fromForm === FORM.MFA_TOKEN) {
        this.showMfaView = false;
        this.loading = false;
      }
    },
    onFormChanged(toForm) {
      if (toForm === FORM.MFA_RECOVERY_CODE) {
        this.reportError = false;
      }
    },
    cacheCredentials(form) {
      this.email = form.email;
      this.password = form.password;
    },
    checkRecoveryCodesLeft() {
      if (this.usersStore.currentUser) {
        const { hasRecoveryCodesLeft, mfaEnabled } = this.usersStore.currentUser;
        if (mfaEnabled && !hasRecoveryCodesLeft) {
          this.showToast({
            title: this.$locale.baseText("settings.mfa.toast.noRecoveryCodeLeft.title"),
            message: this.$locale.baseText("settings.mfa.toast.noRecoveryCodeLeft.message"),
            type: "info",
            duration: 0,
            dangerouslyUseHTMLString: true
          });
        }
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AuthView = resolveComponent("AuthView");
  const _component_MfaView = resolveComponent("MfaView");
  return openBlock(), createElementBlock("div", null, [
    !_ctx.showMfaView ? (openBlock(), createBlock(_component_AuthView, {
      key: 0,
      form: _ctx.FORM_CONFIG,
      formLoading: _ctx.loading,
      "with-sso": true,
      "data-test-id": "signin-form",
      onSubmit: _ctx.onEmailPasswordSubmitted
    }, null, 8, ["form", "formLoading", "onSubmit"])) : createCommentVNode("", true),
    _ctx.showMfaView ? (openBlock(), createBlock(_component_MfaView, {
      key: 1,
      onSubmit: _ctx.onMFASubmitted,
      onOnBackClick: _ctx.onBackClick,
      onOnFormChanged: _ctx.onFormChanged,
      reportError: _ctx.reportError
    }, null, 8, ["onSubmit", "onOnBackClick", "onOnFormChanged", "reportError"])) : createCommentVNode("", true)
  ]);
}
const SigninView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SigninView as default
};
