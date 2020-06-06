import { dateFormat } from './util/util'

const style = {
  date: {
    background: "#0F9096",
    color: '#fff',
    padding: '3px'
  },
  user: {
    background: "red",
    color: '#fff',
    padding: '3px'
  }
}

let messageList = [
  {
    time: '10: 32',
    userName: 'lynn',
    message: 'nnn1'
  }
]

function getStyleString(m) {
  if (!style[m]) {
    throw new Error('样式名称错误')
  }
  let a = Object.keys(style[m]).reduce((pre, cur) => {
    return `${pre}; ${cur}: ${style[m][cur]}`
  }, '')
  return a
}

export default class {
  constructor(userName) {
    this.userName = userName || '匿名' + +(new Date())
  }

  send(message) {
    console.clear()
    messageList.forEach(o => {
        console.log(`%c ${o.time} %c${o.userName}%c : ${o.message}`, getStyleString('date'),
        getStyleString('user'), '')
    })
    messageList.push({
      time: dateFormat(new Date()),
      userName: this.userName,
      message
    })
    console.log(`%c ${dateFormat(new Date())} %c${this.userName}%c : ${message}`, getStyleString('date'),
      getStyleString('user'), '')
    return 'end'
  }

  sendSysErr(message) {
    console.error(`%c ${dateFormat(new Date())} %c 系统错误 : ${message}`, getStyleString('date'), '')
  }

  sendSysInfo(message) {
    console.error(`%c ${dateFormat(new Date())} %c 系统提示 : ${message}`, getStyleString('date'),
      getStyleString('user'), '')
  }

}
