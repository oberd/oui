/*globals define:false, describe, it, expect, sinon */
define(function (require) {
  'use strict';
  var $ = require('jquery');
  var React = require('react.backbone');
  var Validator = require('Oui/Form/Validator');
  var Length = require('Oui/Form/Validators/Length');
  var Helpers = require('jsx!../Helpers');
  var Icon = require('jsx!Oui/Icon/Icon');
  var Text = require('jsx!Oui/Form/TextField');

  describe('Component - Text', function () {

    it('should contain input of type text', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      Helpers.expectDOMCount(1, 'input[type="text"]', ref);
    });

    it('should be of oui-form-control class', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      Helpers.expectMatch('.oui-form-control', ref);
    });

    it('should not include placeholder if prop empty', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      Helpers.expectDOMCount(0, 'input[placeholder]', ref);
    });

    it('should include placeholder if prop defined', function () {

      var ref = Helpers.renderIntoDocument(<Text placeholder="Test" />);
      Helpers.expectDOMCount(1, 'input[placeholder]', ref);
    });

    it('should not include label if prop empty', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      Helpers.expectDOMCount(0, 'label', ref);
    });

    it('should include label if prop defined', function () {

      var ref = Helpers.renderIntoDocument(<Text label="Test" />);
      Helpers.expectDOMCount(1, 'label', ref);
    });

    it('should not include help line if prop empty, and no validators', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      Helpers.expectDOMCount(0, '.help', ref);
    });

    it('should include help line if prop defined', function () {

      var ref = Helpers.renderIntoDocument(<Text help="Test" />);
      Helpers.expectDOMCount(1, '.help', ref);
    });

    it('should set initial value based on prop', function () {

      var ref = Helpers.renderIntoDocument(<Text value="Foobar" />);
      var $input = $(ref.getDOMNode()).find('input');
      expect($input.val()).to.eql('Foobar');
    });

    it('should fire onChange event with value', function () {

      var spy = sinon.spy();
      var ref = Helpers.renderIntoDocument(<Text onChange={spy} />);
      var $input = $(ref.getDOMNode()).find('input').get(0);
      React.addons.TestUtils.Simulate.change($input, {target: {value: 'Hello, world'}});
      expect(spy.called).to.eql(true);
      expect(spy.calledWith('Hello, world')).to.eql(true);
    });

    it('should add .focused class if input element focused', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      var $input = $(ref.getDOMNode()).find('input').get(0);
      Helpers.expectNotMatch('.focused', ref);
      React.addons.TestUtils.Simulate.focus($input, {target: { value: 'Hello, world' }});
      Helpers.expectMatch('.focused', ref);
    });

    it('should not have .complete class if input element is empty', function () {

      var ref = Helpers.renderIntoDocument(<Text value="" />);
      Helpers.expectNotMatch('.complete', ref);
    });

    it('should have .complete class if input element is not empty', function () {

      var ref = Helpers.renderIntoDocument(<Text value="Hi" />);
      Helpers.expectMatch('.complete', ref);
    });

    it('should have .complete class if text entered (without validators)', function () {

      var ref = Helpers.renderIntoDocument(<Text />);
      var $input = $(ref.getDOMNode()).find('input').get(0);
      Helpers.expectNotMatch('.complete', ref);
      React.addons.TestUtils.Simulate.change($input, {target: { value: 'Hello, world' }});
      Helpers.expectMatch('.complete', ref);
    });

    it('should have .complete class if text entered (with validators)', function () {

      var ref = Helpers.renderIntoDocument(<Text pattern="[0-9]"/>);
      var $input = $(ref.getDOMNode()).find('input').get(0);
      Helpers.expectNotMatch('.complete', ref);
      React.addons.TestUtils.Simulate.change($input, {target: { value: '123' }});
      Helpers.expectMatch('.complete', ref);
    });

    it('should not have .complete class if invalid value', function () {

      var ref = Helpers.renderIntoDocument(<Text pattern="[a]" value="b" />);
      Helpers.expectNotMatch('.complete', ref);
    });

    it('should be .has-icon if icon specified', function () {
      var icon = <Icon name="search" />;
      var ref = Helpers.renderIntoDocument(<Text icon={icon} />);
      Helpers.expectMatch('.has-icon', ref);
    });

    it('should be .has-help if help specified', function () {
      var ref = Helpers.renderIntoDocument(<Text help="Do it" />);
      Helpers.expectMatch('.has-help', ref);
    });

    it('should not be .has-help if help not specified', function () {
      var ref = Helpers.renderIntoDocument(<Text />);
      Helpers.expectNotMatch('.has-help', ref);
    });

    it('should not error out until blur', function () {
      var validator = new Validator();
      validator.addValidation(new Length(1, 3));
      var ref = Helpers.renderIntoDocument(<Text validator={validator} />);
      var $input = $(ref.getDOMNode()).find('input').get(0);
      React.addons.TestUtils.Simulate.change($input, {target: { value: '1234' }});
      Helpers.expectNotMatch('.error', ref);
      React.addons.TestUtils.Simulate.blur($input);
      Helpers.expectMatch('.error', ref);
    });

  });
});
