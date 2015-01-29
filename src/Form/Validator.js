/*global define */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var AbstractValidator = require('./Validators/AbstractValidator');

  function Validator() {
    this._validations = [];
  }

  Validator.prototype.addValidations = function (/* validator, validator2, ... */) {
    var self = this;
    _.each(arguments, function (validator) {
      self.addValidation(validator);
    });
  };

  Validator.prototype.addValidation = function (validator) {
    this._validations.push(validator);
  };

  Validator.prototype.getValidationErrors = function (value) {
    var errs = [];
    if (this._validations.length) {
      errs = _.unique(_.compact(_.map(this._validations, function (validator) {
        return validator.getValidationError(value);
      })));
    }
    return errs;
  };

  Validator.prototype.hasValidations = function () {
    return this._validations.length > 0;
  };

  return Validator;
});
