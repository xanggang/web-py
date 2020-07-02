import { dateFormat } from './util/util'
import * as STYLE from './util/style'
import store from "./store";

export default class {
  constructor(userName) {
    this.userName = userName || '匿名' + +(new Date())
  }

  send(message) {
    const messageFormat = [`%c ${dateFormat(new Date())} %c${this.userName}%c : ${message}`, STYLE.PRIMARY, STYLE.USER_NAME, '']
    store.pushMsg(messageFormat)
    console.log(...messageFormat)
    return 'end'
  }

  sendSysErr(message) {
    console.log(`%c ${dateFormat(new Date())} %c 系统错误 : %c ${message}`, STYLE.PRIMARY, STYLE.ERROR, '')
  }

  sendSysInfo(message) {
    console.log(`%c ${dateFormat(new Date())} %c 系统提示 %c: ${message}`, STYLE.PRIMARY, STYLE.SUCCESS, STYLE.TEXT)
  }

  renderUserList(userNameList, rowLength = 3) {
    let groupList = []
    const length = userNameList.length
    userNameList.forEach((name, index) => {
      const groupIndex = Math.floor(index / rowLength)
      const colIndex = index % 3
      if (groupList[groupIndex]) {
        groupList[groupIndex][colIndex] = name
      } else {
        groupList[groupIndex] = [name]
      }
    })

    groupList.forEach(group => {
      const list = []
      let str = group.reduce((pre, cur) => {
        return `${pre} %c ${cur}`
      }, '')
      group.forEach(_ => list.push(STYLE.USER_NAME_LIST))
      console.log(str, ...list)
    })
  }

  renderHistoryMessage() {
    const messageList = store.messageList
    messageList.forEach(messageFormat => {
      console.log(...messageFormat)
    })
  }

}
