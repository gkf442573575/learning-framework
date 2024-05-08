import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/store/auth'

// 路由表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth.vue')
  }
]

// 当前router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 临时code的key值
const SESSION_CODE_KEY = `LOGIN_SESSION_CODE_${import.meta.env.VITE_APP_AGENT_ID}_${new Date().getTime()}`

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const token = authStore.getTooken()
  // 临时code
  const sessionCode = sessionStorage.getItem(SESSION_CODE_KEY)
  if (sessionCode) {
    // 清除掉临时code，刷新一下当前页面
    sessionStorage.removeItem(SESSION_CODE_KEY)
    history.go(0)
    return
  }
  if (token) {
    // 进行认证登录
    await authStore.getInfoByToken()
    next()
  } else {
    if (to.name === 'Auth') {
      const queryCode = to.query.code
      if (queryCode) {
        const { code, busiUri } = await authStore.loginByCode()
        sessionStorage.setItem(SESSION_CODE_KEY, code)
        // 避免history层级增加
        history.back()
        location.href = busiUri
      } else {
        next()
      }
    } else {
      // FIXME:进行登录
      authStore.authLogin(to.fullPath)
    }
  }
})

export default router