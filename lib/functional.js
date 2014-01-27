var _ = require('underscore');

module.exports = {
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

  not: function not(fn) {
    return function () {
      return !fn.apply(this, arguments);
    };
  }
};
