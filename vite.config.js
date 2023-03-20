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
        },
    },

    server: {
        host: true,
        port: 3000,
    },
});
