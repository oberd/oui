/*global define:false, expect */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var $ = require('jquery');
  var React = require('react.backbone');

  var Helpers = _.extend(React.addons.TestUtils, {
    expectMatch: function (selector, ref) {
      return expect($(ref.getDOMNode()).is(selector)).to.eql(true);
    },
    expectNotMatch: function (selector, ref) {
      return expect($(ref.getDOMNode()).is(selector)).to.eql(false);
    },
    expectDOMCount: function (count, selector, ref) {
      return expect($(ref.getDOMNode()).find(selector)).to.have.length(count);
    },
    expectDOMCountNextTick: function (count, selector, ref, callback) {
      var args = arguments;
      setTimeout(function () {
        Helpers.expectDOMCount.apply(this, args);
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  });
  return Helpers;
});
