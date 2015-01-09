/*globals define:false, describe, it, expect, sinon, beforeEach, afterEach, Pretender */
define(function (require) {
  'use strict';
  var $ = require('jquery');
  var Backbone = require('backbone');
  var React = require('react.backbone');
  var List = require('jsx!Oui/List/List');
  var TestUtils = React.addons.TestUtils;

  var BasicCollection = Backbone.Collection.extend({});

  describe('Component - List', function () {

    describe('collection interface', function () {

      it('should require paginate function', function () {

        var collection = new Backbone.Collection([{ id: 1 }]);
        try {
          TestUtils.renderIntoDocument(<List />);
        } catch (e) {
          expect(e.toString())
            .to.eql('Oui Error [ ImproperUse ] List requires a collection property.  Please provide a Backbone compatible collection.');
        }
      });
    });

    describe('dom structure', function () {

      function expectDomCount(count, selector, ref) {
        return function () {
          if (!ref) {
            var collection = new BasicCollection([{ id: 1 }]);
            ref = TestUtils.renderIntoDocument(<List collection={collection} />);
          }
          expect($(ref.getDOMNode()).find(selector)).to.have.length(count);
        };
      }

      it('should render one .oui-list', expectDomCount(1, '.oui-list'));
      it('should render one .oui-list li', expectDomCount(1, '.oui-list li'));
    });
  });
});
