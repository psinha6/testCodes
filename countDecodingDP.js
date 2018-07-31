function countDecodingdp(str, n){
  var count = [];
  count[0] = 1;
  count[1] = 1;
  for(var i = 2; i <= n; i++){
    count[i] = 0;
    if(str[i-1] > '0'){
      console.log(str[i - 1]);
      count[i] = count[i-1];
    }
    console.log(str[i - 2] + ' ' + str[i - 1]);
    if(str[i-2] == '1' || str[i-2] == '2' && str[i-1] < '7'){
      count[i] += count[i-2];
    }
  }
  return count[n];
}
console.log(countDecodingdp('1234', 4));