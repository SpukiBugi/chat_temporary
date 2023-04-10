import { i as o } from "./vue-qrcode.esm-70d426a8.js";
import { n as r } from "./main-a57de032.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const n = "_FeedbackTelegram_1j9qv_7", c = "_image_1j9qv_13", l = "_text_1j9qv_19", _ = {
  FeedbackTelegram: n,
  image: c,
  text: l
}, m = {
  name: "FeedbackTelegram",
  components: {
    VueQrcode: o
  },
  data() {
    return {};
  },
  methods: {}
};
var i = function() {
  var e = this, t = e._self._c;
  return t("a", { class: e.$style.FeedbackTelegram, attrs: { href: "https://www.google.com/", target: "_blank" } }, [t("VueQrcode", { class: e.$style.image, attrs: { value: "https://www.google.com/", options: { width: 176 }, tag: "svg" } }), t("div", { class: e.$style.text }, [e._v("Нажмите для перехода к менеджеру"), t("br"), e._v("или наведите камеру на QR-код")])], 1);
}, d = [];
const s = {
  $style: _
};
function g(a) {
  for (var e in s)
    this[e] = s[e];
}
var v = /* @__PURE__ */ r(
  m,
  i,
  d,
  !1,
  g,
  null,
  null,
  null
);
const x = v.exports;
export {
  x as default
};
