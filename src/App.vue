<template>
    <!-- Кастомный тег чтобы можно было наложить reset стили без указания класса -->
    <my-widget
        :class="[$style.App]"
    >
        <Menu
            ref="menu"
            :is-main-open="isOpen"
            :class="$style.menu"
            @open="onOpen"
            @go-step="onGoStep"
        />

        <div v-if="stepId"
             ref="mainContainer"
             :class="$style.mainContainer"
        >
            <div ref="mainWrap" :class="$style.mainWrap">
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

    methods: {
        onGoStep(step) {
            this.stepProps = step.props || {};
            this.stepId = step.id;
        },

        async onOpen() {
            this.isOpen = true;
            await this.$nextTick();

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

        onClose() {
            this.isOpen = false;
            const duration = .3;
            const timeline = gsap.timeline();

            timeline.to(this.$refs.main.$refs.head, {
                opacity: 0,
                duration: .3,
            }, 0);

            timeline.to(this.$refs.main.$refs.componentWrap, {
                opacity: 0,
                duration: .3,
            }, 0);

            timeline.to(this.$refs.main.$refs.mainMenu.$el, {
                opacity: 0,
                duration: .3,
            }, 0);

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

            timeline.set(this.$refs.menu.$refs.inner, {
                opacity: 0,
            }, 0);

            timeline.set(this.$refs.menu.$el, {
                opacity: 1,
            }, .1);

            timeline.set(this.$refs.menu.$refs.inner, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.avatarWrap, {
                opacity: 0,
            }, duration);

            timeline.set(this, {
                stepId: '',
            }, duration);
        },
    },
};
</script>

<style lang="scss" module>
    .App {
        //
    }

    .mainContainer,
    .menu {
        position: fixed;
        right: 32px;
        bottom: 32px;
    }

    .mainWrap {
        transform: scale(0);
        transform-origin: 100% 100%;
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
        transform: translate3d(-100%, -100%, 0);
        transform-origin: top left;
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
