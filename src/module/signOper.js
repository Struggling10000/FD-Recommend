import cookieUtil from '@/utils/cookie'
import config from '@/config/config'
// 退出登录
function logout () {
  // 通过移除cookie完成
  cookieUtil.remove(config.serverkey)
  cookieUtil.remove(config.userkey)
}
export default {
  logout
}
