/*global requirejs */
requirejs.config({
  paths: {
    'docs': 'src',
    'Oui': '../src',
    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'react': '../bower_components/react/react-with-addons',
    'react-router': '../bower_components/react-router/build/global/ReactRouter',
    'react.backbone': '../bower_components/react.backbone/react.backbone',
    'JSXTransformer': '../bower_components/react/JSXTransformer',
    'text': '../bower_components/requirejs-text/text',
    'backbone-filtered-collection': '../bower_components/backbone-filtered-collection/backbone-filtered-collection',
    'jsx': '../bower_components/jsx-requirejs-plugin/js/jsx',
    'json': '../bower_components/requirejs-plugins/src/json',
    'mdown': '../bower_components/requirejs-plugins/src/mdown',
    'highlightjs': '../bower_components/highlightjs/highlight.pack',
    'chance': '../bower_components/chance/chance',
    'markdownConverter': '../bower_components/requirejs-plugins/lib/Markdown.Converter',
    'oberd-media-query': '../bower_components/oberd-media-query/media-query',
    'classnames': '../bower_components/classnames/index'
  },
  jsx: { fileExtension: '.jsx' },
  shim: {
    'backbone': { deps: ['underscore', 'jquery'] },
    'chance': { exports: 'chance' }
  }
});
