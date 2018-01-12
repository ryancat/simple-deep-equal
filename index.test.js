/**
 * index.test.js
 * 
 * Add tests for the deep equal util function
 */

var assert = require('assert'),
    deepEqualUtil = require('./index');

describe('deepEqualUtil', function() {

  describe('primitive type', function () {
    it('should be able to compare number type values', function() {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(1, 1);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(0, 0);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(0, 1);
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(1, '1');
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(1, {});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });

    it('should be able to compare boolean type values', function() {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(true, false);
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(true, true);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(false, false);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(false, 'false');
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(false, {});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });

    it('should be able to compare string type values', function () {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage('abcd', 'abcd');
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage('abcd', 'efgh');
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage('abcd', true);
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage('abcd', {});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });

    it('should be able to compare undefined type values', function () {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(undefined, undefined);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(undefined, 'efgh');
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(undefined, {});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });

    it('should be able to compare null type values', function () {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(null, null);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(null, 'efgh');
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(null, {});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });
  });
  
  describe('array type', function () {
    it('should be able to compare array with primitive type values', function () {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage([], []);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        [1, 0, true, false, 'false', '0', '', 'abc', undefined, null], 
        [1, 0, true, false, 'false', '0', '', 'abc', undefined, null]);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage([1], [1, 2, 3]);
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });

    it('should be able to compare array with non primitive type values', function() {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage([{}], [{}]);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        [{}, [], {a: 123}, [false, ['false', ['0'], '', 'abc'], undefined, null]], 
        [{}, [], {a: 123}, [false, ['false', ['0'], '', 'abc'], undefined, null]]);
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        [{}, [], {a: 123}, [false, ['false', ['1'], '', 'abc'], undefined, null]], 
        [{}, [], {a: 123}, [false, ['false', ['0'], '', 'abc'], undefined, null]]);
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });
  });
  
  describe('object type', function () {
    it('should be able to compare flat object values', function () {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage({}, {});
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        {a: 123, b: true, c: 'abcd', e: undefined, f: null, g: NaN},
        {a: 123, b: true, c: 'abcd', e: undefined, f: null, g: NaN});
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        {a: 123, b: true, c: 'abcd', e: undefined, f: null, g: NaN},
        {a: 123, b: true, ccc: 'abcd', e: undefined, f: null, g: NaN});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        {a: 123, b: true, c: 'abcd', e: undefined, f: null, g: NaN},
        {a: 123, b: true, c: 'efgh', e: undefined, f: null, g: NaN});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });

    it('should be able to compare object with nested structure', function() {
      var deepEqualResult;

      deepEqualResult = deepEqualUtil.deepEqualWithMessage({a: {a: 123}}, {a: {a: 123}});
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        {a: 123, b: {bb: true, c: ['abcd', 'false'], e: undefined}, f: null, g: NaN},
        {a: 123, b: {bb: true, c: ['abcd', 'false'], e: undefined}, f: null, g: NaN});
      assert(deepEqualResult.isDeepEqual, deepEqualResult.message);

      deepEqualResult = deepEqualUtil.deepEqualWithMessage(
        {a: 123, b: {bb: true, c: ['abcd', 'false'], e: undefined}, f: null, g: NaN},
        {a: 123, b: {bb: true, c: ['abcd', 'true'], e: undefined}, f: null, g: NaN});
      assert(!deepEqualResult.isDeepEqual, deepEqualResult.message);
    });
  });
});