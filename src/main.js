import Vue from 'vue/dist/vue.js';
import App from './App.vue';

/** css */
import '@/assets/scss/common.scss';

/** js */
import { splitThousands } from '@/assets/js/utils/numbers-utils';
import { formatDateTime } from '@/assets/js/utils/date-time-utils';
import device from '@/assets/js/device';

/** Components */
import VIcon from '@/components/ui/icon/VIcon.vue';
import VButton from '@/components/ui/button/VButton.vue';
import VButtonIcon from '@/components/ui/button/VButtonIcon.vue';
import VInput from '@/components/ui/input/VInput.vue';

const init = () => {
    const block = document.createElement('div');
    document.body.appendChild(block);

    /** Фильтры */

    Vue.filter('splitThousands', splitThousands);
    Vue.filter('formatDateTime', formatDateTime);

    /** Глобальные компоненты */
    Vue.component('VIcon', VIcon);
    Vue.component('VButton', VButton);
    Vue.component('VButtonIcon', VButtonIcon);
    Vue.component('VInput', VInput);
    /** */

    Vue.config.ignoredElements = ['my-widget'];
    Vue.use(device);


    const script = document.querySelector('#widget-sova');
    const id = script.dataset.id;

    new Vue({
        el: block,
        components: {
            App,
        },
        props: {
            id,
        },
        data() {
            return {
            };
        },
        template: '<App :id="id" />',
    });
};

document.addEventListener('DOMContentLoaded', init());
