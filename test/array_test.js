var _ = require('../lib/underscore-more');
var expect = require('chai').expect;

describe('underscore array extensions', function () {

  describe('bucketize', function () {
    var list = [
      { a: 'A1', b: 'B1', c: 'C1' },
      { a: 'A1', b: 'B2', c: 'C2' },
      { a: 'A1', b: 'B2', c: 'C3' },
      { a: 'A2', b: 'B1', c: 'C4' },
      { a: 'A2', b: 'B1', c: 'C5' },
      { a: 'A3', b: 'B1', c: 'C6' }
    ];

    it("groups one level", function () {
      expect(_.bucketize(list, 'a')).eql([
        { name: 'A1', children: [ { a: 'A1', b: 'B1', c: 'C1' }, { a: 'A1', b: 'B2', c: 'C2' }, { a: 'A1', b: 'B2', c: 'C3' } ]},
        { name: 'A2', children: [ { a: 'A2', b: 'B1', c: 'C4' }, { a: 'A2', b: 'B1', c: 'C5' } ] },
        { name: 'A3', children: [ { a: 'A3', b: 'B1', c: 'C6' } ] }
      ]);
    });

    it("groups multiple levels", function () {
      expect(_.bucketize(list, 'a', 'b')).eql([
        { name: 'A1', children: [ { name: 'B1', children: [{ a: 'A1', b: 'B1', c: 'C1' }] },
                                  { name: 'B2', children: [{ a: 'A1', b: 'B2', c: 'C2' }, { a: 'A1', b: 'B2', c: 'C3' }] }
        ]},
        { name: 'A2', children: [ {name: 'B1', children: [{ a: 'A2', b: 'B1', c: 'C4' }, { a: 'A2', b: 'B1', c: 'C5' } ] } ]},
        { name: 'A3', children: [ {name: 'B1', children: [{ a: 'A3', b: 'B1', c: 'C6' }]} ] }
      ]);
    });

    it("groups by options", function () {
      expect(_.bucketize(list, { by: 'a', as: 'something'})).eql([
        { name: 'A1', something: [ { a: 'A1', b: 'B1', c: 'C1' }, { a: 'A1', b: 'B2', c: 'C2' }, { a: 'A1', b: 'B2', c: 'C3' } ]},
        { name: 'A2', something: [ { a: 'A2', b: 'B1', c: 'C4' }, { a: 'A2', b: 'B1', c: 'C5' } ] },
        { name: 'A3', something: [ { a: 'A3', b: 'B1', c: 'C6' } ] }
      ]);
    });

  });

  describe('objectify', function () {
    it("creates an object from array setting each key to value passed in", function () {
      expect(_.objectify(['admin', 'foo', 'bar'], true)).eql({ admin: true, foo: true, bar: true });
    });
  });

});

