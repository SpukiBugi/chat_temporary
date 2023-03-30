<template>
    <div :class="[$style.ChatMessage, ...classList]">
        <div :class="$style.bubble">
            <div :class="$style.bubbleText">
                <span v-html="item.text"></span>
                <span v-if="item.type === 'answer' && item.date" :class="$style.time">{{ item.date|formatDateTime('$G:$I') }}</span>
            </div>
            <div v-if="item.type === 'answer' && item.id !== 'error'" :class="$style.rate">
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :color="item.rating === false ? 'primary-500' : 'base-100'"
                             rotate
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

        <VButton v-if="item.id === 'error'"
                 size="size-40"
                 :class="$style.link"
                 @click="$emit('repeat-click')"
        >
            Спросить еще раз
        </VButton>

        <div v-show="item.projects && item.projects !== 'NONE' && item.projects.length" :class="$style.projects">
            <VButton v-for="(project, key) in item.projects"
                     :key="project + key"
                     :class="$style.project"
                     @click="$emit('value-click', project)"
            >
                {{ project }}
            </VButton>
        </div>
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
                transform: translateX(calc(-100% - 4px));
            }

            .time {
                opacity: 0;
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

            .time {
                opacity: 0;
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

    .time {
        float: right;
        margin-top: 4px;
        margin-left: 12px;
        font-size: 11px;
        line-height: 14px;
        color: $base-400;
        transition: $default-transition;
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
    }

    .link {
        margin-top: 8px;
    }

    .projects {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        margin-top: 12px;
        column-gap: 4px;
        row-gap: 6px;
    }
</style>
