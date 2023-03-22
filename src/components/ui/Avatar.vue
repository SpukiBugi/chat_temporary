<template>
    <div :class="$style.Avatar">
        <div :class="$style.videoWrap">
            <video src="/bot.mp4"
                   autoplay
                   loop
                   playsinline
                   muted
                   :class="$style.video"
            />
        </div>

        <transition name="fade">
            <div v-show="hasStatus"
                 :class="[$style.status, $style[`_${statusType}`]]"
                 class="widget-sova-app-avatar-status"
            >
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Avatar',

    props: {
        hasStatus: {
            type: Boolean,
            default: false,
        },

        statusType: {
            type: String,
            default: 'menu',
        },
    },

    data() {
        return {};
    },

    methods: {

    },
};
</script>

<style lang='scss' module>
    .Avatar {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .status {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(180deg, #148200 0%, #baeab1 100%);

        &._menu {
            right: -4px;
            bottom: -2px;
            width: 16px;
            height: 16px;
            border: 4px solid $primary-500;
        }

        &._chat {
            right: -2px;
            bottom: 0;
            width: 18px;
            height: 18px;
            border: 4px solid $white;
        }
    }

    .videoWrap {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        isolation: isolate;
    }

    .video {
        width: 100%;
        height: 100%;
    }
</style>
