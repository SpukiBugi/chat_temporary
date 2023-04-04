<template>
    <div :class="$style.FeedbackMenu"
         @mouseleave="$emit('menu-mouseleave')"
    >
        <VButton
            v-for="item in items"
            :key="item.label"
            color="base-100"
            :href="item.href"
            :target="item.target"
            :class="$style.btn"
            @click="onItemClick(item)"
            @mouseenter="onItemMouseEnter(item)"
        >
            {{ item.label }}
        </VButton>
    </div>
</template>

<script>
export default {
    name: 'FeedbackMenu',

    data() {
        return {
            items: [
                {
                    label: 'Получить ответ',
                    step: 'Chat',
                    onClick: () => this.$emit('go-step', 'Chat'),
                },
                {
                    label: 'Звонок',
                    step: 'FeedbackCall',
                    onClick: () => console.log('CTA callback'),
                    onMouseEnter: item => this.$emit('item-mouseenter', item),
                },
                {
                    label: 'Whatsapp',
                    step: 'FeedbackWhatsapp',
                    href: 'https://www.google.com/',
                    target: 'blank',
                    onMouseEnter: item => this.$emit('item-mouseenter', item),
                },
                {
                    label: 'Telegram',
                    step: 'FeedbackTelegram',
                    href: 'https://www.google.com/',
                    target: 'blank',
                    onMouseEnter: item => this.$emit('item-mouseenter', item),
                },
            ],
        };
    },

    methods: {
        onItemClick(item) {
            if (!item.onClick) {
                return;
            }

            item.onClick(item);
        },

        onItemMouseEnter(item) {
            if (!item.onMouseEnter) {
                return;
            }

            item.onMouseEnter(item);
        },
    },
};
</script>

<style lang='scss' module>
    .FeedbackMenu {
        display: flex;
        justify-content: center;
        gap: 4px;
        padding: 20px 20px 4px;
    }

    .btn {
        white-space: nowrap;
    }
</style>
