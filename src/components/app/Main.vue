<template>
    <div :class="[$style.Main]">
        <div :class="$style.wrapper">
            <div ref="head" :class="$style.head">
                <VButton :class="$style.about">Обо мне</VButton>
                <VIcon name="IcCloseCircle"
                       size="size-20"
                       :class="$style.close"
                       @click="$emit('close')"
                />
            </div>

            <div ref="componentWrap"
                 :class="$style.componentWrap"
                 :style="{height: currentStep.height}"
            >
                <transition name="widget-sova-fade" mode="out-in">
                    <component
                        :is="currentStep.component"
                        :with-options="currentStep.withOptions"
                        @go-step="$emit('go-step', $event)"
                    />
                </transition>
            </div>

            <Expander :is-open="isMenuOpen">
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

    .menu {
        padding: 20px 20px 4px;
    }
</style>
