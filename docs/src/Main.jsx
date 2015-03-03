/*global define, document */
define(function (require) {
  'use strict';
  var mq = require('oberd-media-query');
  var React = require('react');
  var Docs = require('jsx!./Documentation');
  var ComponentPage = require('jsx!./ComponentPage');

  var Router = require('react-router');
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;

  var routes = (
    <Route name="app" path="/" handler={Docs}>
      <Route name="components" path="components/:name" handler={ComponentPage} />
      <DefaultRoute handler={ComponentPage}/>
    </Route>
  );
  mq.watch();
  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('main'));
  });
});
