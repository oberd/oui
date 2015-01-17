/*global define */

define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var manifest = require('json!../../../assets/icomoon/selection.json');
  var Icon = Backbone.Model.extend({});
  var Icons = Backbone.Collection.extend({
    model: Icon,
    parse: function (d) {
      return _.pluck(d, 'properties');
    }
  });
  return new Icons(manifest.icons, { parse: true });
});
