import { d as defineComponent, h as resolveComponent, o as openBlock, k as createElementBlock, n as normalizeClass, i as createVNode, f as withCtx, j as createBaseVNode, s as createTextVNode, t as toDisplayString, m as mergeProps } from "./vendor-fd4bd18c.js";
import { x as useRootStore, y as useSettingsStore, n as useUIStore, B as VIEWS, A as ABOUT_MODAL_KEY, V as VERSIONS_MODAL_KEY, _ as _export_sfc } from "./n8n-8ddd8349.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { u as userHelpers } from "./index-00f166b0.js";
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
const _sfc_main$1 = defineComponent({
  name: "SettingsSidebar",
  mixins: [userHelpers],
  computed: {
    ...mapStores(useRootStore, useSettingsStore, useUIStore),
    settingsFakeDoorFeatures() {
      return this.uiStore.getFakeDoorByLocation("settings");
    },
    sidebarMenuItems() {
      const menuItems = [
        {
          id: "settings-usage-and-plan",
          icon: "chart-bar",
          label: this.$locale.baseText("settings.usageAndPlan.title"),
          position: "top",
          available: this.canAccessUsageAndPlan(),
          activateOnRouteNames: [VIEWS.USAGE]
        },
        {
          id: "settings-personal",
          icon: "user-circle",
          label: this.$locale.baseText("settings.personal"),
          position: "top",
          available: this.canAccessPersonalSettings(),
          activateOnRouteNames: [VIEWS.PERSONAL_SETTINGS]
        },
        {
          id: "settings-users",
          icon: "user-friends",
          label: this.$locale.baseText("settings.users"),
          position: "top",
          available: this.canAccessUsersSettings(),
          activateOnRouteNames: [VIEWS.USERS_SETTINGS]
        },
        {
          id: "settings-api",
          icon: "plug",
          label: this.$locale.baseText("settings.n8napi"),
          position: "top",
          available: this.canAccessApiSettings(),
          activateOnRouteNames: [VIEWS.API_SETTINGS]
        },
        {
          id: "settings-external-secrets",
          icon: "vault",
          label: this.$locale.baseText("settings.externalSecrets.title"),
          position: "top",
          available: this.canAccessExternalSecrets(),
          activateOnRouteNames: [
            VIEWS.EXTERNAL_SECRETS_SETTINGS,
            VIEWS.EXTERNAL_SECRETS_PROVIDER_SETTINGS
          ]
        },
        {
          id: "settings-audit-logs",
          icon: "clipboard-list",
          label: this.$locale.baseText("settings.auditLogs.title"),
          position: "top",
          available: this.canAccessAuditLogs(),
          activateOnRouteNames: [VIEWS.AUDIT_LOGS]
        },
        {
          id: "settings-source-control",
          icon: "code-branch",
          label: this.$locale.baseText("settings.sourceControl.title"),
          position: "top",
          available: this.canAccessSourceControl(),
          activateOnRouteNames: [VIEWS.SOURCE_CONTROL]
        },
        {
          id: "settings-sso",
          icon: "user-lock",
          label: this.$locale.baseText("settings.sso"),
          position: "top",
          available: this.canAccessSso(),
          activateOnRouteNames: [VIEWS.SSO_SETTINGS]
        },
        {
          id: "settings-ldap",
          icon: "network-wired",
          label: this.$locale.baseText("settings.ldap"),
          position: "top",
          available: this.canAccessLdapSettings(),
          activateOnRouteNames: [VIEWS.LDAP_SETTINGS]
        }
      ];
      for (const item of this.settingsFakeDoorFeatures) {
        if (item.uiLocations.includes("settings")) {
          menuItems.push({
            id: item.id,
            icon: item.icon || "question",
            label: this.$locale.baseText(item.featureName),
            position: "top",
            available: true,
            activateOnRoutePaths: [`/settings/coming-soon/${item.id}`]
          });
        }
      }
      menuItems.push({
        id: "settings-log-streaming",
        icon: "sign-in-alt",
        label: this.$locale.baseText("settings.log-streaming"),
        position: "top",
        available: this.canAccessLogStreamingSettings(),
        activateOnRouteNames: [VIEWS.LOG_STREAMING_SETTINGS]
      });
      menuItems.push({
        id: "settings-community-nodes",
        icon: "cube",
        label: this.$locale.baseText("settings.communityNodes"),
        position: "top",
        available: this.canAccessCommunityNodes(),
        activateOnRouteNames: [VIEWS.COMMUNITY_NODES]
      });
      return menuItems;
    }
  },
  methods: {
    canAccessPersonalSettings() {
      return this.canUserAccessRouteByName(VIEWS.PERSONAL_SETTINGS);
    },
    canAccessUsersSettings() {
      return this.canUserAccessRouteByName(VIEWS.USERS_SETTINGS);
    },
    canAccessCommunityNodes() {
      return this.canUserAccessRouteByName(VIEWS.COMMUNITY_NODES);
    },
    canAccessApiSettings() {
      return this.canUserAccessRouteByName(VIEWS.API_SETTINGS);
    },
    canAccessLdapSettings() {
      return this.canUserAccessRouteByName(VIEWS.LDAP_SETTINGS);
    },
    canAccessLogStreamingSettings() {
      return this.canUserAccessRouteByName(VIEWS.LOG_STREAMING_SETTINGS);
    },
    canAccessUsageAndPlan() {
      return this.canUserAccessRouteByName(VIEWS.USAGE);
    },
    canAccessExternalSecrets() {
      return this.canUserAccessRouteByName(VIEWS.EXTERNAL_SECRETS_SETTINGS);
    },
    canAccessSourceControl() {
      return this.canUserAccessRouteByName(VIEWS.SOURCE_CONTROL);
    },
    canAccessAuditLogs() {
      return this.canUserAccessRouteByName(VIEWS.AUDIT_LOGS);
    },
    canAccessSso() {
      return this.canUserAccessRouteByName(VIEWS.SSO_SETTINGS);
    },
    onVersionClick() {
      this.uiStore.openModal(ABOUT_MODAL_KEY);
    },
    openUpdatesPanel() {
      this.uiStore.openModal(VERSIONS_MODAL_KEY);
    },
    async navigateTo(routeName) {
      if (this.$router.currentRoute.name !== routeName) {
        await this.$router.push({ name: routeName });
      }
    },
    async handleSelect(key) {
      switch (key) {
        case "settings-personal":
          await this.navigateTo(VIEWS.PERSONAL_SETTINGS);
          break;
        case "settings-users":
          await this.navigateTo(VIEWS.USERS_SETTINGS);
          break;
        case "settings-api":
          await this.navigateTo(VIEWS.API_SETTINGS);
          break;
        case "settings-ldap":
          await this.navigateTo(VIEWS.LDAP_SETTINGS);
          break;
        case "settings-log-streaming":
          await this.navigateTo(VIEWS.LOG_STREAMING_SETTINGS);
          break;
        case "users":
        case "logging":
          this.$router.push({ name: VIEWS.FAKE_DOOR, params: { featureId: key } }).catch(() => {
          });
          break;
        case "settings-community-nodes":
          await this.navigateTo(VIEWS.COMMUNITY_NODES);
          break;
        case "settings-usage-and-plan":
          await this.navigateTo(VIEWS.USAGE);
          break;
        case "settings-sso":
          await this.navigateTo(VIEWS.SSO_SETTINGS);
          break;
        case "settings-external-secrets":
          await this.navigateTo(VIEWS.EXTERNAL_SECRETS_SETTINGS);
          break;
        case "settings-source-control":
          if (this.$router.currentRoute.name !== VIEWS.SOURCE_CONTROL) {
            void this.$router.push({ name: VIEWS.SOURCE_CONTROL });
          }
          break;
        case "settings-audit-logs":
          if (this.$router.currentRoute.name !== VIEWS.AUDIT_LOGS) {
            void this.$router.push({ name: VIEWS.AUDIT_LOGS });
          }
          break;
        default:
          break;
      }
    }
  }
});
const container$1 = "_container_1ljnu_5";
const returnButton = "_returnButton_1ljnu_14";
const versionContainer = "_versionContainer_1ljnu_22";
const style0$1 = {
  container: container$1,
  returnButton,
  versionContainer
};
const _hoisted_1 = { class: "mr-xs" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_menu = resolveComponent("n8n-menu");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createVNode(_component_n8n_menu, {
      items: _ctx.sidebarMenuItems,
      onSelect: _ctx.handleSelect
    }, {
      header: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.returnButton),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("return")),
          "data-test-id": "settings-back"
        }, [
          createBaseVNode("i", _hoisted_1, [
            createVNode(_component_font_awesome_icon, { icon: "arrow-left" })
          ]),
          createVNode(_component_n8n_heading, {
            size: "large",
            bold: true
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("settings")), 1)
            ]),
            _: 1
          })
        ], 2)
      ]),
      menuSuffix: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.versionContainer)
        }, [
          createVNode(_component_n8n_link, {
            onClick: _ctx.onVersionClick,
            size: "small"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("settings.version")) + " " + toDisplayString(_ctx.rootStore.versionCli), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ], 2)
      ]),
      _: 1
    }, 8, ["items", "onSelect"])
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const SettingsSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const SettingsView$1 = defineComponent({
  name: "SettingsView",
  components: {
    SettingsSidebar
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousRoute = from;
    });
  },
  data() {
    return {
      previousRoute: null
    };
  },
  methods: {
    onReturn() {
      void this.$router.push(
        this.previousRoute ? this.previousRoute.path : { name: VIEWS.HOMEPAGE }
      );
    }
  }
});
const _sfc_main = SettingsView$1;
const container = "_container_f1dvd_5";
const contentContainer = "_contentContainer_f1dvd_12 _container_f1dvd_5";
const content = "_content_f1dvd_12";
const style0 = {
  container,
  contentContainer,
  content
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SettingsSidebar = resolveComponent("SettingsSidebar");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createVNode(_component_SettingsSidebar, { onReturn: _ctx.onReturn }, null, 8, ["onReturn"]),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.contentContainer)
    }, [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.content)
      }, [
        createVNode(_component_router_view, mergeProps({ name: "settingsView" }, _ctx.$attrs), null, 16)
      ], 2)
    ], 2)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const SettingsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  SettingsView as default
};
