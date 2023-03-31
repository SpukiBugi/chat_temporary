import { gsap } from 'gsap/dist/gsap.js';

export default {
    methods: {
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

            /** Подмена аватарки */
            timeline.to(this.$refs.avatarWrap, {
                opacity: 1,
            }, 0);

            timeline.to(this.$refs.menu.$el, {
                opacity: 0,
                duration: .3,
            }, 0);
            //

            /** Раскрытие контента */
            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(1)',
                transformOrigin: '100% 100%',
            }, 0);
            //

            /** Перемещение аватарки */
            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: '8px',
                left: '50%',
                transform: 'scale(1.34) translate(-50%)',
            }, 0);
            //

            /** Анимация внутренних элементов чата */
            timeline.fromTo(this.$refs.main?.$refs.head, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main?.$refs.componentWrap, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);

            timeline.fromTo(this.$refs.main?.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration,
            }, 0);
            //

            /** Иконка статуса на аватарке */
            timeline.set(this, {
                hasStatus: true,
            }, 0);
            //
        },

        openAnimTop() {
            const duration = .4;
            const timeline = gsap.timeline();

            /** Подмена аватарки */
            timeline.to(this.$refs.avatarWrap, {
                opacity: 1,
            }, 0);

            timeline.set(this.$refs.menu.$el, {
                opacity: 0,
            }, 0);
            //

            /** Раскрытие контента */
            timeline.to(this.$refs.mainWrap, {
                duration: duration,
                transform: 'scale(1)',
                transformOrigin: '50% 40px',
                delay: duration,
            }, 0);
            //

            /** Перемещение аватарки */
            timeline.to(this.$refs.mainContainer, {
                duration: duration,
                top: this.history.length ? 12 : '100%',
                yPercent: this.history.length ? 0: -100,
            }, 0);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration,
                top: 0,
                left: '50%',
                y: 8,
                transform: 'scale(1.34) translateX(-50%)',
            }, 0);
            //

            /** Анимация внутренних элементов чата */
            timeline.fromTo(this.$refs.main?.$refs.head, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);

            timeline.fromTo(this.$refs.main?.$refs.componentWrap, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);

            timeline.fromTo(this.$refs.main?.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
            }, {
                transform: 'scale(1)',
                opacity: 1,
                duration: .3,
                delay: duration * 2,
            }, 0);
            //

            /** Иконка статуса на аватарке */
            timeline.set(this, {
                hasStatus: true,
            }, duration);
            //
        },

        closeAnimBottom() {
            const duration = .4;
            const firstStep = .1;
            const timeline = gsap.timeline();

            /** Анимация внутренних элементов чата */
            timeline.to(this.$refs.main?.$refs.head, {
                opacity: 0,
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.main?.$refs.componentWrap, {
                transform: 'scale(.8)',
                opacity: 0,
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.main?.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
                duration: firstStep,
            }, 0);
            //

            /** Иконка статуса на аватарке */
            timeline.set(this, {
                hasStatus: false,
            }, 0);
            //

            /** Раскрытие контента */
            timeline.to(this.$refs.mainWrap, {
                duration: (duration - firstStep / 2),
                transform: 'scale(0)',
                transformOrigin: `${this.$refs.mainWrap.clientWidth - 30}px ${this.$refs.mainWrap.clientHeight - 30}px`,
            }, firstStep);
            //

            /** Перемещение аватарки */
            timeline.to(this.$refs.avatarWrap, {
                duration: (duration - firstStep / 2),
                top: 'calc(100% - 8px)',
                left: 'calc(100% - 8px)',
                transform: 'scale(1) translate3d(-100%, -100%, 0)',
            }, firstStep);
            //

            /** Подмена аватарки */
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
            //

            timeline.set(this, {
                stepId: '',
            }, duration);
        },

        closeAnimTop() {
            const duration = .5;
            const firstStep = .1;
            const secondStep = .15;
            const timeline = gsap.timeline();
            const menuRect = this.$refs.menu.$el.getBoundingClientRect();

            /** Анимация внутренних элементов чата */
            timeline.to(this.$refs.main?.$refs.head, {
                opacity: 0,
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.main?.$refs.componentWrap, {
                transform: 'scale(.8)',
                opacity: 0,
                duration: firstStep,
            }, 0);

            timeline.to(this.$refs.main?.$refs.mainMenu.$el, {
                opacity: 0,
                transform: 'scale(.8)',
                duration: firstStep,
            }, 0);
            //

            /** Иконка статуса на аватарке */
            timeline.set(this, {
                hasStatus: false,
            }, 0);
            //

            /** Раскрытие контента */
            timeline.to(this.$refs.mainWrap, {
                duration: secondStep,
                transform: 'scale(0)',
                transformOrigin: '50% 40px',
            }, firstStep - .1);
            //

            /** Перемещение аватарки */
            timeline.to(this.$refs.mainContainer, {
                duration: duration - (firstStep + secondStep),
                top: menuRect?.top,
                yPercent: 0,
                onComplete: () => this.$refs.mainContainer.style.top = '',
            }, (firstStep - .1) + secondStep);

            timeline.to(this.$refs.avatarWrap, {
                duration: duration - (firstStep + secondStep),
                top: 0,
                left: 'calc(100% - 20px)',
                y: 8,
                xPercent: -100,
                transform: 'scale(1)',
            }, (firstStep - .1) + secondStep);
            //

            /** Подмена аватарки */
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
            //

            timeline.set(this, {
                stepId: '',
            }, duration);
        },
    },
};
