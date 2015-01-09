/*global define */

define(function (require) {
  'use strict';

  var React = require('react.backbone');
  var EmptyMessage = require('jsx!./EmptyMessage');
  var LoadingMessage = require('jsx!./LoadingMessage');
  var ImproperUseError = require('../Error/ImproperUse');
  var Row = require('jsx!./Row');

  var List = React.createBackboneClass({
    componentWillMount: function () {
      if (typeof this.props.collection === 'undefined') {
        throw new ImproperUseError('List requires a collection property.  Please provide a Backbone compatible collection.');
        return;
      }
    },
    getDefaultProps: function () {
      return { row: Row };
    },
    render: function () {
      var Row = this.props.row;
      return (
        <div className="oui-list-container">
          <ul className="oui-list">
            {this.getCollection().map(function (m) {
              return <Row key={m.id} model={m} />
            })}
          </ul>
        </div>
      );
    }
  });

  return List;
});
