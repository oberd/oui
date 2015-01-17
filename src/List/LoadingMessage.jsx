/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var Icon = require('jsx!../Icon/Icon');
  var LoadingMessage = React.createClass({
    getDefaultProps: function () {
      return { on: false };
    },
    render: function () {
      var classList = React.addons.classSet({
        'off': !this.props.on,
        'on': this.props.on,
        'oui-loader': true
      });
      return (
        <div className={classList}>
          <span className="oui-button-icon circle text-center"><Icon name="refresh" /></span>
        </div>
      );
    }
  });
  return LoadingMessage;
});
