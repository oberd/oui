/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var Icon = require('jsx!Oui/Icon/Icon');
  var HamburgerTime = React.createClass({
    render: function () {
      var iconName = this.props.expanded ? 'arrow-left' : 'arrow-right';
      var title = this.props.expanded ? 'Collapse Sidebar' : 'Expand Sidebar';
      return <div className="hamburger-time u-font-size-icon-lg" {...this.props}><Icon name={iconName} title={title} /></div>;
    }
  });
  var Topbar = React.createClass({
    getDefaultProps: function () {
      return { hamburger: false, onMenuToggle: function () {} };
    },
    onMenuToggle: function (e) {
      this.props.onMenuToggle(e);
    },
    render: function () {
      var hamburger = this.props.hamburger ? <HamburgerTime expanded={this.props.expanded} onClick={this.props.onMenuToggle} /> : <span/>;
      return (
        <div className="oui-topbar clearfix">
          {hamburger}
          {this.props.children}
        </div>
      );
    }
  });
  return Topbar;
});
