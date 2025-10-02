import { d as defineComponent, o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, g as renderSlot, q as createCommentVNode, aB as pushScopeId, aC as popScopeId, h as resolveComponent, i as createVNode, b as createBlock, f as withCtx, ac as withDirectives, s as createTextVNode, t as toDisplayString, ad as vShow, ak as createSlots, a3 as Fragment, ai as renderList, am as normalizeProps, at as guardReactiveProps } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { n as useUIStore, _ as _export_sfc, aa as EnterpriseEditionFeature, t as useUsersStore, y as useSettingsStore, am as useI18n } from "./n8n-8ddd8349.js";
import { d as debounceHelper } from "./index-00f166b0.js";
const _sfc_main$4 = defineComponent({
  name: "PageViewLayout",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapStores(useUIStore)
  }
});
const wrapper$1 = "_wrapper_z85zu_5";
const container = "_container_z85zu_20";
const aside = "_aside_z85zu_29";
const content = "_content_z85zu_43";
const style0$3 = {
  wrapper: wrapper$1,
  container,
  aside,
  content
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.$style.wrapper, !this.uiStore.sidebarMenuCollapsed && _ctx.$style.expandedSidebar])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.container)
    }, [
      _ctx.$slots.aside ? (openBlock(), createElementBlock("aside", {
        key: 0,
        class: normalizeClass(_ctx.$style.aside)
      }, [
        renderSlot(_ctx.$slots, "aside")
      ], 2)) : createCommentVNode("", true),
      createBaseVNode("main", {
        class: normalizeClass(_ctx.$style.content)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)
    ], 2)
  ], 2);
}
const cssModules$3 = {
  "$style": style0$3
};
const PageViewLayout = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__cssModules", cssModules$3]]);
const _sfc_main$3 = defineComponent({
  props: {
    overflow: {
      type: Boolean,
      default: false
    }
  }
});
const wrapper = "_wrapper_l75f8_5";
const overflow = "_overflow_l75f8_11";
const list = "_list_l75f8_11";
const body = "_body_l75f8_11";
const header = "_header_l75f8_21";
const style0$2 = {
  wrapper,
  overflow,
  list,
  body,
  header
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({ [_ctx.$style.wrapper]: true, [_ctx.$style.overflow]: _ctx.overflow })
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.list)
    }, [
      _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.header)
      }, [
        renderSlot(_ctx.$slots, "header")
      ], 2)) : createCommentVNode("", true),
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.body)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2)
    ], 2)
  ], 2);
}
const cssModules$2 = {
  "$style": style0$2
};
const PageViewLayoutList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__cssModules", cssModules$2]]);
const _sfc_main$2 = defineComponent({
  props: {
    value: {
      type: Boolean,
      default: true
    },
    myResourcesLabel: {
      type: String,
      default: ""
    },
    allResourcesLabel: {
      type: String,
      default: ""
    }
  },
  computed: {
    menuItems() {
      return [
        {
          id: "all",
          icon: "globe-americas",
          label: this.allResourcesLabel,
          position: "top"
        },
        {
          id: "owner",
          icon: "user",
          label: this.myResourcesLabel,
          position: "top"
        }
      ];
    }
  },
  methods: {
    onSelectOwner(type) {
      this.$emit("update:modelValue", type === "owner");
    }
  }
});
const ResourceOwnershipSelect_ee_vue_vue_type_style_index_0_scoped_64775fda_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-64775fda"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "resource-ownership-select" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_menu = resolveComponent("n8n-menu");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(_component_n8n_menu, {
      items: _ctx.menuItems,
      mode: "tabs",
      modelValue: _ctx.value ? "owner" : "all",
      "onUpdate:modelValue": _ctx.onSelectOwner
    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
  ]);
}
const ResourceOwnershipSelect = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-64775fda"]]);
const _sfc_main$1 = defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    keys: {
      type: Array,
      default: () => []
    },
    shareable: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Function
    }
  },
  data() {
    return {
      EnterpriseEditionFeature
    };
  },
  computed: {
    ...mapStores(useUsersStore),
    ownedByUsers() {
      return this.usersStore.allUsers.map(
        (user) => user.id === this.modelValue.sharedWith ? { ...user, disabled: true } : user
      );
    },
    sharedWithUsers() {
      return this.usersStore.allUsers.map(
        (user) => user.id === this.modelValue.ownedBy ? { ...user, disabled: true } : user
      );
    },
    filtersLength() {
      let length = 0;
      this.keys.forEach((key) => {
        if (key === "search") {
          return;
        }
        length += (Array.isArray(this.modelValue[key]) ? this.modelValue[key].length > 0 : this.modelValue[key] !== "") ? 1 : 0;
      });
      return length;
    },
    hasFilters() {
      return this.filtersLength > 0;
    }
  },
  methods: {
    setKeyValue(key, value) {
      const filters = {
        ...this.modelValue,
        [key]: value
      };
      this.$emit("update:modelValue", filters);
    },
    resetFilters() {
      if (this.reset) {
        this.reset();
      } else {
        const filters = { ...this.modelValue };
        this.keys.forEach((key) => {
          filters[key] = Array.isArray(this.modelValue[key]) ? [] : "";
        });
        this.$emit("update:modelValue", filters);
      }
    }
  },
  watch: {
    filtersLength(value) {
      this.$emit("update:filtersLength", value);
    }
  }
});
const style0$1 = {
  "filter-button": "_filter-button_157qk_5",
  "filters-dropdown": "_filters-dropdown_157qk_10",
  "filters-dropdown-footer": "_filters-dropdown-footer_157qk_15"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_badge = resolveComponent("n8n-badge");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_n8n_input_label = resolveComponent("n8n-input-label");
  const _component_n8n_user_select = resolveComponent("n8n-user-select");
  const _component_enterprise_edition = resolveComponent("enterprise-edition");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_popover = resolveComponent("n8n-popover");
  return openBlock(), createBlock(_component_n8n_popover, {
    trigger: "click",
    width: "304",
    size: "large"
  }, {
    reference: withCtx(() => [
      createVNode(_component_n8n_button, {
        icon: "filter",
        type: "tertiary",
        active: _ctx.hasFilters,
        class: normalizeClass([_ctx.$style["filter-button"], "ml-2xs"]),
        "data-test-id": "resources-list-filters-trigger"
      }, {
        default: withCtx(() => [
          withDirectives(createVNode(_component_n8n_badge, {
            theme: "primary",
            class: "mr-4xs"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.filtersLength), 1)
            ]),
            _: 1
          }, 512), [
            [vShow, _ctx.filtersLength > 0]
          ]),
          createTextVNode(" " + toDisplayString(_ctx.$locale.baseText("forms.resourceFiltersDropdown.filters")), 1)
        ]),
        _: 1
      }, 8, ["active", "class"])
    ]),
    default: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style["filters-dropdown"]),
        "data-test-id": "resources-list-filters-dropdown"
      }, [
        renderSlot(_ctx.$slots, "default", {
          filters: _ctx.modelValue,
          setKeyValue: _ctx.setKeyValue
        }),
        _ctx.shareable ? (openBlock(), createBlock(_component_enterprise_edition, {
          key: 0,
          class: "mb-s",
          features: [_ctx.EnterpriseEditionFeature.Sharing]
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_input_label, {
              label: _ctx.$locale.baseText("forms.resourceFiltersDropdown.ownedBy"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(_component_n8n_user_select, {
              users: _ctx.ownedByUsers,
              currentUserId: _ctx.usersStore.currentUser.id,
              modelValue: _ctx.modelValue.ownedBy,
              size: "medium",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.setKeyValue("ownedBy", $event))
            }, null, 8, ["users", "currentUserId", "modelValue"])
          ]),
          _: 1
        }, 8, ["features"])) : createCommentVNode("", true),
        _ctx.shareable ? (openBlock(), createBlock(_component_enterprise_edition, {
          key: 1,
          features: [_ctx.EnterpriseEditionFeature.Sharing]
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_input_label, {
              label: _ctx.$locale.baseText("forms.resourceFiltersDropdown.sharedWith"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(_component_n8n_user_select, {
              users: _ctx.sharedWithUsers,
              currentUserId: _ctx.usersStore.currentUser.id,
              modelValue: _ctx.modelValue.sharedWith,
              size: "medium",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.setKeyValue("sharedWith", $event))
            }, null, 8, ["users", "currentUserId", "modelValue"])
          ]),
          _: 1
        }, 8, ["features"])) : createCommentVNode("", true),
        _ctx.hasFilters ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass([_ctx.$style["filters-dropdown-footer"], "mt-s"])
        }, [
          createVNode(_component_n8n_link, { onClick: _ctx.resetFilters }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("forms.resourceFiltersDropdown.reset")), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ], 2)) : createCommentVNode("", true)
      ], 2)
    ]),
    _: 3
  });
}
const cssModules$1 = {
  "$style": style0$1
};
const ResourceFiltersDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "resources-list-layout",
  mixins: [debounceHelper],
  components: {
    PageViewLayout,
    PageViewLayoutList,
    ResourceOwnershipSelect,
    ResourceFiltersDropdown
  },
  props: {
    resourceKey: {
      type: String,
      default: ""
    },
    displayName: {
      type: Function,
      default: (resource) => resource.name
    },
    resources: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    initialize: {
      type: Function,
      default: () => async () => {
      }
    },
    filters: {
      type: Object,
      default: () => ({ search: "", ownedBy: "", sharedWith: "" })
    },
    additionalFiltersHandler: {
      type: Function
    },
    showAside: {
      type: Boolean,
      default: true
    },
    shareable: {
      type: Boolean,
      default: true
    },
    showFiltersDropdown: {
      type: Boolean,
      default: true
    },
    sortFns: {
      type: Object,
      default: () => ({})
    },
    sortOptions: {
      type: Array,
      default: () => ["lastUpdated", "lastCreated", "nameAsc", "nameDesc"]
    },
    type: {
      type: String,
      default: "list"
    },
    typeProps: {
      type: Object,
      default: () => ({
        itemSize: 80
      })
    }
  },
  setup() {
    const i18n = useI18n();
    return {
      i18n
    };
  },
  data() {
    return {
      loading: true,
      isOwnerSubview: false,
      sortBy: this.sortOptions[0],
      hasFilters: false,
      filtersModel: { ...this.filters },
      currentPage: 1,
      rowsPerPage: 10,
      resettingFilters: false,
      EnterpriseEditionFeature
    };
  },
  computed: {
    ...mapStores(useSettingsStore, useUsersStore),
    subviewResources() {
      if (!this.shareable) {
        return this.resources;
      }
      return this.resources.filter((resource) => {
        var _a;
        if (this.isOwnerSubview && this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Sharing)) {
          return !!(resource.ownedBy && resource.ownedBy.id === ((_a = this.usersStore.currentUser) == null ? void 0 : _a.id));
        }
        return true;
      });
    },
    filterKeys() {
      return Object.keys(this.filtersModel);
    },
    filteredAndSortedSubviewResources() {
      const filtered = this.subviewResources.filter((resource) => {
        var _a;
        let matches = true;
        if (this.filtersModel.ownedBy) {
          matches = matches && !!(resource.ownedBy && resource.ownedBy.id === this.filtersModel.ownedBy);
        }
        if (this.filtersModel.sharedWith) {
          matches = matches && !!((_a = resource.sharedWith) == null ? void 0 : _a.find((sharee) => sharee.id === this.filtersModel.sharedWith));
        }
        if (this.filtersModel.search) {
          const searchString = this.filtersModel.search.toLowerCase();
          matches = matches && this.displayName(resource).toLowerCase().includes(searchString);
        }
        if (this.additionalFiltersHandler) {
          matches = this.additionalFiltersHandler(resource, this.filtersModel, matches);
        }
        return matches;
      });
      return filtered.sort((a, b) => {
        switch (this.sortBy) {
          case "lastUpdated":
            return this.sortFns.lastUpdated ? this.sortFns.lastUpdated(a, b) : new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
          case "lastCreated":
            return this.sortFns.lastCreated ? this.sortFns.lastCreated(a, b) : new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
          case "nameAsc":
            return this.sortFns.nameAsc ? this.sortFns.nameAsc(a, b) : this.displayName(a).trim().localeCompare(this.displayName(b).trim());
          case "nameDesc":
            return this.sortFns.nameDesc ? this.sortFns.nameDesc(a, b) : this.displayName(b).trim().localeCompare(this.displayName(a).trim());
          default:
            return this.sortFns[this.sortBy] ? this.sortFns[this.sortBy](a, b) : 0;
        }
      });
    },
    resourcesNotOwned() {
      return this.resources.filter((resource) => {
        var _a;
        return resource.ownedBy && resource.ownedBy.id !== ((_a = this.usersStore.currentUser) == null ? void 0 : _a.id);
      });
    },
    shouldSwitchToAllSubview() {
      return !this.hasFilters && this.isOwnerSubview && this.resourcesNotOwned.length > 0;
    }
  },
  methods: {
    async onMounted() {
      await this.initialize();
      this.loading = false;
      await this.$nextTick();
      this.focusSearchInput();
      if (this.hasAppliedFilters()) {
        this.hasFilters = true;
      }
    },
    hasAppliedFilters() {
      return !!this.filterKeys.find(
        (key) => key !== "search" && (Array.isArray(this.filters[key]) ? this.filters[key].length > 0 : this.filters[key] !== "")
      );
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setRowsPerPage(rowsPerPage) {
      this.rowsPerPage = rowsPerPage;
    },
    resetFilters() {
      Object.keys(this.filtersModel).forEach((key) => {
        this.filtersModel[key] = Array.isArray(this.filtersModel[key]) ? [] : "";
      });
      this.resettingFilters = true;
      this.sendFiltersTelemetry("reset");
    },
    focusSearchInput() {
      if (this.$refs.search) {
        this.$refs.search.focus();
      }
    },
    setOwnerSubview(active) {
      this.isOwnerSubview = active;
    },
    getTelemetrySubview() {
      return this.i18n.baseText(
        `${this.resourceKey}.menu.${this.isOwnerSubview ? "my" : "all"}`
      );
    },
    sendSubviewTelemetry() {
      this.$telemetry.track(`User changed ${this.resourceKey} sub view`, {
        sub_view: this.getTelemetrySubview()
      });
    },
    sendSortingTelemetry() {
      this.$telemetry.track(`User changed sorting in ${this.resourceKey} list`, {
        sub_view: this.getTelemetrySubview(),
        sorting: this.sortBy
      });
    },
    sendFiltersTelemetry(source) {
      if (this.resettingFilters) {
        if (source !== "reset") {
          return;
        }
        setTimeout(() => this.resettingFilters = false, 1500);
      }
      const filters = this.filtersModel;
      const filtersSet = [];
      const filterValues = [];
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtersSet.push(key);
          filterValues.push(key === "search" ? null : filters[key]);
        }
      });
      this.$telemetry.track(`User set filters in ${this.resourceKey} list`, {
        filters_set: filtersSet,
        filter_values: filterValues,
        sub_view: this.getTelemetrySubview(),
        [`${this.resourceKey}_total_in_view`]: this.subviewResources.length,
        [`${this.resourceKey}_after_filtering`]: this.filteredAndSortedSubviewResources.length
      });
    },
    onUpdateFiltersLength(length) {
      this.hasFilters = length > 0;
    },
    onSearch(search2) {
      this.filtersModel.search = search2;
      this.$emit("update:filters", this.filtersModel);
    }
  },
  mounted() {
    void this.onMounted();
  },
  watch: {
    isOwnerSubview() {
      this.sendSubviewTelemetry();
    },
    filters(value) {
      this.filtersModel = value;
    },
    "filtersModel.ownedBy"(value) {
      if (value) {
        this.setOwnerSubview(false);
      }
      this.sendFiltersTelemetry("ownedBy");
    },
    "filtersModel.sharedWith"() {
      this.sendFiltersTelemetry("sharedWith");
    },
    "filtersModel.search"() {
      void this.callDebounced(
        "sendFiltersTelemetry",
        { debounceTime: 1e3, trailing: true },
        "search"
      );
    },
    sortBy(newValue) {
      this.$emit("sort", newValue);
      this.sendSortingTelemetry();
    }
  }
});
const search = "_search_1l5ez_16";
const listWrapper = "_listWrapper_1l5ez_20";
const datatable = "_datatable_1l5ez_39";
const style0 = {
  "heading-wrapper": "_heading-wrapper_1l5ez_5",
  "filters-row": "_filters-row_1l5ez_9",
  search,
  listWrapper,
  "sort-and-filter": "_sort-and-filter_1l5ez_24",
  "header-loading": "_header-loading_1l5ez_31",
  "card-loading": "_card-loading_1l5ez_35",
  datatable
};
const _hoisted_1 = { class: "mt-xs mb-l" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { class: "mb-xs" };
const _hoisted_5 = {
  key: 0,
  class: "mt-xs"
};
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", { class: "pb-xs" }, null, -1);
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_resource_ownership_select = resolveComponent("resource-ownership-select");
  const _component_enterprise_edition = resolveComponent("enterprise-edition");
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_action_box = resolveComponent("n8n-action-box");
  const _component_n8n_icon = resolveComponent("n8n-icon");
  const _component_n8n_input = resolveComponent("n8n-input");
  const _component_n8n_option = resolveComponent("n8n-option");
  const _component_n8n_select = resolveComponent("n8n-select");
  const _component_resource_filters_dropdown = resolveComponent("resource-filters-dropdown");
  const _component_n8n_link = resolveComponent("n8n-link");
  const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
  const _component_n8n_recycle_scroller = resolveComponent("n8n-recycle-scroller");
  const _component_n8n_datatable = resolveComponent("n8n-datatable");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_page_view_layout_list = resolveComponent("page-view-layout-list");
  const _component_page_view_layout = resolveComponent("page-view-layout");
  return openBlock(), createBlock(_component_page_view_layout, null, createSlots({
    default: withCtx(() => [
      _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(_component_n8n_loading, {
          class: normalizeClass([_ctx.$style["header-loading"], "mb-l"]),
          variant: "custom"
        }, null, 8, ["class"]),
        createVNode(_component_n8n_loading, {
          class: normalizeClass([_ctx.$style["card-loading"], "mb-2xs"]),
          variant: "custom"
        }, null, 8, ["class"]),
        createVNode(_component_n8n_loading, {
          class: normalizeClass(_ctx.$style["card-loading"]),
          variant: "custom"
        }, null, 8, ["class"])
      ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        _ctx.resources.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "empty", {}, () => [
            createVNode(_component_n8n_action_box, {
              "data-test-id": "empty-resources-list",
              emoji: "👋",
              heading: _ctx.i18n.baseText(
                _ctx.usersStore.currentUser.firstName ? `${_ctx.resourceKey}.empty.heading` : `${_ctx.resourceKey}.empty.heading.userNotSetup`,
                {
                  interpolate: { name: _ctx.usersStore.currentUser.firstName }
                }
              ),
              description: _ctx.i18n.baseText(`${_ctx.resourceKey}.empty.description`),
              buttonText: _ctx.i18n.baseText(`${_ctx.resourceKey}.empty.button`),
              buttonType: "secondary",
              "onClick:button": _cache[2] || (_cache[2] = ($event) => _ctx.$emit("click:add", $event))
            }, null, 8, ["heading", "description", "buttonText"])
          ])
        ])) : (openBlock(), createBlock(_component_page_view_layout_list, {
          key: 1,
          overflow: _ctx.type !== "list"
        }, {
          header: withCtx(() => [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style["filters-row"])
              }, [
                createVNode(_component_n8n_input, {
                  modelValue: _ctx.filtersModel.search,
                  class: normalizeClass([_ctx.$style["search"], "mr-2xs"]),
                  placeholder: _ctx.i18n.baseText(`${_ctx.resourceKey}.search.placeholder`),
                  clearable: "",
                  ref: "search",
                  "data-test-id": "resources-list-search",
                  "onUpdate:modelValue": _ctx.onSearch
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_n8n_icon, { icon: "search" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "class", "placeholder", "onUpdate:modelValue"]),
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["sort-and-filter"])
                }, [
                  createVNode(_component_n8n_select, {
                    modelValue: _ctx.sortBy,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.sortBy = $event),
                    "data-test-id": "resources-list-sort"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sortOptions, (sortOption) => {
                        return openBlock(), createBlock(_component_n8n_option, {
                          "data-test-id": "resources-list-sort-item",
                          key: sortOption,
                          value: sortOption,
                          label: _ctx.i18n.baseText(`${_ctx.resourceKey}.sort.${sortOption}`)
                        }, null, 8, ["value", "label"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  _ctx.showFiltersDropdown ? (openBlock(), createBlock(_component_resource_filters_dropdown, {
                    key: 0,
                    keys: _ctx.filterKeys,
                    reset: _ctx.resetFilters,
                    modelValue: _ctx.filtersModel,
                    shareable: _ctx.shareable,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.$emit("update:filters", $event)),
                    "onUpdate:filtersLength": _ctx.onUpdateFiltersLength
                  }, {
                    default: withCtx((resourceFiltersSlotProps) => [
                      renderSlot(_ctx.$slots, "filters", normalizeProps(guardReactiveProps(resourceFiltersSlotProps)))
                    ]),
                    _: 3
                  }, 8, ["keys", "reset", "modelValue", "shareable", "onUpdate:filtersLength"])) : createCommentVNode("", true)
                ], 2)
              ], 2)
            ]),
            renderSlot(_ctx.$slots, "callout"),
            _ctx.showFiltersDropdown ? withDirectives((openBlock(), createElementBlock("div", _hoisted_5, [
              createVNode(_component_n8n_info_tip, { bold: false }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.filters.active`)) + " ", 1),
                  createVNode(_component_n8n_link, {
                    "data-test-id": "workflows-filter-reset",
                    onClick: _ctx.resetFilters,
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.filters.active.reset`)), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ], 512)), [
              [vShow, _ctx.hasFilters]
            ]) : createCommentVNode("", true),
            _hoisted_6
          ]),
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "preamble"),
            _ctx.filteredAndSortedSubviewResources.length > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.listWrapper),
              ref: "listWrapperRef"
            }, [
              _ctx.type === "list" ? (openBlock(), createBlock(_component_n8n_recycle_scroller, {
                key: 0,
                "data-test-id": "resources-list",
                class: normalizeClass([_ctx.$style.list, "list-style-none"]),
                items: _ctx.filteredAndSortedSubviewResources,
                "item-size": _ctx.typeProps.itemSize,
                "item-key": "id"
              }, {
                default: withCtx(({ item, updateItemSize }) => [
                  renderSlot(_ctx.$slots, "default", {
                    data: item,
                    updateItemSize
                  })
                ]),
                _: 3
              }, 8, ["class", "items", "item-size"])) : createCommentVNode("", true),
              _ctx.typeProps.columns ? (openBlock(), createBlock(_component_n8n_datatable, {
                key: 1,
                "data-test-id": "resources-table",
                class: normalizeClass(_ctx.$style.datatable),
                columns: _ctx.typeProps.columns,
                rows: _ctx.filteredAndSortedSubviewResources,
                currentPage: _ctx.currentPage,
                rowsPerPage: _ctx.rowsPerPage,
                "onUpdate:currentPage": _ctx.setCurrentPage,
                "onUpdate:rowsPerPage": _ctx.setRowsPerPage
              }, {
                row: withCtx(({ columns, row }) => [
                  renderSlot(_ctx.$slots, "default", {
                    data: row,
                    columns
                  })
                ]),
                _: 3
              }, 8, ["class", "columns", "rows", "currentPage", "rowsPerPage", "onUpdate:currentPage", "onUpdate:rowsPerPage"])) : createCommentVNode("", true)
            ], 2)) : (openBlock(), createBlock(_component_n8n_text, {
              key: 1,
              color: "text-base",
              size: "medium",
              "data-test-id": "resources-list-empty"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.noResults`)) + " ", 1),
                _ctx.shouldSwitchToAllSubview ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  !_ctx.filtersModel.search ? (openBlock(), createElementBlock("span", _hoisted_7, [
                    createTextVNode(" (" + toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.noResults.switchToShared.preamble`)) + " ", 1),
                    createVNode(_component_n8n_link, {
                      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.setOwnerSubview(false))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.noResults.switchToShared.link`)), 1)
                      ]),
                      _: 1
                    }),
                    createTextVNode(") ")
                  ])) : (openBlock(), createElementBlock("span", _hoisted_8, [
                    createTextVNode(" (" + toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.noResults.withSearch.switchToShared.preamble`)) + " ", 1),
                    createVNode(_component_n8n_link, {
                      onClick: _cache[6] || (_cache[6] = ($event) => _ctx.setOwnerSubview(false))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.noResults.withSearch.switchToShared.link`)), 1)
                      ]),
                      _: 1
                    }),
                    createTextVNode(") ")
                  ]))
                ], 64)) : createCommentVNode("", true)
              ]),
              _: 1
            })),
            renderSlot(_ctx.$slots, "postamble")
          ]),
          _: 3
        }, 8, ["overflow"]))
      ], 64))
    ]),
    _: 2
  }, [
    _ctx.showAside ? {
      name: "aside",
      fn: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass([_ctx.$style["heading-wrapper"], "mb-xs"])
        }, [
          createVNode(_component_n8n_heading, { size: "2xlarge" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.heading`)), 1)
            ]),
            _: 1
          })
        ], 2),
        createBaseVNode("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "add-button", { disabled: _ctx.disabled }, () => [
            createVNode(_component_n8n_button, {
              size: "large",
              block: "",
              disabled: _ctx.disabled,
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click:add", $event)),
              "data-test-id": "resources-list-add"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.i18n.baseText(`${_ctx.resourceKey}.add`)), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ]),
        _ctx.shareable ? (openBlock(), createBlock(_component_enterprise_edition, {
          key: 0,
          features: [_ctx.EnterpriseEditionFeature.Sharing]
        }, {
          default: withCtx(() => [
            createVNode(_component_resource_ownership_select, {
              modelValue: _ctx.isOwnerSubview,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.isOwnerSubview = $event),
              "my-resources-label": _ctx.i18n.baseText(`${_ctx.resourceKey}.menu.my`),
              "all-resources-label": _ctx.i18n.baseText(`${_ctx.resourceKey}.menu.all`)
            }, null, 8, ["modelValue", "my-resources-label", "all-resources-label"])
          ]),
          _: 1
        }, 8, ["features"])) : createCommentVNode("", true)
      ]),
      key: "0"
    } : void 0
  ]), 1024);
}
const cssModules = {
  "$style": style0
};
const ResourcesListLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  ResourcesListLayout as R
};
