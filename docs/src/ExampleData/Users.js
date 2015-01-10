/*global define */

define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var Chance = require('chance');


  var chance = new Chance();
  var autoinc = 1;


  var Users = Backbone.Collection.extend({
    addRandom: function (count) {
      count = count || 1;
      for (var i = 0; i < count; i++) {
        this.add({ id: autoinc, username: chance.name() });
        autoinc++;
      }
    },
    removeRandom: function () {
      this.remove(this.sample());
    }
  });
  return Users;
});