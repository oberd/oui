/*global define */
define(function(require) {
    var ImproperUseError = require('Oui/Error/ImproperUse');
    var React = require('react.backbone');
    var PropTypes = require('Oui/PropTypes');
    var classnames = require('Oui/Utilities/classnames');

    var counter = 0;

    var Select = React.createBackboneClass({
        propTypes: {
            collection: PropTypes.collection.isRequired,
            title: React.PropTypes.string,
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
            help: React.PropTypes.string,
            error: React.PropTypes.bool,
            className: React.PropTypes.string
        },
        componentWillMount: function() {
            this.inputId = 'oui_select_' + counter;
            if (typeof this.props.collection === 'undefined') {
                throw new ImproperUseError('Select requires a collection property.  Please provide a Backbone compatible collection.');
            }
            counter++;
        },
        componentWillReceiveProps: function(props) {
            if (props.value !== this.props.value) {
                this.setState({ value: props.value });
            }
        },
        getDefaultProps: function() {
            return { optionAttribute: 'label', onChange: function() {}, disabled: false };
        },
        getInitialState: function() {
            return { value: this.props.value };
        },
        getClassList: function() {
            return classnames({
                'oui-form-control': true,
                'error': this.props.error
            });
        },
        onSelect: function(e) {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.getCollection().get(e.target.value));
            }
        },
        renderOption: function(model) {
            var id = model.id;
            var data = model.toJSON();
            return (
                <option key={id} value={id}>
                    {data[this.props.optionAttribute]}
                </option>
            );
        },
        renderOptions: function() {
            return this.getCollection().map(this.renderOption, this);
        },
        renderPlaceholder: function() {
            var placeProp = false;
            if (typeof this.props.placeholder !== 'undefined') {
                placeProp = this.props.placeholder;
            } else if (this.props.title) {
                placeProp = this.props.title + '...';
            }
            return placeProp ? <option>{placeProp}</option> : '';
        },
        renderLabel: function() {
            var label = '';
            var inputId = this.inputId;
            var labelProp = this.props.title || false;
            if (typeof this.props.label !== 'undefined') {
                labelProp = this.props.label;
            }
            if (labelProp) {
                label = <label htmlFor={inputId}>{labelProp}</label>;
            }
            return label;
        },
        renderHelp: function() {
            var hasHelp = this.props.help && !!this.props.help.length;
            var help = this.props.help || '\u00a0';
            var classes = classnames({
                'help': true,
                't-1': true,
                'u-reset-translate': hasHelp,
                'u-translate-up': !hasHelp
            });
            return <label htmlFor={this.inputId} role="presentation" className={classes}>{help}</label>;
        },
        render: function() {
            var classList = this.getClassList();
            var options = this.renderOptions();
            var placeholderOption = this.renderPlaceholder();
            var label = this.renderLabel();
            var help = this.renderHelp();
            var className = this.props.className ? 'form-control ' + this.props.className : 'form-control';
            return (
                <div className={classList}>
                    {label}
                    <select className={className} onChange={this.onSelect} value={this.state.value} name={this.inputId} disabled={this.props.disabled}>
                        {placeholderOption}
                        {options}
                    </select>
                    {help}
                </div>
            );
        }
    });
    return Select;
});
