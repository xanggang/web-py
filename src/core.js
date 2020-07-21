import Message from './message'
import { register, checkUserName, login } from './util/service'
import { saveCache, getCache, clearCacheAll } from './util/storage';
import socket from './util/io'
import store from './store'
import { SOCKET_EVENT, PRIVATE_EVENT, HELP_DATA } from "./util/const";

class Core {
  constructor(url) {
    this.c()
    console.log('恭喜你发现了宝藏， 正在连接至隐秘的角落。。。');
    this.userName = null
    this.msg = new Message()
    this.socket = null
    this.url = url
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

    return "～～ 操作完成 ～～"
  }

  // 登录
  login() {
    const socketId = getCache('socketId')
    if (socketId) {
      this.msg.sendSysErr('本浏览器已经登陆， 清先运行d.loginOut退出登陆')
      return
    }
    const { userName, passWord } = this.getLoginInfo()

    let fun = async () => {
      const user = await login({userName, passWord})
      // 清除上一用户的聊天记录和id信息
      clearCacheAll()
      this.userName = user.data.userName
      this.msg.userName = user.data.userName
      saveCache('py_token_', user.data.token)
      this.connect()
    }

    fun()
    return "～～ 操作完成 ～～"
  }

  loginOut() {
    clearCacheAll()
    this.socket.close()
    return "～～ 操作完成 ～～"
  }

  setUser(user) {
    if (!this.userName) {
      this.userName = user.userName
      this.msg.userName = user.userName
    }
    saveCache('socketId', user.socketId)
  }

  connect() {
    const token = getCache('py_token_')
    const socketId = getCache('socketId')
    this.socket = socket(token, socketId, this.url)

    // 连接成功
    this.socket.on(SOCKET_EVENT.CONNECT, () => {
      const id = this.socket.id;
      this.socket.on(id, (msg) => {
        switch (msg.status) {
          case PRIVATE_EVENT.error:
            this.msg.sendSysErr(msg.msg);
            break;
          case PRIVATE_EVENT.SUCCESS:
            this.msg.sendSysInfo(msg.msg);
            break;
          case PRIVATE_EVENT.SET_USER:
            this.setUser(msg.msg)
            break;
          case PRIVATE_EVENT.LOGIN_OUT:
            this.loginOut()
            break;
          case PRIVATE_EVENT.SET_ONLINE:
            store.setOnlineList(msg.msg)
            break;
          case PRIVATE_EVENT.PRIVATE_MSG:
            this.msg.acceptPrivateMsg(msg.user.userName, msg.msg);
            break;
        }
      });
    });

    // 连接断开
    this.socket.on(SOCKET_EVENT.DISCONNECT, (data) => {
      this.msg.sendSysErr('连接断开')
    })

    // 广播消息
    this.socket.on(SOCKET_EVENT.BROADCAST, (data) => {
      this.msg.send(data.data.message, data.user.userName)
    })

    // 系统消息
    this.socket.on(SOCKET_EVENT.SYS_BROADCAST, (message) => {
      this.msg.sendSysInfo(message)
    })

    // 在线用户列表
    this.socket.on(SOCKET_EVENT.ONLINE, (message) => {
      store.setOnlineList(message)
    })
  }

  onLine() {
    const userList = store.onlineList.map(o => o.userName)
    if (!userList.length) {
      this.msg.sendSysInfo('当前房间没有其他用户')
      return
    }
    this.msg.renderUserList(userList)
    return "～～ 操作完成 ～～"
  }

  to(userName) {
    const userList = store.onlineList
    const toUser = userList.find(user => user.userName === userName)
    if (!toUser) {
      this.msg.sendSysErr('你要发送的用户不存在')
      return
    }
    const msg = window.prompt(`向${userName}发送私聊消息`)
    this.socket.emit(SOCKET_EVENT.SEND_PRIVATE_MSG, {
      socketId: toUser.socketId,
      message: msg
    })
    this.msg.sendPrivateMsg(userName, msg)
    return "～～ 操作完成 ～～"
  }

  // 打开输入框
  open() {
    if (!this.socket) {
      this.msg.sendSysErr('未连接')
      return
    }
    const msg = window.prompt()
    this.socket.emit('sendMsg', msg)
    return "～～ 操作完成 ～～"
  }

  // 快速发送消息

  hmsg() {
    this.msg.renderHistoryMessage()
    return "～～ 操作完成 ～～"
  }

  set() {}

  help() {
    Object.entries(HELP_DATA).forEach(([key, text]) => {
      this.msg.renderHelp(key, text)
    })
    return "～～ 操作完成 ～～"
  }

  c() {
    console.clear()
  }

}

export default Core
