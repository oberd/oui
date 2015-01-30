/*globals define:false, describe, it, expect, sinon */
define(function (require) {
  'use strict';

  var Backbone = require('backbone');
  var React = require('react.backbone');
  var List = require('jsx!Oui/List/List');
  var Helpers = require('jsx!../Helpers');

  var BasicCollection = Backbone.Collection.extend({ url: '/foos' });

  describe('Component - List', function () {

    describe('collection interface', function () {

      it('should require paginate function', function () {
        try {
          Helpers.renderIntoDocument(<List />);
        } catch (e) {
          expect(e.toString())
            .to.eql('Oui Error [ ImproperUse ] List requires a collection property.  Please provide a Backbone compatible collection.');
        }
      });
    });

    describe('dom structure', function () {
      var Row = React.createBackboneClass({
        render: function () {
          return <li className="my-row">{this.getModel().id}</li>;
        }
      });
      function getRef() {
        var collection = new BasicCollection([{ id: 1}]);
        return Helpers.renderIntoDocument(<List row={Row} collection={collection} />);
      }

      it('should render one .oui-list', function () {
        Helpers.expectDOMCount(1, '.oui-list', getRef());
      });

      it('should render one .oui-list li', function () {
        Helpers.expectDOMCount(1, '.oui-list li', getRef());
      });

      it('should allow customization of row via props', function (done) {
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = Helpers.renderIntoDocument(<List row={Row} collection={collection} />);
        Helpers.expectDOMCount(1, '.oui-list li.my-row', ref);
        collection.add({ id: 2 });
        Helpers.expectDOMCountNextTick(2, '.oui-list li.my-row', ref, done);
      });
    });

    describe('backbone collection event reactions', function () {

      it('should remove dom list node when model removed', function (done) {

        var collection = new BasicCollection([{ id: 1 }]);
        var ref = Helpers.renderIntoDocument(<List collection={collection} />);
        Helpers.expectDOMCount(1, '.oui-list li', ref);
        collection.remove(collection.get(1));
        Helpers.expectDOMCountNextTick(0, '.oui-list li', ref, done);
      });

      it('should add dom list node when model added', function (done) {
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = Helpers.renderIntoDocument(<List collection={collection} />);
        Helpers.expectDOMCount(1, '.oui-list li', ref);
        collection.add({ id: 2 });
        Helpers.expectDOMCountNextTick(2, '.oui-list li', ref, done);
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
        var ref = Helpers.renderIntoDocument(<List collection={collection} loader={CustomLoader} />);
        Helpers.expectDOMCount(1, '.loader', ref);
        Helpers.expectDOMCount(0, '.loader.on', ref);
      });
      it('loader should start be in on state during request', function (done) {
        var collection = new BasicCollection([{ id: 1 }]);
        var ref = Helpers.renderIntoDocument(<List collection={collection} loader={CustomLoader} />);
        var server = sinon.fakeServer.create();
        collection.fetch();
        Helpers.expectDOMCount(1, '.loader.on', ref);
        server.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify([{ id: 1 }, { id: 2 }]));
        Helpers.expectDOMCountNextTick(1, '.loader', ref, done);
      });
    });
    describe('keyboard selection', function () {
      it('should set index to first item on down key', function () {
        var list = getListRef();
        pressDown(list);
        expect(list.state.currentIndex).to.eql(0);
      });
      it('should set index to second item on two down', function () {
        var list = getListRef();
        pressDown(list);
        pressDown(list);
        expect(list.state.currentIndex).to.eql(1);
      });
      it('should set index to last item on up', function () {
        var list = getListRef();
        pressUp(list);
        expect(list.state.currentIndex).to.eql(2);
      });
      it('should have mario bros style selection', function () {
        var list = getListRef();
        pressDown(list);
        pressDown(list);
        pressDown(list);
        pressDown(list); // Back to the beginning!
        expect(list.state.currentIndex).to.eql(0);
      });
      it('should fire onSelect if enter key pressed with existing index', function () {
        var spy = sinon.spy();
        var list = getListRef({ onSelect: spy });
        pressDown(list);
        pressEnter(list);
        expect(spy.callCount).to.eql(1);
      });
      it('should not fire onSelect if index not found', function () {
        var spy = sinon.spy();
        var list = getListRef({ onSelect: spy });
        pressEnter(list);
        expect(spy.callCount).to.eql(0);
      });
      it('should unset index if escape pressed', function () {
        var list = getListRef();
        pressDown(list);
        pressEsc(list);
        expect(list.state.currentIndex).to.eql(-1);
      });

      function pressDown(ref) {
        key(ref, 40);
      }
      function pressUp(ref) {
        key(ref, 38);
      }
      function pressEnter(ref) {
        key(ref, 13);
      }
      function pressEsc(ref) {
        key(ref, 27);
      }
      function key(ref, code) {
        React.addons.TestUtils.Simulate.keyUp(ref.getDOMNode(), { which: code });
      }
      function getListRef(extraProps) {
        var collection = new BasicCollection([{ id: 1}, {id: 2}, {id: 3}]);
        return Helpers.renderIntoDocument(<List collection={collection} {...extraProps}/>);
      }
    });
  });
});
