import Vue from 'vue'
import App from './App'
import QSPopup from '@/components/QS-popup/QS-popup.vue'
Vue.component('QSPopup', QSPopup)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
