/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var EmptyMessage = React.createClass({
    getDefaultProps: function () {
      return { message: 'No items found' };
    },
    render: function () {
      return <div>{this.props.message}</div>;
    }
  });
  return EmptyMessage;
});
