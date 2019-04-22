// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import ElementUI from 'element-ui'
import Vue from 'vue'

import Layout from './layout'
import router from './router'
import _ from 'underscore'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype._ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<layout/>'
})
