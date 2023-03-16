<template>
    <div :class="$style.Chat">
        <div :class="$style.head">
            <VButton :class="$style.about">Обо мне</VButton>
            <VIcon name="CloseCircle" :class="$style.close" />
        </div>

        <ChatMessages
            :history="history"
            :class="$style.messages"
        />

        <div :class="$style.inputWrap">
            <VInput
                v-model="value"
                :autocomplete="false"
                placeholder="Напишите любой вопрос..."
                :class="$style.input"
            />

            <div :class="$style.send">
                <VIcon name="Send"
                       size="size-16"
                       :class="$style.sendIcn"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VInput from '@/components/ui/input/VInput.vue';
import ChatMessages from '@/components/app/chat/ChatMessages.vue';
import testHistory from '@/assets/json/testHistory';

export default {
    name: 'Chat',

    components: {
        VInput,
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
        position: fixed;
        right: 32px;
        bottom: 32px;
        width: 356px;
        padding-bottom: 8px;
        border-radius: 24px;
        background-color: white;
    }

    .head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 12px;
    }

    .close {
        margin-bottom: 2px;
        color: $base-300;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        @include hover {
            color: $base-600;
        }

        &:active {
            color: $primary-500;
        }
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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        transform: translateY(-50%);
        user-select: none;
        pointer-events: none;
    }
</style>
