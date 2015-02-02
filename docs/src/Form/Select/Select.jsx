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
          <Select title="Select a user" collection={users} optionAttribute="username" />
          <Select value={users.at(3).id} collection={users} optionAttribute="username" />
        </div>
      );
    }
  });
  return SelectExample;
});
