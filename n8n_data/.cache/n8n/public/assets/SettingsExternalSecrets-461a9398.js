import { d as defineComponent, H as toRefs, c as computed, N as onMounted, h as resolveComponent, o as openBlock, b as createBlock, f as withCtx, j as createBaseVNode, i as createVNode, n as normalizeClass, p as unref, s as createTextVNode, t as toDisplayString, q as createCommentVNode, k as createElementBlock, L as nextTick, a3 as Fragment, ai as renderList } from "./vendor-fd4bd18c.js";
import { ad as useExternalSecretsStore, n as useUIStore, u as useToast, dv as useExternalSecretsProvider, am as useI18n, dw as EXTERNAL_SECRETS_PROVIDER_MODAL_KEY, _ as _export_sfc, $ as useMessage } from "./n8n-8ddd8349.js";
import { _ as _sfc_main$2, o as ExternalSecretsProviderConnectionSwitch } from "./index-00f166b0.js";
import { D as DateTime } from "./luxon-63e8a0ed.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ExternalSecretsProviderCard.ee",
  props: {
    provider: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const externalSecretsStore = useExternalSecretsStore();
    const i18n = useI18n();
    const uiStore = useUIStore();
    const toast = useToast();
    const { provider } = toRefs(props);
    const providerData = computed(() => provider.value.data);
    const {
      connectionState,
      initialConnectionState,
      normalizedProviderData,
      testConnection,
      setConnectionState
    } = useExternalSecretsProvider(provider, providerData);
    const actionDropdownOptions = computed(() => [
      {
        value: "setup",
        label: i18n.baseText("settings.externalSecrets.card.actionDropdown.setup")
      },
      ...props.provider.connected ? [
        {
          value: "reload",
          label: i18n.baseText("settings.externalSecrets.card.actionDropdown.reload")
        }
      ] : []
    ]);
    const canConnect = computed(() => {
      return props.provider.connected || Object.keys(props.provider.data).length > 0;
    });
    const formattedDate = computed((provider2) => {
      return DateTime.fromISO(props.provider.connectedAt).toFormat("dd LLL yyyy");
    });
    onMounted(() => {
      setConnectionState(props.provider.state);
    });
    async function onBeforeConnectionUpdate() {
      if (props.provider.connected) {
        return true;
      }
      await externalSecretsStore.getProvider(props.provider.name);
      await nextTick();
      const status = await testConnection();
      return status !== "error";
    }
    function openExternalSecretProvider() {
      uiStore.openModalWithData({
        name: EXTERNAL_SECRETS_PROVIDER_MODAL_KEY,
        data: { name: props.provider.name }
      });
    }
    async function reloadProvider() {
      try {
        await externalSecretsStore.reloadProvider(props.provider.name);
        toast.showMessage({
          title: i18n.baseText("settings.externalSecrets.card.reload.success.title"),
          message: i18n.baseText("settings.externalSecrets.card.reload.success.description", {
            interpolate: { provider: props.provider.displayName }
          }),
          type: "success"
        });
      } catch (error) {
        toast.showError(error, i18n.baseText("error"));
      }
    }
    async function onActionDropdownClick(id) {
      switch (id) {
        case "setup":
          openExternalSecretProvider();
          break;
        case "reload":
          await reloadProvider();
          break;
      }
    }
    return (_ctx, _cache) => {
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_card = resolveComponent("n8n-card");
      return openBlock(), createBlock(_component_n8n_card, {
        class: normalizeClass(_ctx.$style.card)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardBody)
          }, [
            createVNode(_sfc_main$2, {
              class: normalizeClass(_ctx.$style.cardImage),
              provider: unref(provider)
            }, null, 8, ["class", "provider"]),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.cardContent)
            }, [
              createVNode(_component_n8n_text, { bold: "" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(provider).displayName), 1)
                ]),
                _: 1
              }),
              unref(provider).connected ? (openBlock(), createBlock(_component_n8n_text, {
                key: 0,
                color: "text-light",
                size: "small"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("settings.externalSecrets.card.secretsCount", {
                      interpolate: {
                        count: `${(_a = unref(externalSecretsStore).secrets[unref(provider).name]) == null ? void 0 : _a.length}`
                      }
                    })), 1),
                    createTextVNode(" | "),
                    createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("settings.externalSecrets.card.connectedAt", {
                      interpolate: {
                        date: formattedDate.value
                      }
                    })), 1)
                  ];
                }),
                _: 1
              })) : createCommentVNode("", true)
            ], 2),
            canConnect.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.cardActions)
            }, [
              createVNode(ExternalSecretsProviderConnectionSwitch, {
                provider: unref(provider),
                beforeUpdate: onBeforeConnectionUpdate,
                disabled: unref(connectionState) === "error" && !unref(provider).connected
              }, null, 8, ["provider", "disabled"]),
              createVNode(_component_n8n_action_toggle, {
                class: "ml-s",
                theme: "dark",
                actions: actionDropdownOptions.value,
                onAction: onActionDropdownClick
              }, null, 8, ["actions"])
            ], 2)) : (openBlock(), createBlock(_component_n8n_button, {
              key: 1,
              type: "tertiary",
              onClick: _cache[0] || (_cache[0] = ($event) => openExternalSecretProvider())
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.externalSecrets.card.setUp")), 1)
              ]),
              _: 1
            }))
          ], 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const card = "_card_63ubk_5";
const cardImage = "_cardImage_63ubk_10";
const cardBody = "_cardBody_63ubk_15";
const cardContent = "_cardContent_63ubk_21";
const cardActions = "_cardActions_63ubk_28";
const style0 = {
  card,
  cardImage,
  cardBody,
  cardContent,
  cardActions
};
const cssModules = {
  "$style": style0
};
const ExternalSecretsProviderCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules]]);
const _hoisted_1 = { class: "pb-3xl" };
const _hoisted_2 = {
  key: 0,
  "data-test-id": "external-secrets-content-licensed"
};
const _hoisted_3 = ["href"];
const _hoisted_4 = ["href"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsExternalSecrets",
  setup(__props) {
    const i18n = useI18n();
    const uiStore = useUIStore();
    const externalSecretsStore = useExternalSecretsStore();
    const message = useMessage();
    const toast = useToast();
    const sortedProviders = computed(() => {
      return [...externalSecretsStore.providers].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    });
    onMounted(() => {
      try {
        void externalSecretsStore.fetchAllSecrets();
        void externalSecretsStore.getProviders();
      } catch (error) {
        toast.showError(error, i18n.baseText("error"));
      }
    });
    function goToUpgrade() {
      void uiStore.goToUpgrade("external-secrets", "upgrade-external-secrets");
    }
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_callout = resolveComponent("n8n-callout");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n8n_heading, { size: "2xlarge" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(i18n).baseText("settings.externalSecrets.title")), 1)
          ]),
          _: 1
        }),
        unref(externalSecretsStore).isEnterpriseExternalSecretsEnabled ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_component_n8n_callout, {
            theme: "secondary",
            class: "mt-2xl mb-l"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("settings.externalSecrets.info")) + " ", 1),
              createBaseVNode("a", {
                href: unref(i18n).baseText("settings.externalSecrets.docs"),
                target: "_blank"
              }, toDisplayString(unref(i18n).baseText("settings.externalSecrets.info.link")), 9, _hoisted_3)
            ]),
            _: 1
          }),
          (openBlock(true), createElementBlock(Fragment, null, renderList(sortedProviders.value, (provider) => {
            return openBlock(), createBlock(ExternalSecretsProviderCard, {
              key: provider.name,
              provider
            }, null, 8, ["provider"]);
          }), 128))
        ])) : (openBlock(), createBlock(_component_n8n_action_box, {
          key: 1,
          class: "mt-2xl mb-l",
          "data-test-id": "external-secrets-content-unlicensed",
          buttonText: unref(i18n).baseText("settings.externalSecrets.actionBox.buttonText"),
          onClick: goToUpgrade
        }, {
          heading: withCtx(() => [
            createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("settings.externalSecrets.actionBox.title")), 1)
          ]),
          description: withCtx(() => [
            createVNode(_component_i18n_t, { keypath: "settings.externalSecrets.actionBox.description" }, {
              link: withCtx(() => [
                createBaseVNode("a", {
                  href: unref(i18n).baseText("settings.externalSecrets.docs"),
                  target: "_blank"
                }, toDisplayString(unref(i18n).baseText("settings.externalSecrets.actionBox.description.link")), 9, _hoisted_4)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["buttonText"]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
