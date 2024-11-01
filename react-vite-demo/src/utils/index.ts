import qs from 'qs'
import { isNotEmptyObject } from 'class-validator'

/**
 * @desc 获取 url 参数
 * @param {string} url
 * @example
 * ```js
 * const urlParams = getUrlParams('http://baidu.com?id=1&name=laowang')
 * console.log(urlParams) // {id:1, name: laowang}
 * ```
 * @returns {any}
 */
export const getUrlParams = (url: string): { [key: string]: string } => {
  const index = url.indexOf('?')
  if (index < 0) {
    return {}
  }
  const params = url.slice(index + 1)
  return JSON.parse(JSON.stringify(qs.parse(params)))
}


/**
 * @desc 通过key获取url中对应值
 * @param url
 * @param key
 */
export const getUrlQuery = (url: string, key: string): string => {
  const params = getUrlParams(url)
  return params[key] || ''
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
export const joinPramas = (url: string, params: { [key: string]: any }) => {
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
export const delUrlParams = (url: string) =>
  url.substring(0, url.indexOf('?') > -1 ? url.indexOf('?') : url.length)
