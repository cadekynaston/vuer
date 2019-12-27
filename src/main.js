import Vue from 'vue';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartPie, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import store from './store';

library.add(faChartPie, faGithub, faUserCircle, faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
