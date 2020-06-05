import { dateFormat } from './util'

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
    console.log(`%c ${dateFormat(new Date())} %c${this.userName}%c : ${message}`, getStyleString('date'),
      getStyleString('user'), '')
    return null
  }

}
