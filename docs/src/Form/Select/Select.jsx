/*global define */
define(function (require) {
  'use strict';
  var React = require('react.backbone');
  var Users = require('../../ExampleData/Users');
  var Select = require('jsx!Oui/Form/Select');

  var users = new Users();
  users.addRandom(5);
  var SelectExample = React.createClass({
    render: function () {
      return (
        <div>
          <Select placeholder="Select a user..." collection={users} labelAttribute="username" />
          <Select placeholder="Select a user..." value={users.at(3).id} collection={users} labelAttribute="username" />
        </div>
      );
    }
  });
  return SelectExample;
});
