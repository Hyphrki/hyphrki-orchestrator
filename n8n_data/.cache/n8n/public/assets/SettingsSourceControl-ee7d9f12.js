import { d as defineComponent, r as ref, c as computed, N as onMounted, a as reactive, h as resolveComponent, o as openBlock, k as createElementBlock, i as createVNode, f as withCtx, s as createTextVNode, t as toDisplayString, p as unref, j as createBaseVNode, n as normalizeClass, b as createBlock, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { z as useSourceControlStore, n as useUIStore, u as useToast, ds as useLoadingService, am as useI18n, $ as useMessage, a9 as MODAL_CONFIRM, _ as _export_sfc } from "./n8n-8ddd8349.js";
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
const _hoisted_1 = {
  key: 0,
  "data-test-id": "source-control-content-licensed"
};
const _hoisted_2 = ["href"];
const _hoisted_3 = { for: "repoUrl" };
const _hoisted_4 = ["href"];
const _hoisted_5 = {
  key: 2,
  "data-test-id": "source-control-connected-content"
};
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("hr", null, null, -1);
const _hoisted_7 = ["href"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsSourceControl",
  setup(__props) {
    const locale = useI18n();
    const sourceControlStore = useSourceControlStore();
    const uiStore = useUIStore();
    const toast = useToast();
    const message = useMessage();
    const loadingService = useLoadingService();
    const isConnected = ref(false);
    const branchNameOptions = computed(
      () => sourceControlStore.preferences.branches.map((branch) => ({
        value: branch,
        label: branch
      }))
    );
    const onConnect = async () => {
      loadingService.startLoading();
      loadingService.setLoadingText(locale.baseText("settings.sourceControl.loading.connecting"));
      try {
        await sourceControlStore.savePreferences({
          repositoryUrl: sourceControlStore.preferences.repositoryUrl
        });
        await sourceControlStore.getBranches();
        isConnected.value = true;
        toast.showMessage({
          title: locale.baseText("settings.sourceControl.toast.connected.title"),
          message: locale.baseText("settings.sourceControl.toast.connected.message"),
          type: "success"
        });
      } catch (error) {
        toast.showError(error, locale.baseText("settings.sourceControl.toast.connected.error"));
      }
      loadingService.stopLoading();
    };
    const onDisconnect = async () => {
      try {
        const confirmation = await message.confirm(
          locale.baseText("settings.sourceControl.modals.disconnect.message"),
          locale.baseText("settings.sourceControl.modals.disconnect.title"),
          {
            confirmButtonText: locale.baseText("settings.sourceControl.modals.disconnect.confirm"),
            cancelButtonText: locale.baseText("settings.sourceControl.modals.disconnect.cancel")
          }
        );
        if (confirmation === MODAL_CONFIRM) {
          loadingService.startLoading();
          await sourceControlStore.disconnect(true);
          isConnected.value = false;
          toast.showMessage({
            title: locale.baseText("settings.sourceControl.toast.disconnected.title"),
            message: locale.baseText("settings.sourceControl.toast.disconnected.message"),
            type: "success"
          });
        }
      } catch (error) {
        toast.showError(error, locale.baseText("settings.sourceControl.toast.disconnected.error"));
      }
      loadingService.stopLoading();
    };
    const onSave = async () => {
      loadingService.startLoading();
      try {
        await sourceControlStore.updatePreferences({
          branchName: sourceControlStore.preferences.branchName,
          branchReadOnly: sourceControlStore.preferences.branchReadOnly,
          branchColor: sourceControlStore.preferences.branchColor
        });
        toast.showMessage({
          title: locale.baseText("settings.sourceControl.saved.title"),
          type: "success"
        });
      } catch (error) {
        toast.showError(error, "Error setting branch");
      }
      loadingService.stopLoading();
    };
    const onSelect = async (b) => {
      if (b === sourceControlStore.preferences.branchName) {
        return;
      }
      sourceControlStore.preferences.branchName = b;
    };
    const goToUpgrade = () => {
      void uiStore.goToUpgrade("source-control", "upgrade-source-control");
    };
    const initialize = async () => {
      await sourceControlStore.getPreferences();
      if (sourceControlStore.preferences.connected) {
        isConnected.value = true;
        void sourceControlStore.getBranches();
      }
    };
    onMounted(async () => {
      await initialize();
    });
    const formValidationStatus = reactive({
      repoUrl: false,
      keyGeneratorType: false
    });
    function onValidate(key, value) {
      formValidationStatus[key] = value;
    }
    const repoUrlValidationRules = [
      { name: "REQUIRED" },
      {
        name: "MATCH_REGEX",
        config: {
          regex: /^git@(?:\[[0-9a-fA-F:]+\]|(?:[a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+)(?::[0-9]+)*:(?:v[0-9]+\/)?[a-zA-Z0-9_.\-\/]+(\.git)?(?:\/[a-zA-Z0-9_.\-\/]+)*$/,
          message: locale.baseText("settings.sourceControl.repoUrlInvalid")
        }
      }
    ];
    const keyGeneratorTypeValidationRules = [{ name: "REQUIRED" }];
    const validForConnection = computed(() => formValidationStatus.repoUrl);
    const branchNameValidationRules = [{ name: "REQUIRED" }];
    async function refreshSshKey() {
      try {
        const confirmation = await message.confirm(
          locale.baseText("settings.sourceControl.modals.refreshSshKey.message"),
          locale.baseText("settings.sourceControl.modals.refreshSshKey.title"),
          {
            confirmButtonText: locale.baseText("settings.sourceControl.modals.refreshSshKey.confirm"),
            cancelButtonText: locale.baseText("settings.sourceControl.modals.refreshSshKey.cancel")
          }
        );
        if (confirmation === MODAL_CONFIRM) {
          await sourceControlStore.generateKeyPair(sourceControlStore.preferences.keyGeneratorType);
          toast.showMessage({
            title: locale.baseText("settings.sourceControl.refreshSshKey.successful.title"),
            type: "success"
          });
        }
      } catch (error) {
        toast.showError(error, locale.baseText("settings.sourceControl.refreshSshKey.error.title"));
      }
    }
    const refreshBranches2 = async () => {
      try {
        await sourceControlStore.getBranches();
        toast.showMessage({
          title: locale.baseText("settings.sourceControl.refreshBranches.success"),
          type: "success"
        });
      } catch (error) {
        toast.showError(error, locale.baseText("settings.sourceControl.refreshBranches.error"));
      }
    };
    const onSelectSshKeyType = async (sshKeyType) => {
      if (sshKeyType === sourceControlStore.preferences.keyGeneratorType) {
        return;
      }
      sourceControlStore.preferences.keyGeneratorType = sshKeyType;
    };
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_n8n_callout = resolveComponent("n8n-callout");
      const _component_n8n_form_input = resolveComponent("n8n-form-input");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_notice = resolveComponent("n8n-notice");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_checkbox = resolveComponent("n8n-checkbox");
      const _component_n8n_color_picker = resolveComponent("n8n-color-picker");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_n8n_heading, {
          size: "2xlarge",
          tag: "h1"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.title")), 1)
          ]),
          _: 1
        }),
        unref(sourceControlStore).isEnterpriseSourceControlEnabled ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_component_n8n_callout, {
            theme: "secondary",
            icon: "info-circle",
            class: "mt-2xl mb-l"
          }, {
            default: withCtx(() => [
              createVNode(_component_i18n_t, {
                keypath: "settings.sourceControl.description",
                tag: "span"
              }, {
                link: withCtx(() => [
                  createBaseVNode("a", {
                    href: unref(locale).baseText("settings.sourceControl.docs.url"),
                    target: "_blank"
                  }, toDisplayString(unref(locale).baseText("settings.sourceControl.description.link")), 9, _hoisted_2)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_n8n_heading, {
            size: "xlarge",
            tag: "h2",
            class: "mb-s"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.gitConfig")), 1)
            ]),
            _: 1
          }),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.group)
          }, [
            createBaseVNode("label", _hoisted_3, toDisplayString(unref(locale).baseText("settings.sourceControl.repoUrl")), 1),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.groupFlex)
            }, [
              createVNode(_component_n8n_form_input, {
                label: "",
                class: "ml-0",
                id: "repoUrl",
                name: "repoUrl",
                validateOnBlur: "",
                validationRules: repoUrlValidationRules,
                disabled: isConnected.value,
                placeholder: unref(locale).baseText("settings.sourceControl.repoUrlPlaceholder"),
                modelValue: unref(sourceControlStore).preferences.repositoryUrl,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(sourceControlStore).preferences.repositoryUrl = $event),
                onValidate: _cache[1] || (_cache[1] = (value) => onValidate("repoUrl", value))
              }, null, 8, ["disabled", "placeholder", "modelValue"]),
              isConnected.value ? (openBlock(), createBlock(_component_n8n_button, {
                key: 0,
                class: normalizeClass(_ctx.$style.disconnectButton),
                type: "tertiary",
                onClick: onDisconnect,
                size: "large",
                icon: "trash",
                "data-test-id": "source-control-disconnect-button"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.button.disconnect")), 1)
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true)
            ], 2)
          ], 2),
          unref(sourceControlStore).preferences.publicKey ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.group)
          }, [
            createBaseVNode("label", null, toDisplayString(unref(locale).baseText("settings.sourceControl.sshKey")), 1),
            createBaseVNode("div", {
              class: normalizeClass({ [_ctx.$style.sshInput]: !isConnected.value })
            }, [
              !isConnected.value ? (openBlock(), createBlock(_component_n8n_form_input, {
                key: 0,
                class: normalizeClass(_ctx.$style.sshKeyTypeSelect),
                label: "",
                type: "select",
                id: "keyGeneratorType",
                name: "keyGeneratorType",
                "data-test-id": "source-control-ssh-key-type-select",
                validateOnBlur: "",
                validationRules: keyGeneratorTypeValidationRules,
                options: unref(sourceControlStore).sshKeyTypesWithLabel,
                modelValue: unref(sourceControlStore).preferences.keyGeneratorType,
                onValidate: _cache[2] || (_cache[2] = (value) => onValidate("keyGeneratorType", value)),
                "onUpdate:modelValue": onSelectSshKeyType
              }, null, 8, ["class", "options", "modelValue"])) : createCommentVNode("", true),
              createVNode(CopyInput, {
                class: normalizeClass(_ctx.$style.copyInput),
                collapse: "",
                size: "medium",
                value: unref(sourceControlStore).preferences.publicKey,
                "copy-button-text": unref(locale).baseText("generic.clickToCopy")
              }, null, 8, ["class", "value", "copy-button-text"]),
              !isConnected.value ? (openBlock(), createBlock(_component_n8n_button, {
                key: 1,
                size: "large",
                type: "tertiary",
                icon: "sync",
                onClick: refreshSshKey,
                "data-test-id": "source-control-refresh-ssh-key-button"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.refreshSshKey")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ], 2),
            createVNode(_component_n8n_notice, {
              type: "info",
              class: "mt-s"
            }, {
              default: withCtx(() => [
                createVNode(_component_i18n_t, {
                  keypath: "settings.sourceControl.sshKeyDescription",
                  tag: "span"
                }, {
                  link: withCtx(() => [
                    createBaseVNode("a", {
                      href: unref(locale).baseText("settings.sourceControl.docs.setup.ssh.url"),
                      target: "_blank"
                    }, toDisplayString(unref(locale).baseText("settings.sourceControl.sshKeyDescriptionLink")), 9, _hoisted_4)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ], 2)) : createCommentVNode("", true),
          !isConnected.value ? (openBlock(), createBlock(_component_n8n_button, {
            key: 1,
            onClick: onConnect,
            size: "large",
            disabled: !validForConnection.value,
            class: normalizeClass(_ctx.$style.connect),
            "data-test-id": "source-control-connect-button"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.button.connect")), 1)
            ]),
            _: 1
          }, 8, ["disabled", "class"])) : createCommentVNode("", true),
          isConnected.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.group)
            }, [
              _hoisted_6,
              createVNode(_component_n8n_heading, {
                size: "xlarge",
                tag: "h2",
                class: "mb-s"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.instanceSettings")), 1)
                ]),
                _: 1
              }),
              createBaseVNode("label", null, toDisplayString(unref(locale).baseText("settings.sourceControl.branches")), 1),
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.branchSelection)
              }, [
                createVNode(_component_n8n_form_input, {
                  label: "",
                  type: "select",
                  id: "branchName",
                  name: "branchName",
                  class: "mb-s",
                  "data-test-id": "source-control-branch-select",
                  validateOnBlur: "",
                  validationRules: branchNameValidationRules,
                  options: branchNameOptions.value,
                  modelValue: unref(sourceControlStore).preferences.branchName,
                  onValidate: _cache[3] || (_cache[3] = (value) => onValidate("branchName", value)),
                  "onUpdate:modelValue": onSelect
                }, null, 8, ["options", "modelValue"]),
                createVNode(_component_n8n_tooltip, { placement: "top" }, {
                  content: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(unref(locale).baseText("settings.sourceControl.refreshBranches.tooltip")), 1)
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_n8n_button, {
                      size: "small",
                      type: "tertiary",
                      icon: "sync",
                      square: "",
                      class: normalizeClass(_ctx.$style.refreshBranches),
                      onClick: refreshBranches2,
                      "data-test-id": "source-control-refresh-branches-button"
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                })
              ], 2),
              createVNode(_component_n8n_checkbox, {
                modelValue: unref(sourceControlStore).preferences.branchReadOnly,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(sourceControlStore).preferences.branchReadOnly = $event),
                class: normalizeClass(_ctx.$style.readOnly)
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n_t, {
                    keypath: "settings.sourceControl.protected",
                    tag: "span"
                  }, {
                    bold: withCtx(() => [
                      createBaseVNode("strong", null, toDisplayString(unref(locale).baseText("settings.sourceControl.protected.bold")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "class"])
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.group)
            }, [
              createBaseVNode("label", null, toDisplayString(unref(locale).baseText("settings.sourceControl.color")), 1),
              createBaseVNode("div", null, [
                createVNode(_component_n8n_color_picker, {
                  size: "small",
                  modelValue: unref(sourceControlStore).preferences.branchColor,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(sourceControlStore).preferences.branchColor = $event)
                }, null, 8, ["modelValue"])
              ])
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass([_ctx.$style.group, "pt-s"])
            }, [
              createVNode(_component_n8n_button, {
                onClick: onSave,
                size: "large",
                disabled: !unref(sourceControlStore).preferences.branchName,
                "data-test-id": "source-control-save-settings-button"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.button.save")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ], 2)
          ])) : createCommentVNode("", true)
        ])) : (openBlock(), createBlock(_component_n8n_action_box, {
          key: 1,
          "data-test-id": "source-control-content-unlicensed",
          class: normalizeClass(_ctx.$style.actionBox),
          description: unref(locale).baseText("settings.sourceControl.actionBox.description"),
          buttonText: unref(locale).baseText("settings.sourceControl.actionBox.buttonText"),
          "onClick:button": goToUpgrade
        }, {
          heading: withCtx(() => [
            createBaseVNode("span", null, toDisplayString(unref(locale).baseText("settings.sourceControl.actionBox.title")), 1)
          ]),
          description: withCtx(() => [
            createTextVNode(toDisplayString(unref(locale).baseText("settings.sourceControl.actionBox.description")) + " ", 1),
            createBaseVNode("a", {
              href: unref(locale).baseText("settings.sourceControl.docs.url"),
              target: "_blank"
            }, toDisplayString(unref(locale).baseText("settings.sourceControl.actionBox.description.link")), 9, _hoisted_7)
          ]),
          _: 1
        }, 8, ["class", "description", "buttonText"]))
      ]);
    };
  }
});
const group = "_group_1qvoi_5";
const readOnly = "_readOnly_1qvoi_26";
const groupFlex = "_groupFlex_1qvoi_30";
const connect = "_connect_1qvoi_44";
const disconnectButton = "_disconnectButton_1qvoi_48";
const actionBox = "_actionBox_1qvoi_53";
const sshInput = "_sshInput_1qvoi_57";
const copyInput = "_copyInput_1qvoi_68";
const sshKeyTypeSelect = "_sshKeyTypeSelect_1qvoi_72";
const branchSelection = "_branchSelection_1qvoi_80";
const refreshBranches = "_refreshBranches_1qvoi_89";
const style0 = {
  group,
  readOnly,
  groupFlex,
  connect,
  disconnectButton,
  actionBox,
  sshInput,
  copyInput,
  sshKeyTypeSelect,
  branchSelection,
  refreshBranches
};
const cssModules = {
  "$style": style0
};
const SettingsSourceControl = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  SettingsSourceControl as default
};
