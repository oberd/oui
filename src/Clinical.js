/*globals define:false */
define(function (require) {
  'use strict';

  var _ = require('underscore');

  function Clinical(options) {
    this.options = options || _.clone(this.defaults);
  }

  Clinical.prototype.defaults = {
    myOption: true
  };
  return Clinical;
});
