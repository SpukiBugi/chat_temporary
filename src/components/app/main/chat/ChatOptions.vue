<template>
    <div :class="[$style.ChatOptions, {[$style._showSwitch]: isShowSwitch}]">
        <VScrollBox ref="scrollbox"
                    :class="$style.scrollable"
        >
            <div :class="$style.list">
                <div v-for="(option, key) in options"
                     :key="`options-${key}`"
                     :class="$style.option"
                >
                    <div :class="$style.head">
                        <div :class="$style.headIcn" :style="{backgroundImage: `url(${option.icon})`}"></div>
                        <div :class="$style.headTitle" v-html="option.title"></div>
                    </div>
                    <div :class="$style.questions">
                        <VButton v-for="(question, qKey) in option.questions"
                                 :key="question + qKey"
                                 :class="$style.question"
                                 @click="onQuestionClick(question)"
                        >
                            {{ question }}
                        </VButton>
                    </div>
                </div>
            </div>
        </VScrollBox>

        <div :class="$style.fade"></div>
    </div>
</template>

<script>
import VScrollBox from '@/components/ui/scrollbox/VScrollBox.vue';

export default {
    name: 'ChatOptions',

    components: {
        VScrollBox,
    },

    props: {
        isShowSwitch: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            options: [
                {
                    title: 'Проекты',
                    // TODO: Возможно потом нужно будет убрать
                    icon: `${import.meta.env.BASE_URL}home.svg`,
                    questions: [
                        'Где расположены проекты?',
                        'Какая инфраструктура у Заневского?',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                    ],
                },
                {
                    title: 'Квартиры',
                    // TODO: Возможно потом нужно будет убрать
                    icon: `${import.meta.env.BASE_URL}key.svg`,
                    questions: [
                        'Где расположены проекты?',
                        'Какая инфраструктура у Заневского?',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                        'Где расположены проекты?',
                        'Какая инфраструктура у Заневского?',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                        'Golden City',
                        'Grand House',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                        'Есть проекты с панорамными окнами?',
                        'Какая средняя площадь квартир?',
                    ],
                },
            ],
        };
    },

    methods: {
        onQuestionClick(question) {
            this.$emit('value-click', question);
            this.$emit('go-step', 'Chat');
        },
    },
};
</script>

<style lang='scss' module>
    .ChatOptions {
        position: relative;

        &._showSwitch {
            .list {
                padding-top: 48px;
            }
        }
    }

    .scrollable {
        max-height: 552px;

        @include respond-to(tablet) {
            max-height: calc(100vh - 150px);
        }
    }

    .list {
        padding: 8px 16px 20px;
    }

    .option {
        display: flex;
        flex-direction: column;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 28px;
        }
    }

    .head {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
    }

    .headIcn {
        width: 16px;
        height: 16px;
        margin-bottom: 4px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .questions {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 20px;
        column-gap: 6px;
        row-gap: 8px;
    }

    .fade {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 32px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    }
</style>
