/*global define */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var $ = require('jquery');
  var hljs = require('highlightjs');
  var React = require('react.backbone');
  var Router = require('react-router');
  var examples = require('./manifest');
  var byName = _.indexBy(examples, 'name');
  var classnames = require('Oui/Utilities/classnames');

  var defaultPage = {
    name: 'Oui!',
    content: require('mdown!../../README.md')
  };

  var ExampleRunner = React.createClass({
    mixins: [Router.State],
    getInitialState: function () {
      return { sourceExpanded: false };
    },
    toggleSource: function () {
      this.setState({ sourceExpanded: !this.state.sourceExpanded });
    },
    highlight: function () {
      $(this.getDOMNode()).find('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    },
    componentDidMount: function () {
      this.highlight();
    },
    componentDidUpdate: function () {
      this.highlight();
    },
    getPropertiesString: function (example) {
      return _.map(example.manifest.properties, function (prop) {
        return prop.required ? prop.name + '={' + prop.type + '}': '[' + prop.name + ']';
      }).join(' ');
    },
    renderComponentPaster: function (example) {
      return '<' + example.name + ' ' + this.getPropertiesString(example) + '/>';
    },
    render: function () {
      var name = this.getParams().name;
      var example = byName[name];
      if (!example) {
        return <div dangerouslySetInnerHTML={{__html: defaultPage.content}} />;
      }
      var sourceClasses = classnames({
        'example-source': true,
        'expanded': this.state.sourceExpanded
      });
      var sourceMessage = this.state.sourceExpanded ? 'Hide Source':'View Source';
      var Example = example.component;
      return (
        <div className="page-content component-page" key={example.name}>
          <h3>{example.name} Component</h3>
          <pre><code className="e4x">{this.renderComponentPaster(example)}</code></pre>
          <h4>Demo</h4>
          <div className="component-example">
            <a className="docs-button source-toggle" onClick={this.toggleSource}>{sourceMessage}</a>
            <div>
              <Example />
            </div>
          </div>
          <div className="component-docs">
            <div className={sourceClasses}>
              <pre><code className="e4x">{example.source}</code></pre>
            </div>
            <h4>Properties</h4>
            <table className="table table-striped">
              <thead>
                <tr><th>Name</th><th>Type</th><th>Description</th></tr>
              </thead>
              <tbody>
              {_.map(example.manifest.properties, function (p) {
                var req = classnames({
                  'required': p.required
                });
                var type = p.required ? p.type : '[' + p.type + ']';
                return (
                  <tr key={p.name} className={req}>
                    <td>{p.name}</td>
                    <td>{type}</td>
                    <td>{p.description}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <div className="component-content">
              <div dangerouslySetInnerHTML={{__html: example.content}} />
            </div>
          </div>
        </div>
      );
    }
  });
  return ExampleRunner;
});
