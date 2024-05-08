import qs from 'qs'
import { isNotEmptyObject } from 'class-validator'

// 验证当前环境是不是移动端
export const validateMobile = () => {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}

/**
 * 获取 url 参数
 *
 * @param {string} url
 * @example
 * 'http://baidu.com?id=1&name=laowang' -> {id:1, name: laowang}
 * @returns {string}
 */
export const getUrlParams = (url) => {
  const index = url.indexOf('?')
  if (index < 0) {
    return {}
  }
  const params = url.slice(index + 1)
  return qs.parse(params)
}

/**
 * 合并url地址和参数 序列化
 *
 * @param {string} url
 * @param {object} params
 * @example
 * 'http://baidu.com' + { id: 1, name: 'laowang' } -> 'http://baidu.com?id=1&name=laowang'
 * @returns {string}
 */
export const joinPramas = (url, params) => {
  const index = url.indexOf('?')
  if (index > -1) {
    url = url.slice(0, index)
  }

  return !isNotEmptyObject(params) ? url : decodeURIComponent(`${url}?${qs.stringify(params)}`)
}

/**
 * 移除url中的query参数
 *
 * @param {string} url
 * @example
 * 'http://baidu.com?id=1&name=laowang' -> 'http://baidu.com'
 * @returns {string}
 */
export const delUrlParams = (url) =>
  url.substring(0, url.indexOf('?') > -1 ? url.indexOf('?') : url.length)

// 当前浏览器地址
export const WEB_HREF = `${window.location.origin}${import.meta.env.VITE_APP_BASH_PATH}`
