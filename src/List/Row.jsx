/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var Row = React.createBackboneClass({
    render: function () {
      return <li>Please customize this row component {this.getModel().id}</li>;
    }
  });
  return Row;
});
