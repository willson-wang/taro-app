// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
let presets = [
  ['taro', {
    framework: 'react',
    ts: true
  }]
]

if (process.env.TARO_ENV === 'h5') {
  presets = [
    ['taro', {
      framework: 'react',
      ts: true,
      useBuiltIns: 'usage',
      debug: false,
      include: [],
      exclude: [],
      corejs: 3,
      shippedProposals: true
    }]
  ]
}
console.log('presets', presets)
module.exports = {
  presets
}


