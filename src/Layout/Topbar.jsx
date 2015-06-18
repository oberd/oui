/*global define */
define(function(require) {
    var React = require('react');
    var HamburgerTime = require('jsx!Oui/Layout/HamburgerTime');
    var Topbar = React.createClass({
        propTypes: {
            onMenuToggle: React.PropTypes.func,
            hamburger: React.PropTypes.bool,
            expanded: React.PropTypes.bool,
            children: React.PropTypes.any
        },
        getDefaultProps: function() {
            return { hamburger: false, onMenuToggle: function() {} };
        },
        onMenuToggle: function(e) {
            this.props.onMenuToggle(e);
        },
        render: function() {
            var hamburger = this.props.hamburger ? <HamburgerTime expanded={this.props.expanded} onClick={this.props.onMenuToggle} /> : <span/>;
            return (
                <div className="oui-topbar clearfix">
                    {hamburger}
                    {this.props.children}
                </div>
            );
        }
    });
    return Topbar;
});
