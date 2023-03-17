<template>
    <div :class="[$style.ChatMessage, ...classList]">
        <div :class="$style.bubble">
            <div :class="$style.bubbleText" v-html="item.text"></div>

            <div v-if="item.type === 'answer'" :class="$style.rate">
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :class="[$style.rateItem, $style._dislike]"
                />
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :class="[$style.rateItem, $style._like]"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatMessage',

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
            ];
        },
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .ChatMessage {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -.015em;

        @include hover {
            .rate {
                opacity: 1;
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
    }

    .bubble {
        position: relative;
        padding: 12px 16px;
    }

    .rate {
        position: absolute;
        right: 12px;
        bottom: 0;
        display: flex;
        padding: 4px;
        border-radius: 12px;
        background-color: $white;
        opacity: 0;
        transform: translateY(50%);
        transition: $default-transition;
    }

    .rateItem {
        &:not(:last-child) {
            margin-right: 4px;
        }

        &._dislike {
            transform: rotate(180deg);
        }
    }
</style>
