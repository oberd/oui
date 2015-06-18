/*global define */
define(function(require) {
    var InterfaceError = require('Oui/Error/InterfaceError');

    function AbstractValidator() {
        if (typeof this.validate !== 'function' || this.validate.length !== 1) {
            throw new InterfaceError('Validator requires implementation of a validate(value) function');
        }
        this.message = 'Invalid Value';
    }

    AbstractValidator.prototype.getValidationError = function(value) {
        if ( !this.validate(value) ) {
            return this.message;
        }
    };

    return AbstractValidator;
});
