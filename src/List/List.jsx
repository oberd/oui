/*global define */

define(function (require) {
  'use strict';

  var _ = require('underscore');
  var React = require('react.backbone');
  var EmptyMessage = require('jsx!./EmptyMessage');
  var DefaultLoader = require('jsx!../Loader/Loader');
  var ImproperUseError = require('../Error/ImproperUse');

  var Row = React.createBackboneClass({
    render: function () {
      return <li>Please customize this row component {this.getModel().id}</li>;
    }
  });

  var List = React.createBackboneClass({
    getInitialState: function () {
      return { loading: false };
    },
    componentWillMount: function () {
      this.startLoadingBind = _.bind(this.startLoading, this);
      this.stopLoadingBind = _.bind(this.stopLoading, this);
      if (typeof this.props.collection === 'undefined') {
        throw new ImproperUseError('List requires a collection property.  Please provide a Backbone compatible collection.');
      }
    },
    bindLoading: function (onOrOff) {
      this.getCollection()[onOrOff]('request', this.startLoadingBind);
      this.getCollection()[onOrOff]('sync error', this.stopLoadingBind);
    },
    componentDidMount: function () {
      this.bindLoading('on');
    },
    componentWillUnmount: function () {
      this.bindLoading('off');
    },
    startLoading: function () {
      this.setState({ loading: true });
    },
    stopLoading: function () {
      this.setState({ loading: false });
    },
    getDefaultProps: function () {
      return { row: Row, empty: EmptyMessage, loader: DefaultLoader };
    },
    renderList: function () {
      var Row = this.props.row;
      return (
        <ul className="oui-list">
          {this.getCollection().map(function (m) {
            return <Row key={m.id} model={m} />;
          })}
        </ul>
      );
    },
    render: function () {
      var EmptyElement = this.props.empty;
      var Loader = this.props.loader;
      var listContent = this.getCollection().length ? this.renderList() : <EmptyElement />;
      return (
        <div className="oui-list-container">
          <Loader on={this.state.loading} />
          {listContent}
        </div>
      );
    }
  });

  return List;
});
