import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

import { Lazyload, ImagePreview, Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(ImagePreview)