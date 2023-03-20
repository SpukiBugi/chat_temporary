<template>
    <div :class="$style.Rate">
        <transition name="widget-sova-fade" mode="out-in">
            <component
                :is="currentRateStep.component"
                :class="$style.content"
                @go-rate-step="onGoRateStep"
                @go-step="$emit('go-step', $event)"
            />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Rate',

    data() {
        return {
            rateStepId: 'Hello',
            rateSteps: [
                {
                    id: 'Hello',
                    component: () => import('@/components/app/main/rate/RateHello.vue'),
                },
                {
                    id: 'Choose',
                    component: () => import('@/components/app/main/rate/RateChoose.vue'),
                },
                {
                    id: 'Bye',
                    component: () => import('@/components/app/main/rate/RateBye.vue'),
                },
            ],
        };
    },

    computed: {
        currentRateStep() {
            return this.rateSteps.find(el => el.id === this.rateStepId);
        },
    },

    methods: {
        onGoRateStep(val) {
            this.rateStepId = val;
        },
    },
};
</script>

<style lang='scss' module>
    .Rate {
        //
    }

    .content {
        height: 100%;
    }
</style>
