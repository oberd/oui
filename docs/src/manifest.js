/*global define */

define(function (require) {
  'use strict';
  return [
    {
      name: 'List',
      content: require('mdown!docs/List/Basic.md'),
      source: require('text!docs/List/Basic.jsx'),
      component: require('jsx!docs/List/Basic'),
      manifest: require('json!docs/List/manifest.json')
    },{
      name: 'Icon',
      content: require('mdown!docs/Icon/Icon.md'),
      source: require('text!docs/Icon/Icon.jsx'),
      component: require('jsx!docs/Icon/Icon'),
      manifest: require('json!docs/Icon/manifest.json')
    }
  ];
});