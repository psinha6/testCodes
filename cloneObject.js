shaka.util.ConfigUtils.cloneObject = function(arg) {
  var seenObjects = [];
  // This recursively clones the value |val|, using the captured variable
  // |seenObjects| to track the objects we have already cloned.
  var clone = function(val) {
    switch (typeof val) {
      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
      case 'symbol':
      case 'function':
        return val;
      case 'object':
      default: {
        // typeof null === 'object'
        if (!val) return val;

        if (seenObjects.indexOf(val) >= 0)
          return null;
        var isArray = val.constructor == Array;
        if (val.constructor != Object && !isArray)
          return null;

        seenObjects.push(val);
        var ret = isArray ? [] : {};
        // Note |name| will equal a number for arrays.
        for (var name in val) {
          ret[name] = clone(val[name]);
        }

        // Length is a non-enumerable property, but we should copy it over in
        // case it is not the default.
        if (isArray)
          ret.length = val.length;
        return ret;
      }
    }
  };
  return clone(arg);
};