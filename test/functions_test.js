var _ = require('../lib/underscore-more');
var expect = require('chai').expect;

describe('underscore extensions', function () {

  describe('sequence', function () {
    function add1(n) {
      return n+1;
    }

    function multiply2(n) {
      return n*2;
    }

    function add2(n) {
      return n+2;
    }

    it('applies each function in the order specified', function () {
      var f = _.sequence(add1, multiply2, add2);
      expect(f(5)).eql(14);
    });

    it('can bind multiple arguments', function () {
      function a(one, two) {
        return one+two;
      }

      function b(val, two) {
        return val+'hi'+two;
      }

      var f = _.sequence(a, b);
      expect(f('one', 'two')).eql('onetwohitwo');
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

  describe('partialAny', function () {
    function cat(first, second, third) {
      return first + second + third;
    }

    it('can partially apply all but the first argument', function () {
      var appendBC = _.partialAny(cat, _, 'B', 'C');
      expect(appendBC('a')).eql('aBC');
    });

    it('can partially apply the middle argument', function () {
      var surroundWithAC = _.partialAny(cat, 'A', _, 'C');
      expect(surroundWithAC('b')).eql('AbC');
    });

    it('can leave multiple arguments unbound', function () {
      var insertB = _.partialAny(cat, _, 'B', _);
      expect(insertB('a', 'c')).eql('aBc');
    });

    it('acts as a passthru if no applied arguments', function () {
      var abc = _.partialAny(cat);
      expect(abc('A','B','C')).eql('ABC');
    });

    it('ok to bind all of the arguments', function () {
      expect(_.partialAny(cat, 'A','B','C')()).eql('ABC');
    });

    it('keeps the this context intact', function () {
      var obj = { name: 'Aaron' };
      var hi = function () { return 'hi: ' + this.name +' '+_.toArray(arguments).join(' '); };

      obj.say = _.partialAny(hi, _, 'do', 'you', 'say?');
      expect(obj.say('what')).eql('hi: Aaron what do you say?');
    });
  });

});

