import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
const prependUrl = 'http://xsjyule.dividendss.com'
const platformKey = '3LK0V/qWsjnMe935IUgNzw=='
// axios 配置
axios.defaults.timeout = 15000
axios.defaults.retry = 1

// 请求 post传参序列化
axios.interceptors.request.use((config) => {
  if (String(config.url).indexOf('getLoginUser') !== -1 || String(config.url).indexOf('captcha') !== -1) {
    config.timeout = 3000
    config.retry = 0
  }
  if (String(config.url).indexOf('requestRecharge') !== -1 || String(config.url).indexOf('requestWithdraw') !== -1
    || String(config.url).indexOf('commissionTransfer') !== -1 || String(config.url).indexOf('dividentTransfer') !== -1
    || String(config.url).indexOf('envelopeTransfer') !== -1 || String(config.url).indexOf('activityTransfer') !== -1) {
    config.retry = 0
  }
  if (String(config.url).indexOf('j_acegi_security_check') !== -1) {
    config.timeout = 7000
    config.retry = 0
  }
  return config
}, (error) => {
  return false
  // return Promise.reject(error)
})

// 返回 状态判断
axios.interceptors.response.use((response) => {
  if (response.status === 200 && response.data.code !== 0) {
    console.log('接口 = ' + response.config.url + ', code = ' + response.data.code, ', message = ' + response.data.message)
  }
  if (response.data.code === undefined || response.data.code === null) {
    return {data: {code: 'undefined', message: '网络异常'}}
  }
  return response
}, (err) => {
  console.log('接口报错了', err)
  var config = err.config
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry && err.response && err.response.status === 500) {
    // Reject with the error
    console.log('already tried ' + config.__retryCount + ' times')
    return Promise.resolve({data: { code: '-1234567', message: '网络开小差啦!' }})
  }
  // Increase the retry count
  config.__retryCount += 1
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 3000)
  })
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config)
  })
})

/**
 * 请求
 * @param api         请求地址
 * @param params      请求参数
 * @param type        请求类型 默认post
 * @param selfProxy   是否自己请求（不使用代理）
 * @returns {Promise<any>}
 */
export const fetch = async ({api, params, type, selfProxy, hasKey}) => {
  let url = await AsyncStorage.getItem('url')
  return new Promise((resolve, reject) => {
    type = type ? type.toLowerCase() : 'post'
    if (!hasKey) {
      params = Object.assign({}, params, {
        platformKey
      })
    }
    let d = url ? url : prependUrl
    api = selfProxy ? api : d +'/qm'+ api
    if (type !== 'post') {
      params.timeStamp = new Date().getTime()
      axios[type](api, !selfProxy ? {params} : '').then(response => {
        if (response) {
          resolve(response.data)
        } else {
          resolve({code: '-111112', message: '没有数据返回'})
        }
      }, err => {
        resolve(err)
      }).catch((error) => {
        // reject(error)
        resolve({code: '-1234', message: '网络异常啦!'})
      })
    } else {
      axios.post(api, params).then(response => {
        if (response) {
          resolve(response.data)
        } else {
          resolve({code: '-111112', message: '没有数据返回'})
        }
      }, err => {
        resolve(err)
      }).catch((error) => {
        // reject(error)
        resolve({code: '-1234', message: '网络异常啦!'})
      })
    }
  })
}
