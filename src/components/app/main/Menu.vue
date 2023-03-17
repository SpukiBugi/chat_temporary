<template>
    <div :class="$style.Menu">
        <VButton
            v-for="item in items"
            :key="item.link"
            color="base-100"
            :class="$style.btn"
            @click="$emit('go-step', item.link)"
        >
            {{ item.label }}
        </VButton>
    </div>
</template>

<script>
export default {
    name: 'Menu',

    data() {
        return {
            items: [
                {
                    label: 'Оценить сайт',
                    link: 'Rate',
                },
                {
                    label: 'Звонок',
                    link: 'Call',
                },
                {
                    label: 'Whatsapp',
                    link: 'Whatsapp',
                },
                {
                    label: 'Telegram',
                    link: 'Telegram',
                },
            ],
        };
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Menu {
        display: flex;
        gap: 6px;
    }

    .btn {
        flex-grow: 1;
    }
</style>
