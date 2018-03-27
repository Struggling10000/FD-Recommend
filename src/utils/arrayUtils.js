// 通过id搜索返回在arr数组中的项
function searchItem (id, array) {
  let index = array.findIndex(item => {
    return id === item.id
  })

  return array[index]
}

export default {
  searchItem
}
