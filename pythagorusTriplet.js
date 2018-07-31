function getTriplet(limit){
  var a, b, c = 0;
  Number.MAX_SAFE_INTEGER
  var m = 2;
  while(c < limit){
    for(var n = 1; n < 2; n++){
      a = m*m - n*n;
      b = 2*m*n;
      c = m*m + n*n;
      if(c>limit){
        break;
      }
      console.log('a = ' + a +' b =' + b + ' c = ' + c);
    }
    m++;
  }
}

getTriplet(25);