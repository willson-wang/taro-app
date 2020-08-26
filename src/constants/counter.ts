import typeGenerator from '@/utils/typeGenerator'

export interface Types {
  ADD: 'ADD@counter'
  MINUS: 'MINUS@counter'
}

export const ADD = 'ADD'
export const MINUS = 'MINUS'

const constObj = typeGenerator('counter', `
ADD
MINUS
`) as Types

export default constObj


