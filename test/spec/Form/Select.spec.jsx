/*globals define:false, describe, it, expect, sinon */
define(function (require) {
  'use strict';
  var $ = require('jquery');
  var Backbone = require('backbone');
  var React = require('react.backbone');

  var Select = require('jsx!Oui/Form/Select');
  var Helpers = require('jsx!../Helpers');

  var BasicCollection = Backbone.Collection.extend({ url: '/foos' });

  describe('Component - Select', function () {

    describe('collection interface', function () {

      it('should require collection', function () {
        var warn = sinon.stub(console, 'warn');
        try {
          Helpers.renderIntoDocument(<Select />);
        } catch (e) {
          expect(warn.calledOnce).to.eql(true);
          expect(e.toString())
            .to.eql('Oui Error [ ImproperUse ] Select requires a collection property.  Please provide a Backbone compatible collection.');
        }
        console.warn.restore();
      });
    });

    describe('dom representation', function () {
      it('should be of class .oui-form-control', function () {
        Helpers.expectMatch('.oui-form-control', getRef());
      });
      it('should contain one select element', function () {
        Helpers.expectDOMCount(1, 'select', getRef());
      });
      it('should build one option per model', function () {
        var collection = getCollection();
        Helpers.expectDOMCount(collection.length, 'select option', getRef(collection));
      });
      it('should set inital value based on property', function () {
        var collection = getCollection();
        var selected = collection.at(1).id;
        var ref = getRef({
          collection: collection,
          value: selected
        });
        expect(ref.state.value).to.eql(selected);
      });
      it('should add initial option if placeholder prop', function () {
        var collection = getCollection();
        var ref = getRef({
          placeholder: 'Select a thing',
          collection: collection
        });
        var $option = $(ref.getDOMNode()).find('option').first();
        Helpers.expectDOMCount(collection.length + 1, 'select option', ref);
        expect($option.text()).to.eql('Select a thing');
      });

      it('should add initial option if title attribute', function () {
        var collection = getCollection();
        var ref = getRef({
          title: 'Select a thing',
          collection: collection
        });
        Helpers.expectDOMCount(collection.length + 1, 'select option', ref);
        var $option = $(ref.getDOMNode()).find('option').first();
        expect($option.text()).to.eql('Select a thing...');
      });
      it('should not add initial option if placeholder false', function () {
        var collection = getCollection();
        var ref = getRef({
          title: 'Select a thing',
          placeholder: false,
          collection: collection
        });
        Helpers.expectDOMCount(collection.length, 'select option', ref);
      });
      it('should prepend label element if label prop defined', function () {
        var ref = getRef({
          label: 'User'
        });
        Helpers.expectDOMCount(2, 'label', ref);
        var $option = $(ref.getDOMNode()).find('label').first();
        expect($option.text()).to.eql('User');
      });
      it('should prepend label element if title prop defined', function () {
        var ref = getRef({
          title: 'User'
        });
        Helpers.expectDOMCount(2, 'label', ref);
        var $option = $(ref.getDOMNode()).find('label').first();
        expect($option.text()).to.eql('User');
      });
      it('should not prepend label element if title prop defined and label false', function () {
        var ref = getRef({
          title: 'User',
          label: false
        });
        Helpers.expectDOMCount(1, 'label', ref);
      });
      it('should use optionAttribute for option text', function () {
        var collection = getCollection([{ id: 1, name: 'Test' }]);
        var ref = getRef({
          collection: collection,
          optionAttribute: 'name'
        });
        var $option = $(ref.getDOMNode()).find('option').first();
        expect($option.text()).to.eql('Test');
      });
    });
    describe('events', function () {
      it('should call onChange prop with model', function () {
        var m = new Backbone.Model({ id: 2, label: 'Hey' });
        var collection = getCollection([m]);
        var spy = sinon.spy();
        var ref = getRef({
          collection: collection,
          onChange: spy
        });
        var $select = $(ref.getDOMNode()).find('select').first().get(0);
        React.addons.TestUtils.Simulate.change($select, {target: {value: 2}});
        expect(spy.calledOnce).to.eql(true);
        expect(spy.calledWith(m)).to.eql(true);
      });
    });
    function getCollection(models) {
      models = models || [{ id: 1, label: 'Option 1'}, { id: 2, label: 'Option 2'}];
      return new BasicCollection(models);
    }
    function getRef(props) {
      props = props || {};
      props.collection = props.collection || getCollection();
      return Helpers.renderIntoDocument(<Select {...props} />);
    }
  });
});
