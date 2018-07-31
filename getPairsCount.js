function getPairsCount(arr, sum){
  for(var i = 0; i < arr.length; i++){
    for (var j = i + 1; j < arr.length; j++){
      if(arr[i] + arr[j] == sum){
        console.log(arr[i] + ' ' + arr[j]);
      }
    }
  }
}

getPairsCount([1, 5, 7, -1, 5], 6);