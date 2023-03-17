<template>
    <div :class="$style.Chat">
        <ChatMessages
            v-if="history.length"
            :history="history"
            :class="$style.messages"
        />

        <div v-else :class="$style.hello">
            <p>Привет! Я Сова – </p>
            <p :class="$style.helloBottom">отвечу на вопрос за 4 секунды</p>
        </div>

        <div :class="$style.inputWrap">
            <VInput
                v-model="value"
                :autocomplete="false"
                placeholder="Напишите любой вопрос..."
                :class="$style.input"
            />

            <div :class="$style.send">
                <VIcon name="IcSend"
                       size="size-16"
                       :class="$style.sendIcn"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ChatMessages from '@/components/app/main/chat/ChatMessages.vue';
import testHistory from '@/assets/json/testHistory';

export default {
    name: 'Chat',

    components: {
        ChatMessages,
    },

    data() {
        return {
            value: '',
            history: testHistory,
        };
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Chat {
        width: 100%;
    }

    .hello {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -.02em;
    }

    .helloBottom {
        color: $base-300;
    }

    .inputWrap {
        position: relative;
        margin-top: 20px;
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
    }
</style>
