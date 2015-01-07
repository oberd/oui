requirejs.config({
  paths: {
    'clinical': '../src',
    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'react': '../bower_components/react/react-with-addons',
    'react.backbone': '../bower_components/react.backbone/react.backbone',
    'JSXTransformer': '../bower_components/react/JSXTransformer',
    'text': '../bower_components/requirejs-text/text',
    'jsx': '../bower_components/jsx-requirejs-plugin/js/jsx'
  },
  jsx: { fileExtension: '.jsx' },
  shim: {
    'backbone': { deps: ['underscore', 'jquery'] }
  }
});
