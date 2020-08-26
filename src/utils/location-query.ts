import { parse } from './query-string'

interface Query {
  [key: string]: string
}

let myQuery: Query = {}

if (process.env.TARO_ENV === 'h5') {
  myQuery = parse(window.location.search.slice(1))
}

export default myQuery
