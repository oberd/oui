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
    }
  ];
});
