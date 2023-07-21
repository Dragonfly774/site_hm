import Vue from 'vue'
import App from '@/App.vue'
import components from '@/components/UI'
import router from '@/router/router'
import ajax from "@/plugins/axios";
import store from '@/store/index'
import VueTheMask from 'vue-the-mask'


Vue.use(VueTheMask)


Vue.config.productionTip = false
Vue.use(ajax)


components.forEach(component => Vue.component(component.name, component))

// TODO: сделать кнопку изменить и сделать маски на инпуты, написать преподователю спросить как сделать чтоб вывоlидлиись не цифры а имена иназвания жанров

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')