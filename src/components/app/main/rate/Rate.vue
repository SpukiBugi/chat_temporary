<template>
    <div :class="[$style.Rate, {[$style._rated]: values.rating}]">
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

                <input
                    :id="$style.fileId"
                    ref="fileInput"
                    type="file"
                    name="filename"
                    hidden
                    @input="onFileInput"
                />

                <button :class="$style.send">
                    <VIcon name="IcSend"
                           size="size-16"
                           :class="$style.sendIcn"
                    />
                </button>
            </form>
        </Expander>

        <div :class="$style.btns">
            <VButton
                color="base-100"
                :class="$style.btn"
                @click="screenshot"
            >
                Сделать скриншот
            </VButton>
            <VButton
                :color="values.file ? 'primary-100' : 'base-100'"
                :class="$style.btn"
                @click="onUpload"
            >
                <template v-if="values.file">
                    Фото прикреплено
                </template>
                <template v-else>
                    Прикрепить фото
                </template>
            </VButton>
        </div>
    </div>
</template>

<script>
import Expander from '@/components/ui/Expander.vue';

export default {
    name: 'Rate',

    components: {
        Expander,
    },

    data() {
        return {
            isScreenshoting: false,

            values: {
                rating: null,
                file: null,
                question: '',
            },

            errors: {},

            smiles: [
                {
                    value: 1,
                    src: `${import.meta.env.BASE_URL}smiles/1.png`,
                },
                {
                    value: 2,
                    src: `${import.meta.env.BASE_URL}smiles/2.png`,
                },
                {
                    value: 3,
                    src: `${import.meta.env.BASE_URL}smiles/3.png`,
                },
                {
                    value: 4,
                    src: `${import.meta.env.BASE_URL}smiles/4.png`,
                },
                {
                    value: 5,
                    src: `${import.meta.env.BASE_URL}smiles/5.png`,
                },
            ],
        };
    },

    methods: {
        onSubmit() {
            const formData = new FormData();

            for (const key in this.values) {
                formData.append(key, this.values[key]);
            }

            console.log('formData', formData);

            this.$emit('go-step', 'FeedbackThanks');
        },

        async screenshot() {
            if (this.isScreenshoting) {
                return;
            }

            this.isScreenshoting = true;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const video = document.createElement('video');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            try {
                const captureStream = await navigator.mediaDevices.getDisplayMedia();
                video.srcObject = captureStream;
                await video.play();

                setTimeout(async () => {
                    context.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
                    const frame = canvas.toDataURL('image/png');
                    captureStream.getTracks().forEach(track => track.stop());
                    video.pause();

                    const newTab = window.open();
                    newTab?.document.write(`<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${frame}" width="${window.innerWidth}" height="${window.innerHeight}" ></body></html>`);
                }, 300);
            } catch (err) {
                console.error('Error: ' + err);
            }

            this.isScreenshoting = false;
        },

        onUpload() {
            this.$refs.fileInput.click();
        },

        onFileInput(e) {
            this.values.file = e.target.files[0];
        },
    },
};
</script>

<style lang='scss' module>
    .Rate {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 304px;

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
        overflow: hidden;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        transition: $default-transition;
        cursor: pointer;
        filter: grayscale(1);
        user-select: none;

        &:hover {
            transform: scale(1.18);
            filter: grayscale(0);

            .smileImg {
                animation-play-state: running;
            }
        }

        &._active {
            transform: scale(1.18);
            filter: grayscale(0);

            .smileImg {
                animation-play-state: running;
            }
        }

        &:nth-child(3) {
            .smileImg {
                animation-timing-function: steps(37);
            }
        }

        &:nth-child(4) {
            .smileImg {
                animation-timing-function: steps(55);
            }
        }
    }

    .smileImg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        animation: smile 2.88s steps(72) infinite;
        animation-play-state: paused;
    }

    @keyframes smile {
        100% {
            transform: translateX(-100%);
        }
    }

    .btns {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 20px 0 4px;
        gap: 6px;
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
