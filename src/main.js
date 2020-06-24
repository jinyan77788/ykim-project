import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client'

Vue.config.productionTip = false

// const options = {path: '/my-app/'}
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: socketio('http://127.0.0.1:1234'),
//   options: {
//     path: '/my-app/',
//     autoConnext: false
//   }
// }))




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
