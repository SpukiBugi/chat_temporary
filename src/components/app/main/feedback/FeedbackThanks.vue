<template>
    <div :class="$style.FeedbackThanks">
        <VIcon name="IcRateFinish" :class="$style.message" />
    </div>
</template>

<script>
export default {
    name: 'FeedbackThanks',

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .FeedbackThanks {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0 16px;
        cursor: pointer;
        user-select: none;
    }

    .message {
        width: 100%;
        height: 200px;
        margin-top: 12px;
        margin-bottom: auto;
    }
</style>
