import path from 'path'
import { existsSync, readdirSync, statSync } from './fs-utils'


function getCustomRoutes() {
  const temp = {}
  const pagesPath = path.resolve(__dirname, '..', 'src/pages')
  if (existsSync(pagesPath)) {
    const pages = readdirSync(pagesPath)
    pages.forEach((page) => {
      if (statSync(`${pagesPath}/${page}`).isDirectory) {
        temp[`/pages/${page}/${page}`] = `/${page}`
      }
    })
  }
  return temp
}

let customRoutes = {}
try {
  customRoutes = getCustomRoutes() // '/pages/index/index': '/index'
} catch (error) {
  console.log('customRoutes', error)
}
const config = {
  projectName: 'taro-app',
  date: '2020-8-18',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 1 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/actions': path.resolve(__dirname, '..', 'src/actions'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/reducers': path.resolve(__dirname, '..', 'src/reducers'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    router: {
      mode: 'history',
      customRoutes
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
