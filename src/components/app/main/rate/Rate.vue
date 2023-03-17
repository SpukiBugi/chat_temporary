<template>
    <div :class="$style.Rate">
        <transition name="widget-sova-fade" mode="out-in">
            <component
                :is="currentStep.component"
                :class="$style.content"
                @go-step="onGoStep"
            />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Rate',

    data() {
        return {
            stepId: 'Hello',
            steps: [
                {
                    id: 'Hello',
                    component: () => import('@/components/app/main/rate/RateHello.vue'),
                },
                {
                    id: 'Choose',
                    component: () => import('@/components/app/main/rate/RateChoose.vue'),
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
    .Rate {
        //
    }

    .content {
        height: 284px;
    }
</style>
