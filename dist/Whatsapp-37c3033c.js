import { i as n } from "./vue-qrcode.esm-70d426a8.js";
import { n as o } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const r = "_Whatsapp_n14ab_7", _ = "_image_n14ab_13", c = "_text_n14ab_19", l = {
  Whatsapp: r,
  image: _,
  text: c
}, p = {
  name: "Whatsapp",
  components: {
    VueQrcode: n
  },
  data() {
    return {};
  },
  methods: {}
};
var i = function() {
  var t = this, s = t._self._c;
  return s("a", { class: t.$style.Whatsapp, attrs: { href: "https://www.google.com/", target: "_blank" } }, [s("VueQrcode", { class: t.$style.image, attrs: { value: "https://www.google.com/", options: { width: 176 }, tag: "svg" } }), s("div", { class: t.$style.text }, [t._v("Нажмите для перехода к менеджеру"), s("br"), t._v("или наведите камеру на QR-код")])], 1);
}, m = [];
const a = {
  $style: l
};
function f(e) {
  for (var t in a)
    this[t] = a[t];
}
var h = /* @__PURE__ */ o(
  p,
  i,
  m,
  !1,
  f,
  null,
  null,
  null
);
const x = h.exports;
export {
  x as default
};
