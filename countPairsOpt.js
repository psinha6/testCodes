function countPairs(arr, n) {
  var myMap = new Map();
  for (var i = 0; i < n; i++) {
    if (!myMap.get(arr[i])) {
      myMap.set(arr[i], 0);
    }
    var val = myMap.get(arr[i]);
    val = val + 1;
    myMap.set(arr[i], val);
  }

  var total = 0;
  for (var i = 0; i < n; i++) {
    total += myMap.get(n - arr[i]);
    if ((n - arr[i]) == arr[i]) {
      total--;
    }
  }
  return total / 2;
}

function countPairsObj(arr, sum) {
  var n = arr.length;
  var myMap = new Object();
  for (var i = 0; i < n; i++) {
    if (!myMap[arr[i]]) {
      myMap[arr[i]] = 0;
    }
    var val = myMap[arr[i]];
    val = val + 1;
    myMap[arr[i]] = val;
  }

  var total = 0;
  for (var i = 0; i < n; i++) {
    var index = sum - arr[i];
    if (myMap[index]) {
      total += myMap[index];
      if (index == arr[i]) {
        total--;
      }
    }
  }
  return total / 2;
}
console.log(countPairsObj([1, 5, 7, -1, 5], 6));