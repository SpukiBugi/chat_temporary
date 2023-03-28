<template>
    <div :class="$style.ChatMessages">
        <VScrollBox ref="scrollbox"
                    resizable
                    skip-offset
                    :class="$style.scrollable"
        >
            <div :class="$style.list">
                <template
                    v-for="item in currentList"
                >
                    <div v-if="item.type === 'date'"
                         :key="item.id"
                         :class="$style.date"
                    >
                        {{ item.date|formatDateTime('$j $e') }}
                    </div>
                    <ChatMessage
                        v-else
                        :key="item.id"
                        :item="item"
                        :class="$style.message"
                        @set-rating="$emit('set-rating', $event)"
                        @value-click="$emit('value-click', $event)"
                        @repeat-click="$emit('repeat-click')"
                    />
                </template>

                <ChatPreload
                    v-if="isLoading"
                    :class="$style.message"
                />
            </div>
        </VScrollBox>
    </div>
</template>

<script>
import { formatDateTime } from '@/assets/js/utils/date-time-utils';

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
                return this.splitByDate(this.history);
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

        splitByDate(items) {
            let currentDate = null;
            const list = [];

            items.forEach((element, key) => {
                if (element.date && formatDateTime(element.date, '$j $e') !== formatDateTime(currentDate, '$j $e')) {
                    list.push({ id: `date-${key}`, type: 'date', date: element.date });
                    currentDate = element.date;
                }

                list.push(element);
            });

            return list;
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

        @include respond-to(tablet) {
            max-height: calc(100vh - 212px);
        }

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

    .date {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 38px;
        font-size: 11px;
        line-height: 14px;
        letter-spacing: -.01em;
        color: $base-500;

        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
</style>
