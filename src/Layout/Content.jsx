/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var Content = React.createClass({
    render: function () {
      return (
        <div className="oui-drawer-content t-1">{this.props.children}</div>
      );
    }
  });
  return Content;
});
