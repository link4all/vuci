// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'material-design-icons/iconfont/material-icons.css'
import ubus from './plugins/ubus.js'
import session from './plugins/session.js'
import system from './plugins/system.js'
import uci from './plugins/uci.js'

Vue.config.productionTip = false

Vue.use(MuseUI)

Vue.use(ubus)
Vue.use(session)
Vue.use(system)
Vue.use(uci)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
