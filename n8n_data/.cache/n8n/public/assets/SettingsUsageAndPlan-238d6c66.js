import { d as defineComponent, aL as useRoute, aD as useRouter, r as ref, c as computed, N as onMounted, h as resolveComponent, o as openBlock, k as createElementBlock, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, p as unref, b as createBlock, n as normalizeClass, q as createCommentVNode, j as createBaseVNode, a9 as normalizeStyle, af as withModifiers, aB as pushScopeId, aC as popScopeId } from "./vendor-fd4bd18c.js";
import { bg as useUsageStore, n as useUIStore, u as useToast, p as i18n, gi as telemetry, gj as N8N_PRICING_PAGE_URL, _ as _export_sfc } from "./n8n-8ddd8349.js";
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
const _withScopeId = (n) => (pushScopeId("data-v-00c4893a"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "settings-usage-and-plan" };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = ["href"];
const _hoisted_8 = ["href"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsUsageAndPlan",
  setup(__props) {
    const usageStore = useUsageStore();
    const route = useRoute();
    const router = useRouter();
    const uiStore = useUIStore();
    const toast = useToast();
    const queryParamCallback = ref(
      `callback=${encodeURIComponent(`${window.location.origin}${window.location.pathname}`)}`
    );
    const viewPlansUrl = computed(
      () => `${usageStore.viewPlansUrl}&${queryParamCallback.value}&source=usage_page`
    );
    const managePlanUrl = computed(() => `${usageStore.managePlanUrl}&${queryParamCallback.value}`);
    const activationKeyModal = ref(false);
    const activationKey = ref("");
    const activationKeyInput = ref(null);
    const showActivationSuccess = () => {
      toast.showMessage({
        type: "success",
        title: i18n.baseText("settings.usageAndPlan.license.activation.success.title"),
        message: i18n.baseText("settings.usageAndPlan.license.activation.success.message", {
          interpolate: {
            name: usageStore.planName,
            type: usageStore.planId ? i18n.baseText("settings.usageAndPlan.plan") : i18n.baseText("settings.usageAndPlan.edition")
          }
        })
      });
    };
    const showActivationError = (error) => {
      toast.showError(
        error,
        i18n.baseText("settings.usageAndPlan.license.activation.error.title"),
        error.message
      );
    };
    const onLicenseActivation = async () => {
      try {
        await usageStore.activateLicense(activationKey.value);
        activationKeyModal.value = false;
        showActivationSuccess();
      } catch (error) {
        showActivationError(error);
      }
    };
    onMounted(async () => {
      if (usageStore.isDesktop) {
        return;
      }
      usageStore.setLoading(true);
      if (route.query.key) {
        try {
          await usageStore.activateLicense(route.query.key);
          await router.replace({ query: {} });
          showActivationSuccess();
          usageStore.setLoading(false);
          return;
        } catch (error) {
          showActivationError(error);
        }
      }
      try {
        if (!route.query.key && usageStore.canUserActivateLicense) {
          await usageStore.refreshLicenseManagementToken();
        } else {
          await usageStore.getLicenseInfo();
        }
        usageStore.setLoading(false);
      } catch (error) {
        if (!error.name) {
          error.name = i18n.baseText("settings.usageAndPlan.error");
        }
        toast.showError(error, error.name, error.message);
      }
    });
    const sendUsageTelemetry = (action) => {
      const telemetryPayload = usageStore.telemetryPayload;
      telemetryPayload.action = action;
      telemetry.track("User clicked button on usage page", telemetryPayload);
    };
    const onAddActivationKey = () => {
      activationKeyModal.value = true;
      sendUsageTelemetry("add_activation_key");
    };
    const onViewPlans = () => {
      void uiStore.goToUpgrade("usage_page", "open");
      sendUsageTelemetry("view_plans");
    };
    const onManagePlan = () => {
      sendUsageTelemetry("manage_plan");
    };
    const onDialogClosed = () => {
      activationKey.value = "";
    };
    const onDialogOpened = () => {
      var _a;
      (_a = activationKeyInput.value) == null ? void 0 : _a.focus();
    };
    const openPricingPage = () => {
      sendUsageTelemetry("desktop_view_plans");
      window.open(N8N_PRICING_PAGE_URL, "_blank");
    };
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_input = resolveComponent("n8n-input");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_n8n_heading, { size: "2xlarge" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(i18n).baseText("settings.usageAndPlan.title")), 1)
          ]),
          _: 1
        }),
        unref(usageStore).isDesktop ? (openBlock(), createBlock(_component_n8n_action_box, {
          key: 0,
          class: normalizeClass(_ctx.$style.actionBox),
          heading: unref(i18n).baseText("settings.usageAndPlan.desktop.title"),
          description: unref(i18n).baseText("settings.usageAndPlan.desktop.description"),
          buttonText: unref(i18n).baseText("settings.usageAndPlan.button.plans"),
          "onClick:button": openPricingPage
        }, null, 8, ["class", "heading", "description", "buttonText"])) : createCommentVNode("", true),
        !unref(usageStore).isDesktop && !unref(usageStore).isLoading ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_component_n8n_heading, {
            class: normalizeClass(_ctx.$style.title),
            size: "large"
          }, {
            default: withCtx(() => [
              createVNode(_component_i18n_t, {
                keypath: "settings.usageAndPlan.description",
                tag: "span"
              }, {
                name: withCtx(() => [
                  createTextVNode(toDisplayString(unref(usageStore).planName), 1)
                ]),
                type: withCtx(() => [
                  unref(usageStore).planId ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(unref(i18n).baseText("settings.usageAndPlan.plan")), 1)) : (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(unref(i18n).baseText("settings.usageAndPlan.edition")), 1))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["class"]),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.quota)
          }, [
            createVNode(_component_n8n_text, {
              size: "medium",
              color: "text-light"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.usageAndPlan.activeWorkflows")), 1)
              ]),
              _: 1
            }),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.chart)
            }, [
              unref(usageStore).executionLimit > 0 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(_ctx.$style.chartLine)
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style.chartBar),
                  style: normalizeStyle({ width: `${unref(usageStore).executionPercentage}%` })
                }, null, 6)
              ], 2)) : createCommentVNode("", true),
              createVNode(_component_i18n_t, {
                tag: "span",
                class: normalizeClass(_ctx.$style.count),
                keypath: "settings.usageAndPlan.activeWorkflows.count"
              }, {
                count: withCtx(() => [
                  createTextVNode(toDisplayString(unref(usageStore).executionCount), 1)
                ]),
                limit: withCtx(() => [
                  unref(usageStore).executionLimit < 0 ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(unref(i18n).baseText("settings.usageAndPlan.activeWorkflows.unlimited")), 1)) : (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(unref(usageStore).executionLimit), 1))
                ]),
                _: 1
              }, 8, ["class"])
            ], 2)
          ], 2),
          createVNode(_component_n8n_info_tip, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("settings.usageAndPlan.activeWorkflows.hint")), 1)
            ]),
            _: 1
          }),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.buttons)
          }, [
            unref(usageStore).canUserActivateLicense ? (openBlock(), createBlock(_component_n8n_button, {
              key: 0,
              class: normalizeClass(_ctx.$style.buttonTertiary),
              onClick: onAddActivationKey,
              type: "tertiary",
              size: "large"
            }, {
              default: withCtx(() => [
                createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("settings.usageAndPlan.button.activation")), 1)
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true),
            unref(usageStore).managementToken ? (openBlock(), createBlock(_component_n8n_button, {
              key: 1,
              onClick: onManagePlan,
              size: "large"
            }, {
              default: withCtx(() => [
                createBaseVNode("a", {
                  href: managePlanUrl.value,
                  target: "_blank"
                }, toDisplayString(unref(i18n).baseText("settings.usageAndPlan.button.manage")), 9, _hoisted_7)
              ]),
              _: 1
            })) : (openBlock(), createBlock(_component_n8n_button, {
              key: 2,
              onClick: withModifiers(onViewPlans, ["prevent"]),
              size: "large"
            }, {
              default: withCtx(() => [
                createBaseVNode("a", {
                  href: viewPlansUrl.value,
                  target: "_blank"
                }, toDisplayString(unref(i18n).baseText("settings.usageAndPlan.button.plans")), 9, _hoisted_8)
              ]),
              _: 1
            }, 8, ["onClick"]))
          ], 2),
          createVNode(_component_el_dialog, {
            width: "480px",
            top: "0",
            onClosed: onDialogClosed,
            onOpened: onDialogOpened,
            modelValue: activationKeyModal.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => activationKeyModal.value = $event),
            title: unref(i18n).baseText("settings.usageAndPlan.dialog.activation.title"),
            "modal-class": _ctx.$style.center
          }, {
            default: withCtx(() => [
              createVNode(_component_n8n_input, {
                ref_key: "activationKeyInput",
                ref: activationKeyInput,
                modelValue: activationKey.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activationKey.value = $event),
                placeholder: unref(i18n).baseText("settings.usageAndPlan.dialog.activation.label")
              }, null, 8, ["modelValue", "placeholder"])
            ]),
            footer: withCtx(() => [
              createVNode(_component_n8n_button, {
                onClick: _cache[1] || (_cache[1] = ($event) => activationKeyModal.value = false),
                type: "secondary"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("settings.usageAndPlan.dialog.activation.cancel")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_n8n_button, { onClick: onLicenseActivation }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("settings.usageAndPlan.dialog.activation.activate")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title", "modal-class"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const center = "_center_iajr8_5";
const actionBox = "_actionBox_iajr8_9";
const spacedFlex = "_spacedFlex_iajr8_13";
const title = "_title_iajr8_19";
const quota = "_quota_iajr8_24";
const count = "_count_iajr8_36";
const buttons = "_buttons_iajr8_41";
const chart = "_chart_iajr8_57";
const chartLine = "_chartLine_iajr8_64";
const chartBar = "_chartBar_iajr8_74";
const style0 = {
  center,
  actionBox,
  spacedFlex,
  title,
  quota,
  count,
  buttons,
  chart,
  chartLine,
  chartBar
};
const SettingsUsageAndPlan_vue_vue_type_style_index_1_scoped_00c4893a_lang = "";
const cssModules = {
  "$style": style0
};
const SettingsUsageAndPlan = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__scopeId", "data-v-00c4893a"]]);
export {
  SettingsUsageAndPlan as default
};
