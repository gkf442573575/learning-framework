import { getWxConfig } from '@/api/wx'

// TODO: 具体配置请查看微信sdk的文档

const jsApiList = [
  'invoke',
  'request3rdApp',
  'openChatWithMsg',
  'shareWechatMessage',
  'shareAppMessage',
  'agentConfig',
  'checkJsApi'
]

const agentApiList = [
  'getStepCount',
  'addCalendarEvent',
  'getAllPhoneContacts',
  'openUserProfile',
  'openChatWithMsg',
  'selectEnterpriseContact'
]

/**
 * 初始化wx config
 *
 * @returns
 */
export const initWxConfig = () => {
  return new Promise(async (resolve, reject) => {
    // 开发环境直接通过
    if (import.meta.env.DEV) {
      resolve()
      return
    }
    try {
      const res = await getWxConfig()
      if (res.data) {
        const { timestamp, nonceStr, signature } = res.data
        wx.config({
          beta: true,
          // debug: true, // 开启调试
          appId: import.meta.env.VITE_APP_CORP_ID,
          timestamp,
          nonceStr,
          signature,
          jsApiList: jsApiList
        })
        resolve(res.data)
      } else {
        throw new Error('获取WX CONFIG失败')
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 *  微信初始化
 */
export const wxReady = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // 先初始化
      await initWxConfig()
      wx.ready(() => {
        resolve()
      })
      wx.error((err) => {
        reject(err)
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 初始wx的agent的config
 *
 * @returns
 */
export const initWxAgentConfig = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await wxReady()
      const res = await getWxConfig('agent')
      if (res.data) {
        const { timestamp, nonceStr, signature } = res.data
        wx.invoke(
          'agentConfig',
          {
            agentid: import.meta.env.VITE_APP_AGENT_ID,
            corpid: import.meta.env.VITE_APP_CORP_ID,
            timestamp,
            nonceStr,
            signature,
            jsApiList: agentApiList
          },
          (res) => {
            if (res.err_msg === 'agentConfig:ok') {
              resolve('初始化成功')
              return
            } else {
              throw new Error(`Agentconfig Err ${res.err_msg}`)
            }
          }
        )
      } else {
        throw new Error('获取Agent Config失败')
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 监测api是否可用
 *
 * @param {string} api
 * @returns
 */
export const checkWxApi = (api) => {
  if (!jsApiList.includes(api)) {
    jsApiList.push(api)
  }
  return new Promise(async (resolve, reject) => {
    try {
      await wxReady()
      wx.checkJsApi({
        jsApiList: [api],
        success: (res) => {
          console.log('checkJsApi res >>>', res)
          if (res.errMsg !== 'checkJsApi:ok') {
            throw new Error('checkJsApi 调用失败')
          }
          // 兼容结果
          let result = res.checkResult
          if (typeof result == 'string') {
            result = JSON.parse(result)
          }
          // 当结果未找到时
          if (!(api in result)) {
            throw new Error('checkJsApi 未找到调用')
          }
          // api调用不支持
          if (!result[api]) {
            // 在api list中移除掉
            const index = jsApiList.indexOf(api)
            if (index > -1) {
              jsApiList.splice(index, 1)
            }
            throw new Error(`${api} 调用不支持`)
          }
          resolve('可调用')
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 使用invoke调用的wx的api
 *
 * @example
 * wx.invoke('shareAppMessage', options) -> invokeWxApi('invokeWxApi', options)
 *
 * @param {string} api api的名称
 * @param {object} options api的配置
 * @returns
 */
export const invokeWxApi = (api, options = {}) => {
  // 添加api
  if (!jsApiList.includes(api)) {
    jsApiList.push(api)
  }
  return new Promise(async (resolve, reject) => {
    try {
      await wxReady()
      wx.invoke(api, options, (res) => {
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 需要使用agent的config的api的wx的接口
 *
 * @example
 * wx.invoke('selectEnterpriseContact', options) -> agentWxApi('selectEnterpriseContact', options)
 *
 * @param {string} api agent的api
 * @param {object} options agent的api配置
 * @returns
 */
export const agentWxApi = (api, options = {}) => {
  if (!agentApiList.includes(api)) {
    agentApiList.push(api)
  }
  return new Promise(async (resolve, reject) => {
    try {
      await initWxAgentConfig()
      wx.invoke(api, options, (res) => {
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 使用wx.[api]的能力
 *
 * @example
 * wx.getLocation -> commonWxApi('getLocation', options)
 *
 * @param {string} api
 * @param {any} options
 * @returns
 */
export const commonWxApi = (api, options = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      await checkWxApi(api)
      if (options) {
        wx[api](options)
      } else {
        wx[api]()
      }
      resolve('调用完成')
    } catch (error) {
      reject(error)
    }
  })
}
