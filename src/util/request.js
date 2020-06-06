import axios from 'axios'
import { getCache } from './storage'
import Message from '../message'
import store from '../store'

const message = new Message('系统通知')


const axiosInstance = axios.create()
export default function request(options) {
  const arg = {}
  arg.headers = {
    'Content-Type': 'application/json',
  }
  const token = getCache('py_token_')
  if (token) {
    arg.headers = Object.assign({}, arg.headers, { authorization: token })
  }
  arg.url = '/api' + options.url
  arg.method = options.method || 'get'
  arg.method === 'get'
    ? arg.params = options.data
    : arg.data = options.data

  return axiosInstance(arg)
    .then((result) => {
      return result.data
    })
    .catch((err) => {
      const response = err.response
      message.sendSysErr(response.data.message)
      store.pushSys(response.data.message)
    })
}
