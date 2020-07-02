import Message from './message'
import { register, checkUserName, login } from './util/service'
import { saveCache, getCache, clearCacheAll } from './util/storage';
import socket from './util/io'
import store from './store'

class Core {
  constructor(userName) {
    this.userName = userName
    this.msg = new Message(userName)
    this.socket = null
    this.connect()
  }

  getLoginInfo() {
    const userName = window.prompt('请输入账号')
    const passWord = window.prompt('请输入密码')
    return {
      userName,
      passWord
    }
  }

  register() {
    const { userName, passWord } = this.getLoginInfo()
     if (passWord.length <= 6 || passWord.length > 15) {
       this.msg.sendSysErr('密码长度为6到15个字符')
       return "end"
     }

     let fun = async () => {
       const check = await checkUserName(userName)
       if (!check.data) {
         this.msg.sendSysErr('用户名已注册')
         return
       }
       const user = await register({
         userName,
         passWord
       })
       if (user.data) {
         this.msg.sendSysInfo('注册成功')
         this.msg.userName = user.data.userName
         this.userName = user.data.userName
       } else {
         this.msg.sendSysErr(user.data.message)
       }
     }
    fun()

    return "↓↓请输入密码↓↓"
  }

  // 登录
  login() {
    const { userName, passWord } = this.getLoginInfo()

    let fun = async () => {
      const user = await login({userName, passWord})
      this.userName = user.data.userName
      this.msg.userName = user.data.userName
      saveCache('py_token_', user.data.token)
      this.connect()
    }

    fun()
    return "↓↓请输入密码↓↓"
  }

  loginOut() {
    clearCacheAll()
    this.socket.close()
  }

  setUser(user) {
    saveCache('socketId', user.socketId)
  }

  connect() {
    const token = getCache('py_token_')
    const socketId = getCache('socketId')
    this.socket = socket(token, socketId)

    // 连接成功
    this.socket.on('connect', () => {
      const id = this.socket.id;
      this.socket.on(id, (msg) => {
        switch (msg.status) {
          case 'error':
            this.msg.sendSysErr(msg.msg);
            break;
          case 'success':
            this.msg.sendSysInfo(msg.msg);
            break;
          case 'setUser':
            this.setUser(msg.msg)
            break;
          case 'loginOut':
            this.loginOut()
            break;
          case 'setOnline':
            store.onlineList = msg.msg
            break;
          case 'privateMsg':
            this.msg.sendSysInfo(msg.msg);
        }
      });
    });

    // 连接断开
    this.socket.on('disconnect', (data) => {
      this.msg.sendSysErr('连接断开')
    })

    // 广播消息
    this.socket.on('broadcast', (data) => {
      if (!this.userName) {
        this.userName = data.user.userName
        this.msg.userName = data.user.userName
      }
      this.msg.send(data.data.message)
    })

    // 系统消息
    this.socket.on('sysBroadcast', (message) => {
      this.msg.sendSysInfo(message)
    })

    //
    this.socket.on('online', (message) => {
      store.onlineList = message
    })
  }

  onLine() {
    const userList = store.onlineList.map(o => o.userName)
    if (!userList.length) {
      this.msg.sendSysInfo('当前房间没有其他用户')
      return
    }
    this.msg.renderUserList(userList)
  }

  to(userName) {
    const userList = store.onlineList
    const toUser = userList.find(user => user.userName === userName)
    if (!toUser) {
      this.msg.sendSysErr('你要发送的用户不存在')
      return
    }
    const msg = window.prompt(`向${userName}发送私聊消息`)
    this.socket.emit('privateMsg', {
      socketId: toUser.socketId,
      message: msg
    })
  }

  // 打开输入框
  open() {
    if (!this.socket) {
      this.msg.sendSysErr('未连接')
      return
    }
    const msg = window.prompt()
    this.socket.emit('sendMsg', msg)
    return ''
  }

  hmsg() {
    this.msg.renderHistoryMessage()
  }

  set() {}

  help() {

  }

  c() {
    console.clear()
  }

}

export default new Core()
