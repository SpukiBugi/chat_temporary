<template>
    <div
        :class="$style.RateHello"
        @click="$emit('go-rate-step', 'Choose')"
    >
        <VIcon name="IcRate" :class="$style.message" />

        <div :class="$style.help">
            Нажмите, чтобы оставить отзыв
            <br>
            о нашем сайте
        </div>
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
        height: 176px;
        margin-top: 40px;
    }

    .help {
        margin-top: 20px;
        padding: 8px 0;
        text-align: center;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
        color: $base-500;
    }
</style>
