/*global define */
define(function(require) {
    var React = require('react');
    var Icon = require('jsx!Oui/Icon/Icon');
    var HamburgerTime = React.createClass({
        propTypes: {
            expanded: React.PropTypes.bool
        },
        render: function() {
            var iconName = this.props.expanded ? 'arrow-left' : 'arrow-right';
            var title = this.props.expanded ? 'Collapse Sidebar' : 'Expand Sidebar';
            return <div className="hamburger-time u-font-size-icon-lg" {...this.props}><Icon name={iconName} title={title} /></div>;
        }
    });
    return HamburgerTime;
});
