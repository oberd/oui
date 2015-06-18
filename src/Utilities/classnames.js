/*global define */
define(function() {
    function classNames() {
        var args = arguments;
        var classes = [];

        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (!arg) {
                continue;
            }

            if (typeof arg === 'string' || typeof arg === 'number') {
                classes.push(arg);
            } else if (typeof arg === 'object') {
                for (var key in arg) {
                    if (!arg.hasOwnProperty(key) || !arg[key]) {
                        continue;
                    }
                    classes.push(key);
                }
            }
        }
        return classes.join(' ');
    }
    return classNames;
});
