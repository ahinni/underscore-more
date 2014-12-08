var _ = require('underscore');

module.exports = {
  monetize: function(n) {
    var s = _.numberFormat(+n, 2);
    return n < 0 ? "(" + s.replace('-','') + ")" : s;
  },

  dollarize: function(n) {
    return n < 0 ? "-$"+_.numberFormat(+n*-1,2) : "$"+_.numberFormat(+n,2);
  },

  upcase: function (s) {
    return s && s.toUpperCase();
  },

  downcase: function (s) {
    return s && s.toLowerCase();
  }
};
