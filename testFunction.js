/*array - unsorted 
value k 

Pair of num whose sum is k 
*/

function findpair(arr, sum){
  for(var i = 0; i < arr.lenght-1; i++){
    for (var j = 0; j < arr.lenght-1; j++){
      if(arr[i] + arr[j] === sum){
        return {first: arr[i], second: arr[j]};
      }
    }
  }
  return -1;
}

function printInorder(arrayAss){
  for(var i = 0; i < arrayAss.lenght; i++){
    if (typeof arrayAss !== 'object' || typeof arrayAss !== 'Array') {
      if(arrayAss[i]){
        console.log(arrayAss[i]);
      }
    } else {
      printInorder(arrayAss[i]);
    }
  }
}