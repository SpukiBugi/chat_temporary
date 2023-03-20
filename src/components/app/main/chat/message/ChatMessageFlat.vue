<template>
    <div :class="$style.ChatMessageFlat">
        <div
            :class="$style.plan"
            :style="{backgroundImage: `url(${flat.plan || '/lot-placeholder.svg'})`}"
        >
        </div>
        <div :class="$style.text">
            <div v-if="!isNaN(flat.rooms) || flat.area" :class="$style.title">
                {{ flat.rooms === 0 ? 'Студия' : `${flat.rooms}-комн.` }}
                <template v-if="Number(flat.area)">
                    {{ flat.area }} м<sup>2</sup>
                </template>
            </div>

            <div v-if="flat.price" :class="$style.desc">
                {{ flat.price|splitThousands }} ₽
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatMessageFlat',

    props: {
        flat: {
            type: Object,
            required: true,
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
    .ChatMessageFlat {
        display: flex;
        align-items: center;
        min-width: 240px;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid $base-200;
    }

    .plan {
        width: 48px;
        height: 48px;
        margin-right: 16px;
        border-radius: 8px;
        border: 1px solid $base-100;
        background: $white;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .title {
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
    }

    .desc {
        margin-top: 4px;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: -.015em;
        color: $base-500;
    }
</style>
