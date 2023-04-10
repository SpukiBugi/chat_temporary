import { n as a } from "./main-a57de032.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const o = "_FeedbackThanks_jgwr3_7", c = "_message_jgwr3_16", r = {
  FeedbackThanks: o,
  message: c
}, i = {
  name: "FeedbackThanks",
  data() {
    return {
      timeout: null
    };
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.$emit("go-step", "Chat");
    }, 4e3);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
var _ = function() {
  var e = this, s = e._self._c;
  return s("div", { class: e.$style.FeedbackThanks }, [s("VIcon", { class: e.$style.message, attrs: { name: "IcRateFinish" } })], 1);
}, m = [];
const t = {
  $style: r
};
function l(n) {
  for (var e in t)
    this[e] = t[e];
}
var u = /* @__PURE__ */ a(
  i,
  _,
  m,
  !1,
  l,
  null,
  null,
  null
);
const k = u.exports;
export {
  k as default
};
