<template>
    <div :class="[$style.ChatMessages, {[$style._border]: hasBorder}]">
        <VScrollBox ref="scrollbox"
                    resizable
                    skip-offset
                    :class="$style.scrollable"
                    @on-scroll="onScroll"
        >
            <div :class="$style.list">
                <template
                    v-for="item in currentList"
                >
                    <div v-if="item.type === 'date'"
                         :key="item.id"
                         :class="$style.date"
                    >
                        {{ item.created|formatDateTime('$j $e') }}
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

                <Expander :is-open="Boolean(note)"
                          :class="$style.noteExpander"
                >
                    <div :class="[$style.noteWrap, {[$style._active]: Boolean(note)}]">
                        <div :key="note"
                             :class="[$style.note]"
                             v-html="note"
                        >
                        </div>
                    </div>
                </Expander>
            </div>
        </VScrollBox>
    </div>
</template>

<script>
import { formatDateTime } from '@/assets/js/utils/date-time-utils';

import VScrollBox from '@/components/ui/scrollbox/VScrollBox.vue';
import ChatMessage from '@/components/app/main/chat/ChatMessage.vue';
import ChatPreload from '@/components/app/main/chat/ChatPreload.vue';
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'ChatMessages',

    components: {
        VScrollBox,
        ChatMessage,
        ChatPreload,
        Expander,
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

        note: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            hasBorder: false,
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

            if (this.device === 'mobile') {
                this.hasBorder = container.scrollHeight > container.clientHeight;
            }
        },

        splitByDate(items) {
            let currentDate = null;
            const list = [];

            items.forEach((element, key) => {
                if (element.created && formatDateTime(element.created, '$j $e') !== formatDateTime(currentDate, '$j $e')) {
                    // list.push({ id: `date-${key}`, type: 'date', created: element.created });
                    currentDate = element.created;
                }

                list.push(element);
            });

            return list;
        },

        onScroll(e) {
            if (e.currentTarget.scrollTop < 100) {
                this.$emit('append-history');
            }
        },
    },
};
</script>

<style lang='scss' module>
    .ChatMessages {
        @include respond-to(mobile) {
            border-top: 1px solid transparent;
            transition: border $default-transition;
        }

        &._border {
            border-color: $base-200;
        }
    }

    .scrollable {
        max-height: 516px;

        @include respond-to(tablet) {
            @include landscape {
                height: calc(100 * var(--vh) - 200px);
                max-height: none;
            }
        }

        @include respond-to(mobile) {
            height: calc(100 * var(--vh) - 170px);
            max-height: none;
        }

        :global(.v-scrollbox__scrollbar._vertical) {
            display: none;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        padding: 48px 16px 20px;

        @include respond-to(mobile) {
            justify-content: flex-end;
            min-height: calc(100 * var(--vh) - 170px);
            padding: 8px 16px 20px;
        }
    }

    .message {
        &:not(:first-child) {
            margin-top: 12px;
        }
    }

    .date {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 39px;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -.01em;
        color: $base-500;

        &:not(:first-child) {
            margin-top: 12px;
        }
    }

    .noteExpander {
        position: sticky;
        bottom: 20px;
    }

    .noteWrap {
        position: relative;
        top: 12px;
        opacity: 0;
        transition: $default-transition;

        &._active {
            opacity: 1;
            transition: opacity $default-transition .2s;
        }
    }

    .note {
        padding: 4px 6px;
        border-radius: 8px;
        border: 1px solid var(--primary-200);
        background-color: var(--primary-100);
        text-align: center;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -.01em;
        color: var(--primary-500);
        transition: $default-transition;
        animation: toGray .3s ease 3s forwards;
    }

    @keyframes toGray {
        100% {
            border: 1px solid $base-200;
            background-color: $base-100;
            color: $base-500;
        }
    }
</style>
