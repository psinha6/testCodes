var max = function (a,b) {return Math.max(a,b);}

var lps = function (seq, i, j) {
  if (i == j){
    return 1;
  }
  if(seq[i] == seq[j] && i + 1 === j){
    return 2;
  }
  if(seq[i] === seq[j])
    return lps(seq, i+1, j-1) + 2;
  return max(lps(seq, i, j-1), lps(seq, i+1, j));
}
var sterin = 'GEEKSFORGEEKS';
console.log(lps(sterin, 0, sterin.length-1));

var perm = function (chars, pos, length) {
  if(length == 0){
    console.log(chars);
  } else {
    for(var i = pos; i < cha){

    }
  }

}