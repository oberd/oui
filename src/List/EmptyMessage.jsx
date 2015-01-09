/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var EmptyMessage = React.createClass({
    getDefaultProps: function () {
      return { message: 'No Records' };
    },
    render: function () {
      return <div></div>;
    }
  });
  return EmptyMessage;
});
