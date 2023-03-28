import { i as o } from "./vue-qrcode.esm-70d426a8.js";
import { n as r } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const a = "_Telegram_1tn7x_7", l = "_image_1tn7x_13", _ = "_text_1tn7x_19", c = {
  Telegram: a,
  image: l,
  text: _
}, m = {
  name: "Telegram",
  components: {
    VueQrcode: o
  },
  data() {
    return {};
  },
  methods: {}
};
var i = function() {
  var t = this, e = t._self._c;
  return e("a", { class: t.$style.Telegram, attrs: { href: "https://www.google.com/", target: "_blank" } }, [e("VueQrcode", { class: t.$style.image, attrs: { value: "https://www.google.com/", options: { width: 176 }, tag: "svg" } }), e("div", { class: t.$style.text }, [t._v("Нажмите для перехода к менеджеру"), e("br"), t._v("или наведите камеру на QR-код")])], 1);
}, g = [];
const s = {
  $style: c
};
function f(n) {
  for (var t in s)
    this[t] = s[t];
}
var d = /* @__PURE__ */ r(
  m,
  i,
  g,
  !1,
  f,
  null,
  null,
  null
);
const h = d.exports;
export {
  h as default
};
