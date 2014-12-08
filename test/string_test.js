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

  describe('monetize', function () {
    it('does number formatty stuff', function () {
      var data = [
        [1.23, '1.23'],
        [1.236, '1.24'],
        [-1.23, '(1.23)'],
        [2, '2.00'],
        [-2, '(2.00)']
      ];

      _.each(data, function (pair) {
        expect(_.monetize(pair[0])).eql(pair[1]);
      });
    });
  });

  describe('monetize', function () {
    it('does number formatty stuff', function () {
      var data = [
        [1.23, '$1.23'],
        [1.236, '$1.24'],
        [-1.23, '-$1.23'],
        [2, '$2.00'],
        [-2, '-$2.00']
      ];

      _.each(data, function (pair) {
        expect(_.dollarize(pair[0])).eql(pair[1]);
      });
    });
  });

  describe('upcase', function () {
    it('converts all chars to uppercase', function () {
      expect(_.upcase('hi there')).eql('HI THERE');
    });
  });

  describe('downcase', function () {
    it('converts all chars to lowercase', function () {
      expect(_.downcase('HI THERE')).eql('hi there');
    });
  });

});

