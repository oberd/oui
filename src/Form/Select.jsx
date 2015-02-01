/*global define */
define(function (require) {
  'use strict';
  var ImproperUseError = require('Oui/Error/ImproperUse');
  var Backbone = require('backbone');
  var React = require('react.backbone');

  var Select = React.createBackboneClass({
    propTypes: {
      collection: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },
    componentWillMount: function () {
      if (typeof this.props.collection === 'undefined') {
        throw new ImproperUseError('Select requires a collection property.  Please provide a Backbone compatible collection.');
      }
    },
    getDefaultProps: function () {
      return { labelAttribute: 'label', placeholder: false };
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
    },
    renderOption: function (model) {
      var id = model.id;
      var data = model.toJSON();
      return (
        <option key={id} value={id}>
          {data[this.props.labelAttribute]}
        </option>
      );
    },
    renderOptions: function () {
      return this.getCollection().map(this.renderOption, this);
    },
    render: function () {
      var classList = this.getClassList();
      var options = this.renderOptions();
      var placeholderOption = this.props.placeholder ?
        <option>{this.props.placeholder}</option> : '';
      return (
        <div className={classList}>
          <select onChange={this.onSelect} value={this.state.value}>
            {placeholderOption}
            {options}
          </select>
        </div>
      );
    }
  });
  return Select;
});
