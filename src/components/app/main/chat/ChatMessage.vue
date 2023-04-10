<template>
    <div :class="[$style.ChatMessage, ...classList]">
        <div :class="$style.bubble">
            <div :class="$style.bubbleText">
                <span v-html="item.text"></span>
                <span v-if="item.type === 'answer' && item.created" :class="$style.time">
                    <VIcon name="IcLike"
                           size="size-12"
                           rotate
                           :class="[$style.timeLike, {[$style._active]: item.rating, [$style._dislike]: item.rating === 'dislike'}]"
                    />
                    <span>{{ item.created|formatDateTime('$G:$I') }}</span>
                </span>
            </div>
            <div v-if="item.type === 'answer' && item.id !== 'error'" :class="$style.rate">
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :color="item.rating === 'dislike' ? 'primary-500' : 'base-400'"
                             rotate
                             :class="[$style.rateItem, $style._dislike, {[$style._active]: item.rating === 'dislike' }]"
                             @click="$emit('set-rating', {value: item.rating === 'dislike' ? null : 'dislike', item: item})"
                />
                <VButtonIcon name="IcLike"
                             icon-size="size-12"
                             :color="item.rating === 'like' ? 'primary-500' : 'base-100'"
                             :class="[$style.rateItem, $style._like, {[$style._active]: item.rating === 'like' }]"
                             @click="$emit('set-rating', {value: item.rating === 'like' ? null : 'like', item: item})"
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

        <div v-show="item.projects_choice && item.projects_choice.length" :class="$style.projects">
            <VButton v-for="(project, key) in item.projects_choice"
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
                    [this.$style._flat]: Boolean(this.item.flat),
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
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -.015em;

        &._question {
            margin-left: auto;

            .bubble {
                border-radius: 16px 16px 4px 16px;
                background-color: var(--primary-100);
            }
        }

        &._answer {
            margin-right: auto;

            .bubble {
                border-radius: 16px 16px 16px 4px;
                background-color: $base-100;
            }
        }

        &._flat {
            .time {
                position: absolute;
                right: 16px;
                bottom: 12px;
            }
        }
    }

    .bubble {
        position: relative;
        padding: 12px 16px;

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
    }

    .bubbleText {
        a {
            position: relative;
            color: var(--primary-500);
            transition: $default-transition;

            &:hover {
                filter: brightness(.7);
            }

            &:after {
                content: '';
                position: relative;
                top: 3px;
                display: inline-block;
                width: 16px;
                height: 16px;
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
        font-size: 12px;
        line-height: 14px;
        color: $base-400;
        transition: $default-transition;

        @include respond-to(mobile) {
            opacity: 0;
        }
    }

    .timeLike {
        position: relative;
        top: 2px;
        visibility: hidden;
        display: inline-block;
        margin-right: 6px;
        color: var(--primary-500);

        &._active {
            visibility: visible;
        }

        &._dislike {
            transform: rotate(180deg);
        }
    }

    .rate {
        position: absolute;
        right: 12px;
        bottom: -8px;
        display: flex;
        width: 28px;
        height: 28px;
        border-radius: 12px;
        background-color: $white;
        opacity: 0;
        transition: $default-transition;

        @include respond-to(mobile) {
            width: 52px;
            opacity: 1;
        }
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
            @include respond-to(mobile) {
                transform: translateX(calc(-100% - 4px));
            }
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
