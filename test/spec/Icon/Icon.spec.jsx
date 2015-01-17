/*globals define:false, describe, it, expect */
define(function (require) {
  'use strict';
  var $ = require('jquery');
  var React = require('react.backbone');
  var Icon = require('jsx!Oui/Icon/Icon');
  var TestUtils = React.addons.TestUtils;

  describe('Component - Icon', function () {

    describe('dom structure', function () {

      it('should render with icomoon prefix class', function () {
        var ref = TestUtils.renderIntoDocument(<Icon name="calendar" />);
        var $ref = $(ref.getDOMNode());
        expect($ref.is('.icomoon.icomoon-calendar')).to.eql(true);
      });
    });
  });
});
