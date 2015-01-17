/*global define */

define(function (require) {
  'use strict';
  var _ = require('underscore');
  var $ = require('jquery');
  var hljs = require('highlightjs');
  var React = require('react.backbone');
  var ExampleRunner = React.createClass({
    getInitialState: function () {
      return {
        sourceExpanded: false
      };
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
    getPropertiesString: function () {
      return _.map(this.props.manifest.properties, function (prop) {
        return prop.required ? prop.name + '={' + prop.type + '}': '[' + prop.name + ']';
      }).join(' ');
    },
    renderComponentPaster: function () {
      return '<' + this.props.name + ' ' + this.getPropertiesString() + '/>';
    },
    render: function () {
      if (!this.props.name) {
        return <div></div>;
      }
      var sourceClasses = React.addons.classSet({
        'example-source': true,
        'expanded': this.state.sourceExpanded
      });
      var sourceMessage = this.state.sourceExpanded ? 'Hide Source':'View Source';
      var Example = this.props.component;
      return (
        <div className="page-content component-page" key={this.props.name}>
          <h3>{this.props.name} Component</h3>
          <pre><code className="e4x">{this.renderComponentPaster()}</code></pre>
          <h4>Demo</h4>
          <div className="component-example">
            <a className="docs-button source-toggle" onClick={this.toggleSource}>{sourceMessage}</a>
            <div>
              <Example />
            </div>
          </div>
          <div className="component-docs">
            <div className={sourceClasses}>
              <pre><code className="e4x">{this.props.source}</code></pre>
            </div>
            <h4>Properties</h4>
            <table className="table table-striped">
              <thead>
                <tr><th>Name</th><th>Type</th><th>Description</th></tr>
              </thead>
              <tbody>
              {_.map(this.props.manifest.properties, function (p) {
                var req = React.addons.classSet({
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
              <div dangerouslySetInnerHTML={{__html: this.props.content}} />
            </div>
          </div>
        </div>
      );
    }
  });
  return ExampleRunner;
});
