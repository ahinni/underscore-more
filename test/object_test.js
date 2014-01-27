var _ = require('../lib/underscore-more');
var expect = require('chai').expect;

describe('underscore extensions', function () {

  describe('deepClone', function () {
    it('should copy a simple object', function () {
      var o = { a: 1, b:2, c: 'a' };
      var c = _.deepClone(o);
      o.a = 90210;
      expect(c).deep.eql({ a: 1, b:2, c: 'a' });
    });

    it('should clone array members', function () {
      var o = { a: 1, b:[3,5,7] };
      var c = _.deepClone(o);
      o.b.push(9);
      expect(c).deep.eql({ a: 1, b:[3,5,7] });
    });

    it('should clone an array of objects', function () {
      var o = { a: 1, b:[{ cc:3,dd:5,ee:7 }] };
      var c = _.deepClone(o);
      o.b[0].c = 99;
      expect(c).deep.eql({ a: 1, b:[{ cc:3,dd:5,ee:7 }] });
    });

    it('should nest', function () {
      var o = { a: 1, b:{ deep:[{ cc:3,dd:5,ee:7 }] } };
      var c = _.deepClone(o);
      o.b.deep[0].c = 99;
      expect(c).deep.eql({ a: 1, b:{ deep:[{ cc:3,dd:5,ee:7 }] } });
    });
  });

  describe('transform', function () {
    var original = { a: 1, b: 3, c: 5 };
    function add5(n) { return n+5; }
    function concatKeyVal(val, key) { return key + val; }

    it('applies a transform function to each value in an object and returns a new object', function () {
      expect(_.transform(original, add5)).eql({ a: 6, b: 8, c: 10});
    });

    it('doesnt affect the original object', function () {
      _.transform(original, add5);
      expect(original).eql( { a: 1, b: 3, c: 5 });
    });

    it('passes the key', function () {
      expect(_.transform(original, concatKeyVal)).eql( { a: 'a1', b: 'b3', c: 'c5' } );
    });
  });

  describe('pickValues', function () {
    var object = { aaron: 'hi', todd: 'there', paul: 'dog', jeff: 'cat' };
    it('returns array of requested values', function () {
      expect(_.pickValues(object, ['aaron', 'todd'])).eql(['hi', 'there']);
    });

    it('works with var args', function () {
      expect(_.pickValues(object, 'aaron', 'todd', 'jeff')).eql(['hi', 'there', 'cat']);
    });
  });

});

