<template>
    <div :class="$style.Chat">
        <div :class="$style.scollable"></div>

        <div :class="$style.inputWrap">
            <VInput
                v-model="value"
                :autocomplete="false"
                placeholder="Напишите любой вопрос..."
                :class="$style.input"
            />
        </div>
    </div>
</template>

<script>
import VInput from '@/components/ui/input/VInput.vue';

export default {
    name: 'Chat',
    components: { VInput },

    data() {
        return {
            value: '',
        };
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Chat {
        position: fixed;
        right: 32px;
        bottom: 32px;
        width: 356px;
        border-radius: 24px;
        background-color: white;
    }

    .scrollable {
        max-height: 516px;
    }

    .inputWrap {
        padding: 0 8px;
    }
</style>
