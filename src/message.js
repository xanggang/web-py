import { dateFormat } from './util/util'
import * as STYLE from './util/style'
import store from "./store";

export default class {
  constructor(userName) {
    this.userName = userName || '匿名' + +(new Date())
  }

  // 普通消息
  send(message, userName) {
    const messageFormat = [`%c ${dateFormat(new Date())} %c ${userName} %c : ${message}`, STYLE.PRIMARY, STYLE.USER_NAME, '']
    store.pushMsg(messageFormat)
    console.log(...messageFormat)
    return 'end'
  }

  // 系统错误消息
  sendSysErr(message) {
    console.log(`%c ${dateFormat(new Date())} %c 系统错误 : %c ${message}`, STYLE.PRIMARY, STYLE.ERROR, '')
  }

  // 系统提示消息
  sendSysInfo(message) {
    console.log(`%c ${dateFormat(new Date())} %c 系统提示 %c: ${message}`, STYLE.PRIMARY, STYLE.SUCCESS, STYLE.TEXT)
  }

  // 用户列表， rowLength 每一行是数量
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

  // 查询历史消息
  renderHistoryMessage() {
    const messageList = store.messageList
    messageList.forEach(messageFormat => {
      console.log(...messageFormat)
    })
  }

  // renderPrivateMsg
  acceptPrivateMsg(userName, msg) {
    const messageFormat = [`%c ${dateFormat(new Date())} %c${userName} %c 向你发来了消息: ${msg} %c`, STYLE.PRIMARY, STYLE.USER_NAME, '', '']
    store.pushMsg(messageFormat)
    console.log(...messageFormat)
  }

  // 发送私密消息
  sendPrivateMsg(userName, msg) {
    const messageFormat = [`%c ${dateFormat(new Date())} %c 向 %c ${userName} %c 发送私密消息: ${msg} %c`, STYLE.PRIMARY, '' ,STYLE.USER_NAME, '', '']
    store.pushMsg(messageFormat)
    console.log(...messageFormat)
  }

  renderHelp(key, help) {
    console.log(`%c ${key} %c: ${help}`, STYLE.PRIMARY, '')
  }
}
