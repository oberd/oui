/*global define */
define(function (require) {
  'use strict';
  var React = require('react');

  var Router = require('react-router');
  var Link = Router.Link;

  var Icon = require('jsx!Oui/Icon/Icon');
  var MenuItem = React.createClass({
    getDefaultProps: function () {
        return { icon: 'inbox' };
    },
    render: function () {
      var icon = typeof this.props.icon === 'string' ? <Icon name={this.props.icon} title={this.props.label} /> : this.props.icon;
      var inner = this.props.label;
      if (!inner) {
        inner = this.props.children;
      }
      return (
        <li>
          <Link className="oui-menu-item u-pointer" to={this.props.route}>
            <span className="u-inline-block u-breathe-h u-font-size-icon-lg">{icon}</span>
            <span className="u-inline-block u-breathe-h u-font-size-menu">{inner}</span>
          </Link>
        </li>
      );
    }
  });
  return MenuItem;
});
