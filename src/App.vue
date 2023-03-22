<template>
    <!-- Кастомный тег чтобы можно было наложить reset стили без указания класса -->
    <my-widget :class="[$style.App, $style.reset]">
        <Menu :state="state"
              :class="$style.menu"
              @set-state="state = $event"
              @go-step="onGoStep"
        >
            <template #avatar>
                <Avatar v-if="state === 'normal' || state === 'open'"
                        :has-status="hasStatus"
                        status-type="menu"
                />
            </template>
        </Menu>

        <transition name="widget-sova-main-appear">
            <div
                v-if="state === 'main'"
                :class="$style.mainWrap"
            >
                <div class="widget-sova-app-main">
                    <Main
                        :current-step="currentStep"
                        :class="$style.main"
                        @set-state="state = $event"
                        @go-step="onGoStep"
                    />
                </div>
                <div :class="$style.avatar" class="widget-sova-app-avatar">
                    <Avatar v-if="state === 'main'"
                            status-type="chat"
                            :has-status="hasStatus"
                    />
                </div>
            </div>
        </transition>
    </my-widget>
</template>

<script>
import Menu from '@/components/app/Menu.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Main from '@/components/app/Main.vue';

export default {
    name: 'AudioGuideExample',

    components: {
        Menu,
        Avatar,
        Main,
    },

    data() {
        return {
            // normal || open || main
            state: 'normal',

            /** Steps */
            stepId: 'Chat',
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
                {
                    id: 'ChatWithOptions',
                    component: () => import('@/components/app/main/chat/Chat.vue'),
                    height: 'auto',
                    withOptions: true,
                },
            ],
        };
    },

    computed: {
        hasStatus() {
            return this.state === 'open' || this.state === 'main';
        },

        currentStep() {
            return this.steps.find(el => el.id === this.stepId);
        },
    },

    methods: {
        onGoStep(val) {
            this.state = 'main';
            this.stepId = val;
        },
    },
};
</script>

<style lang="scss" module>
    .App {
        //
    }

    .mainWrap,
    .menu {
        position: fixed;
        right: 32px;
        bottom: 32px;
    }

    .avatar {
        position: absolute;
        top: 8px;
        left: 50%;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        transform: translate3d(-50%, 0, 0);
    }
</style>


<style lang="scss">
    .widget-sova-main-appear-enter-active {
        transition: all .5s ease;

        .widget-sova-app-main {
            transform-origin: 100% 100%;
            transition: transform .5s ease;
        }

        .widget-sova-app-avatar {
            transition: all .5s ease;
        }

        .widget-sova-app-avatar-status {
            transition: opacity .5s ease;
        }
    }

    .widget-sova-main-appear-leave-active {
        transition: all .3s ease;

        .widget-sova-app-main {
            transform-origin: 100% 100%;
            transition: transform .3s ease;
        }

        .widget-sova-app-avatar {
            transition: all .3s ease;
        }

        .widget-sova-app-avatar-status {
            transition: opacity .3s ease;
        }
    }

    .widget-sova-main-appear-enter,
    .widget-sova-main-appear-leave-active {
        .widget-sova-app-main {
            transform: scale(0);
        }

        .widget-sova-app-avatar {
            top: calc(100% - 8px);
            left: calc(100% - 8px);
            width: 48px;
            height: 48px;
            transform: translate3d(-100%, -100%, 0);
        }

        .widget-sova-app-avatar-status {
            opacity: 0;
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
