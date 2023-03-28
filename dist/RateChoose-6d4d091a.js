import { n as a, E as o } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const i = "_RateChoose_10ql5_7", _ = "__rated_10ql5_12", c = "_title_10ql5_12", r = "_smiles_10ql5_16", u = "_smile_10ql5_16", v = "__active_10ql5_19", p = "_btns_10ql5_58", d = "_inputExpander_10ql5_71", m = "_inputWrap_10ql5_75", y = "_send_10ql5_80", $ = {
  RateChoose: i,
  _rated: _,
  title: c,
  smiles: r,
  smile: u,
  _active: v,
  btns: p,
  inputExpander: d,
  inputWrap: m,
  send: y
}, f = {
  name: "RateChoose",
  components: {
    Expander: o
  },
  data() {
    return {
      values: {
        rating: null,
        question: ""
      },
      smiles: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$emit("go-rate-step", "Bye");
    }
  }
};
var b = function() {
  var t = this, s = t._self._c;
  return s("div", { class: [t.$style.RateChoose, { [t.$style._rated]: t.values.rating }] }, [s("div", { class: t.$style.title }, [t._v(" Насколько легко "), s("br"), t._v(" пользоваться сайтом? ")]), s("div", { class: t.$style.smiles }, t._l(t.smiles, function(e) {
    return s("div", { key: e.value, class: [t.$style.smile, { [t.$style._active]: e.value === t.values.rating }], on: { click: function(g) {
      t.values.rating = e.value;
    } } });
  }), 0), s("Expander", { class: t.$style.inputExpander, attrs: { "is-open": Boolean(t.values.rating) } }, [s("form", { class: t.$style.inputWrap, on: { submit: function(e) {
    return e.preventDefault(), t.onSubmit.apply(null, arguments);
  } } }, [s("VInput", { class: t.$style.input, attrs: { autocomplete: !1, placeholder: "Напишите комментарий" }, model: { value: t.values.question, callback: function(e) {
    t.$set(t.values, "question", e);
  }, expression: "values.question" } }), s("button", { class: t.$style.send }, [s("VIcon", { class: t.$style.sendIcn, attrs: { name: "IcSend", size: "size-16" } })], 1)], 1)]), s("div", { class: t.$style.btns }, [s("VButton", { class: t.$style.btn, attrs: { color: "base-100" } }, [t._v(" Сделать скриншот ")]), s("VButton", { class: t.$style.btn, attrs: { color: "base-100" } }, [t._v(" Прикрепить фото ")])], 1)], 1);
}, q = [];
const n = {
  $style: $
};
function h(l) {
  for (var t in n)
    this[t] = n[t];
}
var x = /* @__PURE__ */ a(
  f,
  b,
  q,
  !1,
  h,
  null,
  null,
  null
);
const B = x.exports;
export {
  B as default
};
