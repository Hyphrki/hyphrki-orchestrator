import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, ak as createSlots, f as withCtx, k as createElementBlock, n as normalizeClass, j as createBaseVNode, s as createTextVNode, t as toDisplayString, q as createCommentVNode, i as createVNode } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { T as TemplateDetails } from "./TemplateDetails-5762f4c7.js";
import { T as TemplateList } from "./TemplateList-dd069b58.js";
import { T as TemplatesView } from "./TemplatesView-1fafd4b7.js";
import { w as workflowHelpers } from "./index-00f166b0.js";
import { ap as usePostHog, a0 as useTemplatesStore, B as VIEWS, g8 as setPageTitle, _ as _export_sfc } from "./n8n-8ddd8349.js";
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
const _sfc_main = defineComponent({
  name: "TemplatesCollectionView",
  mixins: [workflowHelpers],
  components: {
    TemplateDetails,
    TemplateList,
    TemplatesView
  },
  computed: {
    ...mapStores(useTemplatesStore, usePostHog),
    collection() {
      return this.templatesStore.getCollectionById(this.collectionId);
    },
    collectionId() {
      return this.$route.params.id;
    },
    collectionWorkflows() {
      if (!this.collection) {
        return null;
      }
      return this.collection.workflows.map(({ id }) => {
        return this.templatesStore.getTemplateById(id.toString());
      });
    }
  },
  data() {
    return {
      loading: true,
      notFoundError: false
    };
  },
  methods: {
    scrollToTop() {
      setTimeout(() => {
        const contentArea = document.getElementById("content");
        if (contentArea) {
          contentArea.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }, 50);
    },
    onOpenTemplate({ event, id }) {
      this.navigateTo(event, VIEWS.TEMPLATE, id);
    },
    onUseWorkflow({ event, id }) {
      const telemetryPayload = {
        template_id: id,
        wf_template_repo_session_id: this.workflowsStore.currentSessionId,
        source: "collection"
      };
      void this.$externalHooks().run("templatesCollectionView.onUseWorkflow", telemetryPayload);
      this.$telemetry.track("User inserted workflow template", telemetryPayload, {
        withPostHog: true
      });
      this.navigateTo(event, VIEWS.TEMPLATE_IMPORT, id);
    },
    navigateTo(e, page, id) {
      if (e.metaKey || e.ctrlKey) {
        const route = this.$router.resolve({ name: page, params: { id } });
        window.open(route.href, "_blank");
        return;
      } else {
        void this.$router.push({ name: page, params: { id } });
      }
    }
  },
  watch: {
    collection(collection) {
      if (collection) {
        setPageTitle(`n8n - Template collection: ${collection.name}`);
      } else {
        setPageTitle("n8n - Templates");
      }
    }
  },
  async mounted() {
    this.scrollToTop();
    if (this.collection && this.collection.full) {
      this.loading = false;
      return;
    }
    try {
      await this.templatesStore.fetchCollectionById(this.collectionId);
    } catch (e) {
      this.notFoundError = true;
    }
    this.loading = false;
  }
});
const wrapper = "_wrapper_19isr_5";
const notFound = "_notFound_19isr_15";
const title = "_title_19isr_19";
const button = "_button_19isr_23";
const mainContent = "_mainContent_19isr_27";
const markdown = "_markdown_19isr_38";
const details = "_details_19isr_42";
const style0 = {
  wrapper,
  notFound,
  title,
  button,
  mainContent,
  markdown,
  details
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_markdown = resolveComponent("n8n-markdown");
  const _component_TemplateList = resolveComponent("TemplateList");
  const _component_TemplateDetails = resolveComponent("TemplateDetails");
  const _component_TemplatesView = resolveComponent("TemplatesView");
  return openBlock(), createBlock(_component_TemplatesView, { goBackEnabled: true }, createSlots({
    header: withCtx(() => [
      !_ctx.notFoundError ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.wrapper)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.title)
        }, [
          _ctx.collection && _ctx.collection.name ? (openBlock(), createBlock(_component_n8n_heading, {
            key: 0,
            tag: "h1",
            size: "2xlarge"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.collection.name), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.collection && _ctx.collection.name ? (openBlock(), createBlock(_component_n8n_text, {
            key: 1,
            color: "text-base",
            size: "small"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("templates.collection")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_n8n_loading, {
            loading: !_ctx.collection || !_ctx.collection.name,
            rows: 2,
            variant: "h1"
          }, null, 8, ["loading"])
        ], 2)
      ], 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.notFound)
      }, [
        createVNode(_component_n8n_text, { color: "text-base" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("templates.collectionsNotFound")), 1)
          ]),
          _: 1
        })
      ], 2))
    ]),
    _: 2
  }, [
    !_ctx.notFoundError ? {
      name: "content",
      fn: withCtx(() => [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.wrapper)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.mainContent)
          }, [
            _ctx.loading || _ctx.collection && _ctx.collection.description ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.markdown)
            }, [
              createVNode(_component_n8n_markdown, {
                content: _ctx.collection && _ctx.collection.description,
                images: _ctx.collection && _ctx.collection.image,
                loading: _ctx.loading
              }, null, 8, ["content", "images", "loading"])
            ], 2)) : createCommentVNode("", true),
            createVNode(_component_TemplateList, {
              "infinite-scroll-enabled": false,
              loading: _ctx.loading,
              "use-workflow-button": true,
              workflows: _ctx.loading ? [] : _ctx.collectionWorkflows,
              onUseWorkflow: _ctx.onUseWorkflow,
              onOpenTemplate: _ctx.onOpenTemplate
            }, null, 8, ["loading", "workflows", "onUseWorkflow", "onOpenTemplate"])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.details)
          }, [
            createVNode(_component_TemplateDetails, {
              "block-title": _ctx.$locale.baseText("template.details.appsInTheCollection"),
              loading: _ctx.loading,
              template: _ctx.collection
            }, null, 8, ["block-title", "loading", "template"])
          ], 2)
        ], 2)
      ]),
      key: "0"
    } : void 0
  ]), 1024);
}
const cssModules = {
  "$style": style0
};
const TemplatesCollectionView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  TemplatesCollectionView as default
};
