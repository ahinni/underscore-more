var _ = require('underscore');

module.exports = {

  objectify: function objectify(list, value) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (value === undefined) value = true;
      result[list[i]] = value;
    }
    return result;
  },

  bucketize: function bucketize(list /* groupings */) {
    var groupings = _.map(Array.prototype.splice.call(arguments, 1), function (g) {
      return _.isString(g) ? { by: g, as: 'children' } : g;
    });

    function groupToArray(obj, as) {
      return _.map(obj, function (items, key) {
        var r = { name: key };
        r[as] = items;
        return r;
      });
    }

    function _recursiveBucketize(values, groupings) {
      var firstGrouping = groupToArray(_.groupBy(values, groupings[0].by), groupings[0].as);
      if (groupings.length > 1) {
        _.each(firstGrouping, function (group) {
          group[groupings[0].as] = _recursiveBucketize(group[groupings[0].as], groupings.slice(1));
        });
      }

      return firstGrouping;
    }

    return _recursiveBucketize(list, groupings);
  }

};
