requirejs.config({
  paths: {
    'docs': 'src',
    'Oui': '../src',
    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'react': '../bower_components/react/react-with-addons',
    'react.backbone': '../bower_components/react.backbone/react.backbone',
    'JSXTransformer': '../bower_components/react/JSXTransformer',
    'text': '../bower_components/requirejs-text/text',
    'backbone-filtered-collection': '../bower_components/backbone-filtered-collection/backbone-filtered-collection',
    'jsx': '../bower_components/jsx-requirejs-plugin/js/jsx',
    'mdown': '../bower_components/requirejs-plugins/src/mdown',
    'highlightjs': '../bower_components/highlightjs/highlight.pack',
    'markdownConverter': '../bower_components/requirejs-plugins/lib/Markdown.Converter'
  },
  jsx: { fileExtension: '.jsx' },
  shim: {
    'backbone': { deps: ['underscore', 'jquery'] }
  }
});
