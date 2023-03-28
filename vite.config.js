import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            devtools: true,
        }),
    ],

    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '~': resolve(__dirname, './src'),
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/shared.scss";',
            },
        },
    },

    build: {
        lib: {
            entry: resolve(__dirname, './src/main.js'),
            name: 'widget-sova',
            fileName: 'widget-sova',
            formats: ['es'],
        },

        rollupOptions: {
            external: ['vue/dist/vue.js', 'gsap/dist/gsap.js'],
            output: {
                globals: {
                    'vue/dist/vue.js': 'Vue',
                    'gsap/dist/gsap.js': 'gsap',
                },

                paths: {
                    'vue/dist/vue.js': 'https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js',
                    'gsap/dist/gsap.js': 'https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm',
                },
            },
        },
    },

    server: {
        host: true,
        port: 3000,
    },

    base: '/chat_temporary/',
});
