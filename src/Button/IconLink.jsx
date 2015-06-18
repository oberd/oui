/*global define */
define(function(require) {
    var _ = require('underscore');
    var React = require('react');
    var ResponsiveMixin = require('Oui/Mixins/Responsive');
    var Icon = require('jsx!Oui/Icon/Icon');
    var Link = React.createClass({
        mixins: [ResponsiveMixin],
        propTypes: {
            icon: React.PropTypes.string.isRequired,
            children: React.PropTypes.node,
            breakpoint: React.PropTypes.string
        },
        render: function() {
            var props = _.omit(this.props, 'icon', 'children', 'breakpoint');
            var icon = this.props.icon ? <Icon name={this.props.icon} /> : <span />;
            var anchor;
            if (this.props.icon) {
                anchor = this.state.isWide ? <a {...props}>{icon} {this.props.children}</a> : <a {...props}>{icon}</a>;
            } else {
                anchor = <a {...props}>{this.props.children}</a>;
            }
            return anchor;
        }
    });
    return Link;
});
