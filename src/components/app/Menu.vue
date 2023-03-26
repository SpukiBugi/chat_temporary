<template>
    <div
        :class="[$style.Menu, {[$style._chatOpening]: isChatOpening, [$style._open]: isOpen, [$style._text]: activeText}]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div ref="main" :class="$style.main">
            <div ref="mainBlur" :class="$style.mainBlur"></div>
            <Expander :is-open="isOpen"
                      field="width"
                      ease="back.out(1)"
                      :duration="0.5"
                      hide-size="48px"
                      :class="[$style.expander, $style._weight]"
            >
                <div ref="inner" :class="$style.inner">
                    <div :class="$style.avatarWrap">
                        <Avatar :has-status="isOpen"
                                status-type="menu"
                        />
                    </div>

                    <div
                        :class="$style.controls"
                        @mouseleave="onControlsLeave"
                    >
                        <div v-for="control in controls"
                             :key="control.icon"
                             :class="$style.control"
                             @mouseenter="onControlEnter(control)"
                             @click="goStep(control.step)"
                        >
                            <VIcon
                                :name="control.icon"
                                size="size-20"
                            />
                        </div>
                    </div>
                </div>
            </Expander>
        </div>

        <transition
            name="widget-sova-appear"
            mode="out-in"
            @before-leave="onBeforeLeaveText"
            @before-enter="onBeforeEnterText"
        >
            <div v-if="activeText"
                 :key="activeText"
                 :class="[$style.text, {[$style._link]: activeText === inviteText}]"
                 @click="onTextClick"
            >
                <div :class="$style.textBlur"></div>
                <div :class="$style.textInner">
                    <div v-html="activeText"></div>
                    <div v-if="activeText === inviteText"
                         :class="$style.textIcn"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar.vue';
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'Menu',

    components: {
        Avatar,
        Expander,
    },

    props: {
        isMainOpen: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isChatOpening: false,
            isOpen: false,
            isHovering: false,
            hasHovered: false,

            controls: [
                {
                    icon: 'IcMessage',
                    text: 'Получить ответ',
                    step: { id: 'Chat' },
                },
                {
                    icon: 'IcPhone',
                    text: 'Заказать звонок',
                    step: { id: 'Call' },
                },
                {
                    icon: 'IcMenu',
                    text: 'Весь функционал',
                    step: { id: 'Chat', props: { isShowOptions: true } },
                },
            ],

            activeText: '',
            autoInterval: null,
            inviteText: 'За 4 секунды отвечу на любой вопрос',
        };
    },

    computed: {
        isAutoActive() {
            return !this.isHovering && !this.isMainOpen && !this.activeText;
        },
    },

    watch: {
        isAutoActive: {
            handler(val) {
                if (val) {
                    this.initAuto();
                } else {
                    clearInterval(this.autoInterval);
                }
            },
            immediate: true,
        },
    },

    mounted() {
        this.initAuto();

        if (!this.hasHovered) {
            this.initInvite();
        }
    },

    beforeDestroy() {
        clearInterval(this.autoInterval);
    },

    methods: {
        onMouseEnter() {
            this.isOpen = true;
            this.isHovering = true;
            this.hasHovered = true;
        },

        onMouseLeave() {
            this.isOpen = false;
            this.isHovering = false;

            if (this.activeText === this.inviteText) {
                this.activeText = '';
            }
        },

        onControlEnter(control) {
            this.activeText = control.text;
        },

        onControlsLeave() {
            this.activeText = '';
        },

        goStep(step) {
            this.isChatOpening = true;
            this.isOpen = false;
            this.activeText = '';
            this.$emit('go-step', step);

            setTimeout(() => {
                this.$emit('open');

                setTimeout(() => {
                    this.isChatOpening = false;
                }, 500);
            }, 500);
        },

        initInvite() {
            setTimeout(() => {
                if (!this.hasHovered) {
                    this.activeText = this.inviteText;
                }
            }, 4000);
        },

        initAuto() {
            clearInterval(this.autoInterval);

            this.autoInterval = setInterval(() => {
                if (this.isAutoActive) {
                    this.isOpen = !this.isOpen;
                }
            }, 4000);
        },

        onBeforeLeaveText() {
            this.$refs.mainBlur.style['border-top-right-radius'] = '40px';
            this.$refs.main.style['border-top-right-radius'] = '40px';
        },

        onBeforeEnterText() {
            this.$refs.mainBlur.style['border-top-right-radius'] = 0;
            this.$refs.main.style['border-top-right-radius'] = 0;
        },

        onTextClick() {
            if (this.activeText === this.inviteText) {
                this.goStep({ id: 'Chat' });
            }
        },
    },
};
</script>

<style lang='scss' module>
    .Menu {
        position: relative;

        &._open {
            .inner {
                padding: 4px;
            }

            .avatarWrap {
                width: 40px;
                height: 40px;
            }

            .control {
                opacity: 1;
                transform: translateY(0);
            }
        }

        &._chatOpening {
            pointer-events: none;
        }
    }

    .main {
        position: relative;
        overflow: hidden;
        padding: 8px;
        border-radius: 40px;
        backdrop-filter: blur(8px);
        background: rgba(25, 27, 30, .06);
        transition: all .3s ease;

        :global(.is-ios) & {
            background: none;
            backdrop-filter: none;
        }
    }

    .mainBlur {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        border-radius: 40px;
        transition: all .3s ease;

        :global(.is-ios) & {
            display: block;
            backdrop-filter: none;
            background: rgba(157, 168, 185, .2);
            filter: blur(2px);
        }
    }

    .inner {
        display: flex;
        align-items: center;
        padding: 0;
        border-radius: 24px;
        background-color: $primary-500;
        transition: padding $default-transition;
    }

    .avatarWrap {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        transition: width $default-transition, height $default-transition;
    }

    .expander {
        &._weight {
            overflow: visible;
        }

        &:global(._changing) {
            .control {
                transition: all $default-transition, background-color 0s linear;
            }
        }
    }

    .controls {
        overflow: hidden;
        display: flex;
        align-items: center;
        height: 100%;
        padding-right: 12px;
        padding-left: 16px;
        transition: $default-transition;
    }

    .control {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 12px;
        color: $white;
        opacity: 0;
        transform: translateY(50%);
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: $primary-600;
            color: $primary-300;
        }

        &:not(:last-child) {
            margin-right: 4px;
        }
    }

    .text {
        position: absolute;
        right: 0;
        bottom: calc(100% - 8px);
        z-index: -1;
        padding: 8px;
        border-radius: 28px 28px 0 28px;
        background: rgba(25, 27, 30, .06);
        backdrop-filter: blur(8px);
        pointer-events: none;
        transition: all $default-transition;

        :global(.is-ios) & {
            background: none;
            backdrop-filter: none;
        }

        &._link {
            pointer-events: all;
            cursor: pointer;
            user-select: none;

            &:hover {
                color: $primary-500;
            }
        }
    }

    .textBlur {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        border-radius: 28px 28px 0 28px;

        :global(.is-ios) & {
            display: block;
            background: linear-gradient(135deg, rgba(157, 168, 185, .2) 0%, rgba(157, 168, 185, .2) 90%, transparent 100%);
            backdrop-filter: none;
            filter: blur(2px);
        }
    }

    .textInner {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        border-radius: 16px;
        background-color: $white;
        white-space: nowrap;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
    }

    .textIcn {
        width: 13px;
        height: 13px;
        margin-top: 2px;
        background-image: url("/link.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>
