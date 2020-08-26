import { Dispatch } from 'redux'

import types from '../constants/counter'

export const add = () => {
  return {
    type: types.ADD
  }
}
export const minus = () => {
  return {
    type: types.MINUS
  }
}

// 异步的action
export function asyncAdd () {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
