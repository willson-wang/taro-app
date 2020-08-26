import Taro from '@tarojs/taro';

import { stringify } from './query-string'
import Logger from './logger'
import { RequestError } from './broker-error'
import { showToast, showLoading, hideLoading } from './toast';

const logger = new Logger('request')

const requestQueue: string[] = []

console.log()

interface RequestOpts extends Omit<Taro.request.Option, 'url'> {
  custom: object
  params?: {}
}

interface ResponseData<T> {
  retCode: String
  data: T
  errMsg: string
}

interface Response<T> extends Taro.request.SuccessCallbackResult<ResponseData<T>> {
  requestParams: {
    custom: {
      skipError: boolean
    }
  }
}

const defaultOpts: RequestOpts = {
  data: {},
  dataType: 'json',
  header: {
    'content-type': 'application/json'
  },
  method: 'GET',
  responseType: 'text',
  jsonp: false,
  mode: 'cors',
  credentials: 'include',
  cache: 'no-cache',
  timeout: 10000,
  custom: {}
}

function handleError(res: Response<any>): Promise<any> {
  if (!res.requestParams.custom.skipError) {
    showToast({
      title: res.data.errMsg,
      icon: 'none',
      duration: 2000
    })
  }
  return Promise.reject(new RequestError(res.data.errMsg))
}

function checkoutStatusCode(res: Response<any>): Promise<any> {
  if (res.statusCode !== 200) {
    return Promise.reject(new RequestError('网络异常'))
  } else {
    return Promise.resolve(res)
  }
}

function checkoutRetcode(res: Response<any>) {
  if (res.data.retCode !== '0') {
    return handleError(res)
  } else {
    return Promise.resolve(res)
  }
}

function parseResult(res: Response<any>) {
  return Promise.resolve(res.data.data)
}

const requestInterceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  if (requestQueue.indexOf(url) === -1) {
    requestQueue.push(url)
  } else {
    return
  }
  if (requestQueue.length === 1) {
    showLoading()
  }
  logger.log(`http ${method || 'GET'} --> ${url} data: `, data)

  return chain.proceed(requestParams)
    .then(res => {
      const idx = requestQueue.findIndex(url)
      requestQueue.splice(idx, 1)
      if (!requestQueue.length) {
        hideLoading()
      }
      logger.log(`http <-- ${url} result:`, res)
      res.requestParams = requestParams
      return checkoutStatusCode(res)
        .then(checkoutRetcode)
        .then(parseResult)
    })
}

const authInterceptor = function (chain) {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams)
}

Taro.addInterceptor(authInterceptor)
Taro.addInterceptor(requestInterceptor)


/**
 * @description
 * @param {*} url
 * @param {*} params
 */
function addParams(url: string, params = {}) {
    if (!Object.keys(params).length) {
      return url
    }
    return `${url}${url.indexOf('?') > -1 ? '&' : '?'}${stringify(params)}`
}

/**
 * @description request(config) 跟axios的传参保持一致
 * @param {*} opt
 * @returns
 */
async function request<T>(opt: Taro.request.Option): Taro.RequestTask<T> {
  const {url, data, dataType, header, method, responseType, jsonp, mode, credentials, cache, timeout, params, custom } = {...defaultOpts, ...opt}
  const newUrl = addParams(url, params)
  return Taro.request<T>({
    url: newUrl,
    data,
    dataType,
    header,
    method,
    responseType,
    jsonp,
    mode,
    credentials,
    cache,
    timeout,
    custom
  })
}

/**
 * @description get(url[, config])
 * @export
 * @param {*} url
 * @param {*} config
 * @returns
 */
export async function get<T>(url: string, config = {custom: {}}) {
  return request<T>({
    url,
    method: 'GET',
    ...config
  })
}

/**
 * @description post(url[, data[, config]])
 * @export
 * @param {*} url
 * @param {*} data
 * @param {*} config
 * @returns
 */
export async function post<T>(url: string, data: object, config = {custom: {}}) {
  return request<T>({
    url,
    data,
    ...config
  })
}

export default {
  request,
  get,
  post
}
