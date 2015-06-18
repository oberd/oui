/*global define */
define(function(require) {
    var React = require('react');
    var SideBar = React.createClass({
        propTypes: {
            children: React.PropTypes.any
        },
        render: function() {
            return (
                <nav className="oui-sidebar t-1">
                    {this.props.children}
                </nav>
            );
        }
    });
    return SideBar;
});
