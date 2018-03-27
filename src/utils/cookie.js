// 检查cookie True为存在 False为不存在
function checkcookie (cname) {
  let name = getcookie(cname)
  if (name != null && name.length > 0) {
    return true
  }
  return false
}
// 获取cookie
function getcookie (cname) {
  if (document.cookie.length > 0) {
    let cstart = document.cookie.indexOf(cname + '=')
    if (cstart !== -1) {
      cstart = cstart + cname.length + 1
      let cend = document.cookie.indexOf(';', cstart)
      if (cend === -1) {
        cend = document.cookie.length
      }

      return unescape(document.cookie.substring(cstart, cend))
    }
  }
  return ''
}
function remove (cname) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getcookie(cname)
  if (cval != null) {
    document.cookie = cname + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
// 设置cookie
function setcookie (cname, cvalue) {
  document.cookie = cname + '=' + cvalue + '; '
}
// 路由验证cookie Ture为无需跳转
// cname 为服务端指定cookie键
function auth (cname, to) {
  console.log('auth')

  // 白名单 简略实现
  if (to.path === '/' || to.path === '/login') {
    return true
  }
  return checkcookie(cname)
}

export default {
  checkcookie,
  getcookie,
  setcookie,
  remove,
  auth
}
