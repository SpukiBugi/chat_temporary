<template>
    <div :class="$style.Feedback">
        <transition name="widget-sova-fade-abs">
            <component
                :is="currentFeedback.component"
                :class="$style.component"
                @go-step="$emit('go-step', $event)"
            />
        </transition>

        <FeedbackMenu
            :class="$style.menu"
            class="widget-sova-main-menu"
            @go-step="$emit('go-step', $event)"
            @item-mouseenter="onItemMouseEnter"
            @menu-mouseleave="onMenuMouseLeave"
        />
    </div>
</template>

<script>
import FeedbackMenu from '@/components/app/main/feedback/FeedbackMenu.vue';

export default {
    name: 'Feedback',

    components: {
        FeedbackMenu,
    },

    props: {
        currentStep: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            startId: this.currentStep.id,
            feedbacks: [
                {
                    id: 'FeedbackCall',
                    component: () => import('@/components/app/main/feedback/FeedbackCall.vue'),
                },
                {
                    id: 'FeedbackTelegram',
                    component: () => import('@/components/app/main/feedback/FeedbackTelegram.vue'),
                },
                {
                    id: 'FeedbackWhatsapp',
                    component: () => import('@/components/app/main/feedback/FeedbackWhatsapp.vue'),
                },
                {
                    id: 'FeedbackThanks',
                    component: () => import('@/components/app/main/feedback/FeedbackThanks.vue'),
                },
            ],
        };
    },

    computed: {
        currentFeedback() {
            return this.feedbacks.find(el => el.id === this.currentStep.id);
        },
    },

    methods: {
        onItemMouseEnter(item) {
            this.$emit('go-step', item.step);
        },

        onMenuMouseLeave() {
            this.$emit('go-step', this.startId);
        },
    },
};
</script>

<style lang='scss' module>
    .Feedback {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 320px;
    }

    .component {
        flex-grow: 1;
        width: 100%;
    }

    .menu {
        margin-top: auto;
    }
</style>
