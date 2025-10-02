import { r as orderBy, t as throttle } from "./lodash-es-be629387.js";
import { o as openBlock, k as createElementBlock, n as normalizeClass, j as createBaseVNode, a9 as normalizeStyle, ac as withDirectives, g as renderSlot, ad as vShow, q as createCommentVNode, s as createTextVNode, a3 as Fragment, ai as renderList, t as toDisplayString } from "./vendor-fd4bd18c.js";
import { _ as _export_sfc } from "./n8n-8ddd8349.js";
const mixin$6 = {
  methods: {
    handleMouseDown(e) {
      this.isMouseDown = true;
      if (e.type.indexOf("touch") !== -1) {
        this.dragStartX = e.touches[0].clientX;
        this.dragStartY = e.touches[0].clientY;
      }
      if (e.type.indexOf("mouse") !== -1) {
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
      }
    },
    handleMouseMove(e) {
      let positionX;
      let positionY;
      if (e.type.indexOf("touch") !== -1) {
        positionX = e.touches[0].clientX;
        positionY = e.touches[0].clientY;
      }
      if (e.type.indexOf("mouse") !== -1) {
        positionX = e.clientX;
        positionY = e.clientY;
      }
      const dragDistanceX = Math.abs(positionX - this.dragStartX);
      const dragDistanceY = Math.abs(positionY - this.dragStartY);
      if (dragDistanceX > 3 * dragDistanceY) {
        this.disableScroll();
        this.dragDistance = positionX - this.dragStartX;
      }
    },
    handleMouseUp() {
      this.isMouseDown = false;
      this.enableScroll();
    },
    handleMouseOver(element) {
      if (this.settings.autoplay) {
        if (element === "dot" && this.settings.pauseOnDotsHover || element === "track" && this.settings.pauseOnHover) {
          this.isAutoplayPaused = true;
        }
      }
    },
    handleMouseOut(element) {
      if (this.settings.autoplay) {
        if (element === "dot" && this.settings.pauseOnDotsHover || element === "track" && this.settings.pauseOnHover) {
          this.isAutoplayPaused = false;
        }
      }
    }
  }
};
const mixin$5 = {
  methods: {
    /**
     * Set window & container width
     */
    getWidth() {
      if (this.isSSR) {
        return false;
      }
      this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.widthContainer = this.$refs.list.clientWidth;
    },
    /**
     * Convert HTML Collection to JS Array
     */
    htmlCollectionToArray(collection) {
      return Array.prototype.slice.call(collection, 0);
    }
  }
};
const mixin$4 = {
  methods: {
    clearAutoPlayPause() {
      clearTimeout(this.autoplayTimeout);
      this.autoplayRemaining = null;
    },
    disableAutoPlay() {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    },
    disableScroll() {
      document.ontouchmove = (e) => e.preventDefault();
    },
    enableScroll() {
      document.ontouchmove = () => true;
    },
    restartAutoPlay() {
      this.disableAutoPlay();
      this.toggleAutoPlay();
    },
    toggleAutoPlay() {
      const enabled = !this.settings.unagile && this.settings.autoplay;
      if (!this.autoplayInterval && enabled) {
        this.autoplayInterval = setInterval(() => {
          if (!document.hidden) {
            if (!this.canGoToNext) {
              this.disableAutoPlay();
            } else {
              this.goToNext();
            }
          }
        }, this.settings.autoplaySpeed);
      } else {
        this.disableAutoPlay();
      }
    },
    toggleFade() {
      const enabled = !this.settings.unagile && this.settings.fade;
      for (let i = 0; i < this.countSlides; i++) {
        this.slides[i].style.transition = enabled ? "opacity " + this.settings.timing + " " + this.settings.speed + "ms" : "none";
        this.slides[i].style.transform = enabled ? `translate(-${i * this.widthSlide}px)` : "none";
      }
    }
  }
};
const mixin$3 = {
  methods: {
    /**
     * Prepare slides classes and styles
     */
    prepareSlides() {
      this.slides = this.htmlCollectionToArray(this.$refs.slides.children);
      if (this.slidesCloned) {
        this.slidesClonedBefore = this.htmlCollectionToArray(this.$refs.slidesClonedBefore.children);
        this.slidesClonedAfter = this.htmlCollectionToArray(this.$refs.slidesClonedAfter.children);
      }
      for (const slide of this.slidesAll) {
        slide.classList.add("agile__slide");
      }
    },
    /**
     *  Prepare slides active/current classes
     */
    prepareSlidesClasses() {
      if (this.currentSlide === null) {
        return false;
      }
      for (let i = 0; i < this.countSlides; i++) {
        this.slides[i].classList.remove("agile__slide--active");
        this.slides[i].classList.remove("agile__slide--current");
      }
      setTimeout(() => this.slides[this.currentSlide].classList.add("agile__slide--active"), this.changeDelay);
      let start = this.slidesCloned ? this.countSlides + this.currentSlide : this.currentSlide;
      if (this.centerMode) {
        start -= Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0);
      }
      for (let i = Math.max(start, 0); i < Math.min(start + this.settings.slidesToShow, this.countSlides); i++) {
        this.slidesAll[i].classList.add("agile__slide--current");
      }
    },
    /**
     * Prepare carousel styles
     */
    prepareCarousel() {
      if (this.settings.unagile) {
        this.translateX = 0;
      } else {
        if (this.currentSlide === null && this.countSlides) {
          this.currentSlide = this.settings.initialSlide;
        }
        if (this.currentSlide > this.countSlides) {
          this.currentSlide = this.countSlides - 1;
        }
        this.goTo(this.currentSlide, false, false);
      }
    }
  }
};
const mixin$2 = {
  props: {
    /**
     * Set the carousel to be the navigation of other carousels
     */
    asNavFor: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /**
     * Enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: false
    },
    /**
     * Autoplay interval in milliseconds
     */
    autoplaySpeed: {
      type: Number,
      default: 3e3
    },
    /**
     * Enable centered view when slidesToShow > 1
     */
    centerMode: {
      type: Boolean,
      default: false
    },
    /**
     * Slides padding in center mode
     */
    centerPadding: {
      type: String,
      default: "15%"
    },
    /**
     * Slide change delay in milliseconds
     */
    changeDelay: {
      type: Number,
      default: 0
    },
    /**
     * Enable dot indicators/pagination
     */
    dots: {
      type: Boolean,
      default: true
    },
    /**
     * Enable fade effect
     */
    fade: {
      type: Boolean,
      default: false
    },
    /**
     * Infinite loop sliding
     */
    infinite: {
      type: Boolean,
      default: true
    },
    /**
     * Index of slide to start on
     */
    initialSlide: {
      type: Number,
      default: 0
    },
    /**
     * Enable mobile first calculation for responsive settings
     */
    mobileFirst: {
      type: Boolean,
      default: true
    },
    /**
     * Enable prev/next navigation buttons
     */
    navButtons: {
      type: Boolean,
      default: true
    },
    /**
     * All settings as one object
     */
    options: {
      type: Object,
      default: () => null
    },
    /**
     * Pause autoplay when a dot is hovered
     */
    pauseOnDotsHover: {
      type: Boolean,
      default: false
    },
    /**
     * Pause autoplay when a slide is hovered
     */
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    /**
     * Object containing breakpoints and settings objects
     */
    responsive: {
      type: Array,
      default: () => null
    },
    /**
     * Enable right-to-left mode
     */
    rtl: {
      type: Boolean,
      default: false
    },
    /**
     * Number of slides to scroll
     */
    slidesToScroll: {
      type: Number,
      default: 1
    },
    /**
     * Number of slides to show
     */
    slidesToShow: {
      type: Number,
      default: 1
    },
    /**
     * Slide animation speed in milliseconds
     */
    speed: {
      type: Number,
      default: 300
    },
    /**
     * Swipe distance
     */
    swipeDistance: {
      type: Number,
      default: 50
    },
    /**
     * Throttle delay in milliseconds
     */
    throttleDelay: {
      type: Number,
      default: 500
    },
    /**
     * Transition timing function
     * Available: ease, linear, ease-in, ease-out, ease-in-out
     */
    timing: {
      type: String,
      default: "ease",
      validator: (value) => {
        return ["ease", "linear", "ease-in", "ease-out", "ease-in-out"].indexOf(value) !== -1;
      }
    },
    /**
     * Disable Agile carousel
     */
    unagile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Initial settings based on props and options object
    initialSettings: function() {
      let { options, ...initialSettings } = this.$props;
      if (options) {
        initialSettings = { ...initialSettings, ...options };
      }
      if (initialSettings.responsive) {
        initialSettings.responsive = orderBy(initialSettings.responsive, "breakpoint");
      }
      return initialSettings;
    },
    // Settings for current breakpoint
    settings: function() {
      const { responsive, ...settings } = this.initialSettings;
      if (responsive) {
        responsive.forEach((option) => {
          if (settings.mobileFirst ? option.breakpoint < this.widthWindow : option.breakpoint > this.widthWindow) {
            for (const key in option.settings) {
              settings[key] = option.settings[key];
            }
          }
        });
      }
      return settings;
    }
  }
};
const mixin$1 = {
  created() {
    this.goTo = throttle(this.goTo, this.throttleDelay);
    this.getWidth = throttle(this.getWidth, 500);
  }
};
const mixin = {
  watch: {
    // Recalculate settings
    currentBreakpoint() {
      this.$emit("breakpoint", { breakpoint: this.currentBreakpoint });
    },
    // Watch current slide change
    currentSlide() {
      this.prepareSlidesClasses();
      this.autoplayStartTimestamp = this.settings.autoplay ? +/* @__PURE__ */ new Date() : null;
      this.$emit("after-change", { currentSlide: this.currentSlide });
    },
    // Watch drag distance change
    dragDistance() {
      if (this.isMouseDown) {
        const { rtl } = this.settings;
        const dragDistance = this.dragDistance * (rtl ? -1 : 1);
        if (dragDistance > this.swipeDistance && this.canGoToPrev) {
          this.goToPrev();
          this.handleMouseUp();
        }
        if (dragDistance < -1 * this.swipeDistance && this.canGoToNext) {
          this.goToNext();
          this.handleMouseUp();
        }
      }
    },
    isAutoplayPaused(nevValue) {
      if (nevValue) {
        this.remaining = this.settings.autoplaySpeed - (+/* @__PURE__ */ new Date() - this.autoplayStartTimestamp);
        this.disableAutoPlay();
        this.clearAutoPlayPause();
      } else {
        this.autoplayTimeout = setTimeout(() => {
          this.clearAutoPlayPause();
          this.goToNext();
          this.toggleAutoPlay();
        }, this.remaining);
      }
    },
    "settings.autoplay"() {
      this.toggleAutoPlay();
    },
    "settings.fade"() {
      this.toggleFade();
    },
    "settings.unagile"() {
    },
    widthSlide() {
      for (let i = 0; i < this.countSlidesAll; i++) {
        this.slidesAll[i].style.width = `${this.widthSlide}${this.widthSlide !== "auto" ? "px" : ""}`;
      }
    },
    // Watch window width change
    widthWindow(newValue, oldValue) {
      if (oldValue) {
        this.prepareCarousel();
        this.toggleFade();
      }
    }
  }
};
const Agile_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "agile",
  mixins: [mixin$6, mixin$5, mixin$4, mixin$3, mixin$2, mixin$1, mixin],
  emits: ["before-change", "after-change", "breakpoint"],
  data() {
    return {
      autoplayInterval: null,
      autoplayRemaining: null,
      autoplayStartTimestamp: null,
      autoplayTimeout: null,
      currentSlide: null,
      dragDistance: 0,
      dragStartX: 0,
      dragStartY: 0,
      isAutoplayPaused: false,
      isMouseDown: false,
      slides: [],
      slidesClonedAfter: [],
      slidesClonedBefore: [],
      isSSR: typeof window === "undefined",
      transitionDelay: 0,
      translateX: 0,
      widthWindow: 0,
      widthContainer: 0
    };
  },
  computed: {
    breakpoints: function() {
      return !this.initialSettings.responsive ? [] : this.initialSettings.responsive.map((item) => item.breakpoint);
    },
    canGoToPrev: function() {
      return this.settings.infinite || this.currentSlide > 0;
    },
    canGoToNext: function() {
      return this.settings.infinite || this.currentSlide < this.countSlides - 1;
    },
    countSlides: function() {
      return this.isSSR ? this.htmlCollectionToArray(this.$slots.default).length : this.slides.length;
    },
    countSlidesAll: function() {
      return this.slidesAll.length;
    },
    currentBreakpoint: function() {
      const breakpoints = this.breakpoints.map((item) => item).reverse();
      return this.initialSettings.mobileFirst ? breakpoints.find((item) => item < this.widthWindow) || 0 : breakpoints.find((item) => item > this.widthWindow) || null;
    },
    marginX: function() {
      if (this.settings.unagile) {
        return 0;
      }
      let marginX = this.slidesCloned ? this.countSlides * this.widthSlide : 0;
      if (this.settings.centerMode) {
        marginX -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0)) * this.widthSlide;
      }
      return this.settings.rtl ? marginX : -1 * marginX;
    },
    slidesCloned: function() {
      return !this.settings.unagile && !this.settings.fade && this.settings.infinite;
    },
    slidesAll: function() {
      return this.slidesCloned ? [...this.slidesClonedBefore, ...this.slides, ...this.slidesClonedAfter] : this.slides;
    },
    widthSlide: function() {
      return !this.settings.unagile ? this.widthContainer / this.settings.slidesToShow : "auto";
    }
  },
  mounted() {
    window.addEventListener("resize", this.getWidth);
    this.$refs.track.addEventListener("touchstart", this.handleMouseDown);
    this.$refs.track.addEventListener("touchend", this.handleMouseUp);
    this.$refs.track.addEventListener("touchmove", this.handleMouseMove);
    this.$refs.track.addEventListener("mousedown", this.handleMouseDown);
    this.$refs.track.addEventListener("mouseup", this.handleMouseUp);
    this.$refs.track.addEventListener("mousemove", this.handleMouseMove);
    this.isSSR = false;
    this.reload();
  },
  // Vue 3
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    destroy() {
      window.removeEventListener("resize", this.getWidth);
      this.$refs.track.removeEventListener("touchstart", this.handleMouseDown);
      this.$refs.track.removeEventListener("touchend", this.handleMouseUp);
      this.$refs.track.removeEventListener("touchmove", this.handleMouseMove);
      this.$refs.track.removeEventListener("mousedown", this.handleMouseDown);
      this.$refs.track.removeEventListener("mouseup", this.handleMouseUp);
      this.$refs.track.removeEventListener("mousemove", this.handleMouseMove);
      this.disableAutoPlay();
    },
    // Return current breakpoint
    getCurrentBreakpoint() {
      return this.currentBreakpoint;
    },
    // Return settings for current breakpoint
    getCurrentSettings() {
      return this.settings;
    },
    // Return current slide index
    getCurrentSlide() {
      return this.currentSlide;
    },
    // Return initial settings
    getInitialSettings() {
      return this.initialSettings;
    },
    // Go to slide
    goTo(n, transition = true, asNav = false) {
      if (this.settings.unagile) {
        return false;
      }
      if (!asNav) {
        this.settings.asNavFor.forEach((carousel) => {
          if (carousel) {
            carousel.goTo(n, transition, true);
          }
        });
      }
      let slideNextReal = n;
      if (transition) {
        if (this.settings.infinite && n < 0) {
          slideNextReal = this.countSlides - 1;
        } else if (n >= this.countSlides) {
          slideNextReal = 0;
        }
        this.$emit("before-change", { currentSlide: this.currentSlide, nextSlide: slideNextReal });
        this.currentSlide = slideNextReal;
        if (n !== slideNextReal) {
          setTimeout(() => {
            this.goTo(slideNextReal, false);
          }, this.settings.speed);
        }
      }
      const translateX = !this.settings.fade ? n * this.widthSlide * this.settings.slidesToScroll : 0;
      this.transitionDelay = transition ? this.speed : 0;
      if (this.infinite || this.currentSlide + this.slidesToShow <= this.countSlides) {
        this.translateX = this.settings.rtl ? translateX : -1 * translateX;
      }
    },
    // Go to next slide
    goToNext() {
      if (this.canGoToNext) {
        this.goTo(this.currentSlide + 1);
      }
    },
    // Go to previous slide
    goToPrev() {
      if (this.canGoToPrev) {
        this.goTo(this.currentSlide - 1);
      }
    },
    // Reload carousel
    reload() {
      this.getWidth();
      this.prepareSlides();
      this.prepareCarousel();
      this.toggleFade();
      this.toggleAutoPlay();
    }
  }
};
const _hoisted_1 = {
  ref: "list",
  class: "agile__list"
};
const _hoisted_2 = {
  ref: "slidesClonedBefore",
  class: "agile__slides agile__slides--cloned"
};
const _hoisted_3 = {
  ref: "slides",
  class: "agile__slides agile__slides--regular"
};
const _hoisted_4 = {
  ref: "slidesClonedAfter",
  class: "agile__slides agile__slides--cloned"
};
const _hoisted_5 = {
  key: 0,
  class: "agile__caption"
};
const _hoisted_6 = {
  key: 1,
  class: "agile__actions"
};
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 1,
  ref: "dots",
  class: "agile__dots"
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([{ "agile--ssr": $data.isSSR, "agile--auto-play": _ctx.settings.autoplay, "agile--disabled": _ctx.settings.unagile, "agile--fade": _ctx.settings.fade && !_ctx.settings.unagile, "agile--rtl": _ctx.settings.rtl, "agile--no-nav-buttons": !_ctx.settings.navButtons }, "agile"]),
    onTouchstart: () => {
    }
  }, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", {
        ref: "track",
        style: normalizeStyle({ transform: `translate(${$data.translateX + $options.marginX}px)`, transition: `transform ${_ctx.settings.timing} ${$data.transitionDelay}ms` }),
        class: "agile__track",
        onMouseout: _cache[0] || (_cache[0] = ($event) => _ctx.handleMouseOut("track")),
        onMouseover: _cache[1] || (_cache[1] = ($event) => _ctx.handleMouseOver("track"))
      }, [
        withDirectives(createBaseVNode("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "default")
        ], 512), [
          [vShow, $options.slidesCloned]
        ]),
        createBaseVNode("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "default")
        ], 512),
        withDirectives(createBaseVNode("div", _hoisted_4, [
          renderSlot(_ctx.$slots, "default")
        ], 512), [
          [vShow, $options.slidesCloned]
        ])
      ], 36)
    ], 512),
    _ctx.$slots.caption ? (openBlock(), createElementBlock("div", _hoisted_5, [
      renderSlot(_ctx.$slots, "caption")
    ])) : createCommentVNode("", true),
    !_ctx.settings.unagile && (_ctx.settings.navButtons || _ctx.settings.dots) ? (openBlock(), createElementBlock("div", _hoisted_6, [
      _ctx.settings.navButtons && !_ctx.settings.unagile ? (openBlock(), createElementBlock("button", {
        key: 0,
        ref: "prevButton",
        disabled: !$options.canGoToPrev,
        "aria-label": "Previous",
        class: "agile__nav-button agile__nav-button--prev",
        type: "button",
        onClick: _cache[2] || (_cache[2] = ($event) => ($options.goToPrev(), _ctx.restartAutoPlay()))
      }, [
        renderSlot(_ctx.$slots, "prevButton", {}, () => [
          createTextVNode(" ← ")
        ])
      ], 8, _hoisted_7)) : createCommentVNode("", true),
      _ctx.settings.dots && !_ctx.settings.unagile ? (openBlock(), createElementBlock("ul", _hoisted_8, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.countSlides, (n) => {
          return openBlock(), createElementBlock("li", {
            key: n,
            class: normalizeClass([{ "agile__dot--current": n - 1 === $data.currentSlide }, "agile__dot"]),
            onMouseout: _cache[3] || (_cache[3] = ($event) => _ctx.handleMouseOut("dot")),
            onMouseover: _cache[4] || (_cache[4] = ($event) => _ctx.handleMouseOver("dot"))
          }, [
            createBaseVNode("button", {
              type: "button",
              onClick: ($event) => ($options.goTo(n - 1), _ctx.restartAutoPlay())
            }, toDisplayString(n), 9, _hoisted_9)
          ], 34);
        }), 128))
      ], 512)) : createCommentVNode("", true),
      _ctx.settings.navButtons && !_ctx.settings.unagile ? (openBlock(), createElementBlock("button", {
        key: 2,
        ref: "nextButton",
        disabled: !$options.canGoToNext,
        "aria-label": "Next",
        class: "agile__nav-button agile__nav-button--next",
        type: "button",
        onClick: _cache[5] || (_cache[5] = ($event) => ($options.goToNext(), _ctx.restartAutoPlay()))
      }, [
        renderSlot(_ctx.$slots, "nextButton", {}, () => [
          createTextVNode(" → ")
        ])
      ], 8, _hoisted_10)) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ], 34);
}
const VueAgile = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const install = (Vue) => {
  Vue.component("agile", VueAgile);
};
const index = {
  install
};
export {
  VueAgile as V
};
