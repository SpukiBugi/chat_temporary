<template>
    <div :class="[$style.Main]">
        <div :class="$style.wrapper">
            <div ref="head" :class="$style.head">
                <VButton :class="$style.about" @click="$emit('go-step', {id: 'Chat'})">Обо мне</VButton>
                <VIcon name="IcCloseCircle"
                       size="size-20"
                       :class="$style.close"
                       @click="$emit('close')"
                />
            </div>

            <transition name="widget-sova-fade">
                <div
                    v-show="history.length > 2"
                    :class="$style.switchElements"
                >
                    <transition name="widget-sova-fade">
                        <svg
                            v-show="isSwitchLong"
                            width="340"
                            height="64"
                            viewBox="0 0 340 64"
                            xmlns="http://www.w3.org/2000/svg"
                            :class="$style.switchBorder"
                        >
                            <path d="M103.318 63.5H0.5V32C0.5 26.3912 0.500389 22.2147 0.770823 18.9048C1.04078 15.6006 1.57734 13.2041 2.62537 11.1472C4.4949 7.47802 7.47802 4.4949 11.1472 2.62537C13.2041 1.57734 15.6006 1.04078 18.9048 0.770823C22.2147 0.500389 26.3912 0.5 32 0.5H308C313.609 0.5 317.785 0.500389 321.095 0.770823C324.399 1.04078 326.796 1.57734 328.853 2.62537C332.522 4.4949 335.505 7.47802 337.375 11.1472C338.423 13.2041 338.959 15.6006 339.229 18.9048C339.5 22.2147 339.5 26.3912 339.5 32V63.5H236.682C233.905 63.5 231.755 62.2646 229.951 60.3577C228.135 58.4371 226.694 55.8604 225.356 53.2331C224.349 51.2574 222.743 49.6511 220.767 48.6444C219.615 48.0576 218.307 47.7767 216.609 47.6379C214.921 47.5 212.804 47.5 210.023 47.5H210H130H129.977C127.196 47.5 125.079 47.5 123.391 47.6379C121.693 47.7767 120.385 48.0576 119.233 48.6444C117.257 49.6511 115.651 51.2574 114.644 53.2331C113.306 55.8604 111.865 58.4371 110.049 60.3577C108.245 62.2646 106.095 63.5 103.318 63.5Z"
                                  stroke="#E1E4EA"
                                  fill="transparent"
                            />
                        </svg>
                    </transition>

                    <div
                        :class="$style.longSwitch"
                        @click="switchLong(!isSwitchLong)"
                    >
                        <transition name="widget-sova-fade" mode="out-in">
                            <div :key="isSwitchLong" :class="[$style.longSwitchInner, [$style[isSwitchLong ? '_short' : '_long']] ]">
                                {{ isSwitchLong ? 'Краткий вид' : 'История сообщений' }}
                                <VIcon name="IcHistory"
                                       size="size-14"
                                       :class="$style.longSwitchIcn"
                                />
                            </div>
                        </transition>
                    </div>
                </div>
            </transition>

            <div ref="componentWrap"
                 :class="$style.componentWrap"
            >
                <div
                    ref="componentHeight"
                    :class="$style.componentHeight"
                >
                    <transition name="widget-sova-fade" mode="out-in">
                        <component
                            :is="currentStep.component"
                            v-if="currentStep"
                            ref="componentStep"
                            :is-long="isLong"
                            :is-show-options="isShowOptions"
                            :is-loading="isLoading"
                            :has-send="hasSend"
                            :history="history"
                            :value="value"
                            :message="message"
                            @go-step="$emit('go-step', $event)"
                            @set-value="value = $event"
                            @question-click="onQuestionClick"
                            @submit="onSubmit"
                        />
                    </transition>
                </div>
            </div>

            <Expander :is-open="!isMenuHidden">
                <MainMenu
                    ref="mainMenu"
                    :class="$style.menu"
                    class="widget-sova-main-menu"
                    @go-step="$emit('go-step', $event)"
                />
            </Expander>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.js';

import Expander from '@/components/ui/Expander.vue';
import MainMenu from '@/components/app/main/MainMenu.vue';
import testHistory from '@/assets/json/testHistory';

export default {
    name: 'Main',

    components: {
        Expander,
        MainMenu,
    },

    props: {
        currentStep: {
            type: Object,
            default: () => ({}),
        },

        isMainOpen: {
            type: Boolean,
            default: false,
        },

        stepProps: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            /** Flags */
            isLong: false,
            isLoading: false,
            hasSend: false,
            isShowOptions: false,

            /** Info */
            history: testHistory,

            /** Form */
            value: '',
            message: '',

            resizeObserver: null,
        };
    },

    computed: {
        isMenuHidden() {
            return this.currentStep?.id === 'Chat' && (this.isShowOptions || this.hasSend);
        },

        isSwitchLong() {
            return this.isLong && !this.isShowOptions;
        },
    },

    watch: {
        stepProps: {
            handler(val) {
                this.isShowOptions = val.isShowOptions;
            },
            immediate: true,
        },
    },

    mounted() {
        this.startObserver();
    },

    beforeDestroy() {
        this.stopObserver();
    },

    methods: {
        switchLong(value) {
            this.isShowOptions = false;
            this.isLong = value;
        },

        startObserver() {
            this.resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const height = entry.contentRect.height;

                    if (height !== 0) {
                        const timeline = gsap.timeline();
                        timeline.set(this.$refs.componentWrap, {
                            overflow: 'hidden',
                        }, 0);
                        timeline.to(this.$refs.componentWrap, {
                            height: `${height}px`,
                            duration: .3,
                        }, 0);
                        timeline.set(this.$refs.componentWrap, {
                            overflow: '',
                        });
                    }
                }
            });
            this.resizeObserver.observe(this.$refs.componentHeight);
        },

        stopObserver() {
            this.resizeObserver?.unobserve(this.$refs.componentHeight);
        },

        onSetRating({ value, item }) {
            const index = this.history.findIndex(el => el.id === item.id);
            this.history.splice(index, 1, { ...item, rating: value });
            /** Запрос на изменение */
            //
        },

        async onSubmit() {
            if (this.isLoading) {
                this.message = 'Отправить сообщение можно после получения ответа';

                return;
            }

            if (!this.value) {
                return;
            }

            this.isLoading = true;
            this.hasSend = true;
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
                }, 1000);
            });
        },

        onQuestionClick(e) {
            this.value = e;
            this.onSubmit();
        },
    },
};
</script>

<style lang='scss' module>
    .Main {
        @include backdrop;

        position: relative;
        overflow: hidden;
        width: 356px;
        padding: 40px 8px 8px;
        border-radius: 32px;
        mask-image: url('/mask.svg');
    }

    .wrapper {
        position: relative;
        width: 100%;
        padding-bottom: 8px;
        border-radius: 24px;
        background-color: white;
    }

    .head {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        height: 64px;
        padding: 12px;
        background-color: $white;
        mask-image: url('/mask-head.svg');
    }

    .close {
        margin-top: 2px;
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

    .switchBorder {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
    }

    .longSwitch {
        position: absolute;
        top: 52px;
        left: 50%;
        z-index: 1;
        display: flex;
        justify-content: center;
        transform: translateX(-50%);
        cursor: pointer;
        user-select: none;
    }

    .longSwitchInner {
        display: flex;
        align-items: center;
        padding: 5px 8px;
        border-radius: 8px;
        white-space: nowrap;
        font-weight: 500;
        font-size: 11px;
        line-height: 14px;
        letter-spacing: -.01em;

        &._short {
            background-color: $primary-500;
            color: $white;
            gap: 8px;

            .longSwitchIcn {
                transform: rotate(180deg);
            }
        }

        &._long {
            background-color: $white;
            color: $primary-500;
            gap: 4px;
        }
    }

    .longSwitchIcn {
        margin-top: 1px;
    }

    .componentWrap {
        position: relative;
        width: 100%;
    }

    .componentHeight {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .menu {
        padding: 20px 20px 4px;
    }
</style>
