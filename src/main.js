import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })
// Vue.use(ElementUI);
Vue.use(VCharts)

Vue.config.productionTip = false

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
