/*global define */
define(function(require) {
    var React = require('react.backbone');

    var Icon = React.createClass({
        propTypes: {
            name: React.PropTypes.string
        },
        getDefaultProps: function() {
            return { name: 'user' };
        },
        render: function() {
            var className = 'icomoon icomoon-' + this.props.name;
            delete this.props.name;
            return <span {...this.props} className={className}></span>;
        }
    });
    return Icon;
});
