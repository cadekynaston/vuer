import Vue from 'vue';
import VueGtag from 'vue-gtag';

import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartPie, faUserCircle, faUser, faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import store from './store';

library.add(faChartPie, faGithub, faUserCircle, faUser, faExternalLinkAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: 'UA-137604730-6' },
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
