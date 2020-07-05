
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