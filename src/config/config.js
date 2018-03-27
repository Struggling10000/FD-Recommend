// 后端服务器地址以及api
const host = 'http://45.78.41.83:9000'
const data = host + '/data'
const login = host + '/login'
const reg = host + '/reg'
// 前端cookie保存key
const serverkey = 'token'
const userkey = 'user'
export default {
  data,
  login,
  reg,
  serverkey,
  userkey
}
