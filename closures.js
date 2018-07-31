function abc() {
  var counter = 1;
  return{
    getId: function () {
      return counter;
    },
    setId: function (id) {
      counter = id;
    }
  }  
}
