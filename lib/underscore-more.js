var _ = require('underscore');
_.str = require('underscore.string');

_.mixin(_.str.exports());

_.mixin({
  monetize: function(n) {
    var s = _.numberFormat(+n, 2);
    return n < 0 ? "(" + s.replace('-','') + ")" : s;
  },

  deepClone: function deepClone(a) {
    if(typeof(a) !== 'object' || a == null) return a;
    if(Array.isArray(a)) return a.slice(0).map(_.deepClone);
    if(a.constructor === Date) return new Date(a);
    var r = a.constructor();
    for(var i in a) r[i] = _.deepClone(a[i]);
    return r;
  },

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that preceeds.
  // i.e. apply in the order listed, as opposed to the opposite order like _.compose()
  sequence: function sequence() {
    var funcs = arguments;
    var funcCount = funcs.length;
    return function() {
      var args = arguments;
      for (var i = 0; i < funcCount; i++) {
        args[0] = funcs[i].apply(this, args);
      }
      return args[0];
    };
  },

  transform: function transform(object, transformation) {
    var newObj = {};
    _.each(object, function(value, key) {
      newObj[key] = transformation(value, key);
    });
    return newObj;
  },

  // use _ as a placeholder, and bind non placeholder arguments to fn
  // When the new function is invoked, apply the passed arguments into the placeholders
  partialAny: function partialAny(fn /* arguments */) {
    var appliedArgs = Array.prototype.slice.call(arguments, 1);
    if ( appliedArgs.length < 1 ) return fn;

    return function () {
      var args = _.deepClone(appliedArgs);
      var partialArgs = _.toArray(arguments);
      for (var i=0; i < args.length; i++) {
        if ( args[i] === _ )
          args[i] = partialArgs.shift();
      }
      return fn.apply(this, args.concat(partialArgs));
    };
  },

  pathExists: function pathExist(obj, path) {
    var cur = obj;
    for (var i = 0; i !== path.length; ++i) {
      var key = path[i];
      if (cur === null || typeof cur !== 'object' || cur[key] === undefined) return false;
      cur = cur[key];
    }
    return true;
  },

  objectFilter: function filterObj(obj, fn) {
    var ret = {};
    for (var key in obj) {
      if (fn(obj[key], key)) ret[key] = obj[key];
    }
    return ret;
  },

  not: function not(fn) {
    return function () {
      return !fn.apply(this, arguments);
    };
  }
});

module.exports = _;
