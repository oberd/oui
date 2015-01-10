/*global define */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var packageInfo = require('text!../../bower.json');
  var React = require('react.backbone');
  var DocsMenu = require('jsx!./Menu');
  var ComponentPage = require('jsx!./ComponentPage');
  var examples = require('./manifest');

  packageInfo = JSON.parse(packageInfo);

  var Docs = React.createClass({
    getDefaultProps: function () {
      return { examples: examples }
    },
    getInitialState: function () {
      return { example: { name: null } };
    },
    handleExample: function (example) {
      this.setState({ example: example });
    },
    render: function () {
      return (
        <section>
          <h4 className="text-center page-header">
            <img src="oui.svg" width="250" />
            <div className="subtitle">Oberd User Interface Library <br/> v{packageInfo.version}</div>
          </h4>
          <div className="row">
            <div className="col-s-3">
              <DocsMenu examples={this.props.examples} onSelect={this.handleExample} value={this.state.example.name} />
            </div>
            <div className="col-s-9">
              <ComponentPage {...this.state.example} currentPage={this.state.example.component} />
            </div>
          </div>
        </section>
      );
    }
  });
  React.render(<Docs />, document.getElementById('main'));
  setTimeout(function () {
    document.getElementById('main').className = 'in';
  });
});
