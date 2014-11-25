var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var object = require('./object');
var array = require('./array');
var functional = require('./functional');
var string = require('./string');

_.mixin(object);
_.mixin(array);
_.mixin(functional);
_.mixin(string);

module.exports = _;
