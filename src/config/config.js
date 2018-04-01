// 后端服务器地址以及api
//const host = 'http://45.78.41.83:9000'
const host = 'http://localhost:9000'
const data = host + '/data'
const login = host + '/login'
const reg = host + '/reg'
const buy = host + '/buy'
const recommend = host + '/recommend' 
// 前端cookie保存key
const serverkey = 'token'
const userkey = 'user'
const userId = 'userid'
export default {
  data,
  login,
  reg,
  buy,
  recommend,
  serverkey,
  userkey,
  userId
}
