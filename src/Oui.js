/*globals define:false */
define(function (require) {
  'use strict';
  return {
    List: require('jsx!./List/List'),
    Icon: require('jsx!./Icon/Icon'),
    Loader: require('jsx!./Loader/Loader'),
    Form: {
      TextField: require('jsx!./Form/TextField'),
      Select: require('jsx!./Form/Select'),
      Validator: require('./Form/Validator')
    }
  };
});
