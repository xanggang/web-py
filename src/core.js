import Message from './message'
import { register, checkUserName, login } from './util/service'
import { saveCache, getCache } from './util/storage';
import socket from './util/io'

class Core {
  constructor(userName) {
    this.userName = userName
    this.msg = new Message(userName)
    this.socket = null
    const token = getCache('py_token_')
    if (token) {
      this.connect()
    }
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


  connect() {
    this.socket = socket(getCache('py_token_'))
    this.socket.on('broadcast', (data) => {
      this.msg.send(data.data.message)
      if (!this.userName) {
        this.userName = data.user.userName
        this.msg.userName = data.user.userName
      }
    })
  }


  logout() {}

  // 打开输入框
  open() {
    if (!this.socket) {
      this.msg.sendSysErr('未连接')
      return
    }
    const msg = window.prompt()
    this.socket.emit('sendMsg', msg)
    // this.msg.send(msg)
  }

  history() {}

  set() {}

  help() {}

  clear() {

  }

}

export default new Core()
