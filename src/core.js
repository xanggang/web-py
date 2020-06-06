import Message from './message'
import { register, checkUserName } from './util/service'

class Core {
  constructor(userName) {
    this.userName = userName
    this.msg = new Message(userName)
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
    const { user, password } = this.getLoginInfo()
    this.userName = user
  }

  logout() {}

  // 打开输入框
  open() {
    const msg = window.prompt()
    this.msg.send(msg)
  }

  history() {}

  set() {}

  help() {}

  clear() {
  }

}

export default new Core()
