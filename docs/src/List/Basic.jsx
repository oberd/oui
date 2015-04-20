/*global define */
define(function (require) {
  'use strict';
  var React = require('react.backbone');
  var List = require('jsx!Oui/List/List');
  var Users = require('../ExampleData/Users');
  var classnames = require('Oui/Utilities/classnames');

  var users = new Users();
  users.addRandom(2);

  var Row = React.createBackboneClass({
    render: function () {
      var cls = classnames({
        'list-item': true,
        'selected' : this.props.selected
      });
      return <li className={cls}>{this.getModel().get('username')}</li>;
    }
  });

  var BasicListExample = React.createClass({
    getInitialState: function () {
      return { selectedUser: false };
    },
    add: function () {
      users.addRandom();
    },
    remove: function () {
      users.removeRandom();
    },
    fetch: function () {
      users.fakeFetch();
    },
    handleListSelect: function (u) {
      var self = this;
      if (this.to) {
        clearTimeout(this.to);
      }
      this.setState({ selectedUser: 'Selected: ' + u.get('username') });
      this.to = setTimeout(function () {
        self.setState({ selectedUser: false });
      }, 500);
    },
    render: function () {
      return (
        <div className="list-example">
          <List collection={users} row={Row} onSelect={this.handleListSelect} />
          <div>
            <a onClick={this.add} className="docs-button">Add</a>
            <a onClick={this.remove} className="docs-button">Remove</a>
            <a onClick={this.fetch} className="docs-button">Simulate Fetch</a>
            {this.state.selectedUser}
          </div>
        </div>
      );
    }
  });
  return BasicListExample;
});
