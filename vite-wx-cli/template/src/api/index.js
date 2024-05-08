import request from '@/utils/request'

/**
 * 通过oauth code换取认证token
 *
 * @param {string} code
 * @returns
 */
export function getTokenByCode(code) {
  return request({
    url: '/user/ssoLogin',
    method: 'get',
    params: {
      code
    }
  })
}

/**
 * 通过token获取用户信息
 * 
 * @param {string} token 
 * @returns 
 */
export function getUserInfo(token) {
  return request({
    url: `/weixin/createByTag/${token}`,
    method: 'get'
  })
}
