import { n as o, E as l } from "./main-b4b8c2a2.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const i = "_Chat_1xtne_7", r = "_hello_1xtne_12", c = "_helloBottom_1xtne_22", p = "_messageWrap_1xtne_26", u = "_message_1xtne_26", _ = "_toGray_1xtne_1", m = "_inputWrap_1xtne_51", y = "_send_1xtne_56", d = "__gray_1xtne_80", h = {
  Chat: i,
  hello: r,
  helloBottom: c,
  messageWrap: p,
  message: u,
  toGray: _,
  inputWrap: m,
  send: y,
  _gray: d
}, g = {
  name: "Chat",
  components: {
    ChatOptions: () => import("./ChatOptions-268a5052.js"),
    ChatMessages: () => import("./ChatMessages-78c2ec84.js"),
    Expander: l
  },
  props: {
    isLong: {
      type: Boolean,
      default: !1
    },
    isShowOptions: {
      type: Boolean,
      default: !1
    },
    isLoading: {
      type: Boolean,
      default: !1
    },
    isShowSwitch: {
      type: Boolean,
      default: !1
    },
    history: {
      type: Array,
      required: !0
    },
    value: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    isSendGray() {
      return this.isLoading || !this.value;
    }
  }
};
var f = function() {
  var e = this, t = e._self._c;
  return t("div", { class: e.$style.Chat }, [e.isShowOptions ? t("ChatOptions", { class: e.$style.options, attrs: { "is-show-switch": e.isShowSwitch }, on: { "value-click": function(s) {
    return e.$emit("value-click", s);
  }, "go-step": function(s) {
    return e.$emit("go-step", s);
  } } }) : e.history.length || e.isLoading ? t("ChatMessages", { class: e.$style.messages, attrs: { history: e.history, "is-loading": e.isLoading, "is-long": e.isLong }, on: { "set-rating": function(s) {
    return e.$emit("set-rating", s);
  }, "value-click": function(s) {
    return e.$emit("value-click", s);
  }, "repeat-click": function(s) {
    return e.$emit("repeat-click");
  } } }) : t("div", { class: e.$style.hello }, [t("p", [e._v("Привет! Я Сова – ")]), t("p", { class: e.$style.helloBottom }, [e._v("отвечу на вопрос за 4 секунды")])]), t("Expander", { class: e.$style.messageExpander, attrs: { "is-open": Boolean(e.message) } }, [t("div", { class: e.$style.messageWrap }, [t("div", { key: e.message, class: [e.$style.message], domProps: { innerHTML: e._s(e.message) } })])]), t("form", { class: e.$style.inputWrap, on: { submit: function(s) {
    return s.preventDefault(), e.$emit("submit");
  } } }, [t("VInput", { class: e.$style.input, attrs: { value: e.value, autocomplete: !1, placeholder: "Напишите любой вопрос..." }, on: { input: function(s) {
    return e.$emit("set-value", s);
  } } }), t("button", { class: [e.$style.send, { [e.$style._gray]: e.isSendGray }] }, [t("VIcon", { class: e.$style.sendIcn, attrs: { name: "IcSend", size: "size-16" } })], 1)], 1)], 1);
}, v = [];
const n = {
  $style: h
};
function $(a) {
  for (var e in n)
    this[e] = n[e];
}
var x = /* @__PURE__ */ o(
  g,
  f,
  v,
  !1,
  $,
  null,
  null,
  null
);
const w = x.exports;
export {
  w as default
};
