import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, m as mergeProps, ak as createSlots, f as withCtx, i as createVNode, j as createBaseVNode, t as toDisplayString, n as normalizeClass, g as renderSlot, s as createTextVNode, ac as withDirectives, k as createElementBlock, a3 as Fragment, ai as renderList, ad as vShow, q as createCommentVNode } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { g as genericHelpers, d as debounceHelper } from "./index-00f166b0.js";
import { _ as _export_sfc, u as useToast, ap as usePostHog, t as useUsersStore, n as useUIStore, a0 as useTemplatesStore, y as useSettingsStore, B as VIEWS, g8 as setPageTitle } from "./n8n-8ddd8349.js";
import { N as NodeList, T as TemplateList } from "./TemplateList-dd069b58.js";
import { V as VueAgile } from "./vue-agile-48d7449e.js";
import { T as TemplatesView } from "./TemplatesView-1fafd4b7.js";
import "./prettier-ee8b90a8.js";
import "./codemirror-lang-html-n8n-1744db69.js";
import "./@n8n/codemirror-lang-sql-71393e13.js";
import "./@lezer/common-ff1769bd.js";
import "./lodash-es-be629387.js";
import "./uuid-2dfcd766.js";
import "./luxon-63e8a0ed.js";
import "./esprima-next-b5fc8919.js";
import "./@vueuse/core-f4908be6.js";
import "./codemirror-lang-n8n-expression-5b146a0d.js";
import "./fast-json-stable-stringify-4acbec5d.js";
import "./timeago.js-527228bd.js";
import "./qrcode.vue-401ae704.js";
import "./vue3-touch-events-c30a9e21.js";
import "./@fortawesome/fontawesome-svg-core-6d4d86d8.js";
import "./@fortawesome/free-solid-svg-icons-e786cea6.js";
import "./@fortawesome/free-regular-svg-icons-d7581360.js";
import "./@fortawesome/vue-fontawesome-04873987.js";
import "./@jsplumb/core-defb43f2.js";
import "./@jsplumb/util-1214d169.js";
import "./@jsplumb/common-6db23379.js";
import "./@jsplumb/browser-ui-21fcaa55.js";
import "./chart.js-b7590faa.js";
import "./flatted-551ad821.js";
import "./vue-i18n-86898575.js";
import "./@jsplumb/connector-bezier-4c31eaae.js";
const _sfc_main$4 = defineComponent({
  name: "Card",
  mixins: [genericHelpers],
  props: {
    loading: {
      type: Boolean
    },
    title: {
      type: String
    }
  }
});
const card = "_card_fly8k_5";
const title$1 = "_title_fly8k_21";
const style0$3 = {
  card,
  title: title$1
};
const _hoisted_1$2 = ["textContent"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_card = resolveComponent("n8n-card");
  return openBlock(), createBlock(_component_n8n_card, mergeProps({
    class: _ctx.$style.card
  }, _ctx.$attrs), createSlots({
    default: withCtx(() => [
      createVNode(_component_n8n_loading, {
        loading: _ctx.loading,
        rows: 3,
        variant: "p"
      }, null, 8, ["loading"])
    ]),
    _: 2
  }, [
    !_ctx.loading ? {
      name: "header",
      fn: withCtx(() => [
        createBaseVNode("span", {
          textContent: toDisplayString(_ctx.title),
          class: normalizeClass(_ctx.$style.title)
        }, null, 10, _hoisted_1$2)
      ]),
      key: "0"
    } : void 0,
    !_ctx.loading ? {
      name: "footer",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "footer")
      ]),
      key: "1"
    } : void 0
  ]), 1040, ["class"]);
}
const cssModules$3 = {
  "$style": style0$3
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__cssModules", cssModules$3]]);
const _sfc_main$3 = defineComponent({
  name: "CollectionCard",
  mixins: [genericHelpers],
  props: {
    loading: {
      type: Boolean
    },
    collection: {
      type: Object
    }
  },
  components: {
    Card,
    NodeList
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_NodeList = resolveComponent("NodeList");
  const _component_Card = resolveComponent("Card");
  return openBlock(), createBlock(_component_Card, {
    loading: _ctx.loading,
    title: _ctx.collection.name
  }, {
    footer: withCtx(() => [
      createVNode(_component_n8n_text, {
        size: "small",
        color: "text-light"
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.collection.workflows.length) + " " + toDisplayString(_ctx.$locale.baseText("templates.workflows")), 1)
        ]),
        _: 1
      }),
      createVNode(_component_NodeList, {
        nodes: _ctx.collection.nodes,
        showMore: false
      }, null, 8, ["nodes"])
    ]),
    _: 1
  }, 8, ["loading", "title"]);
}
const CollectionCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = defineComponent({
  name: "CollectionsCarousel",
  mixins: [genericHelpers],
  props: {
    collections: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  watch: {
    collections() {
      setTimeout(() => {
        this.updateCarouselScroll();
      }, 0);
    },
    loading() {
      setTimeout(() => {
        this.updateCarouselScroll();
      }, 0);
    }
  },
  components: {
    Card,
    CollectionCard,
    agile: VueAgile
  },
  data() {
    return {
      carouselScrollPosition: 0,
      cardWidth: 240,
      scrollEnd: false,
      listElement: null
    };
  },
  methods: {
    updateCarouselScroll() {
      if (this.listElement) {
        this.carouselScrollPosition = Number(this.listElement.scrollLeft.toFixed());
        const width = this.listElement.clientWidth;
        const scrollWidth = this.listElement.scrollWidth;
        const scrollLeft = this.carouselScrollPosition;
        this.scrollEnd = scrollWidth - width <= scrollLeft + 7;
      }
    },
    onCardClick(event, id) {
      this.$emit("openCollection", { event, id });
    },
    scrollLeft() {
      if (this.listElement) {
        this.listElement.scrollBy({ left: -(this.cardWidth * 2), top: 0, behavior: "smooth" });
      }
    },
    scrollRight() {
      if (this.listElement) {
        this.listElement.scrollBy({ left: this.cardWidth * 2, top: 0, behavior: "smooth" });
      }
    }
  },
  async mounted() {
    await this.$nextTick();
    const sliderRef = this.$refs.slider;
    if (!sliderRef) {
      return;
    }
    this.listElement = sliderRef.$el.querySelector(".agile__list");
    if (this.listElement) {
      this.listElement.addEventListener("scroll", this.updateCarouselScroll);
    }
  },
  beforeUnmount() {
    const sliderRef = this.$refs.slider;
    if (sliderRef) {
      sliderRef.destroy();
    }
    window.removeEventListener("scroll", this.updateCarouselScroll);
  }
});
const container = "_container_gpmxb_5";
const button$1 = "_button_gpmxb_9";
const leftButton = "_leftButton_gpmxb_30 _button_gpmxb_9";
const rightButton = "_rightButton_gpmxb_39 _button_gpmxb_9";
const style0$2 = {
  container,
  button: button$1,
  leftButton,
  rightButton
};
const CollectionsCarousel_vue_vue_type_style_index_1_lang = "";
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Card = resolveComponent("Card");
  const _component_CollectionCard = resolveComponent("CollectionCard");
  const _component_agile = resolveComponent("agile");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return withDirectives((openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createVNode(_component_agile, {
      ref: "slider",
      dots: false,
      navButtons: false,
      infinite: false,
      "slides-to-show": 4,
      onAfterChange: _ctx.updateCarouselScroll
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.loading ? 4 : 0, (n) => {
          return openBlock(), createBlock(_component_Card, {
            key: `loading-${n}`,
            loading: _ctx.loading
          }, null, 8, ["loading"]);
        }), 128)),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.loading ? [] : _ctx.collections, (collection) => {
          return openBlock(), createBlock(_component_CollectionCard, {
            key: collection.id,
            collection,
            onClick: (e) => _ctx.onCardClick(e, collection.id)
          }, null, 8, ["collection", "onClick"]);
        }), 128))
      ]),
      _: 1
    }, 8, ["onAfterChange"]),
    withDirectives(createBaseVNode("button", {
      class: normalizeClass(_ctx.$style.leftButton),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.scrollLeft && _ctx.scrollLeft(...args))
    }, [
      createVNode(_component_font_awesome_icon, { icon: "chevron-left" })
    ], 2), [
      [vShow, _ctx.carouselScrollPosition > 0]
    ]),
    withDirectives(createBaseVNode("button", {
      class: normalizeClass(_ctx.$style.rightButton),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.scrollRight && _ctx.scrollRight(...args))
    }, [
      createVNode(_component_font_awesome_icon, { icon: "chevron-right" })
    ], 2), [
      [vShow, !_ctx.scrollEnd]
    ])
  ], 2)), [
    [vShow, _ctx.loading || _ctx.collections.length]
  ]);
}
const cssModules$2 = {
  "$style": style0$2
};
const CollectionsCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__cssModules", cssModules$2]]);
const _sfc_main$1 = defineComponent({
  name: "TemplateFilters",
  mixins: [genericHelpers],
  props: {
    sortOnPopulate: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array
    },
    expandLimit: {
      type: Number,
      default: 12
    },
    loading: {
      type: Boolean
    },
    selected: {
      type: Array
    }
  },
  watch: {
    categories: {
      handler(categories2) {
        if (!this.sortOnPopulate) {
          this.sortedCategories = categories2;
        } else {
          const selected = this.selected || [];
          const selectedCategories = categories2.filter(({ id }) => selected.includes(id));
          const notSelectedCategories = categories2.filter(({ id }) => !selected.includes(id));
          this.sortedCategories = selectedCategories.concat(notSelectedCategories);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      collapsed: true,
      sortedCategories: []
    };
  },
  computed: {
    allSelected() {
      return this.selected.length === 0;
    }
  },
  methods: {
    collapseAction() {
      this.collapsed = false;
    },
    handleCheckboxChanged(value, selectedCategory) {
      this.$emit(value ? "select" : "clear", selectedCategory.id);
    },
    isSelected(categoryId) {
      return this.selected.includes(categoryId);
    },
    resetCategories() {
      this.$emit("clearAll");
    }
  }
});
const title = "_title_7aevl_5";
const categories = "_categories_7aevl_10";
const item = "_item_7aevl_15";
const button = "_button_7aevl_22";
const style0$1 = {
  title,
  categories,
  item,
  button
};
const TemplateFilters_vue_vue_type_style_index_1_lang = "";
const _hoisted_1$1 = ["textContent"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_n8n_text = resolveComponent("n8n-text");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.$style.filters, "template-filters"])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.title),
      textContent: toDisplayString(_ctx.$locale.baseText("templates.categoriesHeading"))
    }, null, 10, _hoisted_1$1),
    _ctx.loading ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.list)
    }, [
      createVNode(_component_n8n_loading, {
        loading: _ctx.loading,
        rows: _ctx.expandLimit
      }, null, 8, ["loading", "rows"])
    ], 2)) : createCommentVNode("", true),
    !_ctx.loading ? (openBlock(), createElementBlock("ul", {
      key: 1,
      class: normalizeClass(_ctx.$style.categories)
    }, [
      createBaseVNode("li", {
        class: normalizeClass(_ctx.$style.item)
      }, [
        createVNode(_component_el_checkbox, {
          label: _ctx.$locale.baseText("templates.allCategories"),
          modelValue: _ctx.allSelected,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = (value) => _ctx.resetCategories(value))
        }, null, 8, ["label", "modelValue"])
      ], 2),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapsed ? _ctx.sortedCategories.slice(0, _ctx.expandLimit) : _ctx.sortedCategories, (category) => {
        return openBlock(), createElementBlock("li", {
          key: category.id,
          class: normalizeClass(_ctx.$style.item)
        }, [
          createVNode(_component_el_checkbox, {
            label: category.name,
            modelValue: _ctx.isSelected(category.id),
            "onUpdate:modelValue": (value) => _ctx.handleCheckboxChanged(value, category)
          }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
        ], 2);
      }), 128))
    ], 2)) : createCommentVNode("", true),
    _ctx.sortedCategories.length > _ctx.expandLimit && _ctx.collapsed && !_ctx.loading ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: normalizeClass(_ctx.$style.button),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.collapseAction && _ctx.collapseAction(...args))
    }, [
      createVNode(_component_n8n_text, {
        size: "small",
        color: "primary"
      }, {
        default: withCtx(() => [
          createTextVNode(" + " + toDisplayString(`${_ctx.sortedCategories.length - _ctx.expandLimit} more`), 1)
        ]),
        _: 1
      })
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const cssModules$1 = {
  "$style": style0$1
};
const TemplateFilters = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "TemplatesSearchView",
  mixins: [genericHelpers, debounceHelper],
  components: {
    CollectionsCarousel,
    TemplateFilters,
    TemplateList,
    TemplatesView
  },
  setup() {
    return {
      ...useToast()
    };
  },
  data() {
    return {
      areCategoriesPrepopulated: false,
      categories: [],
      loading: true,
      loadingCategories: true,
      loadingCollections: true,
      loadingWorkflows: true,
      search: "",
      searchEventToTrack: null,
      errorLoadingWorkflows: false
    };
  },
  computed: {
    ...mapStores(useSettingsStore, useTemplatesStore, useUIStore, useUsersStore, usePostHog),
    totalWorkflows() {
      return this.templatesStore.getSearchedWorkflowsTotal(this.query);
    },
    workflows() {
      return this.templatesStore.getSearchedWorkflows(this.query) || [];
    },
    collections() {
      return this.templatesStore.getSearchedCollections(this.query) || [];
    },
    endOfSearchMessage() {
      if (this.loadingWorkflows) {
        return null;
      }
      if (!this.loadingCollections && this.workflows.length === 0 && this.collections.length === 0) {
        if (!this.settingsStore.isTemplatesEndpointReachable && this.errorLoadingWorkflows) {
          return this.$locale.baseText("templates.connectionWarning");
        }
        return this.$locale.baseText("templates.noSearchResults");
      }
      return null;
    },
    query() {
      return {
        categories: this.categories,
        search: this.search
      };
    },
    nothingFound() {
      return !this.loadingWorkflows && !this.loadingCollections && this.workflows.length === 0 && this.collections.length === 0;
    }
  },
  methods: {
    onOpenCollection({ event, id }) {
      this.navigateTo(event, VIEWS.COLLECTION, id);
    },
    onOpenTemplate({ event, id }) {
      this.navigateTo(event, VIEWS.TEMPLATE, id);
    },
    navigateTo(e, page, id) {
      if (e.metaKey || e.ctrlKey) {
        const route = this.$router.resolve({ name: page, params: { id } });
        window.open(route.href, "_blank");
        return;
      } else {
        void this.$router.push({ name: page, params: { id } });
      }
    },
    updateSearch() {
      this.updateQueryParam(this.search, this.categories.join(","));
      void this.loadWorkflowsAndCollections(false);
    },
    updateSearchTracking(search2, categories2) {
      if (!search2) {
        return;
      }
      if (this.searchEventToTrack && this.searchEventToTrack.search_string.length > search2.length) {
        return;
      }
      this.searchEventToTrack = {
        search_string: search2,
        workflow_results_count: this.workflows.length,
        collection_results_count: this.collections.length,
        categories_applied: categories2.map(
          (categoryId) => this.templatesStore.getCategoryById(categoryId.toString())
        ),
        wf_template_repo_session_id: this.templatesStore.currentSessionId
      };
    },
    trackSearch() {
      if (this.searchEventToTrack) {
        this.$telemetry.track(
          "User searched workflow templates",
          this.searchEventToTrack
        );
        this.searchEventToTrack = null;
      }
    },
    openNewWorkflow() {
      this.uiStore.nodeViewInitialized = false;
      void this.$router.push({ name: VIEWS.NEW_WORKFLOW });
    },
    onSearchInput(search2) {
      this.loadingWorkflows = true;
      this.loadingCollections = true;
      this.search = search2;
      void this.callDebounced("updateSearch", { debounceTime: 500, trailing: true });
      if (search2.length === 0) {
        this.trackSearch();
      }
    },
    onCategorySelected(selected) {
      this.categories = this.categories.concat(selected);
      this.updateSearch();
      this.trackCategories();
    },
    onCategoryUnselected(selected) {
      this.categories = this.categories.filter((id) => id !== selected);
      this.updateSearch();
      this.trackCategories();
    },
    onCategoriesCleared() {
      this.categories = [];
      this.updateSearch();
    },
    trackCategories() {
      if (this.categories.length) {
        this.$telemetry.track("User changed template filters", {
          search_string: this.search,
          categories_applied: this.categories.map(
            (categoryId) => this.templatesStore.getCollectionById(categoryId.toString())
          ),
          wf_template_repo_session_id: this.templatesStore.currentSessionId
        });
      }
    },
    updateQueryParam(search2, category) {
      const query = Object.assign({}, this.$route.query);
      if (category.length) {
        query.categories = category;
      } else {
        delete query.categories;
      }
      if (search2.length) {
        query.search = search2;
      } else {
        delete query.search;
      }
      void this.$router.replace({ query });
    },
    async onLoadMore() {
      if (this.workflows.length >= this.totalWorkflows) {
        return;
      }
      try {
        this.loadingWorkflows = true;
        await this.templatesStore.getMoreWorkflows({
          categories: this.categories,
          search: this.search
        });
      } catch (e) {
        this.showMessage({
          title: "Error",
          message: "Could not load more workflows",
          type: "error"
        });
      } finally {
        this.loadingWorkflows = false;
      }
    },
    async loadCategories() {
      try {
        await this.templatesStore.getCategories();
      } catch (e) {
      }
      this.loadingCategories = false;
    },
    async loadCollections() {
      try {
        this.loadingCollections = true;
        await this.templatesStore.getCollections({
          categories: this.categories,
          search: this.search
        });
      } catch (e) {
      }
      this.loadingCollections = false;
    },
    async loadWorkflows() {
      try {
        this.loadingWorkflows = true;
        await this.templatesStore.getWorkflows({
          search: this.search,
          categories: this.categories
        });
        this.errorLoadingWorkflows = false;
      } catch (e) {
        this.errorLoadingWorkflows = true;
      }
      this.loadingWorkflows = false;
    },
    async loadWorkflowsAndCollections(initialLoad) {
      const search2 = this.search;
      const categories2 = [...this.categories];
      await Promise.all([this.loadWorkflows(), this.loadCollections()]);
      if (!initialLoad) {
        this.updateSearchTracking(search2, categories2);
      }
    },
    scrollTo(position, behavior = "smooth") {
      setTimeout(() => {
        const contentArea = document.getElementById("content");
        if (contentArea) {
          contentArea.scrollTo({
            top: position,
            behavior
          });
        }
      }, 0);
    }
  },
  watch: {
    workflows(newWorkflows) {
      if (newWorkflows.length === 0) {
        this.scrollTo(0);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    var _a;
    const contentArea = document.getElementById("content");
    if (contentArea) {
      if (((_a = this.$route.meta) == null ? void 0 : _a.setScrollPosition) && typeof this.$route.meta.setScrollPosition === "function") {
        this.$route.meta.setScrollPosition(contentArea.scrollTop);
      }
    }
    this.trackSearch();
    next();
  },
  async mounted() {
    setPageTitle("n8n - Templates");
    void this.loadCategories();
    void this.loadWorkflowsAndCollections(true);
    void this.usersStore.showPersonalizationSurvey();
    setTimeout(() => {
      if (this.$route.meta && this.$route.meta.scrollOffset > 0) {
        this.scrollTo(this.$route.meta.scrollOffset, "auto");
      }
    }, 100);
  },
  async created() {
    if (this.$route.query.search && typeof this.$route.query.search === "string") {
      this.search = this.$route.query.search;
    }
    if (typeof this.$route.query.categories === "string" && this.$route.query.categories.length) {
      this.categories = this.$route.query.categories.split(",").map((categoryId) => parseInt(categoryId, 10));
      this.areCategoriesPrepopulated = true;
    }
  }
});
const wrapper = "_wrapper_p3frq_5";
const contentWrapper = "_contentWrapper_p3frq_10";
const filters = "_filters_p3frq_20";
const search = "_search_p3frq_26";
const header = "_header_p3frq_38";
const style0 = {
  wrapper,
  contentWrapper,
  filters,
  search,
  header
};
const _hoisted_1 = ["textContent"];
const _hoisted_2 = ["innerHTML"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_TemplateFilters = resolveComponent("TemplateFilters");
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  const _component_n8n_input = resolveComponent("n8n-input");
  const _component_CollectionsCarousel = resolveComponent("CollectionsCarousel");
  const _component_TemplateList = resolveComponent("TemplateList");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_TemplatesView = resolveComponent("TemplatesView");
  return openBlock(), createBlock(_component_TemplatesView, null, {
    header: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.wrapper)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.title)
        }, [
          createVNode(_component_n8n_heading, {
            tag: "h1",
            size: "2xlarge"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("templates.heading")), 1)
            ]),
            _: 1
          })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.button)
        }, [
          createVNode(_component_n8n_button, {
            size: "large",
            label: _ctx.$locale.baseText("templates.newButton"),
            onClick: _ctx.openNewWorkflow
          }, null, 8, ["label", "onClick"])
        ], 2)
      ], 2)
    ]),
    content: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass(_ctx.$style.contentWrapper)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.filters)
        }, [
          createVNode(_component_TemplateFilters, {
            categories: _ctx.templatesStore.allCategories,
            sortOnPopulate: _ctx.areCategoriesPrepopulated,
            loading: _ctx.loadingCategories,
            selected: _ctx.categories,
            onClear: _ctx.onCategoryUnselected,
            onClearAll: _ctx.onCategoriesCleared,
            onSelect: _ctx.onCategorySelected
          }, null, 8, ["categories", "sortOnPopulate", "loading", "selected", "onClear", "onClearAll", "onSelect"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.search)
        }, [
          createVNode(_component_n8n_input, {
            modelValue: _ctx.search,
            placeholder: _ctx.$locale.baseText("templates.searchPlaceholder"),
            "onUpdate:modelValue": _ctx.onSearchInput,
            onBlur: _ctx.trackSearch,
            clearable: ""
          }, {
            prefix: withCtx(() => [
              createVNode(_component_font_awesome_icon, { icon: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder", "onUpdate:modelValue", "onBlur"]),
          withDirectives(createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.carouselContainer)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.header)
            }, [
              createVNode(_component_n8n_heading, {
                bold: true,
                size: "medium",
                color: "text-light"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$locale.baseText("templates.collections")) + " ", 1),
                  !_ctx.loadingCollections ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    textContent: toDisplayString(`(${_ctx.collections.length})`)
                  }, null, 8, _hoisted_1)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ], 2),
            createVNode(_component_CollectionsCarousel, {
              collections: _ctx.collections,
              loading: _ctx.loadingCollections,
              onOpenCollection: _ctx.onOpenCollection
            }, null, 8, ["collections", "loading", "onOpenCollection"])
          ], 2), [
            [vShow, _ctx.collections.length || _ctx.loadingCollections]
          ]),
          createVNode(_component_TemplateList, {
            "infinite-scroll-enabled": true,
            loading: _ctx.loadingWorkflows,
            "total-workflows": _ctx.totalWorkflows,
            workflows: _ctx.workflows,
            onLoadMore: _ctx.onLoadMore,
            onOpenTemplate: _ctx.onOpenTemplate
          }, null, 8, ["loading", "total-workflows", "workflows", "onLoadMore", "onOpenTemplate"]),
          _ctx.endOfSearchMessage ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.endText)
          }, [
            createVNode(_component_n8n_text, {
              size: "medium",
              color: "text-base"
            }, {
              default: withCtx(() => [
                createBaseVNode("span", { innerHTML: _ctx.endOfSearchMessage }, null, 8, _hoisted_2)
              ]),
              _: 1
            })
          ], 2)) : createCommentVNode("", true)
        ], 2)
      ], 2)
    ]),
    _: 1
  });
}
const cssModules = {
  "$style": style0
};
const TemplatesSearchView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  TemplatesSearchView as default
};
