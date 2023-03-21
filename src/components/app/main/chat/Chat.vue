<template>
    <div :class="$style.Chat">
        <ChatMessages
            v-if="history.length || isLoading"
            :history="history"
            :is-loading="isLoading"
            :class="$style.messages"
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

        <form :class="$style.inputWrap" @submit.prevent="onSubmit">
            <VInput
                v-model="value"
                :autocomplete="false"
                placeholder="Напишите любой вопрос..."
                :class="$style.input"
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
import ChatMessages from '@/components/app/main/chat/ChatMessages.vue';
import testHistory from '@/assets/json/testHistory';
import Expander from '../../../ui/Expander.vue';

export default {
    name: 'Chat',

    components: {
        ChatMessages,
        Expander,
    },

    props: {
        withOptions: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /** Flags */
            isLoading: false,

            /** Info */
            history: [] || testHistory,

            /** Form */
            value: '',
            message: '',
        };
    },

    computed: {
        isSendGray() {
            return this.isLoading || !this.value;
        },
    },

    methods: {
        async onSubmit() {
            if (this.isLoading) {
                this.message = 'Отправить сообщение можно после получения ответа';

                return;
            }

            if (!this.value) {
                return;
            }

            this.isLoading = true;
            const question = this.value;
            this.value = '';
            this.message = '';

            try {
                this.history.push({ id: 'new', type: 'question', text: question });
                const res = await this.getAnswer(question);
                this.history[this.history.length - 1] = res.question;
                this.history.push(res.answer);
                this.message = '';

                if (this.history.length === 2) {
                    this.message = 'Не тот ответ? Попробуйте переформулировать вопрос';
                }
            } catch (e) {
                console.warn('[Chat/onSubmit] error: ', e);
                this.message = 'Произошла ошибка.<br>Попробуйте отправить сообщение повторно';
            }

            this.isLoading = false;
        },

        getAnswer(value) {
            const id = String(Math.random());

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        question: {
                            id: `q-${id}`,
                            type: 'question',
                            text: value,
                        },
                        answer: {
                            id: `a-${id}`,
                            question_id: `q-${id}`,
                            type: 'answer',
                            text: 'Да, у нас есть несколько евроквартир с балконами. <a href="https://google.com">Двухкомнатные</a> квартиры имеют эркеры, большие кухни и кладовые, спальни с панорамным видом, балконы. В однокомнатных квартирах есть гардеробные, уютные спальни с балконами, панорамные окна на кухнях. Апартаменты Terrace также имеют балконы, поэтому вы можете насладиться утренним кофе или романтическим ужином на свежем воздухе.',
                            rating: true,
                        },
                    });
                }, 4000);
            });
        },
    },
};
</script>

<style lang='scss' module>
    .Chat {
        width: 100%;
    }

    .hello {
        margin-top: 45px;
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
