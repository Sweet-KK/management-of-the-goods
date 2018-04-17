import 'babel-polyfill'
import 'amfe-flexible'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  Style,
  Button,
  Input,
  Textarea,
  Validator,
  Loading,
  Popup,
  Toast,
  Dialog,
  Scroll,
  Slide,
  Swipe,
  Upload,
} from 'cube-ui'
import Viewer from 'v-viewer'
Vue.use(Viewer)
Viewer.setDefaults({
  zIndexInline: 2017,
  "title": false,
  "rotatable": false,
  "scalable": false
})
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios

Vue.use(Button)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Validator)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(Swipe)
Vue.use(Upload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
