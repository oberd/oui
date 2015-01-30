/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var EmptyMessage = React.createClass({
    propTypes: {
      message: React.PropTypes.string
    },
    getDefaultProps: function () {
      return { message: 'No items found' };
    },
    render: function () {
      return <div>{this.props.message}</div>;
    }
  });
  return EmptyMessage;
});
