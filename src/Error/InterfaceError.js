/*global define */
define(function() {
    function InterfaceError(message) {
        this.message = message;
    }
    InterfaceError.prototype.toString = function() {
        return 'Oui Error [ InterfaceError ] ' + this.message;
    };
    return InterfaceError;
});
