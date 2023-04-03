<template>
    <div :class="$style.Whatsapp">
        <a :class="$style.main"
           href="https://www.google.com/"
           target="_blank"
        >
            <VueQrcode
                :value="'https://www.google.com/'"
                :options="{ width: 176 }"
                tag="svg"
                :class="$style.image"
            />
            <div :class="$style.text">Нажмите для перехода к менеджеру<br>или наведите камеру на QR-код</div>
        </a>

        <MainMenu
            :class="$style.menu"
            class="widget-sova-main-menu"
            @go-step="$emit('go-step', $event)"
        />
    </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';
import MainMenu from '@/components/app/main/MainMenu.vue';

export default {
    name: 'Whatsapp',

    components: {
        VueQrcode,
        MainMenu,
    },

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Whatsapp {
        //
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: 176px;
        height: 176px;
        margin-top: 12px;
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
