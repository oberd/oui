/*global define */
define(function(require) {
    var React = require('react');
    var Icon = require('jsx!Oui/Icon/Icon');
    var Link = require('react-router').Link;
    var MenuItem = React.createClass({
        propTypes: {
            route: React.PropTypes.string,
            params: React.PropTypes.object,
            icon: React.PropTypes.oneOfType([
                React.PropTypes.element,
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            label: React.PropTypes.string,
            children: React.PropTypes.any
        },
        getDefaultProps: function() {
            return { icon: false };
        },
        render: function() {
            var iconHtml = <span/>;
            if (this.props.icon !== false) {
                iconHtml = typeof this.props.icon === 'string' ? <Icon name={this.props.icon} title={this.props.label} /> : this.props.icon;
            }
            var inner = this.props.label;
            if (!inner) {
                inner = this.props.children;
            }
            return (
                <li>
                    <Link className="oui-menu-item u-pointer" to={this.props.route} params={this.props.params}>
                        {iconHtml}
                        <span className="u-inline-block u-breathe-h u-font-size-menu">{inner}</span>
                    </Link>
                </li>
            );
        }
    });
    return MenuItem;
});
