/*globals define:false, describe, it, expect, sinon */
define(function (require) {

  var Validator = require('Oui/Form/Validator');

  describe('Validator', function () {
    it('should have addValidator function', function () {
      var validator = new Validator();
      expect(validator.addValidation).to.be.a('function');
    });

    it('should call getValidationError on validators, and return array of results', function () {
      var validator = new Validator();
      function StubValidator() {
        this.getValidationError = function () {}
      }
      var validation = new StubValidator();
      var stub = sinon.stub(validation, 'getValidationError');
      stub.returns('Foo');
      validator.addValidation(validation);
      var val = validator.getValidationErrors('');
      expect(stub.called).to.eql(true);
      expect(val).to.eql(['Foo']);
    });
  });
});
