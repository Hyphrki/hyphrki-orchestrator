import { d as defineComponent, o as openBlock, k as createElementBlock, n as normalizeClass, h as resolveComponent, p as unref, j as createBaseVNode, t as toDisplayString, i as createVNode, q as createCommentVNode, f as withCtx, s as createTextVNode, m as mergeProps, b as createBlock } from "./vendor-fd4bd18c.js";
import { m as mapStores } from "./pinia-282957dc.js";
import { n as useUIStore, x as useRootStore, _ as _export_sfc, dJ as useSSOStore, u as useToast, am as useI18n } from "./n8n-8ddd8349.js";
const _sfc_main$2 = defineComponent({
  computed: {
    ...mapStores(useRootStore, useUIStore),
    basePath() {
      return this.rootStore.baseUrl;
    },
    logoPath() {
      return this.basePath + this.uiStore.logo;
    }
  }
});
const img = "_img_rbqr8_5";
const style0$2 = {
  img
};
const _hoisted_1 = ["src"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", {
    src: _ctx.logoPath,
    class: normalizeClass(_ctx.$style.img),
    alt: "n8n.io"
  }, null, 10, _hoisted_1);
}
const cssModules$2 = {
  "$style": style0$2
};
const Logo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__cssModules", cssModules$2]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SSOLogin",
  setup(__props) {
    const i18n = useI18n();
    const ssoStore = useSSOStore();
    const toast = useToast();
    const onSSOLogin = async () => {
      try {
        window.location.href = await ssoStore.getSSORedirectUrl();
      } catch (error) {
        toast.showError(error, "Error", error.message);
      }
    };
    return (_ctx, _cache) => {
      const _component_n8n_button = resolveComponent("n8n-button");
      return unref(ssoStore).showSsoLoginButton ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.ssoLogin)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.divider)
        }, [
          createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("sso.login.divider")), 1)
        ], 2),
        createVNode(_component_n8n_button, {
          onClick: onSSOLogin,
          size: "large",
          type: "primary",
          outline: "",
          label: unref(i18n).baseText("sso.login.button")
        }, null, 8, ["label"])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const ssoLogin = "_ssoLogin_2d9uv_5";
const divider = "_divider_2d9uv_9";
const style0$1 = {
  ssoLogin,
  divider
};
const cssModules$1 = {
  "$style": style0$1
};
const SSOLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = defineComponent({
  name: "AuthView",
  components: {
    Logo,
    SSOLogin
  },
  props: {
    form: {},
    formLoading: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String
    },
    withSso: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onUpdate(e) {
      this.$emit("update", e);
    },
    onSubmit(values) {
      this.$emit("submit", values);
    },
    onSecondaryClick() {
      this.$emit("secondaryClick");
    }
  }
});
const container = "_container_13abf_9";
const logoContainer = "_logoContainer_13abf_20";
const textContainer = "_textContainer_13abf_25";
const formContainer = "_formContainer_13abf_29";
const style0 = {
  container,
  logoContainer,
  textContainer,
  formContainer
};
const AuthView_vue_vue_type_style_index_1_lang = "";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Logo = resolveComponent("Logo");
  const _component_n8n_text = resolveComponent("n8n-text");
  const _component_SSOLogin = resolveComponent("SSOLogin");
  const _component_n8n_form_box = resolveComponent("n8n-form-box");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.container)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.logoContainer)
    }, [
      createVNode(_component_Logo)
    ], 2),
    _ctx.subtitle ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(_ctx.$style.textContainer)
    }, [
      createVNode(_component_n8n_text, { size: "large" }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.subtitle), 1)
        ]),
        _: 1
      })
    ], 2)) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.formContainer)
    }, [
      createVNode(_component_n8n_form_box, mergeProps(_ctx.form, {
        "data-test-id": "auth-form",
        buttonLoading: _ctx.formLoading,
        onSecondaryClick: _ctx.onSecondaryClick,
        onSubmit: _ctx.onSubmit,
        onUpdate: _ctx.onUpdate
      }), {
        default: withCtx(() => [
          _ctx.withSso ? (openBlock(), createBlock(_component_SSOLogin, { key: 0 })) : createCommentVNode("", true)
        ]),
        _: 1
      }, 16, ["buttonLoading", "onSecondaryClick", "onSubmit", "onUpdate"])
    ], 2)
  ], 2);
}
const cssModules = {
  "$style": style0
};
const AuthView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__cssModules", cssModules]]);
export {
  AuthView as A,
  Logo as L
};
