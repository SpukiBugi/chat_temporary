<template>
    <component
        :is="component"
        class="v-icon"
        :class="classList"
    />
</template>

<script>
export default {
    name: 'VIcon',

    props: {
        name: {
            type: String,
            required: true,
        },

        size: {
            type: String,
            default: 'size-20',
        },
    },

    computed: {
        classList() {
            return [
                this.size,
            ];
        },

        component() {
            return () => import(`../../icons/${this.name}.vue`);
        },
    },
};
</script>

<style lang='scss'>
    .v-icon {
        fill: currentColor;

        &.size-20 {
            width: 20px;
            height: 20px;
        }

        &.size-16 {
            width: 16px;
            height: 16px;
        }

        &.size-12 {
            width: 12px;
            height: 12px;
        }
    }
</style>
