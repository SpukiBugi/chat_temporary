<template>
    <div :class="$style.ChatMessages">
        <VScrollBox ref="scrollbox" :class="$style.scrollable">
            <div :class="$style.list">
                <ChatMessage
                    v-for="item in history"
                    :key="item.id"
                    :item="item"
                    :class="$style.message"
                />
            </div>
        </VScrollBox>
    </div>
</template>

<script>
import ChatMessage from '@/components/app/main/chat/ChatMessage.vue';
import VScrollBox from '@/components/ui/scrollbox/VScrollBox.vue';

export default {
    name: 'ChatMessages',

    components: {
        ChatMessage,
        VScrollBox,
    },

    props: {
        history: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
        };
    },

    watch: {
        history() {
            this.scrollToBottom();
        },
    },

    mounted() {
        this.scrollToBottom(true);
    },

    methods: {
        scrollToBottom(isFirst) {
            const container = this.$refs.scrollbox.$refs.wrapper;

            if (isFirst || (container.scrollTop + container.clientHeight === container.scrollHeight)) {
                container.scrollTop = container.scrollHeight;
            }
        },
    },
};
</script>

<style lang='scss' module>
    .ChatMessages {
        //
    }

    .scrollable {
        max-height: 516px;
    }

    .list {
        display: flex;
        flex-direction: column;
        padding: 0 16px;
    }

    .message {
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
</style>
