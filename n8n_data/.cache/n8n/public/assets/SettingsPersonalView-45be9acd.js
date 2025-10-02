import { u as useToast, w as createEventBus, g3 as MFA_DOCS_URL, y as useSettingsStore, t as useUsersStore, n as useUIStore, aJ as CHANGE_PASSWORD_MODAL_KEY, da as MFA_SETUP_MODAL_KEY, am as useI18n, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, b as createBlock, q as createCommentVNode, a3 as Fragment, ai as renderList } from "./vendor-fd4bd18c.js";
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
  name: "SettingsPersonalView",
  setup() {
    const i18n = useI18n();
    return {
      i18n,
      ...useToast()
    };
  },
  data() {
    return {
      hasAnyChanges: false,
      formInputs: null,
      formBus: createEventBus(),
      readyToSubmit: false,
      mfaDocsUrl: MFA_DOCS_URL,
      themeOptions: [
        {
          name: "system",
          label: "settings.personal.theme.systemDefault"
        },
        {
          name: "light",
          label: "settings.personal.theme.light"
        },
        {
          name: "dark",
          label: "settings.personal.theme.dark"
        }
      ]
    };
  },
  mounted() {
    var _a, _b, _c;
    this.formInputs = [
      {
        name: "firstName",
        initialValue: (_a = this.currentUser) == null ? void 0 : _a.firstName,
        properties: {
          label: this.i18n.baseText("auth.firstName"),
          maxlength: 32,
          required: true,
          autocomplete: "given-name",
          capitalize: true,
          disabled: this.isLDAPFeatureEnabled && this.signInWithLdap
        }
      },
      {
        name: "lastName",
        initialValue: (_b = this.currentUser) == null ? void 0 : _b.lastName,
        properties: {
          label: this.i18n.baseText("auth.lastName"),
          maxlength: 32,
          required: true,
          autocomplete: "family-name",
          capitalize: true,
          disabled: this.isLDAPFeatureEnabled && this.signInWithLdap
        }
      },
      {
        name: "email",
        initialValue: (_c = this.currentUser) == null ? void 0 : _c.email,
        properties: {
          label: this.i18n.baseText("auth.email"),
          type: "email",
          required: true,
          validationRules: [{ name: "VALID_EMAIL" }],
          autocomplete: "email",
          capitalize: true,
          disabled: this.isLDAPFeatureEnabled && this.signInWithLdap || this.signInWithSaml
        }
      }
    ];
  },
  computed: {
    ...mapStores(useUIStore, useUsersStore, useSettingsStore),
    currentUser() {
      return this.usersStore.currentUser;
    },
    signInWithLdap() {
      var _a;
      return ((_a = this.currentUser) == null ? void 0 : _a.signInType) === "ldap";
    },
    isLDAPFeatureEnabled() {
      return this.settingsStore.settings.enterprise.ldap;
    },
    signInWithSaml() {
      return this.settingsStore.isSamlLoginEnabled && this.settingsStore.isDefaultAuthenticationSaml;
    },
    mfaDisabled() {
      return !this.usersStore.mfaEnabled;
    },
    isMfaFeatureEnabled() {
      return this.settingsStore.isMfaFeatureEnabled;
    },
    currentTheme() {
      return this.uiStore.theme;
    }
  },
  methods: {
    selectTheme(theme) {
      this.uiStore.setTheme(theme);
    },
    onInput() {
      this.hasAnyChanges = true;
    },
    onReadyToSubmit(ready) {
      this.readyToSubmit = ready;
    },
    async onSubmit(form) {
      if (!this.hasAnyChanges || !this.usersStore.currentUserId) {
        return;
      }
      try {
        await this.usersStore.updateUser({
          id: this.usersStore.currentUserId,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email
        });
        this.showToast({
          title: this.i18n.baseText("settings.personal.personalSettingsUpdated"),
          message: "",
          type: "success"
        });
        this.hasAnyChanges = false;
      } catch (e) {
        this.showError(e, this.i18n.baseText("settings.personal.personalSettingsUpdatedError"));
      }
    },
    onSaveClick() {
      this.formBus.emit("submit");
    },
    openPasswordModal() {
      this.uiStore.openModal(CHANGE_PASSWORD_MODAL_KEY);
    },
    onMfaEnableClick() {
      this.uiStore.openModal(MFA_SETUP_MODAL_KEY);
    },
    async onMfaDisableClick() {
      try {
        await this.usersStore.disabledMfa();
        this.showToast({
          title: this.$locale.baseText("settings.personal.mfa.toast.disabledMfa.title"),
          message: this.$locale.baseText("settings.personal.mfa.toast.disabledMfa.message"),
          type: "success",
          duration: 0
        });
      } catch (e) {
        this.showError(
          e,
          this.$locale.baseText("settings.personal.mfa.toast.disabledMfa.error.message")
        );
      }
    }
  }
});
const container = "_container_i4boh_5";
const header = "_header_i4boh_12";
const user = "_user_i4boh_21";
const username = "_username_i4boh_31";
const disableMfaButton = "_disableMfaButton_i4boh_43";
const button = "_button_i4boh_50";
const infoText = "_infoText_i4boh_57";
const themeSelect = "_themeSelect_i4boh_62";
const style0 = {
  container,
  header,
  user,
  username,
  disableMfaButton,
  button,
  infoText,
  themeSelect
};
const _hoisted_1 = { class: "mb-s" };
const _hoisted_2 = { "data-test-id": "personal-data-form" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { class: "mb-s" };
const _hoisted_5 = { class: "mb-s" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { class: "mb-xs" };
const _hoisted_8 = { class: "mb-s" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_avatar = resolveComponent("n8n-avatar");
  const _component_n8n_form_inputs = resolveComponent("n8n-form-inputs");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_input_label = resolveComponent("n8n-input-label");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container),
    "data-test-id": "personal-settings-container"
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      createVNode(_component_n8n_heading, { size: "2xlarge" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.i18n.baseText("settings.personal.personalSettings")), 1)
        ]),
        _: 1
      }),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.user)
      }, [
        createBaseVNode("span", {
          class: normalizeClass(_ctx.$style.username),
          "data-test-id": "current-user-name"
        }, [
          createVNode(_component_n8n_text, { color: "text-light" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.currentUser.fullName), 1)
            ]),
            _: 1
          })
        ], 2),
        createVNode(_component_n8n_avatar, {
          firstName: _ctx.currentUser.firstName,
          lastName: _ctx.currentUser.lastName,
          size: "large"
        }, null, 8, ["firstName", "lastName"])
      ], 2)
    ], 2),
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_1, [
        createVNode(_component_n8n_heading, { size: "large" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.i18n.baseText("settings.personal.basicInformation")), 1)
          ]),
          _: 1
        })
      ]),
      createBaseVNode("div", _hoisted_2, [
        _ctx.formInputs ? (openBlock(), createBlock(_component_n8n_form_inputs, {
          key: 0,
          inputs: _ctx.formInputs,
          eventBus: _ctx.formBus,
          onUpdate: _ctx.onInput,
          onReady: _ctx.onReadyToSubmit,
          onSubmit: _ctx.onSubmit
        }, null, 8, ["inputs", "eventBus", "onUpdate", "onReady", "onSubmit"])) : createCommentVNode("", true)
      ])
    ]),
    !_ctx.signInWithLdap && !_ctx.signInWithSaml ? (openBlock(), createElementBlock("div", _hoisted_3, [
      createBaseVNode("div", _hoisted_4, [
        createVNode(_component_n8n_heading, { size: "large" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.i18n.baseText("settings.personal.security")), 1)
          ]),
          _: 1
        })
      ]),
      createBaseVNode("div", _hoisted_5, [
        createVNode(_component_n8n_input_label, {
          label: _ctx.i18n.baseText("auth.password")
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_link, {
              onClick: _ctx.openPasswordModal,
              "data-test-id": "change-password-link"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.i18n.baseText("auth.changePassword")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          _: 1
        }, 8, ["label"])
      ]),
      _ctx.isMfaFeatureEnabled ? (openBlock(), createElementBlock("div", _hoisted_6, [
        createBaseVNode("div", _hoisted_7, [
          createVNode(_component_n8n_input_label, {
            label: _ctx.$locale.baseText("settings.personal.mfa.section.title")
          }, null, 8, ["label"]),
          createVNode(_component_n8n_text, {
            bold: false,
            class: normalizeClass(_ctx.$style.infoText)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.mfaDisabled ? _ctx.$locale.baseText("settings.personal.mfa.button.disabled.infobox") : _ctx.$locale.baseText("settings.personal.mfa.button.enabled.infobox")) + " ", 1),
              createVNode(_component_n8n_link, {
                to: _ctx.mfaDocsUrl,
                size: "small",
                bold: true
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("generic.learnMore")), 1)
                ]),
                _: 1
              }, 8, ["to"])
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        _ctx.mfaDisabled ? (openBlock(), createBlock(_component_n8n_button, {
          key: 0,
          class: normalizeClass(_ctx.$style.button),
          type: "tertiary",
          label: _ctx.$locale.baseText("settings.personal.mfa.button.enabled"),
          "data-test-id": "enable-mfa-button",
          onClick: _ctx.onMfaEnableClick
        }, null, 8, ["class", "label", "onClick"])) : (openBlock(), createBlock(_component_n8n_button, {
          key: 1,
          class: normalizeClass(_ctx.$style.disableMfaButton),
          type: "tertiary",
          label: _ctx.$locale.baseText("settings.personal.mfa.button.disabled"),
          "data-test-id": "disable-mfa-button",
          onClick: _ctx.onMfaDisableClick
        }, null, 8, ["class", "label", "onClick"]))
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true),
    createBaseVNode("div", null, [
      createBaseVNode("div", _hoisted_8, [
        createVNode(_component_n8n_heading, { size: "large" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.i18n.baseText("settings.personal.personalisation")), 1)
          ]),
          _: 1
        })
      ]),
      createBaseVNode("div", null, [
        createVNode(_component_n8n_input_label, {
          label: _ctx.i18n.baseText("settings.personal.theme")
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_select, {
              class: normalizeClass(_ctx.$style.themeSelect),
              "data-test-id": "theme-select",
              size: "small",
              "onUpdate:modelValue": _ctx.selectTheme,
              modelValue: _ctx.currentTheme,
              filterable: ""
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.themeOptions, (item) => {
                  return openBlock(), createBlock(_component_n8n_option, {
                    key: item.name,
                    label: _ctx.$t(item.label),
                    value: item.name
                  }, null, 8, ["label", "value"]);
                }), 128))
              ]),
              _: 1
            }, 8, ["class", "onUpdate:modelValue", "modelValue"])
          ]),
          _: 1
        }, 8, ["label"])
      ])
    ]),
    createBaseVNode("div", null, [
      createVNode(_component_n8n_button, {
        float: "right",
        label: _ctx.i18n.baseText("settings.personal.save"),
        size: "large",
        disabled: !_ctx.hasAnyChanges || !_ctx.readyToSubmit,
        "data-test-id": "save-settings-button",
        onClick: _ctx.onSaveClick
      }, null, 8, ["label", "disabled", "onClick"])
    ])
  ], 2);
}
const cssModules = {
  "$style": style0
};
const SettingsPersonalView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsPersonalView as default
};
