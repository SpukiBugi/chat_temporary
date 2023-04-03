<template>
    <div
        :class="$style.RateBye"
        @click="$emit('go-step', 'Chat')"
    >
        <VIcon name="IcRateFinish" :class="$style.message" />

        <MainMenu
            :class="$style.menu"
            class="widget-sova-main-menu"
            @go-step="$emit('go-step', $event)"
        />
    </div>
</template>

<script>
import MainMenu from '@/components/app/main/MainMenu.vue';

export default {
    name: 'RateBye',

    components: {
        MainMenu,
    },

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .RateBye {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0 16px;
        cursor: pointer;
        user-select: none;
    }

    .message {
        width: 100%;
        height: 200px;
        margin-top: 12px;
        margin-bottom: auto;
    }
</style>
