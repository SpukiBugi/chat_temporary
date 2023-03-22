<template>
    <div
        :class="[$style.Menu, $style[`_${state}`], {[$style._chatOpening]: isChatOpening}]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <div :class="$style.blur">
            <Expander :is-open="state === 'open'"
                      field="width"
                      ease="back.out(1)"
                      :duration="0.5"
                      hide-size="48px"
                      :class="[$style.expander, $style._weight]"
            >
                <div :class="$style.inner">
                    <div :class="$style.avatar">
                        <slot name="avatar" />
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
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'Menu',

    components: {
        Expander,
    },

    props: {
        state: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isChatOpening: false,

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
            this.$emit('set-state', 'open');
        },

        onMouseLeave() {
            if (this.state === 'open') {
                this.$emit('set-state', 'normal');
            }
        },

        onControlEnter(control) {
            this.activeText = control.text;
        },

        onControlsLeave() {
            this.activeText = '';
        },

        onControlClick(control) {
            this.isChatOpening = true;
            this.$emit('set-state', 'normal');

            setTimeout(() => {
                this.$emit('go-step', control.step);

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

        &._normal {
            .inner {
                padding: 0;
            }

            .avatar {
                width: 48px;
                height: 48px;
            }
        }

        &._chatOpening {
            pointer-events: none;
        }
    }

    .blur {
        overflow: hidden;
        padding: 8px;
        border-radius: 40px;
        background: rgba(25, 27, 30, .06);
        transition: $default-transition;
        backdrop-filter: blur(16px);
    }

    .inner {
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 24px;
        background-color: $primary-500;
        transition: $default-transition;
    }

    .avatar {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        transition: $default-transition;
    }

    .expander {
        &._weight {
            overflow: visible;
        }

        &:global(._changing) {
            .control {
                transition-duration: 0s;
            }
        }
    }

    .controls {
        display: flex;
        align-items: center;
        height: 100%;
        padding-right: 12px;
        padding-left: 16px;
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
        backdrop-filter: blur(16px);
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
