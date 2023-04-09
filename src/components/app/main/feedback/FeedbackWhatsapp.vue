<template>
    <a :class="$style.FeedbackWhatsapp"
       href="https://dzen.ru/"
       target="_blank"
    >
        <VueQrcode
            :value="'https://dzen.ru/'"
            :options="{ width: 176 }"
            tag="svg"
            :class="$style.image"
        />
        <div :class="$style.text">Нажмите для перехода к менеджеру<br>или наведите камеру на QR-код</div>
    </a>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
    name: 'FeedbackWhatsapp',

    components: {
        VueQrcode,
    },

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .FeedbackWhatsapp {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: 176px;
        height: 176px;
        margin-top: 28px;
    }

    .text {
        margin-top: 20px;
        padding: 7px 0;
        text-align: center;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: -.015em;
        color: $base-500;
    }
</style>
