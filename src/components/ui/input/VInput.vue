<template>
    <div :class="[$style.VInput, classList]">
        <div
            ref="inner"
            :class="$style.inner"
        >
            <input
                :aria-label="label"
                :class="$style.native"
                :tabindex="0"
                :value="inputValue"
                v-bind="attributes"
                @blur="onBlur"
                @focus="onFocus"
                @input="onInput"
            >

            <div
                ref="border"
                :class="$style.border"
                :style="borderStyle"
            />

            <span
                v-if="suffixIcon"
                :class="$style.suffix"
            >
                <svg-icon
                    :class="`icon-${suffixIcon}`"
                    :name="suffixIcon"
                />
            </span>


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

        <transition name="fade-fast">
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
import gsap from 'gsap';

// Utils
import { masks, numberInputs, addMask, setCursor } from '~/assets/js/utils/mask-utils';

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
         * Можно передать название иконки svg-sprite, для отображения в поле ввода
         */
        suffixIcon: {
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

            /** Border */
            tween: null,
            positionX: -200,
            positionY: -200,
        };
    },

    computed: {
        classList() {
            return {
                [this.$style[`_${this.color}`]]: this.size,
                [this.$style[`_${this.size}`]]: this.size,
                [this.$style._focused]: this.isFocused,
                [this.$style._active]: this.value || this.isFocused,
                [this.$style._suffix]: this.suffixIcon,
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
                    maskImage: `radial-gradient(35% 35px at ${this.positionX}% ${this.positionY}%, black 60%, transparent)`,
                },
            ];
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
    },

    mounted() {
        window.addEventListener('mousemove', this.onMouseMove);
    },

    beforeDestroy() {
        window.removeEventListener('mousemove', this.onMouseMove);
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

        onMouseMove(e) {
            const elRect = this.$refs.border?.getBoundingClientRect();

            if (!elRect) {
                return;
            }

            const xPerc = (e.clientX - elRect.left) / elRect.width * 100;
            const yPerc = (e.clientY - elRect.top) / elRect.height * 100;

            /** Оптимизация чтобы значения менялись только если курсор рядом */
            if ((xPerc < -200 || xPerc > 200) || (yPerc < -200 || yPerc > 200)) {
                this.tween?.kill();

                return;
            }
            /** */

            /** Плавное изменение значений */
            const tweenObj = {
                x: this.positionX,
                y: this.positionY,
            };
            const tweenObjNew = {
                x: xPerc,
                y: yPerc,
            };

            const options = {
                duration: 1,
                ...tweenObjNew,
                onUpdate: () => {
                    this.positionX = tweenObj.x;
                    this.positionY = tweenObj.y;
                },

                ease: 'power3.out',
            };

            this.tween = gsap.to(tweenObj, options);
            /** */
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
                font-size: 13px;
                line-height: 16px;
                letter-spacing: -.015em;
            }

            .native {
                padding: 16px;
            }
        }

        /* Colors */
        &._base {
            input.native {
                background-color: $base-100;
                color: $black-color;
            }

            .premask,
            .label {
                color: $base-100;
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
        }

        &._focused {
            .native {
                border-color: $primary-500;
            }

            .border {
                opacity: 0;
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
        border-radius: 20px;
        border: 1px solid $base-200;
        transition: $default-transition;
    }

    .border {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border: 1.5px solid $primary-500;
        transition: opacity $default-transition;
        pointer-events: none;
    }

    .label {
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;
        transition: opacity $default-transition;
        pointer-events: none;
    }

    .inner {
        position: relative;
        z-index: 2;
        overflow: hidden;
    }

    .suffix {
        position: absolute;
        top: 0;
        right: 6px;
        height: 100%;
        text-align: center;
        color: $black-color;

        &:after {
            content: "";
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
        }
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
