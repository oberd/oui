/*globals define:false, describe, it, expect, sinon, beforeEach, afterEach, Pretender */
define(function (require) {
  'use strict';

  var Oui = require('Oui/Oui');

  describe('Oberd UI Library (Oui)', function () {
    describe('object properties', function () {
      it('should expose library object', function () {
        expect(Oui).to.be.an('object');
      });
    });

    describe('has expected components', function () {
      function hasComponentTest(component) {
        return function () {
          expect(Oui[component]).to.be.a('function');
        };
      }
      var expectedComponents = [
        'List'
      ];
      for (var i = 0; i < expectedComponents.length; i++) {
        it(expectedComponents[i], hasComponentTest(expectedComponents[i]));
      }
    });
  });
});
