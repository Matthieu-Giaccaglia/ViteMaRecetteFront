import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import Vuex from "vuex"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import store from "./store"
import router from "./router"
import Cookie from "vue-cookies"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Cookie)

Vue.config.productionTip = false;
store.dispatch("initJwt");

Vue.$cookies.config(0)

new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount("#app");
