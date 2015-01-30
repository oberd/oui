/*global define */

define(function (require) {
  'use strict';

  var _ = require('underscore');
  var $ = require('jquery');
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
      return { loading: false, currentIndex: -1 };
    },
    getDefaultProps: function () {
      return {
        row: Row,
        empty: EmptyMessage,
        loader: DefaultLoader,
        onSelect: function () {}
      };
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
      var $contain = $(this.refs.container.getDOMNode());
      $contain[onOrOff]('keydown', function (e) {
        if (e.which === 38 || e.which === 40 || e.which === 13) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
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
    selectNext: function () {
      this.setState({
        currentIndex: this.clampIndex(this.state.currentIndex + 1)
      });
    },
    selectPrevious: function () {
      this.setState({
        currentIndex: this.clampIndex(this.state.currentIndex - 1)
      });
    },
    clampIndex: function (index) {
      var length = this.getCollection().length;
      if (index <= -1) {
        index = length - 1;
      }
      return index % length;
    },
    handleKeyDown: function (e) {
      if (e.which === 40) {
        this.selectNext();
      } else if (e.which === 38) {
        this.selectPrevious();
      } else if (e.which === 13) {
        var model = this.getCollection().at(this.state.currentIndex);
        if (model) {
          this.props.onSelect(model);
          this.setState({ currentIndex: -1 });
        }
      } else if (e.which === 27) {
        this.setState({ currentIndex: -1 });
      }
    },
    renderList: function () {
      var selected = this.state.currentIndex;
      var Row = this.props.row;
      return (
        <ul className="oui-list">
          {this.getCollection().map(function (m, index) {
            return <Row key={m.id} model={m} selected={selected === index} />;
          })}
        </ul>
      );
    },
    render: function () {
      var EmptyElement = this.props.empty;
      var Loader = this.props.loader;
      var listContent = this.getCollection().length ? this.renderList() : <EmptyElement />;
      return (
        <div ref="container" className="oui-list-container" tabIndex="0" onKeyUp={this.handleKeyDown}>
          <Loader on={this.state.loading} />
          {listContent}
        </div>
      );
    }
  });

  return List;
});
