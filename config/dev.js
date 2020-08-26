module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      port: 8007
    },
    webpackChain(china) {
      // china.optimization
      //   .namedChunks(true) // 废弃属性，已被最新的chunkIds取代
      //   .namedModules(true) // 废弃属性，已被最新的moduleIds取代

      // china.merge({
      //   optimization: {
      //     namedModules: true,
      //     namedChunks: true
      //   },
      // })
    }
  }
}
