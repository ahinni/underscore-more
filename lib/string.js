var _ = require('underscore');

module.exports = {
  monetize: function(n) {
    var s = _.numberFormat(+n, 2);
    return n < 0 ? "(" + s.replace('-','') + ")" : s;
  },

  upcase: function (s) {
    return s && s.toUpperCase();
  },

  downcase: function (s) {
    return s && s.toLowerCase();
  }
};
