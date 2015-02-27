/*global define */
define(function (require) {
  'use strict';
  var ImproperUseError = require('Oui/Error/ImproperUse');
  var Backbone = require('backbone');
  var React = require('react.backbone');

  var counter = 0;

  var Select = React.createBackboneClass({
    propTypes: {
      collection: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
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
      onChange: React.PropTypes.func
    },
    componentWillMount: function () {
      this.props.inputId = 'oui_select_' + counter;
      if (typeof this.props.collection === 'undefined') {
        throw new ImproperUseError('Select requires a collection property.  Please provide a Backbone compatible collection.');
      }
      counter++;
    },
    getDefaultProps: function () {
      return { optionAttribute: 'label', onChange: function () {} };
    },
    getInitialState: function () {
      return { value: this.props.value };
    },
    getClassList: function () {
      return React.addons.classSet({
        'oui-form-control': true
      });
    },
    onSelect: function (e) {
      this.setState({ value: e.target.value });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.getCollection().get(e.target.value));
      }
    },
    renderOption: function (model) {
      var id = model.id;
      var data = model.toJSON();
      return (
        <option key={id} value={id}>
          {data[this.props.optionAttribute]}
        </option>
      );
    },
    renderOptions: function () {
      return this.getCollection().map(this.renderOption, this);
    },
    renderPlaceholder: function () {
      var placeProp = false;
      if (typeof this.props.placeholder !== 'undefined') {
        placeProp = this.props.placeholder;
      } else if (this.props.title) {
        placeProp = this.props.title + '...';
      }
      return placeProp ?
        <option>{placeProp}</option> : '';
    },
    renderLabel: function () {
      var label = '';
      var inputId = this.props.inputId;
      var labelProp = this.props.title || false;
      if (typeof this.props.label !== 'undefined') {
        labelProp = this.props.label;
      }
      if (labelProp){
        label = <label htmlFor={inputId}>{labelProp}</label>;
      }
      return label;
    },
    render: function () {
      var classList = this.getClassList();
      var options = this.renderOptions();
      var placeholderOption = this.renderPlaceholder();
      var label = this.renderLabel();
      return (
        <div className={classList}>
          {label}
          <select className="form-control" onChange={this.onSelect} value={this.state.value} name={this.props.inputId}>
            {placeholderOption}
            {options}
          </select>
        </div>
      );
    }
  });
  return Select;
});
