<template>
    <div
        :class="$style.RateHello"
        @click="$emit('go-step', {name: 'Chat'})"
    >
        <VIcon name="IcRateFinish" :class="$style.message" />
    </div>
</template>

<script>
export default {
    name: 'RateHello',

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .RateHello {
        padding: 0 16px;
        cursor: pointer;
        user-select: none;
    }

    .message {
        width: 100%;
        height: 200px;
        margin-top: 40px;
    }
</style>
