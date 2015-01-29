/*global define */

define(function (require) {
  'use strict';

  var Validator = require('./AbstractValidator');

  function RegExValidator(regex, message) {
    Validator.apply(this);
    this.regex = regex;
    this.message = message || 'Invalid value';
  }

  RegExValidator.prototype = Object.create(Validator.prototype);

  RegExValidator.prototype.validate = function (value) {
    return value.match(this.regex);
  };

  return RegExValidator;
});
