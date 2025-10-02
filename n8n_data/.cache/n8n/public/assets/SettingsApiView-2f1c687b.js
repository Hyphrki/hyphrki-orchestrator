import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, a9 as normalizeStyle, b as createBlock, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { u as useToast, $ as useMessage, n as useUIStore, bd as DOCS_DOMAIN, q as useCloudPlanStore, t as useUsersStore, y as useSettingsStore, x as useRootStore, a9 as MODAL_CONFIRM, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { f as CopyInput } from "./index-00f166b0.js";
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
  name: "SettingsApiView",
  components: {
    CopyInput
  },
  setup() {
    return {
      ...useToast(),
      ...useMessage(),
      ...useUIStore()
    };
  },
  data() {
    return {
      loading: false,
      mounted: false,
      apiKey: "",
      swaggerUIEnabled: false,
      apiDocsURL: ""
    };
  },
  mounted() {
    void this.getApiKey();
    const baseUrl = this.rootStore.baseUrl;
    const apiPath = this.settingsStore.publicApiPath;
    const latestVersion = this.settingsStore.publicApiLatestVersion;
    this.swaggerUIEnabled = this.settingsStore.isSwaggerUIEnabled;
    this.apiDocsURL = this.swaggerUIEnabled ? `${baseUrl}${apiPath}/v${latestVersion}/docs` : `https://${DOCS_DOMAIN}/api/api-reference/`;
  },
  computed: {
    ...mapStores(useRootStore, useSettingsStore, useUsersStore, useCloudPlanStore, useUIStore),
    currentUser() {
      return this.usersStore.currentUser;
    },
    isTrialing() {
      return this.cloudPlanStore.userIsTrialing;
    },
    isLoadingCloudPlans() {
      return this.cloudPlanStore.state.loadingPlan;
    }
  },
  methods: {
    onUpgrade() {
      void this.uiStore.goToUpgrade("settings-n8n-api", "upgrade-api", "redirect");
    },
    async showDeleteModal() {
      const confirmed = await this.confirm(
        this.$locale.baseText("settings.api.delete.description"),
        this.$locale.baseText("settings.api.delete.title"),
        {
          confirmButtonText: this.$locale.baseText("settings.api.delete.button"),
          cancelButtonText: this.$locale.baseText("generic.cancel")
        }
      );
      if (confirmed === MODAL_CONFIRM) {
        await this.deleteApiKey();
      }
    },
    async getApiKey() {
      try {
        this.apiKey = await this.settingsStore.getApiKey() || "";
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.api.view.error"));
      } finally {
        this.mounted = true;
      }
    },
    async createApiKey() {
      this.loading = true;
      try {
        this.apiKey = await this.settingsStore.createApiKey() || "";
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.api.create.error"));
      } finally {
        this.loading = false;
        this.$telemetry.track("User clicked create API key button");
      }
    },
    async deleteApiKey() {
      try {
        await this.settingsStore.deleteApiKey();
        this.showMessage({
          title: this.$locale.baseText("settings.api.delete.toast"),
          type: "success"
        });
        this.apiKey = "";
      } catch (error) {
        this.showError(error, this.$locale.baseText("settings.api.delete.error"));
      } finally {
        this.$telemetry.track("User clicked delete API key button");
      }
    },
    onCopy() {
      this.$telemetry.track("User clicked copy API key button");
    }
  }
});
const container = "_container_1teme_5";
const header = "_header_1teme_9";
const card = "_card_1teme_18";
const hint = "_hint_1teme_29";
const style0 = {
  container,
  header,
  card,
  "delete": "_delete_1teme_22",
  hint
};
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "mb-s" };
const _hoisted_3 = ["textContent"];
const _hoisted_4 = ["textContent"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_i18n_t = resolveComponent("i18n-t");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_CopyInput = resolveComponent("CopyInput");
  const _component_n8n_card = resolveComponent("n8n-card");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_action_box = resolveComponent("n8n-action-box");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.header)
    }, [
      createVNode(_component_n8n_heading, { size: "2xlarge" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.api")) + " ", 1),
          createBaseVNode("span", {
            style: normalizeStyle({ fontSize: "var(--font-size-s)", color: "var(--color-text-light)" })
          }, " (" + toDisplayString(_ctx.$locale.baseText("beta")) + ") ", 5)
        ]),
        _: 1
      })
    ], 2),
    _ctx.apiKey ? (openBlock(), createElementBlock("div", _hoisted_1, [
      createBaseVNode("p", _hoisted_2, [
        createVNode(_component_n8n_info_tip, { bold: false }, {
          default: withCtx(() => [
            createVNode(_component_i18n_t, {
              keypath: "settings.api.view.info",
              tag: "span"
            }, {
              apiAction: withCtx(() => [
                createBaseVNode("a", {
                  href: "https://docs.n8n.io/api",
                  target: "_blank",
                  textContent: toDisplayString(_ctx.$locale.baseText("settings.api.view.info.api"))
                }, null, 8, _hoisted_3)
              ]),
              webhookAction: withCtx(() => [
                createBaseVNode("a", {
                  href: "https://docs.n8n.io/integrations/core-nodes/n8n-nodes-base.webhook/",
                  target: "_blank",
                  textContent: toDisplayString(_ctx.$locale.baseText("settings.api.view.info.webhook"))
                }, null, 8, _hoisted_4)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      createVNode(_component_n8n_card, {
        class: normalizeClass(["mb-4xs", _ctx.$style.card])
      }, {
        default: withCtx(() => [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.delete)
          }, [
            createVNode(_component_n8n_link, {
              onClick: _ctx.showDeleteModal,
              bold: true
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("generic.delete")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ], 2),
          createBaseVNode("div", null, [
            createVNode(_component_CopyInput, {
              label: _ctx.$locale.baseText("settings.api.view.myKey"),
              value: _ctx.apiKey,
              "copy-button-text": _ctx.$locale.baseText("generic.clickToCopy"),
              "toast-title": _ctx.$locale.baseText("settings.api.view.copy.toast"),
              redactValue: true,
              onCopy: _ctx.onCopy
            }, null, 8, ["label", "value", "copy-button-text", "toast-title", "onCopy"])
          ])
        ]),
        _: 1
      }, 8, ["class"]),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.hint)
      }, [
        createVNode(_component_n8n_text, { size: "small" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText(`settings.api.view.${_ctx.swaggerUIEnabled ? "tryapi" : "more-details"}`)), 1)
          ]),
          _: 1
        }),
        createTextVNode(" " + toDisplayString(" ") + " "),
        createVNode(_component_n8n_link, {
          to: _ctx.apiDocsURL,
          newWindow: true,
          size: "small"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText(
              `settings.api.view.${_ctx.swaggerUIEnabled ? "apiPlayground" : "external-docs"}`
            )), 1)
          ]),
          _: 1
        }, 8, ["to"])
      ], 2)
    ])) : _ctx.isTrialing ? (openBlock(), createBlock(_component_n8n_action_box, {
      key: 1,
      heading: _ctx.$locale.baseText("settings.api.trial.upgradePlan.title"),
      description: _ctx.$locale.baseText("settings.api.trial.upgradePlan.description"),
      buttonText: _ctx.$locale.baseText("settings.api.trial.upgradePlan.cta"),
      "onClick:button": _ctx.onUpgrade
    }, null, 8, ["heading", "description", "buttonText", "onClick:button"])) : _ctx.mounted && !_ctx.isLoadingCloudPlans ? (openBlock(), createBlock(_component_n8n_action_box, {
      key: 2,
      buttonText: _ctx.$locale.baseText(
        _ctx.loading ? "settings.api.create.button.loading" : "settings.api.create.button"
      ),
      description: _ctx.$locale.baseText("settings.api.create.description"),
      "onClick:button": _ctx.createApiKey
    }, null, 8, ["buttonText", "description", "onClick:button"])) : createCommentVNode("", true)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const SettingsApiView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsApiView as default
};
