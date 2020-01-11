import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Goods from '../components/goods/Goods.vue'
import photolist from '../components/photo/list.vue'
import photoinfo from '../components/photo/info.vue'
import vip from '../components/vip/user.vue'
import video from '../components/video/video.vue'
import bofang from '../components/video/bofang.vue'
import liuyan from '../components/liuyan/liuyan.vue'
import kefu from '../components/kefu/kefu.vue'
import shop from '../components/bottom_switch/shopping.vue'
import Search from '../components/bottom_switch/search.vue'
import newslist from '../components/news/NewList.vue'
// import NewsPage from '../component/news/NewsPage.vue'
import newspage from '../components/news/NewsPage.vue'
import detai from '../components/goods/Detail.vue'
import describe from '../components/goods/Describe.vue'
import comment from '../components/goods/Comment.vue'
import add from '../components/bottom_switch/Addgoods.vue'
// import Login from '../components/vip/login.vue'
import login from '../components/vip/login.vue'
import protocol from '../components/vip/protocol.vue'
import daikaifa from '../components/vip/daikaifa.vue'
Vue.use(VueRouter)


const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/goods/list', component: Goods },
    { path: '/photo/list', component: photolist },
    { path: '/photo/info/:id', component: photoinfo },
    { path: "/member", component: vip },
    { path: "/video", component: video },
    { path: "/bofang/:id", component: bofang },
    { path: "/liuyan", component: liuyan },
    { path: "/kefu", component: kefu },
    { path: '/shopcar', component: shop },
    { path: '/search', component: Search },
    { path: '/newslist', component: newslist },
    { path: '/news', component: newspage },
    { path: '/goods/detail', component: detai },
    { path: '/goods/describe', component: describe },
    { path: '/goods/comment', component: comment },
    { path: '/addgoods', component: add },
    // { path: '/login', component: Login }
    { path: '/login', component: login },
    { path: '/protocol', component: protocol },
    { path: '/daikaifa', component: daikaifa },
]

const router = new VueRouter({
    routes
})

export default router