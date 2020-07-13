import Core from './core'
const isDev = process.env.NODE_ENV =='development'


let funNames = [
  'register',
  'login',
  'loginOut',
  'onLine',
  'to',
  'open',
  'hmsg',
  'help',
  'c',
]

const main = {
  init: function (url) {
    const core = new Core(url)
    const d = new Proxy(core, {
      get: function(target, propKey) {
        // 一对一聊天
        if (propKey === 'to') {
          return (id) => {
            target[propKey](id)
          }
        }
        if (!funNames.includes(propKey)) {
          return target.open()
        } else {
          return target[propKey]()
        }
      },
      set: function (e) {
        throw new Error('不允许修改')
      }
    });
    window.d = d
  }
}

if (isDev) {
  main.init('http://127.0.0.1:7001/')
  // main.init('/')
}

export default main
