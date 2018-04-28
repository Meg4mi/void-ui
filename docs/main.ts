// tslint:disable:no-import-side-effect

import Vue from 'vue';
import App from '@docs/App.vue';
import VoidUI from '@void/VoidUI';

import VoidBrand from '@docs/components/VoidBrand.vue';

import router from '@docs/router';

import '@docs/gamedb/gamedb.scss';

// Vue.use(VoidUI, { theme: 'dark' });
Vue.use(VoidUI, { theme: 'lite' });
Vue.component(VoidBrand.name, VoidBrand);

Vue.config.productionTip = false;

/**
 * App
 */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
