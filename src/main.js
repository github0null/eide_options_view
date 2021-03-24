import Vue from 'vue'
import App from './App.vue'
import Argon from './plugins/argon-kit'

// ====== Init ======

Vue.config.productionTip = false

Vue.use(Argon)

new Vue({ render: h => h(App) }).$mount('#app')

const vueInstance = App.methods.getInstance()

// ====== App =======

vueInstance.$on('save-all', () => {
  console.log(vueInstance)
})
