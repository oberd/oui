/*global define */
define(function(require) {
    var _ = require('underscore');
    var React = require('react');
    var ResponsiveMixin = require('Oui/Mixins/Responsive');
    var Icon = require('jsx!Oui/Icon/Icon');
    var IconButton = React.createClass({
        mixins: [ResponsiveMixin],
        propTypes: {
            icon: React.PropTypes.string.isRequired,
            children: React.PropTypes.node,
            breakpoint: React.PropTypes.string
        },
        render: function() {
            var props = _.omit(this.props, 'icon', 'children', 'breakpoint');
            props.className = [props.className || '', 'oui-button'].join(' ');
            var icon = this.props.icon ? <Icon name={this.props.icon} /> : <span />;
            var btn;
            if (this.props.icon) {
                btn = this.state.isWide ? <button {...props}>{icon} {this.props.children}</button> : <button {...props}>{icon}</button>;
            } else {
                btn = <button {...props}>{this.props.children}</button>;
            }
            return btn;
        }
    });
    return IconButton;
});
