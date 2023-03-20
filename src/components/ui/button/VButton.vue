<template>
    <component
        :is="component"
        v-bind="linkProperties"
        :class="[$style.VButton, ...classList]"
        v-on="$listeners"
    >
        <slot />
    </component>
</template>

<script>
export default {
    name: 'VButton',

    props: {
        size: {
            type: String,
            default: 'size-24',
        },

        color: {
            type: String,
            default: 'primary-100',
        },

        href: {
            type: String,
            default: '',
        },

        blank: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {};
    },

    computed: {
        classList() {
            return [
                {
                    [this.$style[`_${this.size}`]]: this.size,
                    [this.$style[`_${this.color}`]]: this.color,
                    [this.$style._disabled]: this.disabled,
                },
            ];
        },

        component() {
            if (this.href) {
                return 'a';
            }

            return 'button';
        },

        linkProperties() {
            const linkProperties = {};

            if (this.href) {
                linkProperties.href = this.href;
            }

            if (this.blank) {
                linkProperties.target = '_blank';
            }

            return linkProperties;
        },
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .VButton {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        /** Sizes */
        &._size-40 {
            height: 40px;
            padding: 0 15px;
            border-radius: 12px;
            font-weight: 500;
            font-size: 13px;
            line-height: 16px;
            letter-spacing: -.01em;
        }

        &._size-24 {
            height: 24px;
            padding: 0 7px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 11px;
            line-height: 14px;
            letter-spacing: -.01em;
        }

        /** End Sizes */

        /** Colors */
        &._primary-100 {
            border: 1px solid $primary-200;
            background-color: $primary-100;
            color: $primary-500;

            @include hover {
                background-color: $primary-200;
                color: $primary-600;
            }

            &:active {
                background-color: $primary-500;
                color: $white;
            }

            &._disabled {
                border-color: $primary-100;
                color: $primary-300;
            }
        }

        &._base-100 {
            border: 1px solid $base-200;
            background-color: $base-100;
            color: $base-500;

            @include hover {
                background-color: $base-200;
                color: $base-600;
            }

            &:active {
                background-color: $primary-500;
                color: $white;
            }

            &._disabled {
                border-color: $base-100;
                color: $base-300;
            }
        }

        /** End Colors */
    }
</style>
