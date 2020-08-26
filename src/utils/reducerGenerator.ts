/**
 * @description 减少重复劳动，生成reducer函数
 * @export
 * @param {*} initState 初始化state
 * @param {*} mapAction reducer内的switch部分
 * @returns reducer
 */

interface Action {
  type: string
}

interface MapAction {
  [key: string]: Function
}

export default function <S, M extends MapAction>(initState: S, mapAction: M): Function {
  return function <A extends Action>(state = initState, action: A): S {
    console.log(action.type)
    const handler = mapAction[action.type]
    return handler ? handler(state, action) : state
  }
}
