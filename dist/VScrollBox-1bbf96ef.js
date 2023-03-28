import { n as h } from "./main-b4b8c2a2.js";
function c() {
  const s = window.document.documentElement, t = window.getComputedStyle(s, null).getPropertyValue("font-size");
  return parseFloat(t);
}
const a = "_VScrollBox_khrtx_7", f = "_wrapper_khrtx_11", d = "__offset_khrtx_31", u = "_placeholder_khrtx_34", g = "_scrollbar_khrtx_41", m = "__horizontal_khrtx_50", x = "_thumb_khrtx_53", b = "__vertical_khrtx_58", p = {
  VScrollBox: a,
  wrapper: f,
  _offset: d,
  placeholder: u,
  scrollbar: g,
  _horizontal: m,
  thumb: x,
  _vertical: b
}, _ = {
  name: "VScrollBox",
  props: {
    resizable: Boolean,
    skipOffset: Boolean
  },
  data() {
    return {
      axis: {
        x: {
          clientAttr: "clientX",
          offsetAttr: "left",
          offsetSizeAttr: "offsetWidth",
          scrollSizeAttr: "scrollWidth",
          scrollOffsetAttr: "scrollLeft",
          scrollbarSize: 0,
          scrollLeft: 0,
          click: 0
        },
        y: {
          clientAttr: "clientY",
          offsetAttr: "top",
          offsetSizeAttr: "offsetHeight",
          scrollSizeAttr: "scrollHeight",
          scrollOffsetAttr: "scrollTop",
          scrollbarSize: 0,
          scrollTop: 0,
          click: 0
        }
      },
      dimensions: {
        boxHeight: 0,
        boxWidth: 0,
        contentHeight: 0,
        contentWidth: 0,
        yRailHeight: 0,
        yThumbHeight: 0,
        xRailWidth: 0,
        xThumbWidth: 0
      },
      scrollXTicking: !1,
      scrollYTicking: !1,
      isYOverflowing: !1,
      isXOverflowing: !1,
      draggingAxis: null,
      resizeObserverContent: null
    };
  },
  computed: {
    yScrollPosition() {
      if (!this.isYOverflowing)
        return 0;
      const s = this.axis.y.scrollTop / (this.dimensions.contentHeight - this.dimensions.boxHeight);
      return `translate3d(0, ${~~((this.dimensions.yRailHeight - this.dimensions.yThumbHeight) * s)}px, 0)`;
    },
    xScrollPosition() {
      if (!this.isXOverflowing)
        return 0;
      const s = this.axis.x.scrollLeft / (this.dimensions.contentWidth - this.dimensions.boxWidth);
      return `translate3d(${~~((this.dimensions.xRailWidth - this.dimensions.xThumbWidth) * s)}px, 0, 0)`;
    }
  },
  mounted() {
    this.resizable ? (this.resizeObserverContent = new ResizeObserver(this.onUpdate), this.resizeObserverContent.observe(this.$refs.content)) : this.$nextTick(() => {
      this.onUpdate();
    });
  },
  beforeDestroy() {
    this.resizable && this.resizeObserverContent && (this.resizeObserverContent.unobserve(this.$refs.content), this.resizeObserverContent = null);
  },
  methods: {
    onUpdate() {
      const s = this.$refs.content.scrollHeight, t = this.$refs.content.scrollWidth;
      if (this.resizable) {
        const o = 5.6 * c();
        this.$refs.placeholder.style.width = `${Math.round(t + o)}px`;
      }
      this.$refs.placeholder.style.height = `${s}px`;
      const e = this.$refs.box.offsetWidth, i = this.$refs.box.offsetHeight;
      this.isXOverflowing = t > e, this.isYOverflowing = s > i, this.$nextTick(() => {
        this.dimensions.boxHeight = i, this.dimensions.boxWidth = e, this.dimensions.contentHeight = s, this.dimensions.contentWidth = t, i >= s ? this.$emit("scroll-end", !0) : this.$emit("scroll-end", !1), this.isYOverflowing && (this.dimensions.yRailHeight = this.$refs.yRail.offsetHeight, this.dimensions.yThumbHeight = this.handleGetScrollbarSize("y")), this.isXOverflowing && (this.dimensions.xRailWidth = this.$refs.xRail.offsetWidth, this.dimensions.xThumbWidth = this.handleGetScrollbarSize("x"));
      });
    },
    onCloseBox() {
      this.$emit("close");
    },
    onScroll() {
      !this.scrollXTicking && this.isXOverflowing && (requestAnimationFrame(() => {
        this.axis.x.scrollLeft = this.$refs.wrapper.scrollLeft, this.scrollXTicking = !1;
      }), this.scrollXTicking = !0), !this.scrollYTicking && this.isYOverflowing && (requestAnimationFrame(() => {
        this.axis.y.scrollTop = this.$refs.wrapper.scrollTop, this.scrollYTicking = !1;
      }), this.scrollYTicking = !0), this.$emit("on-scroll");
    },
    onThumbClick(s, t = "y") {
      s.ctrlKey || s.button === 2 || (s.stopImmediatePropagation(), this.axis[t].click = s.currentTarget[this.axis[t].offsetSizeAttr] - (s[this.axis[t].clientAttr] - s.currentTarget.getBoundingClientRect()[this.axis[t].offsetAttr]), this.draggingAxis = t, document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp), document.onselectstart = () => !1);
    },
    onMouseMove(s) {
      const t = this.axis[this.draggingAxis].click;
      if (!t)
        return;
      const e = this.draggingAxis === "y" ? this.$refs.yRail : this.$refs.xRail, i = this.draggingAxis === "y" ? this.$refs.yThumb : this.$refs.xThumb, o = (e.getBoundingClientRect()[this.axis[this.draggingAxis].offsetAttr] - s[this.axis[this.draggingAxis].clientAttr]) * -1, r = i[this.axis[this.draggingAxis].offsetSizeAttr] - t, n = (o - r) * 100 / e[this.axis[this.draggingAxis].offsetSizeAttr];
      this.$refs.wrapper[this.axis[this.draggingAxis].scrollOffsetAttr] = n * this.$refs.wrapper[this.axis[this.draggingAxis].scrollSizeAttr] / 100;
    },
    onMouseUp(s) {
      s.preventDefault(), this.axis[this.draggingAxis].click = 0, this.draggingAxis = null, document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp), document.onselectstart = null;
    },
    onRailClick(s, t = "y") {
      const e = Math.abs(s.target.getBoundingClientRect()[this.axis[t].offsetAttr] - s[this.axis[t].clientAttr]), i = t === "y" ? this.$refs.yRail : this.$refs.xRail, r = (t === "y" ? this.$refs.yThumb : this.$refs.xThumb)[this.axis[t].offsetSizeAttr] / 2, n = (e - r) * 100 / i[this.axis[t].offsetSizeAttr];
      this.$refs.wrapper[this.axis[t].scrollOffsetAttr] = n * this.$refs.wrapper[this.axis[t].scrollSizeAttr] / 100;
    },
    handleGetScrollbarSize(s = "y") {
      if (s === "y" && this.isYOverflowing || s === "x" && this.isXOverflowing) {
        const t = this.$refs.content[this.axis[s].scrollSizeAttr], e = s === "y" ? this.$refs.yRail.offsetHeight : this.$refs.xRail.offsetWidth, i = e / t;
        return Math.max(~~(i * e), 20);
      } else
        return 0;
    }
  }
};
var v = function() {
  var t = this, e = t._self._c;
  return e("div", { ref: "box", class: ["c-scrollbox", t.$style.VScrollBox] }, [e("div", { ref: "placeholder", class: t.$style.placeholder }), e("div", { ref: "wrapper", class: ["scrollbox-wrapper", t.$style.wrapper, { [t.$style._offset]: t.isYOverflowing && !t.skipOffset }], on: { scroll: t.onScroll } }, [e("div", { ref: "content", class: t.$style.content }, [t._t("default")], 2)]), t.isYOverflowing ? e("div", { ref: "yRail", staticClass: "v-scrollbox__scrollbar _vertical", class: [t.$style.scrollbar, t.$style._vertical], on: { mousedown: function(i) {
    return t.onRailClick(i, "y");
  } } }, [e("div", { ref: "yThumb", class: t.$style.thumb, style: { height: `${t.dimensions.yThumbHeight}px`, transform: t.yScrollPosition }, on: { mousedown: function(i) {
    return t.onThumbClick(i, "y");
  } } })]) : t._e(), t.isXOverflowing ? e("div", { ref: "xRail", class: [t.$style.scrollbar, t.$style.horizontal], on: { mousedown: function(i) {
    return t.onRailClick(i, "x");
  } } }, [e("div", { ref: "xThumb", class: t.$style.thumb, style: { width: `${t.dimensions.xThumbWidth}px`, transform: t.xScrollPosition }, on: { mousedown: function(i) {
    return t.onThumbClick(i, "x");
  } } })]) : t._e()]);
}, y = [];
const l = {
  $style: p
};
function $(s) {
  for (var t in l)
    this[t] = l[t];
}
var A = /* @__PURE__ */ h(
  _,
  v,
  y,
  !1,
  $,
  null,
  null,
  null
);
const S = A.exports;
export {
  S as V
};
