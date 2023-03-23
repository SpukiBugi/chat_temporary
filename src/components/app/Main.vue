<template>
    <div :class="[$style.Main]">
        <div :class="$style.wrapper">
            <div ref="head" :class="$style.head">
                <VButton :class="$style.about" @click="$emit('go-step', {id: 'Chat'})">Обо мне</VButton>
                <VIcon name="IcCloseCircle"
                       size="size-20"
                       :class="$style.close"
                       @click="$emit('close')"
                />
            </div>

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
                            v-bind="stepProps"
                            @go-step="$emit('go-step', $event)"
                            @set-menu-hidden-chat="isMenuHiddenChat = $event"
                        />
                    </transition>
                </div>
            </div>

            <Expander :is-open="!isMenuHidden">
                <MainMenu
                    ref="mainMenu"
                    :class="$style.menu"
                    class="widget-sova-main-menu"
                    @go-step="$emit('go-step', $event)"
                />
            </Expander>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.js';

import Expander from '@/components/ui/Expander.vue';
import MainMenu from '@/components/app/main/MainMenu.vue';

export default {
    name: 'Main',

    components: {
        Expander,
        MainMenu,
    },

    props: {
        currentStep: {
            type: Object,
            default: () => ({}),
        },

        isMainOpen: {
            type: Boolean,
            default: false,
        },

        stepProps: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            isMenuHiddenChat: false,
            resizeObserver: null,
        };
    },

    computed: {
        isMenuHidden() {
            return this.currentStep?.id === 'Chat' && this.isMenuHiddenChat;
        },
    },

    mounted() {
        this.startObserver();
    },

    beforeDestroy() {
        this.stopObserver();
    },

    methods: {
        startObserver() {
            this.resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const height = entry.contentRect.height;

                    if (height !== 0) {
                        gsap.to(this.$refs.componentWrap, {
                            height: `${height}px`,
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
        @include backdrop;

        position: relative;
        overflow: hidden;
        width: 356px;
        padding: 40px 8px 8px;
        border-radius: 32px;
        mask-image: url('/mask.svg');
    }

    .wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 8px;
        border-radius: 24px;
        background-color: white;
    }

    .head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 12px;
    }

    .close {
        margin-bottom: 2px;
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

    .componentWrap {
        position: relative;
        overflow: hidden;
        width: 100%;
        // transition: height $default-transition;
    }

    .componentHeight {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .menu {
        padding: 20px 20px 4px;
    }
</style>
