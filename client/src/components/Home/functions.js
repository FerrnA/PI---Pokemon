function merge(a,b,condition){
    var array = [];
    let largo = a.length + b.length;
    let i = 0;
    let j = 0;
    let condicion = condition;
    while (array[largo-1] == null) {
      if(a[i][condicion] > b[j][condicion]) {
        array.push(b[j]);
        j += 1;
        if(j > b.length-1) {
          array = array.concat(a.splice(i))
        }
      }
      else if(a[i][condicion] <= b[j][condicion]) {
        array.push(a[i]);
        i += 1;
        if(i > a.length-1) {
          array = array.concat(b.splice(j))
        }
      }
    }    // a = []   b = [];
    return array;
  }
  
function mergeSort(array, condicion) {
    let mitad = Math.floor((array.length / 2));
    let array1 = [];
    let array2 = [];
    if(array.length > 1) {
      array1 = array.splice(0,mitad);
      array2 = array.splice(0);
    }
    else if(array.length <= 1){
      return array;
    }
    if(array1.length > 1) {  /// 
      array1 = mergeSort(array1, condicion);
    }
    if(array2.length > 1) {  /// 
      array2 = mergeSort(array2, condicion);
    }
    array = merge(array1,array2, condicion);  // return array = merge(mergeSort(array1),mergeSort(array2))
    return array;
}


module.exports = {
    mergeSort,
    merge
}