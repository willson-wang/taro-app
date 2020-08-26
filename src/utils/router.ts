import Taro from '@tarojs/taro'

type Handler = (opt: Taro.navigateTo.Option) => Promise<Taro.General.CallbackResult>

interface Router {
  push: Handler
  replace: Handler
}

type MethodName = 'navigateTo' | 'redirectTo'

type MethodsMap = {
  navigateTo: 'push'
  redirectTo: 'replace'
}

const methods = ['navigateTo', 'redirectTo']

const methodsMap: MethodsMap = {
  navigateTo: 'push',
  redirectTo: 'replace'
}


function makeFunction() {

}

const router = methods.reduce((prev, method: MethodName) => {
  console.log(methodsMap[method])
  prev[methodsMap[method]] = function (...args) {
    return Taro[method](...args)
  }
  return prev
}, {} as Router)

export default router
