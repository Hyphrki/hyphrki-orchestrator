import { d as defineComponent, h as resolveComponent, o as openBlock, b as createBlock, ak as createSlots, f as withCtx, k as createElementBlock, n as normalizeClass, j as createBaseVNode, s as createTextVNode, t as toDisplayString, q as createCommentVNode, i as createVNode } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { T as TemplateDetails } from "./TemplateDetails-5762f4c7.js";
import { T as TemplatesView } from "./TemplatesView-1fafd4b7.js";
import { W as WorkflowPreview } from "./WorkflowPreview-124dbe98.js";
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
  name: "TemplatesWorkflowView",
  mixins: [workflowHelpers],
  components: {
    TemplateDetails,
    TemplatesView,
    WorkflowPreview
  },
  computed: {
    ...mapStores(useTemplatesStore, usePostHog),
    template() {
      return this.templatesStore.getTemplateById(this.templateId);
    },
    templateId() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      loading: true,
      showPreview: true,
      notFoundError: false
    };
  },
  methods: {
    openWorkflow(id, e) {
      const telemetryPayload = {
        source: "workflow",
        template_id: id,
        wf_template_repo_session_id: this.templatesStore.currentSessionId
      };
      void this.$externalHooks().run("templatesWorkflowView.openWorkflow", telemetryPayload);
      this.$telemetry.track("User inserted workflow template", telemetryPayload, {
        withPostHog: true
      });
      if (e.metaKey || e.ctrlKey) {
        const route = this.$router.resolve({ name: VIEWS.TEMPLATE_IMPORT, params: { id } });
        window.open(route.href, "_blank");
        return;
      } else {
        void this.$router.push({ name: VIEWS.TEMPLATE_IMPORT, params: { id } });
      }
    },
    onHidePreview() {
      this.showPreview = false;
    },
    scrollToTop() {
      const contentArea = document.getElementById("content");
      if (contentArea) {
        contentArea.scrollTo({
          top: 0
        });
      }
    }
  },
  watch: {
    template(template) {
      if (template) {
        setPageTitle(`n8n - Template template: ${template.name}`);
      } else {
        setPageTitle("n8n - Templates");
      }
    }
  },
  async mounted() {
    this.scrollToTop();
    if (this.template && this.template.full) {
      this.loading = false;
      return;
    }
    try {
      await this.templatesStore.fetchTemplateById(this.templateId);
    } catch (e) {
      this.notFoundError = true;
    }
    this.loading = false;
  }
});
const wrapper = "_wrapper_1c2lm_5";
const notFound = "_notFound_1c2lm_10";
const title = "_title_1c2lm_14";
const button = "_button_1c2lm_18";
const image = "_image_1c2lm_22";
const content = "_content_1c2lm_33";
const markdown = "_markdown_1c2lm_44";
const details = "_details_1c2lm_55";
const style0 = {
  wrapper,
  notFound,
  title,
  button,
  image,
  content,
  markdown,
  details
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n8n_heading = resolveComponent("n8n-heading");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_n8n_loading = resolveComponent("n8n-loading");
  const _component_n8n_button = resolveComponent("n8n-button");
  const _component_WorkflowPreview = resolveComponent("WorkflowPreview");
  const _component_n8n_markdown = resolveComponent("n8n-markdown");
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
          _ctx.template && _ctx.template.name ? (openBlock(), createBlock(_component_n8n_heading, {
            key: 0,
            tag: "h1",
            size: "2xlarge"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.template.name), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.template && _ctx.template.name ? (openBlock(), createBlock(_component_n8n_text, {
            key: 1,
            color: "text-base",
            size: "small"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("generic.workflow")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(_component_n8n_loading, {
            loading: !_ctx.template || !_ctx.template.name,
            rows: 2,
            variant: "h1"
          }, null, 8, ["loading"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.button)
        }, [
          _ctx.template ? (openBlock(), createBlock(_component_n8n_button, {
            key: 0,
            label: _ctx.$locale.baseText("template.buttons.useThisWorkflowButton"),
            size: "large",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.openWorkflow(_ctx.template.id, $event))
          }, null, 8, ["label"])) : createCommentVNode("", true),
          createVNode(_component_n8n_loading, {
            loading: !_ctx.template,
            rows: 1,
            variant: "button"
          }, null, 8, ["loading"])
        ], 2)
      ], 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.notFound)
      }, [
        createVNode(_component_n8n_text, { color: "text-base" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.$locale.baseText("templates.workflowsNotFound")), 1)
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
          class: normalizeClass(_ctx.$style.image)
        }, [
          _ctx.showPreview ? (openBlock(), createBlock(_component_WorkflowPreview, {
            key: 0,
            loading: _ctx.loading,
            workflow: _ctx.template && _ctx.template.workflow,
            onClose: _ctx.onHidePreview
          }, null, 8, ["loading", "workflow", "onClose"])) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.content)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.markdown)
          }, [
            createVNode(_component_n8n_markdown, {
              content: _ctx.template && _ctx.template.description,
              images: _ctx.template && _ctx.template.image,
              loading: _ctx.loading
            }, null, 8, ["content", "images", "loading"])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.details)
          }, [
            createVNode(_component_TemplateDetails, {
              "block-title": _ctx.$locale.baseText("template.details.appsInTheWorkflow"),
              loading: _ctx.loading,
              template: _ctx.template
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
const TemplatesWorkflowView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  TemplatesWorkflowView as default
};
