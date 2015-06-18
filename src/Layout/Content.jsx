/*global define */
define(function(require) {
    var React = require('react');
    var Content = React.createClass({
        propTypes: {
            children: React.PropTypes.any
        },
        render: function() {
            return (
                <div className="oui-drawer-content t-1">{this.props.children}</div>
            );
        }
    });
    return Content;
});
