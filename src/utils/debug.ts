import locationQuery from './location-query'

let eruda: any = null

const erudaDebug = {
    hasInit: false,
    initDruda: (config = {}) => {
        if (!erudaDebug.hasInit) {
            import(/* webpackChunkName: "eruda" */ 'eruda').then(({default: _eruda}) => {
              eruda = _eruda
              eruda.init(config)
              eruda.show()
              erudaDebug.hasInit = true
            })
        } else {
            erudaDebug.show()
        }
    },
    show: () => {
        eruda && eruda.show()
    },
    hide: () => {
        eruda && eruda.hide()
    }
}

const { debug } = locationQuery

debug && erudaDebug.initDruda()
