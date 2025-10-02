import { aB as pushScopeId, aC as popScopeId, j as createBaseVNode, o as openBlock, k as createElementBlock, r as ref, H as toRefs, w as watch, L as nextTick, N as onMounted, O as onUnmounted, g as renderSlot, i as createVNode, q as createCommentVNode, t as toDisplayString } from "./vendor-fd4bd18c.js";
const E = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, s] of o)
    t[n] = s;
  return t;
}, C = {}, j = (e) => (pushScopeId("data-v-259be2b2"), e = e(), popScopeId(), e), M = { class: "container" }, T = /* @__PURE__ */ j(() => /* @__PURE__ */ createBaseVNode("div", { class: "spinner" }, null, -1)), V = [
  T
];
function W(e, o) {
  return openBlock(), createElementBlock("div", M, V);
}
const D = /* @__PURE__ */ E(C, [["render", W], ["__scopeId", "data-v-259be2b2"], ["__file", "/home/oumoussa/side-projects/infinite/src/components/Spinner.vue"]]), U = (e) => ({
  loading() {
    e.value = "loading";
  },
  loaded() {
    e.value = "loaded";
  },
  complete() {
    e.value = "complete";
  },
  error() {
    e.value = "error";
  }
}), z = (e, o, t) => () => {
  const n = t.parentEl || document.documentElement;
  t.prevHeight = n.scrollHeight, o.loading(), e("infinite", o);
}, A = (e, o) => {
  const t = e.getBoundingClientRect();
  if (!o)
    return t.top >= 0 && t.bottom <= window.innerHeight;
  const n = o.getBoundingClientRect();
  return t.top >= n.top && t.bottom <= n.bottom;
}, y = (e) => {
  e.parentEl = document.querySelector(e.target) || null;
  let o = `0px 0px ${e.distance}px 0px`;
  e.top && (o = `${e.distance}px 0px 0px 0px`);
  const t = new IntersectionObserver(
    (n) => {
      n[0].isIntersecting && (e.firstload && e.emit(), e.firstload = true);
    },
    { root: e.parentEl, rootMargin: o }
  );
  return t.observe(e.infiniteLoading.value), t;
};
const F = { class: "state-error" }, G = {
  __name: "InfiniteLoading",
  props: {
    top: { type: Boolean, required: false },
    target: { type: [String, Boolean], required: false },
    distance: { type: Number, required: false, default: 0 },
    identifier: { required: false },
    firstload: { type: Boolean, required: false, default: true },
    slots: { type: Object, required: false }
  },
  emits: ["infinite"],
  setup(e, { emit: o }) {
    const t = e;
    let n = null;
    const s = ref(null), l = ref("ready"), { top: f, firstload: x, target: I, distance: S } = t, { identifier: _ } = toRefs(t), i = {
      infiniteLoading: s,
      target: I,
      top: f,
      firstload: x,
      distance: S,
      prevHeight: 0,
      parentEl: null
    };
    i.emit = z(o, U(l), i);
    const k = () => watch(l, async (r) => {
      const c = i.parentEl || document.documentElement;
      await nextTick(), r == "loaded" && f && (c.scrollTop = c.scrollHeight - i.prevHeight), r == "loaded" && A(s.value, i.parentEl) && i.emit(), r == "complete" && n.disconnect();
    }), q = () => watch(_, () => {
      l.value = "ready", n.disconnect(), n = y(i);
    });
    return onMounted(() => {
      n = y(i), k(), _ && q();
    }), onUnmounted(() => {
      n.disconnect();
    }), (r, c) => (openBlock(), createElementBlock("div", {
      ref_key: "infiniteLoading",
      ref: s
    }, [
      l.value == "loading" ? renderSlot(r.$slots, "spinner", { key: 0 }, () => [
        createVNode(D)
      ], true) : createCommentVNode("v-if", true),
      l.value == "complete" ? renderSlot(r.$slots, "complete", { key: 1 }, () => {
        var d;
        return [
          createBaseVNode("span", null, toDisplayString(((d = e.slots) == null ? void 0 : d.complete) || "No more results!"), 1)
        ];
      }, true) : createCommentVNode("v-if", true),
      l.value == "error" ? renderSlot(r.$slots, "error", {
        key: 2,
        retry: i.emit
      }, () => {
        var d;
        return [
          createBaseVNode("span", F, [
            createBaseVNode("span", null, toDisplayString(((d = e.slots) == null ? void 0 : d.error) || "Oops something went wrong!"), 1),
            createBaseVNode("button", {
              class: "retry",
              onClick: c[0] || (c[0] = (...B) => i.emit && i.emit(...B))
            }, " retry ")
          ])
        ];
      }, true) : createCommentVNode("v-if", true)
    ], 512));
  }
}, K = /* @__PURE__ */ E(G, [["__scopeId", "data-v-9d82030b"], ["__file", "/home/oumoussa/side-projects/infinite/src/components/InfiniteLoading.vue"]]);
export {
  K
};
