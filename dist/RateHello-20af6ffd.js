import { n as l } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const n = "_RateHello_1coms_7", a = "_message_1coms_13", c = "_help_1coms_19", _ = {
  RateHello: n,
  message: a,
  help: c
}, r = {
  name: "RateHello",
  data() {
    return {};
  },
  methods: {}
};
var m = function() {
  var e = this, s = e._self._c;
  return s("div", { class: e.$style.RateHello, on: { click: function(u) {
    return e.$emit("go-rate-step", "Choose");
  } } }, [s("VIcon", { class: e.$style.message, attrs: { name: "IcRate" } }), s("div", { class: e.$style.help }, [e._v(" Нажмите, чтобы оставить отзыв "), s("br"), e._v(" о нашем сайте ")])], 1);
}, i = [];
const t = {
  $style: _
};
function f(o) {
  for (var e in t)
    this[e] = t[e];
}
var p = /* @__PURE__ */ l(
  r,
  m,
  i,
  !1,
  f,
  null,
  null,
  null
);
const R = p.exports;
export {
  R as default
};
