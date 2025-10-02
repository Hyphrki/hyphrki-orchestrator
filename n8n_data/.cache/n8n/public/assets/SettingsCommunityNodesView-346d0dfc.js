import { aD as COMMUNITY_PACKAGE_MANAGE_ACTIONS, n as useUIStore, e5 as NPM_PACKAGE_DOCS_BASE_URL, _ as _export_sfc, u as useToast, y as useSettingsStore, aE as useCommunityNodesStore, aH as COMMUNITY_NODES_INSTALLATION_DOCS_URL, g4 as COMMUNITY_NODES_NPM_INSTALLATION_URL, g5 as COMMUNITY_NODES_MANUAL_INSTALLATION_DOCS_URL, aF as COMMUNITY_PACKAGE_INSTALL_MODAL_KEY } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, j as createBaseVNode, f as withCtx, s as createTextVNode, t as toDisplayString, a3 as Fragment, ai as renderList, q as createCommentVNode, b as createBlock } from "./vendor-fd4bd18c.js";
import { p as pushConnection } from "./pushConnection-1f69f62d.js";
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
import "./index-00f166b0.js";
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
const _sfc_main$1 = defineComponent({
  name: "CommunityPackageCard",
  props: {
    communityPackage: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      packageActions: [
        {
          label: this.$locale.baseText("settings.communityNodes.viewDocsAction.label"),
          value: COMMUNITY_PACKAGE_MANAGE_ACTIONS.VIEW_DOCS,
          type: "external-link"
        },
        {
          label: this.$locale.baseText("settings.communityNodes.uninstallAction.label"),
          value: COMMUNITY_PACKAGE_MANAGE_ACTIONS.UNINSTALL
        }
      ]
    };
  },
  computed: {
    ...mapStores(useUIStore)
  },
  methods: {
    async onAction(value) {
      switch (value) {
        case COMMUNITY_PACKAGE_MANAGE_ACTIONS.VIEW_DOCS:
          this.$telemetry.track("user clicked to browse the cnr package documentation", {
            package_name: this.communityPackage.packageName,
            package_version: this.communityPackage.installedVersion
          });
          window.open(`${NPM_PACKAGE_DOCS_BASE_URL}${this.communityPackage.packageName}`, "_blank");
          break;
        case COMMUNITY_PACKAGE_MANAGE_ACTIONS.UNINSTALL:
          this.uiStore.openCommunityPackageUninstallConfirmModal(this.communityPackage.packageName);
          break;
        default:
          break;
      }
    },
    onUpdateClick() {
      this.uiStore.openCommunityPackageUpdateConfirmModal(this.communityPackage.packageName);
    }
  }
});
const cardContainer = "_cardContainer_14eyd_5";
const packageCard = "_packageCard_14eyd_13";
const cardSkeleton = "_cardSkeleton_14eyd_14";
const loader = "_loader_14eyd_28";
const cardInfoContainer = "_cardInfoContainer_14eyd_39";
const cardTitle = "_cardTitle_14eyd_44";
const cardSubtitle = "_cardSubtitle_14eyd_51";
const cardControlsContainer = "_cardControlsContainer_14eyd_56";
const cardActions = "_cardActions_14eyd_62";
const style0$1 = {
  cardContainer,
  packageCard,
  cardSkeleton,
  loader,
  cardInfoContainer,
  cardTitle,
  cardSubtitle,
  cardControlsContainer,
  cardActions
};
const _hoisted_1 = { key: 0 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_icon = resolveComponent("n8n-icon");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.cardContainer)
  }, [
    _ctx.loading ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.cardSkeleton)
    }, [
      createVNode(_component_n8n_loading, {
        class: normalizeClass(_ctx.$style.loader),
        variant: "p",
        rows: 1
      }, null, 8, ["class"]),
      createVNode(_component_n8n_loading, {
        class: normalizeClass(_ctx.$style.loader),
        variant: "p",
        rows: 1
      }, null, 8, ["class"])
    ], 2)) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.$style.packageCard)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.cardInfoContainer)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.cardTitle)
        }, [
          createVNode(_component_n8n_text, {
            bold: true,
            size: "large"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.communityPackage.packageName), 1)
            ]),
            _: 1
          })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.cardSubtitle)
        }, [
          createVNode(_component_n8n_text, {
            bold: true,
            size: "small",
            color: "text-light"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.communityNodes.packageNodes.label", {
                adjustToNumber: _ctx.communityPackage.installedNodes.length
              })) + ":  ", 1)
            ]),
            _: 1
          }),
          createVNode(_component_n8n_text, {
            size: "small",
            color: "text-light"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.communityPackage.installedNodes, (node, index) => {
                return openBlock(), createElementBlock("span", {
                  key: node.name
                }, [
                  createTextVNode(toDisplayString(node.name), 1),
                  index != _ctx.communityPackage.installedNodes.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_1, ",")) : createCommentVNode("", true)
                ]);
              }), 128))
            ]),
            _: 1
          })
        ], 2)
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.cardControlsContainer)
      }, [
        createVNode(_component_n8n_text, {
          bold: true,
          size: "large",
          color: "text-light"
        }, {
          default: withCtx(() => [
            createTextVNode(" v" + toDisplayString(_ctx.communityPackage.installedVersion), 1)
          ]),
          _: 1
        }),
        _ctx.communityPackage.failedLoading === true ? (openBlock(), createBlock(_component_n8n_tooltip, {
          key: 0,
          placement: "top"
        }, {
          content: withCtx(() => [
            createBaseVNode("div", null, toDisplayString(_ctx.$locale.baseText("settings.communityNodes.failedToLoad.tooltip")), 1)
          ]),
          default: withCtx(() => [
            createVNode(_component_n8n_icon, {
              icon: "exclamation-triangle",
              color: "danger",
              size: "large"
            })
          ]),
          _: 1
        })) : _ctx.communityPackage.updateAvailable ? (openBlock(), createBlock(_component_n8n_tooltip, {
          key: 1,
          placement: "top"
        }, {
          content: withCtx(() => [
            createBaseVNode("div", null, toDisplayString(_ctx.$locale.baseText("settings.communityNodes.updateAvailable.tooltip")), 1)
          ]),
          default: withCtx(() => [
            createVNode(_component_n8n_button, {
              type: "outline",
              label: "Update",
              onClick: _ctx.onUpdateClick
            }, null, 8, ["onClick"])
          ]),
          _: 1
        })) : (openBlock(), createBlock(_component_n8n_tooltip, {
          key: 2,
          placement: "top"
        }, {
          content: withCtx(() => [
            createBaseVNode("div", null, toDisplayString(_ctx.$locale.baseText("settings.communityNodes.upToDate.tooltip")), 1)
          ]),
          default: withCtx(() => [
            createVNode(_component_n8n_icon, {
              icon: "check-circle",
              color: "text-light",
              size: "large"
            })
          ]),
          _: 1
        })),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.cardActions)
        }, [
          createVNode(_component_n8n_action_toggle, {
            actions: _ctx.packageActions,
            onAction: _ctx.onAction
          }, null, 8, ["actions", "onAction"])
        ], 2)
      ], 2)
    ], 2))
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const CommunityPackageCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const PACKAGE_COUNT_THRESHOLD = 31;
const _sfc_main = defineComponent({
  name: "SettingsCommunityNodesView",
  mixins: [pushConnection],
  components: {
    CommunityPackageCard
  },
  setup(props) {
    var _a, _b;
    return {
      ...useToast(),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = pushConnection).setup) == null ? void 0 : _b.call(_a, props)
    };
  },
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    this.pushConnect();
    try {
      this.loading = true;
      await this.communityNodesStore.fetchInstalledPackages();
      const installedPackages = this.communityNodesStore.getInstalledPackages;
      const packagesToUpdate = installedPackages.filter(
        (p) => p.updateAvailable
      );
      this.$telemetry.track("user viewed cnr settings page", {
        num_of_packages_installed: installedPackages.length,
        installed_packages: installedPackages.map((p) => {
          return {
            package_name: p.packageName,
            package_version: p.installedVersion,
            package_nodes: p.installedNodes.map((node) => `${node.name}-v${node.latestVersion}`),
            is_update_available: p.updateAvailable !== void 0
          };
        }),
        packages_to_update: packagesToUpdate.map((p) => {
          return {
            package_name: p.packageName,
            package_version_current: p.installedVersion,
            package_version_available: p.updateAvailable
          };
        }),
        number_of_updates_available: packagesToUpdate.length
      });
    } catch (error) {
      this.showError(
        error,
        this.$locale.baseText("settings.communityNodes.fetchError.title"),
        this.$locale.baseText("settings.communityNodes.fetchError.message")
      );
    } finally {
      this.loading = false;
    }
    try {
      await this.communityNodesStore.fetchAvailableCommunityPackageCount();
    } finally {
      this.loading = false;
    }
  },
  beforeUnmount() {
    this.pushDisconnect();
  },
  computed: {
    ...mapStores(useCommunityNodesStore, useSettingsStore, useUIStore),
    getEmptyStateDescription() {
      const packageCount = this.communityNodesStore.availablePackageCount;
      if (this.settingsStore.isDesktopDeployment) {
        return this.$locale.baseText("contextual.communityNodes.unavailable.description.desktop");
      }
      return packageCount < PACKAGE_COUNT_THRESHOLD ? this.$locale.baseText("settings.communityNodes.empty.description.no-packages", {
        interpolate: {
          docURL: COMMUNITY_NODES_INSTALLATION_DOCS_URL
        }
      }) : this.$locale.baseText("settings.communityNodes.empty.description", {
        interpolate: {
          docURL: COMMUNITY_NODES_INSTALLATION_DOCS_URL,
          count: (Math.floor(packageCount / 10) * 10).toString()
        }
      });
    },
    getEmptyStateButtonText() {
      if (this.settingsStore.isDesktopDeployment) {
        return this.$locale.baseText("contextual.communityNodes.unavailable.button.desktop");
      }
      return this.shouldShowInstallButton ? this.$locale.baseText("settings.communityNodes.empty.installPackageLabel") : "";
    },
    shouldShowInstallButton() {
      return this.settingsStore.isDesktopDeployment || this.settingsStore.isNpmAvailable;
    },
    actionBoxConfig() {
      if (!this.settingsStore.isNpmAvailable) {
        return {
          calloutText: this.$locale.baseText("settings.communityNodes.npmUnavailable.warning", {
            interpolate: { npmUrl: COMMUNITY_NODES_NPM_INSTALLATION_URL }
          }),
          calloutTheme: "warning",
          hideButton: true
        };
      }
      if (this.settingsStore.isQueueModeEnabled) {
        return {
          calloutText: this.$locale.baseText("settings.communityNodes.queueMode.warning", {
            interpolate: { docURL: COMMUNITY_NODES_MANUAL_INSTALLATION_DOCS_URL }
          }),
          calloutTheme: "warning",
          hideButton: true
        };
      }
      return {
        calloutText: "",
        calloutTheme: "",
        hideButton: false
      };
    }
  },
  methods: {
    onClickEmptyStateButton() {
      if (this.settingsStore.isDesktopDeployment) {
        return this.goToUpgrade();
      }
      this.openInstallModal();
    },
    goToUpgrade() {
      void this.uiStore.goToUpgrade("community-nodes", "upgrade-community-nodes");
    },
    openInstallModal() {
      const telemetryPayload = {
        is_empty_state: this.communityNodesStore.getInstalledPackages.length === 0
      };
      this.$telemetry.track("user clicked cnr install button", telemetryPayload);
      void this.$externalHooks().run(
        "settingsCommunityNodesView.openInstallModal",
        telemetryPayload
      );
      this.uiStore.openModal(COMMUNITY_PACKAGE_INSTALL_MODAL_KEY);
    }
  }
});
const container = "_container_12ljj_5";
const headingContainer = "_headingContainer_12ljj_13";
const loadingContainer = "_loadingContainer_12ljj_18";
const actionBoxContainer = "_actionBoxContainer_12ljj_23";
const cardsContainer = "_cardsContainer_12ljj_27";
const style0 = {
  container,
  headingContainer,
  loadingContainer,
  actionBoxContainer,
  cardsContainer
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_action_box = resolveComponent("n8n-action-box");
  const _component_community_package_card = resolveComponent("community-package-card");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.headingContainer)
    }, [
      createVNode(_component_n8n_heading, { size: "2xlarge" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.communityNodes")), 1)
        ]),
        _: 1
      }),
      !_ctx.settingsStore.isQueueModeEnabled && _ctx.communityNodesStore.getInstalledPackages.length > 0 && !_ctx.loading ? (openBlock(), createBlock(_component_n8n_button, {
        key: 0,
        label: _ctx.$locale.baseText("settings.communityNodes.installModal.installButton.label"),
        size: "large",
        onClick: _ctx.openInstallModal
      }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
    ], 2),
    _ctx.settingsStore.isQueueModeEnabled ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.actionBoxContainer)
    }, [
      createVNode(_component_n8n_action_box, {
        heading: _ctx.$locale.baseText("settings.communityNodes.empty.title"),
        description: _ctx.getEmptyStateDescription,
        calloutText: _ctx.actionBoxConfig.calloutText,
        calloutTheme: _ctx.actionBoxConfig.calloutTheme
      }, null, 8, ["heading", "description", "calloutText", "calloutTheme"])
    ], 2)) : _ctx.loading ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.$style.cardsContainer)
    }, [
      (openBlock(), createElementBlock(Fragment, null, renderList(2, (n) => {
        return createVNode(_component_community_package_card, {
          key: "index-" + n,
          loading: true
        });
      }), 64))
    ], 2)) : _ctx.communityNodesStore.getInstalledPackages.length === 0 ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: normalizeClass(_ctx.$style.actionBoxContainer)
    }, [
      createVNode(_component_n8n_action_box, {
        heading: _ctx.$locale.baseText("settings.communityNodes.empty.title"),
        description: _ctx.getEmptyStateDescription,
        buttonText: _ctx.getEmptyStateButtonText,
        calloutText: _ctx.actionBoxConfig.calloutText,
        calloutTheme: _ctx.actionBoxConfig.calloutTheme,
        "onClick:button": _ctx.onClickEmptyStateButton
      }, null, 8, ["heading", "description", "buttonText", "calloutText", "calloutTheme", "onClick:button"])
    ], 2)) : (openBlock(), createElementBlock("div", {
      key: 3,
      class: normalizeClass(_ctx.$style.cardsContainer)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.communityNodesStore.getInstalledPackages, (communityPackage) => {
        return openBlock(), createBlock(_component_community_package_card, {
          key: communityPackage.packageName,
          communityPackage
        }, null, 8, ["communityPackage"]);
      }), 128))
    ], 2))
  ], 2);
}
const cssModules = {
  "$style": style0
};
const SettingsCommunityNodesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsCommunityNodesView as default
};
