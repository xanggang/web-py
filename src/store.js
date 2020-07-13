import { saveCache, getCache, clearCacheAll } from './util/storage';


class Data {
  constructor() {
    const cacheStore = getCache('__store__')
    if (cacheStore && cacheStore.messageList) {
      this.messageList = cacheStore.messageList
    } else {
      this.messageList = [] // 记录聊天消息
    }
    this.sysList = []
    this.onlineList = [] // 在线用户
  }

  pushMsg(msg) {
    this.messageList.push(msg)
    if (this.messageList.length >= 50) {
      this.messageList.shift()
    }
    this._saveCache()
  }

  pushSys(msg) {
    this.sysList.push(msg)
    if (this.sysList.length >= 50) {
      this.sysList.shift()
    }
  }

  setOnlineList(list) {
    this.onlineList = list
  }

  _saveCache(){
    saveCache('__store__', {
      messageList: this.messageList
    })
  }

}


export default new Data()
