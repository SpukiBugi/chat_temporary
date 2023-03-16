<template>
    <component
        :is="component"
        v-bind="linkProperties"
        class="v-button"
        :class="classList"
    >
        <slot />
    </component>
</template>

<script>
export default {
    name: 'VButton',

    props: {
        name: {
            type: String,
            required: true,
        },

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
                this.size,
                this.color,
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

<style lang='scss'>
    .v-button {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        /** Sizes */
        &.size-24 {
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
        &.primary-100 {
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

        /** End Colors */
    }
</style>
