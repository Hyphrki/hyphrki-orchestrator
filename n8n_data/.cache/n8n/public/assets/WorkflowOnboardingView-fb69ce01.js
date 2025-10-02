import { d as defineComponent, aD as useRouter, aL as useRoute, N as onMounted, o as openBlock, k as createElementBlock } from "./vendor-fd4bd18c.js";
import { ds as useLoadingService, a0 as useTemplatesStore, H as useWorkflowsStore, B as VIEWS, am as useI18n } from "./n8n-8ddd8349.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowOnboardingView",
  setup(__props) {
    const loadingService = useLoadingService();
    const templateStore = useTemplatesStore();
    const workfowStore = useWorkflowsStore();
    const router = useRouter();
    const route = useRoute();
    const i18n = useI18n();
    const openWorkflowTemplate = async (templateId) => {
      try {
        loadingService.startLoading();
        const template = await templateStore.getFixedWorkflowTemplate(templateId);
        if (!template) {
          throw new Error();
        }
        const name = i18n.baseText("onboarding.title", {
          interpolate: { name: template.name }
        });
        const workflow = await workfowStore.createNewWorkflow({
          name,
          connections: template.workflow.connections,
          nodes: template.workflow.nodes,
          pinData: template.workflow.pinData,
          settings: template.workflow.settings,
          meta: {
            onboardingId: templateId
          }
        });
        await router.replace({
          name: VIEWS.WORKFLOW,
          params: { name: workflow.id },
          query: { onboardingId: templateId }
        });
        loadingService.stopLoading();
      } catch (e) {
        await router.replace({ name: VIEWS.NEW_WORKFLOW });
        loadingService.stopLoading();
        throw new Error(`Could not load onboarding template ${templateId}`);
      }
    };
    onMounted(async () => {
      const templateId = route.params.id;
      if (!templateId || typeof templateId !== "string") {
        await router.replace({ name: VIEWS.NEW_WORKFLOW });
        return;
      }
      await openWorkflowTemplate(templateId);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div");
    };
  }
});
export {
  _sfc_main as default
};
