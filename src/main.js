import Vue from 'vue';
import VueGtag from 'vue-gtag';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartPie, faUserCircle, faUser, faExternalLinkAlt, faSearch, faSort, faCalendarPlus, faMapMarkerAlt, faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import {
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './registerServiceWorker';

import App from './App.vue';
import store from './store';

library.add(faChartPie, faGithub, faUserCircle, faUser, faExternalLinkAlt, faSearch, faSort, faCalendarPlus, faMapMarkerAlt, faUserFriends, faQuestionCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: 'UA-137604730-6' },
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
