<template>
    <component
        :is="component"
        v-bind="linkProperties"
        :class="[$style.VButtonIcon, ...classList]"
        v-on="$listeners"
    >
        <VIcon :name="name"
               :size="iconSize"
               :class="$style.icon"
        />
    </component>
</template>

<script>
export default {
    name: 'VButtonIcon',

    props: {
        name: {
            type: String,
            required: true,
        },

        size: {
            type: String,
            default: 'size-20',
        },

        color: {
            type: String,
            default: 'base-100',
        },

        iconSize: {
            type: String,
            default: 'size-20',
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

        rotate: {
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
                    [this.$style._rotate]: this.rotate,
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
    .VButtonIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        &._rotate {
            .icon {
                transform: rotate(180deg);
            }
        }

        /** Sizes */
        &._size-20 {
            width: 20px;
            height: 20px;
            border-radius: 8px;
        }

        /** End Sizes */

        /** Colors */
        &._base-100 {
            border: 1px solid $base-200;
            background-color: $base-100;
            color: $base-400;

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

        &._base-400 {
            border: 1px solid $base-400;
            background-color: $base-400;
            color: $white;

            @include hover {
                border-color: $base-500;
                background-color: $base-500;
            }

            &:active {
                background-color: $primary-500;
                color: $white;
            }

            &._disabled {
                border-color: $base-100;
                background-color: $base-100;
                color: $base-300;
            }
        }

        &._primary-500 {
            border: 1px solid $primary-500;
            background-color: $primary-500;
            color: $white;

            @include hover {
                border-color: $primary-600;
                background-color: $primary-600;
            }

            &:active {
                border-color: $primary-900;
                background-color: $primary-900;
            }

            &._disabled {
                border-color: $base-200;
                color: $base-300;
            }
        }

        /** End Colors */
    }
</style>
