import request from '@/utils/request'

/**
 * 获取config
 *
 * @param {string} [type=''] 
 * @returns
 */
export function getWxConfig(type = '') {
  return request({
    url: '/weixin/config',
    method: 'post',
    data: {
      signUrl: encodeURIComponent(location.href),
      type
    }
  })
}
