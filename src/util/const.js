
// socket事件
export const SOCKET_EVENT = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  BROADCAST: 'broadcast', // 广播聊天消息
  SYS_BROADCAST: 'sysBroadcast', // 系统消息
  ONLINE: 'online', // 在线用户
  SEND_PRIVATE_MSG: 'sendPrivateMsg'
}

export const PRIVATE_EVENT = {
  ERROR: 'error',
  SUCCESS: 'success',
  SET_USER: 'setUser', // 获取当前用户
  LOGIN_OUT: 'loginOut', // 登出
  SET_ONLINE: 'setOnline', // 在线用户
  PRIVATE_MSG: 'privateMsg', // 私聊消息
}

export const HELP_DATA = {
  'd.register': '注册用户， 密码大于等于6位',
  'd.login': '用户登陆',
  'd.loginOut': '退出登陆， 清除数据',
  'd.onLine': '查看当前在线列表',
  'd.to': '对某个用法发送私聊消息',
  'd.open': '打开对话框， 发送消息',
  'd.hmsg': '展示最近的50条消息',
  'd.c': '清空控制台'
}