/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var LoadingMessage = React.createClass({
    getDefaultProps: function () {
      return { on: false };
    },
    render: function () {
      var classList = React.addons.classSet({
        'on': this.props.on,
        'oui-list-loader': true
      });
      return <div className={classList}>Loading...</div>;
    }
  });
  return LoadingMessage;
});
