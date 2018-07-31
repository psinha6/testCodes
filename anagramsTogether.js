var sortAlphabets = function (text) {
  return text.split('').sort().join('');
};

function processAnagrams(arr) {
  var copyArr = [];
  for (var i = 0; i < arr.length; i++) {
    copyArr[i] = {};
    copyArr[i]['val'] = arr[i];
    copyArr[i]['index'] = i;
  }

  // Sort individual words in array
  for (var i = 0; i < copyArr.length; i++){
    copyArr[i].val = sortAlphabets(copyArr[i].val);
    console.log(copyArr);
  }
  copyArr.sort(sortFn)
  for (var i = 0; i < copyArr.length; i++) {
    console.log(arr[copyArr[i].index])
  }
}

function sortFn(obj1, obj2) {
  
  if(obj1.val < obj2.val) return -1;
  if (obj1.val > obj2.val) return 1;
  return 0;
}

processAnagrams(['cat', 'dog', 'tac', 'god', 'act']);