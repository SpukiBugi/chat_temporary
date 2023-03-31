<template>
    <div
        :class="[$style.Menu, {[$style._chatOpening]: isChatOpening, [$style._open]: isOpen, [$style._text]: activeText}]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click="onClick"
    >
        <div ref="blur" :class="$style.blur">
            <div ref="mainBlur" :class="$style.mainBlur"></div>

            <transition
                name="widget-sova-appear"
                mode="out-in"
            >
                <div v-if="activeText"
                     :key="activeText"
                     :class="[$style.text, $style._blur]"
                >
                    <div :class="$style.textInner" v-html="activeText"> </div>
                </div>
            </transition>
        </div>

        <transition
            name="widget-sova-appear"
            mode="out-in"
            @before-leave="onBeforeLeaveText"
            @before-enter="onBeforeEnterText"
        >
            <div v-if="activeText"
                 :key="activeText"
                 :class="[$style.text, {[$style._link]: activeText === inviteText || activeText === newText}]"
                 @click="onTextClick"
            >
                <div :class="$style.textInner" v-html="activeText"></div>
            </div>
        </transition>

        <div ref="main" :class="$style.main">
            <Expander :is-open="isOpen"
                      field="width"
                      ease="back.out(1)"
                      :duration="closeDuration"
                      hide-size="48px"
                      :class="[$style.expander, $style._weight]"
            >
                <div ref="inner" :class="$style.inner">
                    <div
                        :class="$style.avatarWrap"
                        @mouseenter="onControlEnter('Познакомиться с Совой')"
                        @mouseleave="onControlLeave"
                        @click="goStep('Chat')"
                    >
                        <Avatar :has-status="isOpen"
                                :has-smile="isOpen"
                        />
                    </div>

                    <div :class="$style.controls">
                        <div v-for="control in controls"
                             :key="control.icon"
                             :class="[$style.control, {[$style._notif]: control.step === 'Chat' && hasNew}]"
                             @mouseenter="onControlEnter(control.text)"
                             @mouseleave="onControlLeave"
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

        hasNew: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isChatOpening: false,
            isOpen: false,
            isHovering: false,
            hasInteracted: false,

            controls: [
                {
                    icon: 'IcStar',
                    text: 'Оставить отзыв',
                    step: 'Rate',
                },
                {
                    icon: 'IcPhone',
                    text: 'Связаться с менеджером',
                    step: 'Call',
                },
                {
                    icon: 'IcMessage',
                    text: 'Получить ответ',
                    step: 'Chat',
                },
            ],

            activeText: '',
            autoInterval: null,
            inviteText: `За 4 <span class="${this.$style._desk}">секунды</span><span class="${this.$style._mob}">сек</span> отвечу на любой вопрос<span class="${this.$style.textLink}"></span>`,
            newText: `1 новое сообщение – <span class="${this.$style.textLink}">смотреть</span>`,
        };
    },

    computed: {
        isAutoActive() {
            return !this.isHovering && !this.isMainOpen && !this.activeText && this.device !== 'mobile';
        },

        closeDuration() {
            return this.isChatOpening ? 0.35 : 0.5;
        },
    },

    watch: {
        isAutoActive() {
            this.onAutoActiveChange();
        },

        hasNew() {
            this.onHasNewChange();
        },
    },

    mounted() {
        this.onHasNewChange();
        this.onAutoActiveChange();

        if (!this.hasInteracted) {
            this.initInvite();
        }
    },

    beforeDestroy() {
        clearInterval(this.autoInterval);
    },

    methods: {
        onMouseEnter() {
            if (this.device === 'mobile') {
                return;
            }

            this.isOpen = true;
            this.isHovering = true;
            this.hasInteracted = true;
        },

        onMouseLeave() {
            if (this.device === 'mobile') {
                return;
            }

            this.isOpen = false;
            this.isHovering = false;

            if (this.activeText === this.inviteText) {
                this.activeText = '';
            }
        },

        onClick() {
            if (this.device !== 'mobile') {
                return;
            }

            this.hasInteracted = true;

            if (this.activeText === this.inviteText) {
                this.activeText = '';
            }

            this.goStep('Chat');
        },

        onControlEnter(text) {
            this.activeText = text;
        },

        onControlLeave() {
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
            }, this.device === 'mobile' ? 0 : 350);
        },

        initInvite() {
            setTimeout(() => {
                if (!this.hasInteracted && !this.activeText) {
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
            if (this.device !== 'mobile') {
                this.$refs.mainBlur.style['border-top-right-radius'] = '';
                this.$refs.main.style['border-top-right-radius'] = '';
            }
        },

        onBeforeEnterText() {
            if (this.device !== 'mobile') {
                this.$refs.mainBlur.style['border-top-right-radius'] = 0;
                this.$refs.main.style['border-top-right-radius'] = 0;
            }
        },

        onTextClick() {
            if (this.activeText === this.inviteText || this.activeText === this.newText) {
                this.goStep('Chat');
            }
        },

        onHasNewChange() {
            if (this.hasNew) {
                this.activeText = this.newText;

                if (this.device !== 'mobile') {
                    this.isOpen = true;
                }
            } else if (this.activeText === this.newText) {
                this.activeText = '';
            }
        },

        onAutoActiveChange() {
            if (this.isAutoActive) {
                this.initAuto();
            } else {
                clearInterval(this.autoInterval);
            }
        },
    },
};
</script>

<style lang='scss' module>
    .Menu {
        &._open {
            .mainBlur {
                border-radius: 40px;
            }

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
        border-radius: 32px;
        transition: all .3s ease;
    }

    .blur {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .08;
        pointer-events: none;
    }

    .mainBlur {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 32px;
        background: rgb(30, 30, 34);
        transition: all .3s ease;
    }

    .inner {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0;
        border-radius: 26px;
        background-color: $primary-500;
        transition: padding $default-transition;
    }

    .avatarWrap {
        position: relative;
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        color: $primary-500;
        transition: width $default-transition, height $default-transition;
        cursor: pointer;
        user-select: none;
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

        &:after {
            content: '';
            position: absolute;
            top: 6px;
            right: 6px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            border: 1px solid $primary-500;
            background-color: $white;
            opacity: 0;
            transition: $default-transition;
        }

        &:hover {
            background-color: $primary-600;
            color: $primary-300;

            &:after {
                border-color: $primary-600;
                background-color: $primary-300;
            }
        }

        &:not(:last-child) {
            margin-right: 4px;
        }

        &._notif {
            &:after {
                opacity: 1;
            }
        }
    }

    .text {
        position: absolute;
        right: 0;
        bottom: calc(100% - 8px);
        overflow: hidden;
        padding: 8px;
        border-radius: 24px 24px 0 24px;
        pointer-events: none;
        transition: all $default-transition;

        @include respond-to(mobile) {
            right: 26px;
            bottom: 50%;
            padding: 8px 38px 8px 8px;
            border-radius: 24px;
            transform: translateY(50%);

            &:global(.widget-sova-appear-enter),
            &:global(.widget-sova-appear-leave-active) {
                transform: translate(20px, 50%);
            }
        }

        &._link {
            pointer-events: all;
            cursor: pointer;
            user-select: none;

            &:hover {
                color: $primary-500;
            }
        }

        &._blur {
            background: rgb(30, 30, 34);

            .textInner {
                visibility: hidden;
            }
        }

        ._desk {
            @include respond-to(mobile) {
                display: none;
            }
        }

        ._mob {
            display: none;

            @include respond-to(mobile) {
                display: inline;
            }
        }
    }

    .textInner {
        position: relative;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        border-radius: 16px;
        background-color: $white;
        white-space: nowrap;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -.015em;
    }

    .textLink {
        position: relative;
        color: $primary-500;
        transition: $default-transition;

        &:after {
            content: '';
            position: relative;
            top: 2px;
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-left: 4px;
            border-radius: 3px;
            background-image: url('/link.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
</style>
