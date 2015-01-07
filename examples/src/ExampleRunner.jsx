/*global define */

define(function (require) {
  'use strict';

  var React = require('react.backbone');
  var ExampleRunner = React.createClass({
    render: function () {
      return (
        <h3>{this.props.name}</h3>
      );
    }
  });
  return ExampleRunner;
});
