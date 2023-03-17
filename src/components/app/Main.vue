<template>
    <transition
        mode="out-in"
        name="widget-sova-fade"
    >
        <div :key="stepId" :class="[$style.Chat]">

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

                <component
                    :is="currentStep.component"
                />

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
                },
                {
                    id: 'Rate',
                    component: () => import('@/components/app/main/rate/Rate.vue'),
                },
                {
                    id: 'Call',
                    component: () => import('@/components/app/main/call/Call.vue'),
                },
                {
                    id: 'Telegram',
                    component: () => import('@/components/app/main/telegram/Telegram.vue'),
                },
                {
                    id: 'Whatsapp',
                    component: () => import('@/components/app/main/whatsapp/Whatsapp.vue'),
                },
            ],
        };
    },

    computed: {
        currentStep() {
            return this.steps.find(el => el.id === this.stepId);
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
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(25, 27, 30, .06);
        transform: translate3d(-50%, -50%, 0);
        backdrop-filter: blur(16px);
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
