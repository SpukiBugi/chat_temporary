<template>
    <div class="v-button-icon" :class="classList">
        <VIcon :name="name"
               :size="iconSize"
        />
    </div>
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
    },

    methods: {

    },
};
</script>

<style lang='scss'>
    .v-button-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        /** Sizes */
        &.size-20 {
            width: 20px;
            height: 20px;
            border-radius: 8px;
        }

        /** End Sizes */

        /** Colors */
        &.base-100 {
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

        /** End Colors */
    }
</style>
