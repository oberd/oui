/*globals define:false, describe, it */
define(function (require) {
  'use strict';
  var React = require('react.backbone');
  var Icon = require('jsx!Oui/Icon/Icon');
  var Helpers = require('jsx!../Helpers');

  describe('Component - Icon', function () {

    describe('dom structure', function () {

      it('should render with icomoon prefix class', function () {
        var ref = Helpers.renderIntoDocument(<Icon name="calendar" />);
        Helpers.expectMatch('.icomoon.icomoon-calendar', ref);
      });
    });
  });
});
