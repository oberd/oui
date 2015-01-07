/*global define */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var React = require('react.backbone');
  var ExamplesMenu = require('jsx!./ExamplesMenu');
  var ExampleRunner = require('jsx!./ExampleRunner');

  var examples = [
    {
      name: 'Datalist Selector',
      module: 'jsx!clinical/Components/Select/Datalist/Main'
    }
  ];

  var Examples = React.createClass({
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
          <h4 className="text-center page-header">Clinical Component Suite</h4>
          <div className="row">
            <div className="col-s-3">
              <ExamplesMenu examples={this.props.examples} onSelect={this.handleExample} value={this.state.example.name} />
            </div>
            <div className="col-s-9">
              <ExampleRunner {...this.state.example} />
            </div>
          </div>
        </section>
      );
    }
  });
  React.render(<Examples />, document.getElementById('main'));
});
