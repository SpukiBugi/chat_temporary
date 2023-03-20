<template>
    <transition name="widget-sova-fade" mode="out-in">
        <div :key="currentHeight" :class="[$style.Chat]">
            <div :class="$style.wrapper">
                <div :class="$style.avatarBlur"></div>
                <Avatar :class="$style.avatar" />

                <div :class="$style.head">
                    <VButton :class="$style.about">Обо мне</VButton>
                    <VIcon name="IcCloseCircle"
                           size="size-20"
                           :class="$style.close"
                           @click="onGoStep('Chat')"
                    />
                </div>

                <transition name="widget-sova-fade" mode="out-in">
                    <component
                        :is="currentStep.component"
                        :style="{height: currentStep.height}"
                        @go-step="onGoStep"
                    />
                </transition>

                <Expander :is-open="isMenuOpen">
                    <Menu
                        :class="$style.menu"
                        @go-step="onGoStep"
                    />
                </Expander>
            </div>
        </div>
    </transition>
</template>

<script>
import Avatar from '@/components/ui/Avatar.vue';
import Expander from '@/components/ui/Expander.vue';
import Menu from '@/components/app/main/Menu.vue';

export default {
    name: 'Chat',

    components: {
        Avatar,
        Expander,
        Menu,
    },

    data() {
        return {
            /** Flags */
            isMenuOpen: true,

            /** Steps */
            stepId: 'Chat',
            steps: [
                {
                    id: 'Chat',
                    component: () => import('@/components/app/main/chat/Chat.vue'),
                    height: 'auto',
                },
                {
                    id: 'Rate',
                    component: () => import('@/components/app/main/rate/Rate.vue'),
                    height: '284px',
                },
                {
                    id: 'Call',
                    component: () => import('@/components/app/main/call/Call.vue'),
                    height: '284px',
                },
                {
                    id: 'Telegram',
                    component: () => import('@/components/app/main/telegram/Telegram.vue'),
                    height: '284px',
                },
                {
                    id: 'Whatsapp',
                    component: () => import('@/components/app/main/whatsapp/Whatsapp.vue'),
                    height: '284px',
                },
            ],
        };
    },

    computed: {
        currentStep() {
            return this.steps.find(el => el.id === this.stepId);
        },

        /** Нужно чтобы анимировать весь виджет вместо контента внутри */
        currentHeight() {
            return this.currentStep.height;
        },
    },

    methods: {
        onGoStep(val) {
            this.stepId = val;
        },
    },
};
</script>

<style lang='scss' module>
    .Chat {
        position: fixed;
        right: 32px;
        bottom: 32px;
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
        height: 80px;
        border-radius: 50%;
        background: rgba(25, 27, 30, .06);
        transform: translate3d(-50%, -50%, 0);
        backdrop-filter: blur(16px);
        clip-path: path('M 212.553 19.836 C 216.395 26.405 222.669 32 230.278 32 L 125.722 32 C 133.331 32 139.605 26.405 143.447 19.836 C 150.386 7.971 163.262 0 178 0 C 192.738 0 205.614 7.971 212.553 19.836 Z');
    }

    .avatar {
        position: absolute;
        top: 0;
        left: 50%;
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
