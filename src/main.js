import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/src/icons.scss'
import './mixins/globals'
import './components/globals'
import { SAVE_USER_SETTING_PLUGIN_MUTATION_TYPES } from '@/store/saveUserSettingsPlugin/constants'
import VueMeta from 'vue-meta'
import VueTheMask from 'vue-the-mask'
import VueAnalytics from 'vue-analytics'
import { createProvider } from './vue-apollo'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import VueSanitize from 'vue-sanitize';

// Install BootstrapVue
Vue.use(BootstrapVue, {
  breakpoints: [
    'xs', // mobile start
    'sm', // mobile
    'md', // tablet start
    'lg', // tablet
    'xl', // tablet
    'xxl' // desktop start
  ]
})

Vue.use(BootstrapVueIcons)

Vue.use(CKEditor)

Vue.use(VueSanitize, {
  allowedTags: ['h1', 'h2', 'b', 'u', 'i', 'blockquote', 'ul', 'ol', 'li',
    'a'],
});

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

// Vue.use(VueAnalytics, {
//   id: 'UA-168220041-1',
//   router
// })

Vue.use(VueTheMask)

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  beforeCreate () { this.$store.commit(SAVE_USER_SETTING_PLUGIN_MUTATION_TYPES.INITIALIZE_LOAD_SAVED_DATA) },
  apolloProvider: createProvider(),
  render: h => h(App)
})

app.$mount('#app')
