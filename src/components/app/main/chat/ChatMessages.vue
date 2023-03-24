<template>
    <div :class="$style.ChatMessages">
        <VScrollBox ref="scrollbox"
                    resizable
                    skip-offset
                    :class="$style.scrollable"
        >
            <div :class="$style.list">
                <ChatMessage
                    v-for="item in currentList"
                    :key="item.id"
                    :item="item"
                    :class="$style.message"
                    @set-rating="$emit('set-rating', $event)"
                    @project-click="$emit('project-click', $event)"
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

        isLong: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
        };
    },

    computed: {
        currentList() {
            if (this.isLong) {
                return this.history;
            }

            if (this.isLoading) {
                return this.history.slice(Math.max(this.history.length - 1, 0));
            }

            return this.history.slice(Math.max(this.history.length - 2, 0));
        },
    },

    watch: {
        isLoading() {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },

        isLong() {
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
        margin-top: -16px;

        :global(.v-scrollbox__scrollbar._vertical) {
            top: 16px;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        padding: 48px 16px 20px;
    }

    .message {
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
</style>
