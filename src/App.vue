<template>
    <!-- Кастомный тег чтобы можно было наложить reset стили без указания класса -->
    <my-widget
        :class="[$style.App, $style[`_${animationType}`]]"
    >
        <transition name="fade">
            <div v-show="stepId"
                 :class="$style.overlay"
                 @click="onClose"
            >
            </div>
        </transition>

        <Menu
            ref="menu"
            :is-main-open="isOpen"
            :class="$style.menu"
            class="widget-sova-app__menu"
            @open="onOpen"
            @go-step="onGoStep"
        />

        <div
            ref="mainContainer"
            :class="[$style.mainContainer, {[$style._active]: stepId}]"
        >
            <div v-if="stepId"
                 ref="mainWrap"
                 :class="$style.mainWrap"
            >
                <Main
                    ref="main"
                    :current-step="currentStep"
                    :step-props="stepProps"
                    :class="$style.main"
                    @close="onClose"
                    @go-step="onGoStep"
                />
            </div>
            <div ref="avatarWrap" :class="$style.avatarWrap">
                <Avatar
                    ref="avatar"
                    status-type="chat"
                    :has-status="isOpen"
                    :show-pic="isRelink && isOpen"
                />
            </div>
        </div>
    </my-widget>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.js';
import { debounce } from '@/assets/js/utils/common-utils';

import Menu from '@/components/app/Menu.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Main from '@/components/app/Main.vue';

export default {
    name: 'App',

    components: {
        Menu,
        Avatar,
        Main,
    },

    data() {
        return {
            /** Flags */
            isOpen: false,

            animationType: 'bottom',
            debouncedResize: debounce(this.onResize, 100),

            /** Steps */
            stepId: '',
            stepProps: {},
            steps: [
                {
                    id: 'Chat',
                    component: () => import('@/components/app/main/chat/Chat.vue'),
                    height: 'auto',
                },
                {
                    id: 'Rate',
                    component: () => import('@/components/app/main/rate/Rate.vue'),
                    height: '284px',
                },
                {
                    id: 'Call',
                    component: () => import('@/components/app/main/call/Call.vue'),
                    height: '284px',
                },
                {
                    id: 'Telegram',
                    component: () => import('@/components/app/main/telegram/Telegram.vue'),
                    height: '284px',
                },
                {
                    id: 'Whatsapp',
                    component: () => import('@/components/app/main/whatsapp/Whatsapp.vue'),
                    height: '284px',
                },
            ],
        };
    },

    computed: {
        currentStep() {
            return this.steps.find(el => el.id === this.stepId);
        },

        isRelink() {
            return this.stepId === 'Call' || this.stepId === 'Telegram' || this.stepId === 'Whatsapp';
        },
    },

    watch: {
        device() {
            this.onClose();
        },
    },

    mounted() {
        this.checkAnimationType();
        window.addEventListener('resize', this.debouncedResize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.debouncedResize);
    },

    methods: {
        onGoStep(step) {
            this.stepProps = step.props || {};
            this.stepId = step.id;
        },

        onResize() {
            this.checkAnimationType();
        },

        checkAnimationType() {
            const menuRect = this.$refs.menu.$el.getBoundingClientRect();

            if (menuRect?.top < window.innerHeight / 2) {
                this.animationType = 'top';
            } else {
                this.animationType = 'bottom';
            }
        },

        async onOpen() {
            this.isOpen = true;
            await this.$nextTick();

            if (this.animationType === 'top') {
                this.openAnimMob();
            } else {
                this.openAnimDesk();
            }
        },

        onClose() {
            this.isOpen = false;

            if (this.animationType === 'top') {
                this.closeAnimMob();
            } else {
                this.closeAnimDesk();
            }
        },

        openAnimDesk() {
            const duration = .4;
            const timeline = gsap.timeline();

            timeline.to(this.$refs.avatarWrap, {
                opacity: 1,
            });

            timeline.to(this.$refs.menu.$el, {
                opacity: 0,
                duration: .3,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: '8px',
                left: '50%',
                transform: 'scale(1.4) translate(-50%)',
            }, 0);

            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(1)',
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.head, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.componentWrap, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);
        },

        openAnimMob() {
            const duration = .4;
            const timeline = gsap.timeline();

            timeline.to(this.$refs.avatarWrap, {
                opacity: 1,
            });

            timeline.set(this.$refs.menu.$el, {
                opacity: 0,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: '8px',
                left: '50%',
                transform: 'scale(1.4) translate(-50%)',
            }, 0);

            timeline.to(this.$refs.mainContainer, {
                duration: duration,
                top: '100%',
                yPercent: -100,
            }, 0);

            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(1)',
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.head, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.componentWrap, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);
        },

        closeAnimDesk() {
            const duration = .3;
            const timeline = gsap.timeline();

            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(0)',
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: 'calc(100% - 8px)',
                left: 'calc(100% - 8px)',
                transform: 'scale(1) translate3d(-100%, -100%, 0)',
            }, 0);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 0,
            }, 0);

            timeline.set(this.$refs.menu.$el, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.avatarWrap, {
                opacity: 0,
            }, duration);

            timeline.set(this, {
                stepId: '',
            }, duration);
        },

        closeAnimMob() {
            const duration = .4;
            const timeline = gsap.timeline();
            const menuRect = this.$refs.menu.$el.getBoundingClientRect();

            timeline.to(this.$refs.mainWrap, {
                duration: .15,
                transform: 'scale(0)',
            }, 0);

            timeline.to(this.$refs.mainContainer, {
                duration: duration - .1,
                top: menuRect?.top,
                yPercent: 0,
            }, .1);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration - .1,
                top: 8,
                left: 'calc(100% - 20px)',
                transform: 'scale(1) translate3d(-100%, 0, 0)',
            }, .1);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 0,
            }, 0);

            timeline.set(this.$refs.menu.$el, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.avatarWrap, {
                opacity: 0,
            }, duration);

            timeline.set(this, {
                stepId: '',
            }, duration);

            timeline.set(this.$refs.mainContainer, {
                top: '',
            }, duration);
        },
    },
};
</script>

<style lang="scss" module>
    .App {

        /** По дефолту на десктопе */
        &._bottom {
            .mainWrap {
                transform-origin: 100% 100%;
            }

            .avatarWrap {
                transform: scale(1) translate3d(-100%, -100%, 0);
            }
        }

        /** По дефолту на мобилке */
        &._top {
            .mainContainer {
                top: 76px;
                bottom: auto;
            }

            .mainWrap {
                transform-origin: 50% 40px;
            }

            .avatarWrap {
                transform: scale(1) translate3d(-100%, 0, 0);
            }
        }
    }

    .menu {
        position: fixed;
        right: 32px;
        bottom: 32px;

        @include respond-to(mobile) {
            top: 76px;
            right: 12px;
            bottom: auto;
        }
    }

    .overlay {
        display: none;

        @include respond-to(tablet) {
            position: fixed;
            top: 0;
            right: 0;
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(#1e1e22, .8);
        }
    }

    .mainContainer {
        position: fixed;
        right: 32px;
        bottom: 32px;
        display: flex;
        justify-content: center;
        pointer-events: none;

        @include respond-to(mobile) {
            right: 0;
            width: 100%;
        }

        &._active {
            pointer-events: all;
        }
    }

    .mainWrap {
        transform: scale(0);

        @include respond-to(mobile) {
            margin: 0 auto;
        }
    }

    .avatarWrap {
        position: absolute;
        top: calc(100% - 8px);
        left: calc(100% - 8px);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        opacity: 0;
        will-change: transform;
        transform-origin: top left;

        @include respond-to(mobile) {
            top: 8px;
            left: calc(100% - 20px);
        }
    }
</style>

<style lang="scss">
    /** Reset */
    my-widget {
        box-sizing: border-box;
        font-family: $base-font;
        font-size: $base-font-size;
        color: $body-color;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: transparent;

        * {
            box-sizing: border-box;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        p {
            margin-top: 0;
            margin-bottom: 0;
        }

        ul {
            margin-top: 0;
            margin-bottom: 0;
            padding-left: 0;
        }

        li {
            list-style: none;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
            margin: 0; /* 2 */
            padding: 0;
            border: none;
            background-color: transparent;
            outline: none;
            font-family: inherit;
            font-size: 100%; /* 1 */
            line-height: 1.15; /* 1 */
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }

        input {
            outline: none;

            &[type=number]::-webkit-inner-spin-button,
            &[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &[disabled],
            fieldset[disabled] {
                -webkit-text-fill-color: $base-100;
                opacity: 1;
            }

            &::-ms-clear {
                display: none;
            }
        }

        textarea {
            resize: none;
        }

        pre,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
            font-weight: normal;
            font-size: initial;
        }

        address {
            font-style: normal;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:focus {
            transition: background-color 600000s 0s, color 600000s 0s;
        }

        b,
        strong {
            font-weight: bolder;
        }

        sub,
        sup {
            position: relative;
            vertical-align: baseline;
            font-size: 75%;
            line-height: 0;
        }

        sub {
            bottom: -.25em;
        }

        sup {
            top: -.5em;
        }

        button,
        input { /* 1 */
            overflow: visible;
        }

        button,
        select { /* 1 */
            text-transform: none;
        }

        button,
        [type="button"],
        [type="reset"],
        [type="submit"] {
            -webkit-appearance: button;
        }

        button::-moz-focus-inner,
        [type="button"]::-moz-focus-inner,
        [type="reset"]::-moz-focus-inner,
        [type="submit"]::-moz-focus-inner {
            padding: 0;
            border-style: none;
        }

        button:-moz-focusring,
        [type="button"]:-moz-focusring,
        [type="reset"]:-moz-focusring,
        [type="submit"]:-moz-focusring {
            outline: 1px dotted ButtonText;
        }

        fieldset {
            padding: .35em .75em .625em;
        }
    }

    /** End Reset */
</style>
