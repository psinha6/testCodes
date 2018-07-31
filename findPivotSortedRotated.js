function findPivot (arr){
  let length = arr.length;
  if(!arr){
    return -1;
  }
  if (arr[0] <= arr[length-1]){
    return 0;
  }
  let start = 0, end = length -1;
  while(start <= end){
    let mid = (start + end) / 2;
    if(arr[mid] > arr[mid + 1]){
      return (mid + 1);
    } else if(arr[start] < arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

console.log(findPivot([45,2,4,5,6,8,9]));