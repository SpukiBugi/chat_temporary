import Vue from 'vue/dist/vue.js';
import App from './App.vue';

/** css */
import '@/assets/scss/common.scss';

/** Components */
import VIcon from '@/components/ui/icon/VIcon.vue';
import VButton from '@/components/ui/button/VButton.vue';
import VButtonIcon from '@/components/ui/button/VButtonIcon.vue';
import VInput from '@/components/ui/input/VInput.vue';

const init = () => {
    const block = document.createElement('div');
    document.body.appendChild(block);

    /** Глобальные компоненты */
    Vue.component('VIcon', VIcon);
    Vue.component('VButton', VButton);
    Vue.component('VButtonIcon', VButtonIcon);
    Vue.component('VInput', VInput);
    /** */

    Vue.config.ignoredElements = ['my-widget'];

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
