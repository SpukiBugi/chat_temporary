<template>
    <div :class="$style.Chat">
        <ChatMessages
            v-if="isShowMessages"
            :history="history"
            :is-loading="isLoading"
            :is-long="isLong"
            :note="note"
            :class="$style.messages"
            @set-rating="$emit('set-rating', $event)"
            @value-click="$emit('value-click', $event)"
            @repeat-click="$emit('repeat-click')"
        />

        <div v-else :class="$style.hello">
            <p>Привет! Я Сова – </p>
            <p :class="$style.helloBottom">отвечу на вопрос за 4 секунды</p>
        </div>

        <form :class="$style.inputWrap" @submit.prevent="$emit('submit')">
            <VInput
                :value="value"
                :autocomplete="false"
                :placeholder="['Напишите любой вопрос...', 'Где расположены проекты?', 'Есть проекты с панорамными окнами?']"
                :is-placeholder-animating="!isShowMessages"
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

        <Expander :is-open="Boolean(!history.length)">
            <div :class="$style.disclaimer">
                Разработали и обучили <a href="https://idaproject.com/" target="_blank">idaproject</a>
            </div>
        </Expander>
    </div>
</template>

<script>
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'Chat',

    components: {
        Expander,
        ChatMessages: () => import('@/components/app/main/chat/ChatMessages.vue'),
    },

    props: {
        isLong: {
            type: Boolean,
            default: false,
        },

        isLoading: {
            type: Boolean,
            default: false,
        },

        isShowSwitch: {
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

        note: {
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

        isShowMessages() {
            return this.history.length || this.isLoading;
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
        padding-top: 17px;
        padding-bottom: 20px;
        text-align: center;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -.02em;

        @include respond-to(mobile) {
            padding-top: 40px;
        }
    }

    .helloBottom {
        color: $base-300;
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

    .disclaimer {
        padding: 16px 0 8px;
        text-align: center;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -.01em;
        color: $base-300;

        a {
            color: $primary-300;
            transition: $default-transition;

            &:hover {
                color: $primary-500;
            }

            &:active {
                color: $primary-600;
            }
        }
    }
</style>
