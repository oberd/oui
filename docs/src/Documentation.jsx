/*global define */

define(function (require) {
  'use strict';

  var _ = require('underscore');
  var packageInfo = require('json!../../bower.json');
  var React = require('react.backbone');
  var Router = require('react-router');
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;

  var DrawerLayout = require('jsx!Oui/Layout/Drawer');
  var Content = require('jsx!Oui/Layout/Content');
  var Sidebar = require('jsx!Oui/Layout/Sidebar');
  var Menu = require('jsx!Oui/Layout/Menu');
  var MenuItem = require('jsx!Oui/Layout/MenuItem');
  var Topbar = require('jsx!Oui/Layout/Topbar');

  var examples = require('./manifest');

  var Docs = React.createClass({
    mixins: [DrawerLayout.Expansion],
    render: function () {
      var expanded = this.state.layoutExpanded;
      var menuItems = _.map(examples, function (example) {
        return <MenuItem key={example.name} route="components" params={{ name: example.name }}>{example.name}</MenuItem>;
      });
      return (
        <DrawerLayout expanded={expanded}>
          <Sidebar>
            <div className="logo">
              <Link to="/"><img height="100%" src="oui.svg" /></Link>
            </div>
            <Menu>{menuItems}</Menu>
          </Sidebar>
          <Content>
            <Topbar expanded={expanded} onMenuToggle={this.toggleLayoutExpansion}>
              <div className="pull-right">
                v{packageInfo.version}
                &nbsp;
                <a className="header-link" href="/test">Tests</a>
                &nbsp;
                <a className="header-link" href="https://github.com/oberd/oui">Github</a>
              </div>
            </Topbar>
            <div className="docs-page">
              <RouteHandler />
            </div>
          </Content>
        </DrawerLayout>
      );
    }
  });
  return Docs;
});
