/*global define */
define(function (require) {
  'use strict';
  var React = require('react');
  var mq = require('oberd-media-query');
  var DrawerLayout = React.createClass({
    render: function () {
      var classes = React.addons.classSet({
        'oui-drawer-container': true,
        'expanded': this.props.expanded
      });
      return (
        <div className={classes}>{this.props.children}</div>
      );
    }
  });
  DrawerLayout.Expansion = {
    componentWillMount: function () {
      var notPhone = mq.getMatched().indexOf('tablet') >= 0;
      this.setState({ layoutExpanded: notPhone });
    },
    componentDidMount: function () {
      mq.on('unmatch:tablet', this.collapse);
      mq.on('match:desktop', this.expand);
    },
    componentWillUnmount: function () {
      mq.off('unmatch:tablet', this.collapse);
      mq.off('match:desktop', this.expand);
    },
    toggleLayoutExpansion: function () {
      this.setState({ layoutExpanded: !this.state.layoutExpanded });
    },
    collapse: function () {
      this.setState({ layoutExpanded: false });
    },
    expand: function () {
      this.setState({ layoutExpanded: true });
    }
  };
  return DrawerLayout;
});
