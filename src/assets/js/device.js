const install = Vue => {
    const eventBus = new Vue();
    const breakpoints = {
        mobile: 768,
        tablet: 1024,
        laptop: 1280,
        desktop: 1440,
        'large-desktop': 1940,
        'x-large-desktop': 999999,
    };

    const setBp = () => {
        for (const key in breakpoints) {
            if (window.innerWidth < breakpoints[key]) {
                eventBus.$emit('update', key);
                return;
            }
        }
    };

    window.addEventListener('resize', setBp);

    Vue.mixin({
        data() {
            return {
                device: 'large-desktop',
            };
        },

        mounted() {
            eventBus.$on('update', value => {
                this.device = value;
            });

            setBp();
        },
    });
};


export default { install };
