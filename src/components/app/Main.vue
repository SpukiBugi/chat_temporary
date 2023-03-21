<template>
    <transition name="widget-sova-fade" mode="out-in">
        <div :key="currentHeight" :class="[$style.Main]">
            <div :class="$style.wrapper">
                <div :class="$style.avatarBlur"></div>
                <div :class="$style.avatar">
                    <slot name="avatar" />
                </div>

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
import Avatar from '@/components/ui/Avatar.vue';
import Expander from '@/components/ui/Expander.vue';
import MainMenu from '@/components/app/main/MainMenu.vue';

export default {
    name: 'Main',

    components: {
        Avatar,
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
        width: 356px;
        padding: 8px;
        border-radius: 32px;
        background: rgba(25, 27, 30, .06);
        backdrop-filter: blur(16px);
    }

    .avatarBlur {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: -1;
        width: 356px;
        height: 140px;
        border-radius: 50%;
        background: rgba(25, 27, 30, .06);
        transform: translate3d(-50%, -40px, 0);
        backdrop-filter: blur(16px);
        clip-path: path('M212.553 19.8362C216.395 26.405 222.669 32 230.278 32H317.6C331.041 32 337.762 32 342.896 34.6158C347.412 36.9168 351.083 40.5883 353.384 45.1042C356 50.2381 356 56.9587 356 70.4V124C356 132.837 348.837 140 340 140H16C7.16344 140 0 132.837 0 124V70.4C0 56.9587 0 50.2381 2.61584 45.1042C4.9168 40.5883 8.58834 36.9168 13.1042 34.6158C18.2381 32 24.9587 32 38.4 32H125.722C133.331 32 139.605 26.405 143.447 19.8362C150.386 7.97057 163.262 0 178 0C192.738 0 205.614 7.97058 212.553 19.8362Z');
    }

    .avatar {
        position: absolute;
        top: 0;
        left: 50%;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        transform: translate3d(-50%, -50%, 0);
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
