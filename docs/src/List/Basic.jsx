/*global define */
define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var React = require('react.backbone');
  var List = require('jsx!Oui/List/List');
  var Users = require('../ExampleData/Users');

  var users = new Users();
  users.addRandom(2);

  var Row = React.createBackboneClass({
    render: function () {
      return <li>{this.getModel().get('username')}</li>;
    }
  });

  var BasicListExample = React.createClass({
    add: function () {
      users.addRandom();
    },
    remove: function () {
      users.removeRandom();
    },
    render: function () {
      return (
        <div>
          <List collection={users} row={Row} />
          <div>
            <a onClick={this.add} className="docs-button">Add</a>
            <a onClick={this.remove} className="docs-button">Remove</a>
          </div>
        </div>
      );
    }
  });
  return BasicListExample;
});
