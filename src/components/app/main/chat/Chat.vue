<template>
    <div :class="$style.Chat">
        <ChatOptions
            v-if="isShowOptions && !hasSend"
            :class="$style.options"
            @question-click="$emit('question-click', $event)"
        />

        <ChatMessages
            v-else-if="history.length || isLoading"
            :history="history"
            :is-loading="isLoading"
            :is-long="isLong"
            :class="$style.messages"
            @set-rating="$emit('set-rating', $event)"
            @project-click="$emit('question-click', $event)"
        />

        <div v-else :class="$style.hello">
            <p>Привет! Я Сова – </p>
            <p :class="$style.helloBottom">отвечу на вопрос за 4 секунды</p>
        </div>

        <Expander :is-open="Boolean(message)"
                  :class="$style.messageExpander"
        >
            <div :class="$style.messageWrap">
                <div :key="message"
                     :class="[$style.message]"
                     v-html="message"
                >
                </div>
            </div>
        </Expander>

        <form :class="$style.inputWrap" @submit.prevent="$emit('submit')">
            <VInput
                :value="value"
                :autocomplete="false"
                placeholder="Напишите любой вопрос..."
                :class="$style.input"
                @input="$emit('set-value', $event)"
            />

            <button :class="[$style.send, {[$style._gray]: isSendGray}]">
                <VIcon name="IcSend"
                       size="size-16"
                       :class="$style.sendIcn"
                />
            </button>
        </form>
    </div>
</template>

<script>
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'Chat',

    components: {
        ChatOptions: () => import('@/components/app/main/chat/ChatOptions.vue'),
        ChatMessages: () => import('@/components/app/main/chat/ChatMessages.vue'),
        Expander,
    },

    props: {
        isLong: {
            type: Boolean,
            default: false,
        },

        isShowOptions: {
            type: Boolean,
            default: false,
        },

        isLoading: {
            type: Boolean,
            default: false,
        },

        hasSend: {
            type: Boolean,
            default: false,
        },

        history: {
            type: Array,
            required: true,
        },

        value: {
            type: String,
            default: '',
        },

        message: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
        };
    },

    computed: {
        isSendGray() {
            return this.isLoading || !this.value;
        },
    },
};
</script>

<style lang='scss' module>
    .Chat {
        position: relative;
        width: 100%;
    }

    .hello {
        padding-top: 45px;
        padding-bottom: 20px;
        text-align: center;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -.02em;
    }

    .helloBottom {
        color: $base-300;
    }

    .messageWrap {
        padding: 0 16px 8px;
    }

    .message {
        padding: 4px 8px;
        border-radius: 8px;
        border: 1px solid $primary-200;
        background-color: $primary-100;
        font-weight: 500;
        font-size: 11px;
        line-height: 14px;
        letter-spacing: -.01em;
        color: $primary-500;
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

    .inputWrap {
        position: relative;
        padding: 0 8px;
    }

    .send {
        position: absolute;
        top: 50%;
        right: 8px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        color: $primary-500;
        transform: translateY(-50%);
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        @include hover {
            color: $primary-600;
        }

        &:active {
            color: $primary-900;
        }

        &._gray {
            color: $base-400;
        }
    }
</style>
