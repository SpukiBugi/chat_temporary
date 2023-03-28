import { V as _ } from "./VScrollBox-1bbf96ef.js";
import { n as i } from "./main-b4b8c2a2.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const u = "_ChatMessageFlat_yv7j7_7", d = "_plan_yv7j7_16", f = "_title_yv7j7_28", m = "_desc_yv7j7_35", $ = {
  ChatMessageFlat: u,
  plan: d,
  title: f,
  desc: m
}, p = {
  name: "ChatMessageFlat",
  props: {
    flat: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {};
  },
  methods: {}
};
var h = function() {
  var t = this, e = t._self._c;
  return e("div", { class: t.$style.ChatMessageFlat }, [e("div", { class: t.$style.plan, style: { backgroundImage: `url(${t.flat.plan || "/lot-placeholder.svg"})` } }), e("div", { class: t.$style.text }, [!isNaN(t.flat.rooms) || t.flat.area ? e("div", { class: t.$style.title }, [t._v(" " + t._s(t.flat.rooms === 0 ? "Студия" : `${t.flat.rooms}-комн.`) + " "), Number(t.flat.area) ? [t._v(" " + t._s(t.flat.area) + " м"), e("sup", [t._v("2")])] : t._e()], 2) : t._e(), t.flat.price ? e("div", { class: t.$style.desc }, [t._v(" " + t._s(t._f("splitThousands")(t.flat.price)) + " ₽ ")]) : t._e()])]);
}, v = [];
const r = {
  $style: $
};
function y(a) {
  for (var t in r)
    this[t] = r[t];
}
var b = /* @__PURE__ */ i(
  p,
  h,
  v,
  !1,
  y,
  null,
  null,
  null
);
const g = b.exports, j = "_ChatMessage_jfi8r_7", k = "_rate_jfi8r_16", C = "_rateItem_jfi8r_20", x = "__dislike_jfi8r_20", M = "_time_jfi8r_23", B = "__question_jfi8r_27", T = "_bubble_jfi8r_31", L = "__answer_jfi8r_35", F = "__rated_jfi8r_42", I = "_bubbleText_jfi8r_54", w = "__active_jfi8r_107", z = "_link_jfi8r_111", q = "_projects_jfi8r_115", N = {
  ChatMessage: j,
  rate: k,
  rateItem: C,
  _dislike: x,
  time: M,
  _question: B,
  bubble: T,
  _answer: L,
  _rated: F,
  bubbleText: I,
  _active: w,
  link: z,
  projects: q
}, P = {
  name: "ChatMessage",
  components: {
    ChatMessageFlat: g
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
          [this.$style._rated]: typeof this.item.rating == "boolean"
        }
      ];
    }
  },
  methods: {}
};
var V = function() {
  var t = this, e = t._self._c;
  return e("div", { class: [t.$style.ChatMessage, ...t.classList] }, [e("div", { class: t.$style.bubble }, [e("div", { class: t.$style.bubbleText }, [e("span", { domProps: { innerHTML: t._s(t.item.text) } }), t.item.type === "answer" && t.item.date ? e("span", { class: t.$style.time }, [t._v(t._s(t._f("formatDateTime")(t.item.date, "$G:$I")))]) : t._e()]), t.item.type === "answer" && t.item.id !== "error" ? e("div", { class: t.$style.rate }, [e("VButtonIcon", { class: [t.$style.rateItem, t.$style._dislike, { [t.$style._active]: t.item.rating === !1 }], attrs: { name: "IcLike", "icon-size": "size-12", color: t.item.rating === !1 ? "primary-500" : "base-100", rotate: "" }, on: { click: function(s) {
    return t.$emit("set-rating", { value: t.item.rating === !1 ? null : !1, item: t.item });
  } } }), e("VButtonIcon", { class: [t.$style.rateItem, t.$style._like, { [t.$style._active]: t.item.rating === !0 }], attrs: { name: "IcLike", "icon-size": "size-12", color: t.item.rating === !0 ? "primary-500" : "base-100" }, on: { click: function(s) {
    return t.$emit("set-rating", { value: t.item.rating === !0 ? null : !0, item: t.item });
  } } })], 1) : t._e(), t.item.flat ? e("ChatMessageFlat", { class: t.$style.flat, attrs: { flat: t.item.flat } }) : t._e()], 1), t.item.link ? e("VButton", { class: t.$style.link, attrs: { href: t.item.link, size: "size-40", blank: "" } }, [t._v(" Смотреть ")]) : t._e(), t.item.id === "error" ? e("VButton", { class: t.$style.link, attrs: { size: "size-40" }, on: { click: function(s) {
    return t.$emit("repeat-click");
  } } }, [t._v(" Спросить еще раз ")]) : t._e(), e("div", { directives: [{ name: "show", rawName: "v-show", value: t.item.projects && t.item.projects !== "NONE" && t.item.projects.length, expression: "item.projects && item.projects !== 'NONE' && item.projects.length" }], class: t.$style.projects }, t._l(t.item.projects, function(s, l) {
    return e("VButton", { key: s + l, class: t.$style.project, on: { click: function(ct) {
      return t.$emit("value-click", s);
    } } }, [t._v(" " + t._s(s) + " ")]);
  }), 1)], 1);
}, S = [];
const n = {
  $style: N
};
function D(a) {
  for (var t in n)
    this[t] = n[t];
}
var O = /* @__PURE__ */ i(
  P,
  V,
  S,
  !1,
  D,
  null,
  null,
  null
);
const R = O.exports, E = "_ChatPreload_84qpb_7", H = "_bubble_84qpb_14", A = "_dot_84qpb_25", G = "_steps_84qpb_1", J = {
  ChatPreload: E,
  bubble: H,
  dot: A,
  steps: G
}, K = {
  name: "ChatPreload"
};
var Q = function() {
  var t = this, e = t._self._c;
  return e("div", { class: t.$style.ChatPreload }, [e("div", { class: t.$style.bubble }, [e("div", { class: t.$style.dot }), e("div", { class: t.$style.dot }), e("div", { class: t.$style.dot })])]);
}, U = [];
const o = {
  $style: J
};
function W(a) {
  for (var t in o)
    this[t] = o[t];
}
var X = /* @__PURE__ */ i(
  K,
  Q,
  U,
  !1,
  W,
  null,
  null,
  null
);
const Y = X.exports, Z = "_scrollable_1bbo3_7", tt = "_list_1bbo3_20", et = "_message_1bbo3_26", st = "_date_1bbo3_30", at = {
  scrollable: Z,
  list: tt,
  message: et,
  date: st
}, lt = {
  name: "ChatMessages",
  components: {
    VScrollBox: _,
    ChatMessage: R,
    ChatPreload: Y
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
    }
  },
  data() {
    return {};
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
      const a = this.$refs.scrollbox.$refs.wrapper;
      a.scrollTop = a.scrollHeight;
    },
    splitByDate(a) {
      let t = null;
      const e = [];
      return a.forEach((s, l) => {
        s.date !== t && s.date && (e.push({ id: `date-${l}`, type: "date", date: s.date }), t = s.date), e.push(s);
      }), e;
    }
  }
};
var it = function() {
  var t = this, e = t._self._c;
  return e("div", { class: t.$style.ChatMessages }, [e("VScrollBox", { ref: "scrollbox", class: t.$style.scrollable, attrs: { resizable: "", "skip-offset": "" } }, [e("div", { class: t.$style.list }, [t._l(t.currentList, function(s) {
    return [s.type === "date" ? e("div", { key: s.id, class: t.$style.date }, [t._v(" " + t._s(t._f("formatDateTime")(s.date, "$j $e")) + " ")]) : e("ChatMessage", { key: s.id, class: t.$style.message, attrs: { item: s }, on: { "set-rating": function(l) {
      return t.$emit("set-rating", l);
    }, "value-click": function(l) {
      return t.$emit("value-click", l);
    }, "repeat-click": function(l) {
      return t.$emit("repeat-click");
    } } })];
  }), t.isLoading ? e("ChatPreload", { class: t.$style.message }) : t._e()], 2)])], 1);
}, rt = [];
const c = {
  $style: at
};
function nt(a) {
  for (var t in c)
    this[t] = c[t];
}
var ot = /* @__PURE__ */ i(
  lt,
  it,
  rt,
  !1,
  nt,
  null,
  null,
  null
);
const mt = ot.exports;
export {
  mt as default
};
