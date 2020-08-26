import reducerGenerator from '@/utils/reducerGenerator'

import types, { Types } from '../constants/counter'

interface IState {
  num: number
}

const INITIAL_STATE = {
  num: 0
}

const actionMap = {
  [types.ADD](state: IState): IState {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [types.MINUS](state: IState): IState {
    return {
      ...state,
      num: state.num - 1
    }
  }
}

type ActionMap = typeof actionMap

export default reducerGenerator<IState, ActionMap>(INITIAL_STATE, actionMap)

