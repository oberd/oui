/*global define */

define(function (require) {
  'use strict';
  var hjs = require('highlightjs');
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
    componentDidUpdate: function () {
      hljs.highlightBlock(this.refs.code.getDOMNode());
    },
    render: function () {
      if (!this.props.name) return <div></div>;
      var sourceClasses = React.addons.classSet({
        'example-source': true,
        'expanded': this.state.sourceExpanded
      });
      var sourceMessage = this.state.sourceExpanded ? 'Hide Source':'Show Source';
      var Example = this.props.component;
      return (
        <div className="component-page" key={this.props.name}>
          <h3>{this.props.name} Demo</h3>
          <div className="component-example">
            <Example />
          </div>
          <a className="example-source-toggle" onClick={this.toggleSource}>{sourceMessage}</a>
          <div className="component-docs">
            <div className={sourceClasses}>
              <pre><code className="e4x" ref="code">{this.props.source}</code></pre>
            </div>
            <h3>Properties</h3>
            <table className="table table-striped">
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
              {_.map(this.props.manifest.properties, function (p) {
                return (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{p.type}</td>
                    <td>{p.description}</td>
                  </tr>
                );
              })}
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
