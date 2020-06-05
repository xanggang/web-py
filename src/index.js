import Message from './message'

const m = new Message()

const d = new Proxy({}, {
  get: function(target, propKey) {
    if (propKey === 'open') {
      const value = window.prompt()
      return m.send(value)
    }
    return m.send(propKey)
  },
  set: function (e) {
    throw new Error('不允许修改')
  }
});






window.d = d
