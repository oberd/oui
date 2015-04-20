/*global define */
define(function (require) {

  'use strict';
  var React = require('react.backbone');
  var Icon = require('jsx!Oui/Icon/Icon');
  var Icons = require('../ExampleData/Icons');
  var classnames = require('Oui/Utilities/classnames');

  var IconInfo = React.createBackboneClass({
    getInitialState: function () {
      return { expanded: false };
    },
    handleOver: function () {
      this.setState({ expanded: true });
    },
    handleOut: function () {
      this.setState({ expanded: false });
    },
    render: function () {
      var name = this.getModel().get('name');
      var classSet = classnames({ 'icon-info': true, 'expanded': this.state.expanded });
      var iconStyle = { color: this.state.expanded ? '#7AA8D9' : '#999999'}
      return (
        <div className="icon-example" onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
          <Icon style={iconStyle} name={name} />
          <div className={classSet}>{name}</div>
        </div>
      );
    }
  });

  var IconList = React.createBackboneClass({
    render: function () {
      return (
        <div className="icon-examples clearfix">
          {this.getCollection().map(function (icon) {
            return <IconInfo model={icon} key={icon.id} />;
          })}
        </div>
      );
    }
  });
  return React.createClass({
    render: function () {
      return <IconList collection={Icons} />;
    }
  });
});
