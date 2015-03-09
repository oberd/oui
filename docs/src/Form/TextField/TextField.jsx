/*global define */
define(function (require) {
  'use strict';
  var React = require('react.backbone');
  var Icon = require('jsx!Oui/Icon/Icon');
  var TextField = require('jsx!Oui/Form/TextField');
  var Validator = require('Oui/Form/Validator');
  var RegExpValidator = require('Oui/Form/Validators/RegExp');

  var TextExample = React.createClass({
    getInitialState: function () {
      return { loading: true };
    },
    toggleLoading: function () {
      this.setState({ loading: !this.state.loading });
    },
    turnOff: function () {
      this.setState({ loading: false });
    },
    render: function () {
      var search = <Icon name="search" />;
      var user = <Icon name="user" />;
      var regex = new Validator();
      regex.addValidation(new RegExpValidator(/^[0-9]{5}$/, 'Please enter a valid 5 digit Zip Code'));
      return (
        <div>
          <h4>Styles</h4>
          <TextField label="Plain" />
          <TextField label="Example with Placeholder and Help" placeholder="Here is a placeholder" help="Please enter a value" />
          <TextField icon={search} placeholder="Search Me" />
          <TextField icon={user} placeholder="Large With Help Line" large help="Please enter a value" />
          <h4>Pattern Property</h4>
          <TextField placeholder="SSN" pattern="^\d{3}-\d{2}-\d{4}$" title="Please enter your SSN (e.g. 123-45-5678)" />
          <h4>Custom Validator Property</h4>
          <TextField placeholder="Zip Code" validator={regex} maxLength="5" />
        </div>
      );
    }
  });
  return TextExample;
});
