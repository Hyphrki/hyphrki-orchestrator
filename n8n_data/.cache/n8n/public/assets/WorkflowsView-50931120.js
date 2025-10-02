import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, n as normalizeClass, f as withCtx, i as createVNode, s as createTextVNode, t as toDisplayString, j as createBaseVNode, q as createCommentVNode, af as withModifiers, ac as withDirectives, ad as vShow, k as createElementBlock, a3 as Fragment, ai as renderList } from "./vendor-fd4bd18c.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout-853dd5e5.js";
import { aa as EnterpriseEditionFeature, u as useToast, $ as useMessage, y as useSettingsStore, n as useUIStore, t as useUsersStore, H as useWorkflowsStore, a2 as getWorkflowPermissions, C as dateformat, B as VIEWS, dz as DUPLICATE_MODAL_KEY, dd as WORKFLOW_SHARE_MODAL_KEY, a9 as MODAL_CONFIRM, _ as _export_sfc, D as useCredentialsStore, z as useSourceControlStore, bp as useTagsStore } from "./n8n-8ddd8349.js";
import { W as WorkflowActivator } from "./WorkflowActivator-e755335a.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { l as TimeAgo, g as genericHelpers, T as TagsDropdown } from "./index-00f166b0.js";
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
import "./workflowActivate-7e113acb.js";
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
const WORKFLOW_LIST_ITEM_ACTIONS = {
  OPEN: "open",
  SHARE: "share",
  DUPLICATE: "duplicate",
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
      ...useToast(),
      ...useMessage()
    };
  },
  components: {
    TimeAgo,
    WorkflowActivator
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        createdAt: "",
        updatedAt: "",
        active: false,
        connections: {},
        nodes: [],
        name: "",
        sharedWith: [],
        ownedBy: {},
        versionId: ""
      })
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useSettingsStore, useUIStore, useUsersStore, useWorkflowsStore),
    currentUser() {
      return this.usersStore.currentUser || {};
    },
    workflowPermissions() {
      return getWorkflowPermissions(this.currentUser, this.data);
    },
    actions() {
      const actions = [
        {
          label: this.$locale.baseText("workflows.item.open"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.OPEN
        },
        {
          label: this.$locale.baseText("workflows.item.share"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.SHARE
        }
      ];
      if (!this.readOnly) {
        actions.push({
          label: this.$locale.baseText("workflows.item.duplicate"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE
        });
      }
      if (this.workflowPermissions.delete && !this.readOnly) {
        actions.push({
          label: this.$locale.baseText("workflows.item.delete"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DELETE
        });
      }
      return actions;
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
      if (event.metaKey || event.ctrlKey) {
        const route = this.$router.resolve({
          name: VIEWS.WORKFLOW,
          params: { name: this.data.id }
        });
        window.open(route.href, "_blank");
        return;
      }
      await this.$router.push({
        name: VIEWS.WORKFLOW,
        params: { name: this.data.id }
      });
    },
    onClickTag(tagId, event) {
      event.stopPropagation();
      this.$emit("click:tag", tagId, event);
    },
    onExpandTags() {
      this.$emit("expand:tags");
    },
    async onAction(action) {
      if (action === WORKFLOW_LIST_ITEM_ACTIONS.OPEN) {
        await this.onClick();
      } else if (action === WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE) {
        this.uiStore.openModalWithData({
          name: DUPLICATE_MODAL_KEY,
          data: {
            id: this.data.id,
            name: this.data.name,
            tags: (this.data.tags || []).map((tag) => tag.id)
          }
        });
      } else if (action === WORKFLOW_LIST_ITEM_ACTIONS.SHARE) {
        this.uiStore.openModalWithData({
          name: WORKFLOW_SHARE_MODAL_KEY,
          data: { id: this.data.id }
        });
        this.$telemetry.track("User opened sharing modal", {
          workflow_id: this.data.id,
          user_id_sharer: this.currentUser.id,
          sub_view: this.$route.name === VIEWS.WORKFLOWS ? "Workflows listing" : "Workflow editor"
        });
      } else if (action === WORKFLOW_LIST_ITEM_ACTIONS.DELETE) {
        const deleteConfirmed = await this.confirm(
          this.$locale.baseText("mainSidebar.confirmMessage.workflowDelete.message", {
            interpolate: { workflowName: this.data.name }
          }),
          this.$locale.baseText("mainSidebar.confirmMessage.workflowDelete.headline"),
          {
            type: "warning",
            confirmButtonText: this.$locale.baseText(
              "mainSidebar.confirmMessage.workflowDelete.confirmButtonText"
            ),
            cancelButtonText: this.$locale.baseText(
              "mainSidebar.confirmMessage.workflowDelete.cancelButtonText"
            )
          }
        );
        if (deleteConfirmed !== MODAL_CONFIRM) {
          return;
        }
        try {
          await this.workflowsStore.deleteWorkflow(this.data.id);
        } catch (error) {
          this.showError(error, this.$locale.baseText("generic.deleteWorkflowError"));
          return;
        }
        this.showMessage({
          title: this.$locale.baseText("mainSidebar.showMessage.handleSelect1.title"),
          type: "success"
        });
      }
    }
  }
});
const cardLink = "_cardLink_523op_5";
const cardHeading = "_cardHeading_523op_15";
const cardDescription = "_cardDescription_523op_21";
const cardActions = "_cardActions_523op_28";
const style0$1 = {
  cardLink,
  cardHeading,
  cardDescription,
  cardActions
};
const _hoisted_1$1 = { key: 0 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_time_ago = resolveComponent("time-ago");
  const _component_n8n_tags = resolveComponent("n8n-tags");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_badge = resolveComponent("n8n-badge");
  const _component_enterprise_edition = resolveComponent("enterprise-edition");
  const _component_workflow_activator = resolveComponent("workflow-activator");
  const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
  const _component_n8n_card = resolveComponent("n8n-card");
  return openBlock(), createBlock(_component_n8n_card, {
    class: normalizeClass(_ctx.$style.cardLink),
    onClick: _ctx.onClick
  }, {
    header: withCtx(() => [
      createVNode(_component_n8n_heading, {
        tag: "h2",
        bold: "",
        class: normalizeClass(_ctx.$style.cardHeading),
        "data-test-id": "workflow-card-name"
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
            _ctx.workflowPermissions.isOwner ? (openBlock(), createBlock(_component_n8n_badge, {
              key: 0,
              class: "mr-xs",
              theme: "tertiary",
              bold: ""
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("workflows.item.owner")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["features"]),
        createVNode(_component_workflow_activator, {
          class: "mr-s",
          "workflow-active": _ctx.data.active,
          "workflow-id": _ctx.data.id,
          "data-test-id": "workflow-card-activator"
        }, null, 8, ["workflow-active", "workflow-id"]),
        createVNode(_component_n8n_action_toggle, {
          actions: _ctx.actions,
          theme: "dark",
          onAction: _ctx.onAction,
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"])),
          "data-test-id": "workflow-card-actions"
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
            withDirectives(createBaseVNode("span", null, [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("workflows.item.updated")) + " ", 1),
              createVNode(_component_time_ago, {
                date: _ctx.data.updatedAt
              }, null, 8, ["date"]),
              createTextVNode(" | ")
            ], 512), [
              [vShow, _ctx.data]
            ]),
            withDirectives(createBaseVNode("span", { class: "mr-2xs" }, toDisplayString(_ctx.$locale.baseText("workflows.item.created")) + " " + toDisplayString(_ctx.formattedCreatedAtDate), 513), [
              [vShow, _ctx.data]
            ]),
            _ctx.settingsStore.areTagsEnabled && _ctx.data.tags && _ctx.data.tags.length > 0 ? withDirectives((openBlock(), createElementBlock("span", _hoisted_1$1, [
              createVNode(_component_n8n_tags, {
                tags: _ctx.data.tags,
                truncateAt: 3,
                truncate: "",
                "onClick:tag": _ctx.onClickTag,
                onExpand: _ctx.onExpandTags,
                "data-test-id": "workflow-card-tags"
              }, null, 8, ["tags", "onClick:tag", "onExpand"])
            ], 512)), [
              [vShow, _ctx.data]
            ]) : createCommentVNode("", true)
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
const WorkflowCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const StatusFilter = {
  ACTIVE: true,
  DEACTIVATED: false,
  ALL: ""
};
const WorkflowsView$1 = defineComponent({
  name: "WorkflowsView",
  mixins: [genericHelpers],
  components: {
    ResourcesListLayout,
    WorkflowCard,
    TagsDropdown
  },
  data() {
    return {
      filters: {
        search: "",
        ownedBy: "",
        sharedWith: "",
        status: StatusFilter.ALL,
        tags: []
      },
      sourceControlStoreUnsubscribe: () => {
      }
    };
  },
  computed: {
    ...mapStores(
      useSettingsStore,
      useUIStore,
      useUsersStore,
      useWorkflowsStore,
      useCredentialsStore,
      useSourceControlStore,
      useTagsStore
    ),
    currentUser() {
      return this.usersStore.currentUser || {};
    },
    allWorkflows() {
      return this.workflowsStore.allWorkflows;
    },
    isShareable() {
      return this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Sharing);
    },
    statusFilterOptions() {
      return [
        {
          label: this.$locale.baseText("workflows.filters.status.all"),
          value: StatusFilter.ALL
        },
        {
          label: this.$locale.baseText("workflows.filters.status.active"),
          value: StatusFilter.ACTIVE
        },
        {
          label: this.$locale.baseText("workflows.filters.status.deactivated"),
          value: StatusFilter.DEACTIVATED
        }
      ];
    }
  },
  methods: {
    addWorkflow() {
      this.uiStore.nodeViewInitialized = false;
      void this.$router.push({ name: VIEWS.NEW_WORKFLOW });
      this.$telemetry.track("User clicked add workflow button", {
        source: "Workflows list"
      });
    },
    async initialize() {
      await Promise.all([
        this.usersStore.fetchUsers(),
        this.workflowsStore.fetchAllWorkflows(),
        this.workflowsStore.fetchActiveWorkflows(),
        this.credentialsStore.fetchAllCredentials()
      ]);
    },
    onClickTag(tagId, event) {
      if (!this.filters.tags.includes(tagId)) {
        this.filters.tags.push(tagId);
      }
    },
    onFilter(resource, filters, matches) {
      this.saveFiltersOnQueryString();
      if (this.settingsStore.areTagsEnabled && filters.tags.length > 0) {
        matches = matches && filters.tags.every(
          (tag) => {
            var _a;
            return (_a = resource.tags) == null ? void 0 : _a.find(
              (resourceTag) => typeof resourceTag === "object" ? `${resourceTag.id}` === `${tag}` : `${resourceTag}` === `${tag}`
            );
          }
        );
      }
      if (filters.status !== "") {
        matches = matches && resource.active === filters.status;
      }
      return matches;
    },
    sendFiltersTelemetry(source) {
      this.$refs.layout.sendFiltersTelemetry(source);
    },
    saveFiltersOnQueryString() {
      const query = {};
      if (this.filters.search) {
        query.search = this.filters.search;
      }
      if (typeof this.filters.status !== "string") {
        query.status = this.filters.status.toString();
      }
      if (this.filters.tags.length) {
        query.tags = this.filters.tags.join(",");
      }
      if (this.filters.ownedBy) {
        query.ownedBy = this.filters.ownedBy;
      }
      if (this.filters.sharedWith) {
        query.sharedWith = this.filters.sharedWith;
      }
      void this.$router.replace({
        name: VIEWS.WORKFLOWS,
        query
      });
    },
    isValidUserId(userId) {
      return Object.keys(this.usersStore.users).includes(userId);
    },
    setFiltersFromQueryString() {
      const { tags, status, search, ownedBy, sharedWith } = this.$route.query;
      const filtersToApply = {};
      if (ownedBy && typeof ownedBy === "string" && this.isValidUserId(ownedBy)) {
        filtersToApply.ownedBy = ownedBy;
      }
      if (sharedWith && typeof sharedWith === "string" && this.isValidUserId(sharedWith)) {
        filtersToApply.sharedWith = sharedWith;
      }
      if (search && typeof search === "string") {
        filtersToApply.search = search;
      }
      if (tags && typeof tags === "string") {
        const currentTags = this.tagsStore.allTags.map((tag) => tag.id);
        const savedTags = tags.split(",").filter((tag) => currentTags.includes(tag));
        if (savedTags.length) {
          filtersToApply.tags = savedTags;
        }
      }
      if (status && typeof status === "string" && [StatusFilter.ACTIVE.toString(), StatusFilter.DEACTIVATED.toString()].includes(status)) {
        filtersToApply.status = status === "true";
      }
      if (Object.keys(filtersToApply).length) {
        this.filters = {
          ...this.filters,
          ...filtersToApply
        };
      }
    }
  },
  watch: {
    "filters.tags"() {
      this.sendFiltersTelemetry("tags");
    }
  },
  mounted() {
    this.setFiltersFromQueryString();
    void this.usersStore.showPersonalizationSurvey();
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
const _sfc_main = WorkflowsView$1;
const actionsContainer = "_actionsContainer_51pcb_5";
const emptyStateCard = "_emptyStateCard_51pcb_10";
const emptyStateCardIcon = "_emptyStateCardIcon_51pcb_23";
const style0 = {
  actionsContainer,
  emptyStateCard,
  emptyStateCardIcon
};
const _hoisted_1 = { class: "text-center mt-s" };
const _hoisted_2 = {
  key: 0,
  class: "mb-s"
};
const _hoisted_3 = { class: "mb-s" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
  const _component_workflow_card = resolveComponent("workflow-card");
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_icon = resolveComponent("n8n-icon");
  const _component_n8n_card = resolveComponent("n8n-card");
  const _component_n8n_input_label = resolveComponent("n8n-input-label");
  const _component_TagsDropdown = resolveComponent("TagsDropdown");
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  const _component_resources_list_layout = resolveComponent("resources-list-layout");
  return openBlock(), createBlock(_component_resources_list_layout, {
    ref: "layout",
    "resource-key": "workflows",
    resources: _ctx.allWorkflows,
    filters: _ctx.filters,
    "additional-filters-handler": _ctx.onFilter,
    "type-props": { itemSize: 80 },
    "show-aside": _ctx.allWorkflows.length > 0,
    shareable: _ctx.isShareable,
    initialize: _ctx.initialize,
    disabled: _ctx.readOnlyEnv,
    "onClick:add": _ctx.addWorkflow,
    "onUpdate:filters": _cache[0] || (_cache[0] = ($event) => _ctx.filters = $event)
  }, {
    "add-button": withCtx(({ disabled }) => [
      createVNode(_component_n8n_tooltip, {
        disabled: !_ctx.readOnlyEnv
      }, {
        content: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("mainSidebar.workflows.readOnlyEnv.tooltip")), 1)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(_component_n8n_button, {
              size: "large",
              block: "",
              disabled,
              onClick: _ctx.addWorkflow,
              "data-test-id": "resources-list-add"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText(`workflows.add`)), 1)
              ]),
              _: 2
            }, 1032, ["disabled", "onClick"])
          ])
        ]),
        _: 2
      }, 1032, ["disabled"])
    ]),
    default: withCtx(({ data, updateItemSize }) => [
      createVNode(_component_workflow_card, {
        "data-test-id": "resources-list-item",
        class: "mb-2xs",
        data,
        "onExpand:tags": ($event) => updateItemSize(data),
        "onClick:tag": _ctx.onClickTag,
        readOnly: _ctx.readOnlyEnv
      }, null, 8, ["data", "onExpand:tags", "onClick:tag", "readOnly"])
    ]),
    empty: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(_component_n8n_heading, {
          tag: "h2",
          size: "xlarge",
          class: "mb-2xs"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText(
              _ctx.currentUser.firstName ? "workflows.empty.heading" : "workflows.empty.heading.userNotSetup",
              { interpolate: { name: _ctx.currentUser.firstName } }
            )), 1)
          ]),
          _: 1
        }),
        createVNode(_component_n8n_text, {
          size: "large",
          color: "text-base"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText(
              _ctx.readOnlyEnv ? "workflows.empty.description.readOnlyEnv" : "workflows.empty.description"
            )), 1)
          ]),
          _: 1
        })
      ]),
      !_ctx.readOnlyEnv ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["text-center", "mt-2xl", _ctx.$style.actionsContainer])
      }, [
        createVNode(_component_n8n_card, {
          class: normalizeClass(_ctx.$style.emptyStateCard),
          hoverable: "",
          onClick: _ctx.addWorkflow,
          "data-test-id": "new-workflow-card"
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_icon, {
              class: normalizeClass(_ctx.$style.emptyStateCardIcon),
              icon: "file"
            }, null, 8, ["class"]),
            createVNode(_component_n8n_text, {
              size: "large",
              class: "mt-xs",
              color: "text-base"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("workflows.empty.startFromScratch")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["class", "onClick"])
      ], 2)) : createCommentVNode("", true)
    ]),
    filters: withCtx(({ setKeyValue }) => [
      _ctx.settingsStore.areTagsEnabled ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(_component_n8n_input_label, {
          label: _ctx.$locale.baseText("workflows.filters.tags"),
          bold: false,
          size: "small",
          color: "text-base",
          class: "mb-3xs"
        }, null, 8, ["label"]),
        createVNode(_component_TagsDropdown, {
          placeholder: _ctx.$locale.baseText("workflowOpen.filterWorkflows"),
          modelValue: _ctx.filters.tags,
          createEnabled: false,
          "onUpdate:modelValue": ($event) => setKeyValue("tags", $event)
        }, null, 8, ["placeholder", "modelValue", "onUpdate:modelValue"])
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_3, [
        createVNode(_component_n8n_input_label, {
          label: _ctx.$locale.baseText("workflows.filters.status"),
          bold: false,
          size: "small",
          color: "text-base",
          class: "mb-3xs"
        }, null, 8, ["label"]),
        createVNode(_component_n8n_select, {
          "data-test-id": "status-dropdown",
          modelValue: _ctx.filters.status,
          "onUpdate:modelValue": ($event) => setKeyValue("status", $event)
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.statusFilterOptions, (option) => {
              return openBlock(), createBlock(_component_n8n_option, {
                key: option.label,
                label: option.label,
                value: option.value,
                "data-test-id": "status"
              }, null, 8, ["label", "value"]);
            }), 128))
          ]),
          _: 2
        }, 1032, ["modelValue", "onUpdate:modelValue"])
      ])
    ]),
    _: 1
  }, 8, ["resources", "filters", "additional-filters-handler", "show-aside", "shareable", "initialize", "disabled", "onClick:add"]);
}
const cssModules = {
  "$style": style0
};
const WorkflowsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  WorkflowsView as default
};
