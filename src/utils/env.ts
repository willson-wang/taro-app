import Taro from '@tarojs/taro';

export const ENV_MAP = {
  WEAPP: 'WEAPP',
  SWAN: 'SWAN',
  ALIPAY: 'ALIPAY',
  TT: 'TT',
  WEB: 'WEB',
  RN: 'RN',
  QUICKAPP: 'QUICKAPP',
  QQ: 'QQ',
  JD: 'JD'
}

const env = Taro.getEnv()

export const isWechat = true

export const isMin = env === ENV_MAP.WEAPP

export const isWeb = env === ENV_MAP.WEB

export default {
  isWechat,
  isMin,
  isWeb
}
