import { n as l, E as m, f as a } from "./main-a57de032.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
function u() {
  const s = window.document.documentElement, t = window.getComputedStyle(s, null).getPropertyValue("font-size");
  return parseFloat(t);
}
const $ = "_VScrollBox_khrtx_7", g = "_wrapper_khrtx_11", p = "__offset_khrtx_31", y = "_placeholder_khrtx_34", v = "_scrollbar_khrtx_41", b = "__horizontal_khrtx_50", x = "_thumb_khrtx_53", k = "__vertical_khrtx_58", T = {
  VScrollBox: $,
  wrapper: g,
  _offset: p,
  placeholder: y,
  scrollbar: v,
  _horizontal: b,
  thumb: x,
  _vertical: k
}, z = {
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
        const o = 5.6 * u();
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
    onScroll(s) {
      !this.scrollXTicking && this.isXOverflowing && (requestAnimationFrame(() => {
        this.axis.x.scrollLeft = this.$refs.wrapper.scrollLeft, this.scrollXTicking = !1;
      }), this.scrollXTicking = !0), !this.scrollYTicking && this.isYOverflowing && (requestAnimationFrame(() => {
        this.axis.y.scrollTop = this.$refs.wrapper.scrollTop, this.scrollYTicking = !1;
      }), this.scrollYTicking = !0), this.$emit("on-scroll", s);
    },
    onThumbClick(s, t = "y") {
      s.ctrlKey || s.button === 2 || (s.stopImmediatePropagation(), this.axis[t].click = s.currentTarget[this.axis[t].offsetSizeAttr] - (s[this.axis[t].clientAttr] - s.currentTarget.getBoundingClientRect()[this.axis[t].offsetAttr]), this.draggingAxis = t, document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("mouseup", this.onMouseUp), document.onselectstart = () => !1);
    },
    onMouseMove(s) {
      const t = this.axis[this.draggingAxis].click;
      if (!t)
        return;
      const e = this.draggingAxis === "y" ? this.$refs.yRail : this.$refs.xRail, i = this.draggingAxis === "y" ? this.$refs.yThumb : this.$refs.xThumb, o = (e.getBoundingClientRect()[this.axis[this.draggingAxis].offsetAttr] - s[this.axis[this.draggingAxis].clientAttr]) * -1, n = i[this.axis[this.draggingAxis].offsetSizeAttr] - t, r = (o - n) * 100 / e[this.axis[this.draggingAxis].offsetSizeAttr];
      this.$refs.wrapper[this.axis[this.draggingAxis].scrollOffsetAttr] = r * this.$refs.wrapper[this.axis[this.draggingAxis].scrollSizeAttr] / 100;
    },
    onMouseUp(s) {
      s.preventDefault(), this.axis[this.draggingAxis].click = 0, this.draggingAxis = null, document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("mouseup", this.onMouseUp), document.onselectstart = null;
    },
    onRailClick(s, t = "y") {
      const e = Math.abs(s.target.getBoundingClientRect()[this.axis[t].offsetAttr] - s[this.axis[t].clientAttr]), i = t === "y" ? this.$refs.yRail : this.$refs.xRail, n = (t === "y" ? this.$refs.yThumb : this.$refs.xThumb)[this.axis[t].offsetSizeAttr] / 2, r = (e - n) * 100 / i[this.axis[t].offsetSizeAttr];
      this.$refs.wrapper[this.axis[t].scrollOffsetAttr] = r * this.$refs.wrapper[this.axis[t].scrollSizeAttr] / 100;
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
var w = function() {
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
}, C = [];
const c = {
  $style: T
};
function S(s) {
  for (var t in c)
    this[t] = c[t];
}
var A = /* @__PURE__ */ l(
  z,
  w,
  C,
  !1,
  S,
  null,
  null,
  null
);
const M = A.exports, O = "_ChatMessageFlat_6tmy9_7", B = "_plan_6tmy9_16", L = "_title_6tmy9_28", R = "_desc_6tmy9_35", H = {
  ChatMessageFlat: O,
  plan: B,
  title: L,
  desc: R
}, W = {
  name: "ChatMessageFlat",
  props: {
    flat: {
      type: Object,
      required: !0
    }
  }
};
var P = function() {
  var t = this, e = t._self._c;
  return e("div", { class: t.$style.ChatMessageFlat }, [e("div", { class: t.$style.plan, style: { backgroundImage: `url(${t.flat.plan || "/lot-placeholder.svg"})` } }), e("div", { class: t.$style.text }, [!isNaN(t.flat.rooms) || t.flat.area ? e("div", { class: t.$style.title }, [t._v(" " + t._s(t.flat.rooms === 0 ? "Студия" : `${t.flat.rooms}-комн.`) + " "), Number(t.flat.area) ? [t._v(" " + t._s(t.flat.area) + " м"), e("sup", [t._v("2")])] : t._e()], 2) : t._e(), t.flat.price ? e("div", { class: t.$style.desc }, [t._v(" " + t._s(t._f("splitThousands")(t.flat.price)) + " ₽ ")]) : t._e()])]);
}, q = [];
const h = {
  $style: H
};
function j(s) {
  for (var t in h)
    this[t] = h[t];
}
var F = /* @__PURE__ */ l(
  W,
  P,
  q,
  !1,
  j,
  null,
  null,
  null
);
const I = F.exports, V = "_ChatMessage_co3m8_7", E = "__question_co3m8_15", Y = "_bubble_co3m8_18", X = "__answer_co3m8_22", D = "__flat_co3m8_29", G = "_time_co3m8_29", U = "_rate_co3m8_40", N = "_rateItem_co3m8_44", K = "__dislike_co3m8_44", J = "_bubbleText_co3m8_52", Q = "_timeLike_co3m8_90", Z = "__active_co3m8_98", tt = "_link_co3m8_139", et = "_projects_co3m8_143", st = {
  ChatMessage: V,
  _question: E,
  bubble: Y,
  _answer: X,
  _flat: D,
  time: G,
  rate: U,
  rateItem: N,
  _dislike: K,
  bubbleText: J,
  timeLike: Q,
  _active: Z,
  link: tt,
  projects: et
}, it = {
  name: "ChatMessage",
  components: {
    ChatMessageFlat: I
  },
  props: {
    item: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {};
  },
  computed: {
    classList() {
      return [
        this.$style[`_${this.item.type}`],
        {
          [this.$style._flat]: Boolean(this.item.flat)
        }
      ];
    }
  },
  methods: {}
};
var ot = function() {
  var t = this, e = t._self._c;
  return e("div", { class: [t.$style.ChatMessage, ...t.classList] }, [e("div", { class: t.$style.bubble }, [e("div", { class: t.$style.bubbleText }, [e("span", { domProps: { innerHTML: t._s(t.item.text) } }), t.item.type === "answer" && t.item.created ? e("span", { class: t.$style.time }, [e("VIcon", { class: [t.$style.timeLike, { [t.$style._active]: t.item.rating, [t.$style._dislike]: t.item.rating === "dislike" }], attrs: { name: "IcLike", size: "size-12", rotate: "" } }), e("span", [t._v(t._s(t._f("formatDateTime")(t.item.created, "$G:$I")))])], 1) : t._e()]), t.item.type === "answer" && t.item.id !== "error" ? e("div", { class: t.$style.rate }, [e("VButtonIcon", { class: [t.$style.rateItem, t.$style._dislike, { [t.$style._active]: t.item.rating === "dislike" }], attrs: { name: "IcLike", "icon-size": "size-12", color: t.item.rating === "dislike" ? "primary-500" : "base-400", rotate: "" }, on: { click: function(i) {
    return t.$emit("set-rating", { value: t.item.rating === "dislike" ? null : "dislike", item: t.item });
  } } }), e("VButtonIcon", { class: [t.$style.rateItem, t.$style._like, { [t.$style._active]: t.item.rating === "like" }], attrs: { name: "IcLike", "icon-size": "size-12", color: t.item.rating === "like" ? "primary-500" : "base-100" }, on: { click: function(i) {
    return t.$emit("set-rating", { value: t.item.rating === "like" ? null : "like", item: t.item });
  } } })], 1) : t._e(), t.item.flat ? e("ChatMessageFlat", { class: t.$style.flat, attrs: { flat: t.item.flat } }) : t._e()], 1), t.item.link ? e("VButton", { class: t.$style.link, attrs: { href: t.item.link, size: "size-40", blank: "" } }, [t._v(" Смотреть ")]) : t._e(), t.item.id === "error" ? e("VButton", { class: t.$style.link, attrs: { size: "size-40" }, on: { click: function(i) {
    return t.$emit("repeat-click");
  } } }, [t._v(" Спросить еще раз ")]) : t._e(), e("div", { directives: [{ name: "show", rawName: "v-show", value: t.item.projects_choice && t.item.projects_choice.length, expression: "item.projects_choice && item.projects_choice.length" }], class: t.$style.projects }, t._l(t.item.projects_choice, function(i, o) {
    return e("VButton", { key: i + o, class: t.$style.project, on: { click: function(n) {
      return t.$emit("value-click", i);
    } } }, [t._v(" " + t._s(i) + " ")]);
  }), 1)], 1);
}, lt = [];
const _ = {
  $style: st
};
function nt(s) {
  for (var t in _)
    this[t] = _[t];
}
var rt = /* @__PURE__ */ l(
  it,
  ot,
  lt,
  !1,
  nt,
  null,
  null,
  null
);
const at = rt.exports, ct = "_ChatPreload_84qpb_7", ht = "_bubble_84qpb_14", _t = "_dot_84qpb_25", ft = "_steps_84qpb_1", dt = {
  ChatPreload: ct,
  bubble: ht,
  dot: _t,
  steps: ft
}, mt = {
  name: "ChatPreload"
};
var ut = function() {
  var t = this, e = t._self._c;
  return e("div", { class: t.$style.ChatPreload }, [e("div", { class: t.$style.bubble }, [e("div", { class: t.$style.dot }), e("div", { class: t.$style.dot }), e("div", { class: t.$style.dot })])]);
}, $t = [];
const f = {
  $style: dt
};
function gt(s) {
  for (var t in f)
    this[t] = f[t];
}
var pt = /* @__PURE__ */ l(
  mt,
  ut,
  $t,
  !1,
  gt,
  null,
  null,
  null
);
const yt = pt.exports, vt = "_ChatMessages_9q5dd_8", bt = "__border_9q5dd_13", xt = "_scrollable_9q5dd_17", kt = "_list_9q5dd_36", Tt = "_message_9q5dd_49", zt = "_date_9q5dd_53", wt = "_noteExpander_9q5dd_67", Ct = "_noteWrap_9q5dd_72", St = "__active_9q5dd_78", At = "_note_9q5dd_67", Mt = "_toGray_9q5dd_1", Ot = {
  ChatMessages: vt,
  _border: bt,
  scrollable: xt,
  list: kt,
  message: Tt,
  date: zt,
  noteExpander: wt,
  noteWrap: Ct,
  _active: St,
  note: At,
  toGray: Mt
}, Bt = {
  name: "ChatMessages",
  components: {
    VScrollBox: M,
    ChatMessage: at,
    ChatPreload: yt,
    Expander: m
  },
  props: {
    history: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: !1
    },
    isLong: {
      type: Boolean,
      default: !1
    },
    note: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hasBorder: !1
    };
  },
  computed: {
    currentList() {
      return this.isLong ? this.splitByDate(this.history) : this.isLoading ? this.history.slice(Math.max(this.history.length - 1, 0)) : this.history.slice(Math.max(this.history.length - 2, 0));
    }
  },
  watch: {
    isLoading() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    isLong() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      const s = this.$refs.scrollbox.$refs.wrapper;
      s.scrollTop = s.scrollHeight, this.device === "mobile" && (this.hasBorder = s.scrollHeight > s.clientHeight);
    },
    splitByDate(s) {
      let t = null;
      const e = [];
      return s.forEach((i, o) => {
        i.created && a(i.created, "$j $e") !== a(t, "$j $e") && (t = i.created), e.push(i);
      }), e;
    },
    onScroll(s) {
      s.currentTarget.scrollTop < 100 && this.$emit("append-history");
    }
  }
};
var Lt = function() {
  var t = this, e = t._self._c;
  return e("div", { class: [t.$style.ChatMessages, { [t.$style._border]: t.hasBorder }] }, [e("VScrollBox", { ref: "scrollbox", class: t.$style.scrollable, attrs: { resizable: "", "skip-offset": "" }, on: { "on-scroll": t.onScroll } }, [e("div", { class: t.$style.list }, [t._l(t.currentList, function(i) {
    return [i.type === "date" ? e("div", { key: i.id, class: t.$style.date }, [t._v(" " + t._s(t._f("formatDateTime")(i.created, "$j $e")) + " ")]) : e("ChatMessage", { key: i.id, class: t.$style.message, attrs: { item: i }, on: { "set-rating": function(o) {
      return t.$emit("set-rating", o);
    }, "value-click": function(o) {
      return t.$emit("value-click", o);
    }, "repeat-click": function(o) {
      return t.$emit("repeat-click");
    } } })];
  }), t.isLoading ? e("ChatPreload", { class: t.$style.message }) : t._e(), e("Expander", { class: t.$style.noteExpander, attrs: { "is-open": Boolean(t.note) } }, [e("div", { class: [t.$style.noteWrap, { [t.$style._active]: Boolean(t.note) }] }, [e("div", { key: t.note, class: [t.$style.note], domProps: { innerHTML: t._s(t.note) } })])])], 2)])], 1);
}, Rt = [];
const d = {
  $style: Ot
};
function Ht(s) {
  for (var t in d)
    this[t] = d[t];
}
var Wt = /* @__PURE__ */ l(
  Bt,
  Lt,
  Rt,
  !1,
  Ht,
  null,
  null,
  null
);
const Ft = Wt.exports;
export {
  Ft as default
};
