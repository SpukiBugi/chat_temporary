<template>
    <div :class="$style.MainMenu">
        <VButton
            v-for="item in items"
            :key="item.label"
            color="base-100"
            :class="$style.btn"
            @click="$emit('go-step', item.step)"
        >
            {{ item.label }}
        </VButton>
    </div>
</template>

<script>
export default {
    name: 'MainMenu',

    data() {
        return {
            items: [
                {
                    label: 'Оценить сайт',
                    step: 'Rate',
                },
                {
                    label: 'Звонок',
                    step: 'Call',
                },
                {
                    label: 'Whatsapp',
                    step: 'Whatsapp',
                },
                {
                    label: 'Telegram',
                    step: 'Telegram',
                },
            ],
        };
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .MainMenu {
        display: flex;
        justify-content: center;
        gap: 4px;
    }

    .btn {
        white-space: nowrap;
    }
</style>
