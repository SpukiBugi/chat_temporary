<template>
    <div :class="$style.ChatMessages">
        <VScrollBox ref="scrollbox"
                    resizable
                    :class="$style.scrollable"
        >
            <div :class="$style.list">
                <ChatMessage
                    v-for="item in history"
                    :key="item.id"
                    :item="item"
                    :class="$style.message"
                />

                <ChatPreload
                    v-if="isLoading"
                    :class="$style.message"
                />
            </div>
        </VScrollBox>
    </div>
</template>

<script>
import VScrollBox from '@/components/ui/scrollbox/VScrollBox.vue';
import ChatMessage from '@/components/app/main/chat/ChatMessage.vue';
import ChatPreload from '@/components/app/main/chat/ChatPreload.vue';

export default {
    name: 'ChatMessages',

    components: {
        VScrollBox,
        ChatMessage,
        ChatPreload,
    },

    props: {
        history: {
            type: Array,
            default: () => [],
        },

        isLoading: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
        };
    },

    watch: {
        isLoading() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
    },

    mounted() {
        this.scrollToBottom();
    },

    methods: {
        scrollToBottom() {
            const container = this.$refs.scrollbox.$refs.wrapper;
            container.scrollTop = container.scrollHeight;
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
        padding: 0 16px 20px;
    }

    .message {
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
</style>
