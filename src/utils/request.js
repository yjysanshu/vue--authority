import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const hasToken = getToken()
    if (hasToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = hasToken
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 用户未登陆 或者 用户被禁用，重定向到登录页面
    if (res.code == 101003 || res.code == 101013) {
      localStorage.clear();
      router.replace({
        path: '/login',
      });
    }
    // 返回结果code编码不为0时，显示错误信息
    if (res.code != 200) {
        return Promise.reject(res.message);
    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 创建 API 实例
const createAPI = (url, method, config = {}) => {
  return service({
      url,
      method,
      ...config
  });
}

export default createAPI
