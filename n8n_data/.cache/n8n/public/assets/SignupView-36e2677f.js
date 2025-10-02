import { A as AuthView } from "./AuthView-11fc56c0.js";
import { u as useToast, B as VIEWS, t as useUsersStore, n as useUIStore, _ as _export_sfc } from "./n8n-8ddd8349.js";
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
  name: "SignupView",
  components: {
    AuthView
  },
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    const FORM_CONFIG = {
      title: this.$locale.baseText("auth.signup.setupYourAccount"),
      buttonText: this.$locale.baseText("auth.signup.finishAccountSetup"),
      inputs: [
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
            validationRules: [{ name: "DEFAULT_PASSWORD_RULES" }],
            required: true,
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
      loading: false,
      inviter: null,
      inviterId: null,
      inviteeId: null
    };
  },
  async mounted() {
    const inviterId = !this.$route.query.inviterId || typeof this.$route.query.inviterId !== "string" ? null : this.$route.query.inviterId;
    const inviteeId = !this.$route.query.inviteeId || typeof this.$route.query.inviteeId !== "string" ? null : this.$route.query.inviteeId;
    try {
      if (!inviterId || !inviteeId) {
        throw new Error(this.$locale.baseText("auth.signup.missingTokenError"));
      }
      this.inviterId = inviterId;
      this.inviteeId = inviteeId;
      const invite = await this.usersStore.validateSignupToken({ inviteeId, inviterId });
      this.inviter = invite.inviter;
    } catch (e) {
      this.showError(e, this.$locale.baseText("auth.signup.tokenValidationError"));
      void this.$router.replace({ name: VIEWS.SIGNIN });
    }
  },
  computed: {
    ...mapStores(useUIStore, useUsersStore),
    inviteMessage() {
      if (!this.inviter) {
        return null;
      }
      return this.$locale.baseText("settings.signup.signUpInviterInfo", {
        interpolate: { firstName: this.inviter.firstName, lastName: this.inviter.lastName }
      });
    }
  },
  methods: {
    async onSubmit(values) {
      if (!this.inviterId || !this.inviteeId) {
        this.showError(
          new Error(this.$locale.baseText("auth.signup.tokenValidationError")),
          this.$locale.baseText("auth.signup.setupYourAccountError")
        );
        return;
      }
      try {
        this.loading = true;
        await this.usersStore.signup({
          ...values,
          inviterId: this.inviterId,
          inviteeId: this.inviteeId
        });
        if (values.agree === true) {
          try {
            await this.uiStore.submitContactEmail(values.email.toString(), values.agree);
          } catch {
          }
        }
        await this.$router.push({ name: VIEWS.NEW_WORKFLOW });
      } catch (error) {
        this.showError(error, this.$locale.baseText("auth.signup.setupYourAccountError"));
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
    subtitle: _ctx.inviteMessage,
    onSubmit: _ctx.onSubmit
  }, null, 8, ["form", "formLoading", "subtitle", "onSubmit"]);
}
const SignupView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  SignupView as default
};
