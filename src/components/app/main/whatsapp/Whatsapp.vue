<template>
    <div :class="$style.Whatsapp">
        <div :class="$style.image"></div>
        <div :class="$style.text">Нажмите для перехода к менеджеру<br>или наведите камеру на QR-код</div>
    </div>
</template>

<script>
export default {
    name: 'Whatsapp',

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Whatsapp {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: 176px;
        height: 176px;
        margin-top: 40px;
        border-radius: 24px;
        background-color: black;
    }

    .text {
        margin-top: 20px;
        padding: 8px 0;
        text-align: center;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
        color: $base-500;
    }

</style>
