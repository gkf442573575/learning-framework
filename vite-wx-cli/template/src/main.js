import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'amfe-flexible'
import 'amfe-flexible/index.js'

// element pc端
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// vant 移动端
import vant from 'vant'
import 'vant/lib/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import { validateMobile } from './utils/index'

const isMobile = validateMobile()
app.provide('isMobile', isMobile)
app.config.globalProperties.$isMobile = isMobile

app.use(vant)

app.use(ElementPlus, {
  locale: zhCn
})

app.use(createPinia())
app.use(router)

app.mount('#app')
