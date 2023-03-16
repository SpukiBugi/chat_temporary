import Vue from 'vue/dist/vue.js';
import App from './App.vue';

const init = () => {
    console.log('run');
    const block = document.createElement('div');
    document.body.appendChild(block);

    new Vue({
        el: block,
        components: {
            App,
        },
        data() {
            return {
            };
        },
        template: '<App />',
    });
};

document.addEventListener('DOMContentLoaded', init());
