<template>
    <component
        :is="component"
        class="v-icon"
        :class="[$style.VIcon, ...classList]"
        @click.native="$emit('click')"
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
            default: '',
        },
    },

    computed: {
        classList() {
            return [
                {
                    [this.$style[`_${this.size}`]]: this.size,
                }
            ];
        },

        component() {
            return () => import(`../../icons/${this.name}.vue`);
        },
    },
};
</script>

<style lang='scss' module>
    .VIcon {
        fill: currentColor;

        &._size-20 {
            width: 20px;
            height: 20px;
        }

        &._size-16 {
            width: 16px;
            height: 16px;
        }

        &._size-12 {
            width: 12px;
            height: 12px;
        }
    }
</style>
