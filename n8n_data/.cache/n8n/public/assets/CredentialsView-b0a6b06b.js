import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, n as normalizeClass, f as withCtx, i as createVNode, s as createTextVNode, t as toDisplayString, j as createBaseVNode, q as createCommentVNode, af as withModifiers, k as createElementBlock, ac as withDirectives, ad as vShow, a3 as Fragment, ai as renderList } from "./vendor-fd4bd18c.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout-853dd5e5.js";
import { aa as EnterpriseEditionFeature, $ as useMessage, t as useUsersStore, n as useUIStore, D as useCredentialsStore, O as getCredentialPermissions, C as dateformat, a9 as MODAL_CONFIRM, _ as _export_sfc, ad as useExternalSecretsStore, z as useSourceControlStore, G as useNodeTypesStore, bo as CREDENTIAL_SELECT_MODAL_KEY } from "./n8n-8ddd8349.js";
import { l as TimeAgo, m as CredentialIcon } from "./index-00f166b0.js";
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
const CREDENTIAL_LIST_ITEM_ACTIONS = {
  OPEN: "open",
  DELETE: "delete"
};
const _sfc_main$1 = defineComponent({
  data() {
    return {
      EnterpriseEditionFeature
    };
  },
  setup() {
    return {
      ...useMessage()
    };
  },
  components: {
    TimeAgo,
    CredentialIcon
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        createdAt: "",
        updatedAt: "",
        type: "",
        name: "",
        nodesAccess: [],
        sharedWith: [],
        ownedBy: {}
      })
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useCredentialsStore, useUIStore, useUsersStore),
    currentUser() {
      return this.usersStore.currentUser;
    },
    credentialType() {
      return this.credentialsStore.getCredentialTypeByName(this.data.type);
    },
    credentialPermissions() {
      return !this.currentUser ? null : getCredentialPermissions(this.currentUser, this.data);
    },
    actions() {
      if (!this.credentialPermissions) {
        return [];
      }
      return [
        {
          label: this.$locale.baseText("credentials.item.open"),
          value: CREDENTIAL_LIST_ITEM_ACTIONS.OPEN
        }
      ].concat(
        this.credentialPermissions.delete ? [
          {
            label: this.$locale.baseText("credentials.item.delete"),
            value: CREDENTIAL_LIST_ITEM_ACTIONS.DELETE
          }
        ] : []
      );
    },
    formattedCreatedAtDate() {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      return dateformat(
        this.data.createdAt,
        `d mmmm${this.data.createdAt.startsWith(currentYear) ? "" : ", yyyy"}`
      );
    }
  },
  methods: {
    async onClick(event) {
      var _a;
      if (this.$refs.cardActions === event.target || ((_a = this.$refs.cardActions) == null ? void 0 : _a.contains(event.target))) {
        return;
      }
      this.uiStore.openExistingCredential(this.data.id);
    },
    async onAction(action) {
      if (action === CREDENTIAL_LIST_ITEM_ACTIONS.OPEN) {
        await this.onClick();
      } else if (action === CREDENTIAL_LIST_ITEM_ACTIONS.DELETE) {
        const deleteConfirmed = await this.confirm(
          this.$locale.baseText(
            "credentialEdit.credentialEdit.confirmMessage.deleteCredential.message",
            {
              interpolate: { savedCredentialName: this.data.name }
            }
          ),
          this.$locale.baseText(
            "credentialEdit.credentialEdit.confirmMessage.deleteCredential.headline"
          ),
          {
            confirmButtonText: this.$locale.baseText(
              "credentialEdit.credentialEdit.confirmMessage.deleteCredential.confirmButtonText"
            )
          }
        );
        if (deleteConfirmed === MODAL_CONFIRM) {
          await this.credentialsStore.deleteCredential({ id: this.data.id });
        }
      }
    }
  }
});
const cardLink = "_cardLink_1s1ie_5";
const cardHeading = "_cardHeading_1s1ie_15";
const cardDescription = "_cardDescription_1s1ie_20";
const cardActions = "_cardActions_1s1ie_27";
const style0$1 = {
  cardLink,
  cardHeading,
  cardDescription,
  cardActions
};
const _hoisted_1$1 = { key: 0 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_credential_icon = resolveComponent("credential-icon");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_time_ago = resolveComponent("time-ago");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_badge = resolveComponent("n8n-badge");
  const _component_enterprise_edition = resolveComponent("enterprise-edition");
  const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
  const _component_n8n_card = resolveComponent("n8n-card");
  return openBlock(), createBlock(_component_n8n_card, {
    class: normalizeClass(_ctx.$style.cardLink),
    onClick: _ctx.onClick
  }, {
    prepend: withCtx(() => [
      createVNode(_component_credential_icon, {
        "credential-type-name": _ctx.credentialType ? _ctx.credentialType.name : ""
      }, null, 8, ["credential-type-name"])
    ]),
    header: withCtx(() => [
      createVNode(_component_n8n_heading, {
        tag: "h2",
        bold: "",
        class: normalizeClass(_ctx.$style.cardHeading)
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.data.name), 1)
        ]),
        _: 1
      }, 8, ["class"])
    ]),
    append: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.cardActions),
        ref: "cardActions"
      }, [
        createVNode(_component_enterprise_edition, {
          features: [_ctx.EnterpriseEditionFeature.Sharing]
        }, {
          default: withCtx(() => [
            _ctx.credentialPermissions.isOwner ? (openBlock(), createBlock(_component_n8n_badge, {
              key: 0,
              class: "mr-xs",
              theme: "tertiary",
              bold: ""
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("credentials.item.owner")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["features"]),
        createVNode(_component_n8n_action_toggle, {
          actions: _ctx.actions,
          theme: "dark",
          onAction: _ctx.onAction,
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, null, 8, ["actions", "onAction"])
      ], 2)
    ]),
    default: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.cardDescription)
      }, [
        createVNode(_component_n8n_text, {
          color: "text-light",
          size: "small"
        }, {
          default: withCtx(() => [
            _ctx.credentialType ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(_ctx.credentialType.displayName) + " | ", 1)) : createCommentVNode("", true),
            withDirectives(createBaseVNode("span", null, [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("credentials.item.updated")) + " ", 1),
              createVNode(_component_time_ago, {
                date: _ctx.data.updatedAt
              }, null, 8, ["date"]),
              createTextVNode(" | ")
            ], 512), [
              [vShow, _ctx.data]
            ]),
            withDirectives(createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("credentials.item.created")) + " " + toDisplayString(_ctx.formattedCreatedAtDate), 513), [
              [vShow, _ctx.data]
            ])
          ]),
          _: 1
        })
      ], 2)
    ]),
    _: 1
  }, 8, ["class", "onClick"]);
}
const cssModules$1 = {
  "$style": style0$1
};
const CredentialCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "CredentialsView",
  components: {
    ResourcesListLayout,
    CredentialCard
  },
  data() {
    return {
      filters: {
        search: "",
        ownedBy: "",
        sharedWith: "",
        type: ""
      },
      sourceControlStoreUnsubscribe: () => {
      }
    };
  },
  computed: {
    ...mapStores(
      useCredentialsStore,
      useNodeTypesStore,
      useUIStore,
      useUsersStore,
      useSourceControlStore,
      useExternalSecretsStore
    ),
    allCredentials() {
      return this.credentialsStore.allCredentials;
    },
    allCredentialTypes() {
      return this.credentialsStore.allCredentialTypes;
    },
    credentialTypesById() {
      return this.credentialsStore.credentialTypesById;
    }
  },
  methods: {
    addCredential() {
      this.uiStore.openModal(CREDENTIAL_SELECT_MODAL_KEY);
      this.$telemetry.track("User clicked add cred button", {
        source: "Creds list"
      });
    },
    async initialize() {
      const loadPromises = [
        this.credentialsStore.fetchAllCredentials(),
        this.credentialsStore.fetchCredentialTypes(false),
        this.externalSecretsStore.fetchAllSecrets()
      ];
      if (this.nodeTypesStore.allNodeTypes.length === 0) {
        loadPromises.push(this.nodeTypesStore.getNodeTypes());
      }
      await Promise.all(loadPromises);
      await this.usersStore.fetchUsers();
    },
    onFilter(resource, filters, matches) {
      if (filters.type.length > 0) {
        matches = matches && filters.type.includes(resource.type);
      }
      if (filters.search) {
        const searchString = filters.search.toLowerCase();
        matches = matches || this.credentialTypesById[resource.type] && this.credentialTypesById[resource.type].displayName.toLowerCase().includes(searchString);
      }
      return matches;
    },
    sendFiltersTelemetry(source) {
      this.$refs.layout.sendFiltersTelemetry(source);
    }
  },
  watch: {
    "filters.type"() {
      this.sendFiltersTelemetry("type");
    }
  },
  mounted() {
    this.sourceControlStoreUnsubscribe = this.sourceControlStore.$onAction(({ name, after }) => {
      if (name === "pullWorkfolder" && after) {
        after(() => {
          void this.initialize();
        });
      }
    });
  },
  beforeUnmount() {
    this.sourceControlStoreUnsubscribe();
  }
});
const sidebarContainer = "_sidebarContainer_1qflh_9";
const style0 = {
  "type-input": "_type-input_1qflh_5",
  sidebarContainer
};
const _hoisted_1 = { class: "mb-s" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_credential_card = resolveComponent("credential-card");
  const _component_n8n_input_label = resolveComponent("n8n-input-label");
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  const _component_resources_list_layout = resolveComponent("resources-list-layout");
  return openBlock(), createBlock(_component_resources_list_layout, {
    ref: "layout",
    "resource-key": "credentials",
    resources: _ctx.allCredentials,
    initialize: _ctx.initialize,
    filters: _ctx.filters,
    "additional-filters-handler": _ctx.onFilter,
    "type-props": { itemSize: 77 },
    "onClick:add": _ctx.addCredential,
    "onUpdate:filters": _cache[0] || (_cache[0] = ($event) => _ctx.filters = $event)
  }, {
    default: withCtx(({ data }) => [
      createVNode(_component_credential_card, {
        "data-test-id": "resources-list-item",
        class: "mb-2xs",
        data
      }, null, 8, ["data"])
    ]),
    filters: withCtx(({ setKeyValue }) => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(_component_n8n_input_label, {
          label: _ctx.$locale.baseText("credentials.filters.type"),
          bold: false,
          size: "small",
          color: "text-base",
          class: "mb-3xs"
        }, null, 8, ["label"]),
        createVNode(_component_n8n_select, {
          modelValue: _ctx.filters.type,
          size: "medium",
          multiple: "",
          filterable: "",
          ref: "typeInput",
          class: normalizeClass(_ctx.$style["type-input"]),
          "onUpdate:modelValue": ($event) => setKeyValue("type", $event)
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allCredentialTypes, (credentialType) => {
              return openBlock(), createBlock(_component_n8n_option, {
                key: credentialType.name,
                value: credentialType.name,
                label: credentialType.displayName
              }, null, 8, ["value", "label"]);
            }), 128))
          ]),
          _: 2
        }, 1032, ["modelValue", "class", "onUpdate:modelValue"])
      ])
    ]),
    _: 1
  }, 8, ["resources", "initialize", "filters", "additional-filters-handler", "onClick:add"]);
}
const cssModules = {
  "$style": style0
};
const CredentialsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  CredentialsView as default
};
