/*global define */
define(function(require) {
    var _ = require('underscore');
    var React = require('react.backbone');
    var PropTypes = require('Oui/PropTypes');
    var Select = require('jsx!Oui/Shims/ReactSelect');
    var classnames = require('Oui/Utilities/classnames');
    var bb = React.BackboneMixin;
    var MultiSelect = React.createClass({
        mixins: [bb('collection')],
        propTypes: {
            collection: PropTypes.collection.isRequired,
            title: React.PropTypes.string.isRequired,
            placeholder: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            label: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.bool
            ]),
            optionAttribute: React.PropTypes.string,
            onChange: React.PropTypes.func,
            disabled: React.PropTypes.bool,
            value: React.PropTypes.array
        },
        getInitialState: function() {
            return { loading: true };
        },
        getDefaultProps: function() {
            return { optionAttribute: 'label', onChange: function() {}, disabled: false };
        },
        componentWillMount: function() {
            var self = this;
            this.props.collection.fetch().then(function() {
                self.setState({ loading: false });
            });
        },
        getOptions: function() {
            var props = this.props;
            return props.collection.map(function(model) {
                var modelData = model.toJSON();
                var label = modelData[props.optionAttribute] || model.id;
                return { value: model.id.toString(), label: label };
            });
        },
        renderLabel: function() {
            var label = '';
            var labelProp = this.props.title || false;
            if (typeof this.props.label !== 'undefined') {
                labelProp = this.props.label;
            }
            if (labelProp) {
                label = <label>{labelProp}</label>;
            }
            return label;
        },
        getClassList: function() {
            return classnames({
                'oui-form-control': true
            });
        },
        render: function() {
            var props = {
                multi: true,
                options: this.getOptions(),
                onChange: this.handleChange,
                value: _.compact(this.props.value)
            };
            if (typeof this.props.placeholder !== 'undefined') {
                props.placeholder = this.props.placeholder;
            } else if (this.props.title) {
                props.placeholder = this.props.title + '...';
            }
            var label = this.renderLabel();
            var classList = this.getClassList();
            var out;
            if (!this.state.loading) {
                if (props.options.length) {
                    out = (
                        <div className={classList}>
                            {label}
                            <Select {...props} />
                        </div>
                    );
                } else {
                    out = <span>No results found.</span>;
                }
            } else {
                out = <span>Loading...</span>;
            }
            return out;
        },
        handleChange: function(value) {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(value.split(','));
            }
        }
    });
    return MultiSelect;
});
