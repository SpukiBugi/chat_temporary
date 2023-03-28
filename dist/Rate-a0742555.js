import { n as r } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const a = "_content_8bfpc_7", c = {
  content: a
}, i = {
  name: "Rate",
  data() {
    return {
      rateStepId: "Hello",
      rateSteps: [
        {
          id: "Hello",
          component: () => import("./RateHello-20af6ffd.js")
        },
        {
          id: "Choose",
          component: () => import("./RateChoose-6d4d091a.js")
        },
        {
          id: "Bye",
          component: () => import("./RateBye-b7747e30.js")
        }
      ]
    };
  },
  computed: {
    currentRateStep() {
      return this.rateSteps.find((e) => e.id === this.rateStepId);
    }
  },
  methods: {
    onGoRateStep(e) {
      this.rateStepId = e;
    }
  }
};
var p = function() {
  var t = this, n = t._self._c;
  return n("div", { class: t.$style.Rate }, [n("transition", { attrs: { name: "widget-sova-fade", mode: "out-in" } }, [n(t.currentRateStep.component, { tag: "component", class: t.$style.content, on: { "go-rate-step": t.onGoRateStep, "go-step": function(s) {
    return t.$emit("go-step", s);
  } } })], 1)], 1);
}, m = [];
const o = {
  $style: c
};
function l(e) {
  for (var t in o)
    this[t] = o[t];
}
var _ = /* @__PURE__ */ r(
  i,
  p,
  m,
  !1,
  l,
  null,
  null,
  null
);
const S = _.exports;
export {
  S as default
};
