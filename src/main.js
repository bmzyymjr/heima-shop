import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
//引入axios
import axios from 'axios'
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标样式
import './assets/font/iconfont.css'
// 引入jquery
import $ from 'jquery'

Vue.filter('fordate', (value) => {
    if (!value) {
        return value
    } else {
        value = value.slice(0, 10)
        return value
    }
})

//挂载axios
Vue.prototype.$http = axios

// 设置请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')