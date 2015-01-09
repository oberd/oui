/*global define */

define(function (require) {
  'use strict';
  function ImproperUse(message, url) {
    this.message = message;
    this.url = url;
  }
  ImproperUse.prototype.toString = function () {
    var err = 'Oui Error [ ImproperUse ] ' + this.message;
    if (this.url) {
       err += ' find out more at ' + this.url;
    }
    return err;
  }
  return ImproperUse;
});
