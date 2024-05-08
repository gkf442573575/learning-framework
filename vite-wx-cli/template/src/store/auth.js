import { defineStore } from 'pinia'
import { showLoadingToast } from 'vant'
import qs from 'qs'

import { WEB_HREF, getUrlParams } from '@/utils/index'
import storage from '@/utils/storage'

import { getTokenByCode, getUserInfo } from '@/api/index'

// token验证的
export const TOOKEN_KEY = `LOGIN_TOKEN_${import.meta.env.VITE_APP_AGENT_ID}_${import.meta.env.VITE_APP_BASH_PATH.substring(1)}`

/**
 * 获取跳转后的参数值
 *
 * @param {string} url
 * @returns
 */
export const getBusiUriQuery = (url) => {
  url = decodeURIComponent(url)
  const params = getUrlParams(url)
  let busiUri = params.busiUri
  let code = ''
  if (params.code instanceof Array) {
    busiUri = busiUri + `&code=${params.code[0]}`
    code = params.code[params.code.length - 1]
  } else {
    code = params.code
  }
  return {
    busiUri,
    code
  }
}

/**
 * 拼接oauth2的当前认证地址的
 *
 * @param {string} busiUri
 * @returns
 */
export const authRedirectUrl = (busiUri = '/') => {
  // 开发和生产的路径不同
  const redirectUrl = `${WEB_HREF}/auth?busiUri=${WEB_HREF}${busiUri}`
  // 携带的参数
  const query = {
    appid: import.meta.env.VITE_APP_CORP_ID,
    state: parseInt(new Date().getTime() / 1000),
    response_type: 'code',
    scope: import.meta.env.VITE_APP_WX_SCOPE,
    agentid: import.meta.env.VITE_APP_AGENT_ID,
    redirect_uri: redirectUrl
  }
  return `${import.meta.env.VITE_APP_WX_URL}/connect/oauth2/authorize?${qs.stringify(
    query
  )}#wechat_redirect`
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userInfo: null
  }),
  actions: {
    getTooken() {
      const token = import.meta.env.DEV ? 'development' : storage.get(TOOKEN_KEY)
      this.token = token
      return token
    },
    // 通过token获取用户信息
    getInfoByToken() {
      return new Promise(async (resolve, reject) => {
        try {
          if (this.userInfo) {
            resolve('已经获取')
            return
          }
          // 开发环境
          if (import.meta.env.DEV) {
            this.userInfo = {
              userId: '111'
            }
            resolve('开发环境')
            return
          }
          const res = await getUserInfo(this.token)
          if (res && res.data) {
            this.userInfo = res.data
            resolve('获取userinfo成功')
          } else {
            reject(new Error('获取用户信息失败'))
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    // 通过code获取token
    loginByCode() {
      return new Promise(async (resolve, reject) => {
        try {
          // 从认证地址中取出code值和登录后跳转的地址
          const { code, busiUri } = getBusiUriQuery(location.href)
          console.log('busiUri >>>', busiUri)
          const res = await getTokenByCode(code)
          if (res && res.data) {
            // 存储token
            const token = res.data.token
            storage.save(TOOKEN_KEY, token)
            this.token = token
            resolve({
              code,
              busiUri
            })
          } else {
            reject(new Error('获取token出粗'))
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    // 认证登录
    authLogin(busiUri = '/') {
      const authUrl = authRedirectUrl(busiUri)
      console.log('authUrl >>>', authUrl)
      const totast = showLoadingToast({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        location.href = authUrl
        totast.close()
      } catch (error) {
        totast.close()
      }
    },
    // 退出登陆
    loginOut() {
      // 清除掉userinfo
      this.userInfo = null
      this.token = ''
      storage.remove(TOOKEN_KEY)
      // 重新跳转地址
      this.authLogin(location.href.replace(WEB_HREF, ''))
    }
  }
})
