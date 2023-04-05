<template>
    <div :class="[$style.Avatar, {[$style._smile]: hasSmile}]">
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

            <transition name="widget-sova-fade-in">
                <img
                    v-if="showPic"
                    src="/fanera.jpg"
                    alt="avatar"
                    :class="$style.image"
                >
            </transition>
        </div>

        <div ref="status"
             :class="[$style.status, {[$style._visible]: hasStatus}]"
        />

        <keep-alive>
            <div v-if="hasSmile"
                 :class="$style.smile"
            >
                <div :class="$style.smileImgWrap">
                    <img
                        src="/smile.png"
                        alt="smile"
                        :class="$style.smileImg"
                    >
                </div>
            </div>
        </keep-alive>
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

        hasSmile: {
            type: Boolean,
            default: false,
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

        &._smile {
            @include hover {
                .smile {
                    opacity: 1;
                }

                .smileImgWrap {
                    transform: scale(1);
                }

                .smileImg {
                    animation-play-state: running;
                }

                .status {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        }
    }

    .status {
        position: absolute;
        right: -4px;
        bottom: -2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 4px solid currentColor;
        background: linear-gradient(180deg, #148200 0%, #baeab1 100%);
        opacity: 0;
        transform: scale(0);
        transition: $default-transition;

        &._visible {
            opacity: 1;
            transform: scale(1);
        }
    }

    .videoWrap {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        isolation: isolate;
        pointer-events: none;
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

    .smile {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: $primary-600;
        opacity: 0;
        transition: $default-transition;
        pointer-events: none;
    }

    .smileImgWrap {
        overflow: hidden;
        width: 36px;
        height: 36px;
        transform: scale(0);
        transition: $default-transition;
    }

    .smileImg {
        height: 100%;
        animation: smile 2.89s steps(73) infinite;
        animation-play-state: paused;
    }

    @keyframes smile {
        100% {
            transform: translateX(-100%);
        }
    }
</style>
