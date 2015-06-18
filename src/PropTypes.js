/*global define */
define(function(require) {
    var React = require('react.backbone');
    var Backbone = require('backbone');
    var FilteredCollection = require('backbone-filtered-collection');
    return {
        collection: React.PropTypes.oneOfType([
            React.PropTypes.instanceOf(Backbone.Collection),
            React.PropTypes.instanceOf(FilteredCollection)
        ]),
        model: React.PropTypes.instanceOf(Backbone.Model)
    };
});
