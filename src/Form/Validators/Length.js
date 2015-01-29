/*global define */

define(function (require) {
  'use strict';

  var Validator = require('./AbstractValidator');

  function Length(minLength, maxLength) {
    Validator.apply(this);
    this.message = 'Invalid length';
    this.min = minLength;
    this.max = maxLength;
  }

  Length.prototype = Object.create(Validator.prototype);

  Length.prototype.validate = function (value) {
    var isValid = value.length > this.min;
    if (typeof this.max !== 'undefined') {
      isValid = value.length < this.max;
    }
    return isValid;
  };

  return Length;
});
