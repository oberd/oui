/*globals define:false, describe, it, expect */
define(function (require) {
  'use strict';
  var $ = require('jquery');
  var React = require('react.backbone');
  var Loader = require('jsx!Oui/Loader/Loader');
  var TestUtils = React.addons.TestUtils;

  describe('Component - Loader', function () {

    describe('dom structure', function () {

      it('should have .oui-loader class', function () {
        var ref = TestUtils.renderIntoDocument(<Loader on={true} />);
        var $ref = $(ref.getDOMNode());
        expect($ref.is('.oui-loader')).to.eql(true);
      });

      it('should have spinner inside', function () {
        var ref = TestUtils.renderIntoDocument(<Loader on={true} />);
        var $ref = $(ref.getDOMNode());
        expect($ref.find('.a-spin')).to.have.length(1);
      });
    });

    describe('"on" prop', function () {

      it('should have .on class when prop is true', function () {
        var ref = TestUtils.renderIntoDocument(<Loader on={true} />);
        var $ref = $(ref.getDOMNode());
        expect($ref.is('.on')).to.eql(true);
      });

      it('should have .off class when prop is false', function () {
        var ref = TestUtils.renderIntoDocument(<Loader on={false} />);
        var $ref = $(ref.getDOMNode());
        expect($ref.is('.off')).to.eql(true);
      });

      it('should not have .on class when prop is false', function () {
        var ref = TestUtils.renderIntoDocument(<Loader on={false} />);
        var $ref = $(ref.getDOMNode());
        expect($ref.is('.on')).to.eql(false);
      });

      it('should not have .off class when prop is false', function () {
        var ref = TestUtils.renderIntoDocument(<Loader on={true} />);
        var $ref = $(ref.getDOMNode());
        expect($ref.is('.off')).to.eql(false);
      });
    });
  });
});
