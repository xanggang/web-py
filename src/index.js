import Message from './message'
import core from './core'

const m = new Message()

const d = new Proxy(core, {
  get: function(target, propKey) {
    // 一对一聊天
    if (propKey === 'to') {
      return (id) => {
        target[propKey](id)
      }
    }
    if (Reflect.get(target, propKey) && typeof Reflect.get(target, propKey) === 'function') {
      return target[propKey]()
    }
    return target.msg.send(propKey)
  },
  set: function (e) {
    throw new Error('不允许修改')
  }
});

window.d = d
window.m = m

// window.onerror = function (e) {
//   console.log(e);
//   return true
// }
