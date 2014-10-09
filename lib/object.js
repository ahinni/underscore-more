var _ = require('underscore');

module.exports = {
  deepClone: function deepClone(a) {
    if(typeof(a) !== 'object' || a == null) return a;
    if(Array.isArray(a)) return a.slice(0).map(_.deepClone);
    if(a.constructor === Date) return new Date(a);
    var r = a.constructor();
    for(var i in a) r[i] = _.deepClone(a[i]);
    return r;
  },

  transform: function transform(object, transformation) {
    var newObj = {};
    _.each(object, function(value, key) {
      newObj[key] = transformation(value, key);
    });
    return newObj;
  },

  pickValues: function pickValues(object /*, keys */) {
    var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
    return _.map(keys, function (k) { return object[k]; });
  },

  hasKey: function hasKey(object, key) {
    var path = key.split('.');
    if ( path.length === 1) return _.has(object, key);

    var obj = object;
    for (var i = 0; i !== path.length; ++i) {
      var partialKey = path[i];
      if (obj === null || typeof obj !== 'object' || obj[partialKey] === undefined) return false;
      obj = obj[partialKey];
    }

    return true;
  },

  objectify: function objectify(list, value) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (value === undefined) value = true;
      result[list[i]] = value;
    }
    return result;
  }

};
