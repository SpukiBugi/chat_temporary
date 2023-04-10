<template>
    <div :class="[$style.VInput, classList]">
        <div
            :class="$style.shadow"
            :style="borderStyle"
        >
            <div :class="$style.shadowInner"></div>
        </div>

        <div
            ref="inner"
            :class="$style.inner"
        >
            <input
                ref="input"
                :aria-label="label"
                :class="$style.native"
                class="sova-input__native _weight"
                :tabindex="0"
                :value="inputValue"
                v-bind="attributes"
                @keydown="onKeyDown"
                @blur="onBlur"
                @focus="onFocus"
                @input="onInput"
            >

            <div v-if="placeholder"
                 :class="$style.placeholder"
            >
                <transition name="widget-sova-carousel">
                    <span :key="currentPlaceholder"
                          :class="$style.placeholderInner"
                    >
                        {{ currentPlaceholder }}
                    </span>
                </transition>
            </div>

            <div
                ref="border"
                :class="$style.border"
                :style="borderStyle"
            />

            <div
                v-if="premask"
                :class="$style.premask"
                v-html="currentPremask"
            >
            </div>
        </div>

        <span
            :class="$style.label"
        >
            {{ label }}
        </span>

        <transition name="widget-sova-fade">
            <InputHint
                v-if="msg"
                :color="color"
            >
                {{ msg }}
            </InputHint>
        </transition>
    </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap.js';

// Utils
import { masks, numberInputs, addMask, setCursor } from '~/assets/js/utils/mask-utils';

const defaultBorderXSize = 35;
const defaultBorderYSize = 70;

/**
 * Позволяет пользователю ввести данные с помощью клавитуры.<br>
 * Можно использовать вместе с утилитами из validate-utils, для проверки корректности ввода, по заданному параметру.
 *
 * @version 1.0.1
 * @displayName VInput
 */
export default {
    name: 'VInput',

    props: {
        /**
         * Определяет классы, которые будут модифицировать размер
         */
        size: {
            type: String,
            default: 'medium',
        },

        /**
         * Определяет классы, которые будут модифицировать цвет
         */
        color: {
            type: String,
            default: 'base',
        },

        /**
         * Тип, для передачи в атрибуты нативного инпута
         */
        type: {
            type: String,
            default: 'text',
        },

        /**
         * Текущее введёное значение
         */
        value: {
            type: String,
            default: '',
        },

        /**
         * Даёт возможность отключить autocomplete при вводе
         */
        autocomplete: {
            type: Boolean,
            default: true,
        },

        /**
         * Лейбл инпута
         */
        label: {
            type: String,
            default: '',
        },

        placeholder: {
            type: [String, Array],
            default: '',
        },

        isPlaceholderAnimating: Boolean,

        /**
         * Позволяет отображать лейбл после ввода
         */
        keepLabel: {
            type: Boolean,
            default: true,
        },

        /**
         * Сообщение пользователю, может использоваться для валидации
         */
        msg: {
            type: String,
            default: '',
        },

        /**
         * Параметр маски инпута, если необходим
         * @values phone, date, time, number, snils, inn, passport, payment, percent, year, pin, months
         */
        mask: {
            type: String,
            default: '',
        },

        /**
         * Отображение маску при вводе
         */
        premask: {
            type: Boolean,
            default: true,
        },

        /**
         * Если активно, то при эмите, данные будут переданы с учётом активной маски.
         * Т.е. если в инпуте компонента +7 (999) 00-00-00, то без этого параметра,
         * будет передано 9990000. Включено по-умолчанию, для валидации
         */
        keepMasked: {
            type: Boolean,
            default: true,
        },

        /**
         * Модификатор вида с бордером
         */
        error: Boolean,

        /**
         * Это свойство отключает взаимодействие
         */
        disabled: Boolean,
    },

    data() {
        return {
            isFocused: false,
            currentMask: '',

            /** Placeholder */
            currentPlaceholder: '',
            placeholderInterval: null,

            /** Border */
            mouseTween: null,
            roundTween: null,
            focusTween: null,
            borderX: 0,
            borderY: 0,
            borderXSize: `${defaultBorderXSize}%`,
            borderYSize: `${defaultBorderYSize}%`,
        };
    },

    computed: {
        classList() {
            return {
                [this.$style[`_${this.color}`]]: this.size,
                [this.$style[`_${this.size}`]]: this.size,
                [this.$style._focused]: this.isFocused,
                [this.$style._active]: this.value || this.isFocused,
                [this.$style._disabled]: this.disabled,
                [this.$style._error]: this.error,
                [this.$style._showLabel]: Boolean(this.label),
                [this.$style._keep]: this.keepLabel,
                [this.$style._success]: this.mask && !this.error && this.currentMask.length === this.inputValue.length,
            };
        },

        inputValue() {
            if (this.mask) {
                return addMask(this.value, this.currentMask);
            }
            return this.value;
        },

        currentPremask() {
            if (!this.mask) {
                return '';
            }

            if (this.inputValue.length) {
                const regex = new RegExp('^.{0,' + this.inputValue.length + '}', 'g');
                const pre = this.currentMask.replace(regex, `<span>${this.inputValue}</span>`);
                return pre.replace(/#/g, '&ensp;');
            } else {
                return this.currentMask.replace(/#/g, '&ensp;');
            }
        },

        attributes() {
            const attrs = {
                ...this.$attrs,
                type: 'text',
                disabled: this.disabled,
            };

            if (this.label) {
                attrs.ariaLabel = this.label;
            }

            if (this.mask) {
                attrs.maxlength = this.currentMask.length;
            }

            if (this.type) {
                if (this.mask) {
                    attrs.type = numberInputs.includes(this.mask) ? 'tel' : 'text';
                } else {
                    attrs.type = this.type;
                }
            }

            if (!this.autocomplete) {
                attrs.autocomplete = 'off';
            }

            return attrs;
        },

        borderStyle() {
            return [
                {
                    maskImage: `radial-gradient(${this.borderXSize} ${this.borderYSize} at ${this.borderX}% ${this.borderY}%, black 60%, transparent)`,
                },
            ];
        },
    },

    watch: {
        isPlaceholderAnimating: {
            handler(val) {
                clearInterval(this.placeholderInterval);

                if (val) {
                    this.animatePlaceholder();
                } else {
                    this.currentPlaceholder = this.placeholder[0];
                }
            },
            immediate: true,
        },
    },

    created() {
        if (this.mask) {
            try {
                this.currentMask = masks[this.mask];
                if (!this.currentMask) {
                    throw new Error(`VInput: mask-utils: mask ${this.mask} not found`);
                }
            } catch (e) {
                console.log(e);
            }
        }

        this.setPlaceholder();
    },

    mounted() {
        this.tweenAround();
        window.addEventListener('mousemove', this.onMouseMove);
    },

    beforeDestroy() {
        window.removeEventListener('mousemove', this.onMouseMove);
        this.stopTweenAround();
        this.stopTweenOnMouse();
        clearInterval(this.placeholderInterval);
    },

    methods: {
        /**
         * Эмитит новые значения в родительский компонент.
         * Используется для валидации.
         * @returns {String} e.target.value Введёный текст
         * @public
         */
        onInput(e) {
            if (this.mask) {
                let position = e.target.selectionEnd;
                const digit = e.target.value[position - 1];

                // Заменяет 8 при вводе на +7,
                // если это первый символ
                if (this.mask === 'phone' && e.target.value.charAt(0) == 8) {
                    e.target.value = '+7';
                }

                e.target.value = addMask(e.target.value, this.currentMask);

                if (position !== 0) {
                    while (position < e.target.value.length && e.target.value.charAt(position - 1) !== digit) {
                        position++;
                    }
                }

                setCursor(e.target, position);

                if (this.mask === 'percent') {
                    if (e.target.value === '00') {
                        e.target.value = 1;
                    }
                    e.target.value = e.target.value > 100 ? '100%' : e.target.value + '%';
                } else if (this.mask === 'months') {
                    if (e.target.value > 360) {
                        e.target.value = 360;
                    }
                }
                if (e.target.value !== this.inputValue) {
                    const emitVal = this.keepMasked
                        ? e.target.value
                        : addMask(e.target.value, this.currentMask, false);
                    this.$emit('input', emitVal);
                    return;
                }
            }

            /**
             * Возвращает новое значение в родительский компонент.
             * Помогает при валидации поля.
             @param {String} value Новое значение
             */
            this.$emit('input', e.target.value);
        },

        /**
         * Метод, который обрабатывает событие focus на инпуте
         * @public
         */
        onFocus(e) {
            this.isFocused = true;
            this.tweenOnFocus();

            // Automatically add '+7' characters
            if (this.mask && this.mask === 'phone' && !this.inputValue) {
                this.$nextTick(() => {
                    setCursor(e.target, this.inputValue.length);
                });
            }

            /**
             * Передаёт родителю, что компонент находится в focus.
             * В большинстве реализаций - может и не пригодится
             * @event focus
             */
            this.$emit('focus', e);
        },

        /**
         * Метод, который обрабатывает событие blur на инпуте
         * @public
         */
        onBlur(e) {
            this.isFocused = false;
            this.tweenOnFocus({ reverse: true, onComplete: this.device === 'mobile' ? this.tweenAround : null });

            /**
             * Передаёт родителю, что компонент больше не находится в focus.
             * В большинстве реализаций - может и не пригодится
             * @event blur
             */
            this.$emit('blur', e);

            // Automatically remove '+' or '+7' character
            if (this.mask && this.mask === 'phone' && (this.inputValue === '+' || this.inputValue === '+7')) {
                this.$emit('input', '');
            }
        },

        async onKeyDown(e) {
            if (e.keyCode === 13) {
                /** Ожидание чтобы не прервалась отправка значения */
                setTimeout(() => {
                    this.$refs.input.blur();
                }, 500);
            }
        },

        onMouseMove(e) {
            if (this.device === 'mobile') {
                return;
            }

            const elRect = this.$refs.border?.getBoundingClientRect();
            const mouseGap = 30;

            /** Проверка что курсор находится недалеко от элемента */
            if ((elRect.left - mouseGap < e.clientX && elRect.right + mouseGap > e.clientX)
                && (elRect.top - mouseGap < e.clientY && elRect.bottom + mouseGap > e.clientY)) {
                this.tweenOnMouse(e, elRect);
            } else {
                this.tweenAround();
            }
        },

        tweenAround() {
            if (this.roundTween || this.value || this.isFocused) {
                return;
            }

            this.stopTweenOnMouse();

            const steps = [{ x: 80, y: 0, duration: .4 }, { x: 110, y: 50, duration: .4 }, { x: 80, y: 100, duration: .5 }, { x: 50, y: 130, duration: .4 }, { x: 20, y: 100, duration: .4 }, { x: -10, y: 50, duration: .4 }, { x: 20, y: 0, duration: .5 }, { x: 50, y: -30, duration: .4 }];

            /** Подвод к вращению из текущей позиции */
            const startTimeline = gsap.timeline();
            const startTweenObj = {
                x: this.borderX,
                y: this.borderY,
            };
            const startStep = steps.findIndex(el => {
                if (this.borderY > 50) {
                    return el.x < this.borderX && el.y >= 50;
                } else {
                    return el.x > this.borderX && el.y <= 50;
                }
            });
            const startSteps = steps.slice(startStep);
            startSteps[0].duration = .6;

            startSteps.forEach(step => {
                startTimeline.to(startTweenObj, {
                    ...step,
                    onUpdate: () => {
                        this.borderX = startTweenObj.x;
                        this.borderY = startTweenObj.y;
                    },

                    ease: 'none',
                });
            });
            //

            /** Основная анимация вращения */
            const mainTimeline = gsap.timeline({
                repeat: -1,
            });
            const mainTweenObj = {
                x: 50,
                y: -30,
            };

            steps.forEach(step => {
                mainTimeline.to(mainTweenObj, {
                    ...step,
                    onUpdate: () => {
                        this.borderX = mainTweenObj.x;
                        this.borderY = mainTweenObj.y;
                    },

                    ease: 'none',
                });
            });
            //

            this.roundTween = gsap.timeline();
            this.roundTween.add(startTimeline);
            this.roundTween.add(mainTimeline);
        },

        tweenOnMouse(e, elRect) {
            if (this.isFocused) {
                return;
            }

            this.stopTweenAround();

            const xPerc = (e.clientX - elRect.left) / elRect.width * 100;
            const yPerc = (e.clientY - elRect.top) / elRect.height * 100;

            const tweenObj = {
                x: this.borderX,
                y: this.borderY,
            };
            const tweenObjNew = {
                x: xPerc,
                y: yPerc,
            };

            const options = {
                duration: 1,
                ...tweenObjNew,
                onUpdate: () => {
                    this.borderX = tweenObj.x;
                    this.borderY = tweenObj.y;
                },

                ease: 'power3.out',
            };

            this.mouseTween = gsap.to(tweenObj, options);
        },

        tweenOnFocus(params = {}) {
            this.stopTweenAround();
            this.stopTweenOnMouse();
            this.stopTweenFocus();

            const tweenObj = {
                x: parseInt(this.borderXSize, 10),
                y: parseInt(this.borderYSize, 10),
            };
            const tweenObjNew = {
                x: params.reverse ? defaultBorderXSize : 200,
                y: params.reverse ? defaultBorderYSize : 200,
            };

            const options = {
                duration: params.reverse ? 1 : 3,
                ...tweenObjNew,
                onUpdate: () => {
                    this.borderXSize = `${tweenObj.x}%`;
                    this.borderYSize = `${tweenObj.y}%`;
                },

                onComplete: params.onComplete,

                ease: 'power3.out',
            };

            this.focusTween = gsap.to(tweenObj, options);
        },

        stopTweenOnMouse() {
            this.mouseTween?.kill();
            this.mouseTween = null;
        },

        stopTweenAround() {
            this.roundTween?.kill();
            this.roundTween = null;
        },

        stopTweenFocus() {
            this.focusTween?.kill();
            this.focusTween = null;
        },

        setPlaceholder() {
            if (Array.isArray(this.placeholder)) {
                this.currentPlaceholder = this.placeholder[0];
                return;
            }

            this.currentPlaceholder = this.placeholder;
        },

        animatePlaceholder() {
            let placeholderIndex = 0;

            this.placeholderInterval = setInterval(() => {
                if (placeholderIndex < (this.placeholder.length - 1)) {
                    placeholderIndex++;
                } else {
                    placeholderIndex = 0;
                }

                this.currentPlaceholder = this.placeholder[placeholderIndex];
            }, 2000);
        },
    },
};
</script>

<style lang="scss" module>
    $white-color: $white;
    $black-color: $base-900;
    $alert-color: $error;
    $success-color: $accept;

    .VInput {
        position: relative;
        width: 100%;

        /* Sizes */
        &._medium {
            &._showLabel {
                &._active._keep {
                    .label {
                        font-size: 12px;
                        transform: translateY(-24px);
                    }
                }
            }

            .premask,
            .label,
            .native {
                font-size: 14px;
                line-height: 17px;
                letter-spacing: -.015em;
            }

            .native {
                padding: 16px;
            }

            .placeholder {
                right: 16px;
                left: 16px;
                height: 16px;
                font-size: 14px;
                line-height: 17px;
                letter-spacing: -.015em;
            }
        }

        /* Colors */
        &._base {
            @include hover {
                .placeholder {
                    color: $base-500;
                }
            }

            input.native {
                background-color: $base-100;
                color: $black-color;
            }

            .premask,
            .label {
                color: $base-100;
            }

            .placeholder {
                color: $base-400;
            }
        }

        /* Mods */
        &._showLabel {
            &._active._keep {
                .label {
                    opacity: 1;
                }
            }

            .label {
                opacity: 1;
                transition: .3s all ease;
            }
        }

        &._active {
            .inner:after {
                transform: scaleX(1);
            }

            .premask {
                opacity: .5;

                span {
                    opacity: 0;
                }
            }

            .label {
                opacity: 0;
            }

            .placeholder {
                display: none;
            }

            .border {
                opacity: 0;
            }

            .shadow {
                opacity: 0;
                transition: opacity $default-transition;
            }

            &._focused {
                .native {
                    border-color: var(--primary-500);
                }
            }
        }

        &._focused {
            .shadow {
                opacity: 0;
                transition: opacity $default-transition;
            }

            .placeholder {
                display: none;
            }
        }

        &._success {
            .inner:after {
                background-color: $success-color;
                transform: scaleX(1);
            }
        }

        &._error {
            .inner:after {
                background-color: $alert-color;
                transform: scaleX(1);
            }
        }

        &._disabled {
            opacity: .5;
            pointer-events: none;

            select.nativeSelect {
                pointer-events: none;
            }
        }
    }

    .premask,
    .native,
    .label {
        font-weight: 500;
    }

    .premask,
    .native {
        width: 100%;
    }

    .native {
        border-radius: 16px;
        border: 1px solid $base-200;
        transition: $default-transition;
    }

    .border {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        border: 1.5px solid var(--primary-500);
        transition: opacity $default-transition;
        pointer-events: none;
    }

    .shadow {
        position: absolute;
        top: -28px;
        left: -28px;
        width: calc(100% + 56px);
        height: calc(100% + 56px);
        padding: 28px;
        transition: opacity .5s ease .5s;
        pointer-events: none;
    }

    .shadowInner {
        width: 100%;
        height: 100%;
        box-shadow: 0 0 28px #1f44ff;
        border-radius: 16px;
        opacity: .15;
    }

    .label {
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;
        transition: opacity $default-transition;
        pointer-events: none;
    }

    .placeholder {
        position: absolute;
        top: 50%;
        overflow: hidden;
        transform: translateY(-50%);
        pointer-events: none;
        transition: color $default-transition;
    }

    .placeholderInner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .inner {
        position: relative;
        z-index: 2;
        overflow: hidden;
    }

    .premask {
        position: absolute;
        bottom: -1px;
        left: 0;
        z-index: 1;
        display: inline-flex;
        height: 100%;
        margin: 0;
        opacity: 0;
        transition: opacity $default-transition;
        user-select: none;
        pointer-events: none;
    }

    .icon {
        pointer-events: all;
        transition: color .2s;
        cursor: pointer;

        &:hover {
            color: $black-color;
        }
    }
</style>
