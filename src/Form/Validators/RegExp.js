/*global define */
define(function(require) {
    var Validator = require('Oui/Form/Validators/AbstractValidator');

    function RegExValidator(regex, message) {
        Validator.apply(this);
        this.regex = regex;
        this.message = message || 'Invalid value';
    }

    RegExValidator.prototype = Object.create(Validator.prototype);

    RegExValidator.prototype.validate = function(value) {
        return value.match(this.regex);
    };

    return RegExValidator;
});
