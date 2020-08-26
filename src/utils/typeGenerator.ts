
/**
 * @description 生成带命名空间的const
 * @export
 * @param {*} namespace
 * @param {*} str
 * @returns {ADD: 'counter@ADD'}
 */

export default function (namespace: string, str: string) {
  // if (!namespace || !str) {
  //   throw new Error(`typeGenerator缺少namespace || str`)
  //   return
  // }
  const constArr = str.trim().split('\n')

  return constArr.reduce((prev, key) => {
    prev[key] = `${namespace}@${key}`
    return prev
  }, {})
}
