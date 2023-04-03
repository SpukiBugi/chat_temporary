<template>
    <div :class="[$style.RateChoose, {[$style._rated]: values.rating}]">
        <div :class="$style.title">
            Насколько легко
            <br>
            пользоваться сайтом?
        </div>

        <div :class="$style.smiles">
            <div
                v-for="smile in smiles"
                :key="smile.value"
                :class="[$style.smile, {[$style._active]: smile.value === values.rating}]"
                @click="values.rating = smile.value"
            >
                <img :src="smile.src" :class="$style.smileImg">
            </div>
        </div>

        <Expander :is-open="Boolean(values.rating)" :class="$style.inputExpander">
            <form :class="$style.inputWrap" @submit.prevent="onSubmit">
                <VInput
                    v-model="values.question"
                    :autocomplete="false"
                    placeholder="Напишите комментарий"
                    :class="$style.input"
                />

                <button :class="$style.send">
                    <VIcon name="IcSend"
                           size="size-16"
                           :class="$style.sendIcn"
                    />
                </button>
            </form>
        </Expander>

        <transition name="widget-sova-fade">
            <div v-show="isMounted" :class="$style.btns">
                <VButton
                    color="base-100"
                    :class="$style.btn"
                >
                    Сделать скриншот
                </VButton>
                <VButton
                    color="base-100"
                    :class="$style.btn"
                >
                    Прикрепить фото
                </VButton>
            </div>
        </transition>
    </div>
</template>

<script>
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'RateChoose',

    components: {
        Expander,
    },

    data() {
        return {
            isMounted: false,

            values: {
                rating: null,
                question: '',
            },

            smiles: [
                {
                    value: 1,
                    src: `${import.meta.env.BASE_URL}smiles/1.gif`,
                },
                {
                    value: 2,
                    src: `${import.meta.env.BASE_URL}smiles/2.gif`,
                },
                {
                    value: 3,
                    src: `${import.meta.env.BASE_URL}smiles/3.gif`,
                },
                {
                    value: 4,
                    src: `${import.meta.env.BASE_URL}smiles/4.gif`,
                },
                {
                    value: 5,
                    src: `${import.meta.env.BASE_URL}smiles/5.gif`,
                },
            ],
        };
    },

    mounted() {
        this.isMounted = true;
    },

    methods: {
        onSubmit() {
            this.$emit('go-rate-step', 'Bye');
        },
    },
};
</script>

<style lang='scss' module>
    .RateChoose {
        position: relative;
        display: flex;
        flex-direction: column;

        &._rated {
            .title {
                font-size: 14px;
                line-height: 17px;
            }

            .smiles {
                margin-top: 50px;
            }

            .smile {
                &:not(._active) {
                    filter: grayscale(1);
                    opacity: .48;
                }
            }
        }
    }

    .title {
        margin-top: 18px;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        letter-spacing: -.015em;
        transition: $default-transition;
    }

    .smiles {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 82px;
        transition: $default-transition;
    }

    .smile {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        filter: grayscale(1);
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        &:hover {
            transform: scale(1.18);
            filter: grayscale(0);
        }

        &._active {
            transform: scale(1.18);
            filter: grayscale(0);
        }
    }

    .smileImg {
        width: 100%;
        height: 100%;
    }

    .btns {
        position: absolute;
        top: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 20px 20px 12px;
        border-radius: 26px;
        background-color: $white;
        gap: 6px;

        &:global(.widget-sova-fade-enter-active) {
            transition: opacity .4s ease .3s;
        }
    }

    .inputExpander {
        margin-top: auto;
    }

    .inputWrap {
        position: relative;
        padding: 0 8px;
    }

    .send {
        position: absolute;
        top: 50%;
        right: 8px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        color: $primary-500;
        transform: translateY(-50%);
        transition: $default-transition;
        cursor: pointer;
        user-select: none;

        @include hover {
            color: $primary-600;
        }

        &:active {
            color: $primary-900;
        }
    }
</style>
