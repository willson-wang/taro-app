import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import '@/assets/less/base.less'
import './app.less'

if (process.env.TARO_ENV === 'h5') {
  require('@/utils/debug')
}

const store = configStore()

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
