<template>
    <transition name="widget-sova-fade" mode="out-in">
        <div :key="currentHeight" :class="[$style.Main]">
            <div :class="$style.wrapper">
                <div :class="$style.head">
                    <VButton :class="$style.about">Обо мне</VButton>
                    <VIcon name="IcCloseCircle"
                           size="size-20"
                           :class="$style.close"
                           @click="$emit('set-state', 'normal')"
                    />
                </div>

                <transition name="widget-sova-fade" mode="out-in">
                    <component
                        :is="currentStep.component"
                        :with-options="currentStep.withOptions"
                        :style="{height: currentStep.height}"
                        @go-step="$emit('go-step', $event)"
                    />
                </transition>

                <Expander :is-open="isMenuOpen">
                    <MainMenu
                        :class="$style.menu"
                        @go-step="$emit('go-step', $event)"
                    />
                </Expander>
            </div>
        </div>
    </transition>
</template>

<script>
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
            required: true,
        },
    },

    data() {
        return {
            /** Flags */
            isMenuOpen: true,
        };
    },

    computed: {
        /** Нужно чтобы анимировать весь виджет вместо контента внутри */
        currentHeight() {
            return this.currentStep.height;
        },
    },
};
</script>

<style lang='scss' module>
    .Main {
        position: relative;
        overflow: hidden;
        width: 356px;
        padding: 40px 8px 8px;
        border-radius: 32px;
        background: rgba(25, 27, 30, .06);
        backdrop-filter: blur(16px);
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

    .menu {
        padding: 20px 20px 4px;
    }
</style>
