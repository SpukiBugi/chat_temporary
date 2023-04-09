<template>
    <div :class="$style.FeedbackThanks">
        <VIcon name="IcRateFinish" :class="$style.message" />
    </div>
</template>

<script>
export default {
    name: 'FeedbackThanks',

    data() {
        return {
            timeout: null,
        };
    },

    mounted() {
        this.timeout = setTimeout(() => {
            this.$emit('go-step', 'Chat');
        }, 4000);
    },

    beforeDestroy() {
        clearTimeout(this.timeout);
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
        margin-top: 28px;
        margin-bottom: auto;
    }
</style>
