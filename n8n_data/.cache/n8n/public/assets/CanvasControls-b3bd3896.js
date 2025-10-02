import { d as defineComponent, K as onBeforeMount, M as onBeforeUnmount, h as resolveComponent, o as openBlock, k as createElementBlock, i as createVNode, p as unref, b as createBlock, q as createCommentVNode, n as normalizeClass } from "./vendor-fd4bd18c.js";
import { s as storeToRefs } from "./pinia-282957dc.js";
import { ex as useCanvasStore, _ as _export_sfc } from "./n8n-8ddd8349.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CanvasControls",
  setup(__props) {
    const canvasStore = useCanvasStore();
    const { zoomToFit, zoomIn, zoomOut, resetZoom } = canvasStore;
    const { nodeViewScale, isDemo } = storeToRefs(canvasStore);
    const keyDown = (e) => {
      const isCtrlKeyPressed = e.metaKey || e.ctrlKey;
      if ((e.key === "=" || e.key === "+") && !isCtrlKeyPressed) {
        zoomIn();
      } else if ((e.key === "_" || e.key === "-") && !isCtrlKeyPressed) {
        zoomOut();
      } else if (e.key === "0" && !isCtrlKeyPressed) {
        resetZoom();
      } else if (e.key === "1" && !isCtrlKeyPressed) {
        zoomToFit();
      }
    };
    onBeforeMount(() => {
      document.addEventListener("keydown", keyDown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", keyDown);
    });
    return (_ctx, _cache) => {
      const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          [_ctx.$style.zoomMenu]: true,
          [_ctx.$style.regularZoomMenu]: !unref(isDemo),
          [_ctx.$style.demoZoomMenu]: unref(isDemo)
        })
      }, [
        createVNode(_component_n8n_icon_button, {
          onClick: unref(zoomToFit),
          type: "tertiary",
          size: "large",
          title: _ctx.$locale.baseText("nodeView.zoomToFit"),
          icon: "expand",
          "data-test-id": "zoom-to-fit"
        }, null, 8, ["onClick", "title"]),
        createVNode(_component_n8n_icon_button, {
          onClick: unref(zoomIn),
          type: "tertiary",
          size: "large",
          title: _ctx.$locale.baseText("nodeView.zoomIn"),
          icon: "search-plus",
          "data-test-id": "zoom-in-button"
        }, null, 8, ["onClick", "title"]),
        createVNode(_component_n8n_icon_button, {
          onClick: unref(zoomOut),
          type: "tertiary",
          size: "large",
          title: _ctx.$locale.baseText("nodeView.zoomOut"),
          icon: "search-minus",
          "data-test-id": "zoom-out-button"
        }, null, 8, ["onClick", "title"]),
        unref(nodeViewScale) !== 1 && !unref(isDemo) ? (openBlock(), createBlock(_component_n8n_icon_button, {
          key: 0,
          onClick: unref(resetZoom),
          type: "tertiary",
          size: "large",
          title: _ctx.$locale.baseText("nodeView.resetZoom"),
          icon: "undo",
          "data-test-id": "reset-zoom-button"
        }, null, 8, ["onClick", "title"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const zoomMenu = "_zoomMenu_1ufow_5";
const regularZoomMenu = "_regularZoomMenu_1ufow_25";
const demoZoomMenu = "_demoZoomMenu_1ufow_30";
const style0 = {
  zoomMenu,
  regularZoomMenu,
  demoZoomMenu
};
const cssModules = {
  "$style": style0
};
const CanvasControls = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  CanvasControls as default
};
