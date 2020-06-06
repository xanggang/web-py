import request from './request'


// 登录
export function login(loginData) {
  return request({
    url: `/account/login`,
    method: 'post',
    data: loginData
  })
}

// 注册
export function register(registerData) {
  console.log(registerData, 999999);
  return request({
    url: `/account/create`,
    method: 'post',
    data: registerData
  })
}

// 校验用户名
export function checkUserName(name) {
  return request({
    url: `/account/check`,
    method: 'get',
    data: {
      userName: name
    }
  })
}
