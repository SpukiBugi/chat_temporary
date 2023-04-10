import p from "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js";
import { gsap as u } from "https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm";
function X(t, e, s) {
  let n;
  return function() {
    const o = this, a = arguments;
    function l() {
      n = null, s || t.apply(o, a);
    }
    const r = s && !n;
    clearTimeout(n), n = setTimeout(l, e), r && t.apply(o, a);
  };
}
function G() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Y = {
  methods: {
    checkAnimationType() {
      const t = this.$refs.menu.$el.getBoundingClientRect();
      (t == null ? void 0 : t.top) < window.innerHeight / 2 ? this.animationType = "top" : this.animationType = "bottom";
    },
    openAnimBottom() {
      var s, n;
      const e = u.timeline();
      e.to(this.$refs.avatarWrap, {
        opacity: 1
      }, 0), e.to(this.$refs.menu.$el, {
        opacity: 0,
        duration: 0.3
      }, 0), e.to(this.$refs.mainWrap, {
        duration: 0.4,
        transform: "scale(1)",
        transformOrigin: "100% 100%"
      }, 0), e.to(this.$refs.avatarWrap, {
        duration: 0.4,
        top: "8px",
        left: "50%",
        transform: "scale(1.34) translate(-50%)"
      }, 0), e.fromTo((s = this.$refs.main) == null ? void 0 : s.$refs.head, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      }, 0), e.fromTo((n = this.$refs.main) == null ? void 0 : n.$refs.componentWrap, {
        opacity: 0,
        transform: "scale(.8)"
      }, {
        transform: "scale(1)",
        opacity: 1,
        duration: 0.3,
        delay: 0.4
      }, 0), e.set(this, {
        hasStatus: !0
      }, 0);
    },
    openAnimTop() {
      var s, n;
      const e = u.timeline();
      e.to(this.$refs.avatarWrap, {
        opacity: 1
      }, 0), e.set(this.$refs.menu.$el, {
        opacity: 0
      }, 0), e.to(this.$refs.mainWrap, {
        duration: 0.4,
        transform: "scale(1)",
        transformOrigin: "50% 40px",
        delay: 0.4
      }, 0), e.to(this.$refs.mainContainer, {
        duration: 0.4,
        top: this.history.length ? 12 : "100%",
        yPercent: this.history.length ? 0 : -100
      }, 0), e.to(this.$refs.avatarWrap, {
        duration: 0.4,
        top: 0,
        left: "50%",
        y: 8,
        transform: "scale(1.34) translateX(-50%)"
      }, 0), e.fromTo((s = this.$refs.main) == null ? void 0 : s.$refs.head, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.3,
        delay: 0.4 * 2
      }, 0), e.fromTo((n = this.$refs.main) == null ? void 0 : n.$refs.componentWrap, {
        opacity: 0,
        transform: "scale(.8)"
      }, {
        transform: "scale(1)",
        opacity: 1,
        duration: 0.3,
        delay: 0.4 * 2
      }, 0), e.set(this, {
        hasStatus: !0
      }, 0.4);
    },
    closeAnimBottom() {
      var n, i;
      const s = u.timeline();
      s.to((n = this.$refs.main) == null ? void 0 : n.$refs.head, {
        opacity: 0,
        duration: 0.1
      }, 0), s.to((i = this.$refs.main) == null ? void 0 : i.$refs.componentWrap, {
        transform: "scale(.8)",
        opacity: 0,
        duration: 0.1
      }, 0), s.set(this, {
        hasStatus: !1
      }, 0), s.to(this.$refs.mainWrap, {
        duration: 0.4 - 0.1 / 2,
        transform: "scale(0)",
        transformOrigin: `${this.$refs.mainWrap.clientWidth - 30}px ${this.$refs.mainWrap.clientHeight - 30}px`
      }, 0.1), s.to(this.$refs.avatarWrap, {
        duration: 0.4 - 0.1 / 2,
        top: "calc(100% - 8px)",
        left: "calc(100% - 8px)",
        transform: "scale(1) translate3d(-100%, -100%, 0)"
      }, 0.1), s.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 0
      }, 0.1), s.set(this.$refs.menu.$el, {
        opacity: 1
      }, 0.4), s.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 1
      }, 0.4), s.set(this.$refs.avatarWrap, {
        opacity: 0
      }, 0.4), s.set(this, {
        stepId: ""
      }, 0.4);
    },
    closeAnimTop() {
      var o, a;
      const n = u.timeline(), i = this.$refs.menu.$el.getBoundingClientRect();
      n.to((o = this.$refs.main) == null ? void 0 : o.$refs.head, {
        opacity: 0,
        duration: 0.1
      }, 0), n.to((a = this.$refs.main) == null ? void 0 : a.$refs.componentWrap, {
        transform: "scale(.8)",
        opacity: 0,
        duration: 0.1
      }, 0), n.set(this, {
        hasStatus: !1
      }, 0), n.to(this.$refs.mainWrap, {
        duration: 0.15,
        transform: "scale(0)",
        transformOrigin: "50% 40px"
      }, 0.1 - 0.1), n.to(this.$refs.mainContainer, {
        duration: 0.5 - (0.1 + 0.15),
        top: i == null ? void 0 : i.top,
        yPercent: 0,
        onComplete: () => this.$refs.mainContainer.style.top = ""
      }, 0.1 - 0.1 + 0.15), n.to(this.$refs.avatarWrap, {
        duration: 0.5 - (0.1 + 0.15),
        top: 0,
        left: "calc(100% - 20px)",
        y: 8,
        xPercent: -100,
        transform: "scale(1)"
      }, 0.1 - 0.1 + 0.15), n.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 0
      }, 0), n.set(this.$refs.menu.$el, {
        opacity: 1
      }, 0.5), n.set(this.$refs.menu.$refs.mainBlur, {
        opacity: 1
      }, 0.5), n.set(this.$refs.avatarWrap, {
        opacity: 0
      }, 0.5), n.set(this, {
        stepId: ""
      }, 0.5);
    }
  }
}, v = {
  messages: "messages",
  feedbacks: "feedbacks",
  history: "messages/history"
};
function U(t) {
  let e = "?";
  for (const s in t)
    (t[s] || t[s] === 0 || t[s] === !1) && (Array.isArray(t[s]) ? e += `${s}=${t[s]}&` : e += `${s}=${t[s]}&`);
  return e.slice(0, -1);
}
const Z = "https://spukibugi.github.io/chat_temporary/bot.mp4", J = "https://spukibugi.github.io/chat_temporary/fanera.jpg", K = "https://spukibugi.github.io/chat_temporary/smile.png", Q = "_Avatar_1piwa_7", ee = "__smile_1piwa_13", te = "_smile_1piwa_13", se = "_smileImgWrap_1piwa_16", ne = "_smileImg_1piwa_16", ie = "_status_1piwa_22", oe = "__visible_1piwa_41", ae = "_videoWrap_1piwa_46", re = "_video_1piwa_46", le = "_image_1piwa_57", ce = {
  Avatar: Q,
  _smile: ee,
  smile: te,
  smileImgWrap: se,
  smileImg: ne,
  status: ie,
  _visible: oe,
  videoWrap: ae,
  video: re,
  image: le
};
function c(t, e, s, n, i, o, a, l) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = s, r._compiled = !0), n && (r.functional = !0), o && (r._scopeId = "data-v-" + o);
  var d;
  if (a ? (d = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), i && i.call(this, h), h && h._registeredComponents && h._registeredComponents.add(a);
  }, r._ssrRegister = d) : i && (d = l ? function() {
    i.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), d)
    if (r.functional) {
      r._injectStyles = d;
      var N = r.render;
      r.render = function(q, b) {
        return d.call(b), N(q, b);
      };
    } else {
      var $ = r.beforeCreate;
      r.beforeCreate = $ ? [].concat($, d) : [d];
    }
  return {
    exports: t,
    options: r
  };
}
const ue = {
  name: "Avatar",
  props: {
    hasStatus: {
      type: Boolean,
      default: !1
    },
    hasSmile: {
      type: Boolean,
      default: !1
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
var he = function() {
  var e = this, s = e._self._c;
  return s("div", { class: [e.$style.Avatar, { [e.$style._smile]: e.hasSmile }] }, [s("div", { class: e.$style.videoWrap }, [s("video", { class: e.$style.video, attrs: { autoplay: "", loop: "", playsinline: "", muted: "" }, domProps: { muted: !0 } }, [s("source", { attrs: { src: Z, type: "video/mp4" } })]), s("transition", { attrs: { name: "widget-sova-fade-in" } }, [e.showPic ? s("img", { class: e.$style.image, attrs: { src: J, alt: "avatar" } }) : e._e()])], 1), s("div", { ref: "status", class: [e.$style.status, { [e.$style._visible]: e.hasStatus }] }), s("keep-alive", [e.hasSmile ? s("div", { class: e.$style.smile }, [s("div", { class: e.$style.smileImgWrap }, [s("img", { class: e.$style.smileImg, attrs: { src: K, alt: "smile" } })])]) : e._e()])], 1);
}, pe = [];
const w = {
  $style: ce
};
function de(t) {
  for (var e in w)
    this[e] = w[e];
}
var _e = /* @__PURE__ */ c(
  ue,
  he,
  pe,
  !1,
  de,
  null,
  null,
  null
);
const j = _e.exports, me = "_expander_kori7_7", fe = {
  expander: me
}, ve = {
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
      this.changing = !0, this.isOpen ? u.to(this.$el, {
        duration: this.duration,
        delay: this.enterDelay,
        [this.field]: "auto",
        ease: this.ease,
        onComplete: () => {
          this.changing = !1;
        }
      }) : u.to(this.$el, {
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
var ye = function() {
  var e = this, s = e._self._c;
  return s("div", { class: [e.$style.expander, { _hidden: !e.isOpen, _changing: e.changing }], style: { [e.field]: e.premountSize } }, [e._t("default")], 2);
}, ge = [];
const k = {
  $style: fe
};
function $e(t) {
  for (var e in k)
    this[e] = k[e];
}
var be = /* @__PURE__ */ c(
  ve,
  ye,
  ge,
  !1,
  $e,
  null,
  null,
  null
);
const g = be.exports, we = "_Menu_1u9ym_7", ke = "__open_1u9ym_7", Se = "_mainBlur_1u9ym_7", xe = "_inner_1u9ym_10", Ce = "_avatarWrap_1u9ym_13", Ie = "_control_1u9ym_17", Te = "__chatOpening_1u9ym_21", Me = "_main_1u9ym_7", Le = "_blur_1u9ym_33", Be = "_expander_1u9ym_75", Oe = "__weight_1u9ym_75", ze = "_controls_1u9ym_82", Ae = "__notif_1u9ym_131", Fe = "_controlLine_1u9ym_135", We = "_nonCallWrap_1u9ym_143", Ve = "_callWrap_1u9ym_144", Ee = "_nonCallEls_1u9ym_149", He = "_callEls_1u9ym_150", Pe = "_callPlus_1u9ym_158", Re = "_text_1u9ym_165", De = "__link_1u9ym_187", je = "__blur_1u9ym_195", Ne = "_textInner_1u9ym_198", qe = "__desk_1u9ym_202", Xe = "__mob_1u9ym_206", Ge = "_textLink_1u9ym_230", Ye = {
  Menu: we,
  _open: ke,
  mainBlur: Se,
  inner: xe,
  avatarWrap: Ce,
  control: Ie,
  _chatOpening: Te,
  main: Me,
  blur: Le,
  expander: Be,
  _weight: Oe,
  controls: ze,
  _notif: Ae,
  controlLine: Fe,
  nonCallWrap: We,
  callWrap: Ve,
  nonCallEls: Ee,
  callEls: He,
  callPlus: Pe,
  text: Re,
  _link: De,
  _blur: je,
  textInner: Ne,
  _desk: qe,
  _mob: Xe,
  textLink: Ge
}, Ue = {
  name: "Menu",
  components: {
    Avatar: j,
    Expander: g
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
      isCallOpen: !1,
      controls: [
        {
          icon: "IcStar",
          text: "Оставить отзыв",
          step: "Rate"
        },
        {
          icon: "IcPhone",
          text: "Связаться с менеджером",
          step: "FeedbackCall"
        },
        {
          icon: "IcMessage",
          text: "Получить ответ",
          step: "Chat"
        }
      ],
      activeText: "",
      autoInterval: null,
      inviteText: `За 4 <span class="${this.$style._desk}">секунды</span><span class="${this.$style._mob}">сек</span> отвечу на любой вопрос<span class="${this.$style.textLink}"></span>`,
      newText: `1 новое сообщение – <span class="${this.$style.textLink}">смотреть</span>`
    };
  },
  computed: {
    isAutoActive() {
      return !this.isHovering && !this.isMainOpen && !this.activeText && this.device !== "mobile";
    },
    menuDuration() {
      return this.isChatOpening ? 0.35 : 0.5;
    }
  },
  watch: {
    isAutoActive() {
      this.onAutoActiveChange();
    },
    hasNew() {
      this.onHasNewChange();
    }
  },
  mounted() {
    this.onHasNewChange(), this.onAutoActiveChange(), this.hasInteracted || this.initInvite();
  },
  beforeDestroy() {
    clearInterval(this.autoInterval);
  },
  methods: {
    onMouseEnter() {
      this.device !== "mobile" && (this.toggleOpen(!0), this.isHovering = !0, this.hasInteracted = !0);
    },
    onMouseLeave() {
      this.device !== "mobile" && (this.toggleOpen(!1), this.isHovering = !1, this.activeText === this.inviteText && (this.activeText = ""));
    },
    onClick() {
      this.device === "mobile" && (this.hasInteracted = !0, this.activeText === this.inviteText && (this.activeText = ""), this.goStep("Chat"));
    },
    onControlEnter(t) {
      this.activeText = t;
    },
    onControlLeave() {
      this.activeText = "";
    },
    goStep(t) {
      this.isChatOpening = !0, this.toggleOpen(!1), this.activeText = "", this.$emit("go-step", t), setTimeout(() => {
        this.$emit("open"), setTimeout(() => {
          this.isChatOpening = !1;
        }, 500);
      }, this.device === "mobile" ? 0 : 350);
    },
    initInvite() {
      setTimeout(() => {
        !this.hasInteracted && !this.activeText && (this.activeText = this.inviteText);
      }, 4e3);
    },
    initAuto() {
      clearInterval(this.autoInterval), this.autoInterval = setInterval(() => {
        this.isAutoActive && this.toggleOpen(!this.isOpen);
      }, 4e3);
    },
    onBeforeLeaveText() {
      this.device !== "mobile" && (this.$refs.mainBlur.style["border-top-right-radius"] = "", this.$refs.main.style["border-top-right-radius"] = "");
    },
    onBeforeEnterText() {
      this.device !== "mobile" && (this.$refs.mainBlur.style["border-top-right-radius"] = 0, this.$refs.main.style["border-top-right-radius"] = 0);
    },
    onTextClick() {
      (this.activeText === this.inviteText || this.activeText === this.newText) && this.goStep("Chat");
    },
    onHasNewChange() {
      this.hasNew ? (this.activeText = this.newText, this.device !== "mobile" && this.toggleOpen(!0)) : this.activeText === this.newText && (this.activeText = "");
    },
    onAutoActiveChange() {
      this.isAutoActive ? this.initAuto() : clearInterval(this.autoInterval);
    },
    onCallClick() {
      this.isCallOpen ? this.goStep("FeedbackCall") : (this.isCallOpen = !0, this.activeText = "Заказать звонок");
    },
    toggleOpen(t) {
      this.isOpen = t, t || (this.isCallOpen = !1);
    }
  }
};
var Ze = function() {
  var e = this, s = e._self._c;
  return s("div", { class: [e.$style.Menu, { [e.$style._chatOpening]: e.isChatOpening, [e.$style._open]: e.isOpen, [e.$style._text]: e.activeText }], on: { mouseenter: e.onMouseEnter, mouseleave: e.onMouseLeave, click: e.onClick } }, [s("div", { ref: "blur", class: e.$style.blur }, [s("div", { ref: "mainBlur", class: e.$style.mainBlur }), s("transition", { attrs: { name: "widget-sova-appear", mode: "out-in" } }, [e.activeText ? s("div", { key: e.activeText, class: [e.$style.text, e.$style._blur] }, [s("div", { class: e.$style.textInner, domProps: { innerHTML: e._s(e.activeText) } })]) : e._e()])], 1), s("transition", { attrs: { name: "widget-sova-appear", mode: "out-in" }, on: { "before-leave": e.onBeforeLeaveText, "before-enter": e.onBeforeEnterText } }, [e.activeText ? s("div", { key: e.activeText, class: [e.$style.text, { [e.$style._link]: e.activeText === e.inviteText || e.activeText === e.newText }], on: { click: e.onTextClick } }, [s("div", { class: e.$style.textInner, domProps: { innerHTML: e._s(e.activeText) } })]) : e._e()]), s("div", { ref: "main", class: e.$style.main }, [s("Expander", { class: [e.$style.expander, e.$style._weight], attrs: { "is-open": e.isOpen, field: "width", ease: "back.out(1)", duration: e.menuDuration, "hide-size": "48px" } }, [s("div", { ref: "inner", class: e.$style.inner }, [s("div", { class: e.$style.avatarWrap, on: { mouseenter: function(n) {
    return e.onControlEnter("Познакомиться с Совой");
  }, mouseleave: e.onControlLeave, click: function(n) {
    return e.goStep("Chat");
  } } }, [s("Avatar", { attrs: { "has-status": e.isOpen, "has-smile": e.isOpen } })], 1), s("div", { class: e.$style.controls }, [s("Expander", { class: e.$style.nonCallWrap, attrs: { "is-open": !e.isCallOpen, field: "width", ease: "back.out(1)" } }, [s("div", { class: e.$style.nonCallEls }, [s("div", { class: [e.$style.control], on: { mouseenter: function(n) {
    return e.onControlEnter("Оставить отзыв");
  }, mouseleave: e.onControlLeave, click: function(n) {
    return e.goStep("Rate");
  } } }, [s("VIcon", { attrs: { name: "IcStar", size: "size-20" } })], 1)])]), s("div", { class: e.$style.callWrap }, [s("Expander", { attrs: { "is-open": e.isCallOpen, field: "width", ease: "back.out(1)" } }, [s("div", { class: e.$style.callEls }, [s("div", { class: [e.$style.control], on: { mouseenter: function(n) {
    return e.onControlEnter("Связаться по Telegram");
  }, mouseleave: e.onControlLeave, click: function(n) {
    return e.goStep("FeedbackTelegram");
  } } }, [s("VIcon", { attrs: { name: "IcTelegram", size: "size-20" } })], 1), s("div", { class: [e.$style.control], on: { mouseenter: function(n) {
    return e.onControlEnter("Связаться по Whatsapp");
  }, mouseleave: e.onControlLeave, click: function(n) {
    return e.goStep("FeedbackWhatsapp");
  } } }, [s("VIcon", { attrs: { name: "IcWhatsapp", size: "size-20" } })], 1)])]), s("div", { class: [e.$style.control], on: { mouseenter: function(n) {
    return e.onControlEnter(e.isCallOpen ? "Заказать звонок" : "Связаться с менеджером");
  }, mouseleave: e.onControlLeave, click: e.onCallClick } }, [s("VIcon", { attrs: { name: "IcPhone", size: "size-20" } }), s("transition", { attrs: { name: "widget-sova-fade" } }, [s("svg", { directives: [{ name: "show", rawName: "v-show", value: e.isCallOpen, expression: "isCallOpen" }], class: e.$style.callPlus, attrs: { width: "6", height: "6", viewBox: "0 0 6 6", xmlns: "http://www.w3.org/2000/svg" } }, [s("path", { attrs: { d: "M5.08317 2.37496H3.62484V0.916626C3.62484 0.574959 3.3415 0.291626 2.99984 0.291626C2.65817 0.291626 2.37484 0.574959 2.37484 0.916626V2.37496H0.916504C0.574837 2.37496 0.291504 2.65829 0.291504 2.99996C0.291504 3.34163 0.574837 3.62496 0.916504 3.62496H2.37484V5.08329C2.37484 5.42496 2.65817 5.70829 2.99984 5.70829C3.3415 5.70829 3.62484 5.42496 3.62484 5.08329V3.62496H5.08317C5.42484 3.62496 5.70817 3.34163 5.70817 2.99996C5.70817 2.65829 5.42484 2.37496 5.08317 2.37496Z" } })])])], 1)], 1), s("div", { class: e.$style.controlLine }), s("div", { class: [e.$style.control, { [e.$style._notif]: e.hasNew }], on: { mouseenter: function(n) {
    return e.onControlEnter("Получить ответ");
  }, mouseleave: e.onControlLeave, click: function(n) {
    return e.goStep("Chat");
  } } }, [s("VIcon", { attrs: { name: "IcMessage", size: "size-20" } })], 1)], 1)])])], 1)], 1);
}, Je = [];
const S = {
  $style: Ye
};
function Ke(t) {
  for (var e in S)
    this[e] = S[e];
}
var Qe = /* @__PURE__ */ c(
  Ue,
  Ze,
  Je,
  !1,
  Ke,
  null,
  null,
  null
);
const et = Qe.exports, tt = "_Main_si47y_7", st = "_blur_si47y_22", nt = "_blurHat_si47y_34", it = "_blurBody_si47y_41", ot = "_wrapper_si47y_48", at = "_head_si47y_56", rt = "_close_si47y_68", lt = "_switchBorder_si47y_84", ct = "_longSwitch_si47y_92", ut = "_longSwitchInner_si47y_104", ht = "__short_si47y_116", pt = "_longSwitchIcn_si47y_129", dt = "__long_si47y_132", _t = "_componentWrap_si47y_150", mt = "_componentHeight_si47y_156", ft = {
  Main: tt,
  blur: st,
  blurHat: nt,
  blurBody: it,
  wrapper: ot,
  head: at,
  close: rt,
  switchBorder: lt,
  longSwitch: ct,
  longSwitchInner: ut,
  _short: ht,
  longSwitchIcn: pt,
  _long: dt,
  componentWrap: _t,
  componentHeight: mt
}, vt = {
  name: "Main",
  props: {
    isLoading: {
      type: Boolean,
      default: !1
    },
    isLong: {
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
    note: {
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
      resizeObserver: null
    };
  },
  computed: {
    isMenuHidden() {
      return this.currentStep.id === "Chat" && this.history.length;
    },
    isShowSwitch() {
      return this.currentStep.id === "Chat" && this.history.length > 2 && this.device !== "mobile";
    }
  },
  mounted() {
    this.startObserver();
  },
  beforeDestroy() {
    this.stopObserver();
  },
  methods: {
    switchLong(t) {
      this.$emit("go-step", "Chat"), this.$emit("set-long", t);
    },
    startObserver() {
      this.resizeObserver = new ResizeObserver((t) => {
        for (const e of t) {
          const s = e.contentRect.height, n = u.timeline();
          s !== 0 && n.to(this.$refs.componentWrap, {
            height: `${s}px`,
            duration: 0.4
          }, 0);
        }
      }), this.resizeObserver.observe(this.$refs.componentHeight);
    },
    stopObserver() {
      var t;
      (t = this.resizeObserver) == null || t.unobserve(this.$refs.componentHeight);
    }
  }
};
var yt = function() {
  var e = this, s = e._self._c;
  return s("div", { class: [e.$style.Main] }, [s("div", { class: e.$style.blur }, [s("svg", { class: e.$style.blurHat, attrs: { viewBox: "0 0 144 32", xmlns: "http://www.w3.org/2000/svg" } }, [s("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M 106.553,19.8362 C 110.395,26.405 116.669,32 124.278,32 c -96.951811,3.92e-4 -0.005,0.01663 -104.556001,0 7.609,0 13.883,-5.595 17.725,-12.1638 C 44.385999,7.97057 57.261999,0 71.999999,0 c 14.738,0 27.614,7.97058 34.553001,19.8362 z" } })]), s("div", { class: e.$style.blurBody })]), s("div", { class: e.$style.wrapper }, [s("div", { ref: "head", class: e.$style.head }, [s("VButton", { class: e.$style.about, on: { click: function(n) {
    return e.$emit("go-step", "Chat");
  } } }, [e._v("Обо мне")]), s("VIcon", { class: e.$style.close, attrs: { name: "IcCloseCircle", size: "size-20" }, on: { click: function(n) {
    return e.$emit("close");
  } } })], 1), s("transition", { attrs: { name: "widget-sova-fade" } }, [s("div", { directives: [{ name: "show", rawName: "v-show", value: e.isShowSwitch, expression: "isShowSwitch" }], class: e.$style.switchElements }, [s("transition", { attrs: { name: "widget-sova-fade" } }, [s("svg", { directives: [{ name: "show", rawName: "v-show", value: e.isLong, expression: "isLong" }], class: e.$style.switchBorder, attrs: { width: "340", height: "64", viewBox: "0 0 340 64", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [s("path", { attrs: { d: "M103.318 63.5H0.5V32C0.5 26.3912 0.500389 22.2147 0.770823 18.9048C1.04078 15.6006 1.57734 13.2041 2.62537 11.1472C4.4949 7.47802 7.47802 4.4949 11.1472 2.62537C13.2041 1.57734 15.6006 1.04078 18.9048 0.770823C22.2147 0.500389 26.3912 0.5 32 0.5H308C313.609 0.5 317.785 0.500389 321.095 0.770823C324.399 1.04078 326.796 1.57734 328.853 2.62537C332.522 4.4949 335.505 7.47802 337.375 11.1472C338.423 13.2041 338.959 15.6006 339.229 18.9048C339.5 22.2147 339.5 26.3912 339.5 32V63.5H236.682C233.905 63.5 231.755 62.2646 229.951 60.3577C228.135 58.4371 226.694 55.8604 225.356 53.2331C224.349 51.2574 222.743 49.6511 220.767 48.6444C219.615 48.0576 218.307 47.7767 216.609 47.6379C214.921 47.5 212.804 47.5 210.023 47.5H210H130H129.977C127.196 47.5 125.079 47.5 123.391 47.6379C121.693 47.7767 120.385 48.0576 119.233 48.6444C117.257 49.6511 115.651 51.2574 114.644 53.2331C113.306 55.8604 111.865 58.4371 110.049 60.3577C108.245 62.2646 106.095 63.5 103.318 63.5Z", fill: "white", stroke: "#E1E4EA" } })])]), s("div", { class: e.$style.longSwitch, on: { click: function(n) {
    return e.switchLong(!e.isLong);
  } } }, [s("transition", { attrs: { name: "widget-sova-fade-abs" } }, [s("div", { key: e.isLong, class: [e.$style.longSwitchInner, [e.$style[e.isLong ? "_short" : "_long"]]] }, [e._v(" " + e._s(e.isLong ? "Краткий вид" : "История сообщений") + " "), s("VIcon", { class: e.$style.longSwitchIcn, attrs: { name: "IcHistory", size: "size-12" } })], 1)])], 1)], 1)]), s("div", { ref: "componentWrap", class: e.$style.componentWrap }, [s("div", { ref: "componentHeight", class: e.$style.componentHeight }, [s("transition", { attrs: { name: "widget-sova-fade", mode: "out-in" } }, [e.currentStep ? s(e.currentStep.component, { ref: "componentStep", tag: "component", attrs: { "is-long": e.isLong, "is-loading": e.isLoading, "is-show-switch": e.isShowSwitch, history: e.history, value: e.value, note: e.note, "current-step": e.currentStep }, on: { "go-step": function(n) {
    return e.$emit("go-step", n);
  }, "set-value": function(n) {
    return e.$emit("set-value", n);
  }, "value-click": function(n) {
    return e.$emit("value-click", n);
  }, submit: function(n) {
    return e.$emit("submit");
  }, "repeat-click": function(n) {
    return e.$emit("repeat-click");
  }, "set-rating": function(n) {
    return e.$emit("set-rating", n);
  }, "append-history": function(n) {
    return e.$emit("append-history");
  } } }) : e._e()], 1)], 1)])], 1)]);
}, gt = [];
const x = {
  $style: ft
};
function $t(t) {
  for (var e in x)
    this[e] = x[e];
}
var bt = /* @__PURE__ */ c(
  vt,
  yt,
  gt,
  !1,
  $t,
  null,
  null,
  null
);
const wt = bt.exports, kt = "_Chat_1kujv_7", St = "_hello_1kujv_12", xt = "_helloBottom_1kujv_27", Ct = "_inputWrap_1kujv_31", It = "_input_1kujv_31", Tt = "__send_1kujv_36", Mt = "_send_1kujv_40", Lt = "__gray_1kujv_64", Bt = "_disclaimer_1kujv_68", Ot = {
  Chat: kt,
  hello: St,
  helloBottom: xt,
  inputWrap: Ct,
  input: It,
  _send: Tt,
  send: Mt,
  _gray: Lt,
  disclaimer: Bt
}, zt = {
  name: "Chat",
  components: {
    Expander: g,
    ChatMessages: () => import("./ChatMessages-a3202be4.js")
  },
  props: {
    isLong: {
      type: Boolean,
      default: !1
    },
    isLoading: {
      type: Boolean,
      default: !1
    },
    isShowSwitch: {
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
    note: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    isSendGray() {
      return this.isLoading || !this.value;
    },
    isShowMessages() {
      return this.history.length || this.isLoading;
    }
  }
};
var At = function() {
  var e = this, s = e._self._c;
  return s("div", { class: e.$style.Chat }, [e.isShowMessages ? s("ChatMessages", { class: e.$style.messages, attrs: { history: e.history, "is-loading": e.isLoading, "is-long": e.isLong, note: e.note }, on: { "set-rating": function(n) {
    return e.$emit("set-rating", n);
  }, "value-click": function(n) {
    return e.$emit("value-click", n);
  }, "repeat-click": function(n) {
    return e.$emit("repeat-click");
  }, "append-history": function(n) {
    return e.$emit("append-history");
  } } }) : s("div", { class: e.$style.hello }, [s("p", [e._v("Привет! Я Сова – ")]), s("p", { class: e.$style.helloBottom }, [e._v("нейросеть быстрых ответов")])]), s("form", { class: e.$style.inputWrap, on: { submit: function(n) {
    return n.preventDefault(), e.$emit("submit");
  } } }, [s("VInput", { class: [e.$style.input, e.$style._send], attrs: { value: e.value, autocomplete: !1, placeholder: ["Напишите любой вопрос...", "Где расположены проекты?", "Есть проекты с панорамными окнами?"], "is-placeholder-animating": !e.isShowMessages }, on: { input: function(n) {
    return e.$emit("set-value", n);
  } } }), s("button", { class: [e.$style.send, { [e.$style._gray]: e.isSendGray }] }, [s("VIcon", { class: e.$style.sendIcn, attrs: { name: "IcSend", size: "size-16" } })], 1)], 1), s("Expander", { attrs: { "is-open": Boolean(!e.history.length) } }, [s("div", { class: e.$style.disclaimer }, [e._v(" Разработали и обучили "), s("a", { attrs: { href: "https://idaproject.com/", target: "_blank" } }, [e._v("idaproject")])])])], 1);
}, Ft = [];
const C = {
  $style: Ot
};
function Wt(t) {
  for (var e in C)
    this[e] = C[e];
}
var Vt = /* @__PURE__ */ c(
  zt,
  At,
  Ft,
  !1,
  Wt,
  null,
  null,
  null
);
const I = Vt.exports, Et = "_Rate_1519x_7", Ht = "__rated_1519x_13", Pt = "_title_1519x_13", Rt = "_smiles_1519x_17", Dt = "_smile_1519x_17", jt = "__active_1519x_20", Nt = "_smileImg_1519x_58", qt = "_btns_1519x_89", Xt = "_inputExpander_1519x_97", Gt = "_inputWrap_1519x_101", Yt = "_input_1519x_97", Ut = "__send_1519x_106", Zt = "_send_1519x_110", Jt = {
  Rate: Et,
  _rated: Ht,
  title: Pt,
  smiles: Rt,
  smile: Dt,
  _active: jt,
  smileImg: Nt,
  btns: qt,
  inputExpander: Xt,
  inputWrap: Gt,
  input: Yt,
  _send: Ut,
  send: Zt
}, Kt = {
  name: "Rate",
  components: {
    Expander: g
  },
  data() {
    return {
      isScreenshoting: !1,
      screenshotLink: "",
      values: {
        rating: null,
        file: null,
        question: ""
      },
      errors: {},
      smiles: [
        {
          value: 1,
          src: "https://spukibugi.github.io/chat_temporary/smiles/1.png"
        },
        {
          value: 2,
          src: "https://spukibugi.github.io/chat_temporary/smiles/2.png"
        },
        {
          value: 3,
          src: "https://spukibugi.github.io/chat_temporary/smiles/3.png"
        },
        {
          value: 4,
          src: "https://spukibugi.github.io/chat_temporary/smiles/4.png"
        },
        {
          value: 5,
          src: "https://spukibugi.github.io/chat_temporary/smiles/5.png"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      const t = new FormData();
      for (const e in this.values)
        t.append(e, this.values[e]);
      console.log("formData", t), this.$emit("go-step", "FeedbackThanks");
    },
    async screenshot() {
      if (this.isScreenshoting)
        return;
      if (this.screenshotLink) {
        const n = window.open();
        n == null || n.document.write(`<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${this.screenshotLink}" width="${window.innerWidth}" height="${window.innerHeight}" ></body></html>`), this.screenshotLink = "";
        return;
      }
      this.isScreenshoting = !0;
      const t = document.createElement("canvas"), e = t.getContext("2d"), s = document.createElement("video");
      t.width = window.innerWidth, t.height = window.innerHeight;
      try {
        const n = await navigator.mediaDevices.getDisplayMedia();
        s.srcObject = n, await s.play(), setTimeout(async () => {
          e.drawImage(s, 0, 0, window.innerWidth, window.innerHeight);
          const i = t.toDataURL("image/png");
          n.getTracks().forEach((o) => o.stop()), s.pause(), this.screenshotLink = i;
        }, 300);
      } catch (n) {
        console.error("Error: " + n);
      }
      this.isScreenshoting = !1;
    },
    onUpload() {
      this.$refs.fileInput.click();
    },
    onFileInput(t) {
      this.values.file = t.target.files[0];
    }
  }
};
var Qt = function() {
  var e = this, s = e._self._c;
  return s("div", { class: [e.$style.Rate, { [e.$style._rated]: e.values.rating }] }, [s("div", { class: e.$style.title }, [e._v(" Насколько легко "), s("br"), e._v(" пользоваться сайтом? ")]), s("div", { class: e.$style.smiles }, e._l(e.smiles, function(n) {
    return s("div", { key: n.value, class: [e.$style.smile, { [e.$style._active]: n.value === e.values.rating }], on: { click: function(i) {
      e.values.rating = n.value;
    } } }, [s("img", { class: e.$style.smileImg, attrs: { src: n.src } })]);
  }), 0), s("Expander", { class: e.$style.inputExpander, attrs: { "is-open": Boolean(e.values.rating) } }, [s("form", { class: e.$style.inputWrap, on: { submit: function(n) {
    return n.preventDefault(), e.onSubmit.apply(null, arguments);
  } } }, [s("VInput", { class: [e.$style.input, e.$style._send], attrs: { autocomplete: !1, placeholder: "Напишите комментарий" }, model: { value: e.values.question, callback: function(n) {
    e.$set(e.values, "question", n);
  }, expression: "values.question" } }), s("input", { ref: "fileInput", attrs: { id: e.$style.fileId, type: "file", name: "filename", hidden: "" }, on: { input: e.onFileInput } }), s("button", { class: e.$style.send }, [s("VIcon", { class: e.$style.sendIcn, attrs: { name: "IcSend", size: "size-16" } })], 1)], 1)]), s("div", { class: e.$style.btns }, [s("VButton", { class: e.$style.btn, attrs: { color: e.screenshotLink ? "primary-100" : "base-100" }, on: { click: e.screenshot } }, [e.screenshotLink ? [e._v(" Ссылка на скриншот ")] : [e._v(" Сделать скриншот ")]], 2), s("VButton", { class: e.$style.btn, attrs: { color: e.values.file ? "primary-100" : "base-100" }, on: { click: e.onUpload } }, [e.values.file ? [e._v(" Фото прикреплено ")] : [e._v(" Прикрепить фото ")]], 2)], 1)], 1);
}, es = [];
const T = {
  $style: Jt
};
function ts(t) {
  for (var e in T)
    this[e] = T[e];
}
var ss = /* @__PURE__ */ c(
  Kt,
  Qt,
  es,
  !1,
  ts,
  null,
  null,
  null
);
const M = ss.exports, ns = "_FeedbackMenu_1lp7t_7", is = "_btn_1lp7t_14", os = {
  FeedbackMenu: ns,
  btn: is
}, as = {
  name: "FeedbackMenu",
  data() {
    return {
      items: [
        {
          label: "Получить ответ",
          step: "Chat",
          onClick: () => this.$emit("go-step", "Chat")
        },
        {
          label: "Звонок",
          step: "FeedbackCall",
          onClick: () => console.log("CTA callback"),
          onMouseEnter: (t) => this.$emit("item-mouseenter", t)
        },
        {
          label: "Whatsapp",
          step: "FeedbackWhatsapp",
          href: "https://www.google.com/",
          target: "blank",
          onMouseEnter: (t) => this.$emit("item-mouseenter", t)
        },
        {
          label: "Telegram",
          step: "FeedbackTelegram",
          href: "https://www.google.com/",
          target: "blank",
          onMouseEnter: (t) => this.$emit("item-mouseenter", t)
        }
      ]
    };
  },
  methods: {
    onItemClick(t) {
      t.onClick && t.onClick(t);
    },
    onItemMouseEnter(t) {
      t.onMouseEnter && t.onMouseEnter(t);
    }
  }
};
var rs = function() {
  var e = this, s = e._self._c;
  return s("div", { class: e.$style.FeedbackMenu, on: { mouseleave: function(n) {
    return e.$emit("menu-mouseleave");
  } } }, e._l(e.items, function(n) {
    return s("VButton", { key: n.label, class: e.$style.btn, attrs: { color: "base-100", href: n.href, target: n.target }, on: { click: function(i) {
      return e.onItemClick(n);
    }, mouseenter: function(i) {
      return e.onItemMouseEnter(n);
    } } }, [e._v(" " + e._s(n.label) + " ")]);
  }), 1);
}, ls = [];
const L = {
  $style: os
};
function cs(t) {
  for (var e in L)
    this[e] = L[e];
}
var us = /* @__PURE__ */ c(
  as,
  rs,
  ls,
  !1,
  cs,
  null,
  null,
  null
);
const hs = us.exports, ps = "_Feedback_m52e1_7", ds = "_component_m52e1_14", _s = "_menu_m52e1_19", ms = {
  Feedback: ps,
  component: ds,
  menu: _s
}, fs = {
  name: "Feedback",
  components: {
    FeedbackMenu: hs
  },
  props: {
    currentStep: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      startId: this.currentStep.id,
      feedbacks: [
        {
          id: "FeedbackCall",
          component: () => import("./FeedbackCall-de723dd8.js")
        },
        {
          id: "FeedbackTelegram",
          component: () => import("./FeedbackTelegram-f226a3c9.js")
        },
        {
          id: "FeedbackWhatsapp",
          component: () => import("./FeedbackWhatsapp-ce83780e.js")
        },
        {
          id: "FeedbackThanks",
          component: () => import("./FeedbackThanks-aaddf5d3.js")
        }
      ]
    };
  },
  computed: {
    currentFeedback() {
      return this.feedbacks.find((t) => t.id === this.currentStep.id);
    }
  },
  methods: {
    onItemMouseEnter(t) {
      this.$emit("go-step", t.step);
    },
    onMenuMouseLeave() {
      this.$emit("go-step", this.startId);
    }
  }
};
var vs = function() {
  var e = this, s = e._self._c;
  return s("div", { class: e.$style.Feedback }, [s("transition", { attrs: { name: "widget-sova-fade-abs" } }, [s(e.currentFeedback.component, { tag: "component", class: e.$style.component, on: { "go-step": function(n) {
    return e.$emit("go-step", n);
  } } })], 1), s("FeedbackMenu", { staticClass: "widget-sova-main-menu", class: e.$style.menu, on: { "go-step": function(n) {
    return e.$emit("go-step", n);
  }, "item-mouseenter": e.onItemMouseEnter, "menu-mouseleave": e.onMenuMouseLeave } })], 1);
}, ys = [];
const B = {
  $style: ms
};
function gs(t) {
  for (var e in B)
    this[e] = B[e];
}
var $s = /* @__PURE__ */ c(
  fs,
  vs,
  ys,
  !1,
  gs,
  null,
  null,
  null
);
const m = $s.exports, bs = "_App_1yfd7_8", ws = "__bottom_1yfd7_12", ks = "_mainContainer_1yfd7_12", Ss = "_avatarWrap_1yfd7_16", xs = "__top_1yfd7_21", Cs = "_menu_1yfd7_31", Is = "_overlay_1yfd7_51", Ts = "__active_1yfd7_85", Ms = "_mainWrap_1yfd7_89", Ls = {
  App: bs,
  _bottom: ws,
  mainContainer: ks,
  avatarWrap: Ss,
  _top: xs,
  menu: Cs,
  overlay: Is,
  _active: Ts,
  mainWrap: Ms
}, Bs = {
  name: "App",
  components: {
    Menu: et,
    Avatar: j,
    Main: wt,
    /* eslint-disable vue/no-unused-components */
    Chat: I,
    Rate: M,
    Feedback: m
    /* eslint-enable vue/no-unused-components */
  },
  mixins: [
    Y
  ],
  props: {
    id: {
      type: String,
      default: "00000000-0000-0000-0000-000000000000"
    },
    apiUrl: {
      type: String,
      default: "http://185.105.108.90:8000/v1/"
    }
  },
  data() {
    return {
      /** Flags */
      isOpen: !1,
      isLoading: !1,
      isLong: !1,
      hasStatus: !1,
      hasNew: localStorage.getItem("widgetSovaHasNew") === "true",
      /** Form */
      value: "",
      note: "",
      /** Info */
      isHistoryLoading: !1,
      history: [],
      historyPageInfo: {
        limit: 10,
        offset: 0,
        hasNext: !1
      },
      animationType: "bottom",
      debouncedResize: X(this.onResize, 100),
      vh: 0,
      /** Steps */
      stepId: "",
      steps: [
        {
          id: "Chat",
          component: I
        },
        {
          id: "Rate",
          component: M
        },
        {
          id: "FeedbackThanks",
          component: m
        },
        {
          id: "FeedbackCall",
          component: m
        },
        {
          id: "FeedbackTelegram",
          component: m
        },
        {
          id: "FeedbackWhatsapp",
          component: m
        }
      ]
    };
  },
  computed: {
    currentStep() {
      return this.steps.find((t) => t.id === this.stepId);
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
          "--primary-400": "#3D70F4",
          "--primary-500": "#1F44FF",
          "--primary-600": "#1233EE",
          "--primary-900": "#1431BF",
          "--vh": this.vh ? `${this.vh}px` : "1vh"
        }
      ];
    }
  },
  watch: {
    device(t, e) {
      (t === "mobile" || e === "mobile") && this.isOpen && this.onClose();
    }
  },
  created() {
    this.getHistory();
  },
  mounted() {
    this.device === "mobile" && (this.isLong = !0), window.addEventListener("resize", this.debouncedResize), this.$nextTick(() => {
      this.getVh(), this.checkAnimationType(), this.fixSafariInputs();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.debouncedResize);
  },
  methods: {
    getVh() {
      this.vh = window.innerHeight * 0.01;
    },
    fixSafariInputs() {
      if (G() && this.device === "mobile") {
        const t = document.querySelector("meta[name=viewport]");
        if (t !== null) {
          let e = t.getAttribute("content");
          e = [e, "maximum-scale=1.0"].join(", "), t.setAttribute("content", e);
        }
      }
    },
    onGoStep(t) {
      this.stepId = t, t === "Chat" && (this.hasNew = !1, localStorage.setItem("widgetSovaHasNew", "false"));
    },
    onResize() {
      this.getVh(), this.checkAnimationType();
    },
    async onOpen() {
      this.isOpen = !0, await this.$nextTick(), this.animationType === "top" ? this.openAnimTop() : this.openAnimBottom();
    },
    onClose() {
      this.isOpen = !1, this.animationType === "top" ? this.closeAnimTop() : this.closeAnimBottom();
    },
    /** Чат */
    async onSubmit() {
      if (this.isLoading) {
        this.note = "Отправьте сообщение после получения ответа";
        return;
      }
      if (!this.value)
        return;
      this.isLoading = !0;
      const t = this.value;
      this.value = "", this.note = "";
      const e = String(Math.random());
      this.history.push({ id: e, type: "question", text: t, created: new Date(Date.now()) });
      try {
        const s = await this.getAnswer(t);
        s.type = "answer", this.history.push(s), this.note = "", this.historyPageInfo.offset += 2, this.history.length === 2 && (this.note = "Не совсем тот ответ? Переформулируйте вопрос"), this.isOpen || (this.hasNew = !0, localStorage.setItem("widgetSovaHasNew", "true"));
      } catch (s) {
        console.warn("[Chat/onSubmit] error: ", s), this.history.push({
          id: "error",
          type: "answer",
          text: "Упс… Произошла ошибка!<br><br>Попробуйте отправить сообщение<br>снова, а я пока расскажу анекдот:<br><br>«Что делает кофе, прежде чем попадет<br>в пачку? Молится»",
          created: new Date(Date.now())
        });
      }
      this.isLoading = !1;
    },
    getAnswer(t) {
      const e = {
        company_id: this.id,
        question: t,
        user_id: 1
      };
      return fetch(`${this.apiUrl}${v.messages}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
      }).then((s) => s.json());
    },
    onValueClick(t) {
      this.value = t, this.onSubmit();
    },
    onRepeat() {
      this.history.pop();
      const t = this.history.pop();
      this.value = t.text, this.onSubmit();
    },
    onSetRating({ value: t, item: e }) {
      const s = this.history.findIndex((n) => n.id === e.id);
      this.history.splice(s, 1, { ...e, rating: t });
      try {
        const n = {
          message_id: e.id,
          rating: t
        };
        fetch(`${this.apiUrl}${v.feedbacks}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(n)
        }).then((i) => i.json());
      } catch (n) {
        console.warn("[Chat/onSetRating] error: ", n);
      }
    },
    async getHistory() {
      var t, e;
      if (!(this.isHistoryLoading || !this.isLong || !this.historyPageInfo.hasNext)) {
        this.isHistoryLoading = !0;
        try {
          const s = {
            limit: this.historyPageInfo.limit,
            offset: this.historyPageInfo.offset
          }, n = await fetch(`${this.apiUrl}${v.history}${U(s)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }).then((i) => i.json());
          this.historyPageInfo.offset += (t = n.results) == null ? void 0 : t.length, this.historyPageInfo.hasNext = Boolean((e = n.results) == null ? void 0 : e.length), console.log("res", n);
        } catch (s) {
          console.warn("[Chat/getHistory] error: ", s);
        }
        this.isHistoryLoading = !1;
      }
    }
    /** Конец Чата */
  }
};
var Os = function() {
  var e = this, s = e._self._c;
  return s("widget-sova", { class: [e.$style.App, e.$style[`_${e.animationType}`]], style: e.styleList }, [s("transition", { attrs: { name: "widget-sova-fade" } }, [s("div", { directives: [{ name: "show", rawName: "v-show", value: e.isOpen, expression: "isOpen" }], class: e.$style.overlay, on: { click: e.onClose } })]), s("Menu", { ref: "menu", staticClass: "widget-sova-app__menu", class: e.$style.menu, attrs: { "is-main-open": e.isOpen, "has-new": e.hasNew }, on: { open: e.onOpen, "go-step": e.onGoStep } }), s("div", { ref: "mainContainer", class: [e.$style.mainContainer, { [e.$style._active]: e.stepId }] }, [e.stepId ? s("div", { ref: "mainWrap", class: e.$style.mainWrap }, [s("Main", { ref: "main", class: e.$style.main, attrs: { "current-step": e.currentStep, "is-loading": e.isLoading, "is-long": e.isLong, history: e.history, "history-page-info": e.historyPageInfo, value: e.value, note: e.note }, on: { close: e.onClose, "go-step": e.onGoStep, "set-value": function(n) {
    e.value = n;
  }, "value-click": e.onValueClick, submit: e.onSubmit, "repeat-click": e.onRepeat, "set-rating": e.onSetRating, "set-long": function(n) {
    e.isLong = n;
  }, "append-history": e.getHistory } })], 1) : e._e(), s("div", { ref: "avatarWrap", class: e.$style.avatarWrap }, [s("Avatar", { ref: "avatar", attrs: { "has-status": e.hasStatus, "show-pic": e.isRelink && e.isOpen } })], 1)])], 1);
}, zs = [];
const O = {
  $style: Ls
};
function As(t) {
  for (var e in O)
    this[e] = O[e];
}
var Fs = /* @__PURE__ */ c(
  Bs,
  Os,
  zs,
  !1,
  As,
  null,
  null,
  null
);
const Ws = Fs.exports;
const _ = (t) => t < 10 ? `0${t}` : t;
function Vs(t) {
  return isNaN(t) ? t : (t = Math.floor(Number(t)), (t < 0 ? "-" : "") + t.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " "));
}
const z = (t, e) => e ? [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс"
][t] : [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресение"
][t], f = (t, e, s) => {
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
  ], o = [
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
  return e ? o[t] : s ? i[t] : n[t];
}, Es = (t) => !isNaN(Date.parse(t)), Hs = (t, e) => {
  if (!t)
    return "";
  const s = Es(t) ? new Date(t) : new Date(), n = {
    // Date
    $d: _(s.getDate()),
    // Day of the month, 2 digits with leading zeros. // '01' to '31'
    $j: s.getDate(),
    // Day of the month without leading zeros. // '1' to '31'
    // Days of the week
    $D: z(s.getDay(), !0),
    // Day of the week, textual, 3 letters. // 'Пн', 'Вт'
    $l: z(s.getDay()),
    // Day of the week, textual, long. // 'Пятница'
    // Month
    $m: _(s.getMonth() + 1),
    // Month, 2 digits with leading zeros. // '01' to '12'
    $n: s.getMonth() + 1,
    // Month without leading zeros. // '1' to '12'
    $M: f(s.getMonth(), !0),
    // Month, textual, 3 letters. // 'Янв'
    $b: f(s.getMonth(), !0).toLowerCase(),
    // Month, textual, 3 letters, lowercase. // 'янв'
    $F: f(s.getMonth()),
    // Month, textual, long. // 'Январь'
    $E: f(s.getMonth(), !1, !0),
    // Month, plural, long. // 'Января'
    $e: f(s.getMonth(), !1, !0).toLowerCase(),
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
  }, i = e.match(/[$][a-zA-Z]/gm);
  let o = e;
  return i.forEach((a) => {
    o = o.replace(a, n[a]);
  }), o;
}, Ps = (t) => {
  const e = new t(), s = {
    mobile: 768,
    tablet: 1024,
    laptop: 1280,
    desktop: 1440,
    "large-desktop": 1940,
    "x-large-desktop": 999999
  }, n = () => {
    for (const i in s)
      if (window.innerWidth < s[i]) {
        e.$emit("update", i);
        return;
      }
  };
  window.addEventListener("resize", n), t.mixin({
    data() {
      return {
        device: "large-desktop"
      };
    },
    mounted() {
      e.$on("update", (i) => {
        this.device = i;
      }), n();
    }
  });
}, Rs = { install: Ps }, Ds = (t, e) => {
  const s = t[e];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((n, i) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
}, js = "_VIcon_10wm4_7", Ns = {
  VIcon: js,
  "_size-20": "__size-20_10wm4_10",
  "_size-16": "__size-16_10wm4_14",
  "_size-14": "__size-14_10wm4_18",
  "_size-12": "__size-12_10wm4_22"
}, qs = {
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
      return () => Ds(/* @__PURE__ */ Object.assign({ "../../icons/IcCloseCircle.vue": () => import("./IcCloseCircle-4b05a8ba.js"), "../../icons/IcHistory.vue": () => import("./IcHistory-51a00d25.js"), "../../icons/IcLike.vue": () => import("./IcLike-32ed17ba.js"), "../../icons/IcMessage.vue": () => import("./IcMessage-a7e885d6.js"), "../../icons/IcPhone.vue": () => import("./IcPhone-c60d6620.js"), "../../icons/IcRate.vue": () => import("./IcRate-96e51798.js"), "../../icons/IcRateFinish.vue": () => import("./IcRateFinish-e1bab726.js"), "../../icons/IcSend.vue": () => import("./IcSend-7a5e1927.js"), "../../icons/IcStar.vue": () => import("./IcStar-2d50d362.js"), "../../icons/IcTelegram.vue": () => import("./IcTelegram-11acaeeb.js"), "../../icons/IcWhatsapp.vue": () => import("./IcWhatsapp-09fd5dd5.js") }), `../../icons/${this.name}.vue`);
    }
  }
};
var Xs = function() {
  var e = this, s = e._self._c;
  return s(e.component, { tag: "component", staticClass: "v-icon", class: [e.$style.VIcon, ...e.classList], nativeOn: { click: function(n) {
    return e.$emit("click");
  } } });
}, Gs = [];
const A = {
  $style: Ns
};
function Ys(t) {
  for (var e in A)
    this[e] = A[e];
}
var Us = /* @__PURE__ */ c(
  qs,
  Xs,
  Gs,
  !1,
  Ys,
  null,
  null,
  null
);
const Zs = Us.exports, Js = "_VButton_13nyf_7", Ks = "__disabled_13nyf_52", Qs = {
  VButton: Js,
  "_size-40": "__size-40_13nyf_19",
  "_size-24": "__size-24_13nyf_28",
  "_primary-100": "__primary-100_13nyf_37",
  _disabled: Ks,
  "_base-100": "__base-100_13nyf_56"
}, en = {
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
      const t = {};
      return this.href && (t.href = this.href), this.blank && (t.target = "_blank"), t;
    }
  },
  methods: {}
};
var tn = function() {
  var e = this, s = e._self._c;
  return s(e.component, e._g(e._b({ tag: "component", class: [e.$style.VButton, ...e.classList] }, "component", e.linkProperties, !1), e.$listeners), [e._t("default")], 2);
}, sn = [];
const F = {
  $style: Qs
};
function nn(t) {
  for (var e in F)
    this[e] = F[e];
}
var on = /* @__PURE__ */ c(
  en,
  tn,
  sn,
  !1,
  nn,
  null,
  null,
  null
);
const an = on.exports, rn = "_VButtonIcon_4s74v_7", ln = "__rotate_4s74v_19", cn = "_icon_4s74v_19", un = "__disabled_4s74v_42", hn = {
  VButtonIcon: rn,
  _rotate: ln,
  icon: cn,
  "_size-20": "__size-20_4s74v_22",
  "_base-100": "__base-100_4s74v_27",
  _disabled: un,
  "_base-400": "__base-400_4s74v_46",
  "_primary-500": "__primary-500_4s74v_66"
}, pn = {
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
      const t = {};
      return this.href && (t.href = this.href), this.blank && (t.target = "_blank"), t;
    }
  },
  methods: {}
};
var dn = function() {
  var e = this, s = e._self._c;
  return s(e.component, e._g(e._b({ tag: "component", class: [e.$style.VButtonIcon, ...e.classList] }, "component", e.linkProperties, !1), e.$listeners), [s("VIcon", { class: e.$style.icon, attrs: { name: e.name, size: e.iconSize } })], 1);
}, _n = [];
const W = {
  $style: hn
};
function mn(t) {
  for (var e in W)
    this[e] = W[e];
}
var fn = /* @__PURE__ */ c(
  pn,
  dn,
  _n,
  !1,
  mn,
  null,
  null,
  null
);
const vn = fn.exports, V = {
  "#": { pattern: /\d/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[0-9a-zA-Z]/ },
  U: { pattern: /[a-zA-Z]/, transform: (t) => t.toLocaleUpperCase() },
  L: { pattern: /[a-zA-Z]/, transform: (t) => t.toLocaleLowerCase() }
}, yn = [
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
], gn = {
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
function y(t, e, s = !0) {
  let n = 0, i = 0, o = "";
  for (; n < e.length && i < t.length; ) {
    let a = e[n];
    const l = V[a], r = t[i];
    l ? (l.pattern.test(r) && (o += l.transform ? l.transform(r) : r, n++), i++) : (l && (n++, a = e[n]), s && (o += a), r === a && i++, n++);
  }
  for (; n < e.length; ) {
    const a = e[n];
    if (V[a])
      break;
    n++;
  }
  return o;
}
function E(t, e) {
  t === document.activeElement && (t.setSelectionRange(e, e), setTimeout(() => {
    t.setSelectionRange(e, e);
  }, 0));
}
const $n = "_VInput_vknvf_7", bn = "__medium_vknvf_14", wn = "__showLabel_vknvf_14", kn = "__active_vknvf_14", Sn = "__keep_vknvf_14", xn = "_label_vknvf_14", Cn = "_premask_vknvf_18", In = "_native_vknvf_20", Tn = "_placeholder_vknvf_28", Mn = "__base_vknvf_37", Ln = "_inner_vknvf_59", Bn = "_border_vknvf_74", On = "_shadow_vknvf_77", zn = "__focused_vknvf_81", An = "__success_vknvf_91", Fn = "__error_vknvf_95", Wn = "__disabled_vknvf_99", Vn = "_nativeSelect_vknvf_103", En = "_shadowInner_vknvf_147", Hn = "_placeholderInner_vknvf_173", Pn = "_icon_vknvf_201", Rn = {
  VInput: $n,
  _medium: bn,
  _showLabel: wn,
  _active: kn,
  _keep: Sn,
  label: xn,
  premask: Cn,
  native: In,
  placeholder: Tn,
  _base: Mn,
  inner: Ln,
  border: Bn,
  shadow: On,
  _focused: zn,
  _success: An,
  _error: Fn,
  _disabled: Wn,
  nativeSelect: Vn,
  shadowInner: En,
  placeholderInner: Hn,
  icon: Pn
}, H = 35, P = 70, Dn = {
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
    placeholder: {
      type: [String, Array],
      default: ""
    },
    isPlaceholderAnimating: Boolean,
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
      /** Placeholder */
      currentPlaceholder: "",
      placeholderInterval: null,
      /** Border */
      mouseTween: null,
      roundTween: null,
      focusTween: null,
      borderX: 0,
      borderY: 0,
      borderXSize: `${H}%`,
      borderYSize: `${P}%`
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
      return this.mask ? y(this.value, this.currentMask) : this.value;
    },
    currentPremask() {
      if (!this.mask)
        return "";
      if (this.inputValue.length) {
        const t = new RegExp("^.{0," + this.inputValue.length + "}", "g");
        return this.currentMask.replace(t, `<span>${this.inputValue}</span>`).replace(/#/g, "&ensp;");
      } else
        return this.currentMask.replace(/#/g, "&ensp;");
    },
    attributes() {
      const t = {
        ...this.$attrs,
        type: "text",
        disabled: this.disabled
      };
      return this.label && (t.ariaLabel = this.label), this.mask && (t.maxlength = this.currentMask.length), this.type && (this.mask ? t.type = yn.includes(this.mask) ? "tel" : "text" : t.type = this.type), this.autocomplete || (t.autocomplete = "off"), t;
    },
    borderStyle() {
      return [
        {
          maskImage: `radial-gradient(${this.borderXSize} ${this.borderYSize} at ${this.borderX}% ${this.borderY}%, black 60%, transparent)`
        }
      ];
    }
  },
  watch: {
    isPlaceholderAnimating: {
      handler(t) {
        clearInterval(this.placeholderInterval), t ? this.animatePlaceholder() : this.currentPlaceholder = this.placeholder[0];
      },
      immediate: !0
    }
  },
  created() {
    if (this.mask)
      try {
        if (this.currentMask = gn[this.mask], !this.currentMask)
          throw new Error(`VInput: mask-utils: mask ${this.mask} not found`);
      } catch (t) {
        console.log(t);
      }
    this.setPlaceholder();
  },
  mounted() {
    this.tweenAround(), window.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onMouseMove), this.stopTweenAround(), this.stopTweenOnMouse(), clearInterval(this.placeholderInterval);
  },
  methods: {
    /**
     * Эмитит новые значения в родительский компонент.
     * Используется для валидации.
     * @returns {String} e.target.value Введёный текст
     * @public
     */
    onInput(t) {
      if (this.mask) {
        let e = t.target.selectionEnd;
        const s = t.target.value[e - 1];
        if (this.mask === "phone" && t.target.value.charAt(0) == 8 && (t.target.value = "+7"), t.target.value = y(t.target.value, this.currentMask), e !== 0)
          for (; e < t.target.value.length && t.target.value.charAt(e - 1) !== s; )
            e++;
        if (E(t.target, e), this.mask === "percent" ? (t.target.value === "00" && (t.target.value = 1), t.target.value = t.target.value > 100 ? "100%" : t.target.value + "%") : this.mask === "months" && t.target.value > 360 && (t.target.value = 360), t.target.value !== this.inputValue) {
          const n = this.keepMasked ? t.target.value : y(t.target.value, this.currentMask, !1);
          this.$emit("input", n);
          return;
        }
      }
      this.$emit("input", t.target.value);
    },
    /**
     * Метод, который обрабатывает событие focus на инпуте
     * @public
     */
    onFocus(t) {
      this.isFocused = !0, this.tweenOnFocus(), this.mask && this.mask === "phone" && !this.inputValue && this.$nextTick(() => {
        E(t.target, this.inputValue.length);
      }), this.$emit("focus", t);
    },
    /**
     * Метод, который обрабатывает событие blur на инпуте
     * @public
     */
    onBlur(t) {
      this.isFocused = !1, this.tweenOnFocus({ reverse: !0, onComplete: this.device === "mobile" ? this.tweenAround : null }), this.$emit("blur", t), this.mask && this.mask === "phone" && (this.inputValue === "+" || this.inputValue === "+7") && this.$emit("input", "");
    },
    async onKeyDown(t) {
      t.keyCode === 13 && setTimeout(() => {
        this.$refs.input.blur();
      }, 500);
    },
    onMouseMove(t) {
      var n;
      if (this.device === "mobile")
        return;
      const e = (n = this.$refs.border) == null ? void 0 : n.getBoundingClientRect(), s = 30;
      e.left - s < t.clientX && e.right + s > t.clientX && e.top - s < t.clientY && e.bottom + s > t.clientY ? this.tweenOnMouse(t, e) : this.tweenAround();
    },
    tweenAround() {
      if (this.roundTween || this.value || this.isFocused)
        return;
      this.stopTweenOnMouse();
      const t = [{ x: 80, y: 0, duration: 0.4 }, { x: 110, y: 50, duration: 0.4 }, { x: 80, y: 100, duration: 0.5 }, { x: 50, y: 130, duration: 0.4 }, { x: 20, y: 100, duration: 0.4 }, { x: -10, y: 50, duration: 0.4 }, { x: 20, y: 0, duration: 0.5 }, { x: 50, y: -30, duration: 0.4 }], e = u.timeline(), s = {
        x: this.borderX,
        y: this.borderY
      }, n = t.findIndex((l) => this.borderY > 50 ? l.x < this.borderX && l.y >= 50 : l.x > this.borderX && l.y <= 50), i = t.slice(n);
      i[0].duration = 0.6, i.forEach((l) => {
        e.to(s, {
          ...l,
          onUpdate: () => {
            this.borderX = s.x, this.borderY = s.y;
          },
          ease: "none"
        });
      });
      const o = u.timeline({
        repeat: -1
      }), a = {
        x: 50,
        y: -30
      };
      t.forEach((l) => {
        o.to(a, {
          ...l,
          onUpdate: () => {
            this.borderX = a.x, this.borderY = a.y;
          },
          ease: "none"
        });
      }), this.roundTween = u.timeline(), this.roundTween.add(e), this.roundTween.add(o);
    },
    tweenOnMouse(t, e) {
      if (this.isFocused)
        return;
      this.stopTweenAround();
      const s = (t.clientX - e.left) / e.width * 100, n = (t.clientY - e.top) / e.height * 100, i = {
        x: this.borderX,
        y: this.borderY
      }, a = {
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
      this.mouseTween = u.to(i, a);
    },
    tweenOnFocus(t = {}) {
      this.stopTweenAround(), this.stopTweenOnMouse(), this.stopTweenFocus();
      const e = {
        x: parseInt(this.borderXSize, 10),
        y: parseInt(this.borderYSize, 10)
      }, s = {
        x: t.reverse ? H : 200,
        y: t.reverse ? P : 200
      }, n = {
        duration: t.reverse ? 1 : 3,
        ...s,
        onUpdate: () => {
          this.borderXSize = `${e.x}%`, this.borderYSize = `${e.y}%`;
        },
        onComplete: t.onComplete,
        ease: "power3.out"
      };
      this.focusTween = u.to(e, n);
    },
    stopTweenOnMouse() {
      var t;
      (t = this.mouseTween) == null || t.kill(), this.mouseTween = null;
    },
    stopTweenAround() {
      var t;
      (t = this.roundTween) == null || t.kill(), this.roundTween = null;
    },
    stopTweenFocus() {
      var t;
      (t = this.focusTween) == null || t.kill(), this.focusTween = null;
    },
    setPlaceholder() {
      if (Array.isArray(this.placeholder)) {
        this.currentPlaceholder = this.placeholder[0];
        return;
      }
      this.currentPlaceholder = this.placeholder;
    },
    animatePlaceholder() {
      let t = 0;
      this.placeholderInterval = setInterval(() => {
        t < this.placeholder.length - 1 ? t++ : t = 0, this.currentPlaceholder = this.placeholder[t];
      }, 2e3);
    }
  }
};
var jn = function() {
  var e = this, s = e._self._c;
  return s("div", { class: [e.$style.VInput, e.classList] }, [s("div", { class: e.$style.shadow, style: e.borderStyle }, [s("div", { class: e.$style.shadowInner })]), s("div", { ref: "inner", class: e.$style.inner }, [s("input", e._b({ ref: "input", staticClass: "sova-input__native _weight", class: e.$style.native, attrs: { "aria-label": e.label, tabindex: 0 }, domProps: { value: e.inputValue }, on: { keydown: e.onKeyDown, blur: e.onBlur, focus: e.onFocus, input: e.onInput } }, "input", e.attributes, !1)), e.placeholder ? s("div", { class: e.$style.placeholder }, [s("transition", { attrs: { name: "widget-sova-carousel" } }, [s("span", { key: e.currentPlaceholder, class: e.$style.placeholderInner }, [e._v(" " + e._s(e.currentPlaceholder) + " ")])])], 1) : e._e(), s("div", { ref: "border", class: e.$style.border, style: e.borderStyle }), e.premask ? s("div", { class: e.$style.premask, domProps: { innerHTML: e._s(e.currentPremask) } }) : e._e()]), s("span", { class: e.$style.label }, [e._v(" " + e._s(e.label) + " ")]), s("transition", { attrs: { name: "widget-sova-fade" } }, [e.msg ? s("InputHint", { attrs: { color: e.color } }, [e._v(" " + e._s(e.msg) + " ")]) : e._e()], 1)], 1);
}, Nn = [];
const R = {
  $style: Rn
};
function qn(t) {
  for (var e in R)
    this[e] = R[e];
}
var Xn = /* @__PURE__ */ c(
  Dn,
  jn,
  Nn,
  !1,
  qn,
  null,
  null,
  null
);
const Gn = Xn.exports, Yn = async () => new Promise((t) => {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.type = "text/css", e.href = "https://spukibugi.github.io/chat_temporary/style.css", document.head.appendChild(e), e.onload = () => {
    t();
  };
}), D = async () => {
  var n;
  await Yn();
  const t = document.createElement("div");
  document.body.appendChild(t), p.filter("splitThousands", Vs), p.filter("formatDateTime", Hs), p.component("VIcon", Zs), p.component("VButton", an), p.component("VButtonIcon", vn), p.component("VInput", Gn), p.config.ignoredElements = ["widget-sova"], p.use(Rs);
  const e = document.querySelector("#widget-sova"), s = (n = e == null ? void 0 : e.dataset) == null ? void 0 : n.id;
  new p({
    el: t,
    components: {
      App: Ws
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
document.readyState === "complete" ? D() : document.addEventListener("DOMContentLoaded", D);
export {
  g as E,
  Hs as f,
  c as n
};
