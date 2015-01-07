/*globals define:false, describe, it, expect, sinon, beforeEach, afterEach, Pretender */
define(function (require) {
  'use strict';

  var Clinical = require('clinical/Clinical');

  describe('Clinical Sdk', function () {
    describe('constructor function', function () {
      var server;

      beforeEach(function () {
        server = new Pretender(function () {
          this.get('/cpanel/example/:id', function () {
            var response = {
              appointments: [ { date: '2014-07-21 07:30:00'} ]
            };
            return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
          });
        });
      });

      afterEach(function () {
        server.shutdown();
      });

      it('should expose constructor', function () {

        expect(Clinical).to.be.a('function');
      });
    });
  });
});
