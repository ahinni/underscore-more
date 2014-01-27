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

  describe('pathExists', function () {
    expect(_.pathExists({ foo: 0 }, ['foo'])).eql(true);
    expect(_.pathExists({ foo: { bar: 1 } }, ['foo'])).eql(true);
    expect(_.pathExists({ foo: { bar: 1 } }, ['foo', 'bar'])).eql(true);
    expect(_.pathExists({ foo: { bar: null } }, ['foo', 'bar'])).eql(true);
    expect(_.pathExists({ foo: { bar: null } }, ['foo', 'noexist'])).eql(false);
    expect(_.pathExists({}, ['foo'])).eql(false);
    expect(_.pathExists(null, ['foo'])).eql(false);
    expect(_.pathExists(undefined, ['foo'])).eql(false);
  });

});

