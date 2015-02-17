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

    it("groups by options and can specify name", function () {
      expect(_.bucketize(list, { by: 'a', as: 'something', name: 'a'})).eql([
        { a: 'A1', something: [ { a: 'A1', b: 'B1', c: 'C1' }, { a: 'A1', b: 'B2', c: 'C2' }, { a: 'A1', b: 'B2', c: 'C3' } ]},
        { a: 'A2', something: [ { a: 'A2', b: 'B1', c: 'C4' }, { a: 'A2', b: 'B1', c: 'C5' } ] },
        { a: 'A3', something: [ { a: 'A3', b: 'B1', c: 'C6' } ] }
      ]);
    });

  });

  describe('objectify', function () {
    it("creates an object from array setting each key to value passed in", function () {
      expect(_.objectify(['admin', 'foo', 'bar'], true)).eql({ admin: true, foo: true, bar: true });
    });
  });

  describe('chunk', function () {
    it("Breaks an array into chunks based on chunksize, and leaves leftovers", function () {
      expect(_.chunk([1,2,3,4,5,6,7,8,9], 4)).eql([[1,2,3,4],[5,6,7,8],[9]]);
    });

    it("Works for arrays equally divisible by chunk size", function () {
      expect(_.chunk([1,2,3,4,5,6,7,8,9], 3)).eql([[1,2,3],[4,5,6],[7,8,9]]);
    });

    it("Works for chunk size of 1", function () {
      expect(_.chunk([1,2,3,4,5,6,7,8,9], 1)).eql([[1],[2],[3],[4],[5],[6],[7],[8],[9]]);
    });

    it("Just returns original array if chunk size is 0", function () {
      expect(_.chunk([1,2,3,4,5,6,7,8,9], 0)).eql([1,2,3,4,5,6,7,8,9]);
    });

    it("Gives back an array within an array if initial is smaller than chunksize", function () {
      expect(_.chunk([1,2,3,4,5,6,7,8,9], 10)).eql([[1,2,3,4,5,6,7,8,9]]);
    });

    it("Gives back an array within an array if initial is same as chunksize", function () {
      expect(_.chunk([1,2,3,4,5,6,7,8,9], 9)).eql([[1,2,3,4,5,6,7,8,9]]);
    });

    it("fine with empty array", function () {
      expect(_.chunk([], 9)).eql([]);
    });
  });

});

