import { j as createBaseVNode, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, d as defineComponent, c as computed, f as withCtx, s as createTextVNode, t as toDisplayString, p as unref, q as createCommentVNode, aD as useRouter, r as ref, b as createBlock, a9 as normalizeStyle, L as nextTick, aJ as isNavigationFailure, ak as createSlots } from "./vendor-fd4bd18c.js";
import { _ as _export_sfc, p as i18n, n as useUIStore, ds as useLoadingService, t as useUsersStore, z as useSourceControlStore, u as useToast, $ as useMessage, am as useI18n, w as createEventBus, dt as SOURCE_CONTROL_PUSH_MODAL_KEY, du as SOURCE_CONTROL_PULL_MODAL_KEY, B as VIEWS, q as useCloudPlanStore, H as useWorkflowsStore, o as useVersionsStore, y as useSettingsStore, x as useRootStore, V as VERSIONS_MODAL_KEY, A as ABOUT_MODAL_KEY } from "./n8n-8ddd8349.js";
import { s as sourceControlEventBus, g as genericHelpers, w as workflowHelpers, a as workflowRun, u as userHelpers, d as debounceHelper } from "./index-00f166b0.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { D as DateTime } from "./luxon-63e8a0ed.js";
import "./flatted-551ad821.js";
import "./esprima-next-b5fc8919.js";
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
const notification = "_notification_j2u1w_12";
const style0$3 = {
  "gift-icon": "_gift-icon_j2u1w_5",
  notification
};
const _sfc_main$3 = {};
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("div", null, null, -1);
const _hoisted_2$1 = [
  _hoisted_1$2
];
function _sfc_render$1(_ctx, _cache) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style["gift-icon"])
  }, [
    createVNode(_component_font_awesome_icon, { icon: "gift" }),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style["notification"])
    }, _hoisted_2$1, 2)
  ], 2);
}
const cssModules$3 = {
  "$style": style0$3
};
const GiftNotificationIcon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1], ["__cssModules", cssModules$3]]);
const _hoisted_1$1 = ["value", "max"];
const PROGRESS_BAR_MINIMUM_THRESHOLD = 8;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ExecutionsUsage",
  props: {
    cloudPlanData: {}
  },
  setup(__props) {
    const props = __props;
    const now = DateTime.utc();
    const daysLeftOnTrial = computed(() => {
      const { days = 0 } = getPlanExpirationDate().diff(now, ["days"]).toObject();
      return Math.ceil(days);
    });
    const isTrialExpired = computed(() => {
      var _a;
      if (!((_a = props.cloudPlanData) == null ? void 0 : _a.expirationDate))
        return false;
      const trialEndsAt = DateTime.fromISO(props.cloudPlanData.expirationDate);
      return now.toMillis() > trialEndsAt.toMillis();
    });
    const getPlanExpirationDate = () => {
      var _a;
      return DateTime.fromISO(((_a = props == null ? void 0 : props.cloudPlanData) == null ? void 0 : _a.expirationDate) ?? "");
    };
    const trialHasExecutionsLeft = computed(() => {
      var _a;
      if (!((_a = props.cloudPlanData) == null ? void 0 : _a.usage))
        return 0;
      return props.cloudPlanData.usage.executions < props.cloudPlanData.monthlyExecutionsLimit;
    });
    const currentExecutions = computed(() => {
      var _a;
      if (!((_a = props.cloudPlanData) == null ? void 0 : _a.usage))
        return 0;
      const usedExecutions = props.cloudPlanData.usage.executions;
      const executionsQuota = props.cloudPlanData.monthlyExecutionsLimit;
      return usedExecutions > executionsQuota ? executionsQuota : usedExecutions;
    });
    const currentExecutionsWithThreshold = computed(() => {
      var _a;
      if (!((_a = props.cloudPlanData) == null ? void 0 : _a.usage))
        return 0;
      const usedExecutions = props.cloudPlanData.usage.executions;
      const executionsQuota = props.cloudPlanData.monthlyExecutionsLimit;
      const threshold = PROGRESS_BAR_MINIMUM_THRESHOLD * executionsQuota / 100;
      return usedExecutions < threshold ? threshold : usedExecutions;
    });
    const maxExecutions = computed(() => {
      var _a;
      if (!((_a = props.cloudPlanData) == null ? void 0 : _a.monthlyExecutionsLimit))
        return 0;
      return props.cloudPlanData.monthlyExecutionsLimit;
    });
    const onUpgradeClicked = () => {
      void useUIStore().goToUpgrade("canvas-nav", "upgrade-canvas-nav", "redirect");
    };
    return (_ctx, _cache) => {
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_n8n_button = resolveComponent("n8n-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        isTrialExpired.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.usageText)
        }, [
          createVNode(_component_n8n_text, {
            size: "small",
            color: "danger"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("executionUsage.expired.text")), 1)
            ]),
            _: 1
          })
        ], 2)) : !isTrialExpired.value && trialHasExecutionsLeft.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.$style.usageText)
        }, [
          createVNode(_component_i18n_t, {
            tag: "span",
            keypath: "executionUsage.currentUsage"
          }, {
            text: withCtx(() => [
              createVNode(_component_n8n_text, {
                size: "small",
                color: "text-dark"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("executionUsage.currentUsage.text")), 1)
                ]),
                _: 1
              })
            ]),
            count: withCtx(() => [
              createVNode(_component_n8n_text, {
                size: "small",
                bold: true,
                color: "warning"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("executionUsage.currentUsage.count", {
                    adjustToNumber: daysLeftOnTrial.value || 0
                  })), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 2)) : !trialHasExecutionsLeft.value ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(_ctx.$style.usageText)
        }, [
          createVNode(_component_n8n_text, { size: "small" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("executionUsage.ranOutOfExecutions.text")), 1)
            ]),
            _: 1
          })
        ], 2)) : createCommentVNode("", true),
        !isTrialExpired.value ? (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass(_ctx.$style.usageCounter)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.progressBarDiv)
          }, [
            createBaseVNode("progress", {
              class: normalizeClass([
                trialHasExecutionsLeft.value ? _ctx.$style.progressBarSuccess : _ctx.$style.progressBarDanger,
                _ctx.$style.progressBar
              ]),
              value: currentExecutionsWithThreshold.value,
              max: maxExecutions.value
            }, null, 10, _hoisted_1$1)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.executionsCountSection)
          }, [
            createVNode(_component_n8n_text, {
              size: "xsmall",
              color: trialHasExecutionsLeft.value ? "text-dark" : "danger"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(currentExecutions.value) + "/" + toDisplayString(maxExecutions.value), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            createVNode(_component_n8n_text, {
              size: "xsmall",
              color: trialHasExecutionsLeft.value ? "text-dark" : "danger"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("executionUsage.label.executions")), 1)
              ]),
              _: 1
            }, 8, ["color"])
          ], 2)
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.upgradeButtonSection)
        }, [
          createVNode(_component_n8n_button, {
            label: unref(i18n).baseText("executionUsage.button.upgrade"),
            size: "xmini",
            icon: "gem",
            type: "success",
            block: true,
            onClick: onUpgradeClicked
          }, null, 8, ["label"])
        ], 2)
      ], 2);
    };
  }
});
const container = "_container_itrcs_5";
const progressBarDiv = "_progressBarDiv_itrcs_13";
const progressBar = "_progressBar_itrcs_13";
const progressBarSuccess = "_progressBarSuccess_itrcs_42";
const progressBarDanger = "_progressBarDanger_itrcs_52";
const usageText = "_usageText_itrcs_61";
const usageCounter = "_usageCounter_itrcs_68";
const danger = "_danger_itrcs_77";
const executionsCountSection = "_executionsCountSection_itrcs_81";
const upgradeButtonSection = "_upgradeButtonSection_itrcs_85";
const style0$2 = {
  container,
  progressBarDiv,
  progressBar,
  progressBarSuccess,
  progressBarDanger,
  usageText,
  usageCounter,
  danger,
  executionsCountSection,
  upgradeButtonSection
};
const cssModules$2 = {
  "$style": style0$2
};
const ExecutionsUsage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MainSidebarSourceControl",
  props: {
    isCollapsed: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const responseStatuses = {
      CONFLICT: 409
    };
    const router = useRouter();
    const loadingService = useLoadingService();
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const sourceControlStore = useSourceControlStore();
    const message = useMessage();
    const toast = useToast();
    const i18n2 = useI18n();
    const eventBus = createEventBus();
    const tooltipOpenDelay = ref(300);
    const currentBranch = computed(() => {
      return sourceControlStore.preferences.branchName;
    });
    const isInstanceOwner = computed(() => usersStore.isInstanceOwner);
    const setupButtonTooltipPlacement = computed(() => props.isCollapsed ? "right" : "top");
    async function pushWorkfolder() {
      loadingService.startLoading();
      loadingService.setLoadingText(i18n2.baseText("settings.sourceControl.loading.checkingForChanges"));
      try {
        const status = await sourceControlStore.getAggregatedStatus();
        uiStore.openModalWithData({
          name: SOURCE_CONTROL_PUSH_MODAL_KEY,
          data: { eventBus, status }
        });
      } catch (error) {
        toast.showError(error, i18n2.baseText("error"));
      } finally {
        loadingService.stopLoading();
        loadingService.setLoadingText(i18n2.baseText("genericHelpers.loading"));
      }
    }
    async function pullWorkfolder() {
      loadingService.startLoading();
      loadingService.setLoadingText(i18n2.baseText("settings.sourceControl.loading.pull"));
      try {
        const status = await sourceControlStore.pullWorkfolder(
          false
        ) || [];
        const statusWithoutLocallyCreatedWorkflows = status.filter((file) => {
          return !(file.type === "workflow" && file.status === "created" && file.location === "local");
        });
        if (statusWithoutLocallyCreatedWorkflows.length === 0) {
          toast.showMessage({
            title: i18n2.baseText("settings.sourceControl.pull.upToDate.title"),
            message: i18n2.baseText("settings.sourceControl.pull.upToDate.description"),
            type: "success"
          });
        } else {
          toast.showMessage({
            title: i18n2.baseText("settings.sourceControl.pull.success.title"),
            type: "success"
          });
          const incompleteFileTypes = ["variables", "credential"];
          const hasVariablesOrCredentials = (status || []).some((file) => {
            return incompleteFileTypes.includes(file.type);
          });
          if (hasVariablesOrCredentials) {
            void nextTick(() => {
              toast.showMessage({
                message: i18n2.baseText("settings.sourceControl.pull.oneLastStep.description"),
                title: i18n2.baseText("settings.sourceControl.pull.oneLastStep.title"),
                type: "info",
                duration: 0,
                showClose: true,
                offset: 0
              });
            });
          }
        }
        sourceControlEventBus.emit("pull");
      } catch (error) {
        const errorResponse = error.response;
        if ((errorResponse == null ? void 0 : errorResponse.status) === responseStatuses.CONFLICT) {
          uiStore.openModalWithData({
            name: SOURCE_CONTROL_PULL_MODAL_KEY,
            data: { eventBus, status: errorResponse.data.data }
          });
        } else {
          toast.showError(error, "Error");
        }
      } finally {
        loadingService.stopLoading();
        loadingService.setLoadingText(i18n2.baseText("genericHelpers.loading"));
      }
    }
    const goToSourceControlSetup = async () => {
      await router.push({ name: VIEWS.SOURCE_CONTROL });
    };
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      return unref(sourceControlStore).isEnterpriseSourceControlEnabled && isInstanceOwner.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass({
          [_ctx.$style.sync]: true,
          [_ctx.$style.collapsed]: _ctx.isCollapsed,
          [_ctx.$style.isConnected]: unref(sourceControlStore).isEnterpriseSourceControlEnabled
        }),
        style: normalizeStyle({ borderLeftColor: unref(sourceControlStore).preferences.branchColor }),
        "data-test-id": "main-sidebar-source-control"
      }, [
        unref(sourceControlStore).preferences.connected && unref(sourceControlStore).preferences.branchName ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.connected),
          "data-test-id": "main-sidebar-source-control-connected"
        }, [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.branchName)
          }, [
            createVNode(_component_n8n_icon, { icon: "code-branch" }),
            createTextVNode(" " + toDisplayString(currentBranch.value), 1)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass({ "pt-xs": !_ctx.isCollapsed })
          }, [
            createVNode(_component_n8n_tooltip, {
              disabled: !_ctx.isCollapsed,
              "show-after": tooltipOpenDelay.value,
              placement: "right"
            }, {
              content: withCtx(() => [
                createBaseVNode("div", null, toDisplayString(unref(i18n2).baseText("settings.sourceControl.button.pull")), 1)
              ]),
              default: withCtx(() => [
                createVNode(_component_n8n_button, {
                  class: normalizeClass({
                    "mr-2xs": !_ctx.isCollapsed,
                    "mb-2xs": _ctx.isCollapsed && !unref(sourceControlStore).preferences.branchReadOnly
                  }),
                  icon: "arrow-down",
                  type: "tertiary",
                  size: "mini",
                  square: _ctx.isCollapsed,
                  label: _ctx.isCollapsed ? "" : unref(i18n2).baseText("settings.sourceControl.button.pull"),
                  onClick: pullWorkfolder
                }, null, 8, ["class", "square", "label"])
              ]),
              _: 1
            }, 8, ["disabled", "show-after"]),
            !unref(sourceControlStore).preferences.branchReadOnly ? (openBlock(), createBlock(_component_n8n_tooltip, {
              key: 0,
              disabled: !_ctx.isCollapsed,
              "show-after": tooltipOpenDelay.value,
              placement: "right"
            }, {
              content: withCtx(() => [
                createBaseVNode("div", null, toDisplayString(unref(i18n2).baseText("settings.sourceControl.button.push")), 1)
              ]),
              default: withCtx(() => [
                createVNode(_component_n8n_button, {
                  square: _ctx.isCollapsed,
                  label: _ctx.isCollapsed ? "" : unref(i18n2).baseText("settings.sourceControl.button.push"),
                  icon: "arrow-up",
                  type: "tertiary",
                  size: "mini",
                  onClick: pushWorkfolder
                }, null, 8, ["square", "label"])
              ]),
              _: 1
            }, 8, ["disabled", "show-after"])) : createCommentVNode("", true)
          ], 2)
        ], 2)) : createCommentVNode("", true)
      ], 6)) : createCommentVNode("", true);
    };
  }
});
const sync = "_sync_1bnfs_5";
const isConnected = "_isConnected_1bnfs_12";
const collapsed = "_collapsed_1bnfs_16";
const branchName = "_branchName_1bnfs_26";
const connected = "_connected_1bnfs_36";
const style0$1 = {
  sync,
  isConnected,
  collapsed,
  branchName,
  connected
};
const cssModules$1 = {
  "$style": style0$1
};
const MainSidebarSourceControl = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "MainSidebar",
  components: {
    GiftNotificationIcon,
    ExecutionsUsage,
    MainSidebarSourceControl
  },
  mixins: [genericHelpers, workflowHelpers, workflowRun, userHelpers, debounceHelper],
  setup(props) {
    var _a, _b;
    return {
      ...useMessage(),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ...(_b = (_a = workflowRun).setup) == null ? void 0 : _b.call(_a, props)
    };
  },
  data() {
    return {
      basePath: "",
      fullyExpanded: false
    };
  },
  computed: {
    ...mapStores(
      useRootStore,
      useSettingsStore,
      useUIStore,
      useUsersStore,
      useVersionsStore,
      useWorkflowsStore,
      useCloudPlanStore,
      useSourceControlStore
    ),
    logoPath() {
      if (this.isCollapsed)
        return this.basePath + "n8n-logo-collapsed.svg";
      return this.basePath + this.uiStore.logo;
    },
    hasVersionUpdates() {
      return this.settingsStore.settings.releaseChannel === "stable" && this.versionsStore.hasVersionUpdates;
    },
    nextVersions() {
      return this.versionsStore.nextVersions;
    },
    isCollapsed() {
      return this.uiStore.sidebarMenuCollapsed;
    },
    canUserAccessSettings() {
      const accessibleRoute = this.findFirstAccessibleSettingsRoute();
      return accessibleRoute !== null;
    },
    showUserArea() {
      return this.usersStore.canUserAccessSidebarUserInfo && this.usersStore.currentUser !== null;
    },
    workflowExecution() {
      return this.workflowsStore.getWorkflowExecution;
    },
    userMenuItems() {
      return [
        {
          id: "settings",
          label: this.$locale.baseText("settings")
        },
        {
          id: "logout",
          label: this.$locale.baseText("auth.signout")
        }
      ];
    },
    mainMenuItems() {
      var _a;
      const items = [];
      const injectedItems = this.uiStore.sidebarMenuItems;
      const workflows = {
        id: "workflows",
        icon: "network-wired",
        label: this.$locale.baseText("mainSidebar.workflows"),
        position: "top",
        activateOnRouteNames: [VIEWS.WORKFLOWS]
      };
      if (this.sourceControlStore.preferences.branchReadOnly) {
        workflows.secondaryIcon = {
          name: "lock",
          tooltip: {
            content: this.$locale.baseText("mainSidebar.workflows.readOnlyEnv.tooltip")
          }
        };
      }
      if (injectedItems && injectedItems.length > 0) {
        for (const item of injectedItems) {
          items.push({
            id: item.id,
            icon: item.icon || "",
            label: item.label || "",
            position: item.position,
            type: ((_a = item.properties) == null ? void 0 : _a.href) ? "link" : "regular",
            properties: item.properties
          });
        }
      }
      const regularItems = [
        workflows,
        {
          id: "templates",
          icon: "box-open",
          label: this.$locale.baseText("mainSidebar.templates"),
          position: "top",
          available: this.settingsStore.isTemplatesEnabled,
          activateOnRouteNames: [VIEWS.TEMPLATES]
        },
        {
          id: "credentials",
          icon: "key",
          label: this.$locale.baseText("mainSidebar.credentials"),
          customIconSize: "medium",
          position: "top",
          activateOnRouteNames: [VIEWS.CREDENTIALS]
        },
        {
          id: "variables",
          icon: "variable",
          label: this.$locale.baseText("mainSidebar.variables"),
          customIconSize: "medium",
          position: "top",
          activateOnRouteNames: [VIEWS.VARIABLES]
        },
        {
          id: "executions",
          icon: "tasks",
          label: this.$locale.baseText("mainSidebar.executions"),
          position: "top",
          activateOnRouteNames: [VIEWS.EXECUTIONS]
        },
        {
          id: "workersview",
          icon: "truck-monster",
          label: this.$locale.baseText("mainSidebar.workersView"),
          position: "top",
          available: this.settingsStore.isQueueModeEnabled && this.settingsStore.isWorkerViewAvailable,
          activateOnRouteNames: [VIEWS.WORKER_VIEW]
        },
        {
          id: "settings",
          icon: "cog",
          label: this.$locale.baseText("settings"),
          position: "bottom",
          available: this.canUserAccessSettings && this.usersStore.currentUser !== null,
          activateOnRouteNames: [VIEWS.USERS_SETTINGS, VIEWS.API_SETTINGS, VIEWS.PERSONAL_SETTINGS]
        },
        {
          id: "help",
          icon: "question",
          label: "Help",
          position: "bottom",
          children: [
            {
              id: "quickstart",
              icon: "video",
              label: this.$locale.baseText("mainSidebar.helpMenuItems.quickstart"),
              type: "link",
              properties: {
                href: "https://www.youtube.com/watch?v=1MwSoB0gnM4",
                newWindow: true
              }
            },
            {
              id: "docs",
              icon: "book",
              label: this.$locale.baseText("mainSidebar.helpMenuItems.documentation"),
              type: "link",
              properties: {
                href: "https://docs.n8n.io?utm_source=n8n_app&utm_medium=app_sidebar",
                newWindow: true
              }
            },
            {
              id: "forum",
              icon: "users",
              label: this.$locale.baseText("mainSidebar.helpMenuItems.forum"),
              type: "link",
              properties: {
                href: "https://community.n8n.io?utm_source=n8n_app&utm_medium=app_sidebar",
                newWindow: true
              }
            },
            {
              id: "examples",
              icon: "graduation-cap",
              label: this.$locale.baseText("mainSidebar.helpMenuItems.course"),
              type: "link",
              properties: {
                href: "https://www.youtube.com/watch?v=1MwSoB0gnM4",
                newWindow: true
              }
            },
            {
              id: "about",
              icon: "info",
              label: this.$locale.baseText("mainSidebar.aboutN8n"),
              position: "bottom"
            }
          ]
        }
      ];
      return [...items, ...regularItems];
    },
    userIsTrialing() {
      return this.cloudPlanStore.userIsTrialing;
    },
    currentPlanAndUsageData() {
      const planData = this.cloudPlanStore.currentPlanData;
      const usage = this.cloudPlanStore.currentUsageData;
      if (!planData || !usage)
        return null;
      return {
        ...planData,
        usage
      };
    }
  },
  mounted() {
    this.basePath = this.rootStore.baseUrl;
    if (this.$refs.user) {
      void this.$externalHooks().run("mainSidebar.mounted", {
        userRef: this.$refs.user
      });
    }
    void this.$nextTick(() => {
      if (window.innerWidth < 900 || this.uiStore.isNodeView) {
        this.uiStore.sidebarMenuCollapsed = true;
      } else {
        this.uiStore.sidebarMenuCollapsed = false;
      }
      this.fullyExpanded = !this.isCollapsed;
    });
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    trackHelpItemClick(itemType) {
      this.$telemetry.track("User clicked help resource", {
        type: itemType,
        workflow_id: this.workflowsStore.workflowId
      });
    },
    async onUserActionToggle(action) {
      switch (action) {
        case "logout":
          this.onLogout();
          break;
        case "settings":
          void this.$router.push({ name: VIEWS.PERSONAL_SETTINGS });
          break;
        default:
          break;
      }
    },
    onLogout() {
      void this.$router.push({ name: VIEWS.SIGNOUT });
    },
    toggleCollapse() {
      this.uiStore.toggleSidebarMenuCollapse();
      if (!this.isCollapsed) {
        setTimeout(() => {
          this.fullyExpanded = !this.isCollapsed;
        }, 300);
      } else {
        this.fullyExpanded = !this.isCollapsed;
      }
    },
    openUpdatesPanel() {
      this.uiStore.openModal(VERSIONS_MODAL_KEY);
    },
    async handleSelect(key) {
      switch (key) {
        case "workflows": {
          if (this.$router.currentRoute.name !== VIEWS.WORKFLOWS) {
            this.goToRoute({ name: VIEWS.WORKFLOWS });
          }
          break;
        }
        case "templates": {
          if (this.$router.currentRoute.name !== VIEWS.TEMPLATES) {
            this.goToRoute({ name: VIEWS.TEMPLATES });
          }
          break;
        }
        case "credentials": {
          if (this.$router.currentRoute.name !== VIEWS.CREDENTIALS) {
            this.goToRoute({ name: VIEWS.CREDENTIALS });
          }
          break;
        }
        case "variables": {
          if (this.$router.currentRoute.name !== VIEWS.VARIABLES) {
            this.goToRoute({ name: VIEWS.VARIABLES });
          }
          break;
        }
        case "executions": {
          if (this.$router.currentRoute.name !== VIEWS.EXECUTIONS) {
            this.goToRoute({ name: VIEWS.EXECUTIONS });
          }
          break;
        }
        case "workersview": {
          if (this.$router.currentRoute.name !== VIEWS.WORKER_VIEW) {
            this.goToRoute({ name: VIEWS.WORKER_VIEW });
          }
          break;
        }
        case "settings": {
          const defaultRoute = this.findFirstAccessibleSettingsRoute();
          if (defaultRoute) {
            const route = this.$router.resolve({ name: defaultRoute });
            if (this.$router.currentRoute.name !== defaultRoute) {
              this.goToRoute(route.path);
            }
          }
          break;
        }
        case "about": {
          this.trackHelpItemClick("about");
          this.uiStore.openModal(ABOUT_MODAL_KEY);
          break;
        }
        case "quickstart":
        case "docs":
        case "forum":
        case "examples": {
          this.trackHelpItemClick(key);
          break;
        }
        default:
          break;
      }
    },
    goToRoute(route) {
      this.$router.push(route).catch((failure) => {
        console.log(failure);
        if (!isNavigationFailure(failure)) {
          console.error(failure);
        }
      });
    },
    findFirstAccessibleSettingsRoute() {
      const settingsRoutes = this.$router.getRoutes().find((route) => route.path === "/settings").children.map((route) => route.name || "");
      let defaultSettingsRoute = null;
      for (const route of settingsRoutes) {
        if (this.canUserAccessRouteByName(route)) {
          defaultSettingsRoute = route;
          break;
        }
      }
      return defaultSettingsRoute;
    },
    onResize(event) {
      void this.callDebounced("onResizeEnd", { debounceTime: 100 }, event);
    },
    async onResizeEnd(event) {
      const browserWidth = event.target.outerWidth;
      await this.checkWidthAndAdjustSidebar(browserWidth);
    },
    async checkWidthAndAdjustSidebar(width) {
      if (width < 900) {
        this.uiStore.sidebarMenuCollapsed = true;
        await this.$nextTick();
        this.fullyExpanded = !this.isCollapsed;
      }
    }
  }
});
const sideMenu = "_sideMenu_q79od_5";
const logo = "_logo_q79od_12";
const sideMenuCollapsed = "_sideMenuCollapsed_q79od_23";
const sideMenuCollapseButton = "_sideMenuCollapseButton_q79od_30";
const updates = "_updates_q79od_49";
const expanded = "_expanded_q79od_62";
const userArea = "_userArea_q79od_69";
const userName = "_userName_q79od_76";
const userActions = "_userActions_q79od_90";
const style0 = {
  sideMenu,
  logo,
  sideMenuCollapsed,
  sideMenuCollapseButton,
  updates,
  expanded,
  userArea,
  userName,
  userActions
};
const _hoisted_1 = ["src"];
const _hoisted_2 = {
  class: "ml-3xs",
  "data-test-id": "main-sidebar-user-menu"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_icon = resolveComponent("n8n-icon");
  const _component_ExecutionsUsage = resolveComponent("ExecutionsUsage");
  const _component_GiftNotificationIcon = resolveComponent("GiftNotificationIcon");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_MainSidebarSourceControl = resolveComponent("MainSidebarSourceControl");
  const _component_n8n_avatar = resolveComponent("n8n-avatar");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  const _component_n8n_action_dropdown = resolveComponent("n8n-action-dropdown");
  const _component_n8n_menu = resolveComponent("n8n-menu");
  return openBlock(), createElementBlock("div", {
    id: "side-menu",
    class: normalizeClass({
      ["side-menu"]: true,
      [_ctx.$style.sideMenu]: true,
      [_ctx.$style.sideMenuCollapsed]: _ctx.isCollapsed
    })
  }, [
    createBaseVNode("div", {
      id: "collapse-change-button",
      class: normalizeClass(["clickable", _ctx.$style.sideMenuCollapseButton]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleCollapse && _ctx.toggleCollapse(...args))
    }, [
      _ctx.isCollapsed ? (openBlock(), createBlock(_component_n8n_icon, {
        key: 0,
        icon: "chevron-right",
        size: "xsmall",
        class: "ml-5xs"
      })) : (openBlock(), createBlock(_component_n8n_icon, {
        key: 1,
        icon: "chevron-left",
        size: "xsmall",
        class: "mr-5xs"
      }))
    ], 2),
    createVNode(_component_n8n_menu, {
      items: _ctx.mainMenuItems,
      collapsed: _ctx.isCollapsed,
      onSelect: _ctx.handleSelect
    }, createSlots({
      header: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.logo)
        }, [
          createBaseVNode("img", {
            src: _ctx.logoPath,
            "data-test-id": "n8n-logo",
            class: normalizeClass(_ctx.$style.icon),
            alt: "n8n"
          }, null, 10, _hoisted_1)
        ], 2)
      ]),
      beforeLowerMenu: withCtx(() => [
        _ctx.fullyExpanded && _ctx.userIsTrialing ? (openBlock(), createBlock(_component_ExecutionsUsage, {
          key: 0,
          "cloud-plan-data": _ctx.currentPlanAndUsageData
        }, null, 8, ["cloud-plan-data"])) : createCommentVNode("", true)
      ]),
      menuSuffix: withCtx(() => [
        createBaseVNode("div", null, [
          _ctx.hasVersionUpdates ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.updates),
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.openUpdatesPanel && _ctx.openUpdatesPanel(...args))
          }, [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.giftContainer)
            }, [
              createVNode(_component_GiftNotificationIcon)
            ], 2),
            createVNode(_component_n8n_text, {
              class: normalizeClass({ ["ml-xs"]: true, [_ctx.$style.expanded]: _ctx.fullyExpanded }),
              color: "text-base"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.nextVersions.length > 99 ? "99+" : _ctx.nextVersions.length) + " update" + toDisplayString(_ctx.nextVersions.length > 1 ? "s" : ""), 1)
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)) : createCommentVNode("", true),
          createVNode(_component_MainSidebarSourceControl, { "is-collapsed": _ctx.isCollapsed }, null, 8, ["is-collapsed"])
        ])
      ]),
      _: 2
    }, [
      _ctx.showUserArea ? {
        name: "footer",
        fn: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.userArea)
          }, [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_el_dropdown, {
                disabled: !_ctx.isCollapsed,
                placement: "right-end",
                trigger: "click",
                onCommand: _ctx.onUserActionToggle
              }, {
                dropdown: withCtx(() => [
                  createVNode(_component_el_dropdown_menu, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_dropdown_item, { command: "settings" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$locale.baseText("settings")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_dropdown_item, { command: "logout" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$locale.baseText("auth.signout")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: normalizeClass({ [_ctx.$style.avatar]: true, ["clickable"]: _ctx.isCollapsed })
                  }, [
                    createVNode(_component_n8n_avatar, {
                      firstName: _ctx.usersStore.currentUser.firstName,
                      lastName: _ctx.usersStore.currentUser.lastName,
                      size: "small"
                    }, null, 8, ["firstName", "lastName"])
                  ], 2)
                ]),
                _: 1
              }, 8, ["disabled", "onCommand"])
            ]),
            createBaseVNode("div", {
              class: normalizeClass({ ["ml-2xs"]: true, [_ctx.$style.userName]: true, [_ctx.$style.expanded]: _ctx.fullyExpanded })
            }, [
              createVNode(_component_n8n_text, {
                size: "small",
                bold: true,
                color: "text-dark"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.usersStore.currentUser.fullName), 1)
                ]),
                _: 1
              })
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass({ [_ctx.$style.userActions]: true, [_ctx.$style.expanded]: _ctx.fullyExpanded })
            }, [
              createVNode(_component_n8n_action_dropdown, {
                items: _ctx.userMenuItems,
                placement: "top-start",
                "data-test-id": "user-menu",
                onSelect: _ctx.onUserActionToggle
              }, null, 8, ["items", "onSelect"])
            ], 2)
          ], 2)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["items", "collapsed", "onSelect"])
  ], 2);
}
const cssModules = {
  "$style": style0
};
const MainSidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  MainSidebar as default
};
