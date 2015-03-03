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
    },{
      name: 'Loader',
      content: require('mdown!docs/Loader/Loader.md'),
      source: require('text!docs/Loader/LoaderExample.jsx'),
      component: require('jsx!docs/Loader/LoaderExample'),
      manifest: require('json!docs/Loader/manifest.json')
    },{
      name: 'TextField',
      content: require('mdown!docs/Form/TextField/TextField.md'),
      source: require('text!docs/Form/TextField/TextField.jsx'),
      component: require('jsx!docs/Form/TextField/TextField'),
      manifest: require('json!docs/Form/TextField/manifest.json')
    },{
      name: 'Select',
      content: require('mdown!docs/Form/Select/Select.md'),
      source: require('text!docs/Form/Select/Select.jsx'),
      component: require('jsx!docs/Form/Select/Select'),
      manifest: require('json!docs/Form/Select/manifest.json')
    }
  ];
});
