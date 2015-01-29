/*global define */

define(function (require) {
  'use strict';
  function InterfaceError(message, url) {
    this.message = message;
  }
  InterfaceError.prototype.toString = function () {
    return 'Oui Error [ InterfaceError ] ' + this.message;
  }
  return InterfaceError;
});
