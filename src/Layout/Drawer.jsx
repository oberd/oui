/*global define */
define(function(require) {
    var React = require('react');
    var mq = require('oberd-media-query');
    var classnames = require('Oui/Utilities/classnames');
    var DrawerLayout = React.createClass({
        propTypes: {
            expanded: React.PropTypes.bool,
            children: React.PropTypes.any
        },
        render: function() {
            var classes = classnames({
                'oui-drawer-container': true,
                'expanded': this.props.expanded
            });
            return (
                <div className={classes}>{this.props.children}</div>
            );
        }
    });
    DrawerLayout.Expansion = {
        componentWillMount: function() {
            var notPhone = mq.getMatched().indexOf('tablet') >= 0;
            this.setState({ layoutExpanded: notPhone });
        },
        componentDidMount: function() {
            mq.on('unmatch:tablet', this.collapse);
            mq.on('match:desktop', this.expand);
        },
        componentWillUnmount: function() {
            mq.off('unmatch:tablet', this.collapse);
            mq.off('match:desktop', this.expand);
        },
        toggleLayoutExpansion: function() {
            this.setState({ layoutExpanded: !this.state.layoutExpanded });
        },
        collapse: function() {
            this.setState({ layoutExpanded: false });
        },
        expand: function() {
            this.setState({ layoutExpanded: true });
        }
    };
    return DrawerLayout;
});
