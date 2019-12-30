import Vue from 'vue';
import VueGtag from 'vue-gtag';
import VueMeta from 'vue-meta';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartPie, faUserCircle, faUser, faExternalLinkAlt, faSearch, faSort, faCalendarPlus, faMapMarkerAlt, faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import metaInfo from './shared/meta';
import './registerServiceWorker';

import App from './App.vue';
import store from './store';

library.add(faChartPie, faGithub, faUserCircle, faUser, faExternalLinkAlt, faSearch, faSort, faCalendarPlus, faMapMarkerAlt, faUserFriends);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: 'UA-137604730-6' },
});
Vue.use(VueMeta);

new Vue({
  store,
  metaInfo,
  render: h => h(App),
}).$mount('#app');
