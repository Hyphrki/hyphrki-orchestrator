import { d as defineComponent, c as computed, r as ref, N as onMounted, h as resolveComponent, o as openBlock, k as createElementBlock, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, p as unref, j as createBaseVNode, b as createBlock, n as normalizeClass, q as createCommentVNode, ac as withDirectives, ad as vShow } from "./vendor-fd4bd18c.js";
import { dJ as useSSOStore, n as useUIStore, u as useToast, am as useI18n, $ as useMessage, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { f as CopyInput } from "./index-00f166b0.js";
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
const _hoisted_1 = { class: "pb-3xl" };
const _hoisted_2 = {
  href: "https://docs.n8n.io/user-management/saml/",
  target: "_blank"
};
const _hoisted_3 = {
  key: 0,
  "data-test-id": "sso-content-licensed"
};
const _hoisted_4 = { class: "mt-2xs mb-s" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsSso",
  setup(__props) {
    const IdentityProviderSettingsType = {
      URL: "url",
      XML: "xml"
    };
    const i18n = useI18n();
    const ssoStore = useSSOStore();
    const uiStore = useUIStore();
    const message = useMessage();
    const toast = useToast();
    const ssoActivatedLabel = computed(
      () => ssoStore.isSamlLoginEnabled ? i18n.baseText("settings.sso.activated") : i18n.baseText("settings.sso.deactivated")
    );
    const ssoSettingsSaved = ref(false);
    const redirectUrl = ref();
    const entityId = ref();
    const ipsOptions = ref([
      {
        label: i18n.baseText("settings.sso.settings.ips.options.url"),
        value: IdentityProviderSettingsType.URL
      },
      {
        label: i18n.baseText("settings.sso.settings.ips.options.xml"),
        value: IdentityProviderSettingsType.XML
      }
    ]);
    const ipsType = ref(IdentityProviderSettingsType.URL);
    const metadataUrl = ref();
    const metadata = ref();
    const isSaveEnabled = computed(() => {
      var _a, _b;
      if (ipsType.value === IdentityProviderSettingsType.URL) {
        return !!metadataUrl.value && metadataUrl.value !== ((_a = ssoStore.samlConfig) == null ? void 0 : _a.metadataUrl);
      } else if (ipsType.value === IdentityProviderSettingsType.XML) {
        return !!metadata.value && metadata.value !== ((_b = ssoStore.samlConfig) == null ? void 0 : _b.metadata);
      }
      return false;
    });
    const isTestEnabled = computed(() => {
      if (ipsType.value === IdentityProviderSettingsType.URL) {
        return !!metadataUrl.value && ssoSettingsSaved.value;
      } else if (ipsType.value === IdentityProviderSettingsType.XML) {
        return !!metadata.value && ssoSettingsSaved.value;
      }
      return false;
    });
    const getSamlConfig = async () => {
      const config = await ssoStore.getSamlConfig();
      entityId.value = config == null ? void 0 : config.entityID;
      redirectUrl.value = config == null ? void 0 : config.returnUrl;
      if (config == null ? void 0 : config.metadataUrl) {
        ipsType.value = IdentityProviderSettingsType.URL;
      } else if (config == null ? void 0 : config.metadata) {
        ipsType.value = IdentityProviderSettingsType.XML;
      }
      metadata.value = config == null ? void 0 : config.metadata;
      metadataUrl.value = config == null ? void 0 : config.metadataUrl;
      ssoSettingsSaved.value = !!(config == null ? void 0 : config.metadata);
    };
    const onSave = async () => {
      try {
        const config = ipsType.value === IdentityProviderSettingsType.URL ? { metadataUrl: metadataUrl.value } : { metadata: metadata.value };
        await ssoStore.saveSamlConfig(config);
        if (!ssoStore.isSamlLoginEnabled) {
          const answer = await message.confirm(
            i18n.baseText("settings.sso.settings.save.activate.message"),
            i18n.baseText("settings.sso.settings.save.activate.title"),
            {
              confirmButtonText: i18n.baseText("settings.sso.settings.save.activate.test"),
              cancelButtonText: i18n.baseText("settings.sso.settings.save.activate.cancel")
            }
          );
          if (answer === "confirm") {
            await onTest();
          }
        }
      } catch (error) {
        toast.showError(error, i18n.baseText("settings.sso.settings.save.error"));
        return;
      } finally {
        await getSamlConfig();
      }
    };
    const onTest = async () => {
      try {
        const url = await ssoStore.testSamlConfig();
        if (typeof window !== "undefined") {
          window.open(url, "_blank");
        }
      } catch (error) {
        toast.showError(error, "error");
      }
    };
    const goToUpgrade = () => {
      void uiStore.goToUpgrade("sso", "upgrade-sso");
    };
    onMounted(async () => {
      if (!ssoStore.isEnterpriseSamlEnabled) {
        return;
      }
      try {
        await getSamlConfig();
      } catch (error) {
        toast.showError(error, "error");
      }
    });
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      const _component_n8n_radio_buttons = resolveComponent("n8n-radio-buttons");
      const _component_n8n_input = resolveComponent("n8n-input");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n8n_heading, { size: "2xlarge" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(i18n).baseText("settings.sso.title")), 1)
          ]),
          _: 1
        }),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.top)
        }, [
          createVNode(_component_n8n_heading, { size: "xlarge" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("settings.sso.subtitle")), 1)
            ]),
            _: 1
          }),
          unref(ssoStore).isEnterpriseSamlEnabled ? (openBlock(), createBlock(_component_n8n_tooltip, {
            key: 0,
            disabled: unref(ssoStore).isSamlLoginEnabled || ssoSettingsSaved.value
          }, {
            content: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("settings.sso.activation.tooltip")), 1)
            ]),
            default: withCtx(() => [
              createVNode(_component_el_switch, {
                modelValue: unref(ssoStore).isSamlLoginEnabled,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(ssoStore).isSamlLoginEnabled = $event),
                disabled: !ssoSettingsSaved.value,
                class: normalizeClass(_ctx.$style.switch),
                "inactive-text": ssoActivatedLabel.value
              }, null, 8, ["modelValue", "disabled", "class", "inactive-text"])
            ]),
            _: 1
          }, 8, ["disabled"])) : createCommentVNode("", true)
        ], 2),
        createVNode(_component_n8n_info_tip, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(i18n).baseText("settings.sso.info")) + " ", 1),
            createBaseVNode("a", _hoisted_2, toDisplayString(unref(i18n).baseText("settings.sso.info.link")), 1)
          ]),
          _: 1
        }),
        unref(ssoStore).isEnterpriseSamlEnabled ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.group)
          }, [
            createBaseVNode("label", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.redirectUrl.label")), 1),
            createVNode(CopyInput, {
              value: redirectUrl.value,
              "copy-button-text": unref(i18n).baseText("generic.clickToCopy"),
              "toast-title": unref(i18n).baseText("settings.sso.settings.redirectUrl.copied")
            }, null, 8, ["value", "copy-button-text", "toast-title"]),
            createBaseVNode("small", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.redirectUrl.help")), 1)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.group)
          }, [
            createBaseVNode("label", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.entityId.label")), 1),
            createVNode(CopyInput, {
              value: entityId.value,
              "copy-button-text": unref(i18n).baseText("generic.clickToCopy"),
              "toast-title": unref(i18n).baseText("settings.sso.settings.entityId.copied")
            }, null, 8, ["value", "copy-button-text", "toast-title"]),
            createBaseVNode("small", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.entityId.help")), 1)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.group)
          }, [
            createBaseVNode("label", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.ips.label")), 1),
            createBaseVNode("div", _hoisted_4, [
              createVNode(_component_n8n_radio_buttons, {
                options: ipsOptions.value,
                modelValue: ipsType.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ipsType.value = $event)
              }, null, 8, ["options", "modelValue"])
            ]),
            withDirectives(createBaseVNode("div", null, [
              createVNode(_component_n8n_input, {
                modelValue: metadataUrl.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => metadataUrl.value = $event),
                type: "text",
                name: "metadataUrl",
                size: "large",
                placeholder: unref(i18n).baseText("settings.sso.settings.ips.url.placeholder")
              }, null, 8, ["modelValue", "placeholder"]),
              createBaseVNode("small", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.ips.url.help")), 1)
            ], 512), [
              [vShow, ipsType.value === IdentityProviderSettingsType.URL]
            ]),
            withDirectives(createBaseVNode("div", null, [
              createVNode(_component_n8n_input, {
                modelValue: metadata.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => metadata.value = $event),
                type: "textarea",
                name: "metadata",
                rows: 4
              }, null, 8, ["modelValue"]),
              createBaseVNode("small", null, toDisplayString(unref(i18n).baseText("settings.sso.settings.ips.xml.help")), 1)
            ], 512), [
              [vShow, ipsType.value === IdentityProviderSettingsType.XML]
            ])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.buttons)
          }, [
            createVNode(_component_n8n_button, {
              disabled: !isSaveEnabled.value,
              onClick: onSave,
              size: "large",
              "data-test-id": "sso-save"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.sso.settings.save")), 1)
              ]),
              _: 1
            }, 8, ["disabled"]),
            createVNode(_component_n8n_button, {
              disabled: !isTestEnabled.value,
              size: "large",
              type: "tertiary",
              onClick: onTest,
              "data-test-id": "sso-test"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.sso.settings.test")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ], 2),
          createBaseVNode("footer", {
            class: normalizeClass(_ctx.$style.footer)
          }, toDisplayString(unref(i18n).baseText("settings.sso.settings.footer.hint")), 3)
        ])) : (openBlock(), createBlock(_component_n8n_action_box, {
          key: 1,
          "data-test-id": "sso-content-unlicensed",
          class: normalizeClass(_ctx.$style.actionBox),
          description: unref(i18n).baseText("settings.sso.actionBox.description"),
          buttonText: unref(i18n).baseText("settings.sso.actionBox.buttonText"),
          "onClick:button": goToUpgrade
        }, {
          heading: withCtx(() => [
            createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("settings.sso.actionBox.title")), 1)
          ]),
          _: 1
        }, 8, ["class", "description", "buttonText"]))
      ]);
    };
  }
});
const top = "_top_1891z_5";
const buttons = "_buttons_1891z_18";
const group = "_group_1891z_27";
const actionBox = "_actionBox_1891z_43";
const footer = "_footer_1891z_47";
const style0 = {
  top,
  "switch": "_switch_1891z_12",
  buttons,
  group,
  actionBox,
  footer
};
const cssModules = {
  "$style": style0
};
const SettingsSso = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  SettingsSso as default
};
