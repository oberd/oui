/*global define */
define(function (require) {
  'use strict';
  var React = require('react.backbone');
  var Loader = require('jsx!../../../src/Loader/Loader');
  var wasteland = require('mdown!../ExampleData/Lorem.md');

  var LoaderExample = React.createClass({
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
      var loadingOnOff = this.state.loading ? 'Off' : 'On';
      return (
        <div>
          <div className="u-relative">
            <Loader on={this.state.loading} />
            <div className="u-zBody" dangerouslySetInnerHTML={{__html: wasteland}}></div>
          </div>
          <div>
            <a onClick={this.toggleLoading} className="docs-button">Toggle {loadingOnOff}</a>
          </div>
        </div>
      );
    }
  });
  return LoaderExample;
});
