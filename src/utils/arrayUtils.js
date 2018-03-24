function searchItem(id , array){
    let index = array.findIndex(item =>{
        return id === item.id;
    })

    return array[index];
}

export default{
    searchItem
}