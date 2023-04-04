<template>
    <div :class="[$style.Main]">
        <div :class="$style.blur">
            <svg :class="$style.blurHat"
                 viewBox="0 0 144 32"
                 xmlns="http://www.w3.org/2000/svg"
            >
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M 106.553,19.8362 C 110.395,26.405 116.669,32 124.278,32 c -96.951811,3.92e-4 -0.005,0.01663 -104.556001,0 7.609,0 13.883,-5.595 17.725,-12.1638 C 44.385999,7.97057 57.261999,0 71.999999,0 c 14.738,0 27.614,7.97058 34.553001,19.8362 z"
                />
            </svg>
            <div :class="$style.blurBody"></div>
        </div>

        <div :class="$style.wrapper">
            <div ref="head" :class="$style.head">
                <VButton :class="$style.about" @click="$emit('go-step', 'Chat')">Обо мне</VButton>
                <VIcon name="IcCloseCircle"
                       size="size-20"
                       :class="$style.close"
                       @click="$emit('close')"
                />
            </div>

            <transition name="widget-sova-fade">
                <div
                    v-show="isShowSwitch"
                    :class="$style.switchElements"
                >
                    <transition name="widget-sova-fade">
                        <svg
                            v-show="isLong"
                            width="340"
                            height="64"
                            viewBox="0 0 340 64"
                            xmlns="http://www.w3.org/2000/svg"
                            :class="$style.switchBorder"
                        >
                            <path d="M103.318 63.5H0.5V32C0.5 26.3912 0.500389 22.2147 0.770823 18.9048C1.04078 15.6006 1.57734 13.2041 2.62537 11.1472C4.4949 7.47802 7.47802 4.4949 11.1472 2.62537C13.2041 1.57734 15.6006 1.04078 18.9048 0.770823C22.2147 0.500389 26.3912 0.5 32 0.5H308C313.609 0.5 317.785 0.500389 321.095 0.770823C324.399 1.04078 326.796 1.57734 328.853 2.62537C332.522 4.4949 335.505 7.47802 337.375 11.1472C338.423 13.2041 338.959 15.6006 339.229 18.9048C339.5 22.2147 339.5 26.3912 339.5 32V63.5H236.682C233.905 63.5 231.755 62.2646 229.951 60.3577C228.135 58.4371 226.694 55.8604 225.356 53.2331C224.349 51.2574 222.743 49.6511 220.767 48.6444C219.615 48.0576 218.307 47.7767 216.609 47.6379C214.921 47.5 212.804 47.5 210.023 47.5H210H130H129.977C127.196 47.5 125.079 47.5 123.391 47.6379C121.693 47.7767 120.385 48.0576 119.233 48.6444C117.257 49.6511 115.651 51.2574 114.644 53.2331C113.306 55.8604 111.865 58.4371 110.049 60.3577C108.245 62.2646 106.095 63.5 103.318 63.5Z"
                                  stroke="#E1E4EA"
                                  fill="transparent"
                            />
                        </svg>
                    </transition>

                    <div
                        :class="$style.longSwitch"
                        @click="switchLong(!isLong)"
                    >
                        <transition name="widget-sova-fade-abs">
                            <div :key="isLong" :class="[$style.longSwitchInner, [$style[isLong ? '_short' : '_long']] ]">
                                {{ isLong ? 'Краткий вид' : 'История сообщений' }}
                                <VIcon name="IcHistory"
                                       size="size-14"
                                       :class="$style.longSwitchIcn"
                                />
                            </div>
                        </transition>
                    </div>
                </div>
            </transition>

            <div ref="componentWrap"
                 :class="$style.componentWrap"
            >
                <div
                    ref="componentHeight"
                    :class="$style.componentHeight"
                >
                    <transition name="widget-sova-fade" mode="out-in">
                        <component
                            :is="currentStep.component"
                            v-if="currentStep"
                            ref="componentStep"
                            :is-long="isLong"
                            :is-loading="isLoading"
                            :is-show-switch="isShowSwitch"
                            :history="history"
                            :value="value"
                            :note="note"
                            :current-step="currentStep"
                            @go-step="$emit('go-step', $event)"
                            @set-value="$emit('set-value', $event)"
                            @value-click="$emit('value-click', $event)"
                            @submit="$emit('submit')"
                            @repeat-click="$emit('repeat-click')"
                            @set-rating="$emit('set-rating', $event)"
                        />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.js';

export default {
    name: 'Main',

    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },

        isLong: {
            type: Boolean,
            default: false,
        },

        history: {
            type: Array,
            required: true,
        },

        value: {
            type: String,
            default: '',
        },

        note: {
            type: String,
            default: '',
        },

        currentStep: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            resizeObserver: null,
        };
    },

    computed: {
        isMenuHidden() {
            return this.currentStep.id === 'Chat' && this.history.length;
        },

        isShowSwitch() {
            return this.currentStep.id === 'Chat' && this.history.length > 2 && this.device !== 'mobile';
        },
    },

    mounted() {
        this.startObserver();
    },

    beforeDestroy() {
        this.stopObserver();
    },

    methods: {
        switchLong(value) {
            this.$emit('go-step', 'Chat');
            this.$emit('set-long', value);
        },

        startObserver() {
            this.resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const height = entry.contentRect.height;

                    if (height !== 0) {
                        const timeline = gsap.timeline();
                        timeline.set(this.$refs.componentWrap, {
                            overflow: 'hidden',
                        }, 0);
                        timeline.to(this.$refs.componentWrap, {
                            height: `${height}px`,
                            duration: .4,
                        }, 0);
                        timeline.set(this.$refs.componentWrap, {
                            overflow: '',
                        });
                    }
                }
            });
            this.resizeObserver.observe(this.$refs.componentHeight);
        },

        stopObserver() {
            this.resizeObserver?.unobserve(this.$refs.componentHeight);
        },
    },
};
</script>

<style lang='scss' module>
    .Main {
        position: relative;
        overflow: hidden;
        width: 356px;
        max-width: 100vw;
        padding: 40px 8px 8px;
        border-radius: 26px;

        @include respond-to(mobile) {
            width: 100%;
            padding: 40px 8px 16px;
        }
    }

    .blur {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        opacity: .08;
        pointer-events: none;
    }

    .blurHat {
        width: 144px;
        height: 32px;
        margin: auto;
        fill: rgb(25, 27, 30);
    }

    .blurBody {
        flex-grow: 1;
        width: 100%;
        border-radius: 26px;
        background: rgb(25, 27, 30);
    }

    .wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 8px;
        border-radius: 20px;
        background-color: white;
    }

    .head {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        height: 64px;
        padding: 12px;
        background-color: $white;
        mask-image: url('/mask-head.svg');

        @include respond-to(mobile) {
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            mask-image: none;
            height: 48px;
        }
    }

    .close {
        margin-top: 2px;
        color: $base-300;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        @include hover {
            color: $base-600;
        }

        &:active {
            color: $primary-500;
        }
    }

    .switchBorder {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
    }

    .longSwitch {
        position: absolute;
        top: 52px;
        left: 50%;
        z-index: 1;
        display: flex;
        justify-content: center;
        transform: translateX(-50%);
        cursor: pointer;
        user-select: none;
    }

    .longSwitchInner {
        display: flex;
        align-items: center;
        padding: 5px 8px;
        border-radius: 8px;
        white-space: nowrap;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -.01em;
        transition: $default-transition;

        &._short {
            background-color: $primary-500;
            color: $white;
            gap: 8px;

            @include hover {
                background-color: $primary-600;
            }

            &:active {
                background-color: $primary-900;
            }

            .longSwitchIcn {
                transform: rotate(180deg);
            }
        }

        &._long {
            background-color: $white;
            color: $primary-500;
            gap: 4px;

            @include hover {
                color: $primary-600;
            }

            &:active {
                color: $primary-900;
            }
        }
    }

    .longSwitchIcn {
        margin-top: 1px;
    }

    .componentWrap {
        position: relative;
        width: 100%;
    }

    .componentHeight {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>
