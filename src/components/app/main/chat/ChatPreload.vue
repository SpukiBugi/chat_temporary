<template>
    <div :class="$style.ChatPreload">
        <div :class="$style.bubble">
            <div :class="$style.dot"></div>
            <div :class="$style.dot"></div>
            <div :class="$style.dot"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatPreload',
};
</script>

<style lang='scss' module>
    .ChatPreload {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: auto;
    }

    .bubble {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 44px;
        border-radius: 16px 16px 16px 4px;
        background-color: $base-100;
    }

    .dot {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: $base-900;
        animation: steps 1.2s ease infinite;

        &:not(:last-child) {
            margin-right: 3px;
        }

        @for $i from 1 through 3 {
            &:nth-child(#{$i}n) {
                animation-delay: #{$i * .2}s;
            }
        }
    }

    @keyframes steps {
        0%,
        50%,
        100% {
            transform: translateY(0);
        }

        25% {
            transform: translateY(-3px);
        }
    }
</style>
