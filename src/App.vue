<template>
    <!-- Кастомный тег чтобы можно было наложить reset стили без указания класса -->
    <widget-sova
        :class="[$style.App, $style[`_${animationType}`]]"
        :style="styleList"
    >
        <transition name="fade">
            <div v-show="stepId"
                 :class="$style.overlay"
                 @click="onClose"
            >
            </div>
        </transition>

        <Menu
            ref="menu"
            :is-main-open="isOpen"
            :has-new="hasNew"
            :class="$style.menu"
            class="widget-sova-app__menu"
            @open="onOpen"
            @go-step="onGoStep"
        />

        <div
            ref="mainContainer"
            :class="[$style.mainContainer, {[$style._active]: stepId}]"
        >
            <div v-if="stepId"
                 ref="mainWrap"
                 :class="$style.mainWrap"
            >
                <Main
                    ref="main"
                    :current-step="currentStep"
                    :is-loading="isLoading"
                    :is-long="isLong"
                    :history="history"
                    :value="value"
                    :message="message"
                    :class="$style.main"
                    @close="onClose"
                    @go-step="onGoStep"
                    @set-value="value = $event"
                    @value-click="onValueClick"
                    @submit="onSubmit"
                    @repeat-click="onRepeat"
                    @set-rating="onSetRating"
                    @set-long="isLong = $event"
                />
            </div>
            <div ref="avatarWrap" :class="$style.avatarWrap">
                <Avatar
                    ref="avatar"
                    status-type="chat"
                    has-status
                    :show-pic="isRelink && isOpen"
                />
            </div>
        </div>
    </widget-sova>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.js';
import { debounce } from '@/assets/js/utils/common-utils';
import testHistory from '@/assets/json/testHistory';

import Menu from '@/components/app/Menu.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Main from '@/components/app/Main.vue';

/** Main Components (Если не подгружать заранее при первом открытии прыгает анимация) */
import Chat from '@/components/app/main/chat/Chat.vue';
import Rate from '@/components/app/main/rate/Rate.vue';
import Call from '@/components/app/main/call/Call.vue';
import Telegram from '@/components/app/main/telegram/Telegram.vue';
import Whatsapp from '@/components/app/main/whatsapp/Whatsapp.vue';
//

export default {
    name: 'App',

    components: {
        Menu,
        Avatar,
        Main,
        /* eslint-disable vue/no-unused-components */
        Chat,
        Rate,
        Call,
        Telegram,
        Whatsapp,
        /* eslint-enable vue/no-unused-components */
    },

    props: {
        id: {
            type: String,
            default: '00000000-0000-0000-0000-000000000000',
        },

        api: {
            type: String,
            default: 'http://185.105.108.90:8000/v1/',
        },
    },

    data() {
        return {
            /** Flags */
            isOpen: false,
            isLoading: false,
            isLong: false,
            hasNew: localStorage.getItem('widgetSovaHasNew') === 'true',

            /** Form */
            value: '',
            message: '',

            /** Info */
            history: [] || testHistory,

            animationType: 'bottom',
            debouncedResize: debounce(this.onResize, 100),

            /** Steps */
            stepId: '',
            steps: [
                {
                    id: 'Chat',
                    component: Chat,
                    height: 'auto',
                },
                {
                    id: 'Rate',
                    component: Rate,
                    height: '284px',
                },
                {
                    id: 'Call',
                    component: Call,
                    height: '284px',
                },
                {
                    id: 'Telegram',
                    component: Telegram,
                    height: '284px',
                },
                {
                    id: 'Whatsapp',
                    component: Whatsapp,
                    height: '284px',
                },
                {
                    id: 'Options',
                    component: Chat,
                    height: 'auto',
                },
            ],
        };
    },

    computed: {
        currentStep() {
            return this.steps.find(el => el.id === this.stepId);
        },

        isRelink() {
            return this.stepId === 'Call' || this.stepId === 'Telegram' || this.stepId === 'Whatsapp';
        },

        styleList() {
            return [
                {
                    '--primary-100': '#EAF5FF',
                    '--primary-200': '#B9DAFF',
                    '--primary-300': '#6497FF',
                    '--primary-500': '#1F44FF',
                    '--primary-600': '#1233EE',
                    '--primary-900': '#1431BF',
                },
            ];
        },
    },

    watch: {
        device(newVal, oldVal) {
            if (newVal === 'mobile' || oldVal === 'mobile') {
                this.onClose();
            }
        },
    },

    mounted() {
        this.checkAnimationType();
        window.addEventListener('resize', this.debouncedResize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.debouncedResize);
    },

    methods: {
        onGoStep(step) {
            this.stepId = step;

            if (step === 'Chat') {
                this.hasNew = false;
                localStorage.setItem('widgetSovaHasNew', 'false');
            }
        },

        onResize() {
            this.checkAnimationType();
        },

        async onOpen() {
            this.isOpen = true;
            await this.$nextTick();

            if (this.animationType === 'top') {
                this.openAnimTop();
            } else {
                this.openAnimBottom();
            }
        },

        onClose() {
            this.isOpen = false;

            if (this.animationType === 'top') {
                this.closeAnimTop();
            } else {
                this.closeAnimBottom();
            }
        },

        /** Анимации */

        checkAnimationType() {
            const menuRect = this.$refs.menu.$el.getBoundingClientRect();

            if (menuRect?.top < window.innerHeight / 2) {
                this.animationType = 'top';
            } else {
                this.animationType = 'bottom';
            }
        },

        openAnimBottom() {
            const duration = .4;
            const timeline = gsap.timeline();

            timeline.fromTo(this.$refs.avatar.$refs.status, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: duration,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                opacity: 1,
            }, 0);

            timeline.to(this.$refs.menu.$el, {
                opacity: 0,
                duration: .3,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: '8px',
                left: '50%',
                transform: 'scale(1.34) translate(-50%)',
            }, 0);

            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(1)',
                transformOrigin: '100% 100%',
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.head, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.componentWrap, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);
        },

        openAnimTop() {
            const duration = .4;
            const timeline = gsap.timeline();

            timeline.fromTo(this.$refs.avatar.$refs.status, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                opacity: 1,
            }, 0);

            timeline.set(this.$refs.menu.$el, {
                opacity: 0,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: '8px',
                left: '50%',
                transform: 'scale(1.34) translate(-50%)',
            }, 0);

            timeline.to(this.$refs.mainContainer, {
                duration: duration,
                top: '100%',
                yPercent: -100,
            }, 0);

            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(1)',
                transformOrigin: '50% 40px',
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.head, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.componentWrap, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);

            timeline.fromTo(this.$refs.main.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);
        },

        closeAnimBottom() {
            const duration = .4;
            const firstStep = .1;
            const timeline = gsap.timeline();

            timeline.to(this.$refs.main.$refs.head, {
                opacity: 0,
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.main.$refs.componentWrap, {
                transform: 'scale(.8)',
                opacity: 0,
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.main.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.mainWrap, {
                duration: (duration - firstStep / 2),
                transform: 'scale(0)',
                transformOrigin: `${this.$refs.mainWrap.clientWidth - 30}px ${this.$refs.mainWrap.clientHeight - 30}px`,
            }, firstStep);

            timeline.to(this.$refs.avatar.$refs.status, {
                duration: (duration - firstStep / 2),
                opacity: 0,
            }, firstStep);

            timeline.to(this.$refs.avatarWrap, {
                duration: (duration - firstStep / 2),
                top: 'calc(100% - 8px)',
                left: 'calc(100% - 8px)',
                transform: 'scale(1) translate3d(-100%, -100%, 0)',
            }, firstStep);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 0,
            }, firstStep);

            timeline.set(this.$refs.menu.$el, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.avatarWrap, {
                opacity: 0,
            }, duration);

            timeline.set(this, {
                stepId: '',
            }, duration);
        },

        closeAnimTop() {
            const duration = .4;
            const timeline = gsap.timeline();
            const menuRect = this.$refs.menu.$el.getBoundingClientRect();

            timeline.to(this.$refs.mainWrap, {
                duration: .15,
                transform: 'scale(0)',
                transformOrigin: '50% 40px',
            }, 0);

            timeline.to(this.$refs.avatar.$refs.status, {
                duration: .15,
                opacity: 0,
            }, 0);

            timeline.to(this.$refs.mainContainer, {
                duration: duration - .1,
                top: menuRect?.top,
                yPercent: 0,
            }, .1);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration - .1,
                top: 8,
                left: 'calc(100% - 20px)',
                transform: 'scale(1) translate3d(-100%, 0, 0)',
            }, .1);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 0,
            }, 0);

            timeline.set(this.$refs.menu.$el, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.menu.$refs.mainBlur, {
                opacity: 1,
            }, duration);

            timeline.set(this.$refs.avatarWrap, {
                opacity: 0,
            }, duration);

            timeline.set(this, {
                stepId: '',
            }, duration);

            timeline.set(this.$refs.mainContainer, {
                top: '',
            }, duration);
        },

        /** Конец Анимации */

        /** Чат */
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
            const id = String(Math.random());
            this.history.push({ id: id, type: 'question', text: question, date: new Date(Date.now()) });

            try {
                const res = await this.getAnswer(question);
                res.type = 'answer';
                this.history.push(res);
                this.message = '';

                if (this.history.length === 2) {
                    this.message = 'Не тот ответ? Попробуйте переформулировать вопрос';
                }

                if (!this.isOpen) {
                    this.hasNew = true;
                    localStorage.setItem('widgetSovaHasNew', 'true');
                }
            } catch (e) {
                console.warn('[Chat/onSubmit] error: ', e);
                this.history.push({
                    id: 'error',
                    type: 'answer',
                    text: 'Упс… Произошла ошибка!<br><br>Попробуйте отправить сообщение<br>снова, а я пока расскажу анекдот:<br><br>«Что делает кофе, прежде чем попадет<br>в пачку? Молится»',
                    date: new Date(Date.now()),
                });
            }

            this.isLoading = false;
        },

        getAnswer(value) {
            const id = String(Math.random());

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        id: `a-${id}`,
                        question_id: `q-${id}`,
                        type: 'answer',
                        text: 'Да, у нас есть несколько евроквартир с балконами. <a href="https://google.com">Двухкомнатные</a> квартиры имеют эркеры, большие кухни и кладовые, спальни с панорамным видом, балконы. В однокомнатных квартирах есть гардеробные, уютные спальни с балконами, панорамные окна на кухнях. Апартаменты Terrace также имеют балконы, поэтому вы можете насладиться утренним кофе или романтическим ужином на свежем воздухе.',
                        rating: null,
                        date: new Date(Date.now()),
                    });
                }, 3000);
            });
            // const sendValues = {
            //     company_id: this.id,
            //     question: value,
            //     user_id: 1,
            // };

            // return fetch(`${this.api}messages`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(sendValues),
            // }).then(response => response.json());
        },

        onValueClick(e) {
            this.value = e;
            this.onSubmit();
        },

        onRepeat() {
            this.history.pop();
            const question = this.history.pop();
            this.value = question.text;
            this.onSubmit();
        },

        onSetRating({ value, item }) {
            const index = this.history.findIndex(el => el.id === item.id);
            this.history.splice(index, 1, { ...item, rating: value });
            /** Запрос на изменение */
            //
        },

        /** Конец Чата */
    },
};
</script>

<style lang="scss" module>
    $zIndex: 1000;

    .App {

        /** По дефолту на десктопе */
        &._bottom {
            .avatarWrap {
                transform: scale(1) translate3d(-100%, -100%, 0);
            }
        }

        /** По дефолту на мобилке */
        &._top {
            .mainContainer {
                top: 76px;
                bottom: auto;
            }

            .avatarWrap {
                transform: scale(1) translate3d(-100%, 0, 0);
            }
        }
    }

    .menu {
        position: fixed;
        right: 32px;
        bottom: 32px;
        z-index: $zIndex;

        @include respond-to(mobile) {
            top: 76px;
            right: 12px;
            bottom: auto;
        }
    }

    .overlay {
        display: none;

        @include respond-to(tablet) {
            position: fixed;
            top: 0;
            right: 0;
            z-index: $zIndex;
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(#1e1e22, .8);
        }
    }

    .mainContainer {
        position: fixed;
        right: 32px;
        bottom: 32px;
        z-index: $zIndex;
        display: flex;
        justify-content: center;
        pointer-events: none;

        @include respond-to(mobile) {
            right: 0;
            width: 100%;
        }

        &._active {
            pointer-events: all;
        }
    }

    .mainWrap {
        transform: scale(0);

        @include respond-to(mobile) {
            margin: 0 auto;
        }
    }

    .avatarWrap {
        position: absolute;
        top: calc(100% - 8px);
        left: calc(100% - 8px);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        opacity: 0;
        will-change: transform;
        transform-origin: top left;

        @include respond-to(mobile) {
            top: 8px;
            left: calc(100% - 20px);
        }
    }
</style>
