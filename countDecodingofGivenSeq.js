var countDecoding = function(str, n){
  var count;
  if(n == 0 || n ==1){
    return 1;
  }
  if(str[n-1] > 0){
    count = countDecoding(str, n-1);
  }
  if(str[n-2] == '1' || str[n-2] == '2' && str[n-1] < 7){
    count += countDecoding(str, n-2);
  }
  return count;
}

console.log(countDecoding('1234', 4));