<template>
    <div :class="$style.Avatar">
        <video src="/bot.mp4"
               autoplay
               loop
               playsinline
               muted
               :class="$style.video"
        />
    </div>
</template>

<script>
export default {
    name: 'Avatar',

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Avatar {
        overflow: hidden;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        isolation: isolate;
    }

    .video {
        width: 100%;
        height: 100%;
    }
</style>
