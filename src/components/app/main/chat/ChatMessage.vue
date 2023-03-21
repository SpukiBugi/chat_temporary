<template>
    <div :class="[$style.ChatMessage, ...classList]">
        <div :class="$style.bubble">
            <div :class="$style.bubbleText" v-html="item.text"></div>
            <div v-if="item.type === 'answer'" :class="$style.rate">
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :color="item.rating === false ? 'primary-500' : 'base-100'"
                             :class="[$style.rateItem, $style._dislike, {[$style._active]: item.rating === false }]"
                             @click="$emit('set-rating', {value: item.rating === false ? null : false, item: item})"
                />
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :color="item.rating === true ? 'primary-500' : 'base-100'"
                             :class="[$style.rateItem, $style._like, {[$style._active]: item.rating === true }]"
                             @click="$emit('set-rating', {value: item.rating === true ? null : true, item: item})"
                />
            </div>
            <ChatMessageFlat v-if="item.flat"
                             :flat="item.flat"
                             :class="$style.flat"
            />
        </div>

        <VButton v-if="item.link"
                 :href="item.link"
                 size="size-40"
                 blank
                 :class="$style.link"
        >
            Смотреть
        </VButton>
    </div>
</template>

<script>
import ChatMessageFlat from '@/components/app/main/chat/message/ChatMessageFlat.vue';

export default {
    name: 'ChatMessage',

    components: {
        ChatMessageFlat,
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {};
    },

    computed: {
        classList() {
            return [
                this.$style[`_${this.item.type}`],
                {
                    [this.$style._rated]: typeof this.item.rating == 'boolean',
                },
            ];
        },
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .ChatMessage {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -.015em;

        @include hover {
            .rate {
                width: 52px;
                opacity: 1;
            }

            .rateItem._dislike {
                transform: translateX(calc(-100% - 4px)) rotate(-180deg);
            }
        }

        &._question {
            margin-left: auto;
            text-align: right;

            .bubble {
                border-radius: 16px 16px 4px 16px;
                background-color: $primary-100;
            }
        }

        &._answer {
            margin-right: auto;

            .bubble {
                border-radius: 16px 16px 16px 4px;
                background-color: $base-100;
            }
        }

        &._rated {
            .rate {
                opacity: 1;
            }
        }
    }

    .bubble {
        position: relative;
        padding: 12px 16px;
    }

    .bubbleText {
        a {
            position: relative;
            color: $primary-500;
            transition: $default-transition;

            &:hover {
                filter: brightness(.7);
            }

            &:after {
                content: '';
                position: relative;
                top: 2px;
                display: inline-block;
                width: 13px;
                height: 13px;
                margin-left: 4px;
                border-radius: 3px;
                background-image: url('/link.svg');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
    }

    .rate {
        position: absolute;
        right: 12px;
        bottom: 0;
        display: flex;
        width: 28px;
        height: 28px;
        border-radius: 12px;
        background-color: $white;
        opacity: 0;
        transform: translateY(50%);
        transition: $default-transition;
    }

    .rateItem {
        position: absolute;
        top: 4px;
        right: 4px;
        transition: $default-transition;

        &._active {
            z-index: 1;
        }

        &._dislike {
            transform: rotate(-180deg);
        }
    }

    .link {
        margin-top: 8px;
    }
</style>
