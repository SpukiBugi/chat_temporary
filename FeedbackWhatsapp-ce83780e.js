import { i as n } from "./vue-qrcode.esm-70d426a8.js";
import { n as r } from "./main-a57de032.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const c = "_FeedbackWhatsapp_150q0_7", o = "_image_150q0_13", _ = "_text_150q0_19", p = {
  FeedbackWhatsapp: c,
  image: o,
  text: _
}, i = {
  name: "FeedbackWhatsapp",
  components: {
    VueQrcode: n
  },
  data() {
    return {};
  },
  methods: {}
};
var l = function() {
  var t = this, e = t._self._c;
  return e("a", { class: t.$style.FeedbackWhatsapp, attrs: { href: "https://dzen.ru/", target: "_blank" } }, [e("VueQrcode", { class: t.$style.image, attrs: { value: "https://dzen.ru/", options: { width: 176 }, tag: "svg" } }), e("div", { class: t.$style.text }, [t._v("Нажмите для перехода к менеджеру"), e("br"), t._v("или наведите камеру на QR-код")])], 1);
}, d = [];
const s = {
  $style: p
};
function m(a) {
  for (var t in s)
    this[t] = s[t];
}
var u = /* @__PURE__ */ r(
  i,
  l,
  d,
  !1,
  m,
  null,
  null,
  null
);
const x = u.exports;
export {
  x as default
};
