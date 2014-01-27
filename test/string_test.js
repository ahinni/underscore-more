var _ = require('../lib/underscore-more');
var expect = require('chai').expect;

describe('underscore extensions', function () {

  describe('mixes in underscore.string', function () {
    it('has available the noconflict underscore string functions', function () {
      expect(_.trim('  aaron  ')).eql('aaron');
    });

    it('makes available conflicted include nested under _.str', function () {
      expect(_.str.include('Hi aaron', 'aaron')).eql(true);
    });
  });

});

