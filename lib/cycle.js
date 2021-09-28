const cycle = function (array) {
  var index = 0;
  var copy = array.slice(0);
  return {
    current: function () {
      return copy[index];
    },
    next: function () {
      index = ++index % copy.length;
      return this.current();
    },
    previous: function () {
      if(--index < 0) {
        index += copy.length;
      }
      return this.current();
    },
    length: copy.length,
    map: function(args) {
      return copy.map(args);
    },
    index: function() {
      return index;
    }
  }
};

export default cycle;
export { cycle };
