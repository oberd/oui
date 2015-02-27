/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var Menu = React.createClass({
    render: function () {
      return (
        <ul className="u-list-style-none">{this.props.children}</ul>
      );
    }
  });
  return Menu;
});
