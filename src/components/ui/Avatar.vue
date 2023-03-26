<template>
    <div :class="$style.Avatar">
        <div :class="$style.videoWrap">
            <video
                autoplay
                loop
                playsinline
                muted
                :class="$style.video"
            >
                <source src="/bot.mp4" type="video/mp4" />
            </video>

            <transition name="widget-sova-fade">
                <img
                    v-if="showPic"
                    src="/fanera.jpg"
                    alt="avatar"
                    :class="$style.image"
                >
            </transition>
        </div>

        <transition name="widget-sova-fade">
            <div v-show="hasStatus"
                 :class="[$style.status, $style[`_${statusType}`]]"
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

        showPic: {
            type: Boolean,
            default: false,
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
        pointer-events: none;
    }

    .status {
        position: absolute;
        right: -4px;
        bottom: -2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: linear-gradient(180deg, #148200 0%, #baeab1 100%);

        &._menu {
            border: 4px solid $primary-500;
        }

        &._chat {
            border: 4px solid $white;
        }
    }

    .videoWrap {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        isolation: isolate;
    }

    .video,
    .image {
        width: 100%;
        height: 100%;
    }

    .image {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
