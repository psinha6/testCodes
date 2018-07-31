function createTable(rows) {
  var arr = [];
  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
}

function longestPalString(str) {
  var n = str.length;
  var table = createTable(n);
  var maxLength = 1;
  for (var i = 0; i < n; i++) {
    table[i][i] = true;
  }
  var start = 0;
  for(var i = 0; i < n; i++){
    if(str[i] == str[i+1]){
      table[i][i+1] = true;
      start = i;
      maxLength = 2;
    }
  }
  for (var k = 3; k <= n; k++) {
    for (var i = 0; i < n - k + 1; i++) {
      var j = i + k - 1;
      if (table[i + 1][j - 1] == true && str[i] == str[j]) {
        table[i][j] = true;
        if (k > maxLength) {
          maxLength = k;
          start = i;
        }
      }
    }
  }
  printStr(str, start, start + maxLength -1);
  return maxLength;
}

function printStr(str, start, end) {
  console.log(str.slice(start, end+1));
}

console.log(longestPalString('geeksforgeeks'));