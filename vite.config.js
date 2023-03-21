import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
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
            external: ['vue/dist/vue.min.js', 'gsap/dist/gsap.min.js'],
            output: {
                globals: {
                    'vue/dist/vue.min.js': 'Vue',
                    'gsap/dist/gsap.min.js': 'gsap',
                },

                paths: {
                    'vue/dist/vue.min.js': 'https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.min.js',
                    'gsap/dist/gsap.min.js': 'https://cdn.jsdelivr.net/npm/gsap@3.11.4/+esm',
                },
            },
        },
    },

    server: {
        host: true,
        port: 3000,
    },
});
