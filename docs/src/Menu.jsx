/*global define, window */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var React = require('react.backbone');

  var ExampleMenuItem = React.createClass({
    render: function () {
      var classes = React.addons.classSet({
        'active': this.props.active
      });
      return (
        <li role="presentation" className={classes} onClick={this.props.onClick} key={this.props.key}>
          <a>
            {this.props.name}
          </a>
        </li>
      );
    }
  });
  var ExamplesMenu = React.createClass({
    componentDidMount: function () {
      if (window.location.hash) {
        var val = window.location.hash.toString().replace('#','');
        var isFound = _.find(this.props.examples, function (ex) {
          return ex.name === val;
        });
        if (isFound) {
          this.props.onSelect(isFound);
        }
      }
    },
    handleExample: function (example) {
      var self = this;
      return function () {
        window.location.hash = '#' + example.name;
        if (self.props.onSelect) {
          self.props.onSelect(example);
        }
      };
    },
    render: function () {
      var self = this;
      return (
        <ul className="nav nav-pills nav-stacked">
        {_(this.props.examples).map(function (example) {
          var itemProps = {};
          itemProps.active = example.name === self.props.value;
          itemProps.name = example.name;
          return <ExampleMenuItem key={example.name} {...itemProps} onClick={self.handleExample(example)} />;
        })}
        </ul>
      );
    }
  });
  return ExamplesMenu;
});
