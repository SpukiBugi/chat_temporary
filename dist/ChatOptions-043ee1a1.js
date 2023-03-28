import { V as a } from "./VScrollBox-12fe50c0.js";
import { n as _ } from "./main-a457177b.js";
import "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
const r = "_ChatOptions_866qv_7", h = "__showSwitch_866qv_10", d = "_list_866qv_10", u = "_scrollable_866qv_14", v = "_option_866qv_27", p = "_head_866qv_36", f = "_headIcn_866qv_42", m = "_questions_866qv_50", y = "_fade_866qv_59", $ = {
  ChatOptions: r,
  _showSwitch: h,
  list: d,
  scrollable: u,
  option: v,
  head: p,
  headIcn: f,
  questions: m,
  fade: y
}, q = {
  name: "ChatOptions",
  components: {
    VScrollBox: a
  },
  props: {
    isShowSwitch: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      options: [
        {
          title: "Проекты",
          icon: "/home.svg",
          questions: [
            "Где расположены проекты?",
            "Какая инфраструктура у Заневского?",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?"
          ]
        },
        {
          title: "Квартиры",
          icon: "/key.svg",
          questions: [
            "Где расположены проекты?",
            "Какая инфраструктура у Заневского?",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?",
            "Где расположены проекты?",
            "Какая инфраструктура у Заневского?",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?",
            "Golden City",
            "Grand House",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?",
            "Есть проекты с панорамными окнами?",
            "Какая средняя площадь квартир?"
          ]
        }
      ]
    };
  },
  methods: {
    onQuestionClick(o) {
      this.$emit("value-click", o), this.$emit("go-step", "Chat");
    }
  }
};
var w = function() {
  var s = this, t = s._self._c;
  return t("div", { class: [s.$style.ChatOptions, { [s.$style._showSwitch]: s.isShowSwitch }] }, [t("VScrollBox", { ref: "scrollbox", class: s.$style.scrollable }, [t("div", { class: s.$style.list }, s._l(s.options, function(e, i) {
    return t("div", { key: `options-${i}`, class: s.$style.option }, [t("div", { class: s.$style.head }, [t("div", { class: s.$style.headIcn, style: { backgroundImage: `url(${e.icon})` } }), t("div", { class: s.$style.headTitle, domProps: { innerHTML: s._s(e.title) } })]), t("div", { class: s.$style.questions }, s._l(e.questions, function(n, c) {
      return t("VButton", { key: n + c, class: s.$style.question, on: { click: function(b) {
        return s.onQuestionClick(n);
      } } }, [s._v(" " + s._s(n) + " ")]);
    }), 1)]);
  }), 0)]), t("div", { class: s.$style.fade })], 1);
}, C = [];
const l = {
  $style: $
};
function S(o) {
  for (var s in l)
    this[s] = l[s];
}
var k = /* @__PURE__ */ _(
  q,
  w,
  C,
  !1,
  S,
  null,
  null,
  null
);
const B = k.exports;
export {
  B as default
};
