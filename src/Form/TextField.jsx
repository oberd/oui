/*global define */
define(function (require) {
  'use strict';

  var _ = require('underscore');
  var React = require('react');

  var Validator = require('./Validator');
  var RegExpValidator = require('./Validators/RegExp');

  var counter = 0;

  var TextInput = React.createClass({
    propTypes: {
      icon: React.PropTypes.node,
      validator: React.PropTypes.instanceOf(Validator),
      pattern: React.PropTypes.string,
      onChange: React.PropTypes.func,
      title: React.PropTypes.node
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.validator) {
        this._validator = nextProps.validator;
      }
      this.receivePattern(nextProps.pattern);
    },
    componentWillMount: function () {
      this.props.inputId = 'oui_textfield_' + counter;
      if (!this._validator) {
        this._validator = this.props.validator || new Validator();
      }
      this.receivePattern(this.props.pattern);
      counter++;
    },
    getDefaultProps: function () {
      return {
        onChange: function () { },
        value: ''
      };
    },
    getInitialState: function () {
      return {
        focused: false,
        value: this.props.value,
        hasFocused: false
      };
    },
    receivePattern: function (pattern) {
      if (_.isString(pattern) && pattern !== this._pattern) {
        this._validator.addValidation(
          new RegExpValidator(
            new RegExp(pattern), this.props.title
          )
        );
        this._pattern = pattern;
        this.forceUpdate();
      }
    },
    handleFocus: function () {
      this.setState({ 'focused': true });
    },
    handleBlur: function () {
      this.setState({ 'focused': false, hasFocused: this.state.value.length > 0 });
    },
    handleChange: function (event) {
      var newValue = event.target.value;
      var validationErrors = this._validator.getValidationErrors(newValue);
      this.setState({
        value: newValue
      });
      if (!validationErrors.length && typeof this.props.onChange === 'function') {
        this.props.onChange(newValue);
      }
    },
    handlePlaceholderClick: function () {
      this.setState({ focused: true });
      this.refs.textInput.getDOMNode().focus();
    },
    renderPlaceholder: function () {
      var above = this.state.value.length > 0;
      var classes = React.addons.classSet({
        'placeholder': true,
        't-1': true,
        'u-reset-translate': !above,
        'u-translate-up': above
      });
      return <label htmlFor={this.props.inputId} className={classes} onClick={this.handlePlaceholderClick}>{this.props.placeholder}</label>;
    },
    renderHelp: function (isErrored, errorText) {
      var errors = '';
      var help = this.props.help || '\u00a0';
      var classes = React.addons.classSet({
        'help': true,
        't-1': true,
        'u-reset-translate': this.state.focused,
        'u-translate-up': !this.state.focused && !isErrored
      });
      if (isErrored) {
        errors = <span className="errors">{errorText}</span>;
      }
      return <label htmlFor={this.props.inputId} role="presentation" className={classes}>{help}{errors}</label>;
    },
    render: function () {
      var place = this.props.placeholder ? this.renderPlaceholder() : '';
      var validationErrors = this._validator.getValidationErrors(this.state.value);
      var isValid = validationErrors.length === 0;
      var isEmpty = this.state.value.length === 0;
      var hasHelpLine = this.props.help || this._validator.hasValidations();
      var isErrored = !isValid && this.state.hasFocused && !isEmpty;
      var errorText = isErrored ? validationErrors.join(', ') : '';
      var helpLine = hasHelpLine ? this.renderHelp(isErrored, errorText) : '';
      var classes = React.addons.classSet({
        'oui-form-control': true,
        'oui-text': true,
        'focused': this.state.focused,
        'has-icon': !!this.props.icon,
        'empty': isEmpty,
        'not-empty': !isEmpty,
        'complete': !isEmpty && isValid,
        'large': this.props.large,
        'error': isErrored,
        'has-help': hasHelpLine
      });
      var inputProps = {
        'onKeyDown': this.handleKeyDown,
        'onChange': this.handleChange,
        'onFocus': this.handleFocus,
        'onBlur': this.handleBlur,
        'value': this.state.value,
        'maxLength': this.props.maxLength || 524288
      };
      var icon = this.props.icon || '';
      return (
        <div className={classes}>
          {place}
          {icon}
          <div>
            <input aria-describedby={this.props.help} id={this.props.inputId} ref="textInput" type="text" className="t-1" {...inputProps} />
          </div>
          {helpLine}
        </div>
      );
    }
  });
  return TextInput;
});