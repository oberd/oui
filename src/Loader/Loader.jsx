/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var Icon = require('jsx!Oui/Icon/Icon');
  var Loader = React.createClass({
    propTypes: {
      on: React.PropTypes.bool
    },
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
          <span className="oui-button-icon u-circle text-center">
            <span className="a-spin"><Icon name="refresh" /></span>
          </span>
        </div>
      );
    }
  });
  return Loader;
});
