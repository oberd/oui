/*global define */
define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var React = require('react.backbone');
  var List = require('jsx!Oui/List/List');

  var Users = Backbone.Collection.extend({});

  var users = new Users([{id:1, username: 'Hal Incandenza'}]);

  var Row = React.createBackboneClass({
    render: function () {
      return (
        <li>{this.getModel().get('username')}</li>
      );
    }
  });

  var BasicListExample = React.createClass({
    render: function () {
      return (
        <div>
          <List collection={users} row={Row} />
        </div>
      );
    }
  });
  return BasicListExample;
});
