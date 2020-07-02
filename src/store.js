
class Data {
  constructor() {
    this.messageList = [] // 记录聊天消息
    this.sysList = []
    this.onlineList = [] // 在线用户
  }

  pushMsg(msg) {
    this.messageList.push(msg)
    if (this.messageList.length >= 50) {
      this.messageList.shift()
    }
  }

  pushSys(msg) {
    this.sysList.push(msg)
    if (this.sysList.length >= 50) {
      this.sysList.shift()
    }
  }


}


export default new Data()
