import h from "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import { gsap as c } from "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
function F(e, t, s) {
  let n;
  return function() {
    const r = this, o = arguments;
    function l() {
      n = null, s || e.apply(r, o);
    }
    const a = s && !n;
    clearTimeout(n), n = setTimeout(l, t), a && e.apply(r, o);
  };
}
const H = "/bot.mp4", E = "/fanera.jpg", R = "_Avatar_h3gzp_7", N = "_status_h3gzp_14", D = "__menu_h3gzp_23", P = "__chat_h3gzp_26", X = "_videoWrap_h3gzp_30", q = "_video_h3gzp_30", G = "_image_h3gzp_40", Y = {
  Avatar: R,
  status: N,
  _menu: D,
  _chat: P,
  videoWrap: X,
  video: q,
  image: G
};
function u(e, t, s, n, i, r, o, l) {
  var a = typeof e == "function" ? e.options : e;
  t && (a.render = t, a.staticRenderFns = s, a._compiled = !0), n && (a.functional = !0), r && (a._scopeId = "data-v-" + r);
  var d;
  if (o ? (d = function(p) {
    p = p || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !p && typeof __VUE_SSR_CONTEXT__ < "u" && (p = __VUE_SSR_CONTEXT__), i && i.call(this, p), p && p._registeredComponents && p._registeredComponents.add(o);
  }, a._ssrRegister = d) : i && (d = l ? function() {
    i.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), d)
    if (a.functional) {
      a._injectStyles = d;
      var W = a.render;
      a.render = function(j, y) {
        return d.call(y), W(j, y);
      };
    } else {
      var v = a.beforeCreate;
      a.beforeCreate = v ? [].concat(v, d) : [d];
    }
  return {
    exports: e,
    options: a
  };
}
const U = {
  name: "Avatar",
  props: {
    hasStatus: {
      type: Boolean,
      default: !1
    },
    statusType: {
      type: String,
      default: "menu"
    },
    showPic: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {};
  },
  methods: {}
};
var Z = function() {
  var t = this, s = t._self._c;
  return s("div", { class: t.$style.Avatar }, [s("div", { class: t.$style.videoWrap }, [s("video", { class: t.$style.video, attrs: { autoplay: "", loop: "", playsinline: "", muted: "" }, domProps: { muted: !0 } }, [s("source", { attrs: { src: H, type: "video/mp4" } })]), s("transition", { attrs: { name: "widget-sova-fade-in" } }, [t.showPic ? s("img", { class: t.$style.image, attrs: { src: E, alt: "avatar" } }) : t._e()])], 1), s("transition", { attrs: { name: "widget-sova-fade" } }, [s("div", { directives: [{ name: "show", rawName: "v-show", value: t.hasStatus, expression: "hasStatus" }], class: [t.$style.status, t.$style[`_${t.statusType}`]] })])], 1);
}, K = [];
const $ = {
  $style: Y
};
function J(e) {
  for (var t in $)
    this[t] = $[t];
}
var Q = /* @__PURE__ */ u(
  U,
  Z,
  K,
  !1,
  J,
  null,
  null,
  null
);
const A = Q.exports, tt = "_expander_kori7_7", et = {
  expander: tt
}, st = {
  name: "Expander",
  props: {
    isOpen: {
      type: Boolean,
      default: !1
    },
    duration: {
      type: Number,
      default: 0.3
    },
    enterDelay: {
      type: Number,
      default: 0
    },
    leaveDelay: {
      type: Number,
      default: 0
    },
    ease: {
      type: String,
      default: "power1.out"
    },
    hideSize: {
      type: String,
      default: "0"
    },
    field: {
      type: String,
      default: "height"
    }
  },
  data() {
    return {
      isMounted: !1,
      changing: !1,
      changeTimeout: !1
    };
  },
  computed: {
    premountSize() {
      return this.isMounted ? "" : this.isOpen ? "auto" : this.hideSize;
    }
  },
  watch: {
    isOpen() {
      this.changing = !0, this.isOpen ? c.to(this.$el, {
        duration: this.duration,
        delay: this.enterDelay,
        [this.field]: "auto",
        ease: this.ease,
        onComplete: () => {
          this.changing = !1;
        }
      }) : c.to(this.$el, {
        duration: this.duration,
        delay: this.leaveDelay,
        [this.field]: this.hideSize,
        ease: this.ease,
        onComplete: () => {
          this.changing = !1;
        }
      });
    }
  },
  mounted() {
    this.isMounted = !0, this.$nextTick(() => {
      this.$el.style[this.field] = this.isOpen ? "auto" : this.hideSize;
    });
  }
};
var nt = function() {
  var t = this, s = t._self._c;
  return s("div", { class: [t.$style.expander, { _hidden: !t.isOpen, _changing: t.changing }], style: { [t.field]: t.premountSize } }, [t._t("default")], 2);
}, it = [];
const g = {
  $style: et
};
function ot(e) {
  for (var t in g)
    this[t] = g[t];
}
var at = /* @__PURE__ */ u(
  st,
  nt,
  it,
  !1,
  ot,
  null,
  null,
  null
);
const V = at.exports, rt = "_Menu_8jpxx_7", lt = "__open_8jpxx_10", ct = "_inner_8jpxx_10", ut = "_avatarWrap_8jpxx_13", pt = "_control_8jpxx_17", ht = "__chatOpening_8jpxx_21", dt = "_main_8jpxx_25", _t = "_mainBlur_8jpxx_33", mt = "_expander_8jpxx_61", ft = "__weight_8jpxx_61", vt = "_controls_8jpxx_68", yt = "__notif_8jpxx_117", $t = "_text_8jpxx_121", gt = "__link_8jpxx_143", bt = "_textBlur_8jpxx_152", wt = "_textInner_8jpxx_168", xt = "_textLink_8jpxx_188", St = {
  Menu: rt,
  _open: lt,
  inner: ct,
  avatarWrap: ut,
  control: pt,
  _chatOpening: ht,
  main: dt,
  mainBlur: _t,
  expander: mt,
  _weight: ft,
  controls: vt,
  _notif: yt,
  text: $t,
  _link: gt,
  textBlur: bt,
  textInner: wt,
  textLink: xt
}, Tt = {
  name: "Menu",
  components: {
    Avatar: A,
    Expander: V
  },
  props: {
    isMainOpen: {
      type: Boolean,
      default: !1
    },
    hasNew: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      isChatOpening: !1,
      isOpen: !1,
      isHovering: !1,
      hasInteracted: !1,
      controls: [
        {
          icon: "IcMessage",
          text: "Получить ответ",
          step: "Chat"
        },
        {
          icon: "IcPhone",
          text: "Заказать звонок",
          step: "Call"
        },
        {
          icon: "IcMenu",
          text: "Весь функционал",
          step: "Options"
        }
      ],
      activeText: "",
      autoInterval: null,
      inviteText: `За 4 секунды отвечу на любой вопрос<span class="${this.$style.textLink}"></span>`,
      newText: `1 новое сообщение – <span class="${this.$style.textLink}">смотреть</span>`
    };
  },
  computed: {
    isAutoActive() {
      return !this.isHovering && !this.isMainOpen && !this.activeText && this.device !== "mobile";
    }
  },
  watch: {
    isAutoActive: {
      handler(e) {
        e ? this.initAuto() : clearInterval(this.autoInterval);
      },
      immediate: !0
    },
    hasNew: {
      handler(e) {
        e ? (this.activeText = this.newText, this.isOpen = !0) : this.activeText === this.newText && (this.activeText = "");
      },
      immediate: !0
    }
  },
  mounted() {
    this.device !== "mobile" && this.initAuto(), this.hasInteracted || this.initInvite();
  },
  beforeDestroy() {
    clearInterval(this.autoInterval);
  },
  methods: {
    onMouseEnter() {
      this.device !== "mobile" && (this.isOpen = !0, this.isHovering = !0, this.hasInteracted = !0);
    },
    onMouseLeave() {
      this.device !== "mobile" && (this.isOpen = !1, this.isHovering = !1, this.activeText === this.inviteText && (this.activeText = ""));
    },
    onClick() {
      this.device === "mobile" && (this.hasInteracted = !0, this.activeText === this.inviteText && (this.activeText = ""), this.goStep(this.controls[0].step));
    },
    onControlEnter(e) {
      this.activeText = e.text;
    },
    onControlsLeave() {
      this.activeText = "";
    },
    goStep(e) {
      this.isChatOpening = !0, this.isOpen = !1, this.activeText = "", this.$emit("go-step", e), setTimeout(() => {
        this.$emit("open"), setTimeout(() => {
          this.isChatOpening = !1;
        }, 500);
      }, this.device === "mobile" ? 0 : 500);
    },
    initInvite() {
      setTimeout(() => {
        !this.hasInteracted && !this.activeText && (this.activeText = this.inviteText);
      }, 4e3);
    },
    initAuto() {
      clearInterval(this.autoInterval), this.autoInterval = setInterval(() => {
        this.isAutoActive && (this.isOpen = !this.isOpen);
      }, 4e3);
    },
    onBeforeLeaveText() {
      this.device !== "mobile" && (this.$refs.mainBlur.style["border-top-right-radius"] = "40px", this.$refs.main.style["border-top-right-radius"] = "40px");
    },
    onBeforeEnterText() {
      this.device !== "mobile" && (this.$refs.mainBlur.style["border-top-right-radius"] = 0, this.$refs.main.style["border-top-right-radius"] = 0);
    },
    onTextClick() {
      (this.activeText === this.inviteText || this.activeText === this.newText) && this.goStep({ id: "Chat" });
    }
  }
};
var kt = function() {
  var t = this, s = t._self._c;
  return s("div", { class: [t.$style.Menu, { [t.$style._chatOpening]: t.isChatOpening, [t.$style._open]: t.isOpen, [t.$style._text]: t.activeText }], on: { mouseenter: t.onMouseEnter, mouseleave: t.onMouseLeave, click: t.onClick } }, [s("div", { ref: "main", class: t.$style.main }, [s("div", { ref: "mainBlur", class: t.$style.mainBlur }), s("Expander", { class: [t.$style.expander, t.$style._weight], attrs: { "is-open": t.isOpen, field: "width", ease: "back.out(1)", duration: 0.5, "hide-size": "48px" } }, [s("div", { ref: "inner", class: t.$style.inner }, [s("div", { class: t.$style.avatarWrap }, [s("Avatar", { attrs: { "has-status": t.isOpen, "status-type": "menu" } })], 1), s("div", { class: t.$style.controls, on: { mouseleave: t.onControlsLeave } }, t._l(t.controls, function(n) {
    return s("div", { key: n.icon, class: [t.$style.control, { [t.$style._notif]: n.step === "Chat" && t.hasNew }], on: { mouseenter: function(i) {
      return t.onControlEnter(n);
    }, click: function(i) {
      return t.goStep(n.step);
    } } }, [s("VIcon", { attrs: { name: n.icon, size: "size-20" } })], 1);
  }), 0)])])], 1), s("transition", { attrs: { name: "widget-sova-appear", mode: "out-in" }, on: { "before-leave": t.onBeforeLeaveText, "before-enter": t.onBeforeEnterText } }, [t.activeText ? s("div", { key: t.activeText, class: [t.$style.text, { [t.$style._link]: t.activeText === t.inviteText || t.activeText === t.newText }], on: { click: t.onTextClick } }, [s("div", { class: t.$style.textBlur }), s("div", { class: t.$style.textInner }, [s("div", { domProps: { innerHTML: t._s(t.activeText) } })])]) : t._e()])], 1);
}, Mt = [];
const b = {
  $style: St
};
function It(e) {
  for (var t in b)
    this[t] = b[t];
}
var Ct = /* @__PURE__ */ u(
  Tt,
  kt,
  Mt,
  !1,
  It,
  null,
  null,
  null
);
const zt = Ct.exports, Ot = "_MainMenu_1tb1b_7", Bt = "_btn_1tb1b_12", Lt = {
  MainMenu: Ot,
  btn: Bt
}, At = {
  name: "MainMenu",
  data() {
    return {
      items: [
        // {
        //     label: 'Оценить сайт',
        //     step: { id: 'Rate' },
        // },
        {
          label: "Звонок",
          step: "Call"
        },
        {
          label: "Whatsapp",
          step: "Whatsapp"
        },
        {
          label: "Telegram",
          step: "Telegram"
        }
      ]
    };
  },
  methods: {}
};
var Vt = function() {
  var t = this, s = t._self._c;
  return s("div", { class: t.$style.MainMenu }, t._l(t.items, function(n) {
    return s("VButton", { key: n.label, class: t.$style.btn, attrs: { color: "base-100" }, on: { click: function(i) {
      return t.$emit("go-step", n.step);
    } } }, [t._v(" " + t._s(n.label) + " ")]);
  }), 1);
}, Wt = [];
const w = {
  $style: Lt
};
function jt(e) {
  for (var t in w)
    this[t] = w[t];
}
var Ft = /* @__PURE__ */ u(
  At,
  Vt,
  Wt,
  !1,
  jt,
  null,
  null,
  null
);
const Ht = Ft.exports, Et = "_Main_1lmob_7", Rt = "_wrapper_1lmob_19", Nt = "_head_1lmob_27", Dt = "_close_1lmob_38", Pt = "_switchBorder_1lmob_54", Xt = "_longSwitch_1lmob_62", qt = "_longSwitchInner_1lmob_74", Gt = "__short_1lmob_85", Yt = "_longSwitchIcn_1lmob_90", Ut = "__long_1lmob_93", Zt = "_componentWrap_1lmob_103", Kt = "_componentHeight_1lmob_108", Jt = "_menu_1lmob_115", Qt = {
  Main: Et,
  wrapper: Rt,
  head: Nt,
  close: Dt,
  switchBorder: Pt,
  longSwitch: Xt,
  longSwitchInner: qt,
  _short: Gt,
  longSwitchIcn: Yt,
  _long: Ut,
  componentWrap: Zt,
  componentHeight: Kt,
  menu: Jt
}, te = {
  name: "Main",
  components: {
    Expander: V,
    MainMenu: Ht
  },
  props: {
    isLoading: {
      type: Boolean,
      default: !1
    },
    history: {
      type: Array,
      required: !0
    },
    value: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    currentStep: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      /** Flags */
      isLong: !1,
      resizeObserver: null
    };
  },
  computed: {
    isShowOptions() {
      return this.currentStep.id === "Options";
    },
    isMenuHidden() {
      return this.isShowOptions || this.currentStep.id === "Chat" && this.history.length;
    },
    isSwitchLong() {
      return this.isLong && !this.isShowOptions;
    },
    isShowSwitch() {
      return (this.currentStep.id === "Chat" || this.currentStep.id === "Options") && this.history.length > 2;
    }
  },
  mounted() {
    this.startObserver();
  },
  beforeDestroy() {
    this.stopObserver();
  },
  methods: {
    switchLong(e) {
      this.$emit("go-step", "Chat"), this.isLong = e;
    },
    startObserver() {
      this.resizeObserver = new ResizeObserver((e) => {
        for (const t of e) {
          const s = t.contentRect.height;
          if (s !== 0) {
            const n = c.timeline();
            n.set(this.$refs.componentWrap, {
              overflow: "hidden"
            }, 0), n.to(this.$refs.componentWrap, {
              height: `${s}px`,
              duration: 0.3
            }, 0), n.set(this.$refs.componentWrap, {
              overflow: ""
            });
          }
        }
      }), this.resizeObserver.observe(this.$refs.componentHeight);
    },
    stopObserver() {
      var e;
      (e = this.resizeObserver) == null || e.unobserve(this.$refs.componentHeight);
    }
  }
};
var ee = function() {
  var t = this, s = t._self._c;
  return s("div", { class: [t.$style.Main] }, [s("div", { class: t.$style.wrapper }, [s("div", { ref: "head", class: t.$style.head }, [s("VButton", { class: t.$style.about, on: { click: function(n) {
    return t.$emit("go-step", "Chat");
  } } }, [t._v("Обо мне")]), s("VIcon", { class: t.$style.close, attrs: { name: "IcCloseCircle", size: "size-20" }, on: { click: function(n) {
    return t.$emit("close");
  } } })], 1), s("transition", { attrs: { name: "widget-sova-fade" } }, [s("div", { directives: [{ name: "show", rawName: "v-show", value: t.isShowSwitch, expression: "isShowSwitch" }], class: t.$style.switchElements }, [s("transition", { attrs: { name: "widget-sova-fade" } }, [s("svg", { directives: [{ name: "show", rawName: "v-show", value: t.isSwitchLong, expression: "isSwitchLong" }], class: t.$style.switchBorder, attrs: { width: "340", height: "64", viewBox: "0 0 340 64", xmlns: "http://www.w3.org/2000/svg" } }, [s("path", { attrs: { d: "M103.318 63.5H0.5V32C0.5 26.3912 0.500389 22.2147 0.770823 18.9048C1.04078 15.6006 1.57734 13.2041 2.62537 11.1472C4.4949 7.47802 7.47802 4.4949 11.1472 2.62537C13.2041 1.57734 15.6006 1.04078 18.9048 0.770823C22.2147 0.500389 26.3912 0.5 32 0.5H308C313.609 0.5 317.785 0.500389 321.095 0.770823C324.399 1.04078 326.796 1.57734 328.853 2.62537C332.522 4.4949 335.505 7.47802 337.375 11.1472C338.423 13.2041 338.959 15.6006 339.229 18.9048C339.5 22.2147 339.5 26.3912 339.5 32V63.5H236.682C233.905 63.5 231.755 62.2646 229.951 60.3577C228.135 58.4371 226.694 55.8604 225.356 53.2331C224.349 51.2574 222.743 49.6511 220.767 48.6444C219.615 48.0576 218.307 47.7767 216.609 47.6379C214.921 47.5 212.804 47.5 210.023 47.5H210H130H129.977C127.196 47.5 125.079 47.5 123.391 47.6379C121.693 47.7767 120.385 48.0576 119.233 48.6444C117.257 49.6511 115.651 51.2574 114.644 53.2331C113.306 55.8604 111.865 58.4371 110.049 60.3577C108.245 62.2646 106.095 63.5 103.318 63.5Z", stroke: "#E1E4EA", fill: "transparent" } })])]), s("div", { class: t.$style.longSwitch, on: { click: function(n) {
    return t.switchLong(!t.isSwitchLong);
  } } }, [s("transition", { attrs: { name: "widget-sova-fade", mode: "out-in" } }, [s("div", { key: t.isSwitchLong, class: [t.$style.longSwitchInner, [t.$style[t.isSwitchLong ? "_short" : "_long"]]] }, [t._v(" " + t._s(t.isSwitchLong ? "Краткий вид" : "История сообщений") + " "), s("VIcon", { class: t.$style.longSwitchIcn, attrs: { name: "IcHistory", size: "size-14" } })], 1)])], 1)], 1)]), s("div", { ref: "componentWrap", class: t.$style.componentWrap }, [s("div", { ref: "componentHeight", class: t.$style.componentHeight }, [s("transition", { attrs: { name: "widget-sova-fade", mode: "out-in" } }, [t.currentStep ? s(t.currentStep.component, { ref: "componentStep", tag: "component", attrs: { "is-long": t.isLong, "is-show-options": t.isShowOptions, "is-loading": t.isLoading, "is-show-switch": t.isShowSwitch, history: t.history, value: t.value, message: t.message }, on: { "go-step": function(n) {
    return t.$emit("go-step", n);
  }, "set-value": function(n) {
    return t.$emit("set-value", n);
  }, "value-click": function(n) {
    return t.$emit("value-click", n);
  }, submit: function(n) {
    return t.$emit("submit");
  }, "repeat-click": function(n) {
    return t.$emit("repeat-click");
  }, "set-rating": function(n) {
    return t.$emit("set-rating", n);
  } } }) : t._e()], 1)], 1)]), s("Expander", { attrs: { "is-open": !t.isMenuHidden } }, [s("MainMenu", { ref: "mainMenu", staticClass: "widget-sova-main-menu", class: t.$style.menu, on: { "go-step": function(n) {
    return t.$emit("go-step", n);
  } } })], 1)], 1)]);
}, se = [];
const x = {
  $style: Qt
};
function ne(e) {
  for (var t in x)
    this[t] = x[t];
}
var ie = /* @__PURE__ */ u(
  te,
  ee,
  se,
  !1,
  ne,
  null,
  null,
  null
);
const oe = ie.exports, ae = "_App_g0f3a_8", re = "__bottom_g0f3a_12", le = "_mainWrap_g0f3a_12", ce = "_avatarWrap_g0f3a_15", ue = "__top_g0f3a_18", pe = "_mainContainer_g0f3a_18", he = "_menu_g0f3a_29", de = "_overlay_g0f3a_42", _e = "__active_g0f3a_71", me = {
  App: ae,
  _bottom: re,
  mainWrap: le,
  avatarWrap: ce,
  _top: ue,
  mainContainer: pe,
  menu: he,
  overlay: de,
  _active: _e
};
const fe = {
  name: "App",
  components: {
    Menu: zt,
    Avatar: A,
    Main: oe
  },
  props: {
    id: {
      type: String,
      default: "00000000-0000-0000-0000-000000000000"
    },
    api: {
      type: String,
      default: "http://185.105.108.90:8000/v1/"
    }
  },
  data() {
    return {
      /** Flags */
      isOpen: !1,
      isLoading: !1,
      hasNew: localStorage.getItem("widgetSovaHasNew") === "true",
      /** Form */
      value: "",
      message: "",
      /** Info */
      history: [],
      animationType: "bottom",
      debouncedResize: F(this.onResize, 100),
      /** Steps */
      stepId: "",
      steps: [
        {
          id: "Chat",
          component: () => import("./Chat-840866a2.js"),
          height: "auto"
        },
        {
          id: "Rate",
          component: () => import("./Rate-4859e6ae.js"),
          height: "284px"
        },
        {
          id: "Call",
          component: () => import("./Call-fbe265cf.js"),
          height: "284px"
        },
        {
          id: "Telegram",
          component: () => import("./Telegram-71748e01.js"),
          height: "284px"
        },
        {
          id: "Whatsapp",
          component: () => import("./Whatsapp-6dd0bd26.js"),
          height: "284px"
        },
        {
          id: "Options",
          component: () => import("./Chat-840866a2.js"),
          height: "auto"
        }
      ]
    };
  },
  computed: {
    currentStep() {
      return this.steps.find((e) => e.id === this.stepId);
    },
    isRelink() {
      return this.stepId === "Call" || this.stepId === "Telegram" || this.stepId === "Whatsapp";
    },
    styleList() {
      return [
        {
          "--primary-100": "#EAF5FF",
          "--primary-200": "#B9DAFF",
          "--primary-300": "#6497FF",
          "--primary-500": "#1F44FF",
          "--primary-600": "#1233EE",
          "--primary-900": "#1431BF"
        }
      ];
    }
  },
  watch: {
    device() {
      this.onClose();
    }
  },
  mounted() {
    this.checkAnimationType(), window.addEventListener("resize", this.debouncedResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.debouncedResize);
  },
  methods: {
    onGoStep(e) {
      this.stepId = e, e === "Chat" && (this.hasNew = !1, localStorage.setItem("widgetSovaHasNew", "false"));
    },
    onResize() {
      this.checkAnimationType();
    },
    async onOpen() {
      this.isOpen = !0, await this.$nextTick(), this.animationType === "top" ? this.openAnimMob() : this.openAnimDesk();
    },
    onClose() {
      this.isOpen = !1, this.animationType === "top" ? this.closeAnimMob() : this.closeAnimDesk();
    },
    /** Анимации */
    checkAnimationType() {
      const e = this.$refs.menu.$el.getBoundingClientRect();
      (e == null ? void 0 : e.top) < window.innerHeight / 2 ? this.animationType = "top" : this.animationType = "bottom";
    },
    openAnimDesk() {
      const t = c.timeline();
      t.to(this.$refs.avatarWrap, {
        opacity: 1
      }), t.to(this.$refs.menu.$el, {
        opacity: 0,
        duration: 0.3
      }, 0), t.to(this.$refs.avatarWrap, {
        duration: 0.4,
        top: "8px",
        left: "50%",
        transform: "scale(1.4) translate(-50%)"
      }, 0), t.to(this.$refs.mainWrap, {
        duration: 0.4,
        transform: "scale(1)"
      }, 0), t.fromTo(this.$refs.main.$refs.head, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      }, 0), t.fromTo(this.$refs.main.$refs.componentWrap, {
        opacity: 0,
        transform: "scale(.8)"
      }, {
        transform: "scale(1)",
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      }, 0), t.fromTo(this.$refs.main.$refs.mainMenu.$el, {
        opacity: 0,
        transform: "scale(.8)"
      }, {
        transform: "scale(1)",
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      }, 0);
    },
    openAnimMob() {
      const t = c.timeline();
      t.to(this.$refs.avatarWrap, {
        opacity: 1
      }), t.set(this.$refs.menu.$el, {
        opacity: 0
      }, 0), t.to(this.$refs.avatarWrap, {
        duration: 0.4,
        top: "8px",
        left: "50%",
        transform: "scale(1.4) translate(-50%)"
      }, 0), t.to(this.$refs.mainContainer, {
        duration: 0.4,
        top: "100%",
        yPercent: -100
      }, 0), t.to(this.$refs.mainWrap, {
        duration: 0.4,
        transform: "scale(1)",
        delay: 0.4
      }, 0), t.fromTo(this.$refs.main.$refs.head, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.3,
        delay: 0.4 * 2
      }, 0), t.fromTo(this.$refs.main.$refs.componentWrap, {
        opacity: 0,
        transform: "scale(.8)"
      }, {
        transform: "scale(1)",
        opacity: 1,
        duration: 0.3,
        delay: 0.4 * 2
      }, 0), t.fromTo(this.$refs.main.$refs.mainMenu.$el, {
        opacity: 0,
        transform: "scale(.8)"
      }, {
        transform: "scale(1)",
        opacity: 1,
        duration: 0.3,
        delay: 0.4 * 2
      }, 0);
    },
    closeAnimDesk() {
      const t = c.timeline();
      t.to(this.$refs.mainWrap, {
        duration: 0.3,
        transform: "scale(0)"
      }, 0), t.to(this.$refs.avatarWrap, {
        duration: 0.3,
        top: "calc(100% - 8px)",
        left: "calc(100% - 8px)",
        transform: "scale(1) translate3d(-100%, -100%, 0)"
      }, 0), t.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 0
      }, 0), t.set(this.$refs.menu.$el, {
        opacity: 1
      }, 0.3), t.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 1
      }, 0.3), t.set(this.$refs.avatarWrap, {
        opacity: 0
      }, 0.3), t.set(this, {
        stepId: ""
      }, 0.3);
    },
    closeAnimMob() {
      const t = c.timeline(), s = this.$refs.menu.$el.getBoundingClientRect();
      t.to(this.$refs.mainWrap, {
        duration: 0.15,
        transform: "scale(0)"
      }, 0), t.to(this.$refs.mainContainer, {
        duration: 0.4 - 0.1,
        top: s == null ? void 0 : s.top,
        yPercent: 0
      }, 0.1), t.to(this.$refs.avatarWrap, {
        duration: 0.4 - 0.1,
        top: 8,
        left: "calc(100% - 20px)",
        transform: "scale(1) translate3d(-100%, 0, 0)"
      }, 0.1), t.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 0
      }, 0), t.set(this.$refs.menu.$el, {
        opacity: 1
      }, 0.4), t.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 1
      }, 0.4), t.set(this.$refs.avatarWrap, {
        opacity: 0
      }, 0.4), t.set(this, {
        stepId: ""
      }, 0.4), t.set(this.$refs.mainContainer, {
        top: ""
      }, 0.4);
    },
    /** Конец Анимации */
    /** Чат */
    async onSubmit() {
      if (this.isLoading) {
        this.message = "Отправить сообщение можно после получения ответа";
        return;
      }
      if (!this.value)
        return;
      this.isLoading = !0;
      const e = this.value;
      this.value = "", this.message = "";
      const t = String(Math.random());
      this.history.push({ id: t, type: "question", text: e, date: "Tue Mar 21 2023 11:23:58 GMT+0300" });
      try {
        const s = await this.getAnswer(e);
        console.log("res", s), s.type = "answer", this.history.push(s), this.message = "", this.history.length === 2 && (this.message = "Не тот ответ? Попробуйте переформулировать вопрос"), this.isOpen || (this.hasNew = !0, localStorage.setItem("widgetSovaHasNew", "true"));
      } catch (s) {
        console.warn("[Chat/onSubmit] error: ", s), this.history.push({ id: "error", type: "answer", text: "Упс… Произошла ошибка!<br><br>Попробуйте отправить сообщение<br>снова, а я пока расскажу анекдот:<br><br>«Что делает кофе, прежде чем попадет<br>в пачку? Молится»", date: "Tue Mar 21 2023 11:23:58 GMT+0300" });
      }
      this.isLoading = !1;
    },
    getAnswer(e) {
      const t = {
        company_id: this.id,
        question: e,
        user_id: 1
      };
      return fetch(`${this.api}messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(t)
      }).then((s) => s.json());
    },
    onValueClick(e) {
      this.value = e, this.onSubmit();
    },
    onRepeat() {
      this.history.pop();
      const e = this.history.pop();
      this.value = e.text, this.onSubmit();
    },
    onSetRating({ value: e, item: t }) {
      const s = this.history.findIndex((n) => n.id === t.id);
      this.history.splice(s, 1, { ...t, rating: e });
    }
    /** Конец Чата */
  }
};
var ve = function() {
  var t = this, s = t._self._c;
  return s("my-widget", { class: [t.$style.App, t.$style[`_${t.animationType}`]], style: t.styleList }, [s("transition", { attrs: { name: "fade" } }, [s("div", { directives: [{ name: "show", rawName: "v-show", value: t.stepId, expression: "stepId" }], class: t.$style.overlay, on: { click: t.onClose } })]), s("Menu", { ref: "menu", staticClass: "widget-sova-app__menu", class: t.$style.menu, attrs: { "is-main-open": t.isOpen, "has-new": t.hasNew }, on: { open: t.onOpen, "go-step": t.onGoStep } }), s("div", { ref: "mainContainer", class: [t.$style.mainContainer, { [t.$style._active]: t.stepId }] }, [t.stepId ? s("div", { ref: "mainWrap", class: t.$style.mainWrap }, [s("Main", { ref: "main", class: t.$style.main, attrs: { "current-step": t.currentStep, "is-loading": t.isLoading, history: t.history, value: t.value, message: t.message }, on: { close: t.onClose, "go-step": t.onGoStep, "set-value": function(n) {
    t.value = n;
  }, "value-click": t.onValueClick, submit: t.onSubmit, "repeat-click": t.onRepeat, "set-rating": t.onSetRating } })], 1) : t._e(), s("div", { ref: "avatarWrap", class: t.$style.avatarWrap }, [s("Avatar", { ref: "avatar", attrs: { "status-type": "chat", "has-status": t.isOpen, "show-pic": t.isRelink && t.isOpen } })], 1)])], 1);
}, ye = [];
const S = {
  $style: me
};
function $e(e) {
  for (var t in S)
    this[t] = S[t];
}
var ge = /* @__PURE__ */ u(
  fe,
  ve,
  ye,
  !1,
  $e,
  null,
  null,
  null
);
const be = ge.exports;
const _ = (e) => e < 10 ? `0${e}` : e;
function we(e) {
  return isNaN(e) ? e : (e = Math.floor(Number(e)), (e < 0 ? "-" : "") + e.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " "));
}
const T = (e, t) => t ? [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс"
][e] : [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресение"
][e], m = (e, t, s) => {
  const n = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ], i = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
  ], r = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек"
  ];
  return t ? r[e] : s ? i[e] : n[e];
}, xe = (e) => !isNaN(Date.parse(e)), Se = (e, t) => {
  if (!e)
    return "";
  const s = xe(e) ? new Date(e) : new Date(), n = {
    // Date
    $d: _(s.getDate()),
    // Day of the month, 2 digits with leading zeros. // '01' to '31'
    $j: s.getDate(),
    // Day of the month without leading zeros. // '1' to '31'
    // Days of the week
    $D: T(s.getDay(), !0),
    // Day of the week, textual, 3 letters. // 'Пн', 'Вт'
    $l: T(s.getDay()),
    // Day of the week, textual, long. // 'Пятница'
    // Month
    $m: _(s.getMonth() + 1),
    // Month, 2 digits with leading zeros. // '01' to '12'
    $n: s.getMonth() + 1,
    // Month without leading zeros. // '1' to '12'
    $M: m(s.getMonth(), !0),
    // Month, textual, 3 letters. // 'Янв'
    $b: m(s.getMonth(), !0).toLowerCase(),
    // Month, textual, 3 letters, lowercase. // 'янв'
    $F: m(s.getMonth()),
    // Month, textual, long. // 'Январь'
    $E: m(s.getMonth(), !1, !0),
    // Month, plural, long. // 'Января'
    $e: m(s.getMonth(), !1, !0).toLowerCase(),
    // Month, plural, long, lowercase // 'января'
    // Year
    $y: s.getFullYear(),
    // Year, 4 digits. // 1993
    // Time
    // Hours
    $g: Math.floor(s.getHours() / 2),
    // Hour, 12-hour format without leading zeros. // '1' to '12'
    $G: s.getHours(),
    // Hour, 24-hour format without leading zeros. // '0' to '23'
    $h: _(Math.floor(s.getHours() / 2)),
    // Hour, 12-hour format. // '01' to '12'
    $H: _(s.getHours()),
    // Hour, 24-hour format. // '01' to '23'
    // Minutes
    $i: s.getMinutes(),
    // Minutes, without leading zeros. // '1' to '59'
    $I: _(s.getMinutes()),
    // Minutes. // '01' to '59'
    // Seconds
    $s: s.getSeconds(),
    // Seconds, without leading zeros. // '1' to '59'
    $S: _(s.getSeconds())
    // Seconds. // '1' to '59'
  }, i = t.match(/[$][a-zA-Z]/gm);
  let r = t;
  return i.forEach((o) => {
    r = r.replace(o, n[o]);
  }), r;
}, Te = (e) => {
  const t = new e(), s = {
    mobile: 768,
    tablet: 1024,
    laptop: 1280,
    desktop: 1440,
    "large-desktop": 999999
  }, n = () => {
    for (const i in s)
      if (window.innerWidth < s[i]) {
        t.$emit("update", i);
        return;
      }
  };
  window.addEventListener("resize", n), e.mixin({
    data() {
      return {
        device: "large-desktop"
      };
    },
    mounted() {
      t.$on("update", (i) => {
        this.device = i;
      }), n();
    }
  });
}, ke = { install: Te }, Me = (e, t) => {
  const s = e[t];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((n, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + t)));
  });
}, Ie = "_VIcon_10wm4_7", Ce = {
  VIcon: Ie,
  "_size-20": "__size-20_10wm4_10",
  "_size-16": "__size-16_10wm4_14",
  "_size-14": "__size-14_10wm4_18",
  "_size-12": "__size-12_10wm4_22"
}, ze = {
  name: "VIcon",
  props: {
    name: {
      type: String,
      required: !0
    },
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    classList() {
      return [
        {
          [this.$style[`_${this.size}`]]: this.size
        }
      ];
    },
    component() {
      return () => Me(/* @__PURE__ */ Object.assign({ "../../icons/IcCloseCircle.vue": () => import("./IcCloseCircle-8439a0b5.js"), "../../icons/IcHistory.vue": () => import("./IcHistory-a7515e23.js"), "../../icons/IcLike.vue": () => import("./IcLike-23585163.js"), "../../icons/IcMenu.vue": () => import("./IcMenu-93790b3b.js"), "../../icons/IcMessage.vue": () => import("./IcMessage-a116aa73.js"), "../../icons/IcPhone.vue": () => import("./IcPhone-f25fb4e2.js"), "../../icons/IcRate.vue": () => import("./IcRate-32d0fd3a.js"), "../../icons/IcRateFinish.vue": () => import("./IcRateFinish-cd14c0a8.js"), "../../icons/IcSend.vue": () => import("./IcSend-488c220a.js") }), `../../icons/${this.name}.vue`);
    }
  }
};
var Oe = function() {
  var t = this, s = t._self._c;
  return s(t.component, { tag: "component", staticClass: "v-icon", class: [t.$style.VIcon, ...t.classList], nativeOn: { click: function(n) {
    return t.$emit("click");
  } } });
}, Be = [];
const k = {
  $style: Ce
};
function Le(e) {
  for (var t in k)
    this[t] = k[t];
}
var Ae = /* @__PURE__ */ u(
  ze,
  Oe,
  Be,
  !1,
  Le,
  null,
  null,
  null
);
const Ve = Ae.exports, We = "_VButton_1prz2_7", je = "__disabled_1prz2_52", Fe = {
  VButton: We,
  "_size-40": "__size-40_1prz2_19",
  "_size-24": "__size-24_1prz2_28",
  "_primary-100": "__primary-100_1prz2_37",
  _disabled: je,
  "_base-100": "__base-100_1prz2_56"
}, He = {
  name: "VButton",
  props: {
    size: {
      type: String,
      default: "size-24"
    },
    color: {
      type: String,
      default: "primary-100"
    },
    href: {
      type: String,
      default: ""
    },
    blank: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {};
  },
  computed: {
    classList() {
      return [
        {
          [this.$style[`_${this.size}`]]: this.size,
          [this.$style[`_${this.color}`]]: this.color,
          [this.$style._disabled]: this.disabled
        }
      ];
    },
    component() {
      return this.href ? "a" : "button";
    },
    linkProperties() {
      const e = {};
      return this.href && (e.href = this.href), this.blank && (e.target = "_blank"), e;
    }
  },
  methods: {}
};
var Ee = function() {
  var t = this, s = t._self._c;
  return s(t.component, t._g(t._b({ tag: "component", class: [t.$style.VButton, ...t.classList] }, "component", t.linkProperties, !1), t.$listeners), [t._t("default")], 2);
}, Re = [];
const M = {
  $style: Fe
};
function Ne(e) {
  for (var t in M)
    this[t] = M[t];
}
var De = /* @__PURE__ */ u(
  He,
  Ee,
  Re,
  !1,
  Ne,
  null,
  null,
  null
);
const Pe = De.exports, Xe = "_VButtonIcon_14k1m_7", qe = "__rotate_14k1m_19", Ge = "_icon_14k1m_19", Ye = "__disabled_14k1m_42", Ue = {
  VButtonIcon: Xe,
  _rotate: qe,
  icon: Ge,
  "_size-20": "__size-20_14k1m_22",
  "_base-100": "__base-100_14k1m_27",
  _disabled: Ye,
  "_primary-500": "__primary-500_14k1m_46"
}, Ze = {
  name: "VButtonIcon",
  props: {
    name: {
      type: String,
      required: !0
    },
    size: {
      type: String,
      default: "size-20"
    },
    color: {
      type: String,
      default: "base-100"
    },
    iconSize: {
      type: String,
      default: "size-20"
    },
    href: {
      type: String,
      default: ""
    },
    blank: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    rotate: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {};
  },
  computed: {
    classList() {
      return [
        {
          [this.$style[`_${this.size}`]]: this.size,
          [this.$style[`_${this.color}`]]: this.color,
          [this.$style._disabled]: this.disabled,
          [this.$style._rotate]: this.rotate
        }
      ];
    },
    component() {
      return this.href ? "a" : "button";
    },
    linkProperties() {
      const e = {};
      return this.href && (e.href = this.href), this.blank && (e.target = "_blank"), e;
    }
  },
  methods: {}
};
var Ke = function() {
  var t = this, s = t._self._c;
  return s(t.component, t._g(t._b({ tag: "component", class: [t.$style.VButtonIcon, ...t.classList] }, "component", t.linkProperties, !1), t.$listeners), [s("VIcon", { class: t.$style.icon, attrs: { name: t.name, size: t.iconSize } })], 1);
}, Je = [];
const I = {
  $style: Ue
};
function Qe(e) {
  for (var t in I)
    this[t] = I[t];
}
var ts = /* @__PURE__ */ u(
  Ze,
  Ke,
  Je,
  !1,
  Qe,
  null,
  null,
  null
);
const es = ts.exports, C = {
  "#": { pattern: /\d/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[0-9a-zA-Z]/ },
  U: { pattern: /[a-zA-Z]/, transform: (e) => e.toLocaleUpperCase() },
  L: { pattern: /[a-zA-Z]/, transform: (e) => e.toLocaleLowerCase() }
}, ss = [
  "phone",
  "date",
  "time",
  "number",
  "snils",
  "inn",
  "passport",
  "payment",
  "code",
  "percent",
  "year",
  "month"
], ns = {
  phone: "+7 (###) ###-##-##",
  date: "##/##/####",
  time: "##:##",
  number: "##########",
  snils: "###-###-### ##",
  inn: "############",
  passport: "#### ######",
  payment: "#### #### #### ####",
  percent: "####",
  year: "####",
  pin: "####",
  months: "####"
};
function f(e, t, s = !0) {
  let n = 0, i = 0, r = "";
  for (; n < t.length && i < e.length; ) {
    let o = t[n];
    const l = C[o], a = e[i];
    l ? (l.pattern.test(a) && (r += l.transform ? l.transform(a) : a, n++), i++) : (l && (n++, o = t[n]), s && (r += o), a === o && i++, n++);
  }
  for (; n < t.length; ) {
    const o = t[n];
    if (C[o])
      break;
    n++;
  }
  return r;
}
function z(e, t) {
  e === document.activeElement && (e.setSelectionRange(t, t), setTimeout(() => {
    e.setSelectionRange(t, t);
  }, 0));
}
const is = "_VInput_9sn78_7", os = "__medium_9sn78_14", as = "__showLabel_9sn78_14", rs = "__active_9sn78_14", ls = "__keep_9sn78_14", cs = "_label_9sn78_14", us = "_premask_9sn78_18", ps = "_native_9sn78_20", hs = "__base_9sn78_28", ds = "_inner_9sn78_43", _s = "_border_9sn78_55", ms = "__focused_9sn78_58", fs = "__success_9sn78_61", vs = "__error_9sn78_65", ys = "__disabled_9sn78_69", $s = "_nativeSelect_9sn78_73", gs = "_icon_9sn78_135", bs = {
  VInput: is,
  _medium: os,
  _showLabel: as,
  _active: rs,
  _keep: ls,
  label: cs,
  premask: us,
  native: ps,
  _base: hs,
  inner: ds,
  border: _s,
  _focused: ms,
  _success: fs,
  _error: vs,
  _disabled: ys,
  nativeSelect: $s,
  icon: gs
}, O = 35, B = 70, ws = {
  name: "VInput",
  props: {
    /**
     * Определяет классы, которые будут модифицировать размер
     */
    size: {
      type: String,
      default: "medium"
    },
    /**
     * Определяет классы, которые будут модифицировать цвет
     */
    color: {
      type: String,
      default: "base"
    },
    /**
     * Тип, для передачи в атрибуты нативного инпута
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Текущее введёное значение
     */
    value: {
      type: String,
      default: ""
    },
    /**
     * Даёт возможность отключить autocomplete при вводе
     */
    autocomplete: {
      type: Boolean,
      default: !0
    },
    /**
     * Лейбл инпута
     */
    label: {
      type: String,
      default: ""
    },
    /**
     * Позволяет отображать лейбл после ввода
     */
    keepLabel: {
      type: Boolean,
      default: !0
    },
    /**
     * Сообщение пользователю, может использоваться для валидации
     */
    msg: {
      type: String,
      default: ""
    },
    /**
     * Параметр маски инпута, если необходим
     * @values phone, date, time, number, snils, inn, passport, payment, percent, year, pin, months
     */
    mask: {
      type: String,
      default: ""
    },
    /**
     * Отображение маску при вводе
     */
    premask: {
      type: Boolean,
      default: !0
    },
    /**
     * Если активно, то при эмите, данные будут переданы с учётом активной маски.
     * Т.е. если в инпуте компонента +7 (999) 00-00-00, то без этого параметра,
     * будет передано 9990000. Включено по-умолчанию, для валидации
     */
    keepMasked: {
      type: Boolean,
      default: !0
    },
    /**
     * Модификатор вида с бордером
     */
    error: Boolean,
    /**
     * Это свойство отключает взаимодействие
     */
    disabled: Boolean
  },
  data() {
    return {
      isFocused: !1,
      currentMask: "",
      /** Border */
      mouseTween: null,
      roundTween: null,
      focusTween: null,
      borderX: 0,
      borderY: 0,
      borderXSize: `${O}%`,
      borderYSize: `${B}%`
    };
  },
  computed: {
    classList() {
      return {
        [this.$style[`_${this.color}`]]: this.size,
        [this.$style[`_${this.size}`]]: this.size,
        [this.$style._focused]: this.isFocused,
        [this.$style._active]: this.value || this.isFocused,
        [this.$style._disabled]: this.disabled,
        [this.$style._error]: this.error,
        [this.$style._showLabel]: Boolean(this.label),
        [this.$style._keep]: this.keepLabel,
        [this.$style._success]: this.mask && !this.error && this.currentMask.length === this.inputValue.length
      };
    },
    inputValue() {
      return this.mask ? f(this.value, this.currentMask) : this.value;
    },
    currentPremask() {
      if (!this.mask)
        return "";
      if (this.inputValue.length) {
        const e = new RegExp("^.{0," + this.inputValue.length + "}", "g");
        return this.currentMask.replace(e, `<span>${this.inputValue}</span>`).replace(/#/g, "&ensp;");
      } else
        return this.currentMask.replace(/#/g, "&ensp;");
    },
    attributes() {
      const e = {
        ...this.$attrs,
        type: "text",
        disabled: this.disabled
      };
      return this.label && (e.ariaLabel = this.label), this.mask && (e.maxlength = this.currentMask.length), this.type && (this.mask ? e.type = ss.includes(this.mask) ? "tel" : "text" : e.type = this.type), this.autocomplete || (e.autocomplete = "off"), e;
    },
    borderStyle() {
      return [
        {
          maskImage: `radial-gradient(${this.borderXSize} ${this.borderYSize} at ${this.borderX}% ${this.borderY}%, black 60%, transparent)`
        }
      ];
    }
  },
  created() {
    if (this.mask)
      try {
        if (this.currentMask = ns[this.mask], !this.currentMask)
          throw new Error(`VInput: mask-utils: mask ${this.mask} not found`);
      } catch (e) {
        console.log(e);
      }
  },
  mounted() {
    this.tweenAround(), window.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onMouseMove), this.stopTweenAround(), this.stopTweenOnMouse();
  },
  methods: {
    /**
     * Эмитит новые значения в родительский компонент.
     * Используется для валидации.
     * @returns {String} e.target.value Введёный текст
     * @public
     */
    onInput(e) {
      if (this.mask) {
        let t = e.target.selectionEnd;
        const s = e.target.value[t - 1];
        if (this.mask === "phone" && e.target.value.charAt(0) == 8 && (e.target.value = "+7"), e.target.value = f(e.target.value, this.currentMask), t !== 0)
          for (; t < e.target.value.length && e.target.value.charAt(t - 1) !== s; )
            t++;
        if (z(e.target, t), this.mask === "percent" ? (e.target.value === "00" && (e.target.value = 1), e.target.value = e.target.value > 100 ? "100%" : e.target.value + "%") : this.mask === "months" && e.target.value > 360 && (e.target.value = 360), e.target.value !== this.inputValue) {
          const n = this.keepMasked ? e.target.value : f(e.target.value, this.currentMask, !1);
          this.$emit("input", n);
          return;
        }
      }
      this.$emit("input", e.target.value);
    },
    /**
     * Метод, который обрабатывает событие focus на инпуте
     * @public
     */
    onFocus(e) {
      this.isFocused = !0, this.tweenOnFocus(), this.mask && this.mask === "phone" && !this.inputValue && this.$nextTick(() => {
        z(e.target, this.inputValue.length);
      }), this.$emit("focus", e);
    },
    /**
     * Метод, который обрабатывает событие blur на инпуте
     * @public
     */
    onBlur(e) {
      this.isFocused = !1, this.tweenOnFocus({ reverse: !0, onComplete: this.device === "mobile" ? this.tweenAround : null }), this.$emit("blur", e), this.mask && this.mask === "phone" && (this.inputValue === "+" || this.inputValue === "+7") && this.$emit("input", "");
    },
    async onKeyDown(e) {
      e.keyCode === 13 && setTimeout(() => {
        this.$refs.input.blur();
      }, 500);
    },
    onMouseMove(e) {
      var n;
      if (this.device === "mobile")
        return;
      const t = (n = this.$refs.border) == null ? void 0 : n.getBoundingClientRect(), s = 30;
      t.left - s < e.clientX && t.right + s > e.clientX && t.top - s < e.clientY && t.bottom + s > e.clientY ? this.tweenOnMouse(e, t) : this.tweenAround();
    },
    tweenAround() {
      if (this.roundTween || this.value || this.isFocused)
        return;
      this.stopTweenOnMouse();
      const e = [{ x: 80, y: 0, duration: 0.4 }, { x: 110, y: 50, duration: 0.4 }, { x: 80, y: 100, duration: 0.5 }, { x: 50, y: 130, duration: 0.4 }, { x: 20, y: 100, duration: 0.4 }, { x: -10, y: 50, duration: 0.4 }, { x: 20, y: 0, duration: 0.5 }, { x: 50, y: -30, duration: 0.4 }], t = c.timeline(), s = {
        x: this.borderX,
        y: this.borderY
      }, n = e.findIndex((l) => this.borderY > 50 ? l.x < this.borderX && l.y >= 50 : l.x > this.borderX && l.y <= 50), i = e.slice(n);
      i[0].duration = 0.6, i.forEach((l) => {
        t.to(s, {
          ...l,
          onUpdate: () => {
            this.borderX = s.x, this.borderY = s.y;
          },
          ease: "none"
        });
      });
      const r = c.timeline({
        repeat: -1
      }), o = {
        x: 50,
        y: -30
      };
      e.forEach((l) => {
        r.to(o, {
          ...l,
          onUpdate: () => {
            this.borderX = o.x, this.borderY = o.y;
          },
          ease: "none"
        });
      }), this.roundTween = c.timeline(), this.roundTween.add(t), this.roundTween.add(r);
    },
    tweenOnMouse(e, t) {
      if (this.isFocused)
        return;
      this.stopTweenAround();
      const s = (e.clientX - t.left) / t.width * 100, n = (e.clientY - t.top) / t.height * 100, i = {
        x: this.borderX,
        y: this.borderY
      }, o = {
        duration: 1,
        ...{
          x: s,
          y: n
        },
        onUpdate: () => {
          this.borderX = i.x, this.borderY = i.y;
        },
        ease: "power3.out"
      };
      this.mouseTween = c.to(i, o);
    },
    tweenOnFocus(e = {}) {
      this.stopTweenAround(), this.stopTweenOnMouse(), this.stopTweenFocus();
      const t = {
        x: parseInt(this.borderXSize, 10),
        y: parseInt(this.borderYSize, 10)
      }, n = {
        duration: 1.5,
        ...{
          x: e.reverse ? O : 200,
          y: e.reverse ? B : 200
        },
        onUpdate: () => {
          this.borderXSize = `${t.x}%`, this.borderYSize = `${t.y}%`;
        },
        onComplete: e.onComplete,
        ease: "power3.out"
      };
      this.focusTween = c.to(t, n);
    },
    stopTweenOnMouse() {
      var e;
      (e = this.mouseTween) == null || e.kill(), this.mouseTween = null;
    },
    stopTweenAround() {
      var e;
      (e = this.roundTween) == null || e.kill(), this.roundTween = null;
    },
    stopTweenFocus() {
      var e;
      (e = this.focusTween) == null || e.kill(), this.focusTween = null;
    }
  }
};
var xs = function() {
  var t = this, s = t._self._c;
  return s("div", { class: [t.$style.VInput, t.classList] }, [s("div", { ref: "inner", class: t.$style.inner }, [s("input", t._b({ ref: "input", class: t.$style.native, attrs: { "aria-label": t.label, tabindex: 0 }, domProps: { value: t.inputValue }, on: { keydown: t.onKeyDown, blur: t.onBlur, focus: t.onFocus, input: t.onInput } }, "input", t.attributes, !1)), s("div", { ref: "border", class: t.$style.border, style: t.borderStyle }), t.premask ? s("div", { class: t.$style.premask, domProps: { innerHTML: t._s(t.currentPremask) } }) : t._e()]), s("span", { class: t.$style.label }, [t._v(" " + t._s(t.label) + " ")]), s("transition", { attrs: { name: "widget-sova-fade" } }, [t.msg ? s("InputHint", { attrs: { color: t.color } }, [t._v(" " + t._s(t.msg) + " ")]) : t._e()], 1)], 1);
}, Ss = [];
const L = {
  $style: bs
};
function Ts(e) {
  for (var t in L)
    this[t] = L[t];
}
var ks = /* @__PURE__ */ u(
  ws,
  xs,
  Ss,
  !1,
  Ts,
  null,
  null,
  null
);
const Ms = ks.exports, Is = () => {
  const e = document.createElement("div");
  document.body.appendChild(e), h.filter("splitThousands", we), h.filter("formatDateTime", Se), h.component("VIcon", Ve), h.component("VButton", Pe), h.component("VButtonIcon", es), h.component("VInput", Ms), h.config.ignoredElements = ["my-widget"], h.use(ke);
  const s = document.querySelector("#widget-sova").dataset.id;
  new h({
    el: e,
    components: {
      App: be
    },
    props: {
      id: s
    },
    data() {
      return {};
    },
    template: '<App :id="id" />'
  });
};
document.addEventListener("DOMContentLoaded", Is());
export {
  V as E,
  u as n
};
