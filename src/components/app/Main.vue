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
                    v-if="currentStep"
                    ref="componentHeight"
                    :class="$style.componentHeight"
                >
                    <transition
                        :css="false"
                        mode="out-in"
                        @before-leave="beforeLeave"
                        @leave="leave"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"
                    >
                        <component
                            :is="currentStep.component"
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
        };
    },

    computed: {
        isMenuHidden() {
            return this.currentStep?.id === 'Chat' && this.isMenuHiddenChat;
        },
    },

    methods: {
        beforeLeave(el) {
            const content = this.$refs.componentHeight;
            content.style.overflow = 'hidden';
            content.style.height = `${this.$refs.componentHeight.clientHeight}px`;
        },

        leave(el, done) {
            gsap.to(this.$refs.componentHeight, {
                opacity: 0,
                duration: .3,
                onComplete: done,
            });
        },

        beforeEnter(el) {
            el.style.position = 'absolute';
            el.style.height = 'auto';
            el.style.width = '100%';
        },

        enter(el, done) {
            setTimeout(() => {
                const height = getComputedStyle(el).height;

                gsap.to(this.$refs.componentHeight, {
                    opacity: 1,
                    height: height,
                    duration: .3,
                    onComplete: done,
                    ease: 'power2.out',
                });
            }, 100);
        },

        afterEnter(el) {
            const content = this.$refs.componentHeight;
            content.style.overflow = '';
            content.style.height = '';

            el.style.position = '';
            el.style.height = '';
            el.style.width = '';
            el.style.opacity = '';
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
        width: 100%;
    }

    .componentHeight {
        position: relative;
        width: 100%;
    }

    .menu {
        padding: 20px 20px 4px;
    }
</style>
