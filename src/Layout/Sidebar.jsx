/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var SideBar = React.createClass({
    render: function () {
      return (
        <nav className="oui-sidebar t-1">
          {this.props.children}
        </nav>
      );
    }
  });
  return SideBar;
});
