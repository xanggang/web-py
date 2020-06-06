import Message from './message'
import core from './core'

const m = new Message()

const d = new Proxy(core, {
  get: function(target, propKey) {
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
