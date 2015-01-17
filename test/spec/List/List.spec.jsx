/*globals define:false, describe, it, expect, sinon */
define(function (require) {
  'use strict';
  var $ = require('jquery');
  var Backbone = require('backbone');
  var React = require('react.backbone');
  var List = require('jsx!Oui/List/List');
  var TestUtils = React.addons.TestUtils;

  var BasicCollection = Backbone.Collection.extend({ url: '/foos' });

  describe('Component - List', function () {

    describe('collection interface', function () {

      it('should require paginate function', function () {
        try {
          TestUtils.renderIntoDocument(<List />);
        } catch (e) {
          expect(e.toString())
            .to.eql('Oui Error [ ImproperUse ] List requires a collection property.  Please provide a Backbone compatible collection.');
        }
      });
    });

    describe('dom structure', function () {

      it('should render one .oui-list', expectDomCount(1, '.oui-list'));

      it('should render one .oui-list li', expectDomCount(1, '.oui-list li'));

      it('should allow customization of row via props', function () {

        var Row = React.createBackboneClass({
          render: function () {
            return <li className="my-row">{this.getModel().id}</li>;
          }
        });
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = TestUtils.renderIntoDocument(<List row={Row} collection={collection} />);
        expectDomCount(1, '.oui-list li.my-row', ref);
        collection.add({ id: 2 });
        expectDomCount(2, '.oui-list li.my-row', ref);
      });
    });

    describe('backbone collection event reactions', function () {

      it('should remove dom list node when model removed', function () {

        var collection = new BasicCollection([{ id: 1 }]);
        var ref = TestUtils.renderIntoDocument(<List collection={collection} />);
        expectDomCount(1, '.oui-list li', ref);
        collection.remove(collection.get(1));
        expectDomCount(0, '.oui-list li', ref);
      });

      it('should add dom list node when model added', function () {
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = TestUtils.renderIntoDocument(<List collection={collection} />);
        expectDomCount(1, '.oui-list li', ref);
        collection.add({ id: 2 });
        expectDomCount(2, '.oui-list li', ref);
      });
    });
    describe('loader functionality', function () {
      var CustomLoader = React.createClass({
        getDefaultProps: function () {
          return { on: false };
        },
        render: function () {
          var className = this.props.on ? 'loader on' : 'loader';
          return <div className={className}>Loading...</div>;
        }
      });
      it('loader should start in off state', function () {
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = TestUtils.renderIntoDocument(<List collection={collection} loader={CustomLoader} />);
        expectDomCount(1, '.loader', ref);
        expectDomCount(0, '.loader.on', ref);
      });
      it('loader should start be in on state during request', function () {
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = TestUtils.renderIntoDocument(<List collection={collection} loader={CustomLoader} />);
        var server = sinon.fakeServer.create();
        collection.fetch();
        expectDomCount(1, '.loader.on', ref);
        server.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([{ id: 1 }, { id: 2 }]));
        expectDomCount(1, '.loader', ref);
        expectDomCount(0, '.loader.on', ref);
      });
    });

    function expectDomCount(count, selector, ref) {
      return function () {
        if (!ref) {
          var collection = new BasicCollection([{ id: 1 }]);
          ref = TestUtils.renderIntoDocument(<List collection={collection} />);
        }
        expect($(ref.getDOMNode()).find(selector)).to.have.length(count);
      };
    }
  });
});
