export var countPerItem = function(arr) {
    console.log('input ARR:', arr)
    var countArray = [];
    if(!arr) console.log('No ITEM FOUND');
    //console.log(this)
    arr.forEach(function(item, index) {
        if (countArray.length === 0 
            || !countArray.some(function(elem) {return elem.name === item.name}))  {
                countArray.push(item)
        } 
        else {
         for(let i =0 ;i <countArray.length; i++) {
             if(countArray[i].name === item.name) countArray[i].quantity += item.quantity;
         }
        }
      });
    return countArray;
}
