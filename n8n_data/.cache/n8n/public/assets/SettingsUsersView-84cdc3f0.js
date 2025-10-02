import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { u as useToast, dJ as useSSOStore, bg as useUsageStore, t as useUsersStore, n as useUIStore, y as useSettingsStore, aa as EnterpriseEditionFeature, B as VIEWS, bm as INVITE_USER_MODAL_KEY, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { c as copyPaste } from "./index-00f166b0.js";
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
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
import "./codemirror-lang-n8n-expression-5b146a0d.js";
import "./fast-json-stable-stringify-4acbec5d.js";
import "./timeago.js-527228bd.js";
import "./qrcode.vue-401ae704.js";
import "./vue3-touch-events-c30a9e21.js";
import "./@fortawesome/free-solid-svg-icons-e786cea6.js";
import "./@fortawesome/free-regular-svg-icons-d7581360.js";
import "./chart.js-b7590faa.js";
const _sfc_main = defineComponent({
  name: "SettingsUsersView",
  mixins: [copyPaste],
  setup() {
    return {
      ...useToast()
    };
  },
  async mounted() {
    if (!this.usersStore.showUMSetupWarning) {
      await this.usersStore.fetchUsers();
    }
  },
  computed: {
    ...mapStores(useSettingsStore, useUIStore, useUsersStore, useUsageStore, useSSOStore),
    isSharingEnabled() {
      return this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Sharing);
    },
    usersListActions() {
      return [
        {
          label: this.$locale.baseText("settings.users.actions.copyInviteLink"),
          value: "copyInviteLink",
          guard: (user) => this.settingsStore.isBelowUserQuota && !user.firstName && !!user.inviteAcceptUrl
        },
        {
          label: this.$locale.baseText("settings.users.actions.reinvite"),
          value: "reinvite",
          guard: (user) => this.settingsStore.isBelowUserQuota && !user.firstName && this.settingsStore.isSmtpSetup
        },
        {
          label: this.$locale.baseText("settings.users.actions.delete"),
          value: "delete"
        },
        {
          label: this.$locale.baseText("settings.users.actions.copyPasswordResetLink"),
          value: "copyPasswordResetLink",
          guard: () => this.settingsStore.isBelowUserQuota
        },
        {
          label: this.$locale.baseText("settings.users.actions.allowSSOManualLogin"),
          value: "allowSSOManualLogin",
          guard: (user) => {
            var _a;
            return this.settingsStore.isSamlLoginEnabled && !((_a = user.settings) == null ? void 0 : _a.allowSSOManualLogin);
          }
        },
        {
          label: this.$locale.baseText("settings.users.actions.disallowSSOManualLogin"),
          value: "disallowSSOManualLogin",
          guard: (user) => {
            var _a;
            return this.settingsStore.isSamlLoginEnabled && ((_a = user.settings) == null ? void 0 : _a.allowSSOManualLogin) === true;
          }
        }
      ];
    }
  },
  methods: {
    redirectToSetup() {
      void this.$router.push({ name: VIEWS.SETUP });
    },
    onInvite() {
      this.uiStore.openModal(INVITE_USER_MODAL_KEY);
    },
    async onDelete(userId) {
      const user = this.usersStore.getUserById(userId);
      if (user) {
        this.uiStore.openDeleteUserModal(userId);
      }
    },
    async onReinvite(userId) {
      const user = this.usersStore.getUserById(userId);
      if (user == null ? void 0 : user.email) {
        try {
          await this.usersStore.reinviteUser({ email: user.email });
          this.showToast({
            type: "success",
            title: this.$locale.baseText("settings.users.inviteResent"),
            message: this.$locale.baseText("settings.users.emailSentTo", {
              interpolate: { email: user.email ?? "" }
            })
          });
        } catch (e) {
          this.showError(e, this.$locale.baseText("settings.users.userReinviteError"));
        }
      }
    },
    async onCopyInviteLink(userId) {
      const user = this.usersStore.getUserById(userId);
      if (user == null ? void 0 : user.inviteAcceptUrl) {
        this.copyToClipboard(user.inviteAcceptUrl);
        this.showToast({
          type: "success",
          title: this.$locale.baseText("settings.users.inviteUrlCreated"),
          message: this.$locale.baseText("settings.users.inviteUrlCreated.message")
        });
      }
    },
    async onCopyPasswordResetLink(userId) {
      const user = this.usersStore.getUserById(userId);
      if (user) {
        const url = await this.usersStore.getUserPasswordResetLink(user);
        this.copyToClipboard(url.link);
        this.showToast({
          type: "success",
          title: this.$locale.baseText("settings.users.passwordResetUrlCreated"),
          message: this.$locale.baseText("settings.users.passwordResetUrlCreated.message")
        });
      }
    },
    async onAllowSSOManualLogin(userId) {
      const user = this.usersStore.getUserById(userId);
      if (user) {
        if (!user.settings) {
          user.settings = {};
        }
        user.settings.allowSSOManualLogin = true;
        await this.usersStore.updateOtherUserSettings(userId, user.settings);
        this.showToast({
          type: "success",
          title: this.$locale.baseText("settings.users.allowSSOManualLogin"),
          message: this.$locale.baseText("settings.users.allowSSOManualLogin.message")
        });
      }
    },
    async onDisallowSSOManualLogin(userId) {
      const user = this.usersStore.getUserById(userId);
      if (user == null ? void 0 : user.settings) {
        user.settings.allowSSOManualLogin = false;
        await this.usersStore.updateOtherUserSettings(userId, user.settings);
        this.showToast({
          type: "success",
          title: this.$locale.baseText("settings.users.disallowSSOManualLogin"),
          message: this.$locale.baseText("settings.users.disallowSSOManualLogin.message")
        });
      }
    },
    goToUpgrade() {
      void this.uiStore.goToUpgrade("settings-users", "upgrade-users");
    }
  }
});
const container = "_container_n5y84_5";
const usersContainer = "_usersContainer_n5y84_13";
const buttonContainer = "_buttonContainer_n5y84_17";
const setupInfoContainer = "_setupInfoContainer_n5y84_23";
const alert = "_alert_n5y84_27";
const style0 = {
  container,
  usersContainer,
  buttonContainer,
  setupInfoContainer,
  alert
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_n8n_action_box = resolveComponent("n8n-action-box");
  const _component_n8n_users_list = resolveComponent("n8n-users-list");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createBaseVNode("div", null, [
      createVNode(_component_n8n_heading, { size: "2xlarge" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.users")), 1)
        ]),
        _: 1
      }),
      !_ctx.usersStore.showUMSetupWarning ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.buttonContainer)
      }, [
        createVNode(_component_n8n_tooltip, {
          disabled: !_ctx.ssoStore.isSamlLoginEnabled
        }, {
          content: withCtx(() => [
            createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("settings.users.invite.tooltip")), 1)
          ]),
          default: withCtx(() => [
            createBaseVNode("div", null, [
              createVNode(_component_n8n_button, {
                disabled: _ctx.ssoStore.isSamlLoginEnabled || !_ctx.settingsStore.isBelowUserQuota,
                label: _ctx.$locale.baseText("settings.users.invite"),
                onClick: _ctx.onInvite,
                size: "large",
                "data-test-id": "settings-users-invite-button"
              }, null, 8, ["disabled", "label", "onClick"])
            ])
          ]),
          _: 1
        }, 8, ["disabled"])
      ], 2)) : createCommentVNode("", true)
    ]),
    !_ctx.settingsStore.isBelowUserQuota ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.setupInfoContainer)
    }, [
      createVNode(_component_n8n_action_box, {
        heading: _ctx.$locale.baseText(_ctx.uiStore.contextBasedTranslationKeys.users.settings.unavailable.title),
        description: _ctx.$locale.baseText(
          _ctx.uiStore.contextBasedTranslationKeys.users.settings.unavailable.description
        ),
        buttonText: _ctx.$locale.baseText(_ctx.uiStore.contextBasedTranslationKeys.users.settings.unavailable.button),
        "onClick:button": _ctx.goToUpgrade
      }, null, 8, ["heading", "description", "buttonText", "onClick:button"])
    ], 2)) : createCommentVNode("", true),
    _ctx.settingsStore.isBelowUserQuota || _ctx.usersStore.allUsers.length > 1 ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.$style.usersContainer)
    }, [
      createVNode(_component_n8n_users_list, {
        actions: _ctx.usersListActions,
        users: _ctx.usersStore.allUsers,
        currentUserId: _ctx.usersStore.currentUserId,
        isSamlLoginEnabled: _ctx.ssoStore.isSamlLoginEnabled,
        onDelete: _ctx.onDelete,
        onReinvite: _ctx.onReinvite,
        onCopyInviteLink: _ctx.onCopyInviteLink,
        onCopyPasswordResetLink: _ctx.onCopyPasswordResetLink,
        onAllowSSOManualLogin: _ctx.onAllowSSOManualLogin,
        onDisallowSSOManualLogin: _ctx.onDisallowSSOManualLogin
      }, null, 8, ["actions", "users", "currentUserId", "isSamlLoginEnabled", "onDelete", "onReinvite", "onCopyInviteLink", "onCopyPasswordResetLink", "onAllowSSOManualLogin", "onDisallowSSOManualLogin"])
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const SettingsUsersView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsUsersView as default
};
