var Util = {
  _isArray: function (item) {
    return Object.prototype.toString.call(item) === '[object Array]'
  },

  _isObject: function (item) {
    return Object.prototype.toString.call(item) === '[object Object]'
  },

  _deepEqualLog: function (title, path, actual, expected) {
    title = title || '';
    path = path || [];
    return title + ' ' + path.join(" -> ") + ' | actual: ' + JSON.stringify(actual) + ', expected: ' + JSON.stringify(expected);
  },

  /**
   * Check the deep equal for primitive type values, array and objects.
   * The native assert.deepEqual doesn't work well for NaN case as well
   * as +0/-0 case. See https://github.com/substack/node-deep-equal for
   * more details
   */
  deepEqual: function (actual, expected, notEqualCallback, path) {
    // console.log('actual: ', actual, 'expected: ', expected);
    var iter;

    notEqualCallback = notEqualCallback || function () {};
    path = path || [];

    // Primitive type
    if (actual === expected) {
      return true;
    }

    // NaN
    if (Number.isNaN(actual) && Number.isNaN(expected)) {
      return true;
    } else if (Number.isNaN(actual) || Number.isNaN(expected)) {
      notEqualCallback(Util._deepEqualLog('[Value different]', path, actual, expected));
      return false;
    }

    // Array
    if (Util._isArray(actual) && Util._isArray(expected)) {
      iter = actual.length;
      if (iter !== expected.length) {
        notEqualCallback(Util._deepEqualLog('[Array with different length]', path, actual, expected));
        return false;
      }

      while (iter--) {
        if (!Util.deepEqual(actual[iter], expected[iter], notEqualCallback, path.concat('[' + iter + ']'))) {
          return false;
        }
      }

      return true;
    } else if (Util._isArray(actual) || Util._isArray(expected)) {
      notEqualCallback(Util._deepEqualLog('[Different type]', path, actual, expected));
      return false;
    }

    // Object
    if (Util._isObject(actual) && Util._isObject(expected)) {
      if (Object.keys(actual).length !== Object.keys(expected).length) {
        notEqualCallback(Util._deepEqualLog('[Object with different keys]', path, actual, expected));
        return false;
      }

      for (iter in actual) {
        if (actual.hasOwnProperty(iter)) {
          if (!Util.deepEqual(actual[iter], expected[iter], notEqualCallback, path.concat(iter))) {
            return false;
          }
        }
      }

      return true;
    } else if (Util._isObject(actual) || Util._isObject(expected)) {
      notEqualCallback(Util._deepEqualLog('[Different type]', path, actual, expected));
      return false;
    }

    // Default to false
    notEqualCallback(Util._deepEqualLog('[Value different]', path, actual, expected));
    return false;
  },

  /**
   * Compare and return both the deep equal results, as well as the not equal message
   */
  deepEqualWithMessage: function (actual, expected) {
    var notEqualMessages = [],
        isDeepEqual = Util.deepEqual(actual, expected, function () {
          notEqualMessages.push(Array.prototype.slice.call(arguments).join(''));
        });

    return {
      isDeepEqual: isDeepEqual,
      message: notEqualMessages.join('\n')
    };
  }
};

module.exports = Util;