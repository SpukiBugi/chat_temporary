<template>
    <div
        :class="[$style.Menu, {[$style._chatOpening]: isChatOpening, [$style._open]: isOpen}]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div ref="main" :class="$style.main">
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
                             @click="onControlClick(control)"
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

        <div
            :class="$style.text"
        >
            <transition name="widget-sova-appear" mode="out-in">
                <div v-if="activeText"
                     :key="activeText"
                     :class="$style.textBlur"
                >
                    <div :class="$style.textInner"
                         v-html="activeText"
                    />
                </div>
            </transition>
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

    data() {
        return {
            isChatOpening: false,
            isOpen: false,

            controls: [
                {
                    icon: 'IcMessage',
                    text: 'Получить ответ',
                    step: 'Chat',
                },
                {
                    icon: 'IcPhone',
                    text: 'Заказать звонок',
                    step: 'Call',
                },
                {
                    icon: 'IcMenu',
                    text: 'Весь функционал',
                    step: 'ChatWithOptions',
                },
            ],

            activeText: '',
        };
    },

    methods: {
        onMouseEnter() {
            this.isOpen = true;
        },

        onMouseLeave() {
            this.isOpen = false;
        },

        onControlEnter(control) {
            this.activeText = control.text;
        },

        onControlsLeave() {
            this.activeText = '';
        },

        onControlClick(control) {
            this.isChatOpening = true;
            this.isOpen = false;
            this.$emit('go-step', control.step);

            setTimeout(() => {
                this.$emit('open');

                setTimeout(() => {
                    this.isChatOpening = false;
                }, 500);
            }, 500);
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
        background: rgba(25, 27, 30, .06);
        backdrop-filter: blur(16px);
        will-change: transform;
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
        bottom: 0;
        z-index: -1;
        overflow: hidden;
        isolation: isolate;
        pointer-events: none;
    }

    .textBlur {
        padding: 8px 8px 64px;
        border-radius: 28px 28px 40px 40px;
        background: rgba(25, 27, 30, .06);
        // backdrop-filter: blur(16px);
        will-change: transform;
    }

    .textInner {
        padding: 8px 12px;
        border-radius: 16px;
        background-color: $white;
        white-space: nowrap;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
    }
</style>
