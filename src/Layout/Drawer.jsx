/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var DrawerLayout = React.createClass({
    render: function () {
      var classes = React.addons.classSet({
        'oui-drawer-container': true,
        'expanded': this.props.expanded
      });
      return (
        <div className={classes}>{this.props.children}</div>
      );
    }
  });
  return DrawerLayout;
});
