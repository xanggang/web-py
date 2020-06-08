import { dateFormat } from './util/util'
import * as STYLE from './util/style'


let messageList = [
  {
    time: '10: 32',
    userName: 'lynn',
    message: 'nnn1'
  }
]

export default class {
  constructor(userName) {
    this.userName = userName || '匿名' + +(new Date())
  }

  send(message) {
    // console.clear()
    // messageList.forEach(o => {
    //     console.log(`%c ${o.time} %c${o.userName}%c : ${o.message}`, STYLE.PRIMARY, STYLE.SUCCESS, '')
    // })
    messageList.push({
      time: dateFormat(new Date()),
      userName: this.userName,
      message
    })
    console.log(`%c ${dateFormat(new Date())} %c${this.userName}%c : ${message}`, STYLE.PRIMARY, STYLE.SUCCESS, '')
    return 'end'
  }

  sendSysErr(message) {
    console.log(`%c ${dateFormat(new Date())} %c 系统错误 : %c ${message}`, STYLE.PRIMARY, STYLE.ERROR, '')
  }

  sendSysInfo(message) {
    console.log(`%c ${dateFormat(new Date())} %c 系统提示 %c: ${message}`, STYLE.PRIMARY, STYLE.SUCCESS, STYLE.TEXT)
  }

}
