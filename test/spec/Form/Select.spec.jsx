/*globals define:false, describe, it, expect, sinon */
define(function (require) {
  'use strict';
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
          collection: collection,
          placeholder: 'Select a thing'
        });
        Helpers.expectDOMCount(collection.length + 1, 'select option', ref);
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
});
