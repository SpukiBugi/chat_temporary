<template>
    <div :class="[$style.expander, {'_hidden': !isOpen ,'_changing': changing}]" :style="{height: premountHeight}">
        <slot />
    </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.min.js';

export default {
    name: 'Expander',

    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },

        duration: {
            type: Number,
            default: 0.3,
        },

        enterDelay: {
            type: Number,
            default: 0,
        },

        leaveDelay: {
            type: Number,
            default: 0,
        },

        ease: {
            type: String,
            default: 'power1.out',
        },

        hideHeight: {
            type: [Number, String],
            default: 0,
        },
    },

    data() {
        return {
            isMounted: false,
            changing: false,
            changeTimeout: false,
        };
    },

    computed: {
        premountHeight() {
            if (this.isMounted) {
                return '';
            }

            return this.isOpen ? 'auto' : this.hideHeight;
        },
    },

    watch: {
        isOpen() {
            this.changing = true;

            if (this.isOpen) {
                gsap.to(this.$el, {
                    duration: this.duration,
                    delay: this.enterDelay,
                    height: 'auto',
                    ease: this.ease,
                    onComplete: () => {
                        this.changing = false;
                    },
                });
            } else {
                gsap.to(this.$el, {
                    duration: this.duration,
                    delay: this.leaveDelay,
                    height: this.hideHeight,
                    ease: this.ease,
                    onComplete: () => {
                        this.changing = false;
                    },
                });
            }
        },
    },

    mounted() {
        this.isMounted = true;

        this.$nextTick(() => {
            this.$el.style.height = this.isOpen ? 'auto' : this.hideHeight;
        });
    },
};
</script>

<style lang="scss" module>
    .expander {
        &:global(._changing),
        &:global(._hidden) {
            overflow: hidden;
        }
    }
</style>
