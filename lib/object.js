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
  }

};
