/*global define */
define(function(require) {
    var React = require('react');
    var Menu = React.createClass({
        propTypes: {
            children: React.PropTypes.any
        },
        render: function() {
            return (
                <ul className="u-list-style-none">{this.props.children}</ul>
            );
        }
    });
    return Menu;
});
