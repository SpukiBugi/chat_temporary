<template>
    <div :class="$style.Call">
        <div :class="$style.image"></div>
        <div :class="$style.text">Нажмите, чтобы заказать<br>консультацию у менеджера</div>
    </div>
</template>

<script>
export default {
    name: 'Call',

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Call {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: 176px;
        height: 176px;
        margin-top: 12px;
        border-radius: 16px;
        background-color: black;
    }

    .text {
        margin-top: 20px;
        padding: 8px 0;
        text-align: center;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -.015em;
        color: $base-500;
    }

</style>
