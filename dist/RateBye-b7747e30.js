import { n as a } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const o = "_RateHello_mze5f_7", l = "_message_mze5f_13", c = {
  RateHello: o,
  message: l
}, r = {
  name: "RateHello",
  data() {
    return {};
  },
  methods: {}
};
var _ = function() {
  var e = this, t = e._self._c;
  return t("div", { class: e.$style.RateHello, on: { click: function(u) {
    return e.$emit("go-step", "Chat");
  } } }, [t("VIcon", { class: e.$style.message, attrs: { name: "IcRateFinish" } })], 1);
}, m = [];
const s = {
  $style: c
};
function i(n) {
  for (var e in s)
    this[e] = s[e];
}
var f = /* @__PURE__ */ a(
  r,
  _,
  m,
  !1,
  i,
  null,
  null,
  null
);
const R = f.exports;
export {
  R as default
};
